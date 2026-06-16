# Docker Deployment Guide - Profile Web

Panduan lengkap untuk deploy aplikasi Profile Web menggunakan Docker. Aplikasi ini terdiri dari:

The project has been unified into a single Next.js full-stack application.
- `profile-web-app`: Next.js App Router (handles both frontend UI and API endpoints)
- `profile-web-db`: PostgreSQL Database16

## 📋 Prerequisites

Pastikan sistem Anda sudah terinstall:

- [Docker](https://docs.docker.com/get-docker/) (versi 20.10 atau lebih baru)
- [Docker Compose](https://docs.docker.com/compose/install/) (versi 2.0 atau lebih baru)

Verifikasi instalasi:

```bash
docker --version
docker-compose --version
```

## 🚀 Quick Start

### 1. Clone & Setup Environment

```bash
# Clone repository (jika belum)
git clone <repository-url>
cd Profile-Web

# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
```

### 2. Konfigurasi Environment Variables

Edit file `.env` untuk frontend:

```env
MY_EMAIL=your-email@gmail.com
MY_PASSWORD=your-app-password
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NODE_ENV=production
```

Edit file `backend/.env` untuk backend:

```env
PORT=5000
NODE_ENV=production
DB_HOST=db
DB_PORT=5432
DB_NAME=profile_web_db
DB_USER=postgres
DB_PASSWORD=your-secure-password-here
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-this
API_VERSION=v1
```

### 3. Build & Run (Production)

```bash
# Build semua services
docker-compose build

# Jalankan semua services
docker-compose up -d

# Lihat logs
docker-compose logs -f
```

Aplikasi akan berjalan di:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

### 4. Development Mode

Untuk development dengan hot-reload:

```bash
# Jalankan dalam mode development
docker-compose -f docker-compose.dev.yml up

# Atau run in background
docker-compose -f docker-compose.dev.yml up -d
```

## 🛠️ Perintah Docker Penting

### Manajemen Container

```bash
# Lihat status semua containers
docker-compose ps

# Stop semua services
docker-compose down

# Stop dan hapus volumes (HATI-HATI: akan menghapus data database)
docker-compose down -v

# Restart service tertentu
docker-compose restart backend
docker-compose restart frontend
docker-compose restart db

# Rebuild service tertentu
docker-compose build backend
docker-compose build frontend
```

### Logs & Debugging

```bash
# Lihat logs semua services
docker-compose logs

# Lihat logs service tertentu
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Follow logs (real-time)
docker-compose logs -f backend

# Lihat last 100 lines
docker-compose logs --tail=100 backend
```

### Database Management

```bash
# Akses PostgreSQL console
docker-compose exec db psql -U postgres -d profile_web_db

# Backup database
docker-compose exec db pg_dump -U postgres profile_web_db > backup.sql

# Restore database
docker-compose exec -T db psql -U postgres profile_web_db < backup.sql

# Lihat database size
docker-compose exec db psql -U postgres -d profile_web_db -c "SELECT pg_size_pretty(pg_database_size('profile_web_db'));"
```

### Mengakses Container Shell

```bash
# Backend container
docker-compose exec backend sh

# Frontend container
docker-compose exec frontend sh

# Database container
docker-compose exec db sh
```

## 📊 Health Checks

Semua services memiliki health checks:

```bash
# Check backend health
curl http://localhost:5000/health

# Check database health
docker-compose exec db pg_isready -U postgres

# Lihat health status semua containers
docker-compose ps
```

## 🔧 Troubleshooting

### Backend tidak bisa connect ke database

**Masalah**: Error `ECONNREFUSED` atau `ENOTFOUND`

**Solusi**:

```bash
# Pastikan database sudah running
docker-compose ps db

# Cek logs database
docker-compose logs db

# Restart backend setelah database ready
docker-compose restart backend
```

### Port sudah digunakan

**Masalah**: Error `port is already allocated`

**Solusi**:

```bash
# Lihat proses yang menggunakan port
# Windows (PowerShell)
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :5432

# Linux/Mac
lsof -i :3000
lsof -i :5000
lsof -i :5432

# Stop proses atau ubah port di docker-compose.yml
```

### Frontend build error

**Masalah**: Next.js standalone mode error

**Solusi**:

```bash
# Update next.config.ts
# Tambahkan: output: 'standalone'

# Rebuild frontend
docker-compose build --no-cache frontend
```

### Database data hilang setelah restart

**Masalah**: Data tidak persist

**Solusi**:

```bash
# Pastikan volume sudah dibuat
docker volume ls | grep profile

# Jangan gunakan flag -v saat down
docker-compose down  # ✅ Correct (keeps volumes)
# docker-compose down -v  # ❌ Wrong (deletes volumes)
```

### Permission denied errors

**Masalah**: Permission errors di Linux

**Solusi**:

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login again
# Atau run dengan sudo
sudo docker-compose up
```

## 🚢 Production Deployment

### Deploy ke VPS/Server

1. **Install Docker di server**:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

2. **Clone repository**:

```bash
git clone <repository-url>
cd Profile-Web
```

3. **Setup environment**:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
# Edit dengan nano/vim
nano .env
nano backend/.env
```

4. **Deploy**:

```bash
docker-compose up -d
```

5. **Setup Nginx reverse proxy** (opsional):

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Environment Variables untuk Production

**PENTING**: Ubah nilai berikut di production:

```env
# Backend
DB_PASSWORD=<password-yang-kuat>
JWT_SECRET=<generate-random-string-panjang>
CORS_ORIGIN=https://your-domain.com  # domain production Anda

# Frontend
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

Generate JWT secret yang aman:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📦 CI/CD Integration

### GitHub Actions Example

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/Profile-Web
            git pull origin main
            docker-compose build
            docker-compose up -d
```

## 🔍 Monitoring

### Lihat resource usage

```bash
# CPU, Memory usage
docker stats

# Disk usage
docker system df

# Container logs size
docker-compose logs --tail=0 | wc -l
```

## 🗑️ Cleanup

```bash
# Remove stopped containers
docker-compose down

# Remove unused images
docker image prune -a

# Remove unused volumes (HATI-HATI!)
docker volume prune

# Complete cleanup
docker system prune -a --volumes
```

## 📝 Database Migrations

Untuk menjalankan migrations atau perubahan schema database:

```bash
# Option 1: Via psql
docker-compose exec db psql -U postgres -d profile_web_db

# Di psql console, jalankan SQL commands
# Contoh:
ALTER TABLE blogs ADD COLUMN slug VARCHAR(255);

# Option 2: Via SQL file
docker-compose exec -T db psql -U postgres -d profile_web_db < migrations/001_add_slug.sql
```

## 🔐 Security Best Practices

1. **Jangan commit file .env ke Git**
2. **Gunakan secrets yang kuat untuk production**
3. **Update image secara regular**: `docker-compose pull && docker-compose up -d`
4. **Limit database access**: Jangan expose port 5432 di production
5. **Enable HTTPS**: Gunakan Nginx + Let's Encrypt
6. **Regular backups**: Setup cron job untuk backup database

## 📞 Support

Jika mengalami masalah:

1. Cek logs: `docker-compose logs -f`
2. Cek health: `docker-compose ps`
3. Restart services: `docker-compose restart`
4. Rebuild: `docker-compose build --no-cache`

---

**Happy Deploying! 🚀**
