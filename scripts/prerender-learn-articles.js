const fs = require('fs');
const path = require('path');

// Affiliate links mapping (matching ArticlePage.js)
const affiliateLinks = {
  "bebop-ai": "https://try.bebop.ai/o004cood3aod",
  "pipes-ai": "https://try.pipes.ai/hmqj0m3am6un",
  "runpod": "https://get.runpod.io/w3na2cm4xdjp",
  "seosparkplug": "https://seosparkplug.com",
  "brevo-complete-guide": "https://get.brevo.com/um9xszmf3nfd",
  "aisdr-complete-guide": "https://partner.aisdr.com/5fxea2u5m85d",
  "adcreative-ai": "https://free-trial.adcreative.ai/BAIB",
  "alli-ai": "https://try.alliai.com/0guepbqpqhsf",
  "apollo-io": "https://get.apollo.io/BAIB",
  "atria": "https://affiliates.tryatria.com/BAIB",
  "recomaze": "https://affiliate.recomaze.ai/BAIB",
  "vida-ai-agent-os": "https://try.vida.io/BAIB",
  "vista-social": "https://join.vistasocial.com/BAIB",
  "plesk": "https://try.plesk.com/BAIB",
  "surecam": "https://join.surecam.com/BAIB",
  "diginius": "https://get.diginius.com/rvao67pwqqux",
  "smartli": "https://smartli.partnerlinks.io/BAIB",
  "consensus": "https://get.consensus.app/BAIB",
  "browse-ai": "https://partners.browse.ai/BAIB",
  "blackbox-ai": "https://blackboxai.partnerlinks.io/BAIB",
  "capsule-crm-complete-guide": "https://get.capsulenow.io/BAIB",
  "flowith-io": "https://aff.flowith.io/52dtlja1b580",
  "hume-ai": "https://try.hume.ai/BAIB",
  "invideo-ai": "https://invideo.sjv.io/c/6368097/2210623/12258",
  "lindy-ai": "https://try.lindy.ai/lhgvxfidor04",
  "lusha": "https://partnerstack.lusha.com/w61xn76pa3sr",
  "miro-complete-guide": "https://ps.miro-affiliate.com/gwnvu4zj3r8r",
  "mrpeasy-complete-guide": "https://try.mrpeasy.com/m72w6bztymwh",
  "murf-ai-complete-guide": "https://get.murf.ai/i5n7gfvz5cbw",
  "reply-io-complete-guide": "https://get.reply.io/ub7edypmq2gj",
  "thordata": "https://affiliate.thordata.com/BAIB",
  "tidio-ai": "https://affiliate.tidio.com/BAIB",
  "veed-complete-guide": "https://veed.cello.so/rwFO6zwGZh9",
  "webydo": "https://partners.webydo.com/BAIB",
  "wispr-flow-complete-guide": "https://wisprflow.ai/downloads?referral=KING16",
  "catalister": "https://join.catalister.com/BAIB",
  "castmagic": "https://get.castmagic.io/qdu0jfhfcurv",
  "viral-launch": "https://affiliate.viral-launch.com/BAIB",
  "anybiz": "https://anybiz.io/?fpr=ai4n56",
  "megahr": "https://try.megahr.com/BAIB",
  "airia": "https://try.airia.com/BAIB",
  "museit-art-complete-guide": "https://museit.art/?ref=BAIB",
  "nanoz-complete-guide": "https://nanoz.fun",
  "prezi-complete-guide": "https://prezi.sjv.io/BAIB",
  "quillbot-complete-guide": "https://try.quillbot.com/BAIB",
  "landingi-complete-guide": "https://try.landingi.com/lwfc597yjm25",
  "tradify-complete-guide": "https://tradify.sjv.io/BAIB",
  "logome-complete-guide": "https://logomeai.partnerlinks.io/BAIB",
  "datahawk": "https://get.datahawk.co/eoe07kko8pol",
  "descript": "https://get.descript.com/BAIB",
  "unbounce": "https://unbounce.partnerlinks.io/BAIB",
  "landbot": "https://get.landbotlab.com/BAIB",
  "reclaim-ai": "https://go.reclaim.ai/BAIB",
  "amplemarket": "https://grow.amplemarket.com/BAIB",
  "mindstudio": "https://get.mindstudio.ai/BAIB",
  "elevenlabs": "https://try.elevenlabs.io/BAIB",
  "gamma": "https://try.gamma.app/BAIB",
  "rankprompt": "https://join.rankprompt.com/BAIB",
  "snowfire-ai": "https://snowfire.com/?ref=BAIB",
  "volza": "https://partner.volza.com/BAIB",
  "bidx": "https://try.bidx.io/BAIB",
  "laxis": "https://get.laxis.com/BAIB",
  "krispcall": "https://try.krispcall.com/BAIB",
  "getresponse": "https://try.getresponsetoday.com/BAIB",
  "creativescore": "https://affiliate.creativescore.ai/BAIB",
  "seamless-ai-complete-guide": "https://get.seamless.ai/BAIB",
  "databox": "https://join.databox.com/BAIB"
};

