# 🌐 Deployment Guide

## Pre-Deployment Checklist

- [ ] Update MySQL password in `.env`
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Change `CORS_ORIGIN` to your actual domain
- [ ] Run `npm test` and ensure all tests pass
- [ ] Test all endpoints locally
- [ ] Remove any console.log statements (optional)
- [ ] Review security settings

## Deployment Options

### 1. VPS/Cloud Server (Recommended)

#### Using PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start the server
pm2 start server.js --name "backend-server"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

# Other useful PM2 commands
pm2 list              # List all processes
pm2 logs backend-server   # View logs
pm2 restart backend-server    # Restart
pm2 stop backend-server   # Stop
pm2 delete backend-server # Delete
```

#### Setup Nginx as Reverse Proxy (Optional)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

### 3. Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MYSQL_HOST=your_host
heroku config:set MYSQL_PORT=3306
heroku config:set MYSQL_USER=your_user
heroku config:set MYSQL_PASSWORD=your_password
heroku config:set MYSQL_DATABASE=your_database
heroku config:set SUPABASE_URL=your_supabase_url
heroku config:set SUPABASE_SERVICE_ROLE_KEY=your_key
heroku config:set SUPABASE_ANON_KEY=your_key
heroku config:set SUPABASE_DB_SCHEMA=module3
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### 4. Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables in Settings
5. Railway will automatically deploy

### 5. Render

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Click "Create Web Service"

### 6. DigitalOcean App Platform

1. Go to DigitalOcean
2. Create new App
3. Connect your GitHub repository
4. Configure environment variables
5. Deploy

## Environment Variables for Production

Update your `.env` file for production:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# MySQL Configuration
MYSQL_HOST=your_production_host
MYSQL_PORT=3306
MYSQL_USER=your_production_user
MYSQL_PASSWORD=your_strong_password
MYSQL_DATABASE=cdh_ihomis_plus

# CORS Configuration (IMPORTANT!)
CORS_ORIGIN=https://yourdomain.com

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_DB_SCHEMA=module3
```

## Security Best Practices

1. **Never commit `.env` file to Git**
   ```bash
   # Already in .gitignore
   echo ".env" >> .gitignore
   ```

2. **Use strong passwords**
   - Change default MySQL password
   - Use password managers

3. **Restrict CORS origins**
   ```env
   # Instead of *
   CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
   ```

4. **Use HTTPS in production**
   - Get free SSL certificate from Let's Encrypt
   - Use Cloudflare for additional security

5. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

6. **Set up monitoring**
   - Use PM2 monitoring
   - Set up error logging
   - Monitor server resources

7. **Database security**
   - Use read-only users when possible
   - Limit database access by IP
   - Regular backups

## Monitoring & Logs

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### Check Server Health
```bash
curl http://your-domain.com/api/health
```

## Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Server crashes
```bash
# Check PM2 logs
pm2 logs backend-server --lines 100
```

### Database connection issues
- Verify database credentials
- Check firewall rules
- Ensure database server is running
- Verify network connectivity

## Scaling

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Optimize database queries
- Add database indexes

### Horizontal Scaling
- Use PM2 cluster mode:
  ```bash
  pm2 start server.js -i max
  ```
- Add load balancer
- Use multiple server instances

## Backup Strategy

1. **Database backups**
   ```bash
   # MySQL backup
   mysqldump -u root -p cdh_ihomis_plus > backup.sql
   ```

2. **Code backups**
   - Use Git version control
   - Regular commits
   - Push to remote repository

3. **Environment variables backup**
   - Store securely (not in Git)
   - Use secret management tools

## Support

For issues or questions:
- Check [README.md](README.md)
- Check [QUICKSTART.md](QUICKSTART.md)
- Review server logs
- Test locally first

---

🎉 **Your server is ready for deployment!**

Choose the deployment method that best fits your needs and follow the steps above.
