require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const isValidKey = privateKey && privateKey.length === 66 && privateKey.startsWith("0x") || privateKey && privateKey.length === 64;
const accountArr = isValidKey ? [(privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`)] : [];

// Public RPC Sepolia yang aktif dan direkomendasikan Chainlist
const stableSepoliaUrl = "https://ethereum-sepolia-rpc.publicnode.com";

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || stableSepoliaUrl,
      accounts: accountArr,
      chainId: 11155111,
      timeout: 1000000
    }
  }
};
