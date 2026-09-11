# Software Requirements Specification (SRS)

## 1. Technology Stack
- **Smart Contract:** Solidity `^0.8.20`, Foundry/Hardhat, OpenZeppelin (ReentrancyGuard, IERC20).
- **Frontend:** Next.js (App Router), TailwindCSS.
- **Web3 Integrasi:** Wagmi `v2`, Viem, RainbowKit.
- **Jaringan:** Polygon Amoy Testnet (Cepat, murah, EVM compatible).

## 2. Smart Contract Data Structures
```solidity
enum ProjectStatus { PENDING, FUNDED, DISPUTED, COMPLETED }

struct Milestone {
    uint8 percentage;
    bool isApproved;
}

struct EscrowProject {
    address client;
    address worker;
    address arbiter;
    uint256 totalAmount;
    address tokenAddress;
    ProjectStatus status;
    uint8 currentMilestone;
    // Array of milestones...
}
```

## 3. Core Contract Functions
1. `createProject(address _worker, uint256 _amount, uint8[] _milestones)`: Menerima token dari klien, setup data.
2. `approveMilestone(uint256 _projectId)`: (Only Client). Mengubah state milestone, trigger ERC20 `transfer` ke worker sesuai persentase.
3. `triggerDispute(uint256 _projectId)`: (Client/Worker). Ubah status ke `DISPUTED`.
4. `resolveDispute(uint256 _projectId, uint8 _clientPct, uint8 _workerPct)`: (Only Arbiter). Membagi sisa saldo kontrak ke Klien dan Pekerja, status `COMPLETED`.

## 4. Security Considerations
- Harus menggunakan `ReentrancyGuard` pada fungsi yang melakukan transfer eksternal.
- Validasi input persentase milestone harus tepat 100%.
- Hanya role yang tepat (modifiers: `onlyClient`, `onlyArbiter`) yang bisa memanggil fungsi sensitif.
