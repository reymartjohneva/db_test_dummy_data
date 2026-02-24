# 🚀 Deploy to Render - Step by Step Guide

## Prerequisites
✅ GitHub repository: https://github.com/reymartjohneva/db_test_dummy_data.git  
✅ Code is pushed to GitHub  
✅ render.yaml configuration file added  

## Step-by-Step Deployment

### Step 1: Create Render Account
1. Go to **https://render.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (easier!)
4. Authorize Render to access your GitHub account

### Step 2: Create New Web Service
1. Once logged in, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - If you see your repo listed, click **"Connect"**
   - If not, click **"Configure account"** → Grant access to your repository

### Step 3: Configure Your Service

Render will auto-detect your settings from `render.yaml`, but verify:

**Basic Settings:**
- **Name:** `test-server` (or any name you want)
- **Region:** Choose closest to Philippines (Singapore recommended)
- **Branch:** `main`
- **Runtime:** `Node`

**Build & Deploy:**
- **Build Command:** `npm install` ✅ (auto-detected)
- **Start Command:** `npm start` ✅ (auto-detected)

**Instance Type:**
- Select **"Free"** plan (perfect for testing)

### Step 4: Add Environment Variables ⚠️ IMPORTANT!

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables from your `.env` file:

```
MYSQL_HOST=180.232.187.222
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=5XbRP4K0Pf686410Lgb6uNDMMksuLbkCl5BTMTOlZ3cYwncZZVv33L2qZx1ws1v2
MYSQL_DATABASE=cdh_ihomis_plus
CORS_ORIGIN=*
NODE_ENV=production
```

**How to add each variable:**
1. Click **"Add Environment Variable"**
2. Enter **Key** (e.g., `MYSQL_HOST`)
3. Enter **Value** (e.g., `180.232.187.222`)
4. Repeat for all variables above

### Step 5: Deploy!
1. Click **"Create Web Service"** button
2. Wait for deployment (usually 2-5 minutes)
3. Watch the logs in real-time

### Step 6: View Your Deployment Logs

You'll see logs like:
```
==> Starting service with 'npm start'
🚀 Starting Express.js Server...
Testing database connections...
✓ MySQL Database connected successfully
✓ Server is running on http://localhost:3000
✓ Server ready to accept requests
```

### Step 7: Get Your Live URL

Once deployed, Render gives you a URL like:
```
https://test-server-xxxx.onrender.com
```

### Step 8: Test Your Live Server

Open these URLs in your browser:
```
https://your-app.onrender.com/
https://your-app.onrender.com/api/health
https://your-app.onrender.com/api/mysql/test
https://your-app.onrender.com/api/mysql/tables
```

Or test with curl:
```bash
curl https://your-app.onrender.com/api/health
```

## ⚠️ Important Notes

### Free Tier Limitations:
- ✅ **750 hours/month** (enough for 24/7)
- ⏸️ **Auto-sleeps after 15 minutes** of inactivity
- ⏱️ **Takes ~30 seconds to wake up** on first request
- ✅ Free SSL certificate included
- ✅ Automatic deploys on git push

### MySQL Connection:
Make sure your MySQL server at `180.232.187.222` allows connections from Render's IP addresses. You might need to:
- Allow connections from any IP (0.0.0.0/0) in MySQL settings
- Or whitelist Render's IP ranges

### Auto-Deploy on Git Push:
Every time you push to GitHub, Render automatically redeploys! 🎉

```bash
git add .
git commit -m "Update server"
git push
# Render automatically starts deploying!
```

## 🎯 Quick Checklist

- [ ] Signed up on Render.com
- [ ] Connected GitHub repository
- [ ] Added all environment variables
- [ ] Created web service
- [ ] Deployment successful (check logs)
- [ ] Tested live URL endpoints
- [ ] MySQL connection working

## 🐛 Troubleshooting

### Deployment Failed?
- Check the logs in Render dashboard
- Verify all environment variables are set
- Make sure MySQL allows external connections

### Can't Connect to MySQL?
- Test locally first: `npm test`
- Check MySQL server firewall settings
- Verify credentials in environment variables

### App is Sleeping?
- This is normal on free tier
- First request after 15 min takes ~30 sec
- Upgrade to paid plan ($7/month) for always-on

## 🎉 Success!

Your server is now live on the internet! Share your API URL with anyone.

**Example:**
```
https://test-server-xxxx.onrender.com/api/health
```

## 📱 Next Steps

1. **Custom Domain:** Add your own domain in Render dashboard
2. **Monitoring:** Check logs and metrics in Render dashboard
3. **Scaling:** Upgrade to paid plan if needed
4. **CI/CD:** Already setup! Just push to GitHub to deploy

---

Need help? Check the full [DEPLOYMENT.md](DEPLOYMENT.md) or Render's documentation.
