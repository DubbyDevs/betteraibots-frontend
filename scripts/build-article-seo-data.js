/**
 * Generates src/data/articleSeo.js from Articles.js + appsData + existing ArticlePage keywords.
 * Run: node scripts/build-article-seo-data.js
 */
const fs = require('fs');
const path = require('path');
const { extractLearnArticlesFromSource } = require('./seo-utils');
const articleIndexingRules = require('../src/data/articleIndexingRules.json');

const ROOT = path.join(__dirname, '..');
const ARTICLE_PAGE = path.join(ROOT, 'src', 'ArticlePage.js');
const APPS_DATA = path.join(ROOT, 'src', 'data', 'appsData.js');
const OUT_FILE = path.join(ROOT, 'src', 'data', 'articleSeo.js');

const DEFAULT_KEYWORDS =
  'AI tools, artificial intelligence, software guide, features, how to use, BetterAiBots';

/** Story-style titles → guide-style SEO titles */
const TITLE_OVERRIDES = {
  'invideo-ai': 'InVideo AI Complete Guide: Create Professional Videos with AI',
  'murf-ai-complete-guide': 'Murf AI Complete Guide: AI Voiceovers and Text-to-Speech',
  'lindy-ai': 'Lindy AI Complete Guide: AI Workflow Automation and AI Agents',
  'veed-complete-guide': 'VEED Complete Guide: AI Video Editing and Creation',
  'viral-launch': 'Viral Launch Complete Guide: Amazon Seller Tools and Product Research',
  'aisdr-complete-guide': 'AiSDR Complete Guide: AI Sales Development and Outreach',
  'flowith-io': 'Flowith.io Complete Guide: AI Canvas and Agent Workflows',
  'warmy-io-spam-folder-rebellion-email-deliverability':
    'Warmy.io Complete Guide: Email Warm-Up and Deliverability',
  'scholar-gpt': 'Scholar GPT Guide: AI Research Assistant for Academics',
  'blackbox-ai': 'Blackbox AI Complete Guide: AI Code Assistant for Developers',
  'brevo-complete-guide': 'Brevo Complete Guide: AI Email Marketing and Automation',
  'reply-io-complete-guide': 'Reply.io Complete Guide: AI Sales Engagement Platform',
  'apollo-io': 'Apollo.io Complete Guide: B2B Prospecting and Sales Intelligence',
  'paintr': 'PaintR Complete Guide: AI Paint Color Identification',
  'anybiz-alt': 'AnyBiz.io Complete Guide: AI Sales Agents and Outreach Automation',
  'travel-code-ai-complete-guide': 'Travel Code AI Complete Guide: AI Travel Planning Tools',
  'perplexity-parasite-seo-guide':
    'Perplexity Parasite SEO Guide: Rank Content Faster with AI Search',
};

function truncateMeta(text, max = 160) {
  const t = (text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 3);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 100 ? cut.slice(0, lastSpace) : cut) + '...';
}

function sanitizePlainText(text) {
  return (text || '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractKeywordMapFromArticlePage() {
  const content = fs.readFileSync(ARTICLE_PAGE, 'utf8');
  const maps = [];
  const re = /const keywordMap = (\{[\s\S]*?\n\s*\});/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    try {
      // eslint-disable-next-line no-eval
      maps.push(eval(`(${m[1]})`));
    } catch (e) {
      console.warn('Could not parse a keywordMap block:', e.message);
    }
  }
  return Object.assign({}, ...maps);
}

function extractAppsByLearnPath() {
  const content = fs.readFileSync(APPS_DATA, 'utf8');
  const apps = {};
  const blocks = content.split(/\n  \},\n/);
  for (const block of blocks) {
    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    const descMatch = block.match(/description:\s*"([^"]+)"/);
    const linkMatch = block.match(/readMoreLink:\s*"(\/learn\/[^"]+)"/);
    const trialMatch = block.match(/trialInfo:\s*"([^"]+)"/);
    if (!nameMatch || !linkMatch) continue;
    const id = linkMatch[1].replace('/learn/', '');
    apps[id] = {
      name: nameMatch[1],
      description: descMatch ? descMatch[1] : '',
      trialInfo: trialMatch ? trialMatch[1] : '',
    };
  }
  return apps;
}

function slugToLabel(id) {
  return id
    .replace(/-complete-guide$/, '')
    .replace(/-ai$/, ' AI')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateKeywords(article, app, existing) {
  if (existing) return existing;
  const name = app?.name || article.title.split(':')[0].trim() || slugToLabel(article.id);
  const topic = slugToLabel(article.id);
  const bits = [
    name,
    topic,
    'AI tools',
    'complete guide',
    'features',
    'how to use',
    'workflow',
    'BetterAiBots',
  ];
  if (app?.description) {
    const words = app.description
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 4)
      .slice(0, 4);
    bits.push(...words);
  }
  return [...new Set(bits)].join(', ');
}

