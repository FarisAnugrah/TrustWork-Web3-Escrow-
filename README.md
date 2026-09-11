# TrustWork 

A decentralized milestone-based escrow platform designed to eliminate payment disputes in the gig economy.

TrustWork utilizes smart contracts to lock client funds upfront and release them automatically upon the completion of predefined tasks, ensuring trustless execution without intermediary fees.

## Technical Architecture
- **Smart Contract:** Solidity `^0.8.20`, OpenZeppelin (ReentrancyGuard, IERC20)
- **Deployment & Testing:** Hardhat
- **Network:** Ethereum Sepolia Testnet
- **Frontend:** Next.js 14 (App Router), TailwindCSS, Wagmi v1, RainbowKit

## Key Features
- **Dynamic Milestones:** Clients can define custom multi-stage payouts (e.g., 30%, 30%, 40%). The smart contract strictly enforces `require(totalPct == 100)` on-chain before locking the stablecoins.
- **Gas-Optimized Hybrid Storage:** Financial logic and state management live in Solidity, while heavy string payloads (project names, task descriptions) are synced to off-chain storage to minimize deployment and interaction costs.
- **Automated Instant Payouts:** Zero manual intervention. Once a client approves a milestone, the contract automatically routes the exact USDC percentage to the worker's wallet.
- **Privacy Isolation:** The Dashboard filters blockchain state to render only the escrow contracts where the connected wallet acts as either the Client or the Worker.

## Security Implementation
- **Re-entrancy Protection:** All external token transfers are protected using OpenZeppelin's `nonReentrant` modifier. The Checks-Effects-Interactions pattern is strictly enforced.
- **Role-Based Access Control:** Functions are strictly isolated. For example, `approveMilestone` can only be executed by the designated `client` address.
- **Non-custodial Arbiter:** In the event of a dispute, an assigned 3rd-party Arbiter can distribute the remaining funds between the Client and Worker but cannot withdraw funds to their own wallet.

## Running Locally
```bash
# 1. Install frontend dependencies
cd frontend
npm install

# 2. Run the Next.js development server
npm run dev
# Application will run on http://localhost:3000
```

## Demo Flow
1. Connect **Wallet A (Client)** and deploy a new escrow via `/create`.
2. Input the address of **Wallet B (Worker)**, total USDC amount, and set custom milestone stages.
3. Connect **Wallet B (Worker)** in a separate browser window. Navigate to the Dashboard to view the `ACTIVE` escrow contract.
4. Switch back to **Wallet A**, expand the project details, and click *Approve Next Milestone*.
5. The specified percentage of funds is instantly transferred to **Wallet B**.
