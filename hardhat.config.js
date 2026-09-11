require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const isValidKey = privateKey && privateKey.length === 66 && privateKey.startsWith("0x") || privateKey && privateKey.length === 64;
const accountArr = isValidKey ? [(privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`)] : [];

// Gunakan multiple fallback URL langsung di code jika .env kosong
const fallbackSepoliaUrl = "https://rpc.sepolia.org";

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || fallbackSepoliaUrl,
      accounts: accountArr,
      chainId: 11155111,
      timeout: 100000
    },
    polygonAmoy: {
      url: process.env.ALCHEMY_AMOY_URL || "https://rpc-amoy.polygon.technology",
      accounts: accountArr,
    }
  }
};
