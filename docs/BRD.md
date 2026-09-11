# Business Requirements Document (BRD)

## 1. Executive Summary
**Project Name:** TrustWork (Web3 Escrow)
**Objective:** Mengurangi kasus penipuan pembayaran pada pekerja informal dan freelancer melalui sistem escrow terdesentralisasi (Smart Contract).

## 2. Latar Belakang Masalah
- Pekerja informal (tukang, freelancer) rentan tidak dibayar penuh setelah pekerjaan selesai.
- Klien enggan memberikan Down Payment (DP) besar karena risiko pekerja kabur.
- Rekening Bersama (Rekber) tradisional lambat, butuh biaya admin tinggi, dan rentan *human error* atau *fraud* dari pihak penengah.

## 3. Business Goals & Value Proposition
- **Trustless Transactions:** Menghilangkan kebutuhan saling percaya antara klien dan pekerja.
- **Fair Dispute:** Arbiter pihak ketiga hanya masuk jika ada masalah, tidak memegang dana (non-custodial).
- **Target Market (Hackathon):** Ekosistem Web3 lokal, platform gig economy.

## 4. Success Metrics (Hackathon Scope)
1. Smart contract berhasil di-deploy di Testnet.
2. End-to-end flow (Deposit -> Kerja -> Approve -> Cair) berjalan tanpa error di Frontend.
3. Fungsi *Dispute* dan *Resolve* terbukti bekerja mendistribusikan dana dengan benar.