function generateMetaDescription(article, app) {
  const preview = sanitizePlainText(article.preview || '');
  if (preview.length >= 90 && preview.length <= 165) return preview;
  if (preview.length > 165) return truncateMeta(preview);

  const name = app?.name || article.title.split(':')[0].trim();
  if (app?.description) {
    return truncateMeta(`${name}: ${sanitizePlainText(app.description)}`);
  }

  const firstContentSentence = sanitizePlainText(article.content || '')
    .match(/(.{70,220}?[.!?])(?:\s|$)/)?.[1];
  if (firstContentSentence) return truncateMeta(firstContentSentence);

  if (preview.length >= 50) return truncateMeta(preview);

  return truncateMeta(
    `${article.title} — learn features, use cases, setup tips, and how to get started with this AI tool on BetterAiBots.`
  );
}

function patchArticlesJsTitles(overrides) {
  let content = fs.readFileSync(path.join(ROOT, 'src', 'Articles.js'), 'utf8');
  let changes = 0;
  for (const [id, newTitle] of Object.entries(overrides)) {
    const re = new RegExp(
      `(id:\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?title:\\s*)"(?:[^"\\\\]|\\\\.)*"(\\s*,)`,
      'm'
    );
    const next = content.replace(re, `$1"${newTitle.replace(/"/g, '\\"')}"$2`);
    if (next !== content) {
      content = next;
      changes++;
    }
  }
  if (changes > 0) {
    fs.writeFileSync(path.join(ROOT, 'src', 'Articles.js'), content);
    console.log(`Updated ${changes} article titles in Articles.js`);
  }
}

function patchArticlePreviews(previewById) {
  let content = fs.readFileSync(path.join(ROOT, 'src', 'Articles.js'), 'utf8');
  let changes = 0;
  for (const [id, preview] of Object.entries(previewById)) {
    const re = new RegExp(
      `(id:\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?preview:\\s*)"(?:[^"\\\\]|\\\\.)*"(\\s*,)`,
      'm'
    );
    const escaped = preview.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const next = content.replace(re, `$1"${escaped}"$2`);
    if (next !== content) {
      content = next;
      changes++;
    }
  }
  if (changes > 0) {
    fs.writeFileSync(path.join(ROOT, 'src', 'Articles.js'), content);
    console.log(`Updated ${changes} article previews in Articles.js`);
  }
}

function main() {
  const existingKeywords = extractKeywordMapFromArticlePage();
  const apps = extractAppsByLearnPath();
  const articles = extractLearnArticlesFromSource();
  const unique = new Map();
  articles.forEach((a) => {
    if (!unique.has(a.id)) unique.set(a.id, a);
  });

  const keywords = {};
  const descriptions = {};
  const hiddenIds = new Set([
    ...Object.keys(articleIndexingRules.redirects || {}),
    ...(articleIndexingRules.noindex || [])
  ]);

  unique.forEach((article, id) => {
    const app = apps[id];
    keywords[id] = generateKeywords(article, app, existingKeywords[id]);
    descriptions[id] = generateMetaDescription(article, app);
  });

  patchArticlesJsTitles(TITLE_OVERRIDES);

  // Clear preview in Articles.js — previews are for SEO only (articleSeo.js), not on-page copy
  const clearPreviews = {};
  unique.forEach((_, id) => {
    clearPreviews[id] = '';
  });
  patchArticlePreviews(clearPreviews);

  const file = `// AUTO-GENERATED by scripts/build-article-seo-data.js — do not edit by hand.
// Re-run: node scripts/build-article-seo-data.js

export const DEFAULT_ARTICLE_KEYWORDS = ${JSON.stringify(DEFAULT_KEYWORDS)};

/** Meta descriptions optimized for search (~150–160 chars) */
export const ARTICLE_SEO_DESCRIPTIONS = ${JSON.stringify(descriptions, null, 2)};

/** Per-article keyword meta tags and schema keywords */
export const ARTICLE_KEYWORDS = ${JSON.stringify(keywords, null, 2)};

export function getArticleKeywords(articleId) {
  return ARTICLE_KEYWORDS[articleId] || DEFAULT_ARTICLE_KEYWORDS;
}

export function getArticleSeoDescription(article) {
  if (!article) return '';
  const fromMap = ARTICLE_SEO_DESCRIPTIONS[article.id];
  if (fromMap) return fromMap;
  const preview = (article.preview || '').trim();
  if (preview) return preview;
  return article.title || '';
}
`;

  fs.writeFileSync(OUT_FILE, file);

  const metadata = [...unique.values()]
    .filter((a) => !hiddenIds.has(a.id))
    .map((a) => ({
    id: a.id,
    title: TITLE_OVERRIDES[a.id] || a.title,
    date: a.date,
    preview: descriptions[a.id],
    cover: null,
  }));
  fs.writeFileSync(
    path.join(ROOT, 'public', 'articles-metadata.json'),
    JSON.stringify(metadata, null, 2) + '\n'
  );

  console.log(`✅ Wrote ${Object.keys(keywords).length} entries to src/data/articleSeo.js`);
  console.log(`✅ Updated public/articles-metadata.json`);
}

main();