// OG Image mapping (matching ArticlePage.js)
const ogImageMap = {
  "paintr": "https://betteraibots.com/paintindetifierai.webp",
  "invideo-ai": "https://betteraibots.com/assets/InVideoFreeTrial.png",
  "scholar-gpt": "https://betteraibots.com/assets/bot-placeholder4.webp",
  "wispr-flow-complete-guide": "https://betteraibots.com/wispr.png",
  "cheat-coder": "https://betteraibots.com/assets/cheatcoder.png",
  "alli-ai": "https://betteraibots.com/alliai.png",
  "brevo-complete-guide": "https://betteraibots.com/brevologo.png",
  "capsule-crm-complete-guide": "https://betteraibots.com/capsulecrm.png",
  "mrpeasy-complete-guide": "https://betteraibots.com/mrpeasy.png",
  "lindy-ai": "https://betteraibots.com/lindy.png",
  "viral-launch": "https://betteraibots.com/virallaunch.png",
  "apollo-io": "https://betteraibots.com/apollo.png",
  "atria": "https://betteraibots.com/assets/atria1.jpg",
  "recomaze": "https://betteraibots.com/assets/recomaze1.jpg",
  "vida-ai-agent-os": "https://betteraibots.com/assets/vida1.jpg",
  "vista-social": "https://betteraibots.com/assets/vistasocial.jpg",
  "plesk": "https://betteraibots.com/assets/plesk1.jpg",
  "surecam": "https://betteraibots.com/assets/surecam1.jpg",
  "diginius": "https://betteraibots.com/assets/diginius1.jpg",
  "smartli": "https://betteraibots.com/assets/smartli1.jpg",
  "consensus": "https://betteraibots.com/assets/consensus1.jpg",
  "browse-ai": "https://betteraibots.com/assets/browseai1.jpg",
  "adcreative-ai": "https://betteraibots.com/adcreative.png",
  "flowith-io": "https://betteraibots.com/flowith.jpg",
  "murf-ai-complete-guide": "https://betteraibots.com/murfai.png",
  "aisdr-complete-guide": "https://betteraibots.com/aisdr.png",
  "miro-complete-guide": "https://betteraibots.com/miro.png",
  "blackbox-ai": "https://betteraibots.com/blackbox-logo.png?v=2",
  "webydo": "https://betteraibots.com/webydo-logo.png?v=2",
  "thordata": "https://betteraibots.com/thordata-logo.png?v=2",
  "seosparkplug": "https://betteraibots.com/assets/seosparkplug1.jpg",
  "catalister": "https://betteraibots.com/catalister2.jpg?v=2",
  "airia": "https://betteraibots.com/airiaaidemo.jpg?v=2",
  "runpod": "https://betteraibots.com/runpod.jpg?v=2",
  "pipes-ai": "https://betteraibots.com/pipesai.jpg?v=2",
  "castmagic": "https://betteraibots.com/castmagicai.jpg?v=2",
  "anybiz": "https://betteraibots.com/anybizio.jpg?v=2",
  "megahr": "https://betteraibots.com/megahr.jpg?v=2",
  "bebop-ai": "https://betteraibots.com/bebopaitools.jpg?v=2",
  "lusha": "https://betteraibots.com/lushaai.jpg?v=2",
  "hume-ai": "https://betteraibots.com/hume2.jpg?v=2",
  "tidio-ai": "https://betteraibots.com/tidio2.jpg?v=2",
  "museit-art-complete-guide": "https://betteraibots.com/assets/musebrand.jpg",
  "nanoz-complete-guide": "https://betteraibots.com/assets/nanozlogo.png",
  "prezi-complete-guide": "https://betteraibots.com/assets/preziai.png",
  "quillbot-complete-guide": "https://betteraibots.com/assets/quilbot.jpg",
  "landingi-complete-guide": "https://betteraibots.com/assets/landingi1.jpg",
  "tradify-complete-guide": "https://betteraibots.com/assets/tradify1.jpg",
  "logome-complete-guide": "https://betteraibots.com/assets/logome1.png",
  "datahawk": "https://betteraibots.com/assets/datahawkai.jpg",
  "descript": "https://betteraibots.com/assets/descriptai.png",
  "unbounce": "https://betteraibots.com/assets/unbounceai.png",
  "landbot": "https://betteraibots.com/assets/landbotai.png",
  "reclaim-ai": "https://betteraibots.com/assets/reclaimai.png",
  "amplemarket": "https://betteraibots.com/amplemarketai.jpg",
  "mindstudio": "https://betteraibots.com/assets/mindstudioai.jpeg",
  "elevenlabs": "https://betteraibots.com/assets/elevenlabsai.jpg",
  "gamma": "https://betteraibots.com/assets/gammaai.jpg",
  "rankprompt": "https://betteraibots.com/assets/rankpromptai.jpg",
  "snowfire-ai": "https://betteraibots.com/assets/snowfireai.jpg",
  "volza": "https://betteraibots.com/assets/volzaai.png",
  "bidx": "https://betteraibots.com/assets/bidxai.jpg",
  "laxis": "https://betteraibots.com/assets/laxisai.jpg",
  "krispcall": "https://betteraibots.com/assets/krispcallai.jpg",
  "getresponse": "https://betteraibots.com/assets/getresponseai.jpg",
  "creativescore": "https://betteraibots.com/assets/creativescoreai.jpg",
  "databox": "https://betteraibots.com/assets/databoxai.jpg",
  "seamless-ai-complete-guide": "https://betteraibots.com/assets/seemlessailogo.jpg"
};

