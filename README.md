# TrustWork - Web3 Escrow for Gig Economy

TrustWork is a decentralized escrow platform built for freelancers, informal workers, and clients. It eliminates payment disputes by locking funds in a smart contract and releasing them automatically upon milestone completion.

Built for the **Blockdev.id Hackathon 2026**.

## 🏗️ Architecture & Tech Stack
- **Smart Contract:** Solidity `^0.8.20`, OpenZeppelin (ReentrancyGuard, IERC20)
- **Deployment & Testing:** Hardhat
- **Network:** Ethereum Sepolia Testnet (using public nodes)
- **Frontend:** Next.js 14 (App Router), TailwindCSS, Glassmorphism UI
- **Web3 Integration:** Wagmi v1, Viem v1, RainbowKit

## ✨ Key Features (MVP)
1. **Dynamic Milestones:** Clients can set custom milestones (e.g., 20%, 30%, 50%) up to 5 stages, as long as it totals 100%.
2. **Hybrid Off-Chain Storage:** Heavy strings (task descriptions) are stored off-chain to minimize gas fees, while crucial financial data (percentages) is locked securely on-chain.
3. **Automated Payouts:** No manual transfers. Once a client clicks "Approve", the exact predefined percentage of USDC is instantly routed to the freelancer's wallet.
4. **Accordion Dashboard:** Clean UI to manage multiple active/completed escrow contracts seamlessly.

## 📖 Live Demo Script (Hackathon)

### 1. Preparation
- Create **Account 1 (Client)** and **Account 2 (Worker)** on your MetaMask.
- Fund Account 1 with Sepolia ETH (via Faucet).
- Deploy the contract using Account 1 (Deployer automatically becomes the Arbiter).
- Mint MockUSDC to Account 1.

### 2. The Flow
1. **Client** connects wallet, goes to `/create`.
2. **Client** inputs **Worker**'s address, total amount, and sets dynamic milestones (e.g., Task 1: 50%, Task 2: 50%), then clicks *Lock Funds*.
   - *Tx 1: Approves USDC spending.*
   - *Tx 2: Creates Escrow (Locks funds in contract).*
3. **Worker** connects wallet in Incognito mode, views Dashboard, clicks the project list to expand the details, sees status is `ACTIVE`, and starts working.
4. **Client** reviews work, expands the project in Dashboard, and clicks *Approve Next Milestone*.
   - *Tx 3: Smart contract automatically releases the specified % of funds to the Worker's wallet.*
5. **Worker** checks their dashboard and sees the `My Wallet Balance` instantly go up in real-time.

## 🛡️ Security Measures
- `nonReentrant` modifiers on all transfer functions to prevent recursive attacks (e.g., re-entrancy drain).
- Strict Role-Based Access Control (`Only client` can approve milestones).
- Total milestone calculation is strictly checked on-chain (`require(totalPct == 100)`).
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
