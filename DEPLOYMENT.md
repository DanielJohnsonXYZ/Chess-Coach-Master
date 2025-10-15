# Deployment Guide

Complete guide for deploying Chess Coach to Netlify (frontend) and Railway (backend).

## Table of Contents

1. [Backend Deployment (Railway)](#backend-deployment-railway)
2. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
3. [Alternative: Backend on Render](#alternative-backend-on-render)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Testing](#post-deployment-testing)

---

## Backend Deployment (Railway)

Railway is recommended for the backend as it offers easy deployment with minimal configuration.

### Step 1: Prepare Your Code

Ensure you have a Git repository:

```bash
cd chess-coach-app
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Sign Up for Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `chess-coach-app` repository

### Step 3: Configure Railway

1. Railway will detect your backend automatically
2. Set the **Root Directory** to `backend`
3. Click on your service → **Variables** tab
4. Add environment variables:
   - `ANTHROPIC_API_KEY` = your_api_key_here
   - `PORT` = 3001
   - `NODE_ENV` = production

### Step 4: Deploy

1. Railway will automatically build and deploy
2. Wait for deployment to complete (2-3 minutes)
3. Copy your backend URL (e.g., `https://your-app.railway.app`)

### Railway Configuration File (Optional)

Create `railway.json` in the backend directory:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## Frontend Deployment (Netlify)

Netlify is perfect for static React apps with automatic deployments from Git.

### Step 1: Build Configuration

Your `netlify.toml` is already configured in the frontend directory.

### Step 2: Sign Up for Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository

### Step 3: Configure Build Settings

Netlify should auto-detect settings from `netlify.toml`, but verify:

- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`
- **Node version**: 18

### Step 4: Set Environment Variables

In Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add variable:
   - Key: `VITE_API_URL`
   - Value: Your Railway backend URL (e.g., `https://your-app.railway.app`)

### Step 5: Deploy

1. Click "Deploy site"
2. Wait for build to complete (1-2 minutes)
3. Your site will be live at `https://random-name.netlify.app`

### Step 6: Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click "Add custom domain"
3. Follow instructions to configure DNS

---

## Alternative: Backend on Render

If you prefer Render over Railway:

### Step 1: Sign Up

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"

### Step 2: Configure Service

- **Repository**: Select your repo
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Step 3: Environment Variables

Add in Render dashboard:

- `ANTHROPIC_API_KEY` = your_api_key_here
- `NODE_ENV` = production

### Step 4: Deploy

Click "Create Web Service" and wait for deployment.

---

## Environment Variables

### Backend (.env)

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
PORT=3001
NODE_ENV=production
```

### Frontend (.env.production)

Create this file in `frontend/`:

```env
VITE_API_URL=https://your-backend.railway.app
```

**Important**: Don't commit `.env` files with secrets to Git!

---

## Post-Deployment Testing

### 1. Test Backend API

```bash
# Health check
curl https://your-backend.railway.app/api/health

# Expected response:
# {"status":"ok","timestamp":"2024-..."}
```

### 2. Test Frontend

1. Visit your Netlify URL
2. Navigate to "Play" page
3. Make a chess move
4. Check browser console for any errors
5. Go to "Review" page
6. Try the coach chat feature

### 3. Test Full Integration

1. Play a complete game
2. Check if game appears in Dashboard
3. Try coach chat on Review page
4. Verify dark/light theme toggle works

---

## Troubleshooting

### Backend Issues

**Problem**: API returns 500 errors

**Solutions**:
- Check Railway/Render logs
- Verify `ANTHROPIC_API_KEY` is set correctly
- Ensure backend is running (check service status)

**Problem**: CORS errors

**Solutions**:
- Verify frontend URL is allowed in backend CORS config
- Check that `VITE_API_URL` is set correctly in Netlify

### Frontend Issues

**Problem**: Blank white screen

**Solutions**:
- Check browser console for errors
- Verify build completed successfully in Netlify
- Check Netlify deploy logs

**Problem**: API calls failing

**Solutions**:
- Verify `VITE_API_URL` environment variable is set
- Check Network tab in browser DevTools
- Ensure backend is deployed and running

### Environment Variable Issues

**Problem**: Environment variables not working

**Solutions**:
- In Netlify: Redeploy after adding variables
- In Railway: Restart service after adding variables
- Verify variable names match exactly (case-sensitive)

---

## Monitoring & Logs

### Railway Logs

```bash
# View real-time logs
railway logs
```

Or in Railway dashboard:
1. Click your service
2. Go to "Deployments" tab
3. Click latest deployment
4. View logs

### Netlify Logs

1. Go to your site in Netlify
2. Click "Deploys"
3. Click on a deploy
4. View "Deploy log"

---

## Continuous Deployment

Both Netlify and Railway support automatic deployments:

1. Push to your `main` branch
2. Deployment triggers automatically
3. Changes go live in 2-3 minutes

To disable auto-deploy:
- **Netlify**: Site settings → Build & deploy → Stop auto publishing
- **Railway**: Service settings → Disable auto-deploy

---

## Costs

### Free Tier Limits

**Railway**:
- $5 free credit per month
- Sufficient for hobby projects
- Upgrade to Pro for $20/month

**Netlify**:
- 100 GB bandwidth/month
- 300 build minutes/month
- Free for most personal projects

---

## Security Checklist

Before going live:

- [ ] ANTHROPIC_API_KEY is in environment variables (not code)
- [ ] `.env` files are in `.gitignore`
- [ ] CORS is configured properly
- [ ] HTTPS is enabled (automatic on both platforms)
- [ ] API rate limiting is considered (for future)
- [ ] Environment variables are set in production

---

## Updating Your Deployment

### Backend Updates

```bash
# Make changes
git add backend/
git commit -m "Update backend"
git push

# Railway auto-deploys
```

### Frontend Updates

```bash
# Make changes
git add frontend/
git commit -m "Update frontend"
git push

# Netlify auto-deploys
```

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Netlify Docs: https://docs.netlify.com
- Anthropic API Docs: https://docs.anthropic.com

---

## Next Steps After Deployment

1. ✅ Share your live URL!
2. 🎮 Play chess and test all features
3. 📊 Monitor usage in Railway/Netlify dashboards
4. 🔄 Set up custom domain (optional)
5. 📈 Add analytics (Google Analytics, Plausible, etc.)
6. 🚀 Share with friends and get feedback!

Your Chess Coach app is now live! 🎉
