# 🚀 Deployment Guide

This guide will help you deploy the Urvann Mini Plant Store to production.

## 📋 Prerequisites

- **Git** installed
- **Node.js** (v16 or higher)
- **PostgreSQL** database (cloud or local)
- **GitHub** account (for version control)

## 🌐 Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Navigate to backend directory
   cd backend
   
   # Initialize Railway project
   railway init
   ```

3. **Add PostgreSQL Database**
   - In Railway dashboard, click "New Service"
   - Select "Database" → "PostgreSQL"
   - Copy the database URL

4. **Set Environment Variables**
   ```bash
   railway variables set DB_HOST=your-db-host
   railway variables set DB_PORT=5432
   railway variables set DB_NAME=your-db-name
   railway variables set DB_USER=your-db-user
   railway variables set DB_PASSWORD=your-db-password
   railway variables set NODE_ENV=production
   railway variables set CORS_ORIGIN=https://your-frontend-domain.com
   ```

5. **Deploy**
   ```bash
   railway up
   ```

### Option 2: Heroku

1. **Create Heroku Account**
   - Go to [heroku.com](https://heroku.com)
   - Sign up for free account

2. **Install Heroku CLI**
   ```bash
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku login
   heroku create your-app-name
   ```

4. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
   ```

6. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform

1. **Create DigitalOcean Account**
   - Go to [digitalocean.com](https://digitalocean.com)
   - Sign up for account

2. **Create App**
   - Click "Create" → "Apps"
   - Connect your GitHub repository
   - Select the backend directory

3. **Configure Environment**
   - Set build command: `npm install`
   - Set run command: `npm start`
   - Add environment variables

4. **Add Database**
   - Create managed PostgreSQL database
   - Link to your app

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   ```

3. **Set Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `REACT_APP_API_URL=https://your-backend-url.com/api`

4. **Automatic Deployments**
   - Connect GitHub repository
   - Vercel will auto-deploy on push to main branch

### Option 2: Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy from Git**
   - Click "New site from Git"
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `REACT_APP_API_URL=https://your-backend-url.com/api`

### Option 3: GitHub Pages

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   # Install gh-pages
   npm install --save-dev gh-pages
   
   # Add to package.json scripts
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   
   # Deploy
   npm run deploy
   ```

## 🗄️ Database Setup

### Cloud Database Options

1. **Railway PostgreSQL**
   - Free tier available
   - Easy integration with Railway apps

2. **Heroku Postgres**
   - Free tier available
   - Automatic backups

3. **Supabase**
   - Free tier available
   - PostgreSQL with real-time features

4. **Neon**
   - Serverless PostgreSQL
   - Free tier available

### Database Migration

After setting up your cloud database:

1. **Update Environment Variables**
   ```bash
   # Update your .env file or hosting platform variables
   DB_HOST=your-cloud-db-host
   DB_PORT=5432
   DB_NAME=your-db-name
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   ```

2. **Run Database Setup**
   ```bash
   cd backend
   node setup.js
   ```

## 🔧 Environment Configuration

### Production Environment Variables

**Backend (.env)**
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
CORS_ORIGIN=https://your-frontend-domain.com
JWT_SECRET=your-super-secret-jwt-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend**
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 🔒 Security Checklist

- [ ] **HTTPS**: Ensure all URLs use HTTPS
- [ ] **CORS**: Configure CORS for your frontend domain
- [ ] **Environment Variables**: Never commit .env files
- [ ] **Database**: Use strong passwords for database
- [ ] **Rate Limiting**: Configure appropriate rate limits
- [ ] **Security Headers**: Helmet.js is already configured

## 📊 Monitoring

### Health Checks
- Backend: `https://your-backend-domain.com/health`
- Frontend: Check browser console for errors

### Logs
- **Railway**: View logs in dashboard
- **Heroku**: `heroku logs --tail`
- **Vercel**: View logs in dashboard

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS_ORIGIN is set correctly
   - Check frontend URL matches backend CORS settings

2. **Database Connection**
   - Verify database credentials
   - Check if database is accessible from your hosting platform

3. **Build Failures**
   - Check Node.js version compatibility
   - Ensure all dependencies are installed

4. **Environment Variables**
   - Verify all required variables are set
   - Check variable names match exactly

### Debug Commands

```bash
# Check backend health
curl https://your-backend-domain.com/health

# Test database connection
cd backend
node -e "require('./config/database').query('SELECT NOW()').then(console.log)"

# Check frontend build
npm run build
```

## 📈 Performance Optimization

1. **Database Indexing**: Already configured in schema
2. **Connection Pooling**: Configured in database.js
3. **Rate Limiting**: Prevents API abuse
4. **Caching**: Consider adding Redis for caching
5. **CDN**: Use CDN for static assets

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          # Add your deployment commands here

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          # Add your deployment commands here
```

## 🎉 Success!

After deployment, your application should be accessible at:
- **Frontend**: `https://your-frontend-domain.com`
- **Backend API**: `https://your-backend-domain.com/api`
- **Health Check**: `https://your-backend-domain.com/health`

---

**Need help?** Check the main README.md or create an issue in the repository.
