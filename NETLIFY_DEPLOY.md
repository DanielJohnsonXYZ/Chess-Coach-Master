# Quick Netlify Deployment Guide

Get your Chess Coach app on Netlify in 10 minutes!

## Prerequisites

- ✅ GitHub account
- ✅ Your code pushed to GitHub
- ✅ Backend deployed (Railway/Render) OR running locally for testing

---

## Option 1: Deploy via Netlify UI (Recommended)

### Step 1: Push to GitHub

```bash
cd chess-coach-app

# Initialize git if needed
git init
git add .
git commit -m "Ready for deployment"

# Create GitHub repo and push
gh repo create chess-coach-app --public --source=. --push
# OR manually create repo on GitHub and:
git remote add origin https://github.com/YOUR_USERNAME/chess-coach-app.git
git push -u origin main
```

### Step 2: Deploy on Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your **chess-coach-app** repository
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
6. Click **"Show advanced"** → **"New variable"**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app` (or `http://localhost:3001` for testing)
7. Click **"Deploy site"**

### Step 3: Wait for Build

- Build takes 1-2 minutes
- Watch the deploy log for any errors
- When complete, you'll get a URL like `https://amazing-chess-12345.netlify.app`

### Step 4: Test Your Site

1. Visit your Netlify URL
2. Try playing a game
3. Check the Dashboard
4. Test the coach chat (if backend is deployed)

---

## Option 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

### Step 3: Initialize Netlify

```bash
cd chess-coach-app/frontend
netlify init
```

Follow prompts:
- **Create & configure a new site**: Yes
- **Team**: Choose your team
- **Site name**: chess-coach-app (or custom name)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Step 4: Set Environment Variables

```bash
netlify env:set VITE_API_URL https://your-backend-url.railway.app
```

### Step 5: Deploy

```bash
# Deploy to production
netlify deploy --prod
```

---

## Option 3: Manual Deploy (No Git)

### Step 1: Build Locally

```bash
cd chess-coach-app/frontend

# Create .env.production file
echo "VITE_API_URL=https://your-backend-url.railway.app" > .env.production

# Build
npm run build
```

### Step 2: Deploy via Netlify UI

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag and drop the `frontend/dist` folder onto Netlify
3. Your site is live instantly!

**Note**: Manual deploys don't auto-update when you push to Git.

---

## Configure Custom Domain

### Using Netlify Subdomain

Free and automatic:
1. Go to **Site settings** → **Domain management**
2. Click **"Options"** → **"Edit site name"**
3. Change to: `chess-coach-yourname.netlify.app`

### Using Your Own Domain

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `chess.yourdomain.com`)
4. Update your DNS:
   - **A Record**: Point to Netlify's IP
   - **CNAME**: Point to your Netlify subdomain
5. Wait for DNS propagation (5-30 minutes)

---

## Environment Variables

Add these in Netlify dashboard (**Site settings** → **Environment variables**):

### Required

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_URL` | `https://your-backend.railway.app` | Backend API URL |

### Optional

| Key | Value | Description |
|-----|-------|-------------|
| `NODE_VERSION` | `18` | Node.js version |

**Important**: Redeploy after adding environment variables!

---

## Troubleshooting

### Build Fails

**Error**: `Command failed with exit code 1`

**Fix**:
```bash
# Test build locally first
cd frontend
npm run build

# If it works locally, check Netlify build log for specific errors
```

**Error**: `Cannot find module 'vite'`

**Fix**: Ensure `package.json` and `package-lock.json` are committed to Git

### Site Loads but Shows Errors

**Error**: `Failed to fetch` in browser console

**Fix**:
1. Check `VITE_API_URL` is set correctly
2. Verify backend is deployed and running
3. Test backend URL directly: `curl https://your-backend-url.railway.app/api/health`

**Error**: `404` on page refresh

**Fix**: Already handled in `netlify.toml` redirects. Make sure `netlify.toml` is in the `frontend/` directory.

### Dark Mode Not Working

**Fix**: Clear browser cache and localStorage:
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

---

## Netlify Configuration Reference

Your `frontend/netlify.toml`:

```toml
[build]
  base = "frontend/"
  publish = "dist/"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Performance Tips

### Enable Netlify Features

1. **Asset Optimization**: Automatically enabled
2. **Prerendering**: In **Site settings** → **Build & deploy**
3. **Form Detection**: Off (we don't use forms)

### Speed Up Builds

Add to `netlify.toml`:

```toml
[build]
  publish = "dist/"
  command = "npm ci && npm run build"  # Faster than npm install
```

### Caching

Headers are already configured in `netlify.toml`:
- Static assets cached for 1 year
- HTML files not cached (ensures updates are seen)

---

## Monitoring

### Deploy Notifications

1. Go to **Site settings** → **Build & deploy** → **Deploy notifications**
2. Add notification for:
   - Deploy started
   - Deploy failed
   - Deploy succeeded

Options:
- Email
- Slack
- Discord webhook

### Analytics

Enable Netlify Analytics:
1. Go to **Integrations** → **Analytics**
2. Enable for $9/month
3. Or use free alternatives:
   - Google Analytics
   - Plausible
   - Umami

---

## Automatic Deployments

Netlify auto-deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update UI"
git push

# Netlify automatically:
# 1. Detects the push
# 2. Runs build
# 3. Deploys to production
# 4. Sends you a notification
```

### Deploy Previews

Every pull request gets a preview URL:
1. Create a branch: `git checkout -b feature/new-ui`
2. Push changes: `git push -u origin feature/new-ui`
3. Open PR on GitHub
4. Netlify comments with preview URL
5. Test before merging!

---

## Deploy Contexts

Different builds for different branches:

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend.railway.app
```

Create `frontend/.env.development`:
```env
VITE_API_URL=http://localhost:3001
```

---

## Commands Reference

```bash
# Deploy to draft URL
netlify deploy

# Deploy to production
netlify deploy --prod

# View site in browser
netlify open:site

# View admin panel
netlify open:admin

# View deploy logs
netlify watch

# Link to existing site
netlify link

# Unlink from site
netlify unlink
```

---

## What's Next?

After successful deployment:

1. ✅ Test all features on the live site
2. 🔗 Share your URL: `https://your-site.netlify.app`
3. 🎨 Customize your domain name
4. 📊 Set up analytics
5. 🚀 Deploy backend if you haven't already
6. 🎮 Play chess and enjoy!

---

## Get Help

- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://answers.netlify.com
- This project's README: [README.md](README.md)

---

**Your Chess Coach app is now live on Netlify!** ♟️🎉

Visit your site and start playing!
