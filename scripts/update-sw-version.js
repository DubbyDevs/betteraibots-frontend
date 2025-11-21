const fs = require('fs');
const path = require('path');

// Update the service worker cache version with current timestamp
const swPath = path.join(__dirname, '../public/sw.js');
const swContent = fs.readFileSync(swPath, 'utf8');

// Get current timestamp
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5) + 'Z';
const version = 'v2.0.0';

// Replace the cache version and timestamp
const updatedContent = swContent.replace(
  /const CACHE_VERSION = 'v[\d.]+';\s*const BUILD_TIMESTAMP = '[^']+';/,
  `const CACHE_VERSION = '${version}';\nconst BUILD_TIMESTAMP = '${timestamp}';`
);

fs.writeFileSync(swPath, updatedContent, 'utf8');
console.log(`Service worker cache version updated to ${version} with timestamp ${timestamp}`);















