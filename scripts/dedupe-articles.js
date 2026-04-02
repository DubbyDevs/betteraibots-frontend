/**
 * Remove duplicate entries in src/Articles.js (same id). Keeps first occurrence per id,
 * except webydo: keeps first object whose body mentions partners.webydo.com and not Blackbox.ai.
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'Articles.js');
let s = fs.readFileSync(file, 'utf8');

const ARTICLE_HEAD = /\n  \{\n    id: "([^"]+)",/g;

const CONTENT_START = 'content: `';
const CONTENT_END_NORMAL = '\n    `\n  },';
const CONTENT_END_LAST = '\n    `\n  }\n];';

function findArticleEnd(str, startIdx) {
  const c = str.indexOf(CONTENT_START, startIdx);
  if (c === -1) throw new Error('No content: ` after index ' + startIdx);
  const pos = c + CONTENT_START.length;
  const iLast = str.indexOf(CONTENT_END_LAST, pos);
  const iNorm = str.indexOf(CONTENT_END_NORMAL, pos);
  if (iLast !== -1 && (iNorm === -1 || iLast < iNorm)) {
    return iLast + '\n    `\n  }\n'.length;
  }
  if (iNorm !== -1) return iNorm + CONTENT_END_NORMAL.length;
  throw new Error('No closing template after index ' + pos);
}

const starts = [];
let m;
while ((m = ARTICLE_HEAD.exec(s)) !== null) {
  starts.push({ index: m.index, id: m[1] });
}

const spans = [];
for (const st of starts) {
  const end = findArticleEnd(s, st.index);
  spans.push({
    index: st.index,
    end,
    id: st.id,
    span: s.slice(st.index, end),
  });
}

const byId = {};
for (const sp of spans) {
  if (!byId[sp.id]) byId[sp.id] = [];
  byId[sp.id].push(sp);
}

const toRemove = [];

for (const [id, arr] of Object.entries(byId)) {
  if (arr.length <= 1) continue;

  let keep;
  if (id === 'webydo') {
    keep = arr.find(
      (sp) =>
        sp.span.includes('[Webydo](https://partners.webydo.com') &&
        !sp.span.includes('Blackbox.ai')
    );
    if (!keep) keep = arr[0];
  } else {
    keep = arr[0];
  }

  for (const sp of arr) {
    if (sp !== keep) toRemove.push([sp.index, sp.end]);
  }
}

toRemove.sort((a, b) => b[0] - a[0]);

for (let [start, end] of toRemove) {
  if (start >= 1 && s[start - 1] === ',') start -= 1;
  s = s.slice(0, start) + s.slice(end);
}

// Sequential removals can leave `}\n  {` / `}{` without a comma between array elements.
const newsTicker = '// --- News Ticker Banner ---';
const nt = s.indexOf(newsTicker);
if (nt !== -1) {
  const head = s.slice(0, nt);
  const tail = s.slice(nt);
  const fixedHead = head.replace(/(\n    `\n  )\}(?!,)(\s*)\{/g, '$1},$2{');
  s = fixedHead + tail;
}

fs.writeFileSync(file, s);
const removedCounts = {};
for (const [id, arr] of Object.entries(byId)) {
  if (arr.length > 1) removedCounts[id] = arr.length - 1;
}
console.log('Removed', toRemove.length, 'duplicate article object(s).');
console.log('Per-id:', removedCounts);
