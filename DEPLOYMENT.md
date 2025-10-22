# Deployment Guide

This guide covers deploying the Consultancy project to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended for Frontend)
1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository: `ahmadkhan32/counsultancy`

2. **Configure Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Deploy:**
   - Vercel will automatically detect Next.js
   - Click "Deploy"
   - Your frontend will be live at `https://your-project.vercel.app`

### Option 2: Railway (Full Stack)
1. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `ahmadkhan32/counsultancy`

2. **Configure Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=your_email_host
   EMAIL_PORT=587
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```

3. **Deploy:**
   - Railway will automatically build and deploy
   - Your API will be live at `https://your-project.railway.app`

### Option 3: Render (Full Stack)
1. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub
   - Click "New" → "Web Service"
   - Connect your repository

2. **Configure Service:**
   - **Backend Service:**
     - Build Command: `cd server && npm install`
     - Start Command: `cd server && npm start`
     - Environment: Node
   
   - **Frontend Service:**
     - Build Command: `cd client && npm install && npm run build`
     - Publish Directory: `client/out`
     - Environment: Static Site

3. **Add Environment Variables:**
   - Add all required environment variables in the Render dashboard

## 🔧 Local Development

```bash
# Install all dependencies
npm run install-all

# Start development servers
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📋 Environment Variables Required

### Frontend (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```
NODE_ENV=production
PORT=10000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_email_host
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

## 🌐 Production URLs

After deployment, your application will be available at:
- **Frontend:** `https://your-frontend-url.com`
- **Backend API:** `https://your-backend-url.com`

## 🔍 Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `npm run install-all`
- Check Node.js version (requires Node 16+)
- Verify environment variables are set correctly

### Deployment Issues
- Check build logs in your hosting platform
- Ensure all environment variables are configured
- Verify database connections (Supabase)

## 📞 Support

For deployment issues, check:
1. Build logs in your hosting platform
2. Environment variable configuration
3. Database connection settings
4. Network connectivity
