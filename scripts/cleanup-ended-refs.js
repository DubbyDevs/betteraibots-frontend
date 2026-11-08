/**
 * Finish cleanup after ended-program removal: unused imports, inactive paths,
 * news article, ArticlePage links, ticker, sitemap regeneration inputs.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const ENDED_PATHS = [
  '/learn/alli-ai',
  '/learn/creativescore',
  '/learn/hume-ai',
  '/learn/blackbox-ai',
  '/learn/flowith-io',
  '/learn/laxis',
  '/learn/webydo',
  '/learn/travel-code-ai-complete-guide',
  '/learn/recomaze',
  '/learn/bebop-ai',
  '/learn/catalister',
  '/learn/treble-ai',
  '/learn/pipes-ai',
  '/learn/warmy-io-spam-folder-rebellion-email-deliverability',
  '/news/warmy-io-spam-folder-rebellion-email-deliverability',
];

const UNUSED_IMPORT_RE = [
  /import blackboxai from ['"][^'"]+['"];?\n/,
  /import blackboxai2 from ['"][^'"]+['"];?\n/,
  /import laxisai from ['"][^'"]+['"];?\n/,
  /import laxisai2 from ['"][^'"]+['"];?\n/,
  /import creativescoreai from ['"][^'"]+['"];?\n/,
  /import creativescoreai2 from ['"][^'"]+['"];?\n/,
  /import warmyicon from ['"][^'"]+['"];?\n/,
  /import recomaze1 from ['"][^'"]+['"];?\n/,
  /import recomaze2 from ['"][^'"]+['"];?\n/,
  /import humeai from ['"][^'"]+['"];?\n/,
  /import webydoai from ['"][^'"]+['"];?\n/,
  /import catalisterai from ['"][^'"]+['"];?\n/,
  /import bebopai from ['"][^'"]+['"];?\n/,
  /import bebop2 from ['"][^'"]+['"];?\n/,
  /import flowith2 from ['"][^'"]+['"];?\n/,
];

function stripUnusedImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let removed = 0;
  for (const re of UNUSED_IMPORT_RE) {
    const next = content.replace(re, () => {
      removed++;
      return '';
    });
    content = next;
  }
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: stripped ${removed} unused imports`);
}

function expandInactivePaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const marker = 'const INACTIVE_APP_PATHS = new Set([';
  const start = content.indexOf(marker);
  if (start === -1) {
    console.log(`${path.basename(filePath)}: no INACTIVE_APP_PATHS`);
    return;
  }
  const end = content.indexOf(']);', start);
  const existingBlock = content.slice(start, end + 3);
  const existing = new Set(
    [...existingBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1])
  );
  for (const p of ENDED_PATHS) existing.add(p);
  const sorted = [...existing].sort();
  const replacement = `const INACTIVE_APP_PATHS = new Set([\n${sorted
    .map((p) => `  "${p}"`)
    .join(',\n')}\n]);`;
  content = content.slice(0, start) + replacement + content.slice(end + 3);
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: INACTIVE_APP_PATHS now ${sorted.length} entries`);
}

function removeNewsBySlug(filePath, slug) {
  let content = fs.readFileSync(filePath, 'utf8');
  const idPattern = `slug: "${slug}"`;
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) {
    console.log(`news: slug ${slug} not found`);
    return;
  }
  let start = idIdx;
  while (start > 0 && content[start] !== '{') start--;
  let depth = 0;
  let end = start;
  let inTemplate = false;
  for (let i = start; i < content.length; i++) {
    const ch = content[i];
    const prev = content[i - 1];
    if (ch === '`' && prev !== '\\') {
      inTemplate = !inTemplate;
      continue;
    }
    if (inTemplate) continue;
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  let removeFrom = start;
  let removeTo = end;
  let c = start - 1;
  while (c >= 0 && /\s/.test(content[c])) c--;
  if (content[c] === ',') removeFrom = c;
  else {
    c = end;
    while (c < content.length && /\s/.test(content[c])) c++;
    if (content[c] === ',') removeTo = c + 1;
  }
  content = content.slice(0, removeFrom) + content.slice(removeTo);
  fs.writeFileSync(filePath, content);
  console.log(`Removed news slug ${slug}`);
}

function stripAffiliateKeys(filePath, keys) {
  let content = fs.readFileSync(filePath, 'utf8');
  let removed = 0;
  for (const key of keys) {
    const re = new RegExp(`\\s*"${key}"\\s*:\\s*"[^"]*",?\\n?`, 'g');
    content = content.replace(re, () => {
      removed++;
      return '';
    });
  }
  content = content.replace(/,(\s*})/g, '$1');
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: stripped ${removed} affiliate/map keys`);
}

function stripArrayStrings(filePath, values) {
  let content = fs.readFileSync(filePath, 'utf8');
  let removed = 0;
  for (const v of values) {
    const re = new RegExp(`\\s*['"]${v}['"],?\\n?`, 'g');
    content = content.replace(re, () => {
      removed++;
      return '';
    });
  }
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: stripped ${removed} string refs`);
}

function deleteIfExists(rel) {
  const p = path.join(root, rel);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`Deleted ${rel}`);
  }
}

stripUnusedImports(path.join(root, 'src', 'data', 'appsData.js'));
stripUnusedImports(path.join(root, 'src', 'App.js'));
stripUnusedImports(path.join(root, 'src', 'Articles.js'));

expandInactivePaths(path.join(root, 'src', 'data', 'appsData.js'));
expandInactivePaths(path.join(root, 'src', 'App.js'));

removeNewsBySlug(path.join(root, 'src', 'data', 'news.js'), 'warmy-io-spam-folder-rebellion-email-deliverability');

const articleIds = [
  'alli-ai',
  'creativescore',
  'hume-ai',
  'blackbox-ai',
  'flowith-io',
  'laxis',
  'webydo',
  'travel-code-ai-complete-guide',
  'recomaze',
  'bebop-ai',
  'catalister',
  'treble-ai',
  'pipes-ai',
  'warmy-io-spam-folder-rebellion-email-deliverability',
];

stripAffiliateKeys(path.join(root, 'src', 'ArticlePage.js'), articleIds);
stripArrayStrings(path.join(root, 'src', 'ArticlePage.js'), articleIds);
stripArrayStrings(path.join(root, 'src', 'Articles.js'), [
  'warmy-io-spam-folder-rebellion-email-deliverability',
  ...articleIds,
]);

deleteIfExists('public/news/warmy-io-spam-folder-rebellion-email-deliverability.html');

console.log('Cleanup refs done.');