// Keywords mapping (matching ArticlePage.js)
const keywordMap = {
  "blackbox-ai": "Blackbox.ai, AI code assistant, code completion, AI autocomplete, programming tools, software development, AI coding, code generation, developer tools, BetterAiBots",
  "webydo": "Webydo, web design platform, no-code design, website builder, CMS, client management, web development, design tools, BetterAiBots",
  "thordata": "ThorData, proxy service, web scraping, data collection, residential proxies, scraper APIs, AI data infrastructure, web data collection, BetterAiBots",
  "vista-social": "Vista Social, social media management, social scheduling, content calendar, unified inbox, approvals workflow, social analytics, marketing teams, BetterAiBots",
  "datahawk": "DataHawk, Amazon analytics, Amazon keyword tracking, Amazon seller analytics, marketplace intelligence, product ranking tracker, Amazon SEO tool, PPC analytics, competitor tracking, BetterAiBots",
  "elevenlabs": "ElevenLabs, AI voice, text-to-speech, AI voice generator, voice cloning, dubbing, audio localization, voiceover, AI audio, BetterAiBots",
  "gamma": "Gamma, AI presentations, AI slide deck, presentation builder, AI doc generator, pitch deck, sales deck, web presentation, BetterAiBots",
  "rankprompt": "RankPrompt, AI SEO, content briefs, keyword research, SERP insights, SEO content planning, content outlines, prompt to outline, BetterAiBots",
  "snowfire-ai": "Snowfire AI, AI content generation, SEO content, ad copy, marketing content, content briefs, keyword research, content workflows, BetterAiBots",
  "volza": "Volza, trade intelligence, supplier discovery, shipment tracking, import export data, competitor analysis, market research, global trade data, BetterAiBots",
  "bidx": "Bidx, AI advertising optimization, performance marketing, ad campaign optimization, budget pacing, ROAS, PPC analytics, paid media, BetterAiBots",
  "laxis": "Laxis, AI meeting assistant, meeting notes, transcripts, meeting summaries, action items, meeting recorder, call summaries, productivity, BetterAiBots",
  "krispcall": "KrispCall, cloud phone system, business phone, AI call summaries, call routing, sales calls, support calls, VoIP, BetterAiBots",
  "getresponse": "GetResponse, email marketing, marketing automation, email campaigns, landing pages, conversion funnels, segmentation, newsletters, BetterAiBots",
  "creativescore": "CreativeScore, AI creative scoring, ad creative analysis, performance prediction, ad diagnostics, creative optimization, paid media, BetterAiBots",
  "descript": "Descript, AI video editing, video transcription, podcast editing, video production, AI editing tools, video editing software, content creation, BetterAiBots",
  "unbounce": "Unbounce, landing page builder, conversion optimization, A/B testing, landing pages, PPC campaigns, marketing automation, lead generation, BetterAiBots",
  "landbot": "Landbot, chatbot builder, conversational AI, chatbot platform, WhatsApp chatbot, lead generation, customer support, no-code chatbot, BetterAiBots",
  "reclaim-ai": "Reclaim.ai, calendar management, time blocking, AI scheduling, calendar automation, productivity, meeting scheduling, time optimization, BetterAiBots",
  "quillbot-complete-guide": "QuillBot, AI paraphrasing tool, grammar checker, AI detector, plagiarism checker, AI humanizer, writing assistant, text rewriter, paraphrasing software, BetterAiBots",
  "amplemarket": "Amplemarket, sales engagement, prospecting, outreach automation, sales automation, B2B sales, lead generation, sales CRM, BetterAiBots",
  "mindstudio": "MindStudio, AI agent builder, no-code AI, AI workflow automation, custom AI assistants, AI agent development, workflow builder, AI automation platform, BetterAiBots"
};

