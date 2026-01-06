# GitHub OAuth Setup for Sveltia CMS

This guide will help you set up GitHub OAuth authentication so only authorized users (Vaishnavi/Kusum) can access the CMS.

## Step 1: Create a GitHub OAuth App

1. Go to your GitHub account settings
2. Navigate to **Settings** → **Developer settings** → **OAuth Apps**
3. Click **"New OAuth App"**
4. Fill in the details:
   - **Application name**: `Vaishnavi Poetry CMS`
   - **Homepage URL**: `https://your-domain.com` (or `http://localhost:3000` for testing)
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
   - **Application description**: `CMS for poetry portfolio`

5. Click **"Register application"**
6. Copy the **Client ID** (you'll need this)
7. Click **"Generate a new client secret"** and copy it (you'll need this too)

## Step 2: Configure Your Deployment Platform

### For Netlify:

1. Deploy your site to Netlify
2. Go to **Site settings** → **Access control** → **OAuth**
3. Click **"Install provider"**
4. Select **GitHub**
5. Enter your **Client ID** and **Client Secret**
6. Save

### For Vercel:

You'll need to use a third-party OAuth service like:
- **Netlify Identity** (recommended)
- **Auth0**
- **Supabase Auth**

OR use a serverless function to handle OAuth. Here's how:

1. Create `/api/auth/callback/route.ts`:
```typescript
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  // Exchange code for token with GitHub
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  
  const data = await tokenResponse.json();
  
  // Return token to CMS
  return NextResponse.json(data);
}
```

2. Add environment variables to Vercel:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`

3. Update `public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: your-username/vaishnavipoetry
  branch: main
  auth_endpoint: /api/auth
```

## Step 3: Update Repository Settings

1. Edit `public/admin/config.yml`
2. Change `repo` to your actual GitHub repository:
   ```yaml
   backend:
     name: github
     repo: your-username/vaishnavipoetry  # Change this!
     branch: main
   ```

3. Change the `site_url` to your deployed URL:
   ```yaml
   site_url: https://your-actual-domain.com
   ```

## Step 4: Restrict Access (Security)

### Method 1: GitHub Repository Permissions
- Only add Vaishnavi and Kusum as collaborators to the repository
- In repository **Settings** → **Manage access**
- Add their GitHub usernames with **Write** permission

### Method 2: Middleware Protection (Recommended)

Create `middleware.ts` in the root:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_USERS = ['vaishnavi-username', 'kusum-username']; // Change these!

export async function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic' },
      });
    }

    // You can add more sophisticated auth here
    // For now, GitHub OAuth in Sveltia CMS handles this
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

## Step 5: Test the Setup

1. Push your code to GitHub
2. Deploy to Netlify/Vercel
3. Visit `https://your-domain.com/admin`
4. You should see the Sveltia CMS login screen
5. Click **"Login with GitHub"**
6. Authorize the application
7. You should now see the CMS dashboard!

## Step 6: Using the CMS

### Creating a New Poem:

1. Go to `https://your-domain.com/admin`
2. Click **"Poems"** in the left sidebar
3. Click **"New Poem"**
4. Fill in the fields:
   - **Title**: Your poem title
   - **Publish Date**: When to publish
   - **Category**: E.g., "Nature", "Love", "Contemplation"
   - **Excerpt**: First line or short preview
   - **Theme**: Choose Light, Dark, or Vintage
   - **Featured Image**: Upload an image (optional)
   - **Background Style**: Tailwind CSS classes for gradient
   - **Body**: Your full poem (use Markdown)

5. Click **"Save"** (saves as draft)
6. Click **"Publish"** when ready (creates a pull request or commits directly)

### Editorial Workflow:

With `publish_mode: editorial_workflow`, changes go through:
1. **Draft** → Save your work
2. **In Review** → Ready for review
3. **Ready** → Approved, ready to publish
4. **Published** → Live on the site

## Troubleshooting

### "Failed to load config.yml"
- Check that `public/admin/config.yml` exists
- Verify YAML syntax (use a YAML validator)

### "OAuth Error"
- Verify Client ID and Secret are correct
- Check callback URL matches exactly
- Ensure you're using the correct deployment platform

### "Cannot read poems"
- Make sure `content/poems/` directory exists
- Check file permissions
- Verify markdown files have correct frontmatter

### "Not Authorized"
- Check GitHub repository permissions
- Verify you're logged in with an authorized account
- Check repository name in config.yml is correct

## Quick Reference

### Accessing CMS:
```
https://your-domain.com/admin
```

### Local Development:
```
http://localhost:3000/admin
```

### Poem Files Location:
```
content/poems/your-poem-slug.md
```

### Images Location:
```
public/images/poems/
```

## Security Best Practices

1. ✅ Never commit OAuth secrets to Git
2. ✅ Use environment variables for sensitive data
3. ✅ Only give repository access to trusted users
4. ✅ Enable 2FA on GitHub accounts
5. ✅ Regularly review repository access
6. ✅ Use `publish_mode: editorial_workflow` for review process
7. ✅ Keep dependencies updated

## Next Steps

Once OAuth is set up:
1. Add Vaishnavi and Kusum as repository collaborators
2. Share the admin URL: `https://your-domain.com/admin`
3. Create your first poem through the CMS
4. The site will automatically rebuild with new content!

---

**Note**: Sveltia CMS is 100% free and open-source. It stores all content in your Git repository, so you own all your data!
