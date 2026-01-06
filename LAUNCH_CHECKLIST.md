# 🚀 Launch Checklist

Use this checklist before deploying your poetry portfolio to production.

## ✅ Pre-Launch Checklist

### Content
- [ ] Replace sample poems with your own poetry
- [ ] Update hero quote on home page
- [ ] Write your bio in About page
- [ ] Add author photo (optional)
- [ ] Verify all poem dates and categories
- [ ] Check for typos and formatting

### Branding
- [ ] Change "Vaishnavi" to your name in Navigation
- [ ] Update page titles in metadata
- [ ] Create/add favicon (`app/favicon.ico`)
- [ ] Add Open Graph image (`public/og-image.jpg`)
- [ ] Customize meta descriptions

### Configuration
- [ ] Set up environment variables (if using Supabase)
- [ ] Configure site URL in `next.config.ts`
- [ ] Review and update `package.json` metadata
- [ ] Add your repository URL to README

### Design (Optional)
- [ ] Adjust colors if desired
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Verify responsive layout
- [ ] Check dark mode appearance

### Performance
- [ ] Run `npm run build` locally
- [ ] Check build output for errors
- [ ] Test production build: `npm start`
- [ ] Run Lighthouse audit
- [ ] Optimize any large images

### SEO
- [ ] Add sitemap.xml (automatic in Next.js)
- [ ] Add robots.txt if needed
- [ ] Verify meta tags on all pages
- [ ] Set up Google Analytics (optional)
- [ ] Submit to Google Search Console (after deploy)

### Accessibility
- [ ] Test keyboard navigation
- [ ] Check color contrast ratios
- [ ] Add alt text to images
- [ ] Verify heading hierarchy
- [ ] Test with screen reader (optional)

### Security
- [ ] Review `.gitignore` (don't commit `.env.local`)
- [ ] Check for exposed API keys
- [ ] Add security headers in `next.config.ts`
- [ ] Set up HTTPS (automatic on Vercel/Netlify)

### Deployment Prep
- [ ] Choose hosting platform (Vercel/Netlify/other)
- [ ] Set up Git repository
- [ ] Push code to GitHub/GitLab
- [ ] Configure build settings
- [ ] Set environment variables on host

## 🌐 Deployment Steps

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add environment variables
7. Deploy!

### Option 2: Netlify

1. Run `npm run build`
2. Visit [netlify.com](https://netlify.com)
3. Drag `.next` folder to deploy
4. Or connect to Git repository
5. Configure build settings
6. Deploy!

### Option 3: Self-Hosted

1. Set up Node.js server
2. Clone repository
3. Run `npm install`
4. Run `npm run build`
5. Run `npm start` (or use PM2)
6. Configure reverse proxy (Nginx)
7. Set up SSL certificate

## 📊 Post-Launch

### Immediate
- [ ] Test live site thoroughly
- [ ] Share on social media
- [ ] Send to friends/family
- [ ] Monitor for errors in dashboard

### Week 1
- [ ] Check analytics setup
- [ ] Review user feedback
- [ ] Fix any reported issues
- [ ] Add to poetry directories (optional)

### Month 1
- [ ] Review performance metrics
- [ ] Add new poems
- [ ] Consider implementing Hearts feature
- [ ] Set up email newsletter (optional)

## 🔧 Optional Enhancements

### Quick Wins
- [ ] Add Google Analytics
- [ ] Set up Supabase for Hearts
- [ ] Create social media cards
- [ ] Add poetry categories page
- [ ] Implement search functionality

### Advanced
- [ ] Integrate Sveltia CMS
- [ ] Add comment system
- [ ] Create audio recordings
- [ ] Build email newsletter
- [ ] Add multi-language support
- [ ] Create print-friendly views

## 📝 Maintenance Schedule

### Weekly
- [ ] Add new poems (if applicable)
- [ ] Respond to comments
- [ ] Check for security updates

### Monthly
- [ ] Review analytics
- [ ] Update dependencies: `npm update`
- [ ] Backup content
- [ ] Test site functionality

### Quarterly
- [ ] Upgrade Next.js: `npm install next@latest`
- [ ] Review and optimize performance
- [ ] Refresh design elements
- [ ] Plan new features

## 🆘 Troubleshooting

### Build Fails
1. Check error messages
2. Run `npm install` again
3. Delete `node_modules` and `.next`
4. Clear npm cache: `npm cache clean --force`

### Styles Not Loading
1. Check `globals.css` syntax
2. Verify Tailwind config
3. Clear browser cache
4. Check for CSS conflicts

### Images Not Showing
1. Verify path (`/images/...` not `images/...`)
2. Check file exists in `public/`
3. Verify image format supported
4. Check file permissions

### Deployment Issues
1. Check build logs
2. Verify environment variables
3. Check Node version compatibility
4. Review hosting docs

## 🎯 Success Metrics

Track these to measure success:

- [ ] Page views (target: ____)
- [ ] Average time on page (target: ____)
- [ ] Mobile vs desktop ratio
- [ ] Most viewed poems
- [ ] Engagement rate (if comments enabled)

## 🎨 Brand Assets Needed

- [ ] Logo (optional)
- [ ] Favicon (16x16, 32x32, 192x192)
- [ ] Open Graph image (1200x630)
- [ ] Twitter card image (1200x675)
- [ ] Apple touch icon (180x180)
- [ ] Author photo

## 📧 Marketing Checklist

- [ ] Create social media accounts
- [ ] Prepare launch announcement
- [ ] List in poetry directories
- [ ] Join poetry communities
- [ ] Set up email list
- [ ] Plan content calendar

---

## ✨ You're Ready to Launch!

Your poetry portfolio is built with:
- ✅ Modern Next.js 15 architecture
- ✅ Beautiful, responsive design
- ✅ Smooth animations
- ✅ SEO optimization
- ✅ Performance best practices
- ✅ Future-proof features

**Current Status**: Development server running at http://localhost:3000

**Next Step**: Start checking off this list and make it yours! 🚀

Good luck with your poetry portfolio launch! 📚✨
