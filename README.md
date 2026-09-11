# TrustWork - Web3 Escrow for Gig Economy

TrustWork is a decentralized escrow platform built for freelancers, informal workers, and clients. It eliminates payment disputes by locking funds in a smart contract and releasing them automatically upon milestone completion.

Built for the **Blockdev.id Hackathon 2026**.

## 🏗️ Architecture & Tech Stack
- **Smart Contract:** Solidity `^0.8.20`, OpenZeppelin (ReentrancyGuard, IERC20)
- **Deployment & Testing:** Hardhat
- **Network:** Ethereum Sepolia Testnet
- **Frontend:** Next.js 14 (App Router), TailwindCSS, Glassmorphism UI
- **Web3 Integration:** Wagmi v1, Viem v1, RainbowKit

## 📖 Live Demo Script (Hackathon)

### 1. Preparation
- Create **Account 1 (Client)** and **Account 2 (Worker)** on your MetaMask.
- Fund Account 1 with Sepolia ETH (via Faucet).
- Deploy the contract using Account 1 (Deployer automatically becomes the Arbiter).
- Mint MockUSDC to Account 1.

### 2. The Flow
1. **Client** connects wallet, goes to `/create`.
2. **Client** inputs **Worker**'s address and amount, clicks *Lock Funds*.
   - *Tx 1: Approves USDC spending.*
   - *Tx 2: Creates Escrow (Locks funds in contract).*
3. **Worker** connects wallet in Incognito mode, views Dashboard, sees project status is `FUNDED`, and starts working.
4. **Client** reviews work, goes to Dashboard, and clicks *Approve Next Milestone*.
   - *Tx 3: Smart contract automatically releases 50% of the funds to the Worker's wallet.*
5. **Worker** checks their wallet and sees the USDC balance instantly credited.

## 🛡️ Security Measures
- `nonReentrant` modifiers on all transfer functions to prevent recursive attacks.
- Strict Role-Based Access Control (`Only client` can approve milestones).
- Non-custodial Arbiter: The Arbiter cannot withdraw funds for themselves, only distribute them between Client and Worker during a dispute.

## 🚀 Running Locally
```bash
# 1. Install dependencies for frontend
cd frontend
npm install

# 2. Run the Next.js development server
npm run dev
# Open http://localhost:3000
```
