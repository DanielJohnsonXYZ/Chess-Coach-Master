# Deployment Checklist

Quick reference for deploying Chess Coach to production.

## Pre-Deployment

- [ ] Code is working locally
- [ ] All dependencies are in `package.json`
- [ ] `.gitignore` includes `.env` and `node_modules`
- [ ] You have an Anthropic API key
- [ ] Code is pushed to GitHub

## Backend Deployment (Railway)

- [ ] Sign up at [railway.app](https://railway.app)
- [ ] Create new project from GitHub repo
- [ ] Set root directory to `backend`
- [ ] Add environment variables:
  - [ ] `ANTHROPIC_API_KEY`
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3001`
- [ ] Wait for deployment to complete
- [ ] Copy backend URL (e.g., `https://chess-coach-backend.railway.app`)
- [ ] Test health endpoint: `curl https://your-url.railway.app/api/health`

## Frontend Deployment (Netlify)

- [ ] Sign up at [app.netlify.com](https://app.netlify.com)
- [ ] Create new site from GitHub repo
- [ ] Configure build settings:
  - [ ] Base directory: `frontend`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `frontend/dist`
- [ ] Add environment variable:
  - [ ] `VITE_API_URL` = your Railway backend URL
- [ ] Deploy site
- [ ] Wait for build to complete
- [ ] Copy Netlify URL (e.g., `https://chess-coach.netlify.app`)

## Post-Deployment Testing

- [ ] Visit Netlify URL
- [ ] Check that site loads
- [ ] Test navigation (Dashboard, Play, Review, Profile)
- [ ] Test theme toggle (dark/light)
- [ ] Play a test game:
  - [ ] Pieces move correctly
  - [ ] AI responds to moves
  - [ ] Game controls work
  - [ ] Move history appears
- [ ] Check Dashboard:
  - [ ] Stats display correctly
  - [ ] Charts render
- [ ] Test Coach Chat:
  - [ ] Can send messages
  - [ ] Receives responses from Claude
  - [ ] Messages appear in chat history
- [ ] Check browser console for errors
- [ ] Test on mobile device

## Optional Enhancements

- [ ] Custom domain setup
- [ ] Enable deploy notifications
- [ ] Set up analytics
- [ ] Add Netlify deploy badge to README
- [ ] Configure deploy previews for PRs

## Troubleshooting

### If frontend doesn't load:
1. Check Netlify deploy logs
2. Verify build completed successfully
3. Check browser console for errors

### If API calls fail:
1. Verify `VITE_API_URL` is set in Netlify
2. Test backend URL directly
3. Check CORS settings
4. Verify backend is running

### If coach chat doesn't work:
1. Check Railway logs for errors
2. Verify `ANTHROPIC_API_KEY` is set correctly
3. Check API key has credits/permissions
4. Test backend `/api/chat` endpoint with curl

## Environment Variables Summary

### Netlify (Frontend)
```
VITE_API_URL=https://your-backend.railway.app
```

### Railway (Backend)
```
ANTHROPIC_API_KEY=sk-ant-xxxxx
NODE_ENV=production
PORT=3001
```

## Useful Commands

```bash
# Test backend locally
cd backend && npm run dev

# Test frontend locally
cd frontend && npm run dev

# Build frontend
cd frontend && npm run build

# Test backend health
curl https://your-backend.railway.app/api/health

# Test backend chat
curl -X POST https://your-backend.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","conversationHistory":[]}'
```

## Quick Links

- Netlify Dashboard: https://app.netlify.com
- Railway Dashboard: https://railway.app
- Anthropic Console: https://console.anthropic.com

## Success!

When all checkboxes are checked, your Chess Coach app is live! 🎉

Share your URL:
```
https://your-site-name.netlify.app
```

## Next Steps

1. Share with friends
2. Gather feedback
3. Monitor usage
4. Plan new features
5. Iterate and improve!

---

**Need detailed help?** See [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md) or [DEPLOYMENT.md](DEPLOYMENT.md)
