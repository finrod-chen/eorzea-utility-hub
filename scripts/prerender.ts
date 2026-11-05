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
import { TOOL_GUIDES, type GuideSection } from '../src/constants/toolGuides.ts';
import { LINK_CATEGORIES } from '../src/constants/usefulLinks.ts';
import { CHANGELOG } from '../src/constants/changelog.ts';
import { PRIVACY_CONTENT } from '../src/constants/privacy.ts';
import { CONTACT_EMAIL, PRIVACY_UPDATED } from '../src/constants/site.ts';
import zhTW from '../src/i18n/locales/zh-TW.json' with { type: 'json' };

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
  const guide = TOOL_GUIDES[page.view]?.zh;
  if (guide && guide.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: 'zh-Hant-TW',
      mainEntity: guide.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  // `</` must not appear inside a <script> block.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function sectionHtml(sec: GuideSection): string {
  let h = `<h2>${esc(sec.heading)}</h2>`;
  for (const p of sec.paragraphs ?? []) h += `<p>${esc(p)}</p>`;
  if (sec.list) h += `<ul>${sec.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  if (sec.table) {
    const t = sec.table;
    h += `<table>${t.caption ? `<caption>${esc(t.caption)}</caption>` : ''}` +
      `<thead><tr>${t.head.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>` +
      `<tbody>${t.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  if (sec.note) h += `<p>${esc(sec.note)}</p>`;
  return h;
}

const lookup = (key: string): string =>
  key.split('.').reduce<any>((o, k) => (o == null ? o : o[k]), zhTW) ?? key;

/** Page-specific body for the data-driven pages (links / changelog / privacy). */
function dataBody(page: PageSeo): string {
  if (page.view === 'links') {
    return LINK_CATEGORIES.map(c =>
      `<h2>${esc(String(lookup(c.titleKey)))}</h2><ul>${c.links.map(l => `<li>${esc(l.title)}</li>`).join('')}</ul>`,
    ).join('');
  }
  if (page.view === 'changelog') {
    return CHANGELOG.map(e =>
      `<h2>${esc(e.version)}（${esc(e.date)}）${esc(e.title)}</h2><ul>${e.items.map(i => `<li>${esc(i.text)}</li>`).join('')}</ul>`,
    ).join('');
  }
  if (page.view === 'privacy') {
    const c = PRIVACY_CONTENT.zh;
    return `<p>${esc(c.intro)}</p>` + c.sections.map(s =>
      `<h2>${esc(s.title)}</h2>${(s.paragraphs ?? []).map(p => `<p>${esc(p)}</p>`).join('')}` +
      (s.items ? `<ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : ''),
    ).join('') + `<p>聯絡信箱：${esc(CONTACT_EMAIL)}</p><p>最後更新日期：${esc(PRIVACY_UPDATED)}</p>`;
  }
  return '';
}

function staticBody(page: PageSeo): string {
  const links = PAGES.filter(p => p.path !== page.path)
    .map(p => `<li><a href="${p.path}">${esc(p.heading)}</a></li>`)
    .join('');
  const tg = TOOL_GUIDES[page.view];
  const guide = tg?.zh;
  let guideHtml = '';
  if (guide) {
    guideHtml = `<section><h2>使用說明</h2><p>${esc(guide.intro)}</p>` +
      (guide.steps.length ? `<ol>${guide.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : '') +
      (guide.sections ?? []).map(sectionHtml).join('') +
      (guide.faq.length
        ? `<h2>常見問題</h2>${guide.faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}`
        : '') +
      (tg?.related?.length
        ? `<h2>相關工具</h2><ul>${tg.related.map(r => {
            const rp = PAGES.find(p => p.view === r.view);
            return rp ? `<li><a href="${rp.path}">${esc(rp.heading)}</a>：${esc(r.note)}</li>` : '';
          }).join('')}</ul>`
        : '') +
      `</section>`;
  }
  return (
    `<div class="prerender"><h1>${esc(page.heading)}</h1><p>${esc(page.description)}</p>${dataBody(page)}${guideHtml}` +
    `<nav aria-label="${esc(SITE_NAME)}"><ul>${links}</ul></nav></div>`
  );
}

function render(page: PageSeo, body?: string): string {
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
  html = html.replace('<div id="root"></div>', `<div id="root">${body ?? staticBody(page)}</div>`);
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
  const nav = PAGES.map(p => `<li><a href="${p.path}">${esc(p.heading)}</a></li>`).join('');
  let html = render(home, `<div class="prerender"><h1>找不到頁面</h1><p>這個網址不存在，請從下方選擇工具。</p><nav aria-label="${esc(SITE_NAME)}"><ul>${nav}</ul></nav></div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>找不到頁面｜${esc(SITE_NAME)}</title>`);
  html = html.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '');
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  html = html.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>');
  writeFileSync(join(DIST, '404.html'), html);
}

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  PAGES.map(p =>
    `  <url>\n    <loc>${canonicalUrl(p)}</loc>\n    <lastmod>${p.updated}</lastmod>\n` +
    `    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority.toFixed(1)}</priority>\n  </url>`,
  ).join('\n') +
  '\n</urlset>\n';
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`prerendered ${PAGES.length} pages + sitemap.xml`);
