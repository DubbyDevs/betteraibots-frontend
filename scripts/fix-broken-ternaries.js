/**
 * Remove broken `article.id === ? (` branches left after ended-program cleanup.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'ArticlePage.js');
let content = fs.readFileSync(filePath, 'utf8');

const marker = ') : article.id === ? (';
let removed = 0;

while (content.includes(marker)) {
  const start = content.indexOf(marker);
  // Find the matching closing of this ternary arm: next `) : article.id ===` or final `) : (` / `) : <`
  // Structure is: ) : article.id === ? ( <jsx> )
  // We need to remove from marker through the closing `)` before the next ` : `
  let i = start + marker.length;
  let depth = 1; // already inside the opening `(` of the broken branch
  let inJsxString = null;

  while (i < content.length && depth > 0) {
    const ch = content[i];
    // naive string skip for "..." and '...'
    if ((ch === '"' || ch === "'") && content[i - 1] !== '\\') {
      if (inJsxString === ch) inJsxString = null;
      else if (!inJsxString) inJsxString = ch;
      i++;
      continue;
    }
    if (inJsxString) {
      i++;
      continue;
    }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    i++;
  }

  // i now points just after the closing `)` of the broken branch.
  // That closing paren is the end of `( <jsx> )` — keep the following ` : nextBranch`
  // But our marker started with `) : article.id === ? (` so we should remove
  // from the ` : article.id === ? (` part, keeping the preceding `)`.
  // marker = ') : article.id === ? ('
  // Better: remove from ' : article.id === ? (' through end of branch's closing ')'
  const removeFrom = start; // includes leading `)` of previous branch end... wait

  // Actually marker starts with `) :` where `)` closes previous JSX group.
  // We must KEEP that `)` and only remove ` : article.id === ? ( ... )`
  const keepParen = start; // position of `)`
  const removeStart = start + 1; // start at ` : article.id === ? (`
  const removeEnd = i; // after closing `)` of broken branch

  content = content.slice(0, removeStart) + content.slice(removeEnd);
  removed++;
}

fs.writeFileSync(filePath, content);
console.log(`Removed ${removed} broken article.id branches from ArticlePage.js`);
