const fs = require('fs');
const path = require('path');

// News articles data (matching the React app)
const newsArticles = [
  {
    slug: "n8n-revolution-business-automation-2025",
    title: "The n8n Revolution: How One Platform is Transforming Business",
    excerpt: "n8n users are achieving remarkable results that are reshaping how we think about workflow automation",
    image: "https://betteraibots.com/n8nforb2b.png",
    date: "2025-08-04",
    author: "BetterAiBots",
    category: "AI Development"
  },
  {
    slug: "landmark-legal-victory-ai-copyright-training",
    title: "Landmark Legal Victory: How AI Companies Won the Right to Train on Copyrighted Content",
    excerpt: "Federal court rulings in favor of Anthropic and Meta establish groundbreaking precedent that could reshape the entire AI industry and creative economy",
    image: "https://betteraibots.com/legalwinforai.png",
    date: "2025-08-03",
    author: "BetterAiBots",
    category: "AI Policy"
  },
  {
    slug: "trump-ai-action-plan-global-leadership",
    title: "Trump's AI Action Plan: A New Era of Global Leadership",
    excerpt: "Former President Trump unveils comprehensive artificial intelligence strategy, positioning America as the global leader in AI development and regulation.",
    image: "https://betteraibots.com/trumpaiplan.png?v=2",
    date: "2025-07-28",
    author: "BetterAiBots",
    category: "AI Policy"
  },
  {
    slug: "china-global-ai-cooperation-organization",
    title: "China Launches Global AI Cooperation Organization",
    excerpt: "Beijing establishes new international body to coordinate AI development standards and foster collaboration between nations.",
    image: "https://betteraibots.com/chinaaiplans.png?v=2",
    date: "2025-07-25",
    author: "BetterAiBots",
    category: "AI Policy"
  },
  {
    slug: "openai-gpt5-revolutionary-multimodal-ai",
    title: "OpenAI Unveils GPT-5: Revolutionary Multimodal AI Model",
    excerpt: "The latest iteration promises unprecedented capabilities in understanding and generating text, images, and video simultaneously.",
    image: "https://betteraibots.com/openaigpt5announced.jpg?v=2",
    date: "2025-07-28",
    author: "BetterAiBots",
    category: "AI Development"
  },
  {
    slug: "google-gemini-pro-100-million-users",
    title: "Google's Gemini Pro Surpasses 100 Million Users in Record Time",
    excerpt: "AI assistant achieves unprecedented adoption rate, outpacing all previous artificial intelligence products.",
    image: "https://betteraibots.com/googlegemininews.jpg?v=2",
    date: "2025-07-25",
    author: "BetterAiBots",
    category: "AI Adoption"
  },
  {
    slug: "meta-llama-3-open-source-ai",
    title: "Meta's Llama 3 is Changing the Game for Open-Source AI",
    excerpt: "The tech giant's latest model is winning over developers with its impressive capabilities and free accessibility.",
    image: "https://betteraibots.com/llama3news.jpg?v=2",
    date: "2025-06-02",
    author: "BetterAiBots",
    category: "AI Development"
  },
  {
    slug: "microsoft-copilot-pro-productivity",
    title: "Microsoft Copilot Pro is Transforming the Daily Grind",
    excerpt: "How AI integration in Office apps is saving workers hours every day—and changing the way we think about productivity.",
    image: "https://betteraibots.com/mocrosoftcopilotaifreebots.jpg?v=2",
    date: "2025-04-20",
    author: "BetterAiBots",
    category: "AI Productivity"
  },
  {
    slug: "anthropic-claude-35-sonnet-reasoning",
    title: "Anthropic Unveils Claude 4: A New Era of AI Capability and Safety",
    excerpt: "The latest generation of constitutional AI brings unprecedented reasoning, coding excellence, and enhanced safety features",
    image: "https://betteraibots.com/claudecode.png?v=2",
    date: "2025-06-01",
    author: "BetterAiBots",
    category: "AI Development"
  }
];

function generatePrerenderedHTML(article) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${article.title} | BetterAiBots</title>
    <meta name="description" content="${article.excerpt}">
    
    <!-- Open Graph -->
    <meta property="og:url" content="https://betteraibots.com/news/${article.slug}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.excerpt}">
    <meta property="og:image" content="${article.image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${article.title}">
    <meta name="twitter:description" content="${article.excerpt}">
    <meta name="twitter:image" content="${article.image}">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "${article.title}",
      "description": "${article.excerpt}",
      "image": "${article.image}",
      "author": {
        "@type": "Organization",
        "name": "${article.author}",
        "url": "https://betteraibots.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "BetterAiBots",
        "logo": {
          "@type": "ImageObject",
          "url": "https://betteraibots.com/betteraibotsglowlogo8.png"
        }
      },
      "datePublished": "${article.date}",
      "dateModified": "${article.date}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://betteraibots.com/news/${article.slug}"
      },
      "keywords": "AI, Artificial Intelligence, AI News, BetterAiBots",
      "articleSection": "${article.category}",
      "inLanguage": "en-US"
    }
    </script>
    
    <!-- Redirect to React app for users -->
    <script>
      // Only redirect if this is a user (not a crawler)
      if (!navigator.userAgent.includes('facebookexternalhit') && 
          !navigator.userAgent.includes('Twitterbot') && 
          !navigator.userAgent.includes('LinkedInBot') &&
          !navigator.userAgent.includes('WhatsApp') &&
          !navigator.userAgent.includes('TelegramBot')) {
        window.location.href = 'https://betteraibots.com/news/${article.slug}';
      }
    </script>
    
    <style>
      body { 
        font-family: Arial, sans-serif; 
        margin: 0; 
        padding: 20px; 
        background: #101c26; 
        color: white; 
      }
      .container { 
        max-width: 800px; 
        margin: 0 auto; 
      }
      .article-image { 
        width: 100%; 
        max-width: 600px; 
        height: auto; 
        margin: 20px 0; 
      }
      .article-title { 
        font-size: 2.5em; 
        margin-bottom: 10px; 
      }
      .article-meta { 
        color: #888; 
        margin-bottom: 20px; 
      }
      .article-excerpt { 
        font-size: 1.2em; 
        line-height: 1.6; 
      }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="article-title">${article.title}</h1>
        <div class="article-meta">
            By ${article.author} • ${article.date} • ${article.category}
        </div>
        <img src="${article.image}" alt="${article.title}" class="article-image">
        <p class="article-excerpt">${article.excerpt}</p>
        <p>Read the full article at <a href="https://betteraibots.com/news/${article.slug}" style="color: #00ff88;">BetterAiBots.com</a></p>
    </div>
</body>
</html>`;
}

// Create the news directory if it doesn't exist
const newsDir = path.join(__dirname, '..', 'public', 'news');
if (!fs.existsSync(newsDir)) {
  fs.mkdirSync(newsDir, { recursive: true });
}

// Generate HTML files for each article
newsArticles.forEach(article => {
  const htmlContent = generatePrerenderedHTML(article);
  const filePath = path.join(newsDir, `${article.slug}.html`);
  fs.writeFileSync(filePath, htmlContent);
  console.log(`Generated prerendered HTML: ${article.slug}.html`);
});

console.log('✅ All prerendered article files generated successfully!');
console.log('📝 These files will be served to social media crawlers only');
console.log('👥 Users will be redirected to the React app'); 