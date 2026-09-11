# Progress Tracker - TrustWork Hackathon

Dokumen ini melacak artefak dokumentasi yang telah diselesaikan untuk persiapan hackathon.

## Status: 🟩 Dokumentasi Perencanaan Selesai (Phase 1)

Berikut adalah daftar file yang telah dibuat dalam folder `docs/`:

1. **`BRD.md` (Business Requirements Document)**
   - Mendefinisikan masalah (penipuan pembayaran pekerja informal).
   - Menetapkan metrik sukses MVP untuk hackathon.

2. **`PRD.md` (Product Requirements Document)**
   - Menentukan batasan fitur (In-Scope vs Out-of-Scope).
   - Menjelaskan *user flow* utama secara konseptual.

3. **`UserStories.md`**
   - Mendefinisikan 3 epik utama berdasarkan role: Klien (Deposit), Pekerja (Klaim), dan Dispute (Arbiter).
   - Dilengkapi dengan *Acceptance Criteria* standar.

4. **`SRS.md` (Software Requirements Specification)**
   - Menetapkan Tech Stack (Solidity, Next.js, Wagmi, Polygon Amoy).
   - Merancang struktur data Smart Contract (Struct, Enum, Core Functions).

5. **`UML_BPMN.md`**
   - Visualisasi Mermaid: *Sequence Diagram* untuk interaksi aktor-sistem.
   - Visualisasi Mermaid: *State Machine* untuk siklus hidup Smart Contract.

6. **`AppFlow.md` (UI/UX Flow)**
   - Memetakan struktur halaman aplikasi (Landing -> Dashboard -> Create -> Detail).
   - Mendefinisikan *conditional rendering* berdasarkan role *wallet* (Klien vs Pekerja vs Arbiter).

## Next Steps (Phase 2 - Execution)
- [ ] Setup *repository* (Monorepo: Hardhat/Foundry + Next.js).
- [x] Menulis kode `TrustWork.sol`.
- [ ] Menulis *test script* lokal untuk Smart Contract.
- [ ] *Deploy* Smart Contract ke Testnet (Polygon Amoy / Sepolia).
- [ ] Setup Next.js + Tailwind + RainbowKit.
- [ ] Integrasi ABI Smart Contract ke Frontend.
