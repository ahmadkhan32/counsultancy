# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Step 1: Prepare Your Repository
Your repository is already configured with the correct structure:
- ✅ `vercel.json` - Vercel configuration
- ✅ `client/` - Next.js frontend
- ✅ `server/` - Node.js backend (deploy separately)

### Step 2: Deploy Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import your repository**: `ahmadkhan32/counsultancy`
5. **Configure the project:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Set Environment Variables

In Vercel dashboard, go to Settings → Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### Step 4: Deploy Backend (Separate Service)

Deploy your backend to one of these platforms:

#### Option A: Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Set environment variables:
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

#### Option B: Render
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `cd server && npm install`
5. Set start command: `cd server && npm start`

### Step 5: Update API URL

After deploying your backend, update the `NEXT_PUBLIC_API_URL` in Vercel:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### Step 6: Redeploy

Trigger a new deployment in Vercel to apply the updated environment variables.

## 🔧 Troubleshooting

### Common Issues:

1. **404 Errors**: 
   - Ensure the root directory is set to `client`
   - Check that all pages exist in `client/pages/`

2. **Build Failures**:
   - Check that all dependencies are installed
   - Verify environment variables are set

3. **API Connection Issues**:
   - Ensure backend is deployed and accessible
   - Check CORS settings in backend
   - Verify API URL is correct

### Build Commands:
```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📋 Environment Variables Checklist

### Frontend (Vercel):
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `NEXT_PUBLIC_API_URL`

### Backend (Railway/Render):
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `JWT_SECRET`
- [ ] `EMAIL_HOST`
- [ ] `EMAIL_PORT`
- [ ] `EMAIL_USER`
- [ ] `EMAIL_PASS`

## 🎯 Final URLs

After deployment:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend-url.com`

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test API endpoints
4. Check CORS configuration
