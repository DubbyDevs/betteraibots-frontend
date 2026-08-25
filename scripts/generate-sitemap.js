/**
 * Regenerate public/sitemap.xml from Articles.js, news.js, and core routes.
 * Run on every build so the sitemap never drifts behind new content.
 */
const fs = require('fs');
const path = require('path');
const {
  extractLearnArticlesFromSource,
  extractNewsArticlesFromSource,
  escapeHtml
} = require('./seo-utils');
const articleIndexingRules = require('../src/data/articleIndexingRules.json');
const { WATCH_VIDEOS } = require('./watch-videos');

const BASE = 'https://betteraibots.com';
const today = new Date().toISOString().slice(0, 10);
const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

function videoSitemapMarkup(video) {
  return `    <video:video>
      <video:thumbnail_loc>${escapeHtml(`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`)}</video:thumbnail_loc>
      <video:title>${escapeHtml(video.title)}</video:title>
      <video:description>${escapeHtml(video.description)}</video:description>
      <video:player_loc allow_embed="yes">${escapeHtml(`https://www.youtube.com/embed/${video.youtubeId}`)}</video:player_loc>
      <video:publication_date>2025-11-20</video:publication_date>
    </video:video>`;
}

function urlEntry(loc, { lastmod = today, changefreq = 'weekly', priority = '0.8', video = null } = {}) {
  return `  <url>
    <loc>${escapeHtml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${video ? videoSitemapMarkup(video) : ''}
  </url>`;
}

function normalizeDate(dateStr) {
  if (!dateStr) return today;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return today;
  return d.toISOString().slice(0, 10);
}

const staticPages = [
  { loc: `${BASE}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${BASE}/apps`, priority: '0.9', changefreq: 'daily' },
  { loc: `${BASE}/my-ai`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${BASE}/news`, priority: '0.8', changefreq: 'daily' },
  { loc: `${BASE}/learn`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE}/learn/beginner`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${BASE}/learn/intermediate`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${BASE}/learn/advanced`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${BASE}/beginner-quiz`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE}/intermediate-quiz`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE}/advanced-quiz`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE}/Podcast`, priority: '0.75', changefreq: 'weekly' },
  { loc: `${BASE}/about`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE}/contact`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE}/legal`, priority: '0.4', changefreq: 'yearly' },
  { loc: `${BASE}/privacy`, priority: '0.4', changefreq: 'yearly' }
];

const learnArticles = extractLearnArticlesFromSource();
const newsArticles = extractNewsArticlesFromSource();
const redirectedLearnIds = new Set(Object.keys(articleIndexingRules.redirects || {}));
const noindexLearnIds = new Set(articleIndexingRules.noindex || []);

const entries = [];

staticPages.forEach((p) => entries.push(urlEntry(p.loc, p)));

newsArticles.forEach((article) => {
  entries.push(
    urlEntry(`${BASE}/news/${article.slug}`, {
      lastmod: normalizeDate(article.date),
      changefreq: 'weekly',
      priority: '0.9'
    })
  );
});

learnArticles.forEach((article) => {
  if (redirectedLearnIds.has(article.id) || noindexLearnIds.has(article.id)) {
    return;
  }
  entries.push(
    urlEntry(`${BASE}/learn/${article.id}`, {
      lastmod: normalizeDate(article.date),
      changefreq: 'weekly',
      priority: '0.8'
    })
  );
});

WATCH_VIDEOS.forEach((video) => {
  entries.push(
    urlEntry(`${BASE}/watch/${video.slug}`, {
      changefreq: 'monthly',
      priority: '0.65',
      video
    })
  );
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.join('\n\n')}
</urlset>
`;

fs.writeFileSync(outPath, xml, 'utf8');
console.log(`✅ sitemap.xml written: ${entries.length} URLs`);
console.log(`   static: ${staticPages.length}, news: ${newsArticles.length}, learn: ${learnArticles.length}, watch: ${WATCH_VIDEOS.length}`);
