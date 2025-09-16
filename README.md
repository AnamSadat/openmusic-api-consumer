# OpenMusic API Consumer

Service ini adalah **consumer** untuk [OpenMusic API](https://github.com/AnamSadat/openmusic-api.git).  
Digunakan untuk menangani permintaan **ekspor playlist** melalui **RabbitMQ** dan mengirimkan hasil ekspor ke email tujuan menggunakan **Nodemailer**.

## 🚀 Fitur

- Mendengarkan pesan dari **RabbitMQ** queue.
- Mengambil data playlist (id, nama, dan daftar lagu) dari pesan.
- Menghasilkan file JSON berisi playlist.
- Mengirimkan file JSON hasil ekspor ke email target menggunakan **SMTP** (via Nodemailer).
- Menggunakan environment variable untuk konfigurasi (server RabbitMQ & kredensial email).

## 🛠 Teknologi

- **JavaScript (ES6+)**
- **Node.js**
- **RabbitMQ** → menerima pesan dari producer.
- **Nodemailer** → mengirim email hasil ekspor playlist.
- **dotenv** → load konfigurasi environment variable.
- **Joi** (Data Validation)
- **PostgreSQL** (Database)

## ⚙️ Environment Variables

Buat file `.env` dengan format seperti berikut:

```env
# database configuration
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGHOST=localhost
PGDATABASE=openmusic
PGPORT=5432
PORT=5000

# nodemailer
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password

# rabbitmq
RABBITMQ_SERVER=amqp://localhost
```

## 📦 Instalasi & Menjalankan

1. Clone repository:

```bash
git clone https://github.com/AnamSadat/openmusic-api-consumer.git
cd openmusic-api-consumer

```

2. Install dependencies:

```bash
npm install
```

3. Jalankan service consumer:

```bash
npm run start
```

## 🔄 Alur Kerja

1. Producer (`openmusic-api`) mengirim pesan ke RabbitMQ queue berisi:

```json
{
  "playlistId": "playlist-Mk8AnmCp210PwT6B",
  "targetEmail": "user@example.com"
}
```

2. Consumer (`openmusic-api-consumer`) menerima pesan tersebut.

3. Consumer mengambil data playlist dari database (via API/DB query).

4. Consumer membuat file JSON playlist sesuai struktur.

5. File JSON dikirim sebagai attachment ke targetEmail.

## 📧 Contoh Email

- Subject: Ekspor Playlist
- Attachment: `playlist.json` (berisi data playlist)
- Contoh isi `playlist.json`:

```json
{
  "playlist": {
    "id": "playlist-JvckMNAoXNqqP8lX",
    "name": "Lagu Indie Hits Indonesia",
    "songs": [
      {
        "id": "song-WpgJwyemztl5Vf1I",
        "title": "Fix You",
        "performer": "Coldplay"
      }
    ]
  }
}
```

## Struktur Proyek

```tree
openmusic-api-consumer/
├── .vscode              # Konfigurasi khusus untuk editor VSCode
├── src                  # Source code utama
│   ├── utils            # Utility & konfigurasi (helper, config, dll.)
│   ├── validator        # Validasi data (pakai Joi)
│   ├── consumer.js      # Entry point consumer, menerima pesan dari RabbitMQ
│   ├── listener.js      # Listener untuk menangani pesan dari queue
│   ├── MailSender.js    # Service untuk mengirim email via Nodemailer
│   └── PlaylistService.js # Service untuk akses playlist (Postgres)
├── .env                 # Konfigurasi environment utama
├── .env.example         # Template contoh konfigurasi environment
├── .eslintrc.json       # Konfigurasi ESLint (linting rules)
├── .gitignore           # File/folder yang diabaikan Git
├── .prettierrc          # Konfigurasi Prettier (formatter)
├── package.json         # Metadata & dependency project
├── package-lock.json    # Versi lock dependencies
└── README.md            # Dokumentasi project

```
