import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom'; // For navigation after task completion

// Mock contract ABI (example)
const contractABI = [
  {
    "inputs": [],
    "name": "purchaseItem",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

function Marketplace() {
  const navigate = useNavigate(); 

  const contractAddress = "0x0000000000000000000000000000000000000000"; 
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setProvider(tempProvider);
        const tempContract = new ethers.Contract(contractAddress, contractABI, tempProvider.getSigner());
        setContract(tempContract);
        const balance = await tempProvider.getBalance(accounts[0]);
        setEthBalance(ethers.utils.formatEther(balance));

      } catch (error) {
        alert('Failed to connect to MetaMask: ' + error.message);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  useEffect(() => {
    connectMetaMask();
  }, []);

  // Function to handle item purchase (sending ETH)
  const handlePurchase = async (itemName, price) => {
    setTransactionInProgress(true);
    setSelectedItem(itemName);

    try {
      const tx = await contract.purchaseItem({
        value: ethers.utils.parseEther(price), // Payment for the item
      });

      console.log('Transaction sent:', tx);
      await tx.wait(); 

      setTransactionInProgress(false);
      setTransactionSuccess(true);
      setTimeout(() => setTransactionSuccess(false), 3000); // Reset after 3 seconds
    } catch (error) {
      console.error('Transaction failed:', error);
      setTransactionInProgress(false);
      setTransactionSuccess(false);
    }
  };

  return (
    <div className="rounded-[1rem] h-[50rem] w-[30rem] bg-center bg-cover" style={{ backgroundImage: "url('src/assets/10.png')" }}>
      <div className="flex flex-col justify-center items-center h-[40rem] w-[30rem] bg-cover bg-center rounded-xl" style={{ backgroundImage: "url('src/assets/20.png')" }}>
        <div className="font-oswald text-3xl mb-4">Marketplace</div>
        {!account ? (
          <button
            onClick={connectMetaMask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4"
          >
            Connect MetaMask
          </button>
        ) : (
          <div className="text-green-800 font-oswald">
            <div>Connected to MetaMask </div>
            <div>| Balance: {ethBalance} ETH</div>
          </div>
          
        )}

        <div className="space-y-4 font-oswald">
          <div className="flex items-center justify-between p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-cover rounded-full" style={{ backgroundImage: "url('src/assets/28.png')" }}></div>
              <div className="ml-4">
                <div>1 Free TTC Fare</div>
                <div className="text-gray-500">Price: 0.01 ETH</div>
              </div>
            </div>
            <button
              onClick={() => handlePurchase('1 Free TTC Fare', '0.001')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              {transactionInProgress && selectedItem === '1 Free TTC Fare' ? '...' : 'Buy'}
            </button>
          </div>

          <div className="flex items-center rounded-lg">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-cover rounded-full" style={{ backgroundImage: "url('src/assets/29.png')" }}></div>
              <div className="ml-4">
                <div>1 PTO</div>
                <div className="text-gray-500">Price: 0.001 ETH</div>
              </div>
            </div>
            <button
              onClick={() => handlePurchase('1 PTO', '0.001')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              {transactionInProgress && selectedItem === '1 PTO' ? '...' : 'Buy'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-cover rounded-full" style={{ backgroundImage: "url('src/assets/30.png')" }}></div>
              <div className="ml-4">
                <div>TTC Monthly</div>
                <div className="text-gray-500">Price: 0.01 ETH</div>
              </div>
            </div>
            <button
              onClick={() => handlePurchase('TTC Monthly', '0.11')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              {transactionInProgress && selectedItem === 'TTC Monthly' ? '...' : 'Buy'}
            </button>
          </div>
        </div>

        {transactionSuccess && (
          <div className="mt-4 text-green-500 font-oswald text-xs">
            {selectedItem} purchased successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;