// Helper function to get image URL
function getImageUrl(imagePath) {
  if (!imagePath) return "https://betteraibots.com/og-image.png?v=3";
  if (typeof imagePath === 'string' && imagePath.startsWith('http')) return imagePath;
  if (typeof imagePath === 'string' && imagePath.startsWith('/')) return `https://betteraibots.com${imagePath}`;
  // For imported images, we'll use the ogImageMap or construct from path
  return `https://betteraibots.com/assets/${imagePath}`;
}

// Helper function to get OG image
function getOGImage(articleId, coverImage) {
  return ogImageMap[articleId] || getImageUrl(coverImage) || "https://betteraibots.com/og-image.png?v=3";
}

function generatePrerenderedHTML(article) {
  const articleUrl = `https://betteraibots.com/learn/${article.id}`;
  const ogImage = getOGImage(article.id, article.cover);
  const affiliateLink = affiliateLinks[article.id] || null;
  const keywords = keywordMap[article.id] || "AI, Artificial Intelligence, GPT, ChatGPT, AI Tools, BetterAiBots";
  
  // Convert date to ISO format for structured data
  const dateISO = article.date ? new Date(article.date).toISOString() : new Date().toISOString();
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${article.title} – BetterAiBots.com</title>
    <meta name="description" content="${article.preview}">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="${articleUrl}">
    
    <!-- Open Graph -->
    <meta property="og:url" content="${articleUrl}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.preview}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="BetterAiBots.com">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${article.title}">
    <meta name="twitter:description" content="${article.preview}">
    <meta name="twitter:image" content="${ogImage}">
    
    <!-- Article Meta -->
    <meta name="article:published_time" content="${dateISO}">
    <meta name="article:author" content="BetterAiBots">
    <meta name="article:section" content="AI Tools">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": ${JSON.stringify(article.title)},
      "description": ${JSON.stringify(article.preview)},
      "image": "${ogImage}",
      "author": {
        "@type": "Organization",
        "name": "BetterAiBots",
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
      "datePublished": "${dateISO}",
      "dateModified": "${dateISO}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${articleUrl}"
      },
      "keywords": "${keywords}",
      "articleSection": "AI Tools",
      "inLanguage": "en-US"
    }
    </script>
    
    <!-- Redirect to React app for users (not crawlers) -->
    <script>
      // Only redirect if this is a user (not a crawler)
      const isCrawler = /bot|crawler|spider|crawling|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Googlebot|Bingbot|Slurp/i.test(navigator.userAgent);
      if (!isCrawler) {
        window.location.href = '${articleUrl}';
      }
    </script>
    
    <style>
      body { 
        font-family: Arial, sans-serif; 
        margin: 0; 
        padding: 20px; 
        background: #101c26; 
        color: white; 
        line-height: 1.6;
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
        border-radius: 16px;
      }
      .article-title { 
        font-size: 2.5em; 
        margin-bottom: 10px; 
        color: #36ff95;
      }
      .article-meta { 
        color: #888; 
        margin-bottom: 20px; 
      }
      .article-preview { 
        font-size: 1.2em; 
        line-height: 1.6; 
        margin-bottom: 30px;
        color: #d1efe7;
      }
      .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%);
        color: #101c26;
        padding: 14px 28px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 700;
        margin: 20px 0;
      }
      .cta-button:hover {
        opacity: 0.9;
      }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="article-title">${article.title}</h1>
        <div class="article-meta">
            Published: ${article.date || 'N/A'} • BetterAiBots.com
        </div>
        ${article.cover ? `<img src="${ogImage}" alt="${article.title}" class="article-image">` : ''}
        <p class="article-preview">${article.preview}</p>
        ${affiliateLink ? `<a href="${affiliateLink}" class="cta-button" target="_blank" rel="noopener noreferrer">Get Started</a>` : ''}
        <p>Read the full article at <a href="${articleUrl}" style="color: #36ff95; text-decoration: underline;">BetterAiBots.com</a></p>
    </div>
