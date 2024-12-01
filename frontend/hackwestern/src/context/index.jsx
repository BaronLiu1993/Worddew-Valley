import React, { useContext, createContext, useState, useEffect } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite, ConnectWallet } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x90E855E1804774430B6A18b9EE9C72281928469E');
  const { mutateAsync: createEvent } = useContractWrite(contract, 'createEvent');
  const { mutateAsync: donateToEvent } = useContractWrite(contract, 'donateToEvent');
  const { mutateAsync: completeTaskAndEarn } = useContractWrite(contract, 'completeTaskAndEarn');

  const address = useAddress();
  const connect = useMetamask(); // Correct usage of useMetamask()

  const publishEvent = async (form) => {
    try {
      const eventId = await createEvent({
        args: [
          address,
          form.title,
          form.description,
          ethers.utils.parseEther(form.target),
          new Date(form.deadline).getTime(),
        ],
      });

      console.log("Event created successfully", eventId);
    } catch (error) {
      console.log("Event creation failed", error);
    }
  };

  const getEvents = async () => {
    const events = await contract.call('getEvents');
    const parsedEvents = events.map((event, i) => ({
      owner: event.owner,
      title: event.title,
      description: event.description,
      target: ethers.utils.formatEther(event.target.toString()),
      deadline: event.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(event.amountCollected.toString()),
      eventers: event.eventers,
      donations: event.donations.map(donation => ethers.utils.formatEther(donation.toString())),
      eventId: i
    }));
    return parsedEvents;
  };

  const getUserEvents = async () => {
    const allEvents = await getEvents();
    const filteredEvents = allEvents.filter(event => event.owner === address);
    return filteredEvents;
  };

  const donate = async (eventId, amount) => {
    try {
      const data = await donateToEvent({
        args: [eventId],
        value: ethers.utils.parseEther(amount),
      });
      console.log("Donation successful", data);
    } catch (error) {
      console.log("Donation failed", error);
    }
  };

  const getEventers = async (eventId) => {
    const [eventers, donations] = await contract.call('getEventers', [eventId]);
    const parsedDonations = eventers.map((eventer, i) => ({
      donator: eventer,
      donation: ethers.utils.formatEther(donations[i].toString())
    }));
    return parsedDonations;
  };

  const getUserContribution = async (eventId) => {
    const contribution = await contract.call('getUserContribution', [eventId, address]);
    return ethers.utils.formatEther(contribution.toString());
  };

  const completeTask = async (eventId) => {
    try {
      const data = await completeTaskAndEarn({
        args: [eventId],
      });
      console.log("Task completed, reward earned", data);
    } catch (error) {
      console.log("Task completion failed", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createEvent: publishEvent,
        getEvents,
        getUserEvents,
        donate,
        getEventers,
        getUserContribution,
        completeTask,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
