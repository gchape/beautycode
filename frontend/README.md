# BeautyCode

## Lighthouse Scores

| 🟢 Performance | 🟢 Accessibility | 🟢 Best Practices | 🟢 SEO |
| -------------- | ---------------- | ----------------- | ------ |
| 92             | 94               | 100               | 100    |

---

## Changes

**Removed Google Fonts (Material Symbols)**
Replaced with unicode characters (`+` `−` `›`) and inline SVG components. Eliminates external font request that was blocking render.

**Fixed Nginx 404 on assets**
Added missing `root /usr/share/nginx/html;` to `/assets/` and `/font/` location blocks.

**SEO**
Added Open Graph tags, canonical URL, `robots.txt`, and `sitemap.xml`.

---

## Deploy

```bash
rm -rf dist/ && npm run build
```

Always deploy the full fresh `dist/` folder, clearing old files on the server first.
