const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy Mock USDC first
  const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.deployed();
  console.log("MockUSDC deployed to:", usdc.address);

  // 2. Deploy TrustWork Escrow (using deployer as Arbiter for hackathon)
  const TrustWork = await hre.ethers.getContractFactory("TrustWork");
  const trustWork = await TrustWork.deploy(deployer.address);
  await trustWork.deployed();
  console.log("TrustWork deployed to:", trustWork.address);

  console.log("\n=================================");
  console.log("DONT FORGET TO COPY THESE ADDRESSES");
  console.log("AND PASTE THEM IN frontend/src/lib/config.ts");
  console.log("=================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
