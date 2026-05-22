const fs = require('fs');
const path = require('path');
const { extractNewsArticlesFromSource, buildStaticPageHtml } = require('./seo-utils');

const newsDir = path.join(__dirname, '..', 'public', 'news');
if (!fs.existsSync(newsDir)) {
  fs.mkdirSync(newsDir, { recursive: true });
}

function parseNewsDate(dateStr) {
  if (!dateStr) return new Date().toISOString();
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [a, b, c] = parts;
    if (a.length <= 2) {
      const month = parseInt(a, 10) - 1;
      const day = parseInt(b, 10);
      let year = parseInt(c, 10);
      if (year < 100) year += 2000;
      const d = new Date(year, month, day);
      if (!Number.isNaN(d.getTime())) return d.toISOString();
    }
  }
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

try {
  const articles = extractNewsArticlesFromSource();
  let count = 0;
  articles.forEach((article) => {
    if (!article.slug || !article.content || article.content.length < 100) {
      console.warn(`⚠️  Skipping news ${article.slug || '?'} — missing content`);
      return;
    }
    const articleUrl = `https://betteraibots.com/news/${article.slug}`;
    const html = buildStaticPageHtml({
      title: article.title,
      description: article.excerpt || article.title,
      canonicalUrl: articleUrl,
      ogImage: article.content.match(/src="(\/[^"]+\.(?:jpg|png|webp))"/i)?.[1]
        ? `https://betteraibots.com${article.content.match(/src="(\/[^"]+\.(?:jpg|png|webp))"/i)[1]}`
        : 'https://betteraibots.com/og-image.png?v=3',
      keywords: 'AI news, artificial intelligence, technology news, BetterAiBots',
      dateISO: parseNewsDate(article.date),
      bodyHtml: article.content,
      ctaHref: null,
      ctaLabel: null,
      sectionLabel: 'AI News'
    });
    fs.writeFileSync(path.join(newsDir, `${article.slug}.html`), html);
    count++;
    console.log(`✅ news/${article.slug}.html`);
  });
  console.log(`\n🎉 Prerendered ${count} news articles with full content.`);
} catch (err) {
  console.error('Prerender news failed:', err);
  console.log('⚠️  Continuing build despite news prerender errors');
}
process.exit(0);