</body>
</html>`;
}

// Read articles from Articles.js file
// Since Articles.js is a React file with imports, we'll need to extract the data
// For now, we'll create a minimal version that can be expanded
// You'll need to manually sync this with your Articles.js file or create a shared data file

// This is a template - you'll need to populate it with your actual article data
// Option 1: Extract article metadata from Articles.js manually
// Option 2: Create a shared data file that both Articles.js and this script use
// Option 3: Use a build-time script to extract data from Articles.js

// For now, let's create a function that reads a JSON file with article metadata
// You can generate this JSON from your Articles.js file

function loadArticlesFromJSON() {
  const jsonPath = path.join(__dirname, '..', 'public', 'articles-metadata.json');
  if (fs.existsSync(jsonPath)) {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }
  return [];
}

// Alternative: Extract from Articles.js using regex (less reliable but works)
function extractArticlesFromJS() {
  const articlesPath = path.join(__dirname, '..', 'src', 'Articles.js');
  if (!fs.existsSync(articlesPath)) {
    console.warn('Articles.js not found, skipping article prerendering');
    return [];
  }
  
  const content = fs.readFileSync(articlesPath, 'utf8');
  const articles = [];
  
  // Extract article objects using regex (basic approach)
  // This is a simplified extractor - you may need to refine it
  const articlePattern = /{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*cover:[^,]+,\s*preview:\s*"([^"]+)"/g;
  let match;
  
  while ((match = articlePattern.exec(content)) !== null) {
    articles.push({
      id: match[1],
      title: match[2],
      date: match[3],
      preview: match[4],
      cover: null // Will use ogImageMap
    });
  }
  
  return articles;
}

// Main execution
const learnDir = path.join(__dirname, '..', 'public', 'learn');
if (!fs.existsSync(learnDir)) {
  fs.mkdirSync(learnDir, { recursive: true });
}

// Try to load articles
let articles = loadArticlesFromJSON();
if (articles.length === 0) {
  console.log('📝 No articles-metadata.json found, attempting to extract from Articles.js...');
  articles = extractArticlesFromJS();
}

if (articles.length === 0) {
  console.warn('⚠️  No articles found. Please create articles-metadata.json or ensure Articles.js is accessible.');
  console.log('💡 Tip: Create a build script that extracts article metadata from Articles.js into articles-metadata.json');
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
    console.log(`📊 Processing ${articles.length} total articles, ${uniqueArticles.length} unique articles`);
  }
  
  // Generate HTML files for each unique article
  uniqueArticles.forEach(article => {
    const htmlContent = generatePrerenderedHTML(article);
    const filePath = path.join(learnDir, `${article.id}.html`);
    fs.writeFileSync(filePath, htmlContent);
    console.log(`✅ Generated prerendered HTML: ${article.id}.html`);
  });
  
  console.log(`\n🎉 Successfully prerendered ${uniqueArticles.length} unique learn articles!`);
  console.log('📝 These files will be served to search engine crawlers');
  console.log('👥 Users will be redirected to the React app');
}

