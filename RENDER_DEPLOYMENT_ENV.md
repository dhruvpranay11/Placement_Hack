# Render Deployment Guide & Environment Variables

This document contains everything you need to copy-paste when deploying **PlaceReady AI** on Render.

---

## 🖥️ 1. Backend Deployment (Render Web Service)

### Service Settings:
- **Service Type:** Web Service
- **Name:** `placeready-api` (or your choice)
- **Root Directory:** `server`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Health Check Path:** `/api/health`

### Environment Variables to Paste in Render (Backend):
Copy and paste each key and value in the **Environment** section of your Render Web Service dashboard:

```env
PORT=10000
NODE_ENV=production
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_secret_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
CORS_ORIGIN=https://your-frontend-domain.onrender.com
```

> [!NOTE]
> On Render, Web Services automatically receive traffic on the port specified by the `$PORT` environment variable (typically `10000`).
> Replace `CORS_ORIGIN` with your actual frontend Render or Vercel URL once your frontend is created.

---

## 🌐 2. Frontend Deployment (Render Static Site or Vercel)

### Option A: Render Static Site Settings
- **Service Type:** Static Site
- **Name:** `placeready-web`
- **Root Directory:** `client`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

### Environment Variables to Paste in Render / Vercel (Frontend):
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
```

### Static Site Rewrite Rule (Single Page App Routing):
In Render Static Site dashboard under **Redirects/Rewrites**:
- **Source:** `/*`
- **Destination:** `/index.html`
- **Action:** `Rewrite`

---

## 🔑 Where to Get Your API Keys

1. **Google Gemini API Key:**
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Click **Get API key** → **Create API key**
   - Paste into `GEMINI_API_KEY`

2. **Supabase URL, Anon Key & Service Role Key:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Open your project → Click on the gear icon (⚙️ **Project Settings**)
   - Click **API** under Configuration
   - Copy **Project URL** → Paste into `SUPABASE_URL` and `VITE_SUPABASE_URL`
   - Copy `anon` `public` key → Paste into `SUPABASE_ANON_KEY` and `VITE_SUPABASE_ANON_KEY`
   - Copy `service_role` `secret` key → Paste into `SUPABASE_SERVICE_ROLE_KEY`

