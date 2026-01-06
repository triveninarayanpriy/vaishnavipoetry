# Poetry Portfolio - Vaishnavi

A high-performance, beautifully designed poetry portfolio built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**, featuring the "Nature Distilled" aesthetic with earthy tones and paper-like textures.

## ✨ Features

- **🎨 2026 Design Trends**: Nature Distilled aesthetic with muted earthy color palette (clay, soil, sage)
- **💫 Smooth Animations**: Framer Motion-powered page transitions and interactive elements
- **📖 Book-like Reading Experience**: Poetry pages with paper textures and thoughtful typography
- **🔮 Glassmorphism Navigation**: Modern, blurred navigation bar with transparency effects
- **📱 Fully Responsive**: Optimized for all devices from mobile to desktop
- **⚡ High Performance**: Built on Next.js 15 with App Router for optimal loading
- **🎭 Custom Fonts**: Playfair Display for poetry, Inter for UI elements
- **🔄 Dynamic Routes**: Individual pages for each poem with unique backgrounds
- **💚 Hearts & Comments**: Ready for Supabase integration (coming soon)
- **📝 CMS Ready**: Sveltia CMS fully configured with GitHub OAuth
- **✍️ Content Management**: Edit poems via user-friendly dashboard at `/admin`
- **🔐 Secure Access**: GitHub OAuth authentication for authorized users only

## 🎨 Design Philosophy

The portfolio embraces the "Nature Distilled" aesthetic:
- **Clay (#C4A485)** - Warmth and earthiness
- **Soil (#8B7355)** - Grounding and depth  
- **Sage (#A4AC96)** - Natural calmness
- **Cream (#F5F1E8)** - Clean background
- **Paper Textures** - Subtle noise overlays for organic feel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd vaishnavipoetry
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
vaishnavipoetry/
├── app/
│   ├── page.tsx              # Hero section with animated quote
│   ├── poems/
│   │   ├── page.tsx          # Poems listing page
│   │   └── [slug]/
│   │       └── page.tsx      # Individual poem page
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── admin/
│   │   └── page.tsx          # CMS launcher page
│   ├── layout.tsx            # Root layout with fonts
│   └── globals.css           # Custom CSS variables
├── components/
│   ├── Navigation.tsx        # Glassmorphic navbar
│   └── PageTransition.tsx    # Smooth page transitions
├── content/
│   └── poems/                # Markdown poem files (CMS-managed)
│       ├── echoes-of-autumn.md
│       └── *.md
├── lib/
│   ├── poems.ts              # Poem data loader (gray-matter)
│   └── supabase.ts           # Supabase client setup
├── public/
│   ├── admin/
│   │   ├── config.yml        # Sveltia CMS configuration
│   │   └── index.html        # CMS dashboard
│   └── images/
│       └── poems/            # Uploaded poem images
└── Documentation files
```

## 🎯 Key Pages

- **/** - Landing page with fading poetry quote animation
- **/poems** - Grid view of all poems with hover effects
- **/poems/[slug]** - Individual poem with book-like presentation
- **/about** - About the poet
- **/admin** - Sveltia CMS dashboard (requires GitHub OAuth)

## 🔧 Configuration

### Content Management System

The site uses **Sveltia CMS** for easy content management:

1. **Access CMS**: Visit `/admin` after deployment
2. **Login**: Authenticate with GitHub OAuth
3. **Create Poems**: Use the visual editor
4. **Publish**: Changes commit directly to Git

**Setup Guide**: See [GITHUB_OAUTH_SETUP.md](GITHUB_OAUTH_SETUP.md) for OAuth configuration

**CMS Guide**: See [CMS_GUIDE.md](CMS_GUIDE.md) for usage instructions

### Adding Poems

**Via CMS (Recommended):**
1. Go to `/admin`
2. Click "New Poem"
3. Fill in the form
4. Publish

**Via Code:**
Create a markdown file in `content/poems/`:

```markdown
---
title: "Your Poem Title"
date: 2026-01-06T12:00:00.000Z
category: "Nature"
excerpt: "First line or excerpt..."
theme: "Light"
background: "bg-gradient-to-br from-clay/20 to-sage/30"
---

Your poem content here
With proper line breaks
And stanzas
```

### Environment Variables

For Supabase integration (Hearts & Comments):

1. Copy `.env.example` to `.env.local`
2. Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 🎨 Customization

### Colors

Modify the color palette in `app/globals.css`:

```css
:root {
  --clay: #C4A485;
  --soil: #8B7355;
  --sage: #A4AC96;
  /* etc */
}
```

### Fonts

Change fonts in `app/layout.tsx`:

```typescript
const customFont = Your_Font({
  variable: "--font-custom",
  subsets: ["latin"],
});
```

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **CMS**: Sveltia CMS (Git-based, free forever)
- **Content**: Markdown with gray-matter
- **Database**: Supabase (ready for integration)
- **Language**: TypeScript
- **Fonts**: Google Fonts (Playfair Display, Inter)

## 🔮 Future Features

- [x] Sveltia CMS for content management
- [x] Markdown-based poem storage
- [x] GitHub OAuth authentication
- [ ] Deploy and configure OAuth
- [ ] Supabase integration for Hearts
- [ ] Comment system with moderation
- [ ] Poetry search and filtering
- [ ] Reading time estimates
- [ ] Social sharing
- [ ] Newsletter subscription
- [ ] Poetry categories/tags
- [ ] Dark mode toggle
- [ ] Audio recordings of poems

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

This is a personal poetry portfolio, but suggestions are welcome!

## 📄 License

MIT License - feel free to use this as a template for your own poetry portfolio.

## 🙏 Acknowledgments

- Design inspired by 2026 "Nature Distilled" aesthetic trends
- Built with love for poetry and beautiful web experiences

---

**Built with Next.js 15 • Styled with Tailwind CSS • Animated with Framer Motion**
