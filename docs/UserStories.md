# User Stories

## Epic: Escrow Management

**US-01: Deposit Dana (Client)**
- **Sebagai** Klien,
- **Saya ingin** membuat proyek baru dan mengunci (lock) sejumlah token USDC ke smart contract,
- **Sehingga** Pekerja yakin bahwa saya memiliki dana yang cukup untuk membayar mereka.
- *Acceptance Criteria:*
  - UI menampilkan form input address pekerja, jumlah token, dan jumlah milestone.
  - Saat disubmit, wallet meminta approval (Approve ERC20 & Transact).
  - Status proyek berubah menjadi `FUNDED`.

**US-02: Klaim Milestone (Worker)**
- **Sebagai** Pekerja,
- **Saya ingin** dana otomatis masuk ke wallet saya setiap kali milestone disetujui,
- **Sehingga** saya tidak perlu menunggu proses pencairan manual.
- *Acceptance Criteria:*
  - Klien menekan tombol "Approve Milestone N".
  - Smart contract langsung mengeksekusi transfer `N%` dari total dana ke wallet pekerja.
  - Milestone ditandai `COMPLETED`.

**US-03: Dispute Resolution (Client / Worker / Arbiter)**
- **Sebagai** Pengguna (Klien/Pekerja),
- **Saya ingin** bisa menghentikan sementara (pause) proses proyek jika terjadi masalah,
- **Sehingga** dana tidak bisa ditarik sepihak.
- *Acceptance Criteria:*
  - Tombol "Dispute" mengubah status proyek menjadi `DISPUTED`.
  - Fungsi transfer standar terkunci.
  - Hanya *wallet* Arbiter yang bisa memanggil fungsi `resolveDispute(clientSharePct, workerSharePct)`.
