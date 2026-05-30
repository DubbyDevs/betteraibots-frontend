const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
const newsText = fs.readFileSync(path.join(root, 'src/data/news.js'), 'utf8');
const articlesText = fs.readFileSync(path.join(root, 'src/Articles.js'), 'utf8');

const slugRe = /slug:\s*["']([^"']+)["']/g;
const newsSlugs = new Set();
let m;
while ((m = slugRe.exec(newsText)) !== null) newsSlugs.add(m[1]);

const newsInSitemap = new Set();
const newsLocRe = /<loc>https:\/\/betteraibots\.com\/news\/([^<]+)<\/loc>/g;
while ((m = newsLocRe.exec(sitemap)) !== null) newsInSitemap.add(m[1]);

const articleIdRe = /\bid:\s*"([^"]+)"/g;
const articleIds = new Set();
while ((m = articleIdRe.exec(articlesText)) !== null) articleIds.add(m[1]);

const learnInSitemap = new Set();
const learnLocRe = /<loc>https:\/\/betteraibots\.com\/learn\/([^<]+)<\/loc>/g;
while ((m = learnLocRe.exec(sitemap)) !== null) learnInSitemap.add(m[1]);

const allLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]);
const staticPaths = new Set(allLocs.filter((u) => !u.includes('/news/') && !u.includes('/learn/')));

const expectedStatic = [
  'https://betteraibots.com/',
  'https://betteraibots.com/news',
  'https://betteraibots.com/learn',
  'https://betteraibots.com/learn/beginner',
  'https://betteraibots.com/learn/intermediate',
  'https://betteraibots.com/learn/advanced',
  'https://betteraibots.com/apps',
  'https://betteraibots.com/my-ai',
  'https://betteraibots.com/about',
  'https://betteraibots.com/contact',
  'https://betteraibots.com/Podcast',
  'https://betteraibots.com/beginner-quiz',
  'https://betteraibots.com/intermediate-quiz',
  'https://betteraibots.com/advanced-quiz',
  'https://betteraibots.com/legal',
  'https://betteraibots.com/privacy',
];

console.log('=== SITEMAP AUDIT ===');
console.log('Total URLs in sitemap:', allLocs.length);
console.log('News in codebase:', newsSlugs.size);
console.log('News in sitemap:', newsInSitemap.size);
console.log('Learn articles in codebase:', articleIds.size);
console.log('Learn URLs in sitemap:', learnInSitemap.size);

const newsMissing = [...newsSlugs].filter((s) => !newsInSitemap.has(s));
const newsExtra = [...newsInSitemap].filter((s) => !newsSlugs.has(s));
const articlesMissing = [...articleIds].filter((id) => !learnInSitemap.has(id));
const articlesExtra = [...learnInSitemap].filter(
  (id) => !articleIds.has(id) && !['beginner', 'intermediate', 'advanced'].includes(id)
);

console.log('\nNews NOT in sitemap (' + newsMissing.length + '):');
console.log(newsMissing.sort().join('\n') || '(none)');
console.log('\nNews in sitemap but NOT in codebase (' + newsExtra.length + '):');
console.log(newsExtra.sort().join('\n') || '(none)');
console.log('\nLearn articles NOT in sitemap (' + articlesMissing.length + '):');
console.log(articlesMissing.sort().join('\n') || '(none)');
console.log('\nLearn sitemap slugs with no article (' + articlesExtra.length + '):');
console.log(articlesExtra.sort().join('\n') || '(none)');

const staticMissing = expectedStatic.filter((u) => !staticPaths.has(u));
console.log('\nExpected static pages missing from sitemap (' + staticMissing.length + '):');
console.log(staticMissing.join('\n') || '(none)');

const upToDate =
  newsMissing.length === 0 &&
  newsExtra.length === 0 &&
  articlesMissing.length === 0 &&
  articlesExtra.length === 0 &&
  staticMissing.length === 0;

console.log('\n=== VERDICT ===');
console.log(upToDate ? 'Sitemap is fully up to date.' : 'Sitemap is NOT fully up to date.');
