const fs = require('fs');
const path = require('path');

// News articles data - EXACT MATCH to React app
const newsArticles = [
  {
    slug: "trump-ai-action-plan-global-leadership",
    title: "Trump Unveils America's AI Action Plan: A Bold Strategy for Global AI Leadership",
    excerpt: "A comprehensive roadmap with 90+ policy actions to accelerate AI innovation, build infrastructure, and combat ideological bias in federal AI systems",
    image: "https://betteraibots.com/trumpaiplan.png?v=2",
    date: "July 29, 2025",
    author: "BetterAiBots",
    category: "AI Policy",
    content: `
        <p>The Trump administration has launched a sweeping artificial intelligence strategy designed to cement America's position as the global AI superpower. On July 29, 2025, the White House released "Winning the AI Race: America's AI Action Plan," identifying over 90 Federal policy actions across three pillars – Accelerating Innovation, Building American AI Infrastructure, and Leading in International Diplomacy and Security.</p>
        
        <h3>Key Pillars of America's AI Action Plan</h3>
        
        <h4>Accelerating AI Innovation</h4>
        <p>The plan prioritizes removing regulatory barriers that have historically hindered AI development. The administration will focus on "removing onerous Federal regulations that hinder AI development and deployment, and seek private sector input on rules to remove". This deregulatory approach aims to unleash American innovation in generative AI, machine learning, and other frontier technologies.</p>
        
        <p>A particularly significant aspect involves combating what the administration terms "woke AI." The plan requires AI companies doing business with the federal government to promote "ideological neutrality". Federal procurement guidelines will be updated to ensure that the government only contracts with frontier large language model developers who ensure that their systems are objective and free from top-down ideological bias.</p>
        
        <h4>Building American AI Infrastructure</h4>
        <p>The infrastructure component addresses the massive computational demands of modern AI systems. The plan includes "promoting rapid buildout of data centers" by "expediting and modernizing permits for data centers and semiconductor fabs, as well as creating new national initiatives to increase high-demand occupations like electricians and HVAC technicians".</p>
        
        <p>This infrastructure push recognizes that AI supremacy requires not just algorithmic breakthroughs but also the physical computing power to support them. The emphasis on skilled trades training acknowledges the human capital needed to build and maintain AI infrastructure.</p>
        
        <h4>International Leadership and Security</h4>
        <p>The global dimension of the AI Action Plan focuses on strengthening America's position relative to competitors like China. The Commerce and State Departments will partner with industry to deliver secure, full-stack AI export packages – including hardware, models, software, applications, and standards – to America's friends and allies around the world.</p>
        
        <p>This export strategy aims to create an American-led AI ecosystem that extends beyond U.S. borders, potentially limiting adversaries' access to cutting-edge AI technologies while strengthening partnerships with allied nations.</p>
        
        <h3>Political and Economic Implications</h3>
        <p>The AI Action Plan reflects broader themes of the Trump administration's technology policy. The focus on preventing "political bias" in AI systems aligns with ongoing debates about content moderation and algorithmic fairness in social media platforms and search engines.</p>
        
        <p>AI-related stocks including Nvidia, AMD, Palantir Technologies, and Meta Platforms are seeing significant boosts from the plan, suggesting investor confidence in the policy's potential to accelerate AI adoption across sectors.</p>
        
        <h3>Looking Forward</h3>
        <p>While the administration's AI policy is taking shape, experts note there's still significant work ahead. The success of America's AI Action Plan will depend heavily on implementation and coordination across federal agencies, as well as sustained investment in both research and infrastructure.</p>
        
        <p>The plan represents one of the most comprehensive AI strategies released by any administration, addressing everything from research funding to international competition. As AI continues to reshape industries from healthcare to defense, America's AI Action Plan positions the United States to maintain its technological edge in what many consider the defining technology of the 21st century.</p>
        
        <p>The full impact of these policies will unfold over the coming months as federal agencies begin implementing the plan's 90+ action items, potentially reshaping the landscape of American AI development and deployment.</p>
    `
  },
  {
    slug: "china-global-ai-cooperation-organization",
    title: "China Proposes Global AI Cooperation Organization to Counter US Tech Strategy",
    excerpt: "China announced plans for a new global AI cooperation organization with headquarters in Shanghai during the World AI Conference on July 26, 2025, marking a strategic response to America's AI Action Plan and positioning itself as a leader in international AI governance.",
    image: "https://betteraibots.com/chinaaiplans.png?v=2",
    date: "July 28, 2025",
    author: "BetterAiBots",
    category: "AI Policy",
    content: `
        <p>Chinese Premier Li Qiang announced China's ambitious plan to establish a global artificial intelligence cooperation organization at the opening of the 2025 World Artificial Intelligence Conference in Shanghai on July 26. This announcement represents China's most significant move yet in the escalating global AI competition, directly challenging US technological dominance through international cooperation.</p>
        
        <h3>Global AI Cooperation Organization: A New Framework</h3>
        <p>The Chinese government has proposed the creation of a global artificial intelligence cooperation organization, with tentative plans to establish its headquarters in Shanghai. This initiative aims to create an alternative framework for international AI governance, emphasizing inclusive development and technology sharing, particularly with developing nations.</p>
        
        <p>The proposed organization represents China's practical response to the call of the Global South, aiming to bridge the digital and intelligent divide, and promote the development of AI for good and inclusive development. This approach contrasts sharply with the US strategy, which focuses on technology restrictions and alliance-building among developed nations.</p>
        
        <h3>Timing and Strategic Context</h3>
        <p>The tech race between the world's two largest economies just intensified as China released a global action plan for artificial intelligence, calling for international cooperation on tech development and regulation. This announcement came just days after the White House unveiled "America's AI Action Plan," which emphasizes maintaining technological superiority and limiting China's access to advanced AI technologies.</p>
        
        <p>The three-day Shanghai conference brings together industry leaders and policymakers at a time of escalating technological competition between China and the United States — the world's two largest economies — with AI emerging as a key battleground.</p>
        
        <h3>Implications for Global AI Governance</h3>
        <p>China's proposal for global AI cooperation represents a fundamental shift in how international AI governance might evolve. While the US focuses on building exclusive partnerships with allies and restricting technology exports, China is positioning itself as an inclusive leader that welcomes participation from all nations, especially developing countries.</p>
        
        <p>Building on the first Workshop on AI Capacity-Building this year, the Chinese government will hold 10 AI workshops and seminars primarily aimed at fellow developing countries by the end of 2025, demonstrating its commitment to technology transfer and capacity building in the Global South.</p>
        
        <h3>The Battle for AI Leadership</h3>
        <p>This development signals that the global AI landscape is increasingly polarizing into two competing visions: the US model of technological exclusivity and alliance-based cooperation, versus China's inclusive, multilateral approach. The success of either strategy will likely determine the future structure of global AI governance and technology sharing.</p>
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