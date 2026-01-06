# Sveltia CMS Setup Guide

This guide explains how to integrate Sveltia CMS for managing poetry content.

## What is Sveltia CMS?

Sveltia CMS is a Git-based, open-source content management system that works seamlessly with static site generators like Next.js. It's a modern alternative to Netlify CMS.

## Benefits

- ✅ No database required - all content stored in Git
- ✅ Write poems in Markdown
- ✅ Media library for images
- ✅ Version control built-in
- ✅ Free and open-source
- ✅ Works with GitHub, GitLab, Bitbucket

## Setup Steps

### 1. Create Admin Config Directory

```bash
mkdir -p public/admin
```

### 2. Create Config File

Create `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: your-username/vaishnavipoetry
  branch: main

media_folder: "public/images/poems"
public_folder: "/images/poems"

collections:
  - name: "poems"
    label: "Poems"
    folder: "content/poems"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Category", name: "category", widget: "string" }
      - { label: "Excerpt", name: "excerpt", widget: "text" }
      - { label: "Background Style", name: "background", widget: "string", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
```

### 3. Create Admin Index Page

Create `public/admin/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Poetry Admin</title>
  </head>
  <body>
    <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js" type="module"></script>
  </body>
</html>
```

### 4. Create Content Directory

```bash
mkdir -p content/poems
```

### 5. Convert Existing Poems to Markdown

Create files in `content/poems/`:

**Example: `content/poems/echoes-of-autumn.md`**

```markdown
---
title: "Echoes of Autumn"
date: 2026-01-05T00:00:00.000Z
category: "Nature"
excerpt: "In whispered winds the earth remembers..."
background: "bg-gradient-to-br from-clay/20 via-sage/30 to-soil/20"
---

In whispered winds the earth remembers
The touch of leaves now turned to ember,
Each falling leaf a gentle note
In autumn's melancholic quote.

The trees stand bare against the sky,
Their branches reaching, asking why
The warmth has fled, the green has gone,
Yet knowing spring will come anon.

Beneath the soil, the seeds await
Their season's turn, their destined date,
For nothing truly dies, you see—
It merely waits in memory.
```

### 6. Update Poems Data Loading

Modify `lib/poems.ts` to read from markdown files:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const poemsDirectory = path.join(process.cwd(), 'content/poems');

export function getAllPoems() {
  const fileNames = fs.readdirSync(poemsDirectory);
  const allPoems = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(poemsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        background: data.background,
        category: data.category,
        content
      };
    });

  return allPoems.sort((a, b) => (a.date > b.date ? -1 : 1));
}
```

### 7. Install Dependencies

```bash
npm install gray-matter
```

### 8. Enable GitHub OAuth

1. Go to your GitHub repository settings
2. Navigate to Settings > Developer settings > OAuth Apps
3. Create a new OAuth App:
   - Homepage URL: `https://yourdomain.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
4. Copy the Client ID and Client Secret

### 9. Deploy

Deploy your site to Netlify, Vercel, or another platform.

### 10. Access Admin

Visit `https://yourdomain.com/admin` to access the CMS.

## Features You'll Have

- 📝 Rich Markdown editor for poems
- 🖼️ Media library for background images
- 👀 Live preview of poems
- 📅 Scheduling poems for future publication
- 🔍 Search and filter poems
- 📱 Mobile-friendly admin interface

## Security Notes

- Never commit `.env.local` to Git
- Keep OAuth credentials secure
- Use environment variables for sensitive data
- Consider adding authentication for the `/admin` route

## Resources

- [Sveltia CMS Documentation](https://github.com/sveltia/sveltia-cms)
- [Configuration Options](https://github.com/sveltia/sveltia-cms/blob/main/README.md)
- [Widget Reference](https://github.com/sveltia/sveltia-cms/blob/main/docs/widgets.md)

## Alternative: Static Poems

If you prefer to keep poems as static data (current setup):
- Edit `lib/poems.ts` directly
- No CMS needed
- Simpler deployment
- Version controlled in Git
- Rebuild needed for updates

Choose based on your workflow preference!
