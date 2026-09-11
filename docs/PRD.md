# Product Requirements Document (PRD)

## 1. Product Vision
Membangun DApp (Decentralized Application) yang memungkinkan pembayaran aman berbasis *milestone* tanpa pihak penengah yang menahan dana secara terpusat.

## 2. Scope MVP (Hackathon)
**In-Scope:**
- Pembuatan kontrak escrow tunggal (1 Klien, 1 Pekerja).
- Pembagian persentase dana berdasarkan milestone (misal: 30% DP, 30% Tengah, 40% Final).
- Integrasi *wallet* (Metamask/WalletConnect).
- Penggunaan ERC20 Token (Stablecoin dummy seperti mock USDC).
- Fitur *Dispute* yang bisa dipanggil Klien/Pekerja.
- Resolusi *Dispute* oleh *wallet address* Arbiter yang di-hardcode.

**Out-of-Scope (Skipped for Hackathon):**
- KYC & Identity verification.
- Fiat on-ramp / off-ramp (konversi Rupiah ke Crypto).
- Dynamic Arbiter selection (sistem DAO untuk memilih juri).

## 3. User Flow Utama
1. **Klien** masuk, input alamat *wallet* Pekerja, set milestone, lalu mendepositkan dana (Lock USDC).
2. **Pekerja** melihat status "Funded" dan memulai pekerjaan.
3. **Pekerja** menekan "Request Approval" untuk Milestone 1.
4. **Klien** menekan "Approve". Dana Milestone 1 langsung cair ke *wallet* Pekerja.
5. (Opsional) Jika macet, salah satu pihak menekan "Dispute". **Arbiter** menentukan persentase pengembalian dana.
