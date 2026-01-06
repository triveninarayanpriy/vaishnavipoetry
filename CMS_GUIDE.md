# Sveltia CMS - Quick Start

Sveltia CMS is now fully configured! Here's how to use it:

## ✅ What's Already Set Up

1. **CMS Configuration** (`public/admin/config.yml`)
   - Poem collection with all required fields
   - GitHub backend integration
   - Media library for images
   - Editorial workflow for review process

2. **CMS Dashboard** (`public/admin/index.html`)
   - Sveltia CMS interface
   - Access at: `/admin` or `/admin/index.html`

3. **Content Storage** (`content/poems/`)
   - Markdown files with frontmatter
   - Sample poems already created
   - Git-based version control

4. **Frontend Integration**
   - `gray-matter` parsing markdown files
   - Automatic poem loading from CMS
   - Dynamic routing working

## 🚀 How to Use the CMS

### 1. Complete GitHub OAuth Setup

Follow the guide in `GITHUB_OAUTH_SETUP.md` to:
- Create GitHub OAuth App
- Configure deployment platform (Netlify/Vercel)
- Update repository settings
- Restrict access to authorized users only

### 2. Access the CMS

**Local Development:**
```
http://localhost:3000/admin
```

**Production:**
```
https://your-domain.com/admin
```

### 3. Create a New Poem

1. Click **"Poems"** in the sidebar
2. Click **"New Poem"**
3. Fill in the fields:

**Required Fields:**
- **Title**: Poem title (e.g., "Whispers of Dawn")
- **Publish Date**: Publication date and time
- **Category**: Genre (e.g., "Nature", "Love", "Life")
- **Excerpt**: Preview text (first line or summary)
- **Theme**: Visual style (Light/Dark/Vintage)
- **Body**: Your full poem content

**Optional Fields:**
- **Featured Image**: Background or hero image
- **Background Style**: Custom Tailwind gradient classes

4. Click **"Save"** to save as draft
5. Click **"Publish"** to make it live

### 4. Edit Existing Poems

1. Go to **"Poems"** collection
2. Click on any poem
3. Make your changes
4. Save and publish

## 📝 Poem Frontmatter Format

When creating poems, the CMS generates markdown files like this:

```markdown
---
title: "Your Poem Title"
date: 2026-01-06T12:00:00.000Z
category: "Nature"
excerpt: "Opening line or preview..."
theme: "Light"
featuredImage: "/images/poems/your-image.jpg"
background: "bg-gradient-to-br from-clay/20 via-sage/30 to-soil/20"
---

Your poem content here
With line breaks preserved
And stanzas intact

Second stanza
Continues here
```

## 🎨 Theme Options

### Light Theme
- Clean, bright aesthetic
- Default cream background
- Perfect for uplifting poetry

### Dark Theme
- Moody, contemplative
- Dark gradients
- Ideal for evening/night poems

### Vintage Theme
- Classic, timeless feel
- Warm, aged tones
- Great for nostalgic pieces

## 🖼️ Adding Images

1. In the poem editor, click **"Featured Image"**
2. Upload an image (JPG, PNG, WebP)
3. Images are stored in `public/images/poems/`
4. Automatically optimized by Next.js

## 🎨 Custom Backgrounds

Use Tailwind CSS gradient classes:

**Light & Airy:**
```
bg-gradient-to-br from-cream via-parchment to-sage/10
```

**Warm Earthy:**
```
bg-gradient-to-br from-clay/20 via-sage/30 to-soil/20
```

**Deep & Moody:**
```
bg-gradient-to-br from-charcoal/40 via-earth/30 to-moss/20
```

**Vintage Paper:**
```
bg-gradient-to-br from-parchment via-clay/10 to-cream
```

## 🔄 Editorial Workflow

The CMS uses a review process:

1. **Draft** → Working on poem
2. **In Review** → Ready for review
3. **Ready** → Approved
4. **Published** → Live on site

This ensures quality control before publishing.

## 🔐 Security

**Who Can Access:**
- Only users with GitHub repository access
- Set up via GitHub OAuth
- Controlled by repository permissions

**To Add Users:**
1. Go to repository **Settings** → **Manage access**
2. Invite Vaishnavi and Kusum
3. Grant **Write** permission

## 📂 File Structure

```
vaishnavipoetry/
├── public/
│   └── admin/
│       ├── config.yml          # CMS configuration
│       └── index.html          # CMS dashboard
├── content/
│   └── poems/
│       ├── echoes-of-autumn.md
│       ├── silence-between-stars.md
│       └── your-new-poem.md
└── public/
    └── images/
        └── poems/              # Uploaded images
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add OAuth provider in Netlify settings

### Vercel
1. Import GitHub repository
2. Framework: Next.js
3. Build command: `npm run build`
4. Set up OAuth (see GITHUB_OAUTH_SETUP.md)

## 🆘 Common Issues

### "Config.yml not found"
- Check file exists at `public/admin/config.yml`
- Verify file name and location

### "Authentication failed"
- Complete GitHub OAuth setup
- Check Client ID and Secret
- Verify callback URL

### "Cannot create poem"
- Ensure `content/poems/` directory exists
- Check file permissions
- Verify repository write access

### Poems not showing on site
- Check markdown files are in `content/poems/`
- Verify frontmatter format
- Restart development server

## 💡 Tips

1. **Write in Markdown**: Use `*italic*`, `**bold**`, line breaks
2. **Preview Before Publishing**: Use editorial workflow
3. **Backup Content**: Git automatically backs up everything
4. **Version History**: View all changes in GitHub
5. **Collaborate**: Add co-authors to repository

## 📖 Resources

- [Sveltia CMS Docs](https://github.com/sveltia/sveltia-cms)
- [Markdown Guide](https://www.markdownguide.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

**Ready to Create?** Visit `/admin` and start writing! 🎨✍️
