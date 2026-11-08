/**
 * Remove Nanoz.fun from app lists, articles, SEO, and related references.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ARTICLE_ID = 'nanoz-complete-guide';
const APP_NAME = 'Nanoz.fun';

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
  if (startIdx === -1) return false;

  // Find matching end of THIS array by brace depth from the opening [
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx + marker.length - 1; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        // include trailing ];
        endIdx = i + 1;
        if (content[endIdx] === ';') endIdx++;
        break;
      }
    }
  }
  if (endIdx === -1) throw new Error(`Could not find end of ${exportName}`);

  const before = content.slice(0, startIdx);
  const after = content.slice(endIdx);
  const arrayBody = content.slice(startIdx + marker.length, endIdx - (content[endIdx - 1] === ';' ? 2 : 1));
  const blocks = extractObjectBlocks(arrayBody);
  const kept = blocks.filter((block) => {
    const match = block.match(/name:\s*"([^"]+)"/);
    return !(match && namesToRemove.has(match[1]));
  });
  const newArray = `${marker}\n  ${kept.join(',\n  ')}\n];`;
  fs.writeFileSync(filePath, before + newArray + after);
  console.log(`${path.basename(filePath)} ${exportName}: removed ${blocks.length - kept.length}, kept ${kept.length}`);
  return true;
}

function removeArticleById(filePath, id) {
  let content = fs.readFileSync(filePath, 'utf8');
  const idPattern = `id: "${id}"`;
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) {
    console.log(`${path.basename(filePath)}: article ${id} not found`);
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
  console.log(`${path.basename(filePath)}: removed article ${id}`);
}

function stripKey(filePath, id) {
  let content = fs.readFileSync(filePath, 'utf8');
  const before = content.length;
  content = content.replace(new RegExp(`\\s*"${id}"\\s*:\\s*"[^"]*",?\\n?`, 'g'), '');
  content = content.replace(/,(\s*})/g, '$1');
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: stripped keys (${before - content.length} chars)`);
}

function stripMetadata(filePath, id) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const filtered = data.filter((item) => item.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2) + '\n');
  console.log(`${path.basename(filePath)}: removed ${data.length - filtered.length} entries`);
}

function addInactivePath(filePath, p) {
  let content = fs.readFileSync(filePath, 'utf8');
  const marker = 'const INACTIVE_APP_PATHS = new Set([';
  const start = content.indexOf(marker);
  if (start === -1) return;
  const end = content.indexOf(']);', start);
  const block = content.slice(start, end + 3);
  if (block.includes(`"${p}"`)) return;
  const insertion = content.slice(0, end) + `  "${p}",\n` + content.slice(end);
  fs.writeFileSync(filePath, insertion);
  console.log(`${path.basename(filePath)}: added inactive path ${p}`);
}

function removeTickerEntry(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const re = /\s*\{\s*text:\s*"[^"]*Nanoz\.fun[^"]*",\s*link:\s*"[^"]+"\s*\},?/g;
  const next = content.replace(re, '');
  if (next !== content) {
    fs.writeFileSync(filePath, next);
    console.log(`${path.basename(filePath)}: removed Nanoz ticker entry`);
  }
}

function removeImport(filePath, name) {
  let content = fs.readFileSync(filePath, 'utf8');
  const re = new RegExp(`import ${name} from ['"][^'"]+['"];?\\n?`, 'g');
  const next = content.replace(re, '');
  if (next !== content) {
    fs.writeFileSync(filePath, next);
    console.log(`${path.basename(filePath)}: removed import ${name}`);
  }
}

function removeArticlePageBranch(filePath, id) {
  let content = fs.readFileSync(filePath, 'utf8');
  const marker = `) : article.id === "${id}" ? (`;
  const start = content.indexOf(marker);
  if (start === -1) {
    console.log(`${path.basename(filePath)}: no image branch for ${id}`);
    return;
  }
  let i = start + marker.length;
  let depth = 1;
  let inString = null;
  while (i < content.length && depth > 0) {
    const ch = content[i];
    if ((ch === '"' || ch === "'") && content[i - 1] !== '\\') {
      if (inString === ch) inString = null;
      else if (!inString) inString = ch;
      i++;
      continue;
    }
    if (inString) {
      i++;
      continue;
    }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    i++;
  }
  // keep preceding `)`, remove ` : article.id === "..." ? ( ... )`
  content = content.slice(0, start + 1) + content.slice(i);
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: removed image branch for ${id}`);
}

function stripArticlePageRefs(filePath, id) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(new RegExp(`\\s*"${id}"\\s*:\\s*"[^"]*",?\\n?`, 'g'), '');
  content = content.replace(new RegExp(`\\s*['"]${id}['"],?\\n?`, 'g'), '');
  content = content.replace(/\s*\|\|\s*href\.includes\('nanoz\.fun'\)/g, '');
  content = content.replace(/href\.includes\('nanoz\.fun'\)\s*\|\|\s*/g, '');
  content = content.replace(/,(\s*})/g, '$1');
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: stripped nanoz refs`);
}

// 1) trial apps
rewriteNamedArray(path.join(root, 'src', 'data', 'appsData.js'), 'trialAppsData', new Set([APP_NAME]));
removeImport(path.join(root, 'src', 'data', 'appsData.js'), 'nanozlogo');

// 2) article
removeArticleById(path.join(root, 'src', 'Articles.js'), ARTICLE_ID);
removeImport(path.join(root, 'src', 'Articles.js'), 'nanozlogo');
removeImport(path.join(root, 'src', 'Articles.js'), 'nanozfun');
removeTickerEntry(path.join(root, 'src', 'Articles.js'));

// 3) ArticlePage
removeArticlePageBranch(path.join(root, 'src', 'ArticlePage.js'), ARTICLE_ID);
stripArticlePageRefs(path.join(root, 'src', 'ArticlePage.js'), ARTICLE_ID);

// 4) SEO / metadata
stripKey(path.join(root, 'src', 'data', 'articleSeo.js'), ARTICLE_ID);
stripMetadata(path.join(root, 'public', 'articles-metadata.json'), ARTICLE_ID);

// 5) prerender map
stripKey(path.join(root, 'scripts', 'prerender-learn-articles.js'), ARTICLE_ID);

// 6) inactive paths
addInactivePath(path.join(root, 'src', 'data', 'appsData.js'), `/learn/${ARTICLE_ID}`);
addInactivePath(path.join(root, 'src', 'App.js'), `/learn/${ARTICLE_ID}`);

// 7) delete prerender html
const htmlPath = path.join(root, 'public', 'learn', 'nanoz-complete-guide.html');
if (fs.existsSync(htmlPath)) {
  fs.unlinkSync(htmlPath);
  console.log('Deleted public/learn/nanoz-complete-guide.html');
}

console.log('Nanoz removal done.');
