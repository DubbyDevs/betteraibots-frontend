const fs = require('fs');
const path = require('path');

/**
 * Extracts article metadata from Articles.js
 * This creates a JSON file that the prerender script can use
 */

const articlesPath = path.join(__dirname, '..', 'src', 'Articles.js');

if (!fs.existsSync(articlesPath)) {
  console.error('❌ Articles.js not found at:', articlesPath);
  process.exit(1);
}

const content = fs.readFileSync(articlesPath, 'utf8');

// Find the start of the articles array
const articlesArrayStart = content.indexOf('export const articles = [');
if (articlesArrayStart === -1) {
  console.error('❌ Could not find "export const articles = [" in Articles.js');
  process.exit(1);
}

// Extract article objects using a more robust regex
// Pattern: { id: "value", title: "value", date: "value", cover: ..., preview: "value", ... }
function extractArticles() {
  const articles = [];
  
  // Match article objects - handle multiline and escaped quotes
  // This regex looks for the article object structure
  const articleBlockRegex = /{\s*id:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.|\\n)*?)",\s*date:\s*"([^"]+)",\s*cover:[^,]+,\s*preview:\s*"((?:[^"\\]|\\.|\\n)*?)"/gs;
  
  let match;
  while ((match = articleBlockRegex.exec(content)) !== null) {
    const id = match[1];
    let title = match[2].replace(/\\"/g, '"').replace(/\\n/g, ' ').trim();
    const date = match[3];
    let preview = match[4].replace(/\\"/g, '"').replace(/\\n/g, ' ').trim();
    
    // Clean up the strings
    title = title.replace(/\s+/g, ' ');
    preview = preview.replace(/\s+/g, ' ').substring(0, 300); // Limit preview length
    
    articles.push({
      id,
      title,
      date,
      preview,
      cover: null // Will be determined by ogImageMap in prerender script
    });
  }
  
  return articles;
}

const articles = extractArticles();

if (articles.length === 0) {
  console.warn('⚠️  No articles extracted. The regex pattern may need adjustment.');
  console.log('💡 Make sure your Articles.js follows the pattern:');
  console.log('   { id: "...", title: "...", date: "...", cover: ..., preview: "..." }');
  // Don't fail the build - just create empty array
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const outputPath = path.join(publicDir, 'articles-metadata.json');
  fs.writeFileSync(outputPath, JSON.stringify([], null, 2), 'utf8');
  console.log('✅ Created empty articles-metadata.json');
  process.exit(0);
} else {
  // Deduplicate by article ID (keep first occurrence)
  const uniqueArticlesMap = new Map();
  const duplicates = [];
  
  articles.forEach(article => {
    if (uniqueArticlesMap.has(article.id)) {
      duplicates.push(article.id);
    } else {
      uniqueArticlesMap.set(article.id, article);
    }
  });
  
  const uniqueArticles = Array.from(uniqueArticlesMap.values());
  
  if (duplicates.length > 0) {
    console.log(`⚠️  Found ${duplicates.length} duplicate article(s): ${[...new Set(duplicates)].join(', ')}`);
    console.log(`📊 Extracted ${articles.length} total matches, ${uniqueArticles.length} unique articles`);
  }
  
  // Ensure public directory exists
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write to JSON file
  const outputPath = path.join(publicDir, 'articles-metadata.json');
  fs.writeFileSync(outputPath, JSON.stringify(uniqueArticles, null, 2), 'utf8');
  console.log(`✅ Extracted ${uniqueArticles.length} unique articles to ${outputPath}`);
  console.log(`📝 First article: ${uniqueArticles[0].id} - ${uniqueArticles[0].title.substring(0, 50)}...`);
  console.log(`📝 Last article: ${uniqueArticles[uniqueArticles.length - 1].id} - ${uniqueArticles[uniqueArticles.length - 1].title.substring(0, 50)}...`);
}
