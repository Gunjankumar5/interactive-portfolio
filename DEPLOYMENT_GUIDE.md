# 🚀 Deployment Guide - Interactive Portfolio

This guide will help you deploy your portfolio to live production servers.

## Prerequisites

✅ Git repository with all code committed  
✅ GitHub account  
✅ Vercel account (free) - https://vercel.com  
✅ Render account (free) - https://render.com  

---

## Step 1: Push Code to GitHub

```bash
# First time setup - authenticate with GitHub
git push -u origin main
```

**If authentication fails:**
- Option A: Use GitHub Desktop (recommended for Windows)
- Option B: Create Personal Access Token at https://github.com/settings/tokens

---

## Step 2: Deploy Backend to Render (Free Tier)

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 2.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your repository: `Gunjankumar5/interactive-portfolio`
3. Configure the service:

```
Name: interactive-portfolio-backend
Region: Singapore (closest to India)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
```

### 2.3 Set Environment Variables
Click **"Environment"** tab and add:

```
GEMINI_API_KEY=AIzaSyC4w9h1J6MZXZwXMstLZuRxeMh-zHOnI-I
PORT=5000
MONGODB_URI=(leave empty - will use in-memory MongoDB)
MONGODB_DB=portfolio
NODE_ENV=production
```

### 2.4 Deploy
- Click **"Create Web Service"**
- Wait 5-10 minutes for deployment
- Copy your backend URL: `https://interactive-portfolio-backend-xxxx.onrender.com`

⚠️ **Free Render services sleep after 15 mins of inactivity. First request may take 30-60 seconds.**

---

## Step 3: Deploy Frontend to Vercel (Free Tier)

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Import `Gunjankumar5/interactive-portfolio`
3. Configure project:

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3.3 Set Environment Variable
Click **"Environment Variables"** and add:

```
VITE_API_BASE_URL=https://interactive-portfolio-backend-xxxx.onrender.com
```

*(Use your actual Render backend URL from Step 2.4)*

### 3.4 Deploy
- Click **"Deploy"**
- Wait 2-3 minutes
- Your live portfolio URL: `https://interactive-portfolio-xxxx.vercel.app`

---

## Step 4: Update Frontend Code with Backend URL

### 4.1 Create Environment File
In `frontend/` directory, create `.env.production`:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### 4.2 Update ChatWidget (if needed)
The code should already use `import.meta.env.VITE_API_BASE_URL` for API calls.

---

## Step 5: Test Your Deployment

### Test Backend
```bash
curl https://your-backend-url.onrender.com/api/health
```

Should return: `{"status":"ok"}`

### Test Frontend
1. Open your Vercel URL
2. Click chat widget
3. Send a message
4. Verify AI responds

---

## Step 6: Update Resume with Live Links

Update `RESUME.md` and `frontend/public/resume.txt`:
```
Portfolio: https://interactive-portfolio-xxxx.vercel.app
```

---

## Automatic Deployments

✅ **Frontend:** Every push to `main` branch auto-deploys to Vercel  
✅ **Backend:** Every push to `main` branch auto-deploys to Render  

---

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., `gunjankumar.dev`)
3. Update DNS records as instructed

### Render
1. Go to Settings → Custom Domain
2. Add domain and update DNS

---

## Troubleshooting

### Backend Issues
- **503 Error:** Render service sleeping (free tier). Wait 60 seconds.
- **API not responding:** Check Render logs in dashboard
- **CORS errors:** Verify backend allows your frontend domain

### Frontend Issues
- **API calls failing:** Check `VITE_API_BASE_URL` is correct
- **Build errors:** Run `npm run build` locally first
- **Chat not working:** Open browser console for errors

---

## Cost Breakdown

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Hobby | FREE |
| Render | Free | FREE |
| MongoDB | In-Memory | FREE |
| **Total** | | **$0/month** |

---

## Quick Command Reference

```bash
# Commit and push changes
git add -A
git commit -m "Your message"
git push origin main

# Test backend locally
cd backend
npm run dev

# Test frontend locally
cd frontend
npm run dev

# Build frontend for production
cd frontend
npm run build
```

---

## Support Links

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- GitHub: https://github.com/Gunjankumar5/interactive-portfolio

---

**Need help?** Open an issue on GitHub or contact: ss222802@gmail.com
