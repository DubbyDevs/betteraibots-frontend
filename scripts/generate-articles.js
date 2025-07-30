const fs = require('fs');
const path = require('path');

// News articles data
const newsArticles = [
  {
    slug: "trump-ai-action-plan-global-leadership",
    title: "Trump's AI Action Plan: A New Era of Global Leadership",
    excerpt: "Former President Trump unveils comprehensive artificial intelligence strategy, positioning America as the global leader in AI development and regulation.",
    image: "https://betteraibots.com/trumpaiplan.png?v=2",
    date: "2025-07-28",
    author: "BetterAiBots",
    category: "AI Policy",
    content: `
      <p>Former President Trump has unveiled a comprehensive artificial intelligence strategy that positions America as the global leader in AI development and regulation. The plan, announced today, outlines a bold vision for maintaining American technological supremacy in the rapidly evolving AI landscape.</p>
      
      <p>The strategy focuses on three key pillars: innovation acceleration, responsible development, and international leadership. Trump emphasized the need for America to lead rather than follow in the AI revolution, calling it "the most important technological advancement of our time."</p>
      
      <p>"We cannot afford to let other nations dictate the future of AI," Trump stated during the announcement. "America must be at the forefront of this revolution, ensuring that our values and principles guide the development of these powerful technologies."</p>
      
      <p>The plan includes significant funding for AI research and development, streamlined regulatory frameworks, and international partnerships to establish global AI standards. Industry leaders have praised the comprehensive approach, noting its potential to accelerate innovation while maintaining safety and ethical considerations.</p>
    `
  },
  {
    slug: "china-global-ai-cooperation-organization",
    title: "China Launches Global AI Cooperation Organization",
    excerpt: "Beijing establishes new international body to coordinate AI development standards and foster collaboration between nations.",
    image: "https://betteraibots.com/chinaaiplans.png?v=2",
    date: "2025-07-25",
    author: "BetterAiBots",
    category: "AI Policy",
    content: `
      <p>China has announced the establishment of a new Global AI Cooperation Organization, marking a significant step in international AI governance. The organization aims to coordinate AI development standards and foster collaboration between nations in the rapidly evolving artificial intelligence landscape.</p>
      
      <p>The initiative, led by Beijing, brings together representatives from over 50 countries to establish common frameworks for AI development, safety protocols, and ethical guidelines. The organization will serve as a platform for sharing research, coordinating regulatory approaches, and addressing global AI challenges.</p>
      
      <p>"This represents a new era of international cooperation in AI development," stated the organization's founding director. "By working together, we can ensure that AI benefits all of humanity while addressing the complex challenges it presents."</p>
      
      <p>The organization will focus on areas including AI safety research, ethical development guidelines, and the establishment of international standards for AI systems. Experts believe this could significantly influence the future direction of global AI policy and development.</p>
    `
  },
  {
    slug: "openai-gpt5-revolutionary-multimodal-ai",
    title: "OpenAI Unveils GPT-5: Revolutionary Multimodal AI Model",
    excerpt: "The latest iteration promises unprecedented capabilities in understanding and generating text, images, and video simultaneously.",
    image: "https://betteraibots.com/openaigpt5announced.jpg?v=2",
    date: "2025-07-28",
    author: "BetterAiBots",
    category: "AI Development",
    content: `
      <p>OpenAI has officially unveiled GPT-5, marking a revolutionary leap forward in artificial intelligence capabilities. The new model represents a significant advancement in multimodal AI, capable of understanding and generating text, images, and video simultaneously with unprecedented accuracy and coherence.</p>
      
      <p>"GPT-5 represents our most sophisticated AI model to date," said OpenAI CEO Sam Altman. "The model's ability to seamlessly work across multiple modalities opens up entirely new possibilities for human-AI interaction and creative collaboration."</p>
      
      <p>The new model demonstrates remarkable improvements in reasoning, creativity, and contextual understanding. Early demonstrations show GPT-5's ability to analyze complex visual information, generate detailed explanations, and create coherent multimedia content that maintains consistency across different formats.</p>
      
      <p>Industry experts are calling GPT-5 a "game-changer" that could revolutionize how we interact with AI systems. The model's enhanced capabilities are expected to accelerate innovation across numerous fields, from content creation to scientific research.</p>
    `
  },
  {
    slug: "google-gemini-pro-100-million-users",
    title: "Google's Gemini Pro Surpasses 100 Million Users in Record Time",
    excerpt: "AI assistant achieves unprecedented adoption rate, outpacing all previous artificial intelligence products.",
    image: "https://betteraibots.com/googlegemininews.jpg?v=2",
    date: "2025-07-25",
    author: "BetterAiBots",
    category: "AI Adoption",
    content: `
      <p>Google's Gemini Pro has achieved a historic milestone, reaching 100 million users faster than any AI product in history. This unprecedented adoption rate demonstrates the rapidly accelerating public embrace of AI technology and positions Google as a formidable competitor in the AI assistant market.</p>
      
      <p>The milestone represents more than just impressive numbers—it signals a fundamental shift in how consumers interact with artificial intelligence. While previous AI products took months or even years to build substantial user bases, Gemini Pro's meteoric rise demonstrates the growing mainstream appetite for sophisticated AI capabilities.</p>
      
      <p>"This unprecedented adoption rate shows that AI has moved from being a novelty to an essential tool for millions of people," said technology analyst Sarah Chen from Digital Trends Research. "Google has clearly struck the right balance between capability and accessibility."</p>
      
      <p>Gemini Pro's rapid success can be attributed to several key factors: seamless integration with Google's ecosystem, advanced multimodal capabilities, and sophisticated reasoning abilities that enable it to handle complex queries and professional workflows with remarkable efficiency.</p>
    `
  },
  {
    slug: "meta-llama-3-open-source-ai",
    title: "Meta's Llama 3 is Changing the Game for Open-Source AI",
    excerpt: "The tech giant's latest model is winning over developers with its impressive capabilities and free accessibility.",
    image: "https://betteraibots.com/llama3news.jpg?v=2",
    date: "2025-06-02",
    author: "BetterAiBots",
    category: "AI Development",
    content: `
      <p>Meta has just dropped something that's got the AI community buzzing: Llama 3, their newest open-source artificial intelligence model that's already proving to be a game-changer. What makes this release particularly exciting isn't just that it's free for developers to use—it's that the model is genuinely outperforming expectations across the board.</p>
      
      <p>The numbers tell the story: thousands of developers have already started building with Llama 3 since its release, and it's easy to see why. The model represents a significant leap forward from its predecessor, bringing substantial improvements in areas that matter most to real-world applications.</p>
      
      <p>Perhaps most notably, Llama 3 has dramatically improved its reasoning abilities. Where earlier models might struggle with complex problem-solving tasks, this latest version demonstrates a more sophisticated understanding of nuanced questions and multi-step reasoning challenges.</p>
      
      <p>One of Llama 3's standout features is its expanded multilingual support, now covering more than 50 languages with impressive fluency. This isn't just about translation—the model demonstrates genuine understanding of cultural context and linguistic nuances across different languages.</p>
    `
  },
  {
    slug: "microsoft-copilot-pro-productivity",
    title: "Microsoft Copilot Pro is Transforming the Daily Grind",
    excerpt: "How AI integration in Office apps is saving workers hours every day—and changing the way we think about productivity.",
    image: "https://betteraibots.com/mocrosoftcopilotaifreebots.jpg?v=2",
    date: "2025-04-20",
    author: "BetterAiBots",
    category: "AI Productivity",
    content: `
      <p>Remember when spell-check felt revolutionary? Microsoft is betting that Copilot Pro will be the next workplace transformation that makes us wonder how we ever got by without it. This isn't just another AI tool—it's a complete reimagining of how artificial intelligence can seamlessly blend into the software millions of people use every single day.</p>
      
      <p>Copilot Pro doesn't replace your familiar Office applications; instead, it makes them dramatically smarter. Imagine having a tireless, highly skilled assistant sitting right inside Word, Excel, PowerPoint, and Outlook—one that never gets coffee breaks and actually enjoys analyzing spreadsheets at 2 AM.</p>
      
      <p>The integration feels natural rather than bolted-on, which is crucial for adoption. Users aren't learning an entirely new system; they're discovering that their existing tools have suddenly become far more capable. It's the difference between getting a completely new car and discovering your current car has been secretly upgraded with autopilot features overnight.</p>
      
      <p>Early users are reporting productivity improvements that sound almost too good to be true—until you experience them firsthand. Some organizations are seeing 40% improvements in daily workflow efficiency, but the real impact goes beyond time savings. Workers report feeling less stressed about routine tasks and more able to focus on creative and strategic thinking.</p>
    `
  },
  {
    slug: "anthropic-claude-35-sonnet-reasoning",
    title: "Anthropic's Claude 3.5 Sonnet Raises the Bar for AI Reasoning",
    excerpt: "Latest model demonstrates unprecedented logical thinking and problem-solving capabilities across complex scenarios.",
    image: "https://betteraibots.com/claudecode.png?v=2",
    date: "2025-06-30",
    author: "BetterAiBots",
    category: "AI Development",
    content: `
      <p>Anthropic has released Claude 3.5 Sonnet, their latest AI model that demonstrates unprecedented logical thinking and problem-solving capabilities across complex scenarios. The new model represents a significant advancement in AI reasoning, setting new benchmarks for analytical thinking and cognitive performance.</p>
      
      <p>"Claude 3.5 Sonnet represents a fundamental breakthrough in AI reasoning capabilities," said Anthropic CEO Dario Amodei. "The model's ability to think through complex problems step-by-step, consider multiple perspectives, and arrive at well-reasoned conclusions represents a major step forward in artificial intelligence."</p>
      
      <p>The model excels in areas requiring deep analytical thinking, including mathematical reasoning, scientific analysis, and complex decision-making scenarios. Early testing shows Claude 3.5 Sonnet outperforming previous models by significant margins in standardized reasoning tests and real-world problem-solving tasks.</p>
      
      <p>Industry experts are particularly impressed by the model's ability to explain its reasoning process clearly, making it valuable for educational applications and professional use cases where transparency is crucial. The model's enhanced reasoning capabilities are expected to accelerate research and development across numerous fields.</p>
    `
  }
];

