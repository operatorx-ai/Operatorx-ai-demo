# 🚀 Deployment Guide — Operatorx-AI Demo

## Quick Deploy to Vercel (Recommended)

### Option 1: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd Operatorx-ai-demo

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? operatorx-ai-demo
# - In which directory is your code located? ./
# - Want to override the settings? N

# For production deployment
vercel --prod
```

### Option 2: Vercel Web Interface

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
5. Click "Deploy"

---

## Alternative Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

**Or via Netlify UI:**
1. Drag and drop your project folder to [app.netlify.com](https://app.netlify.com)
2. Site goes live instantly

---

### GitHub Pages

```bash
# Create gh-pages branch
git checkout -b gh-pages

# Push to GitHub
git push origin gh-pages

# Enable in repository settings → Pages
```

Your site will be at: `https://<username>.github.io/Operatorx-ai-demo`

---

### Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Configure:
   - **Build command:** (none)
   - **Build output directory:** `/`
4. Deploy

---

## Environment-Specific Configurations

### Production Checklist

- [ ] Update email links to real addresses
- [ ] Replace demo data with live API calls
- [ ] Add analytics tracking (Google Analytics, Plausible, etc.)
- [ ] Configure custom domain
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Set up monitoring (Sentry, LogRocket, etc.)
- [ ] Add meta tags for SEO and social sharing
- [ ] Test on all major browsers
- [ ] Validate responsive design on mobile devices

---

## Custom Domain Setup

### Vercel
```bash
# Add domain
vercel domains add yourdomain.com

# Verify DNS settings
vercel domains inspect yourdomain.com
```

### DNS Configuration
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

---

## Performance Optimization

### Before Deployment

1. **Minify CSS**
   ```bash
   # Using cssnano
   npx cssnano styles.css styles.min.css
   ```

2. **Minify JavaScript**
   ```bash
   # Using terser
   npx terser script.js -o script.min.js
   ```

3. **Optimize Images** (if any are added later)
   ```bash
   # Using imagemin
   npx imagemin images/* --out-dir=images/optimized
   ```

### HTTP Headers (Vercel)

Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## Analytics Integration

### Google Analytics

Add to `<head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible (Privacy-Friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## SEO Optimization

Add to `<head>` in `index.html`:

```html
<!-- Primary Meta Tags -->
<meta name="title" content="Operatorx-AI — AI Operations Platform">
<meta name="description" content="Enterprise AI platform that automates rent, bills, invoices, and payments with governed decision-making.">
<meta name="keywords" content="AI operations, financial automation, enterprise AI, governed AI">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://operatorx-ai-demo.vercel.app/">
<meta property="og:title" content="Operatorx-AI — AI Operations Platform">
<meta property="og:description" content="Enterprise AI platform that automates rent, bills, invoices, and payments with governed decision-making.">
<meta property="og:image" content="https://operatorx-ai-demo.vercel.app/og-image.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://operatorx-ai-demo.vercel.app/">
<meta property="twitter:title" content="Operatorx-AI — AI Operations Platform">
<meta property="twitter:description" content="Enterprise AI platform that automates rent, bills, invoices, and payments with governed decision-making.">
<meta property="twitter:image" content="https://operatorx-ai-demo.vercel.app/og-image.png">

<!-- Favicon -->
<link rel="icon" type="image/png" href="/favicon.png">
```

---

## Monitoring & Error Tracking

### Sentry Integration

```html
<script
  src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"
  crossorigin="anonymous"
></script>
<script>
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: 'production'
  });
</script>
```

---

## Continuous Deployment

### GitHub Actions (Auto-deploy to Vercel)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Testing Before Deployment

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Screen Sizes
- [ ] Desktop (1920×1080)
- [ ] Laptop (1366×768)
- [ ] Tablet (768×1024)
- [ ] Mobile (375×667)

### Lighthouse Audit
```bash
npx lighthouse https://your-demo-url.com --view
```

Target Scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 95+

---

## Post-Deployment

1. **Test All Features**
   - Screen navigation
   - AI command execution
   - Scenario demonstrations
   - Audit log population
   - Keyboard shortcuts

2. **Verify Links**
   - All CTAs work
   - Email links are correct
   - External links open properly

3. **Monitor Performance**
   - Page load time < 2 seconds
   - Time to interactive < 3 seconds
   - No console errors

4. **Share Widely**
   - Update README with live URL
   - Share on social media
   - Send to stakeholders

---

## Rollback Plan

If issues arise:

```bash
# Vercel: Rollback to previous deployment
vercel rollback <deployment-url>

# GitHub: Revert commit
git revert HEAD
git push origin main
```

---

## Support

For deployment issues:
- **Vercel:** [vercel.com/support](https://vercel.com/support)
- **Netlify:** [netlify.com/support](https://netlify.com/support)
- **GitHub:** [GitHub Docs](https://docs.github.com/en/pages)

---

**You're now ready to deploy! 🚀**
