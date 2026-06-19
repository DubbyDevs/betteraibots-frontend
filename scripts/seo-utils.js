/**
 * Shared helpers for static SEO HTML generation.
 */
const fs = require('fs');
const path = require('path');

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Scan a JS object block for a template-literal field value (content: `...`). */
function extractTemplateLiteralContent(block, fieldName = 'content') {
  const marker = `${fieldName}: \``;
  const start = block.indexOf(marker);
  if (start === -1) return '';

  let i = start + marker.length;
  let result = '';

  while (i < block.length) {
    const ch = block[i];
    if (ch === '\\' && i + 1 < block.length) {
      result += ch + block[i + 1];
      i += 2;
      continue;
    }
    if (ch === '`') {
      const rest = block.slice(i + 1);
      if (/^[\s,]*(?:\n\s*}|,\s*\n\s*\w+:)/.test(rest)) {
        return result.trim();
      }
    }
    result += ch;
    i++;
  }

  return result.trim();
}

/** Extract learn articles from Articles.js (id, title, date, preview, content). */
function extractLearnArticlesFromSource() {
  const articlesPath = path.join(__dirname, '..', 'src', 'Articles.js');
  const content = fs.readFileSync(articlesPath, 'utf8');
  const start = content.indexOf('export const articles = [');
  if (start === -1) {
    throw new Error('Could not find export const articles = [ in Articles.js');
  }

  const arrayBody = content.slice(start);
  const articles = [];
  const idRegex = /{\s*id:\s*"([^"]+)"/g;
  const positions = [];
  let m;
  while ((m = idRegex.exec(arrayBody)) !== null) {
    positions.push({ id: m[1], index: m.index });
  }

  for (let i = 0; i < positions.length; i++) {
    const blockStart = positions[i].index;
    const blockEnd = positions[i + 1] ? positions[i + 1].index : arrayBody.length;
    const block = arrayBody.slice(blockStart, blockEnd);

    const titleMatch = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/);
    const dateMatch = block.match(/date:\s*"([^"]+)"/);
    const previewMatch = block.match(/preview:\s*"((?:[^"\\]|\\.)*)"/);
    const articleContent = extractTemplateLiteralContent(block, 'content');

    if (!titleMatch) continue;

    articles.push({
      id: positions[i].id,
      title: titleMatch[1].replace(/\\"/g, '"').replace(/\\n/g, ' ').trim(),
      date: dateMatch ? dateMatch[1] : '',
      preview: previewMatch
        ? previewMatch[1].replace(/\\"/g, '"').replace(/\\n/g, ' ').trim()
        : '',
      content: articleContent
    });
  }

  return articles;
}

