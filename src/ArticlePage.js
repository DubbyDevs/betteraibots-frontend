import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articles } from "./Articles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ShareButtons({ url, title }) {
  // Copy link handler with quick popup
  const handleCopy = () => {
    // Always copy the article URL, not affiliate links
    const articleUrl = `${window.location.origin}/learn/${window.location.pathname.split('/').pop()}`;
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
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title.replace('Apollo.io', 'Apollo') + ' ' + url)}`}
        target="_blank" rel="noopener noreferrer" title="Share on Twitter"
        style={{ color: "#1da1f2", ...iconStyle }}>
        <svg height={iconSize} width={iconSize} viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 5.93c-.8.36-1.66.62-2.56.73a4.5 4.5 0 0 0 1.97-2.49 9.1 9.1 0 0 1-2.86 1.1A4.52 4.52 0 0 0 16.16 4a4.52 4.52 0 0 0-4.5 4.5c0 .35.04.7.1 1.02A12.82 12.82 0 0 1 3.13 4.67a4.51 4.51 0 0 0-.61 2.28c0 1.57.8 2.96 2.03 3.77a4.5 4.5 0 0 1-2.04-.56v.05c0 2.19 1.56 4.03 3.64 4.45a4.53 4.53 0 0 1-2.03.08c.57 1.78 2.23 3.09 4.2 3.12A9.06 9.06 0 0 1 2 19.54a12.79 12.79 0 0 0 6.94 2.03c8.33 0 12.89-6.89 12.89-12.89 0-.2 0-.41-.01-.61.88-.64 1.65-1.44 2.26-2.35z"/></svg>
      </a>
      {/* Facebook */}
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer" title="Share on Facebook"
        style={{ color: "#4267B2", ...iconStyle }}>
        <svg height={iconSize} width={iconSize} viewBox="0 0 24 24"><path fill="currentColor" d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
      </a>
      {/* SMS */}
      <a href={`sms:?body=${encodeURIComponent(title + ' ' + url)}`}
        title="Share via SMS" style={{ color: "#25d366", ...iconStyle }}>
        <svg height={iconSize} width={iconSize} viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4C2.897 2 2 2.897 2 4v14c0 1.103.897 2 2 2h14l4 4V4c0-1.103-.897-2-2-2zm0 15.172L18.828 16H4V4h16v13.172z"/></svg>
      </a>
      {/* Email */}
      <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
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

export default function ArticlePage() {
  const { id } = useParams();
  const location = useLocation();
  const article = articles.find(a => a.id === id);
  const fromPage = location.state?.from || (location.pathname.startsWith('/learn') ? '/learn' : '/');

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
      const shareAffiliateMap = {
        'apollo-io': 'https://get.apollo.io/BAIB'
      };
      const shareUrl = shareAffiliateMap[article.id] || pageUrl;
  const images = article.images || [];

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

  return (
    <div style={{
      maxWidth: 800,
      margin: "0 auto",
      padding: "0 12px",
      fontSize: "1.08rem",
      color: "#e9f7ee",
      lineHeight: 1.8,
      fontFamily: "inherit"
    }}>
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
            "adcreative-ai": "https://betteraibots.com/adcreative.png",
            "flowith-io": "https://betteraibots.com/flowith.jpg",
            "murf-ai-complete-guide": "https://betteraibots.com/murfai.png",
            "aisdr-complete-guide": "https://betteraibots.com/aisdr.png",
            "miro-complete-guide": "https://betteraibots.com/miro.png",
            "blackbox-ai": "https://betteraibots.com/blackbox-logo.png?v=2",
            "webydo": "https://betteraibots.com/webydo-logo.png?v=2",
            "thordata": "https://betteraibots.com/thordata-logo.png?v=2",
            "seosparkplug": "https://betteraibots.com/freeseoscore.jpg?v=2",
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
            "tidio-ai": "https://betteraibots.com/tidio2.jpg?v=2"
          };
          return ogImageMap[article.id] || images[0] || article.cover;
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
            "adcreative-ai": "https://betteraibots.com/adcreative.png",
            "flowith-io": "https://betteraibots.com/flowith.jpg",
            "murf-ai-complete-guide": "https://betteraibots.com/murfai.png",
            "aisdr-complete-guide": "https://betteraibots.com/aisdr.png",
            "miro-complete-guide": "https://betteraibots.com/miro.png",
            "blackbox-ai": "https://betteraibots.com/blackbox-logo.png?v=2",
            "webydo": "https://betteraibots.com/webydo-logo.png?v=2",
            "thordata": "https://betteraibots.com/thordata-logo.png?v=2",
            "seosparkplug": "https://betteraibots.com/freeseoscore.jpg?v=2",
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
            "tidio-ai": "https://betteraibots.com/tidio2.jpg?v=2"
          };
          return ogImageMap[article.id] || images[0] || article.cover;
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
            "tidio-ai": "AI, Artificial Intelligence, Tidio AI, Lyro AI Agent, Customer Service Automation, Live Chat, Help Desk, AI Chatbot, Customer Support, BetterAiBots"
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
            "tidio-ai": "Tidio AI, Lyro AI Agent, customer service automation, live chat, help desk, AI chatbot, customer support, automated support, customer service platform, BetterAiBots"
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
                "adcreative-ai": "https://betteraibots.com/adcreative.png",
                "flowith-io": "https://betteraibots.com/flowith.jpg",
                "murf-ai-complete-guide": "https://betteraibots.com/murfai.png",
                "aisdr-complete-guide": "https://betteraibots.com/aisdr.png",
                "miro-complete-guide": "https://betteraibots.com/miro.png",
                "blackbox-ai": "https://betteraibots.com/blackbox-logo.png?v=2",
                "webydo": "https://betteraibots.com/webydo-logo.png?v=2",
                "thordata": "https://betteraibots.com/thordata-logo.png?v=2",
                "seosparkplug": "https://betteraibots.com/freeseoscore.jpg?v=2",
                "catalister": "https://betteraibots.com/catalister2.jpg?v=2",
                "airia": "https://betteraibots.com/airiaaidemo.jpg?v=2",
                "runpod": "https://betteraibots.com/runpod.jpg?v=2",
                "pipes-ai": "https://betteraibots.com/pipesai.jpg?v=2",
                "castmagic": "https://betteraibots.com/castmagicai.jpg?v=2",
                "anybiz": "https://betteraibots.com/anybizio.jpg?v=2",
                "megahr": "https://betteraibots.com/megahr.jpg?v=2",
                "bebop-ai": "https://betteraibots.com/bebopaitools.jpg?v=2"
              };
              return ogImageMap[article.id] || images[0] || article.cover;
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
                "thordata": "ThorData, proxy service, web scraping, data collection, residential proxies, scraper APIs, AI data infrastructure, web data collection, BetterAiBots"
              };
              return keywordMap[article.id] || "AI, Artificial Intelligence, GPT, ChatGPT, AI Tools, BetterAiBots";
            })(),
            "articleSection": "AI Tools",
            "inLanguage": "en-US"
          })}
        </script>
      </Helmet>
      {/* Site Disclaimer */}
      <div style={{
        background: "rgba(255, 0, 0, 0.1)",
        border: "1px solid rgba(255, 0, 0, 0.3)",
        borderRadius: "8px",
        padding: "12px 16px",
        margin: "0 0 24px 0",
        textAlign: "center"
      }}>
        <p style={{
          color: "#ff6b6b",
          fontSize: "0.9rem",
          fontWeight: "600",
          margin: 0,
          lineHeight: 1.4
        }}>
          🔴 This site includes affiliate links and does not provide financial, legal, or medical advice. Bots are provided "as is" for entertainment and education only. Use at your own risk.
        </p>
      </div>
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
      {/* Top Image */}
      {images[0] && (
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            href="https://try.bebop.ai/BAIB" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
            <img src={images[0]} alt="" style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 16,
              margin: "0 0 24px 0",
              display: "block",
              objectFit: "cover",
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
          <img src={images[0]} alt="" style={{
            width: "200px",
            height: "200px",
            maxWidth: "100%",
            borderRadius: 16,
            margin: "0 0 24px 0",
            display: "block",
            objectFit: "cover"
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
      {typeof article.content === "string" ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
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
            img: () => null, // Prevent user-submitted inline images
            a: ({ href, children, ...props }) => {
              // Handle anchor links for TOC
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
          {article.content}
        </ReactMarkdown>
      ) : (
        article.content
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
      {/* Bottom-centered share buttons */}
      <div style={{ display: "flex", justifyContent: "center", margin: "32px 0 0 0" }}>
        <ShareButtons url={shareUrl} title={article.title} />
      </div>
    </div>
  );
}
