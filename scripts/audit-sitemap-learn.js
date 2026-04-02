/**
 * One-off: compare sitemap /learn/* URLs to article ids in Articles.js; list duplicate ids.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const articlesPath = path.join(root, 'src', 'Articles.js');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');

const articlesText = fs.readFileSync(articlesPath, 'utf8');
const sitemapText = fs.readFileSync(sitemapPath, 'utf8');

const idRe = /\bid:\s*"([^"]+)"/g;
const ids = [];
let m;
while ((m = idRe.exec(articlesText)) !== null) ids.push(m[1]);

const idCounts = {};
for (const id of ids) idCounts[id] = (idCounts[id] || 0) + 1;
const duplicateIds = Object.keys(idCounts).filter((id) => idCounts[id] > 1);

const learnLocRe = /<loc>https:\/\/betteraibots\.com\/learn\/([^<]+)<\/loc>/g;
const sitemapLearn = new Set();
while ((m = learnLocRe.exec(sitemapText)) !== null) sitemapLearn.add(m[1]);

const uniqueArticleIds = new Set(ids);

const inSitemapNotInArticles = [...sitemapLearn].filter((slug) => !uniqueArticleIds.has(slug));
const inArticlesNotInSitemap = [...uniqueArticleIds].filter((id) => !sitemapLearn.has(id));

console.log('--- Learn sitemap audit ---');
console.log('Article id occurrences in Articles.js:', ids.length);
console.log('Unique article ids:', uniqueArticleIds.size);
console.log('Learn URLs in sitemap:', sitemapLearn.size);
console.log('\nDuplicate ids (same id string appears more than once — only first wins in .find()):');
console.log(duplicateIds.sort().join('\n') || '(none)');
console.log('\nSitemap learn slugs with NO matching article id (404 risk):');
console.log(inSitemapNotInArticles.sort().join('\n') || '(none)');
console.log('\nArticle ids NOT in sitemap (orphan from crawler discovery via sitemap):');
console.log(inArticlesNotInSitemap.sort().join('\n') || '(none)');