/** Extract news articles from news.js (slug, title, excerpt, date, content HTML). */
function extractNewsArticlesFromSource() {
  const newsPath = path.join(__dirname, '..', 'src', 'data', 'news.js');
  const content = fs.readFileSync(newsPath, 'utf8');
  const articles = [];
  const idRegex = /{\s*\r?\n\s*id:\s*[\d.]+/g;
  const positions = [];
  let m;
  while ((m = idRegex.exec(content)) !== null) {
    positions.push({ index: m.index });
  }

  for (let i = 0; i < positions.length; i++) {
    const blockStart = positions[i].index;
    const blockEnd = positions[i + 1] ? positions[i + 1].index : content.length;
    const block = content.slice(blockStart, blockEnd);

    const slugMatch = block.match(/slug:\s*"([^"]+)"/);
    const titleMatch = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/);
    const excerptMatch = block.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/);
    const dateMatch = block.match(/date:\s*"([^"]+)"/);
    const articleContent = extractTemplateLiteralContent(block, 'content');

    if (!slugMatch || !titleMatch) continue;

    articles.push({
      slug: slugMatch[1],
      title: titleMatch[1].replace(/\\"/g, '"').replace(/\\n/g, ' ').trim(),
      excerpt: excerptMatch
        ? excerptMatch[1].replace(/\\"/g, '"').replace(/\\n/g, ' ').trim()
        : '',
      date: dateMatch ? dateMatch[1] : '',
      content: articleContent
    });
  }

  const seen = new Set();
  return articles.filter((a) => {
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
}

/** Convert markdown-ish learn content to HTML (keeps existing HTML tags). */
function markdownToHtml(md) {
  if (!md) return '';
  let text = md;
  // Code fences use ~~~ in source to avoid breaking JS template literals
  text = text.replace(/~~~(\w*)\n([\s\S]*?)~~~/g, '```$1\n$2```');
  const lines = text.split('\n');
  const out = [];
  let inList = false;
  let listType = null;
  let inCode = false;
  let codeBuf = [];
  let codeLang = '';

  const flushList = () => {
    if (inList) {
      out.push(listType === 'ol' ? '</ol>' : '</ul>');
      inList = false;
      listType = null;
    }
  };

  const flushCode = () => {
    if (inCode) {
      out.push(`<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`);
      inCode = false;
      codeBuf = [];
      codeLang = '';
    }
  };

  for (let line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        flushCode();
      } else {
        flushList();
        inCode = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    if (line.match(/^<[\w/!]/)) {
      flushList();
      out.push(line);
      continue;
    }

    if (line.match(/^### /)) {
      flushList();
      out.push(`<h3>${inlineFormat(line.slice(4))}</h3>`);
      continue;
    }
    if (line.match(/^## /)) {
      flushList();
      out.push(`<h2>${inlineFormat(line.slice(3))}</h2>`);
      continue;
    }
    if (line.match(/^# /)) {
      flushList();
      out.push(`<h1>${inlineFormat(line.slice(2))}</h1>`);
      continue;
    }
    if (line.match(/^> /)) {
      flushList();
      out.push(`<blockquote><p>${inlineFormat(line.slice(2))}</p></blockquote>`);
      continue;
    }
    if (line.match(/^---\s*$/)) {
      flushList();
      out.push('<hr />');
      continue;
    }
    const ul = line.match(/^[-*] (.+)$/);
    if (ul) {
      if (!inList || listType !== 'ul') {
        flushList();
        out.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      out.push(`<li>${inlineFormat(ul[1])}</li>`);
      continue;
    }
    const ol = line.match(/^\d+\. (.+)$/);
    if (ol) {
      if (!inList || listType !== 'ol') {
        flushList();
        out.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      out.push(`<li>${inlineFormat(ol[1])}</li>`);
      continue;
    }

    flushList();
    if (line.trim() === '') {
      continue;
    }
    out.push(`<p>${inlineFormat(line)}</p>`);
  }
  flushList();
  flushCode();
  return out.join('\n');
}

function inlineFormat(s) {
  let t = escapeHtml(s);
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#36ff95;text-decoration:underline">$1</a>');
  return t;
}

const BASE_STYLES = `
  body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #101c26; color: #e9f7ee; line-height: 1.7; }
  .site-header { background: linear-gradient(135deg, #172d3e 0%, #101c26 100%); padding: 16px 20px; border-bottom: 1px solid rgba(54,255,149,0.2); }
  .site-header a { color: #36ff95; text-decoration: none; margin-right: 20px; font-weight: 600; }
  .container { max-width: 800px; margin: 0 auto; padding: 24px 20px 48px; }
  .article-title { font-size: 2rem; margin-bottom: 8px; color: #00ffb2; line-height: 1.2; }
  .article-meta { color: #888; margin-bottom: 24px; font-size: 0.95rem; }
  .article-preview { font-size: 1.15rem; color: #d1efe7; margin-bottom: 28px; }
  .article-body { background: linear-gradient(135deg, #172d3e 0%, #101c26 100%); border-radius: 24px; padding: 28px 24px; border: 1px solid rgba(54,255,149,0.15); }
  .article-body h2 { color: #36ff95; font-size: 1.5rem; margin: 28px 0 12px; }
  .article-body h3 { color: #36ff95; font-size: 1.2rem; margin: 22px 0 10px; }
  .article-body p { margin-bottom: 16px; }
  .article-body ul, .article-body ol { margin: 16px 0; padding-left: 24px; }
  .article-body li { margin-bottom: 8px; }
  .article-body a { color: #36ff95; }
  .article-body blockquote { border-left: 4px solid #36ff95; padding-left: 16px; margin: 20px 0; color: #b2ffe0; }
  .article-body pre { background: #0d1520; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 0.9rem; }
  .article-body hr { border: none; border-top: 1px solid rgba(54,255,149,0.2); margin: 28px 0; }
  .cta-button { display: inline-block; background: linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%); color: #101c26; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; margin: 24px 0; }
  .footer-note { margin-top: 32px; font-size: 0.9rem; color: #888; }
`;

function buildStaticPageHtml({
  title,
  description,
  canonicalUrl,
  ogImage,
  keywords,
  dateISO,
  bodyHtml,
  ctaHref,
  ctaLabel,
  sectionLabel,
  robotsContent = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
}) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const ctaBlock =
    ctaHref && ctaLabel
      ? `<p><a href="${escapeHtml(ctaHref)}" class="cta-button" target="_blank" rel="noopener noreferrer">${escapeHtml(ctaLabel)}</a></p>`
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle} – BetterAiBots.com</title>
  <meta name="description" content="${safeDesc}">
  <meta name="robots" content="${escapeHtml(robotsContent)}">
  <meta name="keywords" content="${escapeHtml(keywords)}">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <meta property="og:site_name" content="BetterAiBots.com">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${escapeHtml(ogImage)}">
  <meta name="article:published_time" content="${dateISO}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(title)},
    "description": ${JSON.stringify(description)},
    "image": ${JSON.stringify(ogImage)},
    "author": { "@type": "Organization", "name": "BetterAiBots", "url": "https://betteraibots.com" },
    "publisher": {
      "@type": "Organization",
      "name": "BetterAiBots",
      "logo": { "@type": "ImageObject", "url": "https://betteraibots.com/betteraibotsglowlogo8.png" }
    },
    "datePublished": "${dateISO}",
    "dateModified": "${dateISO}",
    "mainEntityOfPage": { "@type": "WebPage", "@id": ${JSON.stringify(canonicalUrl)} },
    "articleSection": ${JSON.stringify(sectionLabel || 'AI Tools')},
    "inLanguage": "en-US"
  }
  </script>
  <style>${BASE_STYLES}</style>
</head>
<body>
  <header class="site-header">
    <a href="https://betteraibots.com/">Home</a>
    <a href="https://betteraibots.com/apps">Apps</a>
    <a href="https://betteraibots.com/learn">Learn</a>
    <a href="https://betteraibots.com/news">News</a>
  </header>
  <main class="container">
    <article>
      <h1 class="article-title">${safeTitle}</h1>
      <p class="article-meta">Published: ${escapeHtml(dateISO ? dateISO.slice(0, 10) : 'N/A')} • ${escapeHtml(sectionLabel || 'BetterAiBots')}</p>
      <p class="article-preview">${safeDesc}</p>
      <div class="article-body">
        ${bodyHtml}
      </div>
      ${ctaBlock}
      <p class="footer-note">Browse more AI tools at <a href="https://betteraibots.com/apps" style="color:#36ff95">BetterAiBots.com/apps</a></p>
    </article>
  </main>
</body>
</html>`;
}

module.exports = {
  escapeHtml,
  extractTemplateLiteralContent,
  extractLearnArticlesFromSource,
  extractNewsArticlesFromSource,
  markdownToHtml,
  buildStaticPageHtml
};
