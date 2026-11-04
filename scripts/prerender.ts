/**
 * Post-build step: writes one static HTML file per page and the sitemap.
 *
 *   dist/index.html    → home
 *   dist/weather.html  → /weather  (Cloudflare Pages serves foo.html at /foo with no redirect;
 *                                   foo/index.html would 308-redirect /foo → /foo/)
 *   dist/sitemap.xml
 *
 * Each file gets its own <title>, description, canonical, Open Graph tags and
 * JSON-LD, plus a short static summary inside #root so crawlers (and link
 * previews that don't run JS) see real per-page content. React replaces #root
 * on load, so users never see it.
 *
 * Run after `vite build`:  npx tsx scripts/prerender.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, SITE_NAME, SITE_URL, canonicalUrl, type PageSeo } from '../src/constants/seo.ts';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setTag(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const re = new RegExp(`(<meta\\s+${attr}="${key.replace(/[.:]/g, '\\$&')}"\\s+content=")[^"]*(")`);
  if (re.test(html)) return html.replace(re, `$1${esc(value)}$2`);
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`);
}

function jsonLd(page: PageSeo): string {
  const url = canonicalUrl(page);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'zh-Hant-TW',
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'zh-Hant-TW',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  ];
  if (page.path === '/') {
    graph.push({
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      inLanguage: 'zh-Hant-TW',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
      description: page.description,
    });
  } else {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.heading, item: url },
      ],
    });
  }
  // `</` must not appear inside a <script> block.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function staticBody(page: PageSeo): string {
  const links = PAGES.filter(p => p.path !== page.path)
    .map(p => `<li><a href="${p.path}">${esc(p.heading)}</a></li>`)
    .join('');
  return (
    `<div class="prerender"><h1>${esc(page.heading)}</h1><p>${esc(page.description)}</p>` +
    `<nav aria-label="${esc(SITE_NAME)}"><ul>${links}</ul></nav></div>`
  );
}

function render(page: PageSeo): string {
  const url = canonicalUrl(page);
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  html = setTag(html, 'name', 'description', page.description);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setTag(html, 'property', 'og:title', page.title);
  html = setTag(html, 'property', 'og:description', page.description);
  html = setTag(html, 'property', 'og:url', url);
  html = setTag(html, 'name', 'twitter:title', page.title);
  html = setTag(html, 'name', 'twitter:description', page.description);
  html = html.replace('</head>', `    <script type="application/ld+json">${jsonLd(page)}</script>\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${staticBody(page)}</div>`);
  return html;
}

for (const page of PAGES) {
  const out = page.path === '/' ? join(DIST, 'index.html') : join(DIST, `${page.path.slice(1)}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(page));
}

// Real 404 page: with a 404.html present, Cloudflare Pages answers unknown paths with
// status 404 instead of serving index.html as 200 (a "soft 404" to search engines).
{
  const home = PAGES[0];
  let html = render(home);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>找不到頁面｜${esc(SITE_NAME)}</title>`);
  html = html.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '');
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  html = html.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>');
  html = html.replace(/<div class="prerender"><h1>[^<]*<\/h1><p>[^<]*<\/p>/, '<div class="prerender"><h1>找不到頁面</h1><p>這個網址不存在，請從下方選擇工具。</p>');
  writeFileSync(join(DIST, '404.html'), html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  PAGES.map(p =>
    `  <url>\n    <loc>${canonicalUrl(p)}</loc>\n    <lastmod>${today}</lastmod>\n` +
    `    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority.toFixed(1)}</priority>\n  </url>`,
  ).join('\n') +
  '\n</urlset>\n';
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`prerendered ${PAGES.length} pages + sitemap.xml`);
