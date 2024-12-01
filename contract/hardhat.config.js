require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/ZbsJxVbzTwr7mufpJDCE6eT1f_hawAtW",
      accounts: ["a98676264dbe71c545748e12ab392d806ad9eaf8c8c77376d996b774a1052bfa"],
    },
    localhost: {
      url: "http://127.0.0.1:8545",  // Local Hardhat network
    },
  },
};


