const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TrustWork Security & Flow Tests", function () {
  let TrustWork, trustWork, MockUSDC, token;
  let client, worker, arbiter, attacker;
  let amount;

  beforeEach(async function () {
    [client, worker, arbiter, attacker] = await ethers.getSigners();
    
    MockUSDC = await ethers.getContractFactory("MockUSDC");
    token = await MockUSDC.connect(client).deploy();
    await token.deployed();

    TrustWork = await ethers.getContractFactory("TrustWork");
    trustWork = await TrustWork.deploy(arbiter.address);
    await trustWork.deployed();

    amount = ethers.utils.parseUnits("100", 18);
    await token.connect(client).approve(trustWork.address, amount);
  });

  async function getProjectId(tx) {
    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === 'ProjectCreated');
    return event.args.projectId;
  }

  it("1. [Happy Path] Complete project flow smoothly", async function () {
    const tx = await trustWork.connect(client).createProject(worker.address, amount, token.address, [50, 50]);
    const pId = await getProjectId(tx);
    
    await trustWork.connect(client).approveMilestone(pId);
    expect(await token.balanceOf(worker.address)).to.equal(ethers.utils.parseUnits("50", 18));
    
    await trustWork.connect(client).approveMilestone(pId);
    expect(await token.balanceOf(worker.address)).to.equal(ethers.utils.parseUnits("100", 18));
  });

  it("2. [Security] Rejects unauthorized attacker from approving milestone", async function () {
    const tx = await trustWork.connect(client).createProject(worker.address, amount, token.address, [100]);
    const pId = await getProjectId(tx);
    
    await expect(
      trustWork.connect(attacker).approveMilestone(pId)
    ).to.be.revertedWith("Only client");
  });

  it("3. [Security] Dispute flow strictly protected for Arbiter only", async function () {
    const tx = await trustWork.connect(client).createProject(worker.address, amount, token.address, [50, 50]);
    const pId = await getProjectId(tx);
    
    await trustWork.connect(client).triggerDispute(pId);
    
    await expect(
      trustWork.connect(client).resolveDispute(pId, 100, 0)
    ).to.be.revertedWith("Only arbiter");
    
    await trustWork.connect(arbiter).resolveDispute(pId, 70, 30);
    expect(await token.balanceOf(worker.address)).to.equal(ethers.utils.parseUnits("30", 18));
  });

  it("4. [Security] Rejects invalid percentage manipulation", async function () {
    await expect(
      trustWork.connect(client).createProject(worker.address, amount, token.address, [50, 40])
    ).to.be.revertedWith("Milestones must total 100%");
  });
});
