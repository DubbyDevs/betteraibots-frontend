/**
 * Remove affiliate programs that have ended from app lists, articles, SEO, and prerender HTML.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const APP_NAMES = new Set([
  'Alli AI',
  'CreativeScore',
  'Hume AI',
  'Warmy',
  'Blackbox',
  'Flowith AI',
  'Laxis',
  'Webydo',
  'Travel Code AI',
  'Recomaze',
  'Bebop.ai',
  'Catalister',
  'Treble AI',
]);

const ARTICLE_IDS = new Set([
  'alli-ai',
  'creativescore',
  'hume-ai',
  'warmy-io-spam-folder-rebellion-email-deliverability',
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
]);

const LEARN_HTML = [
  'flowith-io.html',
  'treble-ai.html',
  'warmy-io-spam-folder-rebellion-email-deliverability.html',
];

function extractObjectBlocks(arrayBody) {
  const apps = [];
  let depth = 0;
  let current = '';
  let inObject = false;

  for (let i = 0; i < arrayBody.length; i++) {
    const ch = arrayBody[i];
    if (!inObject) {
      if (ch === '{') {
        inObject = true;
        depth = 1;
        current = '{';
      }
      continue;
    }
    current += ch;
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        apps.push(current.trim());
        current = '';
        inObject = false;
      }
    }
  }
  return apps;
}

function rewriteNamedArray(filePath, exportName, namesToRemove) {
  const content = fs.readFileSync(filePath, 'utf8');
  const startMarker = `export const ${exportName} = [`;
  const altMarker = `const ${exportName} = [`;
  let startIdx = content.indexOf(startMarker);
  let marker = startMarker;
  if (startIdx === -1) {
    startIdx = content.indexOf(altMarker);
    marker = altMarker;
  }
  if (startIdx === -1) {
    console.log(`Skip missing array ${exportName} in ${path.basename(filePath)}`);
    return;
  }
  const endIdx = content.indexOf('\n];', startIdx) + 3;
  const before = content.slice(0, startIdx);
  const after = content.slice(endIdx);
  const arrayBody = content.slice(startIdx + marker.length, endIdx - 3);
  const blocks = extractObjectBlocks(arrayBody);
  const kept = blocks.filter((block) => {
    const match = block.match(/name:\s*"([^"]+)"/);
    return !(match && namesToRemove.has(match[1]));
  });
  const removed = blocks.length - kept.length;
  const newArray = `${marker}\n  ${kept.join(',\n  ')}\n];`;
  fs.writeFileSync(filePath, before + newArray + after);
  console.log(`${path.basename(filePath)} ${exportName}: removed ${removed}, kept ${kept.length}`);
}

function removeArticlesById(filePath, ids) {
  let content = fs.readFileSync(filePath, 'utf8');
  let removed = 0;

  for (const id of ids) {
    const idPattern = `id: "${id}"`;
    const idIdx = content.indexOf(idPattern);
    if (idIdx === -1) continue;

    // Walk backward to start of object `{`
    let start = idIdx;
    while (start > 0 && content[start] !== '{') start--;

    // Include preceding comma/whitespace so we don't leave double commas
    let commaStart = start;
    while (commaStart > 0 && /[\s,]/.test(content[commaStart - 1])) commaStart--;

    // Walk forward to matching closing `}`
    let depth = 0;
    let end = start;
    let inTemplate = false;
    let templateTicks = 0;
    for (let i = start; i < content.length; i++) {
      const ch = content[i];
      const prev = content[i - 1];

      // naive template literal handling for article content fields
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

    // Prefer removing ", { ... }" rather than "{ ... }," when possible
    let removeFrom = start;
    let removeTo = end;
    const beforeSlice = content.slice(Math.max(0, start - 10), start);
    if (/,(\s*)$/.test(beforeSlice) || content[start - 1] === ',') {
      // include the preceding comma
      removeFrom = start - 1;
      while (removeFrom > 0 && /\s/.test(content[removeFrom - 1]) && content[removeFrom - 1] !== '\n') {
        // keep newline structure simple; only eat spaces before comma already handled
        break;
      }
      // actually include comma right before {
      let c = start - 1;
      while (c >= 0 && /\s/.test(content[c])) c--;
      if (content[c] === ',') removeFrom = c;
    } else {
      // include trailing comma if present
      let c = end;
      while (c < content.length && /\s/.test(content[c])) c++;
      if (content[c] === ',') removeTo = c + 1;
    }

    content = content.slice(0, removeFrom) + content.slice(removeTo);
    removed++;
  }

  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: removed ${removed} articles`);
}

function stripSeoKeys(filePath, ids) {
  let content = fs.readFileSync(filePath, 'utf8');
  let removed = 0;
  for (const id of ids) {
    const re = new RegExp(`\\s*"${id}"\\s*:\\s*"[^"]*",?\\n?`, 'g');
    const next = content.replace(re, (m) => {
      removed++;
      return '';
    });
    content = next;
  }
  // clean dangling commas before closing braces
  content = content.replace(/,(\s*})/g, '$1');
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: stripped ${removed} SEO keys`);
}

function stripMetadataEntries(filePath, ids) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const before = data.length;
  const filtered = data.filter((item) => !ids.has(item.id));
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2) + '\n');
  console.log(`${path.basename(filePath)}: removed ${before - filtered.length} metadata entries`);
}

function deleteLearnHtml(names) {
  for (const name of names) {
    const p = path.join(root, 'public', 'learn', name);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`Deleted public/learn/${name}`);
    }
  }
}

// 1) trial apps
rewriteNamedArray(path.join(root, 'src', 'data', 'appsData.js'), 'trialAppsData', APP_NAMES);

// 2) paid apps
rewriteNamedArray(path.join(root, 'src', 'App.js'), 'PAID_APPS', APP_NAMES);

// 3) articles
removeArticlesById(path.join(root, 'src', 'Articles.js'), ARTICLE_IDS);

// 4) SEO maps
stripSeoKeys(path.join(root, 'src', 'data', 'articleSeo.js'), ARTICLE_IDS);

// 5) metadata json
stripMetadataEntries(path.join(root, 'public', 'articles-metadata.json'), ARTICLE_IDS);

// 6) prerender html
deleteLearnHtml(LEARN_HTML);

console.log('Done.');
