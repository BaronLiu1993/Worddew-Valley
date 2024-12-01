// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    struct Event {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] eventers; 
        uint256[] donations;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => mapping(address => uint256)) public contributions; // Track how much each user has donated per event
    mapping(uint256 => mapping(address => bool)) public taskCompleted; // Track if the user completed the task per event

    uint256 public numberOfEvents = 0;

    // Function to create an event
    function createEvent(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline) public returns (uint256) {
        Event storage event_ = events[numberOfEvents];

        require(event_.deadline < block.timestamp, "The deadline should be a date in the future.");

        event_.owner = _owner;
        event_.title = _title;
        event_.description = _description;
        event_.target = _target;
        event_.deadline = _deadline;
        event_.amountCollected = 0;

        numberOfEvents++;

        return numberOfEvents - 1;
    }

    // Function to donate to an event
    function donateToEvent(uint256 _id) public payable {
        uint256 amount = msg.value;

        Event storage event_ = events[_id];

        event_.eventers.push(msg.sender); // changed from donators to eventers
        event_.donations.push(amount);

        // Track user's donation amount
        contributions[_id][msg.sender] += amount;

        // Transfer funds to the event owner
        (bool sent,) = payable(event_.owner).call{value: amount}("");
        if(sent) {
            event_.amountCollected += amount;
        }
    }

    // Function to get eventers for a specific event
    function getEventers(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (events[_id].eventers, events[_id].donations);
    }

    // Function to get a list of all events
    function getEvents() public view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](numberOfEvents);

        for(uint i = 0; i < numberOfEvents; i++) {
            Event storage item = events[i];
            allEvents[i] = item;
        }

        return allEvents;
    }

    // Function to get user contribution for a specific event
    function getUserContribution(uint256 _eventId, address _user) public view returns (uint256) {
        return contributions[_eventId][_user];
    }

    // Function to check if a user has completed a task for a specific event
    function hasCompletedTask(uint256 _eventId, address _user) public view returns (bool) {
        return taskCompleted[_eventId][_user];
    }

    // Function to complete a task and earn a reward
    function completeTaskAndEarn(uint256 _id) public {
        Event storage event_ = events[_id];

        require(!taskCompleted[_id][msg.sender], "Task already completed");

        taskCompleted[_id][msg.sender] = true;

        uint256 reward = 0.1 ether;  // Adjust the reward as necessary

        require(event_.amountCollected >= reward, "Insufficient funds in event");

        (bool sent,) = payable(msg.sender).call{value: reward}("");
        require(sent, "Reward payment failed");
    }
}
