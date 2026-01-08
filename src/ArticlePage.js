import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articles } from "./Articles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function ShareButtons({ url, title }) {
  // Always use the article URL for sharing, never affiliate links
  const getArticleUrl = () => {
    return `${window.location.origin}/learn/${window.location.pathname.split('/').pop()}`;
  };
  const articleUrl = getArticleUrl();
  
  // Clean title for sharing - remove domain suffixes to prevent Twitter from detecting them as URLs
  const cleanTitleForSharing = (text) => {
    return text
      .replace(/VEED\.io/gi, 'VEED')
      .replace(/Reply\.io/gi, 'Reply AI')
      .replace(/Apollo\.io/gi, 'Apollo')
      .replace(/Capsule CRM/gi, 'Capsule')
      .replace(/MRPeasy/gi, 'MRPeasy')
      .replace(/Murf\.ai/gi, 'Murf AI')
      .replace(/AiSDR/gi, 'AiSDR')
      .replace(/Miro/gi, 'Miro')
      .replace(/Lindy\.ai/gi, 'Lindy AI')
      .replace(/Viral Launch/gi, 'Viral Launch')
      .replace(/Alli AI/gi, 'Alli AI')
      .replace(/AdCreative AI/gi, 'AdCreative')
      .replace(/Flowith\.io/gi, 'Flowith')
      .replace(/ScholarGPT/gi, 'ScholarGPT')
      .replace(/Brevo/gi, 'Brevo')
      // Generic patterns to catch any remaining .io, .ai, .com suffixes in product names
      .replace(/(\w+)\.io/gi, '$1')
      .replace(/(\w+)\.ai/gi, '$1 AI')
      .replace(/(\w+)\.com/gi, '$1');
  };
  const cleanTitle = cleanTitleForSharing(title);
  
  // Copy link handler with quick popup
  const handleCopy = () => {
    // Always copy the article URL, not affiliate links
    navigator.clipboard.writeText(articleUrl);
    
    // Create and show quick "Copied" popup
    const popup = document.createElement('div');
    popup.textContent = 'Copied!';
    popup.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #36ff95 0%, #00ffb2 100%);
      color: #1a1a1a;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      z-index: 10000;
      box-shadow: 0 4px 16px rgba(54, 255, 149, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(popup);
    
    // Animate in
    setTimeout(() => {
      popup.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 2 seconds
    setTimeout(() => {
      popup.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(popup)) {
          document.body.removeChild(popup);
        }
      }, 300);
    }, 2000);
  };
  const iconSize = 28;
  const iconStyle = { display: 'inline-block', verticalAlign: 'middle', fontSize: iconSize, width: iconSize, height: iconSize, padding: 2, cursor: 'pointer' };
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
      {/* Twitter */}
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(cleanTitle + '\n\n' + articleUrl)}&url=${encodeURIComponent(articleUrl)}`}
        target="_blank" rel="noopener noreferrer" title="Share on Twitter"
        style={{ color: "#1da1f2", ...iconStyle }}>
        <svg height={iconSize} width={iconSize} viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 5.93c-.8.36-1.66.62-2.56.73a4.5 4.5 0 0 0 1.97-2.49 9.1 9.1 0 0 1-2.86 1.1A4.52 4.52 0 0 0 16.16 4a4.52 4.52 0 0 0-4.5 4.5c0 .35.04.7.1 1.02A12.82 12.82 0 0 1 3.13 4.67a4.51 4.51 0 0 0-.61 2.28c0 1.57.8 2.96 2.03 3.77a4.5 4.5 0 0 1-2.04-.56v.05c0 2.19 1.56 4.03 3.64 4.45a4.53 4.53 0 0 1-2.03.08c.57 1.78 2.23 3.09 4.2 3.12A9.06 9.06 0 0 1 2 19.54a12.79 12.79 0 0 0 6.94 2.03c8.33 0 12.89-6.89 12.89-12.89 0-.2 0-.41-.01-.61.88-.64 1.65-1.44 2.26-2.35z"/></svg>
      </a>
      {/* Facebook */}
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
        target="_blank" rel="noopener noreferrer" title="Share on Facebook"
        style={{ color: "#4267B2", ...iconStyle }}>
        <svg height={iconSize} width={iconSize} viewBox="0 0 24 24"><path fill="currentColor" d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
      </a>
      {/* SMS */}
      <a href={`sms:?body=${encodeURIComponent(cleanTitle + '\n\n' + articleUrl)}`}
        title="Share via SMS" style={{ color: "#25d366", ...iconStyle }}>
        <svg height={iconSize} width={iconSize} viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4C2.897 2 2 2.897 2 4v14c0 1.103.897 2 2 2h14l4 4V4c0-1.103-.897-2-2-2zm0 15.172L18.828 16H4V4h16v13.172z"/></svg>
      </a>
      {/* Email */}
      <a href={`mailto:?subject=${encodeURIComponent(cleanTitle)}&body=${encodeURIComponent(cleanTitle + '\n\n' + articleUrl)}`}
        title="Share via Email" style={{ color: "#ea4335", ...iconStyle }}>
        <svg height={iconSize} width={iconSize} viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20V8.99l8 7 8-7V20H4z"/></svg>
      </a>
      {/* Copy Link */}
      <span onClick={handleCopy} title="Copy link to clipboard" style={{ color: "#36ff95", ...iconStyle }}>
        <svg height={iconSize} width={iconSize} viewBox="0 0 24 24"><path fill="currentColor" d="M3.9 12c0-2.25 1.85-4.1 4.1-4.1h4V6.5h-4C5.01 6.5 3 8.51 3 11s2.01 4.5 4.5 4.5h4v-1.4h-4c-2.25 0-4.1-1.85-4.1-4.1zm5.6 1.4h5V10.6h-5v2.8zm7.5-7.5h-4v1.4h4c2.25 0 4.1 1.85 4.1 4.1s-1.85 4.1-4.1 4.1h-4v1.4h4c2.99 0 5-2.01 5-4.5s-2.01-4.5-5-4.5z"/></svg>
      </span>
    </div>
  );
}

// Function to find related articles based on keywords, title, and content similarity
function findRelatedArticles(currentArticle, allArticles, limit = 2) {
  if (!currentArticle || !allArticles || allArticles.length === 0) return [];
  
  // Extract keywords from title and preview
  const currentTitle = (currentArticle.title || '').toLowerCase();
  const currentPreview = (currentArticle.preview || '').toLowerCase();
  const currentContent = (currentArticle.content || '').toLowerCase();
  
  // Create a set of keywords from title (split by common words)
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']);
  
  const extractKeywords = (text) => {
    return text
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word.toLowerCase()))
      .map(word => word.toLowerCase());
  };
  
  const currentKeywords = new Set([
    ...extractKeywords(currentTitle),
    ...extractKeywords(currentPreview),
    ...extractKeywords(currentContent.substring(0, 1000)) // First 1000 chars for performance
  ]);
  
  // Topic clusters - group related articles
  const topicClusters = {
    'ai-content': ['ai', 'content', 'writing', 'copy', 'text', 'article', 'blog', 'seo'],
    'ai-video': ['video', 'editing', 'production', 'youtube', 'streaming', 'media'],
    'ai-audio': ['audio', 'voice', 'podcast', 'music', 'sound', 'speech'],
    'ai-marketing': ['marketing', 'advertising', 'campaign', 'social', 'email', 'outreach'],
    'ai-sales': ['sales', 'crm', 'leads', 'prospects', 'contacts', 'outreach'],
    'ai-design': ['design', 'graphic', 'image', 'visual', 'creative', 'art'],
    'ai-productivity': ['productivity', 'automation', 'workflow', 'task', 'calendar', 'time'],
    'ai-seo': ['seo', 'search', 'keyword', 'ranking', 'optimization', 'serp'],
    'ai-analytics': ['analytics', 'data', 'metrics', 'dashboard', 'reporting', 'insights'],
    'ai-chatbot': ['chatbot', 'chat', 'conversation', 'messaging', 'support', 'assistant'],
    'ai-ecommerce': ['ecommerce', 'amazon', 'seller', 'product', 'inventory', 'fba'],
    'ai-hosting': ['hosting', 'server', 'infrastructure', 'deployment', 'cloud'],
  };
  
  // Score articles based on keyword overlap and topic clusters
  const seenIds = new Set(); // Track article IDs to prevent duplicates
  const scoredArticles = allArticles
    .filter(a => {
      // Filter out current article, articles without title/preview, and duplicates
      if (!a || !a.id || a.id === currentArticle.id || !a.title || !a.preview) return false;
      if (seenIds.has(a.id)) return false; // Skip duplicates
      seenIds.add(a.id);
      return true;
    })
    .map(otherArticle => {
      const otherTitle = (otherArticle.title || '').toLowerCase();
      const otherPreview = (otherArticle.preview || '').toLowerCase();
      const otherKeywords = new Set([
        ...extractKeywords(otherTitle),
        ...extractKeywords(otherPreview)
      ]);
      
      // Calculate keyword overlap
      let score = 0;
      currentKeywords.forEach(keyword => {
        if (otherKeywords.has(keyword)) {
          score += 2; // Title/preview matches are weighted higher
        }
      });
      
      // Check topic cluster matches
      Object.entries(topicClusters).forEach(([cluster, keywords]) => {
        const currentInCluster = keywords.some(kw => currentKeywords.has(kw));
        const otherInCluster = keywords.some(kw => otherKeywords.has(kw));
        if (currentInCluster && otherInCluster) {
          score += 3; // Topic cluster matches get bonus points
        }
      });
      
      // Bonus for same level if it exists
      if (currentArticle.level && otherArticle.level && currentArticle.level === otherArticle.level) {
        score += 1;
      }
      
      return { article: otherArticle, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
  
  // Final deduplication by ID to ensure no duplicates
  const uniqueArticles = [];
  const finalSeenIds = new Set();
  for (const article of scoredArticles) {
    if (article && article.id && !finalSeenIds.has(article.id)) {
      finalSeenIds.add(article.id);
      uniqueArticles.push(article);
      if (uniqueArticles.length >= limit) break;
    }
  }
  
  return uniqueArticles;
}

// Function to add internal links to article content
// This creates contextual links to related articles mentioned in the content
function addInternalLinks(content, currentArticleId, allArticles) {
  if (!content || typeof content !== 'string' || !allArticles || !Array.isArray(allArticles)) return content;
  
  // Create a map of common product/tool names to article IDs
  // Focus on distinctive product names that are likely to be mentioned
  const productNameMap = new Map();
  
  allArticles.forEach(article => {
    if (!article || !article.title || typeof article.title !== 'string' || article.id === currentArticleId) return;
    if (!article.id || typeof article.id !== 'string') return;
    
    // Extract the main product/tool name from title
    // Look for patterns like "Product Name:" or standalone product names
    const title = article.title.toLowerCase();
    
    // Common patterns to extract product names
    const patterns = [
      /^([^:]+?)(?:\s*:|\s+review|\s+guide|\s+platform|\s+tool)/i, // "Product Name: Description"
      /^(ai-powered\s+)?([a-z0-9-]+)(?:\s+platform|\s+tool|\s+system)/i, // "Product Platform"
      /^the\s+([a-z0-9-]+)/i, // "The Product"
    ];
    
    let productName = null;
    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match && match[1]) {
        productName = match[1].trim().toLowerCase();
        // Clean up common prefixes
        productName = productName.replace(/^(ai-powered|the|a|an)\s+/i, '').trim();
        if (productName.length > 3) break;
      }
    }
    
    // Fallback: use first significant word
    if (!productName && title) {
      const words = title.split(/\s+/);
      productName = words.find(word => 
        word && word.length > 3 && 
        !['complete', 'guide', 'review', 'platform', 'tool', 'system', 'ai-powered', 'ai', 'the', 'a', 'an'].includes(word.toLowerCase())
      );
      if (productName) productName = productName.toLowerCase();
    }
    
    // Also try to extract from ID (often contains product name)
    let idProductName = null;
    if (article.id && typeof article.id === 'string') {
      const idParts = article.id.split('-');
      idProductName = idParts.find(part => part && part.length > 3 && !['complete', 'guide', 'review'].includes(part));
    }
    
    if (productName && typeof productName === 'string' && productName.length > 3) {
      productNameMap.set(productName, article);
    }
    if (idProductName && typeof idProductName === 'string' && idProductName.length > 3) {
      productNameMap.set(idProductName, article);
    }
    
    // Add variations (remove common suffixes, handle .io, .ai, etc.)
    if (productName && typeof productName === 'string') {
      const variations = [
        productName.replace(/\.(io|ai|com)$/, ''), // Remove TLD
        productName.replace(/\s+ai$/, ''), // Remove " AI" suffix
      ];
      variations.forEach(variation => {
        if (variation && typeof variation === 'string' && variation.length > 3) {
          productNameMap.set(variation, article);
        }
      });
    }
  });
  
  let processedContent = content;
  const linkedArticles = new Set(); // Track which articles we've linked to avoid over-linking
  
  // Process each potential product mention
  productNameMap.forEach((targetArticle, productName) => {
    if (!targetArticle || !targetArticle.id || linkedArticles.has(targetArticle.id)) return; // Already linked this article
    if (!productName || typeof productName !== 'string') return;
    
    // Create regex to find product mentions, but avoid:
    // - Already linked text
    // - Inside code blocks (```)
    // - Inside HTML tags
    // - Inside existing markdown links
    
    const escapedName = productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Build regex pattern as a string to avoid template literal issues with backticks
    // Pattern: match product name, but not if it's inside code blocks, HTML tags, or existing links
    // Using String.fromCharCode(96) for backtick to avoid template literal parsing issues
    const backtick = String.fromCharCode(96);
    const regexPattern = '(^|[^\\[\\]()' + backtick + '])(\\b' + escapedName + '\\b)(?![^<]*>)(?![^\\[]*\\]\\()';
    const regex = new RegExp(regexPattern, 'gi');
    
    // Check if product is mentioned in content
    const matches = [...processedContent.matchAll(regex)];
    if (matches.length === 0) return;
    
    // Only link the first 1-2 mentions to avoid over-linking
    let linkCount = 0;
    const maxLinks = 2;
    
    processedContent = processedContent.replace(regex, (match, prefix, term) => {
      // Skip if we've already linked enough times
      if (linkCount >= maxLinks) return match;
      
      // Check if we're inside a code block
      const beforeMatch = processedContent.substring(0, processedContent.lastIndexOf(match, processedContent.indexOf(match)));
      const codeBlockCount = (beforeMatch.match(/```/g) || []).length;
      if (codeBlockCount % 2 !== 0) return match; // Inside code block
      
      // Check if we're inside an HTML tag
      const htmlTagPattern = /<[^>]*>/g;
      const htmlTags = [...beforeMatch.matchAll(htmlTagPattern)];
      const lastTag = htmlTags[htmlTags.length - 1];
      if (lastTag && lastTag[0].startsWith('<') && !lastTag[0].includes('/')) {
        // Check if we're inside an unclosed tag
        const tagName = lastTag[0].match(/<(\w+)/);
        if (tagName) {
          const closingTag = new RegExp(`</${tagName[1]}>`, 'i');
          const afterMatch = processedContent.substring(processedContent.indexOf(match) + match.length);
          if (!closingTag.test(afterMatch.substring(0, 500))) {
            return match; // Inside unclosed HTML tag
          }
        }
      }
      
      // Check if already in a markdown link
      const linkPattern = new RegExp(`\\[.*?${escapedName}.*?\\]\\([^)]+\\)`, 'i');
      const contextBefore = processedContent.substring(Math.max(0, processedContent.indexOf(match) - 100), processedContent.indexOf(match));
      const contextAfter = processedContent.substring(processedContent.indexOf(match) + match.length, processedContent.indexOf(match) + match.length + 100);
      if (linkPattern.test(contextBefore + match + contextAfter)) {
        return match; // Already in a link
      }
      
      linkCount++;
      linkedArticles.add(targetArticle.id);
      
      // Replace with markdown link
      return `${prefix}[${term}](/learn/${targetArticle.id})`;
    });
  });
  
  return processedContent;
}
  
export default function ArticlePage() {
  const { id } = useParams();
  const location = useLocation();
  
  // Safety check for articles array
  if (!articles || !Array.isArray(articles)) {
    console.error('Articles array is not properly loaded');
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Error Loading Articles</h2>
        <p>Please refresh the page or contact support if the issue persists.</p>
      </div>
    );
  }
  
  const article = articles.find(a => a.id === id);
  const fromPage = location.state?.from || (location.pathname.startsWith('/learn') ? '/learn' : '/');
  
  // Extract video HTML from content if present
  const extractVideoFromContent = (content) => {
    if (!content || typeof content !== 'string') return { video: null, restContent: content };
    
    // Check if content contains YouTube embed
    if (!content.includes('youtube.com/embed')) {
      return { video: null, restContent: content };
    }
    
    // More aggressive pattern: match from start, including all whitespace, the entire div block
    // This pattern handles multiline HTML with proper closing tags
    const videoPattern = /^(\s*<div[^>]*>[\s\S]*?<\/iframe>[\s\S]*?<\/div>\s*)/;
    const videoMatch = content.match(videoPattern);
    
    if (videoMatch) {
      const videoHtml = videoMatch[1].trim();
      // Remove the matched video block from content
      let restContent = content.replace(videoPattern, '').trim();
      // Aggressively remove ANY remaining video HTML (in case regex didn't catch it all)
      restContent = restContent.replace(/<div[^>]*>[\s\S]*?youtube\.com\/embed[\s\S]*?<\/div>/gi, '').trim();
      // Also remove any standalone iframe tags
      restContent = restContent.replace(/<iframe[^>]*youtube\.com\/embed[^>]*>[\s\S]*?<\/iframe>/gi, '').trim();
      
      return {
        video: videoHtml,
        restContent: restContent
      };
    }
    
    // Fallback: if no match but video exists, try to remove it anyway
    const fallbackCleaned = content.replace(/<div[^>]*>[\s\S]*?youtube\.com\/embed[\s\S]*?<\/div>/gi, '').trim();
    return { video: null, restContent: fallbackCleaned };
  };
  
  // Process content to add internal links
  const processedContent = article ? addInternalLinks(article.content, article.id, articles) : null;
  const { video, restContent } = article ? extractVideoFromContent(processedContent) : { video: null, restContent: null };

  // Function to generate heading ID from text
  const generateHeadingId = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const ScholarGPTHeading = ({ level, children, ...props }) => {
    // Extract text content from children, handling both strings and React elements
    const extractTextFromChildren = (children) => {
      if (typeof children === 'string') {
        return children;
      }
      if (Array.isArray(children)) {
        return children.map(child => {
          if (typeof child === 'string') {
            return child;
          }
          if (child && typeof child === 'object' && child.props && child.props.children) {
            return extractTextFromChildren(child.props.children);
          }
          return '';
        }).join('');
      }
      if (children && typeof children === 'object' && children.props && children.props.children) {
        return extractTextFromChildren(children.props.children);
      }
      return '';
    };
    
    const headingText = extractTextFromChildren(children);
    const headingId = generateHeadingId(headingText);
    
    if (
      article.id === 'scholar-gpt' &&
      level === 2 &&
      typeof children[0] === 'string' &&
      children[0].trim().toLowerCase() === 'how it works'
    ) {
      return (
        <>
          <h2 {...props} id={headingId} style={{ color: '#36ff95', fontWeight: 700, margin: '32px 0 12px 0', fontSize: '1.4rem', letterSpacing: 0.1 }}>{children}</h2>
          <img
            src="/scholargpt.jpg"
            alt="Scholar GPT"
            style={{
              width: '100%',
              maxWidth: '420px',
              display: 'block',
              margin: '24px auto',
              borderRadius: 16
            }}
          />
        </>
      );
    }
    const Tag = `h${level}`;
    return <Tag {...props} id={headingId} style={{ color: '#36ff95', fontWeight: 700, margin: '32px 0 12px 0', fontSize: '1.4rem', letterSpacing: 0.1 }}>{children}</Tag>;
  };

  if (!article) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>BetterAiBots Article Not Found</h2>
        <Link to={fromPage} style={{ color: "#0bbfdb" }}>Back to {fromPage === '/apps' ? 'Apps' : 'Learn'}</Link>
      </div>
    );
  }

      const pageUrl = `${window.location.origin}/learn/${article.id}`;
      // Always use the article URL for sharing, not affiliate links
      const shareUrl = pageUrl;
  const images = article.images || [];
  // Prioritize article cover image (used for paid apps), fallback to images array
  const primaryImage = article.cover || images[0];
  // Get secondary images (all images except the first one, or all if using cover)
  // When using cover, exclude the cover image from secondary images if it's also in the images array
  const secondaryImages = article.cover 
    ? images.filter(img => img !== article.cover && img !== images[0])
    : images.slice(1);
  
  // Mapping of article IDs to their affiliate links
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
    "museit-art-complete-guide": "https://Museit.art",
    "nanoz-complete-guide": "https://nanoz.fun",
    "prezi-complete-guide": "https://try.prezi.com/9kk83fjh4yri",
    "quillbot-complete-guide": "https://try.quillbot.com/BAIB",
    "landingi-complete-guide": "https://try.landingi.com/lwfc597yjm25",
    "tradify-complete-guide": "https://partners.tradifyhq.com/rh188vnbjrvr",
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
    "snowfire-ai": "https://partners.snowfire.ai/8f5vtlj0mksq",
    "volza": "https://partner.volza.com/BAIB",
    "bidx": "https://try.bidx.io/BAIB",
    "laxis": "https://get.laxis.com/BAIB",
    "krispcall": "https://try.krispcall.com/BAIB",
    "getresponse": "https://try.getresponsetoday.com/BAIB",
    "creativescore": "https://affiliate.creativescore.ai/BAIB",
    "seamless-ai-complete-guide": "https://get.seamless.ai/BAIB"
  };
  
  const affiliateLink = affiliateLinks[article.id] || null;
  
  // Function to split content roughly in half for inserting secondary images
  const splitContentForSecondaryImages = (content) => {
    if (!content || secondaryImages.length === 0) {
      return { firstHalf: content, secondHalf: '' };
    }
    
    // Split by double newlines (paragraphs)
    const paragraphs = content.split(/\n\n+/);
    const midPoint = Math.floor(paragraphs.length / 2);
    
    // Try to find a heading near the midpoint for a cleaner split
    let splitIndex = midPoint;
    for (let i = midPoint; i < paragraphs.length && i < midPoint + 3; i++) {
      if (paragraphs[i].trim().startsWith('##')) {
        splitIndex = i;
        break;
      }
    }
    
    const firstHalf = paragraphs.slice(0, splitIndex).join('\n\n');
    const secondHalf = paragraphs.slice(splitIndex).join('\n\n');
    
    return { firstHalf, secondHalf };
  };
  
  const { firstHalf, secondHalf } = splitContentForSecondaryImages(processedContent || article.content);

  // Shared markdown components for rendering article content
  const markdownComponents = {
    h2: ScholarGPTHeading,
    h3: ({ node, children, ...props }) => {
      const extractTextFromChildren = (children) => {
        if (typeof children === 'string') {
          return children;
        }
        if (Array.isArray(children)) {
          return children.map(child => {
            if (typeof child === 'string') {
              return child;
            }
            if (child && typeof child === 'object' && child.props && child.props.children) {
              return extractTextFromChildren(child.props.children);
            }
            return '';
          }).join('');
        }
        if (children && typeof children === 'object' && children.props && children.props.children) {
          return extractTextFromChildren(children.props.children);
        }
        return '';
      };
      const headingText = extractTextFromChildren(children);
      const headingId = generateHeadingId(headingText);
      return (
        <h3 {...props} id={headingId} style={{ color: '#36ff95', fontWeight: 700, margin: '28px 0 10px 0', fontSize: '1.13rem', letterSpacing: 0.1 }}>{children}</h3>
      );
    },
    p: ({ children }) => <p>{children}</p>,
    strong: ({ children, ...props }) => highlightSpeakers(children),
    ul: ({ children, ...props }) => (
      <ul style={{ paddingLeft: 20, margin: '16px 0' }}>{children}</ul>
    ),
    ol: ({ children, ...props }) => (
      <ol style={{ paddingLeft: 20, margin: '16px 0' }}>{children}</ol>
    ),
    li: ({ children, ...props }) => (
      <li style={{ marginBottom: 8, display: 'block' }}>{children}</li>
    ),
    img: () => null,
    a: ({ href, children, ...props }) => {
      if (href && href.startsWith('#')) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              const targetId = href.substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
            style={{ color: '#36ff95', textDecoration: 'underline', cursor: 'pointer' }}
            {...props}
          >
            {children}
          </a>
        );
      }
      return <a href={href} style={{ color: '#36ff95', textDecoration: 'underline' }} {...props}>{children}</a>;
    }
  };

  // Utility to highlight speakers in any strong/bold text
  const highlightSpeakers = (children) => {
    if (!children) return children;
    return React.Children.map(children, child => {
      if (
        typeof child === "string" &&
        (child.startsWith("BAIB:") || child.startsWith("ScholarGPT:") || child.startsWith("VetGPT:"))
      ) {
        return (
          <span
            style={{
              color: "#5CFFB0", // always green
              fontWeight: 800,
              fontFamily: 'Fira Mono, monospace',
              letterSpacing: 0.5
            }}
          >
            {child}
          </span>
        );
      }
      return child;
    });
  };

  // Articles that should use the n8n-style layout (article-container, article-content, share-buttons)
  const articlesWithNewsStyleLayout = [
    'adcreative-ai',
    'alli-ai',
    'apollo-io',
    'atria',
    'recomaze',
    'vida-ai-agent-os',
    'vista-social',
    'plesk',
    'surecam',
    'diginius',
    'smartli',
    'consensus',
    'browse-ai',
    'blackbox-ai',
    'brevo-complete-guide',
    'capsule-crm-complete-guide',
    'flowith-io',
    'hume-ai',
    'invideo-ai',
    'lindy-ai',
    'lusha',
    'miro-complete-guide',
    'mrpeasy-complete-guide',
    'murf-ai-complete-guide',
    'aisdr-complete-guide',
    'reply-io-complete-guide',
    'thordata',
    'tidio-ai',
    'veed-complete-guide',
    'webydo',
    'wispr-flow-complete-guide',
    'viral-launch',
    'runpod',
    'pipes-ai',
    'castmagic',
    'anybiz',
    'megahr',
    'bebop-ai',
    'catalister',
    'seosparkplug',
    'airia',
    'museit-art-complete-guide',
    'nanoz-complete-guide',
    'prezi-complete-guide',
    'quillbot-complete-guide',
    'landingi-complete-guide',
    'tradify-complete-guide',
    'logome-complete-guide',
    'datahawk',
    'descript',
    'unbounce',
    'landbot',
    'reclaim-ai',
    'amplemarket',
    'mindstudio',
    'gamma',
    'rankprompt',
    'snowfire-ai',
    'volza',
    'bidx',
    'laxis',
    'krispcall',
    'getresponse',
    'creativescore',
    'databox',
    'seamless-ai-complete-guide',
    'warmy-io-spam-folder-rebellion-email-deliverability'
  ];
  const usesNewsStyleLayout = articlesWithNewsStyleLayout.includes(article.id);

  const renderShareButtons = () => {
    const url = `https://betteraibots.com/learn/${article.id}`;
    const text = `${article.title} - ${article.preview || ''}`;
    
    return (
      <div className="share-buttons" style={{ marginBottom: '30px' }}>
        <h3>Share this article:</h3>
        <div className="share-buttons-container">
          <button 
            onClick={() => {
              window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="share-btn twitter"
            title="Share on X"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Share to X
          </button>
          
          <button 
            onClick={() => {
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            }}
            className="share-btn facebook"
            title="Share on Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
          
          <button 
            onClick={() => {
              window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(article.title)}`, '_blank');
            }}
            className="share-btn reddit"
            title="Share on Reddit"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
            </svg>
            Reddit
          </button>
          
          <button 
            onClick={() => {
              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
            }}
            className="share-btn whatsapp"
            title="Share on WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            WhatsApp
          </button>
          
          <button 
            onClick={() => {
              navigator.clipboard.writeText(url).then(() => {
                // Create and show quick "Copied" popup
                const popup = document.createElement('div');
                popup.textContent = 'Copied!';
                popup.style.cssText = `
                  position: fixed;
                  top: 20px;
                  right: 20px;
                  background: linear-gradient(135deg, #36ff95 0%, #00ffb2 100%);
                  color: #1a1a1a;
                  padding: 12px 20px;
                  border-radius: 8px;
                  font-weight: 600;
                  font-size: 14px;
                  z-index: 10000;
                  box-shadow: 0 4px 16px rgba(54, 255, 149, 0.3);
                  transform: translateX(100%);
                  transition: transform 0.3s ease;
                `;
                
                document.body.appendChild(popup);
                
                // Animate in
                setTimeout(() => {
                  popup.style.transform = 'translateX(0)';
                }, 10);
                
                // Remove after 2 seconds
                setTimeout(() => {
                  popup.style.transform = 'translateX(100%)';
                  setTimeout(() => {
                    if (document.body.contains(popup)) {
                      document.body.removeChild(popup);
                    }
                  }, 300);
                }, 2000);
              });
            }}
            className="share-btn copy"
            title="Copy link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            Copy Link
          </button>
        </div>
      </div>
    );
  };

  const containerStyles = {
    maxWidth: 800,
    margin: '0 auto',
    padding: '0 12px',
    fontSize: '1.08rem',
    color: '#e9f7ee',
    lineHeight: 1.8,
    fontFamily: 'inherit'
  };

  const enhancedContentStyles = {};

  const topShareSection = usesNewsStyleLayout ? (
    renderShareButtons()
  ) : (
    <div style={{ display: "flex", gap: 16, marginBottom: 18, alignItems: "center" }}>
      <ShareButtons url={shareUrl} title={article.title} />
      {/* Open GPT Button for specific articles (top, small) */}
      {(() => {
        const gptMap = {
          "paintr": {
            name: "PaintR",
            link: "https://chatgpt.com/g/g-6833f9d3f1f88191ba83263ab7a99ea7-paintr"
          },
          "vetgpt": {
            name: "VetGPT",
            link: "https://chatgpt.com/g/g-ZR0aH16CQ-vetgpt"
          },
          "ai-fitness-coach": {
            name: "Fitness Diet Workout PhD Coach",
            link: "https://chatgpt.com/g/g-ipOIcM229-fitness-workout-diet-phd-coach"
          },
          "cheat-coder": {
            name: "Cheat Coder",
            link: "https://chatgpt.com/g/g-684426fa2a588191aabb529e9ca6e26f-cheat-coder"
          },
          "scholar-gpt": {
            name: "Scholar GPT",
            link: "https://chatgpt.com/g/g-kZ0eYXlJe-scholar-gpt"
          }
        };
        const gpt = gptMap[article.id];
        if (!gpt) return null;
        return (
          <a
            href={gpt.link}
            target="_blank"
            rel="noopener noreferrer"
            title="Open GPT"
            style={{
              width: 28,
              height: 28,
              minWidth: 28,
              minHeight: 28,
              borderRadius: 6,
              background: "linear-gradient(90deg, #36ff95 0%, #00ffb2 100%)",
              color: "#1a1a1a",
              textDecoration: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 13,
              verticalAlign: "middle",
              boxSizing: "border-box",
              marginTop: 18,
              marginBottom: 0
            }}
          >
            GPT
          </a>
        );
      })()}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{article.title} – BetterAiBots.com</title>
        <meta name="description" content={article.preview} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.preview} />
        <link rel="canonical" href={`https://betteraibots.com/learn/${article.id}`} />
        <meta property="og:image" content={(() => {
          // Article-specific Open Graph images for better social sharing
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
          return ogImageMap[article.id] || primaryImage || article.cover;
        })()} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.preview} />
        <meta name="twitter:image" content={(() => {
          // Article-specific Open Graph images for better social sharing
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
            "krispcall": "https://betteraibots.com/assets/krispcallai.jpg",
            "getresponse": "https://betteraibots.com/assets/getresponseai.jpg"
          };
          return ogImageMap[article.id] || primaryImage || article.cover;
        })()} />
        <meta name="article:published_time" content={article.date} />
        <meta name="article:author" content="BetterAiBots" />
        <meta name="article:section" content="AI Tools" />
        <meta name="article:tag" content={(() => {
          const tagMap = {
            "blackbox-ai": "AI, Artificial Intelligence, Blackbox.ai, AI Code Assistant, Code Completion, AI Development Tools, Programming, Software Development, BetterAiBots",
            "webydo": "AI, Artificial Intelligence, Webydo, Web Design, No-Code Design, Website Builder, CMS, Client Management, BetterAiBots",
            "thordata": "AI, Artificial Intelligence, ThorData, Proxy, Web Scraping, Data Collection, AI Data Infrastructure, Residential Proxies, Scraper APIs, BetterAiBots",
            "seosparkplug": "AI, Artificial Intelligence, SEOSparkPlug, SEO Platform, AI SEO, SEO Analysis, Digital Marketing, Website Optimization, SEO Tools, BetterAiBots",
            "catalister": "AI, Artificial Intelligence, Catalister, Dropshipping, E-commerce Automation, Shopify Integration, AI Dropshipping, E-commerce Tools, BetterAiBots",
            "airia": "AI, Artificial Intelligence, Airia, Enterprise AI, AI Orchestration, AI Agent Development, Enterprise Automation, AI Platform, BetterAiBots",
            "runpod": "AI, Artificial Intelligence, RunPod, Cloud GPU, GPU Computing, AI Training, AI Model Deployment, GPU Infrastructure, BetterAiBots",
            "pipes-ai": "AI, Artificial Intelligence, Pipes.ai, Lead Engagement, AI Sales, Lead Generation, Sales Automation, AI Voice, SMS Marketing, BetterAiBots",
            "castmagic": "AI, Artificial Intelligence, CastMagic, Content Creation, AI Transcription, Content Repurposing, Podcast Tools, Video Content, BetterAiBots",
            "anybiz": "AI, Artificial Intelligence, AnyBiz.io, AI Sales Agents, Sales Automation, Lead Generation, Email Automation, LinkedIn Outreach, BetterAiBots",
            "megahr": "AI, Artificial Intelligence, Mega HR, AI Hiring, HR Automation, Recruitment, AI Hiring Assistant, Megan AI, Hiring Platform, BetterAiBots",
            "bebop-ai": "AI, Artificial Intelligence, Bebop.ai, Workflow Automation, Process Optimization, AI Automation, Business Automation, Workflow Management, BetterAiBots",
            "lusha": "AI, Artificial Intelligence, Lusha, B2B Contact Data, Email Finder, Phone Number Lookup, Sales Intelligence, Lead Generation, CRM Integration, BetterAiBots",
            "hume-ai": "AI, Artificial Intelligence, Hume AI, Empathic AI, Emotion Recognition, Voice AI, Facial Expression Analysis, Emotional Intelligence, AI Interactions, BetterAiBots",
            "tidio-ai": "AI, Artificial Intelligence, Tidio AI, Lyro AI Agent, Customer Service Automation, Live Chat, Help Desk, AI Chatbot, Customer Support, BetterAiBots",
            "museit-art-complete-guide": "AI, Artificial Intelligence, Museit.art, AI Art Creation, AI Art Generator, Creative AI, Mindfulness Art, Digital Art Creation, AI Art Platform, Art Therapy, Creative Expression, BetterAiBots",
            "nanoz-complete-guide": "AI, Artificial Intelligence, NanoZ.fun, AI Branding, Brand Image Generation, AI Brand Imagery, Brand Consistency, AI Design Tools, Professional Branding, Brand Asset Management, AI Image Generation, BetterAiBots",
            "prezi-complete-guide": "AI, Artificial Intelligence, Prezi, AI Presentations, Presentation Software, Interactive Presentations, Prezi Video, Visual Storytelling, Presentation Design, AI Presentation Creator, BetterAiBots",
            "quillbot-complete-guide": "AI, Artificial Intelligence, QuillBot, AI Paraphrasing Tool, Grammar Checker, AI Detector, Plagiarism Checker, AI Humanizer, Writing Assistant, Text Rewriter, Paraphrasing Software, BetterAiBots",
            "landingi-complete-guide": "AI, Artificial Intelligence, Landingi, AI Landing Page Builder, Landing Page Creator, Conversion Optimization, Lead Generation, A/B Testing, Landing Page Design, Marketing Tools, BetterAiBots",
            "tradify-complete-guide": "Tradify, Job Management Software, Trade Business Software, Job Management for Trades, Trade Business Management, Electrician Software, Plumber Software, HVAC Software, Job Scheduling, Trade Invoicing, Trade Quoting, Trade Job Tracking, BetterAiBots",
            "vista-social": "Vista Social, social media management, social scheduling, content calendar, social inbox, approvals workflow, social analytics, marketing teams, agencies, BetterAiBots",
            "logome-complete-guide": "AI, Artificial Intelligence, Logome, AI Logo Generator, Logo Maker, Brand Kit Creator, AI Logo Maker, Logo Design, Brand Identity, Website Templates, Social Media Templates, Business Cards, Email Signatures, BetterAiBots",
            "datahawk": "DataHawk, Amazon analytics, Amazon keyword tracking, Amazon seller tools, marketplace analytics, product ranking, Amazon SEO, PPC insights, competitor monitoring, BetterAiBots",
            "elevenlabs": "ElevenLabs, AI voice, text-to-speech, voice cloning, AI voice generator, dubbing, audio localization, voiceover, AI audio, BetterAiBots",
            "gamma": "Gamma, AI presentations, AI slide deck, presentation builder, AI document generator, pitch deck, sales deck, web presentation, BetterAiBots",
            "rankprompt": "RankPrompt, AI SEO, content briefs, keyword research, SERP insights, SEO content planning, content outlines, SEO workflow, BetterAiBots",
            "snowfire-ai": "Snowfire AI, AI content generation, SEO content, ad copy, marketing content, content briefs, keyword research, content workflows, BetterAiBots",
            "volza": "Volza, trade intelligence, supplier discovery, shipment tracking, import export data, competitor analysis, market research, global trade data, BetterAiBots",
            "bidx": "Bidx, AI advertising optimization, performance marketing, ad campaign optimization, budget pacing, ROAS, PPC analytics, paid media, BetterAiBots",
            "laxis": "Laxis, AI meeting assistant, meeting notes, transcripts, meeting summaries, action items, meeting recorder, call summaries, productivity, BetterAiBots",
            "krispcall": "KrispCall, cloud phone system, business phone, AI call summaries, call routing, sales calls, support calls, VoIP, BetterAiBots",
            "getresponse": "GetResponse, email marketing, marketing automation, email campaigns, landing pages, conversion funnels, segmentation, newsletters, BetterAiBots",
            "creativescore": "CreativeScore, AI creative scoring, ad creative analysis, performance prediction, ad diagnostics, creative optimization, paid media, BetterAiBots"
          };
          return tagMap[article.id] || "AI, Artificial Intelligence, GPT, ChatGPT, AI Tools, BetterAiBots";
        })()} />
        <meta name="keywords" content={(() => {
          const keywordMap = {
            "blackbox-ai": "Blackbox.ai, AI code assistant, code completion, AI autocomplete, programming tools, software development, AI coding, code generation, developer tools, BetterAiBots",
            "webydo": "Webydo, web design platform, no-code design, website builder, CMS, client management, web development, design tools, BetterAiBots",
            "thordata": "ThorData, proxy service, web scraping, data collection, residential proxies, scraper APIs, AI data infrastructure, web data collection, BetterAiBots",
            "seosparkplug": "SEOSparkPlug, AI SEO platform, SEO analysis, SEO tools, digital marketing, website optimization, SEO automation, AI SEO tools, BetterAiBots",
            "catalister": "Catalister, dropshipping automation, e-commerce automation, Shopify integration, AI dropshipping, e-commerce tools, dropshipping platform, BetterAiBots",
            "airia": "Airia, enterprise AI, AI orchestration, AI agent development, enterprise automation, AI platform, rapid prototyping, BetterAiBots",
            "runpod": "RunPod, cloud GPU, GPU computing, AI training, AI model deployment, GPU infrastructure, serverless AI, cloud computing, BetterAiBots",
            "pipes-ai": "Pipes.ai, lead engagement, AI sales, lead generation, sales automation, AI voice, SMS marketing, lead qualification, BetterAiBots",
            "castmagic": "CastMagic, content creation, AI transcription, content repurposing, podcast tools, video content, multi-brand CMS, brand voice, BetterAiBots",
            "anybiz": "AnyBiz.io, AI sales agents, sales automation, lead generation, email automation, LinkedIn outreach, phone call automation, BetterAiBots",
            "megahr": "Mega HR, AI hiring, HR automation, recruitment, AI hiring assistant, Megan AI, hiring platform, candidate screening, BetterAiBots",
            "bebop-ai": "Bebop.ai, workflow automation, process optimization, AI automation, business automation, workflow management, intelligent automation, BetterAiBots",
            "lusha": "Lusha, B2B contact data, email finder, phone number lookup, sales intelligence, lead generation, CRM integration, verified contacts, sales prospecting, BetterAiBots",
            "hume-ai": "Hume AI, empathic AI, emotion recognition, voice AI, facial expression analysis, emotional intelligence, AI interactions, emotion detection, empathic computing, BetterAiBots",
            "tidio-ai": "Tidio AI, Lyro AI Agent, customer service automation, live chat, help desk, AI chatbot, customer support, automated support, customer service platform, BetterAiBots",
            "atria": "Atria, AI ad platform, ad analytics, ad creation, ad research, marketing automation, AI marketing tools, ad campaign management, 25M ad library, AI ad strategist, marketing workflow, ad asset management, BetterAiBots",
            "recomaze": "Recomaze, AI e-commerce, AI sales agent, AI discoverability, AI concierge, e-commerce AI, conversion optimization, cart uplift, AI recommendations, cookieless personalization, BetterAiBots",
            "vida-ai-agent-os": "Vida, Vida AI Agent OS, AI phone agents, AI agent operating system, omnichannel AI agents, AI phone calls, AI voice agents, AI customer service, AI workflow automation, enterprise AI agents, BetterAiBots",
            "plesk": "Plesk, web hosting control panel, server management, website administration, WordPress Toolkit, hosting control panel, server administration, domain management, hosting platform, BetterAiBots",
            "surecam": "SureCam, fleet dash cam, fleet safety, GPS tracking, video telematics, driver coaching, fleet management, dash camera, vehicle tracking, fleet protection, BetterAiBots",
            "diginius": "Diginius, PPC management, lead intelligence, B2B leads, intent leads, multi-channel reporting, Google Ads, Microsoft Ads, Facebook advertising, LinkedIn advertising, SEO monitoring, BetterAiBots",
            "smartli": "Smartli, AI content creation, product description generator, AI blog writer, AI ads writer, background remover, watermark remover, photo enhancer, UGC video generator, e-commerce content, BetterAiBots",
            "consensus": "Consensus, AI research tool, scientific papers, academic research, evidence-based answers, research synthesis, peer-reviewed sources, citation management, literature review, academic search, BetterAiBots",
            "browse-ai": "Browse AI, web scraping, data extraction, website monitoring, no-code scraping, web scraper, data extraction tool, website to API, website to spreadsheet, bot evasion, CAPTCHA handling, web data extraction, BetterAiBots",
            "museit-art-complete-guide": "Museit.art, AI art creation, AI art generator, creative AI, mindfulness art, digital art creation, AI art platform, art therapy, creative expression, no-code art, gallery-ready art, Nano Banana technology, BetterAiBots",
            "nanoz-complete-guide": "NanoZ.fun, AI branding, brand image generation, AI brand imagery, brand consistency, AI design tools, professional branding, brand asset management, AI image generation, brand workflow, organizational tools, BetterAiBots",
            "prezi-complete-guide": "Prezi, AI presentations, presentation software, interactive presentations, Prezi Video, visual storytelling, presentation design, AI presentation creator, open canvas presentations, dynamic presentations, presentation platform, BetterAiBots",
            "landingi-complete-guide": "Landingi, AI landing page builder, landing page creator, conversion optimization, lead generation, A/B testing, landing page design, drag-and-drop editor, landing page templates, marketing tools, landing page software, BetterAiBots",
            "tradify-complete-guide": "Tradify, job management software, trade business software, job management for trades, trade business management, electrician software, plumber software, HVAC software, job scheduling, trade invoicing, trade quoting, trade job tracking, digital timesheets, trade accounting integration, BetterAiBots",
            "vista-social": "Vista Social, social media management, social media scheduler, content calendar, unified inbox, approval workflows, social analytics, marketing teams, agency reporting, BetterAiBots",
            "logome-complete-guide": "Logome, AI logo generator, logo maker, brand kit creator, AI logo maker, logo design, brand identity, website templates, social media templates, business cards, email signatures, poster generator, flyer generator, AI branding, BetterAiBots",
            "datahawk": "DataHawk, Amazon analytics, Amazon keyword tracker, Amazon seller analytics, marketplace intelligence, product ranking tracker, Amazon SEO tool, PPC analytics, competitor tracking, Amazon sales analytics, BetterAiBots",
            "elevenlabs": "ElevenLabs, AI voice, text-to-speech, AI voice generator, voice cloning, dubbing, audio localization, voiceover software, AI audio tools, speech synthesis, BetterAiBots",
            "gamma": "Gamma, AI presentation tool, AI slide generator, pitch deck builder, presentation templates, AI doc builder, web presentation, presentation software, BetterAiBots",
            "rankprompt": "RankPrompt, AI SEO tool, keyword research, content brief generator, SERP analysis, SEO content outlines, prompt to outline, on-page optimization, SEO planning, BetterAiBots",
            "snowfire-ai": "Snowfire AI, AI content writer, SEO content generation, ad copy generator, marketing content, keyword research, content briefs, AI copywriting, content optimization, BetterAiBots",
            "volza": "Volza, trade data, supplier database, shipment data, import export intelligence, sourcing research, buyer supplier insights, global trade analytics, BetterAiBots",
            "bidx": "Bidx, ad optimization platform, AI marketing, performance insights, paid advertising analytics, campaign optimization, budget optimization, PPC tools, BetterAiBots",
            "laxis": "Laxis, AI meeting notes, meeting transcription, meeting summary tool, action item tracking, call recorder, meeting assistant, productivity tool, BetterAiBots",
            "krispcall": "KrispCall, virtual phone system, VoIP business phone, call tracking, call routing, AI call summary, CRM integration, business calling, BetterAiBots",
            "getresponse": "GetResponse, email marketing platform, marketing automation tool, email sequences, landing page builder, funnel builder, email list growth, BetterAiBots",
            "creativescore": "CreativeScore, ad creative scoring, creative analytics, ad performance prediction, creative testing, ad optimization, marketing analytics, BetterAiBots"
          };
          return keywordMap[article.id] || "AI, Artificial Intelligence, GPT, ChatGPT, AI Tools, BetterAiBots";
        })()} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.preview,
            "image": (() => {
              // Article-specific Open Graph images for better social sharing
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
                "museit-art-complete-guide": "https://betteraibots.com/assets/musebrand.jpg",
                "nanoz-complete-guide": "https://betteraibots.com/assets/nanozlogo.png",
                "prezi-complete-guide": "https://betteraibots.com/assets/preziai.png",
                "quillbot-complete-guide": "https://betteraibots.com/assets/quilbot.jpg",
                "landingi-complete-guide": "https://betteraibots.com/assets/landingi1.jpg",
                "vista-social": "https://betteraibots.com/assets/vistasocial.jpg",
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
              return ogImageMap[article.id] || primaryImage || article.cover;
            })(),
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
            "datePublished": article.date,
            "dateModified": article.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": pageUrl
            },
            "keywords": (() => {
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
              return keywordMap[article.id] || "AI, Artificial Intelligence, GPT, ChatGPT, AI Tools, BetterAiBots";
            })(),
            "articleSection": "AI Tools",
            "inLanguage": "en-US"
          })}
        </script>
      </Helmet>
      
      <div className={usesNewsStyleLayout ? "article-container" : ""} style={usesNewsStyleLayout ? {} : containerStyles}>
      {topShareSection}
      <div className={usesNewsStyleLayout ? "article-content" : ""} style={usesNewsStyleLayout ? {} : enhancedContentStyles}>
      {/* Top Image */}
      {primaryImage && (
        article.id === "seosparkplug" ? (
          <a 
            href="https://seosparkplug.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "catalister" ? (
          <a 
            href="https://join.catalister.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "airia" ? (
          <a 
            href="https://try.airia.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "runpod" ? (
          <a 
            href="https://get.runpod.io/w3na2cm4xdjp" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "pipes-ai" ? (
          <a 
            href="https://try.pipes.ai/hmqj0m3am6un" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "castmagic" ? (
          <a 
            href="https://get.castmagic.io/qdu0jfhfcurv" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "anybiz" ? (
          <a 
            href="https://anybiz.io/?fpr=ai4n56" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "megahr" ? (
          <a 
            href="https://try.megahr.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "bebop-ai" ? (
          <a 
            href="https://try.bebop.ai/o004cood3aod" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "lusha" ? (
          <a 
            href="https://partnerstack.lusha.com/w61xn76pa3sr" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "hume-ai" ? (
          <a 
            href="https://try.hume.ai/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "tidio-ai" ? (
          <a 
            href="https://affiliate.tidio.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "prezi-complete-guide" ? (
          <a 
            href="https://try.prezi.com/9kk83fjh4yri" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "quillbot-complete-guide" ? (
          <a 
            href="https://try.quillbot.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "nanoz-complete-guide" ? (
          <a 
            href="https://nanoz.fun" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "landingi-complete-guide" ? (
          <a 
            href="https://try.landingi.com/lwfc597yjm25" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "tradify-complete-guide" ? (
          <a 
            href="https://partners.tradifyhq.com/rh188vnbjrvr" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "rankprompt" ? (
          <a 
            href="https://join.rankprompt.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "snowfire-ai" ? (
          <a 
            href="https://partners.snowfire.ai/8f5vtlj0mksq" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "volza" ? (
          <a 
            href="https://partner.volza.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "logome-complete-guide" ? (
          <a 
            href="https://logomeai.partnerlinks.io/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "bidx" ? (
          <a 
            href="https://try.bidx.io/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "laxis" ? (
          <a 
            href="https://get.laxis.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "krispcall" ? (
          <a 
            href="https://try.krispcall.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "getresponse" ? (
          <a 
            href="https://try.getresponsetoday.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "creativescore" ? (
          <a 
            href="https://affiliate.creativescore.ai/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "databox" ? (
          <a 
            href="https://join.databox.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "descript" ? (
          <a 
            href="https://get.descript.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "unbounce" ? (
          <a 
            href="https://unbounce.partnerlinks.io/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "landbot" ? (
          <a 
            href="https://get.landbotlab.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "reclaim-ai" ? (
          <a 
            href="https://go.reclaim.ai/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "amplemarket" ? (
          <a 
            href="https://grow.amplemarket.com/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "mindstudio" ? (
          <a 
            href="https://get.mindstudio.ai/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : article.id === "seamless-ai-complete-guide" ? (
          <a 
            href="https://get.seamless.ai/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={primaryImage} alt="" style={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            />
          </a>
        ) : (
          <img src={primaryImage} alt="" style={{
            maxWidth: "600px",
            width: "auto",
            height: "auto",
            borderRadius: 16,
            margin: "0 0 24px 0",
            display: "block",
            objectFit: "contain"
          }} />
        )
      )}
      <h1 style={{
        fontSize: "2.0rem",
        fontWeight: 900,
        color: "#00FFB2",
        marginBottom: 4,
        lineHeight: 1.1,
        fontFamily: 'Inter, Arial, sans-serif',
        letterSpacing: 0.5
      }}>{article.title}</h1>
      <div style={{ color: "#b2ffe0", fontWeight: 400, marginBottom: 6, fontSize: "1.03rem" }}>
        {article.date}
      </div>
      <p style={{
        fontSize: "1.13rem",
        color: "#e9f7ee",
        marginBottom: 22,
        fontWeight: 400,
        lineHeight: 1.7,
        maxWidth: 700
      }}>{article.preview}</p>
      {video && (
        <div dangerouslySetInnerHTML={{ __html: video }} />
      )}
      {typeof restContent === "string" ? (
        <>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
            code: ({ node, children, ...props }) => {
              // Don't render code blocks that contain video HTML
              const codeContent = typeof children === 'string' ? children : String(children);
              if (codeContent.includes('youtube.com/embed') || codeContent.includes('<iframe')) {
                return null; // Don't render video HTML as code
              }
              return <code {...props}>{children}</code>;
            },
            pre: ({ node, children, ...props }) => {
              // Don't render pre blocks that contain video HTML
              const preContent = typeof children === 'string' ? children : String(children);
              if (preContent.includes('youtube.com/embed') || preContent.includes('<iframe')) {
                return null; // Don't render video HTML as code
              }
              return <pre {...props}>{children}</pre>;
            },
            div: ({ node, children, ...props }) => {
              // Check if this div contains an iframe (video)
              if (node?.properties?.dangerouslySetInnerHTML || 
                  (typeof children === 'string' && children.includes('iframe'))) {
                return <div {...props} dangerouslySetInnerHTML={{ __html: children }} />;
              }
              return <div {...props}>{children}</div>;
            },
            h2: ScholarGPTHeading,
            h3: ({ node, children, ...props }) => {
              // Extract text content from children, handling both strings and React elements
              const extractTextFromChildren = (children) => {
                if (typeof children === 'string') {
                  return children;
                }
                if (Array.isArray(children)) {
                  return children.map(child => {
                    if (typeof child === 'string') {
                      return child;
                    }
                    if (child && typeof child === 'object' && child.props && child.props.children) {
                      return extractTextFromChildren(child.props.children);
                    }
                    return '';
                  }).join('');
                }
                if (children && typeof children === 'object' && children.props && children.props.children) {
                  return extractTextFromChildren(children.props.children);
                }
                return '';
              };
              
              const headingText = extractTextFromChildren(children);
              const headingId = generateHeadingId(headingText);
              return (
                <h3 {...props} id={headingId} style={{ color: '#36ff95', fontWeight: 700, margin: '28px 0 10px 0', fontSize: '1.13rem', letterSpacing: 0.1 }}>{children}</h3>
              );
            },
            p: ({ children }) => <p>{children}</p>,
            strong: ({ children, ...props }) => {
              // Neon highlight for speaker names
              return highlightSpeakers(children);
            },
            ul: ({ children, ...props }) => (
              <ul style={{ paddingLeft: 20, margin: '16px 0' }}>{children}</ul>
            ),
            ol: ({ children, ...props }) => (
              <ol style={{ paddingLeft: 20, margin: '16px 0' }}>{children}</ol>
            ),
            li: ({ children, ...props }) => (
              <li style={{ marginBottom: 8, display: 'block' }}>{children}</li>
            ),
            img: ({ src, alt, ...props }) => {
              // Allow images that are part of article content (not user-submitted)
              // Wrap Recomaze and Vida images in affiliate links
              if (src && (src.includes('recomaze2') || src.includes('recomaze3'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://affiliate.recomaze.ai/BAIB"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              if (src && (src.includes('vidaai2') || src.includes('vida2'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://try.vida.io/BAIB"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              if (src && (src.includes('plesk2') || src.includes('plesk'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://try.plesk.com/BAIB"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              if (src && (src.includes('surecam2') || src.includes('surecam'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://join.surecam.com/BAIB"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              if (src && (src.includes('diginius2') || src.includes('diginius'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://get.diginius.com/rvao67pwqqux"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              if (src && (src.includes('smartli2') || src.includes('smartli'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://smartli.partnerlinks.io/BAIB"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              if (src && (src.includes('consensus2') || src.includes('consensus'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://get.consensus.app/BAIB"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              if (src && (src.includes('browseai2') || src.includes('browseai'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://partners.browse.ai/BAIB"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              if (src && (src.includes('prezi2') || src.includes('preziai') || src.includes('prezi'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://try.prezi.com/9kk83fjh4yri"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              if (src && (src.includes('landingi2') || src.includes('landingi1') || src.includes('landingi'))) {
                return (
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <a
                      href="https://try.landingi.com/lwfc597yjm25"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                        {...props}
                      />
                    </a>
                  </div>
                );
              }
              // Default image rendering
              return (
                <img
                  src={src}
                  alt={alt || ''}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    margin: '30px 0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                  {...props}
                />
              );
            },
            a: ({ href, children, ...props }) => {
              // Handle anchor links for TOC first
              if (href && href.startsWith('#')) {
                return (
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = href.substring(1);
                      const targetElement = document.getElementById(targetId);
                      if (targetElement) {
                        targetElement.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                    style={{ color: '#36ff95', textDecoration: 'underline', cursor: 'pointer' }}
                    {...props}
                  >
                    {children}
                  </a>
                );
              }
              
              // Handle internal article links (/learn/ routes)
              if (href && (href.startsWith('/learn/') || href.startsWith('https://betteraibots.com/learn/'))) {
                const articleId = href.replace(/^.*\/learn\//, '').replace(/\/$/, '');
                return (
                  <Link
                    to={`/learn/${articleId}`}
                    state={{ from: fromPage }}
                    onClick={() => window.scrollTo(0, 0)}
                    style={{ 
                      color: '#36ff95', 
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#00ffb2';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#36ff95';
                    }}
                    {...props}
                  >
                    {children}
                  </Link>
                );
              }
              
              // Check if this is the InVideo link
              if (href && href.includes('invideo.sjv.io')) {
                return (
                  <div style={{ textAlign: 'center', margin: '40px 0' }}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #36ff95 0%, #00ffb2 100%)',
                        color: '#1a1a1a',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 16px rgba(54, 255, 149, 0.3)',
                        transition: 'all 0.3s ease',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 16px rgba(54, 255, 149, 0.3)';
                      }}
                    >
                      {children}
                    </a>
                  </div>
                );
              }
              // Apollo.io CTA button with container
              if (href && href.includes('get.apollo.io')) {
                return (
                  <div style={{
                    textAlign: 'center',
                    margin: '40px 0',
                    padding: '30px',
                    background: 'linear-gradient(135deg, #1a3447 0%, #0f1a26 100%)',
                    borderRadius: 16,
                    border: '1px solid #36ff9522'
                  }}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #36ff95 0%, #00ffb2 100%)',
                        color: '#1a1a1a',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 16px rgba(54, 255, 149, 0.3)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 16px rgba(54, 255, 149, 0.3)';
                      }}
                    >
                      {children && typeof children[0] === 'string' ? children : 'Try Apollo Now →'}
                    </a>
                  </div>
                );
              }
              // Lindy.ai CTA button with container
              if (href && href.includes('try.lindy.ai')) {
                return (
                  <div style={{
                    textAlign: 'center',
                    margin: '40px 0',
                    padding: '30px',
                    background: 'linear-gradient(135deg, #1a3447 0%, #0f1a26 100%)',
                    borderRadius: 16,
                    border: '1px solid #36ff9522'
                  }}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #36ff95 0%, #00ffb2 100%)',
                        color: '#1a1a1a',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 16px rgba(54, 255, 149, 0.3)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 16px rgba(54, 255, 149, 0.3)';
                      }}
                    >
                      {children && typeof children[0] === 'string' ? children : 'Try Lindy.ai Now →'}
                    </a>
                  </div>
                );
              }
              // Viral Launch CTA button with container
              if (href && href.includes('affiliate.viral-launch.com')) {
                return (
                  <div style={{
                    textAlign: 'center',
                    margin: '40px 0',
                    padding: '30px',
                    background: 'linear-gradient(135deg, #1a3447 0%, #0f1a26 100%)',
                    borderRadius: 16,
                    border: '1px solid #36ff9522'
                  }}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #36ff95 0%, #00ffb2 100%)',
                        color: '#1a1a1a',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 16px rgba(54, 255, 149, 0.3)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 16px rgba(54, 255, 149, 0.3)';
                      }}
                    >
                      {children && typeof children[0] === 'string' ? children : 'Try Viral Launch Now →'}
                    </a>
                  </div>
                );
              }
              // Flowith CTA button with container
              if (href && href.includes('aff.flowith.io')) {
                return (
                  <div style={{
                    textAlign: 'center',
                    margin: '40px 0',
                    padding: '30px',
                    background: 'linear-gradient(135deg, #1a3447 0%, #0f1a26 100%)',
                    borderRadius: 16,
                    border: '1px solid #36ff9522'
                  }}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #36ff95 0%, #00ffb2 100%)',
                        color: '#1a1a1a',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 16px rgba(54, 255, 149, 0.3)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 16px rgba(54, 255, 149, 0.3)';
                      }}
                    >
                      {children && typeof children[0] === 'string' ? children : 'Try Flowith Now →'}
                    </a>
                  </div>
                );
              }
              // AdCreative CTA button with container
              if (href && href.includes('adcreative.ai')) {
                return (
                  <div style={{
                    textAlign: 'center',
                    margin: '40px 0',
                    padding: '30px',
                    background: 'linear-gradient(135deg, #1a3447 0%, #0f1a26 100%)',
                    borderRadius: 16,
                    border: '1px solid #36ff9522'
                  }}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #36ff95 0%, #00ffb2 100%)',
                        color: '#1a1a1a',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 16px rgba(54, 255, 149, 0.3)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 16px rgba(54, 255, 149, 0.3)';
                      }}
                    >
                      {children && typeof children[0] === 'string' ? children : 'Try AdCreative Now →'}
                    </a>
                  </div>
                );
              }
              // Share button styling
              if (href && (href.includes('twitter.com/intent/tweet') || href.includes('facebook.com/sharer') || href.includes('linkedin.com/sharing') || href.includes('mailto:') || href === '#' || (children && (children.toString().includes('Share on X') || children.toString().includes('Share on Facebook') || children.toString().includes('Share on LinkedIn') || children.toString().includes('Share via Email') || children.toString().includes('Copy Link'))))) {
                return (
                  <button
                    onClick={() => {
                      if (href.includes('mailto:')) {
                        window.location.href = href;
                      } else if (href === '#') {
                        // Copy link functionality with quick popup
                        // Always copy the article URL, not affiliate links
                        const articleUrl = `${window.location.origin}/learn/${window.location.pathname.split('/').pop()}`;
                        navigator.clipboard.writeText(articleUrl).then(() => {
                          // Create and show quick "Copied" popup
                          const popup = document.createElement('div');
                          popup.textContent = 'Copied!';
                          popup.style.cssText = `
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            background: linear-gradient(135deg, #36ff95 0%, #00ffb2 100%);
                            color: #1a1a1a;
                            padding: 12px 20px;
                            border-radius: 8px;
                            font-weight: 600;
                            font-size: 14px;
                            z-index: 10000;
                            box-shadow: 0 4px 16px rgba(54, 255, 149, 0.3);
                            transform: translateX(100%);
                            transition: transform 0.3s ease;
                          `;
                          
                          document.body.appendChild(popup);
                          
                          // Animate in
                          setTimeout(() => {
                            popup.style.transform = 'translateX(0)';
                          }, 10);
                          
                          // Remove after 2 seconds
                          setTimeout(() => {
                            popup.style.transform = 'translateX(100%)';
                            setTimeout(() => {
                              if (document.body.contains(popup)) {
                                document.body.removeChild(popup);
                              }
                            }, 300);
                          }, 2000);
                        });
                      } else {
                        window.open(href, '_blank');
                      }
                    }}
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #2a3a4a 0%, #1a2330 100%)',
                      color: '#36ff95',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      border: '1px solid #36ff9522',
                      margin: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #36ff95 0%, #00ffb2 100%)';
                      e.target.style.color = '#1a1a1a';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #2a3a4a 0%, #1a2330 100%)';
                      e.target.style.color = '#36ff95';
                    }}
                  >
                    {children}
                  </button>
                );
              }
              // Handle image links (affiliate links that contain images from markdown)
              // ReactMarkdown renders [![alt](img)](link) as <a><img /></a>
              // Check if this is an affiliate link and if children contains an img element
              if (href && (href.includes('affiliates.tryatria.com') || href.includes('affiliate.recomaze.ai') || href.includes('try.vida.io') || href.includes('try.plesk.com') || href.includes('join.surecam.com') || href.includes('get.diginius.com') || href.includes('smartli.partnerlinks.io') || href.includes('try.prezi.com') || href.includes('try.landingi.com') || href.includes('nanoz.fun') || href.includes('partners.tradifyhq.com') || href.includes('logomeai.partnerlinks.io'))) {
                try {
                  // Check if children contains an image element - use simple, safe checking
                  let hasImage = false;
                  if (children) {
                    // Handle single child that is an img
                    if (typeof children === 'object' && !Array.isArray(children) && children.type === 'img') {
                      hasImage = true;
                    }
                    // Handle array of children - check if any is an img
                    else if (Array.isArray(children)) {
                      hasImage = children.some(child => 
                        child && typeof child === 'object' && !Array.isArray(child) && child.type === 'img'
                      );
                    }
                  }
                  
                  if (hasImage) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          margin: '30px 0',
                          cursor: 'pointer'
                        }}
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  }
                } catch (e) {
                  // If check fails, fall through to default link styling
                  console.error("Error checking for image in link children:", e);
                }
              }
              // Default link styling
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#36ff95', textDecoration: 'underline' }}
                  {...props}
                >
                  {children}
                </a>
              );
            },
            table: ({ children, ...props }) => (
              <div style={{ overflowX: 'auto', margin: '20px 0' }}>
                <table {...props} style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '1px solid #36ff9522',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  {children}
                </table>
              </div>
            ),
            thead: ({ children, ...props }) => (
              <thead {...props} style={{ backgroundColor: '#1a1a1a' }}>
                {children}
              </thead>
            ),
            tbody: ({ children, ...props }) => (
              <tbody {...props}>
                {children}
              </tbody>
            ),
            tr: ({ children, ...props }) => (
              <tr {...props} style={{ borderBottom: '1px solid #36ff9522' }}>
                {children}
              </tr>
            ),
            th: ({ children, ...props }) => (
              <th {...props} style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: 'bold',
                color: '#36ff95',
                borderRight: '1px solid #36ff9522'
              }}>
                {children}
              </th>
            ),
            td: ({ children, ...props }) => (
              <td {...props} style={{
                padding: '12px 16px',
                borderRight: '1px solid #36ff9522',
                color: '#ffffff'
              }}>
                {children}
              </td>
            ),
          }}
        >
          {secondaryImages.length > 0 ? firstHalf : (processedContent || article.content)}
        </ReactMarkdown>
        {secondaryImages.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            margin: '40px 0',
            alignItems: 'center'
          }}>
            {secondaryImages.map((imgSrc, idx) => (
              affiliateLink ? (
                <a
                  key={idx}
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  <img 
                    src={imgSrc} 
                    alt="" 
                    style={{
                      width: "100%",
                      maxWidth: "600px",
                      height: "auto",
                      borderRadius: 16,
                      display: "block",
                      objectFit: "cover",
                      boxShadow: "0 4px 20px rgba(54, 255, 149, 0.2)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.02)";
                      e.target.style.boxShadow = "0 6px 24px rgba(54, 255, 149, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.2)";
                    }}
                  />
                </a>
              ) : (
                <img 
                  key={idx}
                  src={imgSrc} 
                  alt="" 
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    borderRadius: 16,
                    display: "block",
                    objectFit: "cover",
                    boxShadow: "0 4px 20px rgba(54, 255, 149, 0.2)"
                  }} 
                />
              )
            ))}
          </div>
        )}
        {secondaryImages.length > 0 && secondHalf && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {secondHalf}
          </ReactMarkdown>
        )}
        </>
      ) : (
        (processedContent || article.content)
      )}
      {/* Middle image before interview section */}
      {article.id === 'vetgpt' && images[1] && (
        <div style={{ textAlign: "center", margin: "38px 0 14px 0" }}>
          <img src={images[1]} alt="" style={{
            width: "70%",
            maxWidth: 370,
            borderRadius: 18,
            boxShadow: "0 0 16px #36ff9577"
          }} />
        </div>
      )}
      {/* Lower image at very bottom */}
      {images[2] && (
        <div style={{ textAlign: "center", margin: "38px 0 14px 0" }}>
          <img src={images[2]} alt="" style={{
            width: "70%",
            maxWidth: 370,
            borderRadius: 18,
            boxShadow: "0 0 16px #36ff9577"
          }} />
        </div>
      )}
      {/* Scholar GPT image and button at bottom */}
      {article.id === 'scholar-gpt' && (
        <>
          <div style={{ textAlign: "center", margin: "38px 0 16px 0" }}>
            <img
              src="/scholargpt.jpg"
              alt="Scholar GPT"
              style={{
                width: '100%',
                maxWidth: '420px',
                display: 'block',
                margin: '0 auto',
                borderRadius: 16
              }}
            />
          </div>
          <div style={{ textAlign: "center", margin: "16px 0 0 0" }}>
            <a
              href="https://chatgpt.com/g/g-kZ0eYXlJe-scholar-gpt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button className="openai-btn-standalone">Open Scholar GPT on OpenAI</button>
            </a>
          </div>
        </>
      )}
      {/* Open GPT Button for other articles (bottom, large) */}
      {article.id !== 'scholar-gpt' && (() => {
        const gptMap = {
          "paintr": {
            name: "PaintR",
            link: "https://chatgpt.com/g/g-6833f9d3f1f88191ba83263ab7a99ea7-paintr"
          },
          "vetgpt": {
            name: "VetGPT",
            link: "https://chatgpt.com/g/g-ZR0aH16CQ-vetgpt"
          },
          "ai-fitness-coach": {
            name: "Fitness Diet Workout PhD Coach",
            link: "https://chatgpt.com/g/g-ipOIcM229-fitness-workout-diet-phd-coach"
          },
          "cheat-coder": {
            name: "Cheat Coder",
            link: "https://chatgpt.com/g/g-684426fa2a588191aabb529e9ca6e26f-cheat-coder"
          }
        };
        const gpt = gptMap[article.id];
        if (!gpt) return null;
        return (
          <div style={{ textAlign: "center", margin: "38px 0 0 0" }}>
            <a
              href={gpt.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button className="openai-btn-standalone">{`Open ${gpt.name} on OpenAI`}</button>
            </a>
          </div>
        );
      })()}
      </div>
      {/* Bottom-centered share buttons */}
      {usesNewsStyleLayout ? (
        <div className="article-footer">
          {renderShareButtons()}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", margin: "32px 0 0 0" }}>
          <ShareButtons url={shareUrl} title={article.title} />
        </div>
      )}
      
      {/* Related Articles Section */}
      {(() => {
        const relatedArticles = findRelatedArticles(article, articles, 2);
        if (relatedArticles.length === 0) return null;
        
        return (
          <div style={{
            marginTop: '60px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(54, 255, 149, 0.2)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              marginBottom: '30px',
              color: '#36ff95'
            }}>
              Related Articles
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {relatedArticles.map((relatedArticle) => {
                // Use cover image directly (same as primaryImage - webpack processes it automatically)
                const relatedCover = relatedArticle.cover || null;
                
                return (
                  <Link
                    key={relatedArticle.id}
                    to={`/learn/${relatedArticle.id}`}
                    state={{ from: fromPage }}
                    onClick={() => window.scrollTo(0, 0)}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      background: 'linear-gradient(135deg, rgba(54, 255, 149, 0.05) 0%, rgba(26, 35, 48, 0.5) 100%)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(54, 255, 149, 0.2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(54, 255, 149, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(54, 255, 149, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(54, 255, 149, 0.2)';
                    }}
                  >
                    {relatedCover && (
                      <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#1a1a1a'
                      }}>
                        <img 
                          src={relatedCover} 
                          alt={relatedArticle.title}
                          style={{
                            width: '200px',
                            height: '200px',
                            maxWidth: '200px',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            transition: 'transform 0.3s ease'
                          }}
                          onError={(e) => {
                            // Fallback if image fails to load
                            console.error('Failed to load related article image:', relatedCover, 'for article:', relatedArticle.id);
                            e.target.style.display = 'none';
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                          }}
                        />
                      </div>
                    )}
                    <div style={{ padding: '20px' }}>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        marginBottom: '10px',
                        color: '#fff',
                        lineHeight: '1.4'
                      }}>
                        {relatedArticle.title}
                      </h3>
                      {relatedArticle.preview && (
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#b0b0b0',
                          lineHeight: '1.5',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          marginBottom: '10px'
                        }}>
                          {relatedArticle.preview}
                        </p>
                      )}
                      {relatedArticle.date && (
                        <p style={{
                          fontSize: '0.85rem',
                          color: '#36ff95',
                          margin: 0
                        }}>
                          {relatedArticle.date}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })()}
      </div>
    </>
  );
}



