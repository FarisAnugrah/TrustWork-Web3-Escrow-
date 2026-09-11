const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  const balance = await deployer.getBalance();
  console.log("Account balance:", hre.ethers.utils.formatEther(balance), "ETH");

  if (balance.eq(0)) {
    throw new Error("Saldo 0 ETH! Harap isi dari Faucet terlebih dahulu.");
  }

  // 1. Deploy Mock USDC
  const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.deployed();
  console.log("MockUSDC deployed to:", usdc.address);

  // 2. Deploy TrustWork Escrow (using deployer as Arbiter)
  const TrustWork = await hre.ethers.getContractFactory("TrustWork");
  const trustWork = await TrustWork.deploy(deployer.address);
  await trustWork.deployed();
  console.log("TrustWork deployed to:", trustWork.address);

  console.log("\n=================================");
  console.log("COPY INI KE frontend/src/lib/config.ts");
  console.log(`export const TRUSTWORK_ADDRESS = "${trustWork.address}";`);
  console.log(`export const USDC_ADDRESS = "${usdc.address}";`);
  console.log("=================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
