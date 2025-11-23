# Deployment Guide - Gold Shop Invoice Management

## Table of Contents
- [Vercel Deployment](#vercel-deployment)
- [Self-Hosted Deployment](#self-hosted-deployment)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Cloudinary Setup](#cloudinary-setup)
- [Security Checklist](#security-checklist)

## Vercel Deployment

### Step 1: Prepare Your Repository

\`\`\`bash
# Ensure all changes are committed
git add .
git commit -m "Ready for production"
git push origin main
\`\`\`

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up or sign in
3. Click "Add New Project"

### Step 3: Import GitHub Repository

1. Connect your GitHub account
2. Select the `gold-shop-invoice` repository
3. Click "Import"

### Step 4: Configure Environment Variables

In the Vercel dashboard:

\`\`\`
NEXT_PUBLIC_API_URL=https://your-project.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. Your app is live at `https://your-project.vercel.app`

## Self-Hosted Deployment

### Option A: Linux Server with PM2

#### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Git installed

#### Setup Steps

\`\`\`bash
# 1. Clone repository
git clone <your-repo-url>
cd gold-shop-invoice

# 2. Install dependencies
npm install --production

# 3. Build application
npm run build

# 4. Install PM2 globally
npm install -g pm2

# 5. Start application with PM2
pm2 start npm --name "gold-shop" -- start

# 6. Configure PM2 to restart on reboot
pm2 startup
pm2 save

# 7. View logs
pm2 logs gold-shop

# 8. Configure Nginx reverse proxy (optional)
# See Nginx config below
\`\`\`

#### Nginx Configuration

\`\`\`nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SSL configuration (recommended)
    listen 443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
}
\`\`\`

### Option B: Docker Deployment

#### Dockerfile

\`\`\`dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

#### Docker Compose

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://yourdomain.com
      - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
    restart: unless-stopped
\`\`\`

#### Deploy with Docker

\`\`\`bash
# Build image
docker build -t gold-shop-invoice .

# Run container
docker run -d \
  --name gold-shop \
  -p 3000:80 \
  -e NODE_ENV=production \
  gold-shop-invoice

# Or use Docker Compose
docker-compose up -d
\`\`\`

## Environment Setup

### Create Production Environment File

\`\`\`bash
# SSH into your server
ssh user@your-server.com

# Navigate to app directory
cd /home/user/gold-shop-invoice

# Create .env.local
nano .env.local
\`\`\`

### Add Environment Variables

\`\`\`
# API Configuration
NEXT_PUBLIC_API_URL=https://yourdomain.com
NODE_ENV=production

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database (future)
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
SESSION_SECRET=your-super-secret-session-key-min-32-chars

# Application
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_GST_RATE=18
\`\`\`

## Database Setup

### MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create account and cluster
3. Get connection string
4. Add to `.env.local` as `MONGODB_URI`

### Self-Hosted MongoDB

\`\`\`bash
# Install MongoDB
sudo apt-get install -y mongodb

# Start service
sudo systemctl start mongodb

# Connection string
MONGODB_URI=mongodb://localhost:27017/gold-shop
\`\`\`

## Cloudinary Setup

### Create Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Go to Dashboard

### Get Credentials

- Cloud Name: Found in dashboard
- API Key: In Settings > API Keys
- API Secret: In Settings > API Keys

### Configure Folders

In Cloudinary Dashboard:

\`\`\`
Settings > Upload > Upload presets

Create preset:
- Name: gold-shop-invoices
- Folder: invoices
- Resource type: Auto
- Signing mode: Signed
\`\`\`

## Security Checklist

- [ ] Environment variables set in production
- [ ] JWT secret key is strong (32+ characters)
- [ ] MongoDB password is strong
- [ ] Cloudinary API secret not exposed
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Rate limiting configured on auth endpoints
- [ ] CORS properly configured
- [ ] Database backups scheduled
- [ ] Error logs monitored
- [ ] Security headers configured
- [ ] Firewall properly configured
- [ ] Regular security updates scheduled

## Monitoring & Maintenance

### Log Monitoring

\`\`\`bash
# View PM2 logs
pm2 logs gold-shop

# View specific number of lines
pm2 logs gold-shop --lines 100

# Watch logs in real-time
pm2 logs gold-shop --watch
\`\`\`

### Performance Monitoring

\`\`\`bash
# Install monitoring tool
npm install -g clinic

# Analyze performance
clinic doctor -- npm start

# View results
clinic doctor --view
\`\`\`

### Database Backups

\`\`\`bash
# MongoDB backup
mongodump --out /backups/mongodb-backup-$(date +%Y%m%d)

# Restore
mongorestore /backups/mongodb-backup-20240101
\`\`\`

## Troubleshooting

### Application Won't Start

\`\`\`bash
# Check Node version
node --version

# Check PM2 status
pm2 status

# View error logs
pm2 logs --err
\`\`\`

### Build Fails

\`\`\`bash
# Clear cache
rm -rf .next node_modules

# Rebuild
npm install
npm run build

# Check for TypeScript errors
npm run type-check
\`\`\`

### Database Connection Issues

\`\`\`bash
# Test MongoDB connection
mongo "mongodb://localhost:27017/gold-shop"

# Check connection string
echo $MONGODB_URI
\`\`\`

### High Memory Usage

\`\`\`bash
# Monitor processes
pm2 monit

# Check memory
free -h

# Increase Node memory if needed
NODE_OPTIONS="--max-old-space-size=4096" npm start
\`\`\`

## Rollback Procedure

\`\`\`bash
# Stop application
pm2 stop gold-shop

# Checkout previous version
git checkout HEAD~1

# Rebuild
npm run build

# Start application
pm2 start gold-shop

# Monitor logs
pm2 logs gold-shop
\`\`\`

## Performance Optimization

### Enable Caching

\`\`\`bash
# Add to next.config.mjs
headers: async () => {
  return [{
    source: '/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  }]
}
\`\`\`

### Enable Compression

\`\`\`bash
# Already enabled in next.config.mjs
compress: true
\`\`\`

### CDN Setup (CloudFront/Cloudflare)

1. Create CDN distribution
2. Point to your domain
3. Cache static assets
4. Enable compression

## Support & Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Cloudinary API Docs](https://cloudinary.com/documentation)

---

**Last Updated**: November 2024
