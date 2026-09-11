# Application Flow & UI Structure

Dokumen ini menjelaskan alur navigasi aplikasi dari sudut pandang *user interface* (UI) dan interaksi halaman, baik untuk Klien maupun Pekerja.

## 1. Halaman Utama (Landing Page & Onboarding)
**Path:** `/`
- **Hero Section:** Judul "TrustWork - Kerja Tenang, Bayaran Aman".
- **Call to Action (CTA):** Tombol "Connect Wallet".
- **Logic:** 
  - Jika wallet belum terhubung, tampilkan tombol modal RainbowKit.
  - Jika wallet sudah terhubung, cek apakah *address* memiliki proyek aktif. 
  - *Auto-redirect* ke `/dashboard`.

## 2. Dashboard Pengguna
**Path:** `/dashboard`
Halaman ini menyesuaikan tampilan berdasarkan peran *wallet address* yang sedang login.

### Tab A: Sebagai Klien (My Projects)
- **Tombol:** "+ Buat Proyek Baru" (Membuka Modal/Halaman Create).
- **Daftar Proyek:** Menampilkan kartu proyek yang didanai klien ini.
- **Card Info:**
  - ID Proyek / Nama Pekerjaan.
  - Alamat Worker (tersamarkan, misal: `0x12...34`).
  - Total Dana (Lock).
  - Status (Funded / Disputed / Completed).
  - Progress (Misal: 1 dari 3 Milestone selesai).

### Tab B: Sebagai Pekerja (My Gigs)
- **Daftar Proyek:** Menampilkan pekerjaan di mana address pengguna di-set sebagai *worker*.
- **Card Info:**
  - Sama seperti di atas.
  - Indikator: "Menunggu Persetujuan Klien" atau "Milestone Berikutnya".

## 3. Alur Pembuatan Proyek (Client Flow)
**Path:** `/create` (atau via Modal)
1. **Form Input:**
   - Address Pekerja.
   - Pilihan Token (Default: Mock USDC).
   - Total Amount (Misal: 100 USDC).
2. **Setup Milestone:**
   - User menambah *slider* atau *input text* persentase.
   - Contoh: Milestone 1 (30%), Milestone 2 (30%), Final (40%). (Harus tervalidasi total 100%).
3. **Eksekusi Web3 (2 Transaksi):**
   - Transaksi 1: `Approve` token ERC20 (Mengizinkan kontrak menarik uang).
   - Transaksi 2: `createProject()` ke Smart Contract.
4. **Sukses:** Redirect kembali ke `/dashboard`.

## 4. Halaman Detail Proyek (Action Page)
**Path:** `/project/[id]`
Halaman utama untuk eksekusi fungsi *Smart Contract*.

**Visualisasi Milestone:**
Ditampilkan sebagai *Timeline* vertikal.
- Milestone 1 (30% - 30 USDC) -> Status: Selesai
- Milestone 2 (30% - 30 USDC) -> Status: Aktif
- Milestone 3 (40% - 40 USDC) -> Status: Terkunci

**Aksi Berdasarkan Role:**
*Jika login sebagai Klien:*
- Tombol `Approve Milestone [X]` (Tersedia jika status proyek FUNDED).
- Tombol `Ajukan Dispute` (Bahaya / Merah).

*Jika login sebagai Pekerja:*
- Hanya tampilan statis (Read-only status dari Blockchain).
- (Opsional/UI saja) Tombol `Tandai Pekerjaan Selesai` (Ini tidak mengubah state di Blockchain, hanya notifikasi off-chain/visual agar Klien tahu harus klik Approve).
- Tombol `Ajukan Dispute`.

## 5. Flow Sengketa (Dispute Flow - Arbiter)
**Path:** `/arbiter` (Tersembunyi, hanya bisa diakses wallet Admin)
- Menampilkan daftar proyek berstatus `DISPUTED`.
- Memiliki *slider* persentase pembagian (Misal: Klien tarik 70%, Pekerja dapat 30%).
- Tombol `Resolve Dispute` mengeksekusi fungsi `resolveDispute()` di blockchain.
