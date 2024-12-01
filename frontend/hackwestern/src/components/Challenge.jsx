import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Contract ABI (updated for rewardUser function)
const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" }
    ],
    "name": "rewardUser",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

function Challenge() {
  const contractAddress = "0x0000000000000000000000000000000000000000"; // Replace with your contract address
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [isRunning, setIsRunning] = useState(false); // Track if running
  const [canCompleteTask, setCanCompleteTask] = useState(false); // Track if task is ready to be completed
  const [selectedChallenge, setSelectedChallenge] = useState(null); // Track selected challenge

  // WebSocket connection to Arduino server
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Connect to the WebSocket server

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const data = event.data; // CSV data from Arduino
      const [x, y, z, activity] = data.split(','); // Split data by comma
      console.log(`Activity: ${activity}`); // For debugging

      // Detect running activity once and trigger 3-second wait before allowing task completion
      if (activity.trim() === 'Running' && !isRunning) {
        setIsRunning(true); // Set running to true once
        setCanCompleteTask(false); // Disable task completion until 3 seconds have passed

        setTimeout(() => {
          setCanCompleteTask(true);
        }, 5000);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close(); // Cleanup WebSocket when component unmounts
    };
  }, [isRunning]); // Dependency on isRunning to prevent re-setting once running is true

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setProvider(tempProvider);
        const tempContract = new ethers.Contract(contractAddress, contractABI, tempProvider.getSigner());
        setContract(tempContract);
      } catch (error) {
        alert('Failed to connect to MetaMask: ' + error.message);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  // Complete the task and send ETH to user
  const completeTask = async () => {
    if (isTaskCompleted) {
      alert('Task already completed!');
      return;
    }

    if (!contract || !account) {
      alert('Please connect to MetaMask first!');
      return;
    }

    if (!isRunning) {
      alert('You need to run to complete the task!');
      return;
    }

    setTransactionInProgress(true); 

    try {
      const tx = await contract.rewardUser(account, {
        value: ethers.utils.parseEther("0.01"), 
      });

      console.log('Transaction sent:', tx);
      setTransactionInProgress(false); 

      setIsTaskCompleted(true);
      alert('Task completed successfully! (Transaction Hash: ' + tx.hash + ')');
    } catch (error) {
      console.error('Transaction failed:', error);
      setTransactionInProgress(false);
      alert('Transaction failed: ' + error.message);
    }
  };

  useEffect(() => {
    connectMetaMask(); 
  }, []);

  // Handle challenge click
  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge); 
  };

  return (
    <div className="h-[50rem] w-[30rem] bg-center bg-cover flex justify-center items-center" style={{ backgroundImage: "url('src/assets/10.png')" }}>
      <div className="p-16 flex flex-col justify-center space-y-10 items-align h-[30rem] w-[25rem] bg-cover bg-center rounded-xl" style={{ backgroundImage: "url('src/assets/20.png')" }}>
        <div className="font-oswald text-3xl">Challenge</div>

        {!selectedChallenge && (
          <>
            <button
              className="text-gray-700 font-oswald text-2xl bg-transparent hover:text-white border-0"
              onClick={() => handleChallengeClick('WALK TO HOME')}
            >
              WALK TO HOME
            </button>
            <button
              className="text-gray-700 font-oswald text-2xl bg-transparent hover:text-white border-0"
              onClick={() => handleChallengeClick('RUN TO WORK FOR 5 MINUTES')}
            >
              RUN TO WORK FOR 5 MINUTES
            </button>
            <button
              className="text-gray-700 font-oswald text-2xl bg-transparent hover:text-white border-0"
              onClick={() => handleChallengeClick('RUN TO WORK FOR 10 MINUTES')}
            >
              RUN TO WORK FOR 10 MINUTES
            </button>
          </>
        )}

        {selectedChallenge && isRunning && canCompleteTask && (
          <div className="mt-4">
            <button
              onClick={completeTask}
              className={`py-2 px-4 font-oswald text-white rounded-full ${isTaskCompleted || transactionInProgress ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={isTaskCompleted || transactionInProgress}
            >
              {transactionInProgress ? 'Processing...' : isTaskCompleted ? 'Task Completed' : 'Complete Task & Earn'}
            </button>
          </div>
        )}

        {selectedChallenge && !isRunning && (
          <div className="mt-4 text-red-600 font-oswald text-xl">
            You need to run to complete the task!
          </div>
        )}

        {/* Display a waiting message */}
        {selectedChallenge && isRunning && !canCompleteTask && (
          <div className="mt-4 text-yellow-600 font-oswald text-xl">
            Keep On Going!!!!! 
          </div>
        )}
      </div>
    </div>
  );
}

export default Challenge;
