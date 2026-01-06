# Running on Edge Runtime (Vercel Edge)

This application is configured to run on **Vercel Edge Runtime** for optimal performance.

## What is Edge Runtime?

Edge Runtime runs your code on Vercel's global edge network, closer to your users for faster response times.

## Configuration

### Current Setup

✅ API routes run on Edge Runtime  
✅ Database queries cached for Edge  
✅ Poem loading optimized for Edge  
✅ ISR (Incremental Static Regeneration) enabled  

### next.config.ts

The app uses the following Edge-friendly settings:

```typescript
// Runs on Edge Runtime
export const runtime = 'edge'; // for specific routes
```

## Deployment to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Edge Runtime support"
git push
```

### Step 2: Deploy to Vercel

**Option A: CLI**
```bash
npm i -g vercel
vercel
```

**Option B: Web Dashboard**
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Click "Deploy"

### Step 3: Configure Environment Variables

In Vercel Dashboard:
1. Project → Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_value
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_value
   NEXT_PUBLIC_API_URL=https://your-vercel-url.vercel.app
   ```

### Step 4: View Deployment

Your site is now live on Vercel Edge! 🚀

## Edge Runtime Limitations (and How We Handle Them)

| Limitation | Solution |
|-----------|----------|
| No file system access | API routes load markdown server-side |
| No persistent storage | Git-based content (markdown files) |
| Short execution time | Use caching and ISR |
| No long-running processes | Webhooks for CMS updates |

## Performance Benefits

✅ **Global Distribution**: Code runs on 300+ edge locations  
✅ **Faster Response**: No cold starts, instant execution  
✅ **Better SEO**: Faster page loads = better rankings  
✅ **Automatic Scaling**: Handles traffic spikes automatically  
✅ **No Servers to Manage**: Fully serverless  

## Monitoring on Vercel

1. Go to Vercel Dashboard
2. Select your project
3. View:
   - **Analytics**: Page load times, visitor count
   - **Logs**: Real-time request logs
   - **Deployments**: View all versions
   - **Integrations**: Connected services

## GitHub Integration

Every push to `main` automatically:
1. Triggers deployment
2. Builds the app
3. Runs on Edge globally
4. Updates your site

## Custom Domains

To add your domain:
1. Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., vaishnavi-poetry.com)
3. Update DNS records
4. Done! HTTPS is automatic

## API Caching Strategy

Poems are cached for **1 hour** on Edge:

```typescript
// This caches the poem data
const response = await fetch('/api/poems', {
  next: { revalidate: 3600 } // 1 hour
});
```

To purge cache:
1. Redeploy the project
2. Or use Vercel's manual purge

## ISR (Incremental Static Regeneration)

Poem pages are pre-rendered and updated:

```typescript
export const revalidate = 3600; // Regenerate every hour
```

This means:
- First user gets cached version (fast)
- After 1 hour, page regenerates
- Old version served while new one builds

## Analytics & Monitoring

### Page Performance
- Check Vercel Analytics tab
- View Core Web Vitals
- Monitor response times

### API Performance
- Vercel Logs show all API calls
- Monitor edge execution time
- Track error rates

## Troubleshooting

### Deployment Failed
1. Check build logs in Vercel
2. Verify environment variables
3. Ensure markdown files exist

### Slow Page Load
1. Check Vercel Analytics
2. Enable caching if not cached
3. Optimize images

### Poems Not Showing
1. Check API route: `/api/poems`
2. Verify `content/poems/` directory
3. Check environment variables

## Cost

✅ **Free for most use cases**
- Vercel Free: 100GB bandwidth/month
- Poetry portfolio uses minimal resources
- CMS updates trigger rebuilds (included)

## Next Steps

1. ✅ Code is Edge-ready
2. 📤 Push to GitHub
3. 🚀 Deploy to Vercel
4. 🔗 Add custom domain
5. 📊 Monitor analytics

---

Your poetry portfolio now runs on **Vercel Edge Runtime** — the fastest, most scalable way to serve content! ⚡
