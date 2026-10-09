# Panduan Deployment Coolify — Projek "Synergyagrowebsite"

Dokumen ini merupakan panduan lengkap langkah demi langkah untuk mendeploy laman web **Synergy Agro Farm (SAF) & Legasi Coffee** ke VPS menggunakan **Coolify** dengan **PostgreSQL 18** dan storan imej terus di dalam pangkalan data (Jadual `SYN_media`).

---

## 🏗️ 1. Maklumat Projek & Konfigurasi

| Parameter | Nilai Konfigurasi |
|:---|:---|
| **Coolify Project Name** | `Synergyagrowebsite` |
| **GitHub Repository** | `https://github.com/harhmd/synergyagroweb.git` |
| **Engine Pangkalan Data** | `PostgreSQL 18` (atau 17) |
| **Awalan Jadual (Prefix)** | `SYN_` (cth. `SYN_users`, `SYN_media`, `SYN_drinks`, dll.) |
| **Storan Imej (Images)** | Disimpan secara binary (BYTEA) di dalam jadual `SYN_media` |
| **Port Aplikasi** | `3000` |

---

## 📦 2. Senarai Jadual Pangkalan Data (Prefix `SYN_`)

Semua jadual telah diprogramkan untuk dibina secara automatik sebaik sahaja aplikasi dijalankan di Coolify:

1. `SYN_users` — Akaun pentadbir dan pengguna.
2. `SYN_media` — **Storan imej sebenar (BYTEA)**; imej distrim terus melalui endpoint `/api/media/:fileKey` dan `/images/:fileKey` dari PostgreSQL!
3. `SYN_drinks` — Katalog minuman Legasi Coffee (Matcha, Espresso, Kopi Tradisi).
4. `SYN_nursery_items` — Inventori nurseri (Anak pokok mangga kahwin, pokok gantung RM10, tanah Long You 6-in-1).
5. `SYN_bookings` — Rekod tempahan lawatan ladang, buggy tour (AG 1 & 2), dan dewan perjumpaan.
6. `SYN_orders` — Pesanan pelanggan dari troli atas talian dan WhatsApp.
7. `SYN_inquiries` — Mesej pertanyaan terus daripada borang laman web.
8. `SYN_settings` — Tetapan sistem ladang.

---

## 🚀 3. Langkah Deploy di Coolify Dashboard

### Langkah 3.1: Cipta Projek di Coolify
1. Buka dashboard Coolify anda di VPS (`http://your-vps-ip:8000`).
2. Klik **Projects** ➜ **Add Project**.
3. Namakan projek: **`Synergyagrowebsite`**.

### Langkah 3.2: Cipta Pangkalan Data PostgreSQL 18
1. Di dalam projek **`Synergyagrowebsite`**, klik **+ New Resource** ➜ **Databases** ➜ **PostgreSQL**.
2. Pilih versi **`18`** (atau versi terkini yang disediakan Coolify).
3. Tetapkan:
   - **Database Name:** `synergy_agro_db`
   - **Username:** `saf_user`
   - **Password:** *(Tetapkan kata laluan selamat anda)*
4. Salin **Internal Connection String** (cth: `postgres://saf_user:password@postgresql:5432/synergy_agro_db`).

### Langkah 3.3: Tambah Aplikasi dari GitHub
1. Di dalam projek **`Synergyagrowebsite`**, klik **+ New Resource** ➜ **Applications** ➜ **Public Repository** (atau Private GitHub App).
2. Masukkan URL Repository:
   ```text
   https://github.com/harhmd/synergyagroweb.git
   ```
3. Pilih cawangan: **`main`**.
4. Tetapkan **Build Pack** kepada **`Dockerfile`**.

### Langkah 3.4: Masukkan Environment Variables
Di tab **Environment Variables** aplikasi anda di Coolify, masukkan:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgres://saf_user:password@postgresql:5432/synergy_agro_db
```

### Langkah 3.5: Tekan "Deploy"
1. Klik butang **Deploy**.
2. Coolify akan membina imej Docker (Vite build + Express + PG).
3. Skrip auto-inisialisasi `server/initDb.ts` akan berjalan secara automatik:
   - Mencipta semua jadual berawalan `SYN_`.
   - Memasukkan ke-12 foto rasmi ladang terus ke dalam jadual `SYN_media`.
   - Mengisi data minuman dan pokok ke dalam `SYN_drinks` dan `SYN_nursery_items`.
4. Domain / URL anda sedia dibuka di Internet!

---

## 🛠️ 4. Menjalankan Ujian Setempat (Local Docker Test)

Jika ingin menguji keseluruhan sistem (Aplikasi + Postgres 18) di mesin tempatan sebelum VPS:

```bash
docker compose up --build
```
Aplikasi akan sedia diakses di `http://localhost:3000` dengan storan pangkalan data PostgreSQL.
