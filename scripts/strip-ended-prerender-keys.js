const fs = require('fs');
const path = require('path');

const ids = [
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

function stripObjectKeys(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let removed = 0;
  for (const id of ids) {
    const re = new RegExp(`\\s*"${id}"\\s*:\\s*(?:"[^"]*"|'[^']*'|[^,\\n]+),?\\n?`, 'g');
    content = content.replace(re, () => {
      removed += 1;
      return '';
    });
  }
  // warmy multiline title in build-article-seo-data.js
  content = content.replace(
    /\s*"warmy-io-spam-folder-rebellion-email-deliverability"\s*:\s*\n\s*[^\n]+(?:\n\s*[^\n:]+)?,?/g,
    () => {
      removed += 1;
      return '';
    }
  );
  content = content.replace(/,(\s*})/g, '$1');
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)}: removed ${removed} keys`);
}

stripObjectKeys(path.join(__dirname, 'prerender-learn-articles.js'));
stripObjectKeys(path.join(__dirname, 'build-article-seo-data.js'));
