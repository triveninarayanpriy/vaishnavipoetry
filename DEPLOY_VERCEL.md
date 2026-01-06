# Deploy to Vercel Edge Runtime

Your poetry portfolio is now optimized for **Vercel Edge Runtime**. Here's how to deploy it in 3 steps.

## Prerequisites

- GitHub account
- Vercel account (free at vercel.com)
- Your code pushed to GitHub

## Step 1: Push Code to GitHub

```bash
cd c:\Users\trive\Downloads\vaishnavipoetry

# Initialize Git (if not already done)
git init
git add .
git commit -m "Deploy poetry portfolio to Edge"

# Add your GitHub repository as remote
git remote add origin https://github.com/your-username/vaishnavipoetry.git
git push -u origin main
```

## Step 2: Deploy on Vercel

### Option A: Using Vercel CLI (Fastest)

```bash
npm i -g vercel
vercel
```

Follow the prompts:
- Login to Vercel
- Select "Create new project"
- Confirm project settings
- Deployment complete!

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repository
4. Click **"Deploy"**
5. Done! 🚀

## Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to your project
2. **Settings** → **Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=https://your-project.vercel.app
```

4. Click **Save**
5. **Redeploy** your project

## Step 4: Custom Domain (Optional)

To use your own domain (e.g., vaishnavi-poetry.com):

1. **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain name
4. Update your domain registrar's DNS:
   - Add CNAME record pointing to Vercel
   - (Instructions provided in Vercel dashboard)
5. HTTPS certificate auto-generated ✅

## What Gets Deployed

✅ Next.js app with Edge Runtime  
✅ API routes for poem management  
✅ Sveltia CMS dashboard  
✅ All markdown poems  
✅ Optimized images  
✅ ISR (auto-refreshing content)  

## After Deployment

### Update Sveltia CMS Config

Edit `public/admin/config.yml`:

```yaml
backend:
  repo: your-username/vaishnavipoetry  # Your actual repo
  
site_url: https://your-vercel-url.vercel.app  # Your deployed URL
```

Then commit and push:
```bash
git add public/admin/config.yml
git commit -m "Update CMS with deployed URL"
git push
```

### Test Your Site

1. Visit your Vercel URL (shown in dashboard)
2. Check pages:
   - Home page (animated quote)
   - `/poems` (poem grid)
   - `/poems/echoes-of-autumn` (individual poem)
   - `/admin` (CMS dashboard)

### Complete GitHub OAuth Setup

See **GITHUB_OAUTH_SETUP.md** to:
- Create GitHub OAuth App
- Connect to Vercel
- Enable CMS login

## Automatic Deployments

Every time you:
- Push code to GitHub
- Create a poem via CMS
- Update markdown files

...Vercel automatically:
1. Rebuilds your site
2. Deploys to Edge
3. Updates live URL

**No manual deployment needed!** 🚀

## Monitoring & Analytics

### In Vercel Dashboard:

**Analytics Tab:**
- Page load times
- Visitor count
- Geography
- Browser stats

**Functions Tab:**
- API performance
- Edge execution time
- Request logs

**Deployments Tab:**
- View all versions
- Rollback if needed
- Check build logs

## Performance Benefits

After deploying on Edge:

✅ **Global CDN**: Served from 300+ locations  
✅ **Fast Response**: <100ms from user location  
✅ **Zero Cold Starts**: Always instant  
✅ **Auto-Scaling**: Handles traffic spikes  
✅ **HTTPS by Default**: Free SSL/TLS  
✅ **Automatic Backups**: Git-based  

## Troubleshooting

### Build Failed
Check build logs in Vercel dashboard:
- Environment variables missing?
- Markdown files not found?
- Dependencies not installed?

**Solution**: 
```bash
npm install
git push  # Redeploy
```

### Poems Not Showing
1. Check `/api/poems` endpoint
2. Verify markdown files in `content/poems/`
3. Check environment variables

**Test API**:
```
https://your-domain.com/api/poems
```

Should return JSON list of poems.

### CMS Not Working
See **GITHUB_OAUTH_SETUP.md** for OAuth configuration.

## Cost

✅ **Completely Free** (for most use cases)

**Vercel Free Plan:**
- Unlimited deployments
- 100GB bandwidth/month
- Serverless functions
- Edge middleware
- Custom domains

**Your poetry portfolio uses ~1GB/month**

## Comparison: Before vs After

### Before (Development)
- Local machine only
- localhost:3000
- Not accessible online
- No uptime

### After (Vercel Edge)
- Global distribution
- HTTPS auto-configured
- Always online
- Automatic backups
- Performance monitoring
- Custom domain support

## Advanced (Optional)

### Enable Preview Deployments

Each pull request gets a preview URL:

1. Push to feature branch
2. Create Pull Request
3. Vercel deploys preview
4. Test changes
5. Merge to main
6. Auto-deploys to production

### Connect to GitHub

Already done if you use Option B! ✅

### Setup Webhooks

Rebuild site when CMS content changes:

1. Vercel Dashboard → Settings
2. Git Webhooks
3. Add GitHub webhook for rebuilds

## Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Edge Runtime](https://nextjs.org/docs/app/api-routes/edge-runtime)
- [Your Edge Runtime Guide](./EDGE_RUNTIME.md)
- [CMS Setup](./CMS_GUIDE.md)

## Summary

```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy
vercel

# 3. Add environment variables
# (Done in Vercel dashboard)

# 4. Optional: Add custom domain
# (Done in Vercel dashboard)

# 5. Complete GitHub OAuth
# (See GITHUB_OAUTH_SETUP.md)

# Done! 🎉
```

Your poetry portfolio is now live on **Vercel Edge Runtime** — the fastest way to serve content to your readers worldwide! ⚡🌍

---

**Next Step**: Customize your domain and configure GitHub OAuth in `GITHUB_OAUTH_SETUP.md`