function generateArticleHTML(article) {
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
    
    <style>
      body { 
        font-family: 'Poppins', Arial, sans-serif; 
        margin: 0; 
        padding: 0;
        background: #101c26; 
        color: white; 
        line-height: 1.6;
      }
      .container { 
        max-width: 800px; 
        margin: 0 auto; 
        padding: 20px;
      }
      .article-header {
        text-align: center;
        margin-bottom: 40px;
      }
      .article-image { 
        width: 100%; 
        max-width: 600px; 
        height: auto; 
        margin: 20px 0; 
        border-radius: 8px;
      }
      .article-title { 
        font-size: 2.5em; 
        margin-bottom: 10px; 
        background: linear-gradient(45deg, #00ff88, #00ccff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .article-meta { 
        color: #888; 
        margin-bottom: 20px; 
        font-size: 1.1em;
      }
      .article-excerpt { 
        font-size: 1.3em; 
        line-height: 1.6; 
        color: #ccc;
        font-style: italic;
        margin-bottom: 30px;
      }
      .article-content {
        font-size: 1.1em;
        line-height: 1.8;
      }
      .article-content p {
        margin-bottom: 20px;
      }
      .back-link {
        display: inline-block;
        margin-top: 40px;
        padding: 12px 24px;
        background: linear-gradient(45deg, #00ff88, #00ccff);
        color: #101c26;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        transition: transform 0.2s;
      }
      .back-link:hover {
        transform: translateY(-2px);
      }
      .category-badge {
        display: inline-block;
        background: linear-gradient(45deg, #ff6b6b, #ffa500);
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.9em;
        margin-right: 10px;
      }
    </style>
</head>
<body>
    <div class="container">
        <div class="article-header">
            <span class="category-badge">${article.category}</span>
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                By ${article.author} • ${article.date}
            </div>
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <p class="article-excerpt">${article.excerpt}</p>
        </div>
        
        <div class="article-content">
            ${article.content}
        </div>
        
        <a href="https://betteraibots.com" class="back-link">← Back to BetterAiBots</a>
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
  const htmlContent = generateArticleHTML(article);
  const filePath = path.join(newsDir, `${article.slug}.html`);
  fs.writeFileSync(filePath, htmlContent);
  console.log(`Generated: ${article.slug}.html`);
});

console.log('✅ All static article files generated successfully!');
console.log('📝 These are complete HTML pages with proper meta tags');
console.log('🌐 Social media crawlers will see the correct images'); 