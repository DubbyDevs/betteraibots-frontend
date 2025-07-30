const fs = require('fs');
const path = require('path');

// News articles data (matching the React app)
const newsArticles = [
  {
    id: 1,
    title: "Trump Unveils America's AI Action Plan: A Bold Strategy for Global AI Leadership",
    excerpt: "A comprehensive roadmap with 90+ policy actions to accelerate AI innovation, build infrastructure, and combat ideological bias in federal AI systems",
    author: "BetterAiBots",
    date: "July 29, 2025",
    category: "AI Policy",
    image: "https://betteraibots.com/trumpaiplan.png",
    featured: true,
    slug: "trump-ai-action-plan-global-leadership"
  },
  {
    id: 2,
    title: "China Proposes Global AI Cooperation Organization to Counter US Tech Strategy",
    excerpt: "China announced plans for a new global AI cooperation organization with headquarters in Shanghai during the World AI Conference on July 26, 2025, marking a strategic response to America's AI Action Plan and positioning itself as a leader in international AI governance.",
    author: "BetterAiBots",
    date: "July 28, 2025",
    category: "AI Policy",
    image: "https://betteraibots.com/chinaaiplans.png",
    featured: false,
    slug: "china-global-ai-cooperation-organization"
  },
  {
    id: 3,
    title: "OpenAI Announces GPT-5: Revolutionary Multimodal AI Model",
    excerpt: "OpenAI has officially unveiled GPT-5, their most advanced AI model yet, featuring unprecedented multimodal capabilities and improved reasoning abilities.",
    author: "BetterAiBots",
    date: "July 27, 2025",
    category: "AI Development",
    image: "https://betteraibots.com/openaigpt5announced.jpg",
    featured: false,
    slug: "openai-gpt5-revolutionary-multimodal-ai"
  },
  {
    id: 4,
    title: "Google's Gemini Pro Surpasses 100 Million Users in Record Time",
    excerpt: "AI assistant achieves unprecedented adoption rate, outpacing all previous artificial intelligence products",
    author: "BetterAiBots",
    date: "July 25, 2025",
    category: "AI Adoption",
    image: "https://betteraibots.com/googlegemininews.jpg",
    featured: false,
    slug: "google-gemini-pro-100-million-users"
  },
  {
    id: 5,
    title: "Meta's Llama 3 is Changing the Game for Open-Source AI",
    excerpt: "The tech giant's latest model is winning over developers with its impressive capabilities and free accessibility",
    author: "BetterAiBots",
    date: "June 2, 2025",
    category: "AI Development",
    image: "https://betteraibots.com/llama3news.jpg",
    featured: false,
    slug: "meta-llama-3-open-source-ai"
  },
  {
    id: 6,
    title: "Microsoft Copilot Pro is Transforming the Daily Grind",
    excerpt: "How AI integration in Office apps is saving workers hours every day—and changing the way we think about productivity",
    author: "BetterAiBots",
    date: "April 20, 2025",
    category: "AI Adoption",
    image: "https://betteraibots.com/mocrosoftcopilotaifreebots.jpg",
    featured: false,
    slug: "microsoft-copilot-pro-productivity"
  },
  {
    id: 7,
    title: "Anthropic's Claude 3.5 Sonnet: When AI Gets Honest About Its Limitations",
    excerpt: "The latest model from Anthropic represents a different approach to AI development—one that prioritizes reliability over confidence",
    author: "BetterAiBots",
    date: "June 30, 2024",
    category: "AI Development",
    image: "https://betteraibots.com/claudecode.png",
    featured: false,
    slug: "anthropic-claude-35-sonnet-reasoning"
  }
];

function generateArticleHTML(article) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <!-- Open Graph Meta Tags -->
    <title>${article.title} – BetterAiBots.com</title>
    <meta name="description" content="${article.excerpt}" />
    
    <meta property="og:url" content="https://betteraibots.com/news/${article.slug}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${article.title}" />
    <meta property="og:description" content="${article.excerpt}" />
    <meta property="og:image" content="${article.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${article.title}" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${article.title}" />
    <meta name="twitter:description" content="${article.excerpt}" />
    <meta name="twitter:image" content="${article.image}" />
    
    <meta name="article:published_time" content="${article.date}" />
    <meta name="article:author" content="${article.author}" />
    <meta name="article:section" content="${article.category}" />
    <meta name="article:tag" content="AI, Artificial Intelligence, AI News, BetterAiBots" />
    
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
    
    <!-- Redirect to React app -->
    <script>
        // Redirect to the React app
        window.location.href = 'https://betteraibots.com/news/${article.slug}';
    </script>
    
    <style>
        body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px; 
            background: #101c26; 
            color: #ffffff; 
        }
        .loading { 
            font-size: 18px; 
            margin-top: 20px; 
        }
        .redirect-link {
            color: #00ff88;
            text-decoration: underline;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>${article.title}</h1>
    <p>${article.excerpt}</p>
    <div class="loading">Loading article...</div>
    <p>If you're not automatically redirected, <a href="https://betteraibots.com/news/${article.slug}" class="redirect-link">click here to view the full article</a></p>
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
  const htmlContent = generateArticleHTML(article);
  const filePath = path.join(newsDir, `${article.slug}.html`);
  
  fs.writeFileSync(filePath, htmlContent);
  console.log(`Generated: ${article.slug}.html`);
});

console.log('✅ All static article files generated successfully!'); 