# Quick Customization Guide

## 🎨 Change Colors

Edit [app/globals.css](app/globals.css):

```css
:root {
  --clay: #YourColor;
  --soil: #YourColor;
  --sage: #YourColor;
  /* etc */
}
```

## ✍️ Add a New Poem

Edit [lib/poems.ts](lib/poems.ts):

```typescript
{
  slug: 'my-new-poem',
  title: 'My New Poem',
  excerpt: 'Opening line...',
  date: '2026-01-07',
  background: 'bg-gradient-to-br from-clay/20 to-moss/30',
  category: 'Nature',
  content: `Your poem here
  
  With line breaks
  And stanzas`
}
```

## 🖋️ Change Fonts

Edit [app/layout.tsx](app/layout.tsx):

```typescript
import { Your_Font } from "next/font/google";

const yourFont = Your_Font({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

Then update [app/globals.css](app/globals.css):

```css
@theme inline {
  --font-serif: var(--font-your-font);
}
```

## 🏠 Customize Hero Quote

Edit [app/page.tsx](app/page.tsx):

```typescript
<motion.blockquote>
  <span className="block italic">
    Your custom quote here
  </span>
</motion.blockquote>
```

## 📱 Navigation Links

Edit [components/Navigation.tsx](components/Navigation.tsx):

```typescript
<NavLink href="/your-page">Your Link</NavLink>
```

## 🎭 Animation Speed

Adjust durations in any component:

```typescript
transition={{ duration: 1.2 }} // Change to your preference
```

## 🌓 Add Dark Mode

1. Install next-themes:
```bash
npm install next-themes
```

2. Wrap app in ThemeProvider
3. Add dark: variants to Tailwind classes

## 📊 Google Analytics

1. Install:
```bash
npm install @next/third-parties
```

2. Add to [app/layout.tsx](app/layout.tsx):
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

## 🔍 SEO Optimization

Add to individual pages:

```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
  openGraph: {
    title: "OG Title",
    description: "OG Description",
    images: ['/og-image.jpg'],
  },
};
```

## 🖼️ Add Images to Poems

1. Place images in `/public/images/`
2. Use in poem page:

```typescript
import Image from 'next/image';

<Image 
  src="/images/your-image.jpg" 
  alt="Description"
  width={800}
  height={600}
/>
```

## 📧 Contact Form

Install form library:
```bash
npm install react-hook-form
```

Create contact page with form component.

## 🚀 Performance Tips

- Use `next/image` for all images
- Enable compression in `next.config.ts`
- Lazy load heavy components
- Use ISR (Incremental Static Regeneration) for poems

## 📱 Mobile Menu

For smaller screens, add hamburger menu to Navigation component:

```typescript
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
  {/* Hamburger icon */}
</button>
```

## 🎨 Custom Backgrounds

Create gradient variants in [globals.css](app/globals.css):

```css
.bg-sunset {
  background: linear-gradient(to bottom right, #ff7e5f, #feb47b);
}
```

## 📖 Reading Time

Add to poem data:

```typescript
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
```

## 🔐 Protect Admin Route

Use middleware in `middleware.ts`:

```typescript
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  // Add authentication logic
}

export const config = {
  matcher: '/admin/:path*',
};
```

## 🌐 Internationalization

Install next-intl for multi-language support:
```bash
npm install next-intl
```

Follow [next-intl docs](https://next-intl-docs.vercel.app/) for setup.
