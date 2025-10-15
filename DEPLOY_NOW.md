# 🚀 Deploy Your Chess Coach App NOW

Your code is on GitHub! Let's get it on Netlify.

**Your Repository**: https://github.com/DanielJohnsonXYZ/Chess-Coach-Master

---

## Option 1: Deploy via Netlify UI (5 Minutes) ⭐ RECOMMENDED

### Step 1: Go to Netlify

Open: **[app.netlify.com](https://app.netlify.com)**

### Step 2: Import Your Project

1. Click the big **"Add new site"** button
2. Choose **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub (if needed)

### Step 3: Select Your Repository

1. Search for: **Chess-Coach-Master**
2. Click on your repository

### Step 4: Configure Build Settings

Netlify should auto-detect from your `netlify.toml`, but verify:

**Site name**: `chess-coach-master` (or choose your own)

**Build settings**:
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`

Click **"Show advanced"** button

### Step 5: Add Environment Variable

Click **"New variable"**:

- **Key**: `VITE_API_URL`
- **Value**: `http://localhost:3001`

(We'll update this later when you deploy the backend)

### Step 6: Deploy!

1. Click **"Deploy Chess-Coach-Master"**
2. Watch the build log (takes ~2 minutes)
3. Wait for "Published" status

### Step 7: Get Your URL! 🎉

You'll see something like:

```
https://chess-coach-master.netlify.app
```

**Click it and start playing chess!**

---

## Option 2: Deploy via Netlify CLI (For Advanced Users)

### Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Login to Netlify

```bash
netlify login
```

### Deploy from Your Computer

```bash
cd chess-coach-app/frontend

# Initialize Netlify
netlify init

# Follow prompts:
# - Create & configure a new site? Yes
# - Team: Choose your team
# - Site name: chess-coach-master
# - Build command: npm run build
# - Directory to deploy: dist

# Set environment variable
netlify env:set VITE_API_URL http://localhost:3001

# Deploy to production
netlify deploy --prod
```

---

## What Happens Next?

### ✅ Your Site is Live!

Visit: `https://chess-coach-master.netlify.app` (or your custom name)

### ✅ What Works Right Now:

- ♟️ Full chess gameplay
- 🎮 Drag-and-drop pieces
- 📊 Dashboard with stats
- 📈 Performance charts
- 🌓 Dark/light theme
- 📱 Mobile responsive
- 🎨 Beautiful UI

### ⏳ What Needs Backend (Claude API):

- 🤖 AI coach chat
- 📝 Post-game analysis
- 💡 Move hints
- 📊 Weekly reflections

The frontend will show friendly messages for these features until you deploy the backend.

---

## Next: Deploy the Backend (Optional)

To enable AI coaching features:

### Quick Backend Deploy to Railway

1. Go to **[railway.app](https://railway.app)**
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select **Chess-Coach-Master**
5. Click **"Add variables"**:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key ([get one here](https://console.anthropic.com/))
6. Under **Settings**:
   - Set **Root Directory**: `backend`
7. Click **"Deploy"**

### Update Netlify After Backend Deploy

1. Copy your Railway URL (e.g., `https://chess-coach-master-production.up.railway.app`)
2. Go to Netlify dashboard → **Site settings** → **Environment variables**
3. Edit `VITE_API_URL` to your Railway URL
4. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## Troubleshooting

### Build Fails?

**Check the deploy log** in Netlify for the specific error.

**Common fixes**:
```bash
# Test locally first
cd frontend
npm install
npm run build

# If it works, check:
# 1. package.json is committed
# 2. netlify.toml is in frontend/
# 3. No .env secrets in code
```

### Site Shows White Screen?

1. Open browser DevTools (F12)
2. Check Console for errors
3. Likely issue: JavaScript errors - check Netlify build log

### Can't See Updates?

**Hard refresh**: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)

---

## Custom Domain (Optional)

### Use Netlify Subdomain

1. Site settings → Domain management
2. Options → Edit site name
3. Change to: `chess-coach-yourname.netlify.app`

### Use Your Own Domain

1. Site settings → Domain management
2. Add custom domain
3. Update DNS records (Netlify shows you how)
4. Wait 5-30 minutes for DNS propagation

---

## Auto-Deploy is Enabled! 🎯

Every time you push to GitHub:

```bash
cd chess-coach-app
git add .
git commit -m "Update UI"
git push
```

Netlify automatically:
1. ✅ Detects the push
2. ✅ Builds your app
3. ✅ Deploys to production
4. ✅ Notifies you when done

---

## Share Your App! 🌟

Your live URL:
```
https://chess-coach-master.netlify.app
```

Share on:
- Twitter/X
- LinkedIn
- Reddit
- Hacker News
- Product Hunt

---

## Monitor Your Site

### Netlify Dashboard

- **Deploys**: See all deployments
- **Functions**: (not used yet)
- **Analytics**: Available with paid plan
- **Logs**: Real-time deploy logs

### Free Monitoring Tools

- **Google Analytics**: User tracking
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Plausible**: Privacy-first analytics

---

## Performance Check

After deploying, test your site:

- **Lighthouse**: Run in Chrome DevTools
- **GTmetrix**: https://gtmetrix.com
- **PageSpeed Insights**: https://pagespeed.web.dev

Your app should score:
- ⚡ Performance: 90+
- ♿ Accessibility: 90+
- 🎯 Best Practices: 90+
- 📱 SEO: 90+

---

## Quick Commands

```bash
# View your site
netlify open:site

# View admin panel
netlify open:admin

# Check deploy status
netlify status

# View logs
netlify watch

# Redeploy
netlify deploy --prod
```

---

## Support & Help

### Documentation
- 📖 [Netlify Docs](https://docs.netlify.com)
- 📖 Your [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md)
- 📖 Your [DEPLOYMENT.md](DEPLOYMENT.md)

### Community
- [Netlify Community](https://answers.netlify.com)
- [GitHub Discussions](https://github.com/DanielJohnsonXYZ/Chess-Coach-Master/discussions)

---

## Checklist ✅

Before clicking "Deploy":

- [x] Code is on GitHub ✅
- [x] `netlify.toml` is in `frontend/` ✅
- [x] `package.json` is committed ✅
- [x] Build works locally ✅
- [ ] Ready to deploy!

---

## 🎉 You're Ready!

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site"
3. Select your GitHub repo: **Chess-Coach-Master**
4. Verify settings (auto-detected)
5. Add `VITE_API_URL` environment variable
6. Click "Deploy"
7. Wait 2 minutes
8. **Your chess app is LIVE!** ♟️🚀

---

**Questions?** Check [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md) for detailed steps.

**Backend deployment?** See [DEPLOYMENT.md](DEPLOYMENT.md) for Railway setup.

---

**Let's deploy!** Your app is waiting to go live! 🌟
