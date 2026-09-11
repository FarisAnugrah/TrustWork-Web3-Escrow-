const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TrustWork", function () {
  it("Creates project and pays milestone", async function () {
    const [client, worker, arbiter] = await ethers.getSigners();
    
    // Deploy MockUSDC
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    const token = await MockUSDC.deploy();
    await token.deployed();
    
    // Deploy TrustWork
    const TrustWork = await ethers.getContractFactory("TrustWork");
    const trustWork = await TrustWork.deploy(arbiter.address);
    await trustWork.deployed();
    
    const amount = ethers.utils.parseUnits("100", 18);
    
    // Approve and Create Project
    await token.approve(trustWork.address, amount);
    await trustWork.createProject(worker.address, amount, token.address, [30, 70]);
    
    // Approve Milestone 1 (30%)
    await trustWork.approveMilestone(0);
    
    // Check worker balance
    expect(await token.balanceOf(worker.address)).to.equal(ethers.utils.parseUnits("30", 18));
  });
});
