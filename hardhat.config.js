require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const isValidKey = privateKey && privateKey.length === 66 && privateKey.startsWith("0x") || privateKey && privateKey.length === 64;
const accountArr = isValidKey ? [(privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`)] : [];

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: accountArr,
    },
    polygonAmoy: {
      url: process.env.ALCHEMY_AMOY_URL || "",
      accounts: accountArr,
    }
  }
};
