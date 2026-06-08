import { CATEGORY_SLUGS } from './constants';
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import helperLogo from './assets/findthebestaibotshelper.png';
import placeholderImg from './assets/bot-placeholder.webp';
import betteraibotslive from './assets/betteraibotslive.webp';
import betteraibotslive2 from './assets/betteraibotslive2.webp';
import betteraibotslive3 from './assets/betteraibotslive3.webp';
import betteraibotslive4 from './assets/betteraibotslive4.webp';
import betteraibotslive5 from './assets/betteraibotslive5.webp';
import betteraibotsunlock from './assets/betteraibotsunlock.webp';
import welcometobaib from './assets/welcometobaib.jpg';
import learnai from './assets/learnai.webp';
import learnai2 from './assets/learnai2.webp';
import learnai3 from './assets/learnai3.webp';
import learnai4 from './assets/learnai4.webp';
import learnai5 from './assets/learnai5.webp';
import learnai6 from './assets/learnai6.webp';
import ainews from './assets/ainews.webp';
import ainews2 from './assets/ainews2.webp';
import ainews3 from './assets/ainews3.webp';
import ainews4 from './assets/ainews4.webp';
import ainews5 from './assets/ainews5.webp';
import aitoolsdirectory from './assets/aitoolsdirectory.webp';
import aitoolsdirectory2 from './assets/aitoolsdirectory2.webp';
import aitoolsdirectory3 from './assets/aitoolsdirectory3.webp';
import aitoolsdirectory4 from './assets/aitoolsdirectory4.webp';
import freeaigpts from './assets/freeaigpts.webp';
import freeaigpts2 from './assets/freeaigpts2.webp';
import baibshow2 from './assets/baibshow2.webp';
import baibshow3 from './assets/baibshow3.webp';
import anybiz from './assets/anybiz.webp';
import catalisterai from './assets/catalisterai.webp';
import castmagicai from './assets/castmagicai.webp';
import runpod from './assets/runpod.webp';
import airiaai from './assets/airiaai.webp';
import bebopai from './assets/bebopai.webp';
import diginius1 from './assets/diginius1.jpg';
import megahr from './assets/megahr.webp';
import bidxai from './assets/bidxai.jpg';
import krispcallai from './assets/krispcallai.jpg';
import rankpromptai from './assets/rankpromptai.jpg';
import plesk1 from './assets/plesk1.jpg';
import surecam1 from './assets/surecam1.jpg';
import n8nicon from './assets/n8nicon.jpg';
import mindstudioai from './assets/mindstudioai.jpeg';
import instaglamorlogo from './assets/instaglamorlogo.png';
import ReCAPTCHA from "react-google-recaptcha";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Modal, Button, Form } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
  Link
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import GoogleAnalytics from "./GoogleAnalytics";
import Breadcrumbs from './components/Breadcrumbs';
import { bots } from './data/bots';
import { newsArticles } from './data/news';
import MyAI from "./MyAI";
import { freeAppsData, trialAppsData } from './data/appsData';
import Articles from "./Articles";
import ArticlePage from "./ArticlePage";
import AIQuiz from "./components/AIQuiz";
import IntermediateQuiz from "./components/IntermediateQuiz";
import AdvancedQuiz from "./components/AdvancedQuiz";
import LearnLevelSelector from "./components/LearnLevelSelector";
import Podcast from "./Podcast";
import About from "./About";
import VideoWatchPage from "./VideoWatchPage";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";





// ---- Category List ----
const CATEGORIES = [
  { name: "Productivity" },
  { name: "Education" },
  { name: "Lifestyle" },
  { name: "Music" },
  { name: "Health & Wellness" },
  { name: "Creative Tools" },
  { name: "Specialized Knowledge" }
];





// --- AUTH BUTTONS ---
function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <div style={{ color: 'var(--accent)', textAlign: "center" }}>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <button className="header-btn" onClick={() => loginWithRedirect()}>
          Admin Login
        </button>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, width: "100%" }}>
      <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
        {user?.email}
      </span>
      <button
        className="header-btn"
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      >
        Logout
      </button>
    </div>
  );
}

// --- Nav Tabs Bar ---
function NavTabsBar({ currentCategory, showCategoryBar, toggleCategoryBar }) {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  const tabClass = (path, extra = '') => {
    const active = isActive(path) ? ' nav-tab--active' : '';
    return `nav-tab${active}${extra ? ` ${extra}` : ''}`;
  };

  return (
    <nav className="nav-tabs-bar" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <Link to="/" className="nav-brand">
        <span className="brand-better">BetterAi</span>
        <span className="brand-bots">Bots</span>
      </Link>
      <Link to="/" className={tabClass('/')} tabIndex={0}>Home</Link>
      <Link to="/apps" className={tabClass('/apps')} tabIndex={0}>Apps</Link>
      <Link to="/learn" className={tabClass('/learn')} tabIndex={0}>Learn</Link>
      <Link to="/news" className={tabClass('/news')} tabIndex={0}>News</Link>
      <Link to="/Podcast" className={tabClass('/Podcast')} tabIndex={0}>Watch</Link>
      <Link to="/my-ai" className={tabClass('/my-ai', 'nav-tab--my-ai')} tabIndex={0}>My AI 🚀</Link>
      <ThemeToggle />
    </nav>
  );
}

// --- NEWS PAGE ---
function News({ searchValue }) {
  const [isSmallScreen, setIsSmallScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1150;
    }
    return false;
  });
  const [isNarrowScreen, setIsNarrowScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 900;
    }
    return false;
  });
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1150);
      setIsNarrowScreen(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Helper function to check if an article has a video
  const articleHasVideo = (articleSlug) => {
    const articlesWithVideos = [
      "beginners-guide-visual-collaboration-miro-prezi",
      "the-death-of-the-resume-why-companies-are-using-ai-to-hire-without-ever-reading-your-cv",
      "the-rise-of-ai-companions-why-millions-are-talking-to-chatbots-daily",
      "ai-productivity-stack-solo-founders-10-tools-run-business-alone-2025",
      "ai-remote-jobs-home-office-gold-rush-2025",
      "warmy-io-spam-folder-rebellion-email-deliverability",
      "why-small-businesses-beat-enterprise-ai-tools-2025",
      "ai-doctors-are-here-how-medical-diagnosis-ai-just-passed-human-accuracy",
      "ai-chip-wars-heat-up-nvidia-challenger-unexpected-source",
      "ai-job-boom-how-to-get-hired-in-the-ai-revolution",
      "openai-garlic-model-ai-just-leveled-up",
      "perplexity-parasite-seo-ranking-guide-48-hours",
      "how-to-build-content-creation-service-google-pomelli-tool",
      "3-ai-tools-generate-leads-businesses-2026"
    ];
    return articlesWithVideos.includes(articleSlug);
  };

  // Helper function to check if an article has audio
  const articleHasAudio = (articleSlug) => {
    const articlesWithAudio = [
      "how-to-use-ai-to-learn-anything-10x-faster",
      "ai-virtual-assistant-how-to-automate-tasks-2025",
      "sora-2-physics-reality-ai-video-revolution-2025",
      "ai-robotics-revolution-everything-you-own-2025",
      "nano-banana-game-changing-ai-image-editor",
      "nano-banana-pro-upgrade-whats-new",
      "alibaba-ai-revolution-53-billion-investment-2025"
    ];
    return articlesWithAudio.includes(articleSlug);
  };

  // Rotating image component for GPT-5 article
  const RotatingGPT5Image = ({ alt, className, style }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
      require('./assets/gpt5updates.webp'),
      require('./assets/gpt5updates2.webp')
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 10000); // 10 seconds

      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <img 
        src={images[currentImageIndex]} 
        alt={alt} 
        className={className}
        style={style}
      />
    );
  };

  // Function to format date based on screen size
  const formatDate = (dateString) => {
    if (!dateString) return 'Date unavailable';
    
    let date;
    
    // Try to parse the date string - handle common formats
    // Format: MM-DD-YYYY or MM-DD-YY
    if (dateString.includes('-')) {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        let month = parseInt(parts[0], 10) - 1; // Month is 0-indexed
        let day = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);
        
        // Handle 2-digit years (assume 2000s)
        if (year < 100) {
          year = year + 2000;
        }
        
        // Validate the date components
        if (!isNaN(month) && !isNaN(day) && !isNaN(year) && 
            month >= 0 && month <= 11 && 
            day >= 1 && day <= 31 && 
            year >= 2000 && year <= 2100) {
          date = new Date(year, month, day);
        }
      }
    }
    
    // If parsing failed, try standard Date constructor
    if (!date || isNaN(date.getTime())) {
      date = new Date(dateString);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      // If date is still invalid, return the original string or a fallback
      return dateString || 'Date unavailable';
    }
    
    if (isSmallScreen) {
      // Show numbered date format (MM-DD-YY) for screens < 1150px
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${month}-${day}-${year}`;
    } else {
      // Show full date on larger screens
      try {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      } catch (e) {
        // Fallback if toLocaleDateString fails on some devices
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
      }
    }
  };

  // Filter news articles based on search value (ensure no duplicates)
  const filteredNewsArticles = newsArticles.filter(article => {
    const searchTerm = searchValue.toLowerCase();
    return article.title.toLowerCase().includes(searchTerm) ||
           article.excerpt.toLowerCase().includes(searchTerm) ||
           article.category.toLowerCase().includes(searchTerm) ||
           article.author.toLowerCase().includes(searchTerm);
  });


  return (
    <>
      <Helmet>
        <title>AI Bots & Tools News – BetterAiBots.com</title>
        <meta name="description" content="Latest news, updates, and insights from the world of AI bots and artificial intelligence." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:title" content="AI Bots & Tools News – BetterAiBots.com" />
        <meta property="og:description" content="Stay informed with the latest AI news, bot updates, and industry insights." />
        <meta property="og:url" content="https://betteraibots.com/news" />
        <link rel="canonical" href="https://betteraibots.com/news" />
      </Helmet>
      
      <div className="hero-section">
        <h1 className="hero-headline">AI News & Updates</h1>
        <p className="hero-subheadline custom-hero-desc">
          Stay informed with the latest developments in AI bots, artificial intelligence, and emerging technologies.
        </p>
      </div>

      {/* Search Results Indicator */}
      {searchValue && (
        <div style={{ 
          padding: '10px 20px', 
          textAlign: 'center', 
          backgroundColor: '#f0f8ff', 
          border: '1px solid #36ff95',
          margin: '10px 20px',
          borderRadius: '5px',
          color: '#333333'
        }}>
          <strong>Search Results:</strong> Showing {filteredNewsArticles.length} article{filteredNewsArticles.length !== 1 ? 's' : ''} matching "{searchValue}"
        </div>
      )}

      <div className="news-container">
        {/* Featured Article */}
        {filteredNewsArticles.filter(article => article.featured).map(article => (
          <article key={article.id} className="featured-news-article">
            <Link to={`/news/${article.slug}`} className="featured-news-image-link">
              <div className="featured-news-image">
                {article.slug === "gpt-5-dawn-ai-revolution-2025" ? (
                  <RotatingGPT5Image alt={article.title} />
                ) : (
                  <img src={article.image} alt={article.title} />
                )}
              </div>
            </Link>
            <div className="featured-news-content">
              <h2 className="featured-news-title">{article.title}</h2>
              <p className="featured-news-excerpt">{article.excerpt}</p>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                <Link to={`/news/${article.slug}`} className="read-more-btn">Read Full Article</Link>
                {articleHasAudio(article.slug) && (
                  <Link 
                    to={`/news/${article.slug}#play-audio`} 
                    className="read-more-btn"
                    style={{
                      background: "linear-gradient(135deg, #0bbfdb 0%, #36ff95 100%)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: isNarrowScreen ? "0" : "8px"
                    }}
                  >
                    {!isNarrowScreen && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                    Play
                  </Link>
                )}
                {articleHasVideo(article.slug) && (
                  <Link 
                    to={`/news/${article.slug}#play-video`} 
                    className="read-more-btn"
                    style={{
                      background: "linear-gradient(135deg, #0bbfdb 0%, #36ff95 100%)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: isNarrowScreen ? "0" : "8px"
                    }}
                  >
                    {!isNarrowScreen && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                    {isNarrowScreen ? "Watch" : "Watch Video"}
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* News Grid */}
        <div className="news-grid">
          {(() => {
            const nonFeaturedArticles = filteredNewsArticles
              .filter(article => !article.featured)
              .sort((a, b) => new Date(b.date) - new Date(a.date));
            
            const totalArticles = filteredNewsArticles.length;
            const isEvenTotal = totalArticles % 2 === 0;
            
            // If even total, render all but the last article in the grid
            // If odd total, render all articles in the grid
            const articlesToRenderInGrid = isEvenTotal 
              ? nonFeaturedArticles.slice(0, -1) 
              : nonFeaturedArticles;
            
            return articlesToRenderInGrid.map(article => (
              <article key={article.id} className="news-card">
                <Link to={`/news/${article.slug}`} className="news-card-image-link">
                  <div className="news-card-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                </Link>
                <div className="news-card-content">
                  <Link to={`/news/${article.slug}`} className="news-card-title-link">
                    <h3 className="news-card-title">{article.title}</h3>
                  </Link>
                  <p className="news-card-excerpt">{article.excerpt}</p>
                  <div className="news-card-bottom-section" style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    width: "100%",
                    gap: "8px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                      <span className="news-date">{formatDate(article.date)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Link to={`/news/${article.slug}`} className="read-more-btn-small">Read Full Article</Link>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      {articleHasAudio(article.slug) && (
                        <Link 
                          to={`/news/${article.slug}#play-audio`} 
                          className="read-more-btn-small"
                          style={{
                            background: "linear-gradient(135deg, #0bbfdb 0%, #36ff95 100%)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: isNarrowScreen ? "0" : "6px",
                            padding: isNarrowScreen ? "8px" : "8px 14px",
                            fontSize: "0.85rem",
                            minWidth: isNarrowScreen ? "36px" : "auto"
                          }}
                          title="Play"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          {!isNarrowScreen && "Play"}
                        </Link>
                      )}
                      {articleHasVideo(article.slug) && (
                        <Link 
                          to={`/news/${article.slug}#play-video`} 
                          className="read-more-btn-small"
                          style={{
                            background: "linear-gradient(135deg, #0bbfdb 0%, #36ff95 100%)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: isNarrowScreen ? "0" : "6px",
                            padding: isNarrowScreen ? "8px" : "8px 14px",
                            fontSize: "0.85rem",
                            minWidth: isNarrowScreen ? "36px" : "auto"
                          }}
                          title="Watch Video"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          {!isNarrowScreen && "Watch"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ));
          })()}
        </div>

        {/* Bottom Featured Article for Even Total */}
        {(() => {
          const nonFeaturedArticles = filteredNewsArticles
            .filter(article => !article.featured)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          
          const totalArticles = filteredNewsArticles.length;
          const isEvenTotal = totalArticles % 2 === 0;
          
          if (isEvenTotal && nonFeaturedArticles.length > 0) {
            const lastArticle = nonFeaturedArticles[nonFeaturedArticles.length - 1];
            return (
              <article key={lastArticle.id} className="featured-news-article">
                <Link to={`/news/${lastArticle.slug}`} className="featured-news-image-link">
                  <div className="featured-news-image">
                    <img src={lastArticle.image} alt={lastArticle.title} />
                  </div>
                </Link>
                <div className="featured-news-content">
                  <h2 className="featured-news-title">{lastArticle.title}</h2>
                  <p className="featured-news-excerpt">{lastArticle.excerpt}</p>
                  <div className="featured-news-meta">
                    <span className="news-author">By {lastArticle.author}</span>
                    <span className="news-date">{formatDate(lastArticle.date)}</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                    <Link to={`/news/${lastArticle.slug}`} className="read-more-btn">Read Full Article</Link>
                    {articleHasVideo(lastArticle.slug) && (
                      <Link 
                        to={`/news/${lastArticle.slug}#play-video`} 
                        className="read-more-btn"
                        style={{
                          background: "linear-gradient(135deg, #0bbfdb 0%, #36ff95 100%)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: isNarrowScreen ? "0" : "8px"
                        }}
                      >
                        {!isNarrowScreen && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                        {isNarrowScreen ? "Watch" : "Watch Video"}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          }
          return null;
        })()}

        {/* Newsletter Signup */}
        <div className="newsletter-signup">
          <div className="newsletter-content">
            <h3>Stay Updated with AI News</h3>
            <p>Get the latest AI developments, bot updates, and industry insights delivered to your inbox.</p>
          </div>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
    </div>

    </>
  );
}

// Constant array for paid apps - defined outside component for stable reference
const PAID_APPS = [
  {
    name: "MindStudio",
    description: "AI agent builder platform that lets you create custom AI assistants and workflows without coding",
    category: "AI & Automation",
    features: ["No-code AI agent builder", "Custom workflows", "API integrations", "Multi-agent systems"],
    price: "Contact sales",
    link: "https://get.mindstudio.ai/BAIB",
    image: mindstudioai,
    readMoreLink: "/learn/mindstudio"
  },
  {
    name: "RunPod",
    description: "Cloud GPU platform for training, fine-tuning, and deploying AI models with zero infrastructure management",
    category: "AI Infrastructure",
    features: ["On-demand GPUs", "Serverless AI workloads", "Instant scaling", "Global deployment"],
    price: "Pay per use",
    link: "https://get.runpod.io/w3na2cm4xdjp",
    image: runpod,
    readMoreLink: "/learn/runpod"
  },
  {
    name: "Viral Launch AI",
    description: "AI-powered Amazon selling platform with product research, keyword tools, and listing optimization",
    category: "E-commerce & Amazon",
    features: ["Product discovery", "Market intelligence", "Keyword research", "Listing optimization"],
    price: "$48-$199/month",
    link: "https://affiliate.viral-launch.com/BAIB",
    image: "/virallaunch.png",
    readMoreLink: "/learn/viral-launch"
  },
  {
    name: "OmniSEO",
    description: "AI search visibility platform to monitor and optimize your brand across ChatGPT, Perplexity, AI Overviews, and other AI engines",
    category: "SEO & Digital Marketing",
    features: ["ChatGPT & Perplexity trackers", "AI Overview monitoring", "Citation tracking", "Competitor analysis", "Prompt volume checker"],
    price: "Plans from 50% off first month",
    link: "https://get.omniseo.com/BAIB",
    image: "/omniseo.png",
    readMoreLink: "/learn/omniseo"
  },
  {
    name: "Compliancely",
    description: "Compliance platform for real-time TIN matching, identity verification, IRS tax transcripts, and KYB/KYC checks for fintech, lending, and onboarding",
    category: "Compliance & Verification",
    features: ["Real-time TIN matching", "Identity verification & watchlist screening", "IRS tax transcripts", "Bulk TIN matching", "I-9 / E-Verify", "Address & business verification"],
    price: "Request demo",
    link: "https://get.compliancely.com/gwmdzyd8i95g",
    image: "/compailogo.png",
    readMoreLink: "/learn/compliancely"
  },
  {
    name: "Teikametrics",
    description: "AI marketplace optimization platform for Amazon, Walmart, and TikTok Shop with full-funnel advertising, listing optimization, and analytics",
    category: "E-commerce & Marketplace Analytics",
    features: ["Multi-marketplace management", "Full-funnel ad optimization", "AI listing generation", "Actionable analytics", "Shareable dashboards", "Marketplace expert support"],
    price: "SMB free trial / Demo for teams",
    link: "https://join.teikametrics.com/BAIB",
    image: "/telkalogo.jpg",
    readMoreLink: "/learn/teikametrics"
  },
  {
    name: "AiSDR",
    description: "AI sales development representative that books meetings with your ideal prospects through personalized outreach",
    category: "Sales & CRM",
    features: ["AI prospecting", "Personalized emails", "LinkedIn automation", "HubSpot integration"],
    price: "$900/month",
    link: "https://partner.aisdr.com/5fxea2u5m85d",
    image: "/aisdr.png",
    readMoreLink: "/learn/aisdr-complete-guide"
  },
  {
    name: "CastMagic",
    description: "AI-powered content operating system that transforms video/audio files into 100+ content assets",
    category: "Content Creation & Media",
    features: ["AI transcription", "Content repurposing", "Multi-brand CMS", "Brand voice training"],
    price: "From $19/month",
    link: "https://get.castmagic.io/qdu0jfhfcurv",
    image: castmagicai,
    readMoreLink: "/learn/castmagic"
  },
  {
    name: "AnyBiz",
    description: "AI sales agents that generate meetings and sales for any business through email, LinkedIn, and phone calls",
    category: "Sales & Lead Generation",
    features: ["AI sales agents", "Email automation", "LinkedIn outreach", "Phone call automation"],
    price: "Contact sales",
    link: "https://anybiz.io/?fpr=ai4n56",
    image: anybiz,
    readMoreLink: "/learn/anybiz"
  },
  {
    name: "Mega HR",
    description: "AI-powered hiring platform that automates job advertising, screening, interviewing & nurturing candidates with 78% less busy work",
    category: "HR & Recruitment",
    features: ["AI screening & shortlisting", "Interview scheduling", "AI-powered insights", "Job board advertising"],
    price: "$49-$149/month",
    link: "https://try.megahr.com/BAIB",
    image: megahr,
    readMoreLink: "/learn/megahr"
  },
  {
    name: "InstaGlamor",
    description: "Premium human-directed + AI-powered photography studio for executive portraits, lifestyle imagery, products, and brand visuals",
    category: "Photography & Branding",
    features: [
      "Business & executive portraits",
      "Custom glamour & lifestyle looks",
      "Professional product photography",
      "Company branding and team imagery"
    ],
    price: "Per package",
    link: "https://www.InstaGlamor.com",
    image: instaglamorlogo,
    readMoreLink: "/learn/instaglamor"
  },
  {
    name: "Bebop.ai",
    description: "AI-powered platform for intelligent automation and workflow optimization",
    category: "AI & Automation",
    features: ["AI workflow automation", "Intelligent process optimization", "Smart integrations", "Advanced analytics"],
    price: "Contact sales",
    link: "https://try.bebop.ai/o004cood3aod",
    image: bebopai,
    readMoreLink: "/learn/bebop-ai"
  },
  {
    name: "Catalister",
    description: "AI-powered platform for dropshipping and e-commerce automation with Shopify integration",
    category: "E-commerce & Dropshipping",
    features: ["Shopify integration", "AI product sourcing", "Automated order fulfillment", "Inventory management"],
    price: "From $29/month",
    link: "https://join.catalister.com/BAIB",
    image: catalisterai,
    readMoreLink: "/learn/catalister"
  },
  {
    name: "Bidx",
    description: "AI-powered advertising optimization platform for managing and scaling performance campaigns",
    category: "Marketing & Advertising",
    features: ["Campaign optimization", "Performance insights", "Budget pacing", "Automated recommendations"],
    price: "Contact sales",
    link: "https://try.bidx.io/BAIB",
    image: bidxai,
    readMoreLink: "/learn/bidx"
  },
  {
    name: "Bitdefender",
    description: "Global cybersecurity leader with AI-powered threat prevention for home, small business, and enterprise—antivirus, VPN, identity protection, and GravityZone",
    category: "Cybersecurity & Privacy",
    features: ["AI threat detection", "Real-time malware & ransomware protection", "Premium VPN", "Identity theft protection", "GravityZone for teams", "Scamio AI scam detector"],
    price: "From ~$35/year (consumer)",
    link: "https://get.bitdefender.com/BAIB",
    image: "/bitdefenderlogo.png",
    readMoreLink: "/learn/bitdefender-complete-guide"
  },
  {
    name: "n8n",
    description: "Open-source workflow automation platform for connecting apps and services",
    category: "Workflow Automation",
    features: ["Visual workflow builder", "200+ integrations", "Self-hosted option", "Enterprise features"],
    price: "$20-$50/month",
    link: "https://n8n.partnerlinks.io/wjt1744jflsx",
    image: n8nicon,
    readMoreLink: "/news/n8n-revolution-business-automation-2025"
  },
  {
    name: "KrispCall",
    description: "Cloud phone system with AI calling features for sales, support, and global teams",
    category: "Sales & Customer Support",
    features: ["Business phone numbers", "Call routing", "AI call summaries", "CRM integrations"],
    price: "From $15/month",
    link: "https://try.krispcall.com/BAIB",
    image: krispcallai,
    readMoreLink: "/learn/krispcall"
  },
  {
    name: "Treble AI",
    description: "Official WhatsApp Business API platform with AI chatbots, broadcast campaigns, CRM integrations, and multi-agent live chat for sales and support",
    category: "WhatsApp & Messaging",
    features: ["Official WhatsApp BSP", "AI chatbot builder", "Broadcast campaigns", "HubSpot & Salesforce sync", "Lead qualification AI", "Human handoff to agents"],
    price: "Free to start",
    link: "https://trebleai.partnerlinks.io/91f6vx0zwova",
    image: "/trebleai.jpg",
    readMoreLink: "/learn/treble-ai"
  },
  {
    name: "RankPrompt",
    description: "AI-powered SEO platform that turns prompts into search-ready content briefs, outlines, and keyword-driven page plans",
    category: "SEO & Content",
    features: ["Keyword research", "Content briefs", "SERP insights", "Prompt-to-outline workflow", "Optimization recommendations"],
    price: "Contact sales",
    link: "https://join.rankprompt.com/BAIB",
    image: rankpromptai,
    readMoreLink: "/learn/rankprompt"
  },
  {
    name: "Rebolt",
    description: "AI-powered marketing platform for home-service businesses—managed websites that rank, CRM, reviews, quotes, and Google Business Profile optimization",
    category: "Marketing & Websites",
    features: ["AI-built website in ~24 hours", "No upfront website cost", "CRM & marketing kit", "Google Business Profile optimizer", "Reviews & quotes", "Dedicated project manager"],
    price: "From $224/mo (promo)",
    link: "https://join.rebolthq.com/BAIB",
    image: "/reboltai.jpg",
    readMoreLink: "/learn/rebolt-complete-guide"
  },
  {
    name: "Calilio",
    description: "AI-powered cloud VoIP phone system with virtual numbers from 100+ countries, real-time transcription, sentiment analysis, and CRM integrations",
    category: "Sales & Customer Support",
    features: ["Virtual numbers in 100+ countries", "AI call reports & summaries", "Real-time transcription", "Sentiment analysis", "Power dialer & IVR", "CRM integration"],
    price: "From $15/user/month",
    link: "https://try.calilio.com/BAIB",
    image: "/caliliologo.webp",
    readMoreLink: "/learn/calilio-complete-guide"
  },
  {
    name: "Airia",
    description: "Enterprise AI orchestration platform that accelerates agent development from concept to production with rapid prototyping and intelligent operations",
    category: "AI & Enterprise Automation",
    features: ["Rapid agent prototyping", "Data integration", "Intelligent AI operations", "Security & governance"],
    price: "Contact sales",
    link: "https://try.airia.com/BAIB",
    image: airiaai,
    readMoreLink: "/learn/airia"
  },
  {
    name: "Plesk",
    description: "Web hosting control panel and server management platform for managing websites, domains, and server infrastructure",
    category: "Web Hosting & Server Management",
    features: ["Website management", "Server administration", "WordPress Toolkit", "Multi-domain hosting"],
    price: "From €6.60/month",
    link: "https://try.plesk.com/BAIB",
    image: plesk1,
    readMoreLink: "/learn/plesk"
  },
  {
    name: "SureCam",
    description: "AI-powered fleet dash cam system with GPS tracking, live video streaming, and driver coaching to protect your fleet and reduce costs",
    category: "Fleet Management & Safety",
    features: ["AI-powered dash cams", "GPS tracking", "Live video streaming", "Driver safety scores"],
    price: "Contact sales",
    link: "https://join.surecam.com/BAIB",
    image: surecam1,
    readMoreLink: "/learn/surecam"
  },
  {
    name: "Diginius",
    description: "All-in-one PPC management and lead intelligence platform that consolidates data from Google, Microsoft, Facebook, LinkedIn, and more",
    category: "Marketing & PPC Management",
    features: ["Multi-channel reporting", "B2B lead intelligence", "Intent leads", "SEO monitoring"],
    price: "From $75/month",
    link: "https://get.diginius.com/rvao67pwqqux",
    image: diginius1,
    readMoreLink: "/learn/diginius"
  },
  {
    name: "Evolve AI",
    description: "AI-native training platform for enterprise L&D with course generation, simulations, LMS, assessments, and knowledge base in one modular stack",
    category: "Learning & Training",
    features: ["AI course generation", "Job-critical simulations", "Enterprise LMS", "Assessment Center", "Knowledge base", "SCORM export"],
    price: "Contact sales",
    link: "https://go.evolveplatform.ai/9lwvqqq20p28",
    image: "/evolveai.jpg",
    readMoreLink: "/learn/evolve-complete-guide"
  },
  {
    name: "AliDrop",
    description: "AliExpress, Alibaba, and Temu dropshipping automation with one-click imports, US/EU suppliers, and Shopify order fulfillment",
    category: "E-commerce & Dropshipping",
    features: ["One-click product import", "Automated order fulfillment", "Shopify integration", "US/EU suppliers", "Trending product discovery"],
    price: "7-day free trial",
    link: "https://get.alidrop.co/a1gll4u5mi12",
    image: "/alidrop.png",
    readMoreLink: "/learn/alidrop-complete-guide"
  }
];

// Comprehensive disclaimer messages for ticker - covers all liabilities
const tickerMessages = [
  "⚠️ DISCLAIMER: BetterAiBots.com is an independent directory. Some content is AI-generated and may contain errors, inaccuracies, or outdated information. We do not review, vet, or verify all content accuracy.",
  "🔗 AFFILIATE DISCLOSURE: Assume all apps, tools, and services listed on BetterAiBots.com may have affiliate partnerships. We may earn commissions at no extra cost to you. This never affects our recommendations.",
  "🤖 AI-generated content, AI characters, and third-party tools are provided 'as is' without warranties. Use at your own risk. Always verify information independently.",
  "📝 Information may be incomplete, outdated, biased, or contain mistakes. BetterAiBots.com is not responsible for any errors, omissions, or outcomes from using listed tools or content.",
  "⚖️ BetterAiBots.com provides no financial, legal, medical, or professional advice. Consult qualified professionals for important decisions. We are not liable for any damages or losses.",
  "🔍 We do not own, operate, or control any AI tools, GPTs, or services listed. All trademarks and content belong to their respective owners. Use third-party services at your own risk."
];

// Category grouping - map similar categories to unified names
const CATEGORY_GROUPS = {
  'Sales & Marketing': [
    'Sales & CRM', 
    'Sales & Lead Generation', 
    'Sales & Market Intelligence',
    'Marketing & Advertising', 
    'Marketing & Web Design', 
    'Marketing & Landing Pages',
    'SEO & Marketing', 
    'SEO & Digital Marketing',
    'SEO & Content',
    'Marketing & PPC Management'
  ],
  'Content Creation': [
    'Content Creation & Media', 
    'Content Creation & Monetization',
    'Writing & Analysis', 
    'Writing & Editing',
    'Chat & Writing', 
    'Presentations & Docs',
    'Creative & Design',
    'Multimodal AI',
    // Also include video/audio since they're for creating content
    'Video & Audio Editing', 
    'Video Creation', 
    'Video Creation & Editing',
    'Voice & Audio AI',
    'Video Editing'
  ],
  'Video & Audio': [
    'Video & Audio Editing', 
    'Video Creation', 
    'Video Creation & Editing',
    'Voice & Audio AI',
    'Video Editing'
  ],
  'E-commerce': [
    'E-commerce & Marketplace Analytics', 
    'E-commerce & Dropshipping', 
    'E-commerce & Amazon',
    'E-commerce & Personalization',
    'Web Design & E-commerce'
  ],
  'Data & Analytics': [
    'Data Extraction & Web Scraping', 
    'Business Analytics & Data Visualization',
    'Data Analytics & Business Intelligence',
    'Research & Education',
    // Include e-commerce analytics since they're data tools
    'E-commerce & Marketplace Analytics',
    // Include sales market intelligence since it's analytics
    'Sales & Market Intelligence'
  ],
  'Email & Communication': [
    'Email Marketing & Automation', 
    'Email Marketing',
    'Sales & Customer Support',
    'Customer Support & Engagement'
  ],
  'AI & Development': [
    'AI & Machine Learning', 
    'Development & Coding', 
    'AI Infrastructure',
    'Web Design & Development',
    // Include automation & workflow
    'Workflow Automation', 
    'AI & Automation', 
    'AI & Enterprise Automation', 
    'Chatbots & Automation',
    // Include web design categories
    'Marketing & Web Design',
    'Web Design & E-commerce'
  ],
  'Productivity': [
    'Productivity & Meetings', 
    'Productivity & Personal Assistant',
    'Productivity & Collaboration',
    'Productivity & Time Management',
    'Productivity & Voice AI'
  ],
  'Business Management': [
    'Business Management',
    // Include email & communication
    'Email Marketing & Automation', 
    'Email Marketing',
    'Sales & Customer Support',
    'Customer Support & Engagement',
    // Include productivity
    'Productivity & Meetings', 
    'Productivity & Personal Assistant',
    'Productivity & Collaboration',
    'Productivity & Time Management',
    'Productivity & Voice AI'
  ],
  'HR & Recruitment': [
    'HR & Recruitment',
    'Learning & Training'
  ],
  'Web & Hosting': [
    'Web Hosting & Server Management'
  ],
  'Fleet Management': [
    'Fleet Management & Safety'
  ]
};

// --- APPS PAGE ---
function Apps() {  
  const [activeSection, setActiveSection] = useState('trial');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { section: sectionFromUrl } = useParams();
  const [progressMode, setProgressMode] = useState(() => {
    const saved = localStorage.getItem('baib_progress_mode');
    return saved === 'true';
  });
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('baib_progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Update activeSection when URL changes
  useEffect(() => {
    if (sectionFromUrl && ['free', 'trial', 'paid'].includes(sectionFromUrl)) {
      setActiveSection(sectionFromUrl);
    }
  }, [sectionFromUrl]);
  
  // Handle window resize for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for changes to baib_progress in other components (like MyAI)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('baib_progress');
      if (saved) setUserProgress(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorageChange);
    // Also poll occasionally because 'storage' event only fires between different windows
    const interval = setInterval(handleStorageChange, 2000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('baib_progress_mode', progressMode);
  }, [progressMode]);

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Get all unique categories from all app sources and map them to groups
  const allCategories = useMemo(() => {
    const categoryMap = new Map();
    const allRawCategories = new Set();
    
    // Collect all raw categories
    freeAppsData.forEach(app => app.category && allRawCategories.add(app.category));
    trialAppsData.forEach(app => app.category && allRawCategories.add(app.category));
    PAID_APPS.forEach(app => app.category && allRawCategories.add(app.category));
    
    // Map raw categories to grouped categories
    Array.from(allRawCategories).forEach(rawCat => {
      let found = false;
      for (const [groupName, groupCats] of Object.entries(CATEGORY_GROUPS)) {
        if (groupCats.includes(rawCat)) {
          if (!categoryMap.has(groupName)) {
            categoryMap.set(groupName, new Set());
          }
          categoryMap.get(groupName).add(rawCat);
          found = true;
          break;
        }
      }
      // If category doesn't match any group, add it as its own group
      if (!found) {
        categoryMap.set(rawCat, new Set([rawCat]));
      }
    });
    
    return Array.from(categoryMap.keys()).sort();
  }, []);

  // Helper function to check if app matches selected category
  const matchesCategory = useCallback((appCategory) => {
    if (selectedCategory === 'all' || !selectedCategory) return true;
    if (!appCategory) return false;
    
    // Check if category is in the selected group
    const groupCategories = CATEGORY_GROUPS[selectedCategory];
    if (groupCategories && groupCategories.includes(appCategory)) {
      return true;
    }
    
    // Check if it's an exact match (for categories not in groups)
    return appCategory === selectedCategory;
  }, [selectedCategory]);

  const trialApps = useMemo(() => {
    let apps = progressMode 
      ? trialAppsData.filter(app => {
          const progress = userProgress[app.name] || {};
          return !['started', 'completed', 'no_longer_want'].includes(progress.status);
        })
      : trialAppsData;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      apps = apps.filter(app => matchesCategory(app.category));
    }
    
    return apps;
  }, [progressMode, userProgress, selectedCategory, matchesCategory]);

  const freeApps = useMemo(() => {
    let apps = progressMode 
      ? freeAppsData.filter(app => {
          const progress = userProgress[app.name] || {};
          return !['started', 'completed', 'no_longer_want'].includes(progress.status);
        })
      : freeAppsData;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      apps = apps.filter(app => matchesCategory(app.category));
    }
    
    return apps;
  }, [progressMode, userProgress, selectedCategory, matchesCategory]);

  const paidApps = useMemo(() => {
    // Apply category filter to paid apps
    if (selectedCategory === 'all') {
      return PAID_APPS;
    }
    return PAID_APPS.filter(app => matchesCategory(app.category));
  }, [selectedCategory, matchesCategory]);

  // Auto-switch section if current section has 0 results but another section has results
  useEffect(() => {
    if (selectedCategory === 'all') return; // Don't auto-switch when showing all categories
    
    if (activeSection === 'trial' && trialApps.length === 0) {
      // If trial section has no results, switch to paid if it has results
      if (paidApps.length > 0) {
        setActiveSection('paid');
      } else if (freeApps.length > 0) {
        setActiveSection('free');
      }
    } else if (activeSection === 'paid' && paidApps.length === 0) {
      // If paid section has no results, switch to trial if it has results
      if (trialApps.length > 0) {
        setActiveSection('trial');
      } else if (freeApps.length > 0) {
        setActiveSection('free');
      }
    } else if (activeSection === 'free' && freeApps.length === 0) {
      // If free section has no results, switch to trial or paid if they have results
      if (trialApps.length > 0) {
        setActiveSection('trial');
      } else if (paidApps.length > 0) {
        setActiveSection('paid');
      }
    }
  }, [activeSection, selectedCategory, trialApps.length, paidApps.length, freeApps.length]);

  
  const [expandedFeatures, setExpandedFeatures] = useState({});
  const [expandedApp, setExpandedApp] = useState(null);
  const [showProgressHelp, setShowProgressHelp] = useState(false);
  const hoverTimeoutRef = useRef(null);
  
  // Toggle feature expansion on mobile
  const toggleFeature = (cardId, featureIndex) => {
    if (!isMobile) return;
    const key = `${cardId}-${featureIndex}`;
    setExpandedFeatures(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };




  const renderAppCard = (app, type, options = {}) => {
    const { isModal = false } = options;
    const cardId = `${app.name}-${type}`;
    return (
    <div key={app.name} className="app-card" style={{
      padding: isModal ? '32px' : isMobile ? '16px' : '24px',
      marginBottom: '20px',
      cursor: isMobile || isModal ? 'default' : 'pointer',
      minHeight: isModal ? '520px' : isMobile ? 'auto' : '400px',
      maxWidth: isMobile ? 'calc(100vw - 40px)' : '100%',
    }} onClick={!isMobile && !isModal ? (e) => {
      // Don't open modal if clicking on links
      if (e.target.closest('a[href]')) {
        return;
      }
      setExpandedApp({ app, type });
    } : undefined}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div 
          style={{
            width: isModal ? '120px' : '60px',
            height: isModal ? '120px' : '60px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
            border: '1px solid rgba(54, 255, 149, 0.4)',
            boxShadow: '0 0 8px rgba(54, 255, 149, 0.25)',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(app.link, '_blank');
          }}
        >
          {app.image ? (
            <img 
              src={app.image} 
              alt={app.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                padding: isModal ? '6px' : '4px',
                transform: 'scale(1.2)'
              }}
              onError={(e) => {
                // Fallback to letter if image fails to load
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<span style="font-size: 24px; font-weight: bold; color: #36ff95;">${app.name.charAt(0)}</span>`;
              }}
            />
          ) : (
            <span style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--accent)'
            }}>
              {app.name.charAt(0)}
            </span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 8px 0',
            fontSize: isModal ? '1.75rem' : '1.43rem',
            fontWeight: '600',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {app.name}
            {type === 'trial' && (
              <span style={{
                background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                color: 'white',
                fontSize: '0.77rem',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: '500'
              }}>
                TRIAL
              </span>
            )}
          </h3>
          <p className="app-card-category" style={{
            margin: '0 0 8px 0',
            fontSize: isModal ? '1.1rem' : '0.99rem',
            fontWeight: '500'
          }}>
          {app.category}
        </p>
        {isModal && app.readMoreLink && (
          <Link
            to={app.readMoreLink}
            state={{ from: '/apps' }}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              sessionStorage.setItem('articleFromPage', '/apps');
            }}
            style={{
              display: 'inline-block',
              color: 'var(--accent)',
              fontSize: '1.02rem',
              fontWeight: '600',
              textDecoration: 'none',
              marginBottom: '10px'
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = 'none';
            }}
          >
            User Guide for {app.name}
          </Link>
        )}
          {type === 'trial' && app.trialInfo && (
            <p style={{
              margin: '0 0 8px 0',
              color: '#8b5cf6',
              fontSize: '0.935rem',
              fontWeight: '600'
            }}>
              {app.trialInfo}
            </p>
          )}
        </div>
      </div>
      
        <p style={{
          margin: '0 0 16px 0',
          color: 'var(--text-secondary)',
          fontSize: isModal ? '1.1rem' : '1rem',
          lineHeight: '1.5'
        }}>
          {app.description}
        </p>
      
      <div style={{ marginBottom: '16px', flex: 1 }}>
        <h4 style={{
          margin: '0 0 8px 0',
          fontSize: isModal ? '1.05rem' : '0.9rem',
          color: 'var(--accent)',
          fontWeight: '600'
        }}>
          Key Features:
        </h4>
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          color: 'var(--text-subtle)',
          fontSize: isModal ? '1rem' : '0.9rem'
        }}>
          {app.features.map((feature, index) => {
            const featureKey = `${cardId}-${index}`;
            const isExpanded = expandedFeatures[featureKey];
            return (
            <li 
              key={index} 
              className={`app-card-feature${isMobile && isExpanded ? ' app-card-feature--expanded' : ''}`}
              style={{ 
                marginBottom: '4px',
                fontSize: isMobile && isExpanded ? '1.035rem' : isModal ? '1rem' : '0.9rem',
              }}
              onClick={isMobile ? () => toggleFeature(cardId, index) : undefined}
            >
              {feature}
            </li>
          )})}
        </ul>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto'
      }}>
        <span 
          style={{
            color: 'var(--accent)',
            fontSize: isModal ? '1.1rem' : '0.99rem',
            fontWeight: '600',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(app.link, '_blank');
          }}
        >
          Click to visit →
        </span>
        {app.readMoreLink && (
          <Link
            to={app.readMoreLink}
            state={{ from: '/apps' }}
            className="app-card-read-more"
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              sessionStorage.setItem('articleFromPage', '/apps');
            }}
            style={{
              fontSize: isModal ? '1rem' : '0.85rem',
            }}
          >
            Read More
          </Link>
        )}
      </div>
    </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Premium AI Tools Directory 2025 – Free, Trial & Paid AI Tools | BetterAiBots.com</title>
        <meta name="description" content="Discover the best AI apps and tools in 2025: free AI applications, free trials, and premium paid AI tools for productivity, creativity, marketing, and business automation." />
        <meta name="keywords" content="AI apps, free AI tools, AI software, ChatGPT, Claude, Google Gemini, AI trials, paid AI tools, artificial intelligence apps, AI productivity tools, AI marketing tools, AI video creation, AI workflow automation, n8n, AdCreative, Invideo, VEED, Viral Launch, AI chatbots, AI writing tools, AI image generation, AI business tools" />
        <meta name="author" content="BetterAiBots.com" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Premium AI Tools Directory 2025 – Free, Trial & Paid AI Tools" />
        <meta property="og:description" content="Explore curated AI apps and tools: free applications, trial versions, and premium paid tools to enhance your workflow and boost productivity." />
        <meta property="og:url" content="https://betteraibots.com/apps" />
        <meta property="og:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Premium AI Tools Directory 2025 - Free, Trial & Paid AI Tools" />
        <meta property="og:site_name" content="BetterAiBots.com" />
        <meta property="og:locale" content="en_US" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Premium AI Tools Directory 2025 – Free, Trial & Paid AI Tools" />
        <meta property="twitter:description" content="Discover the best AI apps and tools in 2025: free applications, trial versions, and premium paid tools for productivity and business." />
        <meta property="twitter:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta property="twitter:image:alt" content="Premium AI Tools Directory 2025" />
        <link rel="canonical" href="https://betteraibots.com/apps" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Premium AI Tools Directory 2025",
          "description": "Comprehensive directory of AI applications including free tools, trial versions, and premium paid solutions for productivity, creativity, and business automation.",
          "url": "https://betteraibots.com/apps",
          "image": "https://betteraibots.com/og-image.png?v=3",
          "mainEntity": {
            "@type": "ItemList",
            "name": "AI Applications Directory",
            "description": "Curated collection of AI tools and applications",
            "numberOfItems": 18,
            "itemListElement": [
              {
                "@type": "SoftwareApplication",
                "name": "ChatGPT",
                "description": "Free AI chatbot with GPT-4o mini",
                "applicationCategory": "Chat & Writing",
                "operatingSystem": "Web, iOS, Android"
              },
              {
                "@type": "SoftwareApplication", 
                "name": "Claude",
                "description": "AI assistant with superior writing capabilities",
                "applicationCategory": "Writing & Analysis",
                "operatingSystem": "Web"
              },
              {
                "@type": "SoftwareApplication",
                "name": "n8n",
                "description": "Open-source workflow automation platform",
                "applicationCategory": "Workflow Automation",
                "operatingSystem": "Web, Self-hosted"
              }
            ]
          }
        })}
        </script>
      </Helmet>
      
      <div className="hero-section" style={isMobile ? { padding: '0 20px' } : {}}>
        <h1 className="hero-headline">Premium AI Tools Directory</h1>
        <p className="hero-subheadline custom-hero-desc">
          Discover the best AI applications: free tools, trial versions, and premium paid solutions — plus track all your AI apps and costs in one place.
        </p>
      </div>
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: isMobile ? '0 10px' : '0 20px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Section Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveSection('free')}
            className={activeSection === 'free' ? '' : 'apps-section-btn--inactive'}
            style={{
              background: activeSection === 'free' 
                ? 'linear-gradient(135deg, #36ff95, #0bbfdb)' 
                : undefined,
              color: activeSection === 'free' ? 'var(--text-on-accent)' : 'var(--text-secondary)',
              border: '1px solid rgba(54, 255, 149, 0.3)',
              borderRadius: '30px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            🆓 Freemium ({freeApps.length})
          </button>
          <button
            onClick={() => setActiveSection('trial')}
            className={activeSection === 'trial' ? '' : 'apps-section-btn--inactive'}
            style={{
              background: activeSection === 'trial' 
                ? 'linear-gradient(135deg, #8b5cf6, #a855f7)' 
                : undefined,
              color: activeSection === 'trial' ? 'var(--text-on-accent)' : 'var(--text-secondary)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '30px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            🎯 Free Trials ({trialApps.length})
          </button>
          <button
            onClick={() => setActiveSection('paid')}
            className={activeSection === 'paid' ? '' : 'apps-section-btn--inactive'}
            style={{
              background: activeSection === 'paid' 
                ? 'linear-gradient(135deg, #ffd700, #ffb347)' 
                : undefined,
              color: activeSection === 'paid' ? 'var(--text-on-accent)' : 'var(--text-secondary)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '30px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            💎 Paid AI Apps ({paidApps.length})
          </button>
        </div>

        {/* Category Filter Dropdown */}
        <div style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px'
        }}>
          <label style={{
            color: 'var(--accent)',
            fontSize: '0.95rem',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}>
            Filter by Category:
          </label>
          <select
            className="apps-filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              borderRadius: '8px',
              padding: '8px 36px 8px 16px',
              fontSize: '0.95rem',
              fontWeight: 500,
              cursor: 'pointer',
              minWidth: '200px',
              outline: 'none',
            }}
          >
            <option value="all">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Progress Mode Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '30px',
          padding: '12px 20px',
          background: 'rgba(54, 255, 149, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(54, 255, 149, 0.2)',
          maxWidth: 'fit-content',
          margin: '0 auto 40px auto'
        }}>
          <span style={{ 
            color: progressMode ? 'var(--accent)' : 'var(--text-subtle)', 
            fontSize: '0.95rem',
            fontWeight: 600 
          }}>
            {progressMode ? '🚀 Progress Mode ON' : '📊 Enable Progress Mode'}
          </span>
          <div 
            onClick={() => setProgressMode(!progressMode)}
            style={{
              width: '50px',
              height: '26px',
              background: progressMode ? '#36ff95' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: '13px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              background: '#fff',
              borderRadius: '50%',
              position: 'absolute',
              top: '3px',
              left: progressMode ? '27px' : '3px',
              transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
          </div>
          <Link 
            to="/my-ai" 
            style={{ 
              marginLeft: '10px',
              padding: '6px 12px',
              background: 'rgba(54, 255, 149, 0.1)',
              border: '1px solid #36ff95',
              borderRadius: '8px',
              color: 'var(--accent)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Go to My AI Dashboard
          </Link>
          <button
            onClick={() => setShowProgressHelp(true)}
            onMouseEnter={() => {
              if (!isMobile) {
                hoverTimeoutRef.current = setTimeout(() => {
                  setShowProgressHelp(true);
                }, 800); // 800ms delay on hover
              }
            }}
            onMouseLeave={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
              }
            }}
            style={{
              marginLeft: '8px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '1px solid #36ff95',
              background: 'rgba(54, 255, 149, 0.1)',
              color: 'var(--accent)',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              padding: 0
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(54, 255, 149, 0.2)';
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 0 8px rgba(54, 255, 149, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(54, 255, 149, 0.1)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
            title="Hover or click to learn about Progress Mode"
          >
            ?
          </button>
        </div>

        {/* Progress Help Modal */}
        <Modal 
          show={showProgressHelp} 
          onHide={() => setShowProgressHelp(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton style={{ background: 'var(--modal-bg)', borderBottom: '1px solid rgba(54, 255, 149, 0.2)' }}>
            <Modal.Title style={{ color: 'var(--accent)', fontWeight: 600 }}>
              🚀 How to Organize & Track Your AI Apps
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: 'var(--modal-bg)', color: 'var(--text-secondary)', padding: '24px' }}>
            <div style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--accent)' }}>Progress Mode</strong> helps you organize, clean, and track the AI apps you're exploring. Here's how it works:
              </p>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: '10px', fontSize: '1.1rem' }}>📊 Enable Progress Mode</h4>
                <p style={{ marginBottom: '12px' }}>
                  When enabled, the Apps page will automatically <strong>hide apps</strong> you've already started, completed, or marked as "No Longer Want to See". This keeps your workspace clean and focused on new opportunities.
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: '10px', fontSize: '1.1rem' }}>📝 Track Your Trials</h4>
                <p style={{ marginBottom: '12px' }}>
                  In your <strong>My AI Dashboard</strong>, you can:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                  <li>Mark apps as <strong>Currently Started</strong> and set trial dates</li>
                  <li>Set <strong>Cancel Reminder</strong> dates to avoid unwanted charges</li>
                  <li>Track when your <strong>Trial Ends</strong></li>
                  <li>Add <strong>Monthly Cost</strong> to track your spending</li>
                  <li>Take <strong>Notes</strong> on your experience with each app</li>
                  <li>Mark apps as <strong>Already Done</strong> or <strong>No Longer Want to See</strong></li>
                </ul>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: '10px', fontSize: '1.1rem' }}>🎯 Organize Your Workspace</h4>
                <p style={{ marginBottom: '12px' }}>
                  By tracking your progress, you can:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                  <li><strong>Clean up</strong> your Apps page to show only new opportunities</li>
                  <li><strong>Remember</strong> which trials you've started and when to cancel</li>
                  <li><strong>Track spending</strong> by adding monthly costs and see your total</li>
                  <li><strong>Keep notes</strong> on what works and what doesn't</li>
                  <li><strong>Organize</strong> all your AI platform signups in one place</li>
                </ul>
              </div>

              <div style={{ 
                background: 'rgba(54, 255, 149, 0.1)', 
                border: '1px solid rgba(54, 255, 149, 0.3)', 
                borderRadius: '8px', 
                padding: '12px',
                marginTop: '20px'
              }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
                  <strong style={{ color: 'var(--accent)' }}>Note:</strong> All your progress is stored locally in your browser. We don't track or cancel trials for you - you're responsible for managing your own subscriptions.
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ background: 'var(--modal-bg)', borderTop: '1px solid rgba(54, 255, 149, 0.2)' }}>
            <Button 
              onClick={() => setShowProgressHelp(false)}
              style={{
                background: 'linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%)',
                border: 'none',
                color: '#101c26',
                fontWeight: 600,
                padding: '8px 20px'
              }}
            >
              Got it!
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Section Content */}
        <div style={{ minHeight: '600px' }}>
          {activeSection === 'free' && (
            <div>
              <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                padding: '30px',
                background: 'linear-gradient(135deg, rgba(54, 255, 149, 0.1) 0%, rgba(11, 191, 219, 0.1) 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(54, 255, 149, 0.2)'
              }}>
                <h2 style={{
                  color: 'var(--accent)',
                  fontSize: '2rem',
                  marginBottom: '16px'
                }}>
                  🆓 Free AI Applications
                </h2>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.1rem',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  High-quality AI tools you can use right now without spending a dime. 
                  Perfect for beginners and those exploring AI capabilities.
                </p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: isMobile ? '20px' : '24px',
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                justifyItems: 'center'
              }}>
                {freeApps.length > 0 ? (
                  freeApps.map(app => renderAppCard(app, 'free'))
                ) : (
                  <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '40px',
                    color: 'var(--text-subtle)'
                  }}>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>
                      No free apps found in the "{selectedCategory}" category.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Free Trials Highlight */}
              <div style={{
                marginTop: '40px',
                padding: '25px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                borderRadius: '16px',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%'
                }} />
                <h3 style={{
                  color: '#8b5cf6',
                  fontSize: '1.5rem',
                  marginBottom: '12px',
                  fontWeight: '700'
                }}>
                  🎯 Want More Premium Features?
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  marginBottom: '20px',
                  maxWidth: '500px',
                  margin: '0 auto 20px auto'
                }}>
                  Discover our collection of free trial apps with premium features, advanced AI models, and professional tools.
                </p>
                <button
                  onClick={() => setActiveSection('trial')}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 30px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
                  }}
                >
                  Explore Free Trials →
                </button>
              </div>
            </div>
          )}

          {activeSection === 'trial' && (
            <div>
              <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                padding: '30px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(139, 92, 246, 0.2)'
              }}>
                <h2 style={{
                  color: '#a1a1aa',
                  fontSize: '2rem',
                  marginBottom: '16px'
                }}>
                  🎯 Premium Apps with Free Trials
                </h2>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.1rem',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  Try premium AI tools for free before committing. 
                  Test advanced features and see if they fit your workflow.
                </p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: isMobile ? '20px' : '24px',
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                justifyItems: 'center'
              }}>
                {trialApps.length > 0 ? (
                  trialApps.map(app => renderAppCard(app, 'trial'))
                ) : (
                  <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '40px',
                    color: 'var(--text-subtle)'
                  }}>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>
                      No trial apps found in the "{selectedCategory}" category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'paid' && (
            <div>
              <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                padding: '30px',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 179, 71, 0.1) 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              }}>
                <h2 style={{
                  color: '#ffd700',
                  fontSize: '2rem',
                  marginBottom: '16px'
                }}>
                  💎 Premium Paid AI Tools
                </h2>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.1rem',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  Professional-grade AI tools with advanced features, 
                  higher limits, and dedicated support for serious users.
                </p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: isMobile ? '20px' : '24px',
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                justifyItems: 'center'
              }}>
                {paidApps.length > 0 ? (
                  paidApps.map(app => renderAppCard(app, 'paid'))
                ) : (
                  <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '40px',
                    color: 'var(--text-subtle)'
                  }}>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>
                      No paid apps found in the "{selectedCategory}" category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '60px',
          padding: '40px',
          background: 'linear-gradient(135deg, rgba(54, 255, 149, 0.05) 0%, rgba(11, 191, 219, 0.05) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(54, 255, 149, 0.2)'
        }}>
          <h3 style={{
            color: 'var(--accent)',
            fontSize: '1.5rem',
            marginBottom: '16px'
          }}>
            Can't find what you're looking for?
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            marginBottom: '24px'
          }}>
            We're constantly updating our directory with the latest AI tools and applications.
          </p>
          <Link to="/contact" style={{
            background: 'linear-gradient(135deg, #36ff95, #0bbfdb)',
            color: '#1a2330',
            padding: '12px 30px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            display: 'inline-block',
            transition: 'all 0.3s ease'
          }}>
            Suggest an AI App
          </Link>
        </div>
      </div>
    {expandedApp && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(5, 10, 18, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}
        onClick={() => setExpandedApp(null)}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '900px',
            transform: 'scale(1.03)',
            transition: 'transform 0.2s ease'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setExpandedApp(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#36ff95',
                color: '#0b131a',
                border: 'none',
                borderRadius: '999px',
                width: '32px',
                height: '32px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(54, 255, 149, 0.4)',
                zIndex: 10000
              }}
              aria-label="Close app details"
            >
              ×
            </button>
            {renderAppCard(expandedApp.app, expandedApp.type, { isModal: true })}
          </div>
        </div>
      </div>
    )}

    </>
  );
}

// --- Hamburger Menu (mobile) ---
function HamburgerMenu({ open, onClose, clickPosition, isMobile }) {
  const navigate = useNavigate();

  if (!open) return null;

  // Enhanced navigation function that ensures scroll to top
  const handleNavigation = (path) => {
    onClose();
    // Small delay to ensure menu closes before navigation
    setTimeout(() => {
      navigate(path);
    }, 50);
  };

  // Calculate menu position based on click location (desktop) or center (mobile)
  const getMenuStyle = () => {
    if (isMobile || !clickPosition) {
      // Mobile: keep centered
      return { minWidth: 240 };
    }
    
    // Desktop: position near click, but keep within viewport bounds
    const menuWidth = 270;
    const menuHeight = 400; // Approximate height
    const padding = 20;
    
    let left = clickPosition.x;
    let top = clickPosition.y + 10; // Small offset below click
    
    // Ensure menu stays within viewport
    if (left + menuWidth > window.innerWidth) {
      left = window.innerWidth - menuWidth - padding;
    }
    if (left < padding) {
      left = padding;
    }
    
    if (top + menuHeight > window.innerHeight) {
      top = clickPosition.y - menuHeight - 10; // Show above click if not enough space below
    }
    if (top < padding) {
      top = padding;
    }
    
    return {
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`,
      minWidth: 240,
      marginTop: 0, // Override CSS margin
    };
  };

  return (
    <div className="menu-overlay" onClick={onClose}>
      <div
        className="menu-dropdown-centered"
        onClick={(e) => e.stopPropagation()}
        style={getMenuStyle()}
      >
        <ul>
          <li onClick={() => handleNavigation('/')}>Home</li>
          <li onClick={() => handleNavigation('/apps')}>Apps</li>
          <li onClick={() => handleNavigation('/learn')}>Learn</li>
          <li onClick={() => handleNavigation('/news')}>News</li>
          <li onClick={() => handleNavigation('/Podcast')}>Watch</li>
          <li onClick={() => handleNavigation('/contact')}>Contact</li>
          <li onClick={() => handleNavigation('/my-ai')} style={{ color: 'var(--accent)' }}>My AI 🚀</li>
          <li className="menu-theme-row">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
}


// --- HEADER with AUTH BUTTONS ---
function AppHeader({ onOpenModal, searchValue, setSearchValue, onMenuClick, isMobile }) {
  return (
    <div className="header">
      {!isMobile ? (
        <div className="header-search" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="header-mob-menu-icon" 
            onClick={(e) => {
              // Pass event to onMenuClick if it accepts parameters
              if (onMenuClick) {
                onMenuClick(e);
              }
            }}
            aria-label="Open navigation menu"
            style={{ marginLeft: 'auto' }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="header-menu-icon-svg">
              <rect y="6" width="28" height="2.7" rx="1.35" className="header-menu-icon-bar"/>
              <rect y="13" width="28" height="2.7" rx="1.35" className="header-menu-icon-bar"/>
              <rect y="20" width="28" height="2.7" rx="1.35" className="header-menu-icon-bar"/>
            </svg>
          </button>
          <ThemeToggle compact />
        </div>
      ) : null}
      {isMobile && (
        <div className="header-icons" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeToggle compact />
          <button 
            className="header-mob-menu-icon" 
            onClick={(e) => {
              // Capture mouse position for desktop positioning
              if (typeof onMenuClick === 'function') {
                // If onMenuClick accepts event, pass it; otherwise just call it
                if (onMenuClick.length > 0) {
                  onMenuClick(e);
                } else {
                  onMenuClick();
                }
              }
            }}
            aria-label="Open navigation menu"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="header-menu-icon-svg">
              <rect y="6" width="28" height="2.7" rx="1.35" className="header-menu-icon-bar"/>
              <rect y="13" width="28" height="2.7" rx="1.35" className="header-menu-icon-bar"/>
              <rect y="20" width="28" height="2.7" rx="1.35" className="header-menu-icon-bar"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// --- CATEGORY BUTTONS COMPONENT ---


// --- ROTATING IMAGE COMPONENT ---
function RotatingImage({ images, alt, className, style, onError }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const intervalRef = React.useRef(null);

  React.useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6900); // 6.9 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <img
      src={images[currentIndex]}
      alt={alt}
      className={className}
      style={style}
      onError={onError}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

// --- BOT GRID ---
function BotGrid({ bots, onOpenModal }) {
  return (
    <div className="bot-grid">
      <div
        className="suggest-card"
        onClick={onOpenModal}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 22,
          minHeight: 320,
          cursor: 'pointer',
          marginBottom: 18,
          transition: 'box-shadow 0.2s, border 0.2s',
        }}
      >
        <div style={{ fontSize: "2.2rem", marginBottom: 10, marginTop: 6 }}>✨</div>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, textAlign: "center" }}>Build Something Awesome?</div>
        <div className="suggest-card-cta" style={{ marginTop: 10, fontWeight: 500, textAlign: "center" }}>
          Suggest a new GPT bot!
        </div>
        <img
          src={helperLogo}
          alt="BetterAiBots Helper"
          srcSet={`${helperLogo} 1x, ${helperLogo} 2x`}
          style={{
            marginTop: 18,
            width: "80px",
            height: "auto",
            maxWidth: "32vw",
            objectFit: "contain",
            background: "none",
            borderRadius: "50%",
            boxShadow: "0 0 18px #16ff6c60",
            transition: "width 0.2s"
          }}
        />
      </div>
      {bots.map((bot, i) => (
        <div className={`bot-card${bot.isAffiliate ? ' affiliate-ad' : ''}${bot.title === "InVideo AI" ? ' invideo-bot' : ''}${bot.title === "VEED AI" ? ' veed-bot' : ''}${bot.title === "n8n - AI Workflow Automation" ? ' n8n-bot' : ''}${bot.title === "Accounting GPT" ? ' accounting-gpt' : ''}`} key={i}>
          {bot.isAffiliate ? (
            <a href={bot.openaiLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', width: '100%', height: '100%', position: 'relative' }}>
              {bot.isVideo ? (
                <video
                  src={bot.image}
                  aria-label={bot.title}
                  style={{ width: '100%', borderRadius: 18 }}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : bot.rotatingImages ? (
                <RotatingImage
                  images={bot.rotatingImages}
                  alt={bot.title}
                  style={{ width: '100%', borderRadius: 18 }}
                  onError={e => { e.target.onerror = null; e.target.src = placeholderImg; }}
                />
              ) : (
                <img
                  src={bot.image}
                  alt={bot.title}
                  style={{ width: '100%', borderRadius: 18 }}
                  loading="lazy"
                  onError={e => { 
                    e.target.onerror = null; 
                    e.target.src = placeholderImg; 
                  }}
                  onLoad={(e) => {
                    // Ensure image is visible after loading
                    if (e.target.complete && e.target.naturalHeight === 0) {
                      e.target.src = placeholderImg;
                    }
                  }}
                />
              )}
            </a>
          ) : (
            <>
              <div className="bot-card-content">
                {bot.free && bot.title !== "VEED AI" && <div className="verified-badge">Free</div>}
                {!bot.free && <div className="verified-badge">Paid</div>}
                {bot.isVideo ? (
                  <video
                    src={bot.image}
                    alt={bot.title}
                    className="bot-image"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={bot.image}
                    alt={bot.title}
                    className="bot-image"
                    loading="lazy"
                    onError={e => { 
                      e.target.onerror = null; 
                      e.target.src = placeholderImg; 
                    }}
                    onLoad={(e) => {
                      // Ensure image is visible after loading
                      if (e.target.complete && e.target.naturalHeight === 0) {
                        e.target.src = placeholderImg;
                      }
                    }}
                  />
                )}
                <div className="bot-title">{bot.title}</div>
                <div className="bot-desc">{bot.desc}</div>
              </div>
              <div className="bot-card-footer">
                <a href={bot.openaiLink} target="_blank" rel="noopener noreferrer">
                  <button className="openai-btn">{bot.title === "VEED AI" ? "View VEED" : "View on OpenAI"}</button>
                </a>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// Learn images array - constant outside component
const learnImages = [learnai, learnai2, learnai3, learnai4, learnai5, learnai6];

// News images array - constant outside component
const newsImages = [ainews, ainews2, ainews3, ainews4, ainews5];

// Show images array - constant outside component (only first 2 images)
const showImages = [baibshow2, baibshow3];

// GPTs images array - constant outside component
const gptsImages = [freeaigpts, freeaigpts2];

// Apps images array - constant outside component
const appsImages = [aitoolsdirectory, aitoolsdirectory2, aitoolsdirectory3, aitoolsdirectory4];

// --- HOME PAGE ---
function Home({ botList, onOpenModal, searchValue, setSearchValue, showCategoryBar, toggleCategoryBar }) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });
  const [screenWidth, setScreenWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1200;
  });
  const [isTwoColumnLayout, setIsTwoColumnLayout] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      // 2-column layout is between 750px and 900px
      return width > 750 && width <= 900;
    }
    return false;
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  
  // Learn image slideshow state
  const [learnImageIndex, setLearnImageIndex] = useState(0);
  const [learnPrevIndex, setLearnPrevIndex] = useState(learnImages.length - 1);
  
  // News image slideshow state - scroll up animation
  const [newsScrollPosition, setNewsScrollPosition] = useState(0);
  const [newsIsTransitioning, setNewsIsTransitioning] = useState(true);
  
  // GPTs image slideshow state - removed (GPTs is now static)
  
  // Show image slideshow state - cross dissolve
  const [showImageIndex, setShowImageIndex] = useState(0);
  const [showPrevIndex, setShowPrevIndex] = useState(showImages.length - 1);
  
  // Apps image slideshow state - horizontal scroll left animation
  const [appsScrollPosition, setAppsScrollPosition] = useState(0);
  const [appsIsTransitioning, setAppsIsTransitioning] = useState(true);

  // Random App Spotlight (3 free-trial apps per page load)
  const appSpotlightApps = useMemo(() => {
    const shuffled = [...trialAppsData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 3);
  }, []);

  const isVerySmall = screenWidth < 360; // 320px devices
  const is360px = screenWidth >= 360 && screenWidth < 390;
  const is390px = screenWidth >= 390 && screenWidth < 430;
  
  // Calculate unique premium tools count (trial + paid + freemium apps, count each once)
  const uniquePremiumToolsCount = useMemo(() => {
    const allAppNames = new Set();
    // Add all app names from trialAppsData
    trialAppsData.forEach(app => allAppNames.add(app.name));
    // Add freemium apps from freeAppsData
    freeAppsData.forEach(app => allAppNames.add(app.name));
    // Add all app names from PAID_APPS
    PAID_APPS.forEach(app => allAppNames.add(app.name));
    return allAppNames.size;
  }, []);
  
  // Randomize bot list while keeping affiliate ads in fixed middle positions
  // This randomizes every time the Home component mounts (when someone visits the page)
  const [randomizedBots] = useState(() => {
    // Identify the 3 affiliate ads
    const affiliateAds = botList.filter(bot => bot.isAffiliate === true);
    // Get all non-affiliate bots
    const regularBots = botList.filter(bot => bot.isAffiliate !== true);
    
    // Shuffle the regular bots using Fisher-Yates algorithm for better randomization
    const shuffledRegularBots = [...regularBots];
    for (let i = shuffledRegularBots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRegularBots[i], shuffledRegularBots[j]] = [shuffledRegularBots[j], shuffledRegularBots[i]];
    }
    
    // Suggest card + 8 GPTs, then 3 affiliate ads, then 9 GPTs (17 regular bots total)
    const desiredPreAdCount = 8;
    const middleStart = Math.min(desiredPreAdCount, shuffledRegularBots.length);
    
    // Create the final array with affiliate ads in the middle
    const result = [...shuffledRegularBots];
    affiliateAds.forEach((ad, index) => {
      result.splice(middleStart + index, 0, ad);
    });
    
    return result;
  });
  
  // Filter out Invideo affiliate ad when in 2-column layout, then apply search filter
  const filteredBots = useMemo(() => {
    // First, filter out Invideo affiliate ad if in 2-column layout
    let botsToFilter = randomizedBots;
    if (isTwoColumnLayout) {
      // Remove Invideo affiliate ad (title is "InVideo AI" and isAffiliate is true)
      botsToFilter = randomizedBots.filter(bot => !(bot.isAffiliate && bot.title === "InVideo AI"));
    }
    
    // Then apply search filter
    if (searchValue.trim() === '') {
      return botsToFilter;
    }
    return botsToFilter.filter(bot =>
      bot.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      bot.desc.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [randomizedBots, isTwoColumnLayout, searchValue]);
  
  const slideshowImages = useMemo(() => [
    betteraibotsunlock,
    betteraibotslive,
    betteraibotslive2,
    betteraibotslive3,
    betteraibotslive4,
    betteraibotslive5,
    welcometobaib
  ], []);
  
  useEffect(() => {
    const checkLayout = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setIsMobile(width <= 768);
        // 2-column layout is between 750px and 900px
        setIsTwoColumnLayout(width > 750 && width <= 900);
        setScreenWidth(width);
      }
    };
    
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);
  
  
  useEffect(() => {
    // Preload all images
    slideshowImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [slideshowImages]);
  
  useEffect(() => {
    // Ensure we start with the first image (betteraibotsunlock)
    setCurrentImageIndex(0);
    setImageOpacity(1);
    
    let intervalId = null;
    let fadeTimeoutId = null;
    
    const transitionToNext = () => {
      // Clear any existing fade timeout
      if (fadeTimeoutId) {
        clearTimeout(fadeTimeoutId);
      }
      
      // Fade out over 1 second
      setImageOpacity(0);
      
      // After fade out completes, change image and fade in
      fadeTimeoutId = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
        setImageOpacity(1);
      }, 1000); // Wait for fade out to complete (1 second)
    };
    
    // Start the cycle: show image for 10 seconds, then transition
    const timeout = setTimeout(() => {
      transitionToNext();
      
      // Set up interval for subsequent transitions (every 12 seconds: 10s display + 2s transition)
      intervalId = setInterval(() => {
        transitionToNext();
      }, 12000);
    }, 10000); // First image shows for 10 seconds
    
    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
      if (fadeTimeoutId) clearTimeout(fadeTimeoutId);
    };
  }, [slideshowImages.length]);

  // Learn image slideshow effect - smooth crossfade every 10 seconds
  useEffect(() => {
    // Preload all learn images immediately
    learnImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    // Rotate images every 10 seconds with cross-dissolve
    const intervalId = setInterval(() => {
      setLearnImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % learnImages.length;
        setLearnPrevIndex(prevIndex);
        return nextIndex;
      });
    }, 10000);
    
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // News image slideshow effect - scroll up animation every 4 seconds, infinite loop
  useEffect(() => {
    // Preload all news images
    newsImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let scrollCounter = 0;
    // Since we're scrolling 50% each time, we need double the positions to complete a full cycle
    const totalPositions = newsImages.length * 2;
    
    // Rotate images every 3 seconds with scroll-up animation
    const intervalId = setInterval(() => {
      scrollCounter++;
      const position = scrollCounter % (totalPositions + 1);
      
      // If we've scrolled to the duplicate (last position), reset seamlessly
      if (position === totalPositions) {
        // Scroll to duplicate with transition
        setNewsIsTransitioning(true);
        setNewsScrollPosition(position);
        // Reset just before transition completes to eliminate jump
        setTimeout(() => {
          // Disable transition first
          setNewsIsTransitioning(false);
          // Use double requestAnimationFrame for smoother reset
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setNewsScrollPosition(0);
              scrollCounter = 0;
              // Re-enable transition for next scroll
              requestAnimationFrame(() => {
                setNewsIsTransitioning(true);
              });
            });
          });
        }, 1450); // Reset slightly before transition completes to eliminate jump
      } else {
        // Normal scroll with transition
        setNewsIsTransitioning(true);
        setNewsScrollPosition(position);
      }
    }, 3000);
    
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GPTs image slideshow effect - removed (GPTs is now static)

  // Apps image slideshow effect - horizontal scroll left every 7 seconds, infinite loop
  useEffect(() => {
    // Preload all apps images
    appsImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let scrollCounter = 0;
    
    // Rotate images every 7 seconds with horizontal scroll-left animation
    const intervalId = setInterval(() => {
      scrollCounter++;
      const position = scrollCounter % (appsImages.length + 1);
      
      // If we've scrolled to the duplicate (last position), reset seamlessly
      if (position === appsImages.length) {
        // Scroll to duplicate with transition
        setAppsIsTransitioning(true);
        setAppsScrollPosition(position);
        // Reset just before transition completes to eliminate jump
        setTimeout(() => {
          // Disable transition first
          setAppsIsTransitioning(false);
          // Use double requestAnimationFrame for smoother reset
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setAppsScrollPosition(0);
              scrollCounter = 0;
              // Re-enable transition for next scroll
              requestAnimationFrame(() => {
                setAppsIsTransitioning(true);
              });
            });
          });
        }, 1450); // Reset slightly before transition completes to eliminate jump
      } else {
        // Normal scroll with transition
        setAppsIsTransitioning(true);
        setAppsScrollPosition(position);
      }
      
    }, 7000);
    
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show image slideshow effect - cross dissolve every 24 seconds (calm)
  useEffect(() => {
    // Preload show images
    showImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Rotate between first two images every 24 seconds with cross-dissolve
    const intervalId = setInterval(() => {
      setShowImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % showImages.length;
        setShowPrevIndex(prevIndex);
        return nextIndex;
      });
    }, 24000); // 24 seconds - calm transition
    
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>BetterAiBots.com – Free AI App Directory & Tools Guide</title>
        <meta name="description" content="BetterAiBots.com helps you navigate the overwhelming world of AI tools with clear guidance and honest insights. Browse free AI bots, premium tools with free trials, and learn how to use them effectively." />
        <meta name="keywords" content="AI bots, ChatGPT, OpenAI GPT, free AI tools, AI automation, productivity bots, BetterAiBots, artificial intelligence tools, GPT bots, AI workflow, automation tools, free bots, AI app directory, AI tools guide" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://betteraibots.com/" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://betteraibots.com/" />
        <meta property="og:title" content="BetterAiBots.com – Free AI App Directory & Tools Guide" />
        <meta property="og:description" content="BetterAiBots.com helps you navigate the overwhelming world of AI tools with clear guidance and honest insights. Browse free AI bots, premium tools with free trials, and learn how to use them effectively." />
        <meta property="og:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="BetterAiBots.com" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://betteraibots.com/" />
        <meta property="twitter:title" content="BetterAiBots.com – Free AI App Directory & Tools Guide" />
        <meta property="twitter:description" content="BetterAiBots.com helps you navigate the overwhelming world of AI tools with clear guidance and honest insights. Browse free AI bots, premium tools with free trials, and learn how to use them effectively." />
        <meta property="twitter:image" content="https://betteraibots.com/og-image.png?v=3" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "BetterAiBots.com",
            "url": "https://betteraibots.com/",
            "description": "BetterAiBots.com helps you navigate the overwhelming world of AI tools with clear guidance and honest insights. Browse free AI bots, premium tools with free trials, and learn how to use them effectively.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://betteraibots.com/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      
      {isMobile && (
        <h1 style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 700,
          marginTop: '40px',
          marginBottom: '20px',
          fontFamily: 'inherit'
        }}>
          <span className="theme-home-brand" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>BetterAi</span>
          <span className="theme-accent-text" style={{ textShadow: '0 0 20px rgba(54, 255, 149, 0.5)' }}>Bots</span>
        </h1>
      )}
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%',
        marginTop: '0',
        marginBottom: '20px',
        padding: '20px'
      }}>
        <div className="welcome-hero-frame" style={{
          position: 'relative',
          maxWidth: '600px',
          width: '100%',
        }}>
          <img 
            src={welcometobaib} 
            alt="Welcome to BAIB" 
            style={{ 
              maxWidth: '100%', 
              width: '100%', 
              height: 'auto',
              display: 'block',
              borderRadius: '8px'
            }} 
          />
        </div>
      </div>
      
      <h2 className="hero-subheadline custom-hero-desc" style={{
        textAlign: 'center',
        marginBottom: '10px',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: isMobile ? '0 20px 10px 20px' : '0 0 10px 0'
      }}>
        Your AI Tools Directory Hub for AI Apps, GPTs, News and educational content.
      </h2>
      
      <h3 className="theme-body-text" style={{
        fontSize: isMobile ? '0.95rem' : '1rem',
        lineHeight: '1.6',
        textAlign: 'center',
        fontWeight: 400,
        marginTop: '0',
        marginBottom: '40px',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: isMobile ? '0 20px' : '0'
      }}>
        BetterAiBots.com is your comprehensive resource for navigating the world of AI tools. We help you discover the best AI applications, GPTs, and educational content to enhance your productivity and skills.
        <br /><br />
        Explore our <strong className="theme-accent-text">Apps</strong> directory to find free and premium AI tools, browse our <strong className="theme-accent-text">GPT Discovery Hub</strong> for custom GPTs, stay updated with the latest <strong className="theme-accent-text">News</strong> in the AI world, and enhance your knowledge through our <strong className="theme-accent-text">Learn</strong> section with beginner, intermediate, and advanced guides.
      </h3>
      
      {/* Choose Your Path Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginBottom: '40px',
        padding: isMobile ? '0 20px' : '0'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isMobile ? '25px' : '35px',
          width: '100%',
          maxWidth: '1000px'
        }}>
          {/* Top Row - 3 items */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '20px' : '35px',
            width: '100%',
            flexWrap: 'wrap'
          }}>
            <Link to="/apps" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  maxWidth: isMobile ? '180px' : '240px',
                  width: isMobile ? '180px' : '240px',
                  borderRadius: '8px',
                  border: '2px solid var(--border-accent)',
                  boxShadow: '0 4px 12px rgba(54, 255, 149, 0.3)',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: isMobile ? '180px' : '240px'
                }}>
                  <div style={{
                    display: 'flex',
                    transform: `translateX(-${appsScrollPosition * (100 / (appsImages.length + 1))}%)`,
                    transition: appsIsTransitioning ? 'transform 1.5s ease-in-out' : 'none',
                    height: '100%',
                    width: `${(appsImages.length + 1) * 100}%`
                  }}>
                    {[...appsImages, appsImages[0]].map((imgSrc, idx) => (
                      <img 
                        key={idx}
                        src={imgSrc} 
                        alt="Apps" 
                        style={{ 
                          width: `${100 / (appsImages.length + 1)}%`,
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          flexShrink: 0,
                          pointerEvents: 'none'
                        }} 
                      />
                    ))}
                  </div>
                </div>
                <span className="theme-path-label" style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  Apps
                </span>
                <span className="theme-path-sublabel" style={{
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  textAlign: 'center',
                  marginTop: '4px'
                }}>
                  Free & premium AI tools
                </span>
              </div>
            </Link>
            <Link to="/learn" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  maxWidth: isMobile ? '180px' : '240px',
                  width: '100%',
                  borderRadius: '8px',
                  border: '2px solid var(--border-accent)',
                  boxShadow: '0 4px 12px rgba(54, 255, 149, 0.3)',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {learnImages.map((imgSrc, idx) => (
                    <img 
                      key={idx}
                      src={imgSrc} 
                      alt="Learn" 
                      loading="eager"
                      style={{ 
                        maxWidth: isMobile ? '180px' : '240px',
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        opacity: idx === learnImageIndex ? 1 : 0,
                        transition: 'opacity 1.5s ease-in-out',
                        pointerEvents: 'none',
                        position: idx === 0 ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: idx === learnImageIndex ? 2 : (idx === learnPrevIndex ? 1 : 0)
                      }} 
                    />
                  ))}
                </div>
                <span className="theme-path-label" style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  Learn
                </span>
                <span className="theme-path-sublabel" style={{
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  textAlign: 'center',
                  marginTop: '4px'
                }}>
                  Beginner to advanced guides
                </span>
              </div>
            </Link>
            <Link to="/news" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  maxWidth: isMobile ? '180px' : '240px',
                  width: isMobile ? '180px' : '240px',
                  borderRadius: '8px',
                  border: '2px solid var(--border-accent)',
                  boxShadow: '0 4px 12px rgba(54, 255, 149, 0.3)',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: isMobile ? '180px' : '240px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: `translateY(-${newsScrollPosition * (isMobile ? 90 : 120)}px)`,
                    transition: newsIsTransitioning ? 'transform 1.2s ease-in-out' : 'none'
                  }}>
                    {[...newsImages, newsImages[0]].map((imgSrc, idx) => (
                      <img 
                        key={idx}
                        src={imgSrc} 
                        alt="News" 
                        style={{ 
                          width: '100%',
                          height: isMobile ? '180px' : '240px',
                          objectFit: 'cover',
                          display: 'block',
                          flexShrink: 0,
                          pointerEvents: 'none'
                        }} 
                      />
                    ))}
                  </div>
                </div>
                <span className="theme-path-label" style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  News
                </span>
                <span className="theme-path-sublabel" style={{
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  textAlign: 'center',
                  marginTop: '4px'
                }}>
                  Latest AI updates & trends
                </span>
              </div>
            </Link>
          </div>
          
          {/* Bottom Row - 2 items */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '20px' : '35px',
            width: '100%'
          }}>
            <div 
              style={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={() => {
                const heroSection = document.querySelector('.hero-section');
                if (heroSection) {
                  heroSection.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  width: isMobile ? '160px' : '240px',
                  borderRadius: '8px',
                  border: '2px solid var(--border-accent)',
                  boxShadow: '0 4px 12px rgba(54, 255, 149, 0.3)',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: isMobile ? '160px' : '240px'
                }}>
                  <img 
                    src={gptsImages[0]} 
                    alt="GPTs" 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                <span style={{
                  color: 'var(--text-secondary)',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  GPTs
                </span>
                <span style={{
                  color: 'var(--text-muted)',
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  textAlign: 'center',
                  marginTop: '4px',
                  opacity: 0.8
                }}>
                  Discover custom AI assistants
                </span>
              </div>
            </div>
            <Link 
              to="/Podcast"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  width: isMobile ? '160px' : '240px',
                  borderRadius: '8px',
                  border: '2px solid var(--border-accent)',
                  boxShadow: '0 4px 12px rgba(54, 255, 149, 0.3)',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: isMobile ? '160px' : '240px'
                }}>
                  <img 
                    src={showImages[showPrevIndex]} 
                    alt="Show" 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      opacity: showImageIndex === showPrevIndex ? 1 : 0,
                      transition: 'opacity 1.5s ease-in-out',
                      pointerEvents: 'none',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1
                    }} 
                  />
                  <img 
                    src={showImages[showImageIndex]} 
                    alt="Show" 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      opacity: showImageIndex === showPrevIndex ? 0 : 1,
                      transition: 'opacity 1.5s ease-in-out',
                      pointerEvents: 'none',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 2
                    }} 
                  />
                </div>
                <span style={{
                  color: 'var(--text-secondary)',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  Show
                </span>
                <span style={{
                  color: 'var(--text-muted)',
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  textAlign: 'center',
                  marginTop: '4px',
                  opacity: 0.8
                }}>
                  Watch our podcast episodes
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Apps Directory Preview Section */}
      <div className="hero-section" style={isMobile ? { padding: '60px 20px 30px' } : { padding: '60px 0 30px' }}>
        <Link to="/apps" style={{ textDecoration: 'none', display: 'block' }}>
          <div className="theme-promo-panel" style={{
            maxWidth: '1000px',
            margin: '0 auto',
            borderRadius: '20px',
            padding: isMobile ? '30px 20px' : '40px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          >
            <h1 className="hero-headline" style={{ 
              marginBottom: "15px",
              background: 'linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Premium AI Tools Directory
            </h1>
            <h2 className="hero-subheadline custom-hero-desc" style={{
              marginBottom: "30px",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
              color: 'var(--text-secondary)'
            }}>
              Discover the best AI applications: free tools, trial versions, and premium paid solutions — plus track all your AI apps and costs in one place.
            </h2>
            
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '15px' : '20px',
              marginBottom: '25px',
              maxWidth: '600px',
              margin: '0 auto 25px auto'
            }}>
              <div style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  fontWeight: '700',
                  color: '#8b5cf6',
                  marginBottom: '8px'
                }}>
                  🎯 {trialAppsData.length}
                </div>
                <div style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  Free Trials
                </div>
              </div>
              
              <div style={{
                background: 'rgba(11, 191, 219, 0.1)',
                border: '1px solid rgba(11, 191, 219, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  fontWeight: '700',
                  color: '#0bbfdb',
                  marginBottom: '8px'
                }}>
                  ⚡ {uniquePremiumToolsCount}
                </div>
                <div style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  Premium AI Tools (total)
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '15px',
              marginTop: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-secondary)',
                fontSize: isMobile ? '0.85rem' : '0.9rem'
              }}>
                <span>📊</span>
                <span>Enable Progress Mode</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-secondary)',
                fontSize: isMobile ? '0.85rem' : '0.9rem'
              }}>
                <span>🎯</span>
                <span>Premium Apps with Free Trials</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-secondary)',
                fontSize: isMobile ? '0.85rem' : '0.9rem'
              }}>
                <span>📈</span>
                <span>Go to My AI Dashboard</span>
              </div>
            </div>
            
            {/* CTA Text */}
            <div style={{
              textAlign: 'center',
              marginTop: '25px',
              color: 'var(--accent)',
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              fontWeight: '600'
            }}>
              Click to explore all apps →
            </div>
          </div>
        </Link>
      </div>

      {/* App Spotlight (Random Free Trial Apps) */}
      <div style={{
        marginTop: isVerySmall ? "70px" : (is360px ? "80px" : (is390px ? "90px" : "100px")),
        marginBottom: isVerySmall ? "30px" : (is360px ? "32px" : (is390px ? "35px" : "40px")),
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isVerySmall ? "0 8px" : (is360px ? "0 10px" : (is390px ? "0 12px" : "0")),
        boxSizing: "border-box"
      }}>
        <h2 className="section-title-accent" style={{ 
          fontSize: isVerySmall ? "1.2rem" : (is360px ? "1.25rem" : (is390px ? "1.3rem" : "1.4rem")), 
          marginTop: "0",
          marginBottom: isVerySmall ? "20px" : (is360px ? "22px" : (is390px ? "25px" : "30px")),
        }}>
          App Spotlight
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(340px, 1fr))",
          gap: isVerySmall ? "16px" : (is360px ? "18px" : (is390px ? "20px" : (isMobile ? "20px" : "24px"))),
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isVerySmall ? "0 8px" : (is360px ? "0 10px" : (is390px ? "0 12px" : (isMobile ? "0 16px" : "0 24px"))),
          width: "100%",
          boxSizing: "border-box"
        }}>
          {appSpotlightApps.map((app) => {
            const imageSrc = typeof app.image === 'string'
              ? (app.image.startsWith('http') || app.image.startsWith('/') ? app.image : `/${app.image}`)
              : app.image;
            const readMoreLink = app.readMoreLink || "/apps?section=trial";
            const badgeItems = Array.isArray(app.features) ? app.features.slice(0, 3) : [];
            return (
              <div
                key={app.name}
                className="spotlight-card"
                onMouseOver={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseOut={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div style={{
                  flexShrink: 0,
                  width: "100%",
                  height: "220px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "16px",
                  boxSizing: "border-box"
                }}>
                  <Link
                    to={readMoreLink}
                    aria-label={`Read more about ${app.name}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src={imageSrc}
                      alt={`${app.name} logo`}
                      className="spotlight-card__img"
                      style={{
                        width: "200px",
                        height: "200px",
                        cursor: "pointer",
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </Link>
                </div>
                <div style={{
                  flex: 1,
                  padding: isMobile ? "16px" : "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minWidth: 0
                }}>
                  <div>
                    <Link
                      to={readMoreLink}
                      style={{ textDecoration: "none" }}
                      aria-label={`Read more about ${app.name}`}
                    >
                      <h3
                        className="spotlight-card__title"
                        style={{
                          fontSize: isMobile ? "1.1rem" : "1.3rem",
                          margin: "0 0 12px 0",
                          cursor: "pointer",
                        }}
                      >
                        {app.name}
                      </h3>
                    </Link>
                    <p style={{
                      color: 'var(--text-subtle)',
                      fontSize: isMobile ? "0.8rem" : "0.9rem",
                      margin: "0 0 15px 0"
                    }}>
                      Featured • {app.category}
                    </p>
                    <p className="spotlight-card__desc" style={{
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      lineHeight: 1.5,
                      margin: "0 0 15px 0"
                    }}>
                      {app.description}
                    </p>
                    {badgeItems.length > 0 && (
                      <div style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "20px"
                      }}>
                        {badgeItems.map((feature) => (
                          <span
                            key={feature}
                            className="spotlight-card__badge"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "flex-start"
                  }}>
                    <a
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spotlight-card__btn-primary"
                    >
                      Try {app.name} Free
                    </a>
                    <Link
                      to={readMoreLink}
                      className="spotlight-card__btn-secondary"
                    >
                      Read Full Article
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="hero-section" style={isMobile ? { padding: '0 20px' } : { padding: '60px 0 0 0' }}>
        <h1 className="hero-headline" style={{ marginBottom: "30px" }}>GPT Discovery Hub</h1>
        <h2 className="hero-subheadline custom-hero-desc" style={{
          marginBottom: "40px",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          Find Free AI GPTs to help you improve your workflow and improve your skills!
        </h2>
      </div>
      
      <BotGrid bots={filteredBots} onOpenModal={onOpenModal} />
      
      {/* About Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "60px auto",
          padding: isMobile ? "40px 20px" : "60px 40px",
          textAlign: "center"
        }}
      >
        <h1 className="hero-headline" style={{ marginBottom: "30px" }}>Looking for more?</h1>
        <p className="hero-subheadline custom-hero-desc" style={{
          marginBottom: "40px",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          We're here to help you navigate the overwhelming world of AI tools with clear guidance and honest insights. We break down what each app does, how to use it effectively, and which tools are actually worth your time and money.
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: isMobile ? "30px" : "40px",
          marginTop: "40px",
          textAlign: "left"
        }}>
          <Link to="/apps" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
            <div className="theme-panel-card">
              <h3 style={{
                color: 'var(--accent)',
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: "16px",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                🆓 Free & Premium Tools
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0,
                flex: 1
              }}>
                Browse free AI bots you can try immediately, plus premium tools with free trials that usually don't require a credit card. Test them out, compare options, and find what actually fits your workflow — no pressure, no guesswork.
              </p>
            </div>
          </Link>
          
          <Link to="/learn" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
            <div className="theme-panel-card">
              <h3 style={{
                color: 'var(--accent)',
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: "16px",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                📘 Guides & Learning
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0,
                flex: 1
              }}>
                Every tool on BetterAiBots comes with a clear, beginner-friendly user guide so you know exactly how to use it, what to expect, and what to avoid. Our learning paths help you level up fast—from exploring new AI tools to mastering advanced workflows—with quizzes to track your progress.
              </p>
            </div>
          </Link>
          
          <Link to="/news" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
            <div className="theme-panel-card">
              <h3 style={{
                color: 'var(--accent)',
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: "16px",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                📰 News & Updates
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0,
                flex: 1
              }}>
                AI changes fast — and we keep you ahead of it. Our News & Updates section breaks down major AI announcements, new AI tools, and big platform changes in simple, clear language so you always know what matters and why.
              </p>
            </div>
          </Link>
          
          <Link to="/Podcast" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
            <div className="theme-panel-card">
              <h3 style={{
                color: 'var(--accent)',
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: "16px",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                🎯 Smart Testing
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0,
                flex: 1
              }}>
                Smart testing matters. We show you how to evaluate new AI tools, which workflows to experiment with, and how to identify genuine value versus marketing hype — long before you spend a dollar.
              </p>
            </div>
          </Link>
        </div>
        
        <div
          className="channel-section"
          style={{
            marginTop: isMobile ? "50px" : "100px",
            padding: isMobile ? "40px 20px" : "80px 60px",
          }}
        >
          <div className="channel-section__orb channel-section__orb--tr" aria-hidden="true" />
          <div className="channel-section__orb channel-section__orb--bl" aria-hidden="true" />

          <h2 className="hero-headline" style={{
            fontSize: isMobile ? "2.2rem" : "3.2rem",
            marginBottom: "50px",
            textAlign: "center",
            letterSpacing: "-1px"
          }}>
            Visit our Channel
          </h2>
          
          <div style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: isMobile ? "block" : "flex",
            alignItems: "center",
            gap: "50px"
          }}>
            <div style={{
              flex: 1.2,
              textAlign: isMobile ? "center" : "left"
            }}>
              <p className="theme-body-text" style={{
                fontSize: isMobile ? "1.1rem" : "1.2rem",
                lineHeight: "1.8",
                marginBottom: "24px",
                fontWeight: 500
              }}>
                If you've ever wondered which AI tools are worth your time, how to actually use them, or how to stay ahead in a world changing by the week… you're in the right place.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: isMobile ? "1rem" : "1.1rem",
                lineHeight: "1.8",
                marginBottom: "30px"
              }}>
                On our <a 
                  href="https://www.youtube.com/@BetterAiBots" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent)',
                    textDecoration: "underline",
                    fontWeight: 700,
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#0bbfdb"}
                  onMouseLeave={(e) => e.target.style.color = "#36ff95"}
                >YouTube channel</a>, we break down the newest AI tools, bots, and apps — from powerful paid platforms to the best free tools you can start using today. We test everything, explain how it works, and give you real results (not hype).
              </p>
            </div>
            
            <Link
              to="/Podcast"
              className="channel-media-link"
              style={{
                display: "block",
                cursor: "pointer",
                maxWidth: isMobile ? "100%" : "480px",
                width: isMobile ? "100%" : "480px",
                flexShrink: 0,
                position: "relative",
                padding: "10px",
                background: "linear-gradient(135deg, rgba(54, 255, 149, 0.15) 0%, rgba(11, 191, 219, 0.15) 100%)",
                borderRadius: "20px",
                border: "1px solid var(--border-accent-soft)",
                transition: "all 0.3s ease"
              }}
            >
              <img
                src={slideshowImages[currentImageIndex]}
                alt="BetterAiBots"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  opacity: imageOpacity,
                  transition: "opacity 1s ease-in-out",
                  display: "block"
                }}
                draggable={false}
              />
            </Link>
          </div>
          
          {/* Navigation Buttons */}
          <div style={{
            maxWidth: "1000px",
            margin: isMobile ? "50px auto 0" : "100px auto 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "15px" : "25px"
          }}>
            {[
              { to: "/apps", label: "View Apps" },
              { to: "/learn", label: "Learn AI" },
              { to: "/news", label: "Go To News" },
              { href: "https://www.youtube.com/@BetterAiBots", label: "Visit Channel" }
            ].map((btn, idx) => {
              const baseStyle = {
                padding: isMobile ? "14px 28px" : "18px 40px",
                fontSize: isMobile ? "0.95rem" : "1.1rem",
                minWidth: isMobile ? "140px" : "180px",
              };

              if (btn.to) {
                return (
                  <Link
                    key={idx}
                    to={btn.to}
                    className="theme-cta-btn"
                    style={baseStyle}
                  >
                    {btn.label}
                  </Link>
                );
              }

              return (
                <a
                  key={idx}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-cta-btn"
                  style={baseStyle}
                >
                  {btn.label}
                </a>
              );
            })}
          </div>
          
          {/* Free Trials Link */}
          <div style={{
            width: "100%",
            textAlign: "center",
            marginTop: isMobile ? "30px" : "40px"
          }}>
            <Link
              to="/apps?section=trial"
              className="theme-cta-btn theme-cta-btn--pill"
              style={{
                fontSize: isMobile ? "0.9rem" : "1rem",
                padding: "10px 24px",
              }}
            >
              🚀 Explore Free Trials
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// --- CATEGORY PAGE ---
function CategoryPage({ botList, onOpenModal }) {
  const { cat } = useParams();



const CATEGORY_REVERSE = {
  wellness: "Health & Wellness",
  creative: "Creative Tools",
  wizardry: "Specialized Knowledge",
  productivity: "Productivity",
  education: "Education",
  lifestyle: "Lifestyle",
  music: "Music"
};


  const catName = CATEGORY_REVERSE[cat] || decodeURIComponent(cat || "");
  const botsForCategory = botList.filter(bot =>
    bot.categories?.some(c => c.toLowerCase() === catName.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>{catName} Bots – BetterAiBots.com</title>
        <meta
          name="description"
          content={`Best free ${catName} AI bots for productivity, health, creative tools, and more.`}
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:title" content={`${catName} Bots – BetterAiBots.com`} />
        <meta property="og:url" content={`https://betteraibots.com/${encodeURIComponent(cat)}`} />
        <link rel="canonical" href={`https://betteraibots.com/${encodeURIComponent(cat)}`} />

      </Helmet>
      <div className="hero-section">
        <h1 className="hero-headline">{catName} Bots</h1>
        <p className="hero-subheadline custom-hero-desc">
          Curated bots for the <span className="neon-green">{catName}</span> category.
        </p>
      </div>
      <div className="site-disclaimer" style={{ padding: '0 20px', textAlign: 'center' }}>
        🔴 <strong>This site includes affiliate links and does not provide financial, legal, or medical advice. Bots are provided "as is" for entertainment and education only. Use at your own risk.</strong>
      </div>
      <BotGrid bots={botsForCategory} onOpenModal={onOpenModal} />
    </>
  );
}


// --- CONTACT PAGE ---
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [botField, setBotField] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'bot-field') setBotField(value);
    else setForm({ ...form, [name]: value });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.name.length < 2 || !form.email.includes('@') || form.message.length < 4) {
      setError("Please fill in all fields with valid info.");
      return;
    }
    if (!recaptchaValue) {
      setError("Please verify you are not a robot.");
      return;
    }
    if (botField) {
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setRecaptchaValue(null);
      setBotField('');
      setTimeout(() => setSent(false), 3200);
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        name: form.name,
        email: form.email,
        message: form.message,
        'bot-field': botField,
      }).toString();

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!res.ok) throw new Error('Submission failed');

      const newContact = {
        name: form.name,
        email: form.email,
        message: form.message,
        date: new Date().toLocaleString(),
      };
      const storedContacts = JSON.parse(localStorage.getItem("contactMessages") || "[]");
      storedContacts.unshift(newContact);
      localStorage.setItem("contactMessages", JSON.stringify(storedContacts));

      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setRecaptchaValue(null);
      setTimeout(() => setSent(false), 3200);
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="hero-section">
      <Helmet>
        <title>Contact AI Bots & Tools – BetterAiBots.com</title>
        <meta
          name="description"
          content="Contact BetterAiBots.com for inquiries about our curated free AI bots directory. Questions, suggestions, or feedback? Reach out!"
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:title" content="Contact AI Bots & Tools – BetterAiBots.com" />
        <meta
          property="og:description"
          content="Contact BetterAiBots.com for inquiries about our curated free AI bots directory. Questions, suggestions, or feedback? Reach out!"
        />
        <link rel="canonical" href="https://betteraibots.com/contact" />
        <meta property="og:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta property="og:url" content="https://betteraibots.com/contact" />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1 className="hero-headline">Contact Us</h1>
      <p className="hero-subheadline custom-hero-desc">
        Questions, suggestions or feedback? Reach out!
      </p>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="contact-form"
        style={{ maxWidth: 420, margin: "32px auto 0", background: "#172d3e", borderRadius: 20, padding: 28, boxShadow: "0 3px 26px #09e26924" }}
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p style={{ position: 'absolute', left: '-9999px' }}>
          <label>Don’t fill this out: <input name="bot-field" value={botField} onChange={handleChange} tabIndex={-1} autoComplete="off" /></label>
        </p>
        <label className="form-label neon-green">Name</label>
        <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
        <label className="form-label neon-green">Email</label>
        <input className="form-control" name="email" type="email" value={form.email} onChange={handleChange} required />
        <label className="form-label neon-green">Message</label>
        <textarea className="form-control" name="message" rows={3} value={form.message} onChange={handleChange} required />
        <div style={{ margin: "18px 0", display: 'flex', justifyContent: 'center' }}>
          <ReCAPTCHA
            sitekey="6Lf2wlArAAAAAH0GDpzc02uW1KAD8TJXgD_kSz1j"
            onChange={val => setRecaptchaValue(val)}
            theme="dark"
          />
        </div>
        <Button type="submit" className="header-btn" style={{ width: "100%", marginTop: 15 }} disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Message'}
        </Button>
        {error && <div style={{ color: "#ff6464", marginTop: 8 }}>{error}</div>}
        {sent && <div className="neon-green" style={{ marginTop: 10 }}>Thank you! We got your message.</div>}
      </form>
    </div>
  );
}



// --- 404 NOT FOUND PAGE ---
function NotFound() {
  return (
    <div className="hero-section" style={{ maxWidth: 900, margin: "auto", textAlign: "center" }}>
      <Helmet>
        <title>Page Not Found – BetterAiBots.com</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      <h1 className="hero-headline" style={{ fontSize: "4rem", marginBottom: "20px" }}>404</h1>
      <h2 className="hero-subheadline" style={{ marginBottom: "30px" }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: "1.1rem", marginBottom: "40px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #36ff95, #0bbfdb)",
          color: "#1a2330",
          padding: "14px 32px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "1.1rem",
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 4px 12px rgba(54, 255, 149, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        Go to Home Page
      </Link>
    </div>
  );
}

// --- LEGAL PAGE ---
function Legal() {
  return (
    <div className="hero-section" style={{ maxWidth: 900, margin: "auto" }}>
      <Helmet>
        <title>AI Bots & Tools Legal Terms – BetterAiBots.com</title>
        <meta property="og:title" content="AI Bots & Tools Legal Terms – BetterAiBots.com" />
        <meta property="og:description" content="Legal info, privacy policy, and terms of use for BetterAiBots.com." />
        <meta property="og:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta property="og:url" content="https://betteraibots.com/legal" />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1 className="hero-headline">BetterAiBots Legal, Terms & Disclaimers</h1>
      <div style={{
        textAlign: "left", margin: "30px auto", fontSize: "1.15rem", color: "#e9f7ee",
        background: "#172d3e", borderRadius: 18, padding: "36px 28px", boxShadow: "0 2px 22px #09e26924"
      }}>
        <b>Disclaimer & Important Notices:</b><br />
        BetterAiBots.com ("the Site") is a <b>free public directory</b> listing and linking to AI bots and OpenAI GPTs. The Site <b>does not own, operate, or control any listed bots, AI services, or third-party content</b>. Bots, content, and links are provided "as is" and solely for informational, entertainment, and educational purposes.
        <br /><br />
        <b>Affiliate Disclosure & Endorsement Policy:</b><br />
        BetterAiBots.com may receive compensation for some links and recommendations through affiliate partnerships. While we are not affiliated with OpenAI directly, we do have affiliate relationships with certain AI tool providers and services. However, listing any bot or service does not constitute a blanket endorsement, and we do not guarantee the quality, safety, or suitability of any listed tools. Users should always conduct their own research and due diligence before using any AI service.
        <br /><br />
        <b>No Vetting, Verification, or Guarantee:</b><br />
        <b>Bots and links on this site are user-submitted or publicly available, and have <u>not been vetted, checked, reviewed, or verified for safety, accuracy, reliability, lawfulness, or suitability</u> by BetterAiBots.com.</b> We do not guarantee the quality, legality, completeness, or accuracy of any information, service, or software.
        <br /><br />
        <b>Bots Make Mistakes & May Be Inaccurate or Unsafe:</b><br />
        <b>AI bots, including those linked here, frequently provide inaccurate, outdated, incomplete, misleading, or inappropriate information.</b> Bots may make mistakes, hallucinate facts, or produce content that is false, offensive, or dangerous. <u>Do not rely on any bot or response for important matters.</u>
        <br /><br />
        <b>No Advice or Professional Service:</b><br />
        Nothing on this site or accessed via any linked bot should be considered financial, legal, medical, psychological, or other professional advice. <b>ALWAYS double-check any important information with a qualified professional and reputable, up-to-date resources before making decisions or taking action.</b>
        <br /><br />
        <b>User Submissions & Content Responsibility:</b><br />
        Users are solely responsible for any bots, links, or materials they submit. By submitting a bot or content, you warrant you have all necessary rights and that your submission does not violate any law, regulation, copyright, trademark, or third-party right. The Site reserves the right to remove any content at any time for any reason and to cooperate with legal authorities as required.
        <br /><br />
        <b>No Liability, No Warranty:</b><br />
        <b>The owners, operators, and contributors of BetterAiBots.com expressly disclaim all responsibility and liability for any damages, losses, claims, harm, or consequences of any kind resulting from:</b>
        <ul>
          <li>Use or misuse of any bot, information, or link listed here</li>
          <li>Actions, content, or omissions of any third-party developer, service, or user</li>
          <li>Viruses, outages, interruptions, errors, inaccuracies, or unauthorized use</li>
          <li>Copyright/trademark infringement or intellectual property claims</li>
          <li>User submissions or public content</li>
          <li>Anything else related to use of this Site or any linked software/service</li>
        </ul>
        <b>Use this Site at your own risk. By using the Site, you agree to fully release and indemnify BetterAiBots.com and its owners from all liability, damages, and claims.</b>
        <br /><br />
        <b>Complaints, DMCA, & Copyright/Legal Notices:</b><br />
        <b>All complaints, copyright/DMCA claims, legal notices, or concerns must be submitted through the <u>contact form</u> on this site.</b> Do <u>not</u> send complaints or legal requests to our email; it is not monitored. We will review and respond as required by law.
        <br /><br />
        <b>Copyright & Trademarks:</b><br />
        All product names, logos, and brands are property of their respective owners and used for identification only. If you believe any content infringes your rights, submit a notice through the contact form for prompt review.
        <br /><br />
        <b>External Links & Third-Party Sites:</b><br />
        This Site contains links to third-party content and external sites. <b>We have no control over, and assume no responsibility for, the content, policies, or practices of any third-party site or service.</b> Visiting any external link is at your own risk.
        <br /><br />
        <b>My-AI Dashboard (Local Tracking) Disclaimer:</b><br />
        The My-AI Dashboard is a self-managed tracking tool provided "as is" for convenience. <b>All data entered (including app names, costs, trial dates, reminders, and notes) is stored locally in your browser and is not transmitted to or stored by BetterAiBots.com.</b> We do not monitor, verify, or guarantee the accuracy of any data you enter. You are solely responsible for tracking, canceling, and paying for any subscriptions, trials, or services. <b>We make no promises about reminders, dates, costs, or outcomes, and we are not liable for missed cancellations, charges, fees, or any financial or personal decisions you make.</b>
        <br /><br />
        <b>Indemnification:</b><br />
        By using BetterAiBots.com, you agree to indemnify and hold harmless its owners, operators, affiliates, and contributors from any and all claims, liabilities, damages, or costs (including attorney's fees) arising from your use of the Site, submissions, or interactions with any third-party bots or links.
        <br /><br />
        <b>Jurisdiction:</b> These terms are governed by and construed in accordance with the laws of the State of Texas, United States of America, with venue in Dallas County, Texas.

        <br /><br />
        <b>Contact:</b> Use the contact form for all communications, complaints, takedowns, or legal notices.
      </div>
      <h2 className="hero-headline" style={{ fontSize: "2.1rem" }}>Privacy Policy</h2>
      <div style={{
        textAlign: "left", margin: "30px auto", fontSize: "1.08rem", color: "#e9f7ee",
        background: "#18232f", borderRadius: 16, padding: "25px 23px"
      }}>
        <b>1. Data Collection:</b> No login or account is required to use the Site. We only collect information you directly provide (such as bot submissions or contact forms). Some data may be stored locally in your browser.
        <br /><br />
        <b>2. Analytics:</b> We use Google Analytics to collect aggregate, anonymous site usage statistics.
        <br /><br />
        <b>3. Data Usage & Sharing:</b> We do not sell, rent, or share user data with third parties. We may disclose data if required by law or for abuse/investigation purposes.
        <br /><br />
        <b>4. User Responsibility:</b> By submitting any content, you affirm it does not violate the rights or privacy of others or any law.
        <br /><br />
        <b>5. Third-Party Sites:</b> Using any bot or external link is subject to the privacy policies of those providers. We are not responsible for their data practices.
        <br /><br />
        <b>6. My-AI Dashboard (Local Storage):</b> Any My-AI Dashboard data you enter (including app names, costs, trial dates, reminders, and notes) is stored locally in your browser using local storage. We do not receive, store, or back up this data. If you clear your browser data, change devices, or uninstall the site, this data may be lost.
        <br /><br />
        <b>7. Privacy Concerns:</b> Use the contact form for privacy-related questions or concerns. Do not email us.
      </div>
      <h2 className="hero-headline" style={{ fontSize: "2.1rem" }}>Terms of Use</h2>
      <div style={{
        textAlign: "left", margin: "30px auto", fontSize: "1.08rem", color: "#e9f7ee",
        background: "#18232f", borderRadius: 16, padding: "25px 23px"
      }}>
        <b>By using BetterAiBots.com, you agree to:</b>
        <ul>
          <li>Not submit, use, or access bots, links, or information for any unlawful, harmful, or fraudulent purpose</li>
          <li>Use any bots, links, or content solely at your own risk</li>
          <li>Accept that My-AI Dashboard tracking is local-only and you are solely responsible for your subscription decisions, payments, and cancellations</li>
          <li>Independently verify all information and consult qualified professionals as needed</li>
          <li>Respect all copyright, trademark, and intellectual property rights</li>
          <li>Promptly report abuse, infringement, or illegal content through the contact form</li>
          <li>Indemnify and hold harmless the site and its owners/operators for all consequences of use</li>
        </ul>
        <b>These terms may be updated at any time. Your continued use of the Site means you accept all terms and policies. If you do not agree, discontinue use immediately.</b>
      </div>
    </div>
  );
}

// --- PRIVACY POLICY PAGE ---
function Privacy() {
  return (
    <div className="hero-section" style={{ maxWidth: 900, margin: "auto" }}>
      <Helmet>
        <title>Privacy Policy – BetterAiBots.com</title>
        <meta property="og:title" content="Privacy Policy – BetterAiBots.com" />
        <meta property="og:description" content="Privacy policy and data handling practices for BetterAiBots.com." />
        <meta property="og:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta property="og:url" content="https://betteraibots.com/privacy" />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1 className="hero-headline">Privacy Policy</h1>
      <div style={{
        textAlign: "left", margin: "30px auto", fontSize: "1.15rem", color: "#e9f7ee",
        background: "#172d3e", borderRadius: 18, padding: "36px 28px", boxShadow: "0 2px 22px #09e26924"
      }}>
        <b>Last Updated:</b> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        <br /><br />
        <b>1. Data Collection:</b><br />
        No login or account is required to use the Site. We only collect information you directly provide (such as bot submissions or contact forms). Some data may be stored locally in your browser.
        <br /><br />
        <b>2. Analytics:</b><br />
        We use privacy-friendly analytics, which does not use cookies and only collects aggregate, anonymous site usage statistics. Basic analytics (page views, popular bots) are tracked anonymously for site improvement.
        <br /><br />
        <b>3. Data Usage & Sharing:</b><br />
        <b>We do not sell, rent, or share user data with third parties.</b> We may disclose data if required by law or for abuse/investigation purposes.
        <br /><br />
        <b>4. User Responsibility:</b><br />
        By submitting any content, you affirm it does not violate the rights or privacy of others or any law.
        <br /><br />
        <b>5. Third-Party Sites:</b><br />
        Using any bot or external link is subject to the privacy policies of those providers. We are not responsible for their data practices.
        <br /><br />
        <b>6. Privacy Concerns:</b><br />
        Use the contact form for privacy-related questions or concerns. Do not email us.
        <br /><br />
        <b>7. Cookies:</b><br />
        We use basic analytics cookies to understand how visitors use our site. These cookies are anonymous and do not personally identify you. You can disable cookies in your browser settings, though this may affect site functionality.
        <br /><br />
        <b>8. Data Security:</b><br />
        We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        <br /><br />
        <b>9. Your Rights:</b><br />
        You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, please contact us through the contact form on this site.
        <br /><br />
        <b>10. Changes to This Policy:</b><br />
        We may update this Privacy Policy from time to time. The "Last Updated" date at the top indicates when changes were made. Your continued use of the site after changes constitutes acceptance of the updated policy.
      </div>
    </div>
  );
}

// --- MODERATION PAGE ---
function Moderation({ approveBot, pendingBots, setPendingBots }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const [contactMessages, setContactMessages] = useState(() => {
    const stored = localStorage.getItem("contactMessages");
    return stored ? JSON.parse(stored) : [];
  });
  const [adminAddMode, setAdminAddMode] = useState(false);
  const [adminBot, setAdminBot] = useState({
    title: "",
    desc: "",
    openaiLink: "",
    image: "",
    categories: "",
  });
  const [adminErr, setAdminErr] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");

  useEffect(() => {
    localStorage.setItem("pendingBots", JSON.stringify(pendingBots));
  }, [pendingBots]);

  useEffect(() => {
    const stored = localStorage.getItem("contactMessages");
    setContactMessages(stored ? JSON.parse(stored) : []);
  }, []);

  function handleAdminBotChange(e) {
    const { name, value } = e.target;
    setAdminBot(prev => ({ ...prev, [name]: value }));
  }

  function handleAdminAddBot(e) {
    e.preventDefault();
    if (!adminBot.title || !adminBot.desc || !adminBot.openaiLink) {
      setAdminErr("All fields except image are required.");
      setAdminSuccess("");
      return;
    }

    const newBot = {
      title: adminBot.title,
      desc: adminBot.desc,
      openaiLink: adminBot.openaiLink,
      image: adminBot.image || undefined,
      verified: false,
      categories: adminBot.categories
        ? adminBot.categories
            .split(",")
            .map(s => s.trim())
            .filter(Boolean)
            .map(name => CATEGORY_SLUGS[name] || name)
        : [],
    };

    setPendingBots(prev => [newBot, ...prev]);
    setAdminBot({
      title: "",
      desc: "",
      openaiLink: "",
      image: "",
      categories: ""
    });
    setAdminErr("");
    setAdminSuccess("Bot added to pending!");
    setTimeout(() => setAdminSuccess(""), 1500);
  }

  function handleApprove(idx) {
    approveBot({ ...pendingBots[idx], verified: true });
    setPendingBots(prev => prev.filter((_, i) => i !== idx));
  }

  function handleReject(idx) {
    setPendingBots(prev => prev.filter((_, i) => i !== idx));
  }

  useEffect(() => {
    let approvedBots = [];
    try {
      approvedBots = JSON.parse(localStorage.getItem("approvedBots") || "[]");
    } catch {}
    if (approvedBots.length > 0 && typeof approveBot === "function") {
      approvedBots.forEach(bot => approveBot(bot));
      localStorage.removeItem("approvedBots");
    }
  }, [approveBot]);

  if (isLoading) {
    return (
      <div className="hero-section">
        <div style={{ color: 'var(--accent)', textAlign: "center", fontSize: "1.2rem" }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="hero-section">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <AuthButtons />
        </div>
        <h1 className="hero-headline">BetterAiBots Content Moderation</h1>
        <div style={{ 
          textAlign: "center", 
          color: "#fff", 
          fontSize: "1.1rem", 
          marginTop: "50px",
          background: "#172d3e",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 2px 14px #36ff9544"
        }}>
          <p>🔒 <strong>Admin Access Required</strong></p>
          <p>Please log in to access the moderation panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <AuthButtons />
      </div>
      <h1 className="hero-headline">BetterAiBots Content Moderation</h1>
      <div style={{ margin: "25px 0 40px 0", background: "#101c26", padding: 22, borderRadius: 18, boxShadow: "0 1px 10px #36ff9522" }}>
        <Button
          style={{ background: "#36ff95", color: "#101c26", border: "none", fontWeight: 700, marginBottom: 10 }}
          onClick={() => setAdminAddMode(v => !v)}
        >
          {adminAddMode ? "Close Add Bot Form" : "Add Bot (Admin Only)"}
        </Button>
        {adminAddMode && (
          <form onSubmit={handleAdminAddBot} style={{ marginTop: 10 }}>
            <div style={{ marginBottom: 7 }}>
              <label className="form-label neon-green">Title*</label>
              <input className="form-control" name="title" value={adminBot.title} onChange={handleAdminBotChange} required />
            </div>
            <div style={{ marginBottom: 7 }}>
              <label className="form-label neon-green">Description*</label>
              <input className="form-control" name="desc" value={adminBot.desc} onChange={handleAdminBotChange} required />
            </div>
            <div style={{ marginBottom: 7 }}>
              <label className="form-label neon-green">OpenAI GPT Link*</label>
              <input className="form-control" name="openaiLink" value={adminBot.openaiLink} onChange={handleAdminBotChange} required />
            </div>
            <div style={{ marginBottom: 7 }}>
              <label className="form-label neon-green">Image Import (optional)</label>
              <input className="form-control" name="image" value={adminBot.image} onChange={handleAdminBotChange} />
            </div>
            <div style={{ marginBottom: 7 }}>
              <label className="form-label neon-green">Categories (select one or more)</label>
              <select
                className="form-control"
                multiple
                value={adminBot.categories ? adminBot.categories.split(",") : []}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                  setAdminBot(prev => ({ ...prev, categories: selected.join(",") }));
                }}
              >
                {Object.keys(CATEGORY_SLUGS).map((catName) => (
                  <option key={catName} value={catName}>{catName}</option>
                ))}
              </select>
            </div>
            <Button type="submit" className="header-btn" style={{ marginTop: 6, width: "100%" }}>Add Bot</Button>
            {adminErr && <div style={{ color: "#ff5252", marginTop: 7 }}>{adminErr}</div>}
            {adminSuccess && <div className="neon-green" style={{ marginTop: 7 }}>{adminSuccess}</div>}
          </form>
        )}
      </div>
      <h2 style={{ color: 'var(--accent)', fontWeight: 700, fontSize: "1.28rem" }}>Pending Bot Submissions</h2>
      {pendingBots.length === 0 ? (
        <div className="neon-green" style={{ marginTop: 35 }}>No pending submissions 🎉</div>
      ) : (
        pendingBots.map((bot, idx) => (
          <div key={idx} style={{ background: "#172d3e", borderRadius: 18, padding: "20px 24px", margin: "22px auto", maxWidth: 560, boxShadow: "0 2px 14px #36ff9544" }}>
            <div style={{ fontWeight: 700, fontSize: "1.13rem" }}>{bot.title}</div>
            <div style={{ color: 'var(--accent)', margin: "8px 0" }}>{bot.desc}</div>
            <a href={bot.openaiLink} target="_blank" rel="noopener noreferrer" style={{ color: "#0bbfdb" }}>{bot.openaiLink}</a>
            <div style={{ marginTop: 12 }}>
              <Button style={{ background: "#36ff95", color: "#101c26", border: "none", marginRight: 10 }} onClick={() => handleApprove(idx)}>Approve</Button>
              <Button style={{ background: "#f66", color: "#fff", border: "none" }} onClick={() => handleReject(idx)}>Reject</Button>
            </div>
          </div>
        ))
      )}
      <h2 style={{ color: 'var(--accent)', fontWeight: 700, fontSize: "1.15rem", marginTop: 30 }}>
        Contact Form Submissions
      </h2>
      {contactMessages.length === 0 ? (
        <div style={{ color: "#fff", margin: "20px 0" }}>No contact messages yet.</div>
      ) : (
        contactMessages.map((msg, idx) => (
          <div key={idx} style={{
            background: "#192738",
            borderRadius: 14,
            padding: "18px 20px",
            margin: "14px 0",
            color: "#fff",
            boxShadow: "0 1px 7px #36ff9544"
          }}>
            <div style={{ fontWeight: 600, color: 'var(--accent)' }}>
              {msg.name} {"<" + msg.email + ">"}
            </div>
            <div style={{ fontSize: "0.97rem", margin: "7px 0 0 0" }}>{msg.message}</div>
            <div style={{ fontSize: "0.85rem", color: "#ccc", marginTop: 4 }}>{msg.date}</div>
          </div>
        ))
      )}
    </div>
  );
}



// --- Disclaimer Bar ---
// eslint-disable-next-line no-unused-vars
function DisclaimerBar() {
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });

  useEffect(() => {
    function handleResize() { setWindowWidth(window.innerWidth); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 900;

  return (
    <div style={{
      background: "none",
      textAlign: "center",
      fontWeight: 400,
      color: "#fff",
      fontFamily: "Inter, Arial, sans-serif",
      fontSize: "1.07rem",
      letterSpacing: 0.02,
      opacity: 0.92,
      marginBottom: 0,
      marginTop: 0,
      paddingLeft: isMobile ? 0 : "36px",
      paddingRight: isMobile ? 0 : "36px",
      paddingTop: "16px",
      paddingBottom: "10px",
      maxWidth: isMobile ? "100vw" : "1160px",
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <span style={{
        color: "#ff5252",
        fontWeight: 700,
        letterSpacing: 0.01,
        fontFamily: "inherit"
      }}>
        ** 
      </span>
      <span style={{
        color: 'var(--accent)',
        fontWeight: 700,
        fontFamily: "Inter, Arial, sans-serif"
      }}>
        Some content is AI-generated. BetterAiBots.com does not review, vet, or verify accuracy. Information may be incomplete, outdated, or biased.
      </span>
      <br />
      <span style={{
        color: 'var(--accent)',
        fontSize: "0.97rem",
        fontWeight: 500,
        letterSpacing: 0.01,
        display: "block",
        marginTop: 8
      }}>
        All trademarks and content belong to their respective owners.
      </span>
    </div>
  );
}
// --- MAIN APP ROUTER ---
function App() { 
  const [botList, setBotList] = useState(bots);
  const [pendingBots, setPendingBots] = useState(() => {
    const stored = localStorage.getItem("pendingBots");
    return stored ? JSON.parse(stored) : [];
  });
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClickPosition, setMenuClickPosition] = useState(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 900;
    }
    return false;
  });
  const [showCategoryBar, setShowCategoryBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    gptName: "",
    gptDesc: "",
    openaiUrl: "",
    customImageUrl: "",
    categories: []
  });

  const [botRecaptchaValue, setBotRecaptchaValue] = useState("");

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);




  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ gptName: "", gptDesc: "", openaiUrl: "", customImageUrl: "", categories: [] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!botRecaptchaValue) {
      alert('Please complete the reCAPTCHA');
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/submit-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          recaptchaToken: botRecaptchaValue
        }),
      });

      if (response.ok) {
        alert('Bot submitted successfully! We\'ll review it and add it to the directory.');
        handleCloseModal();
      } else {
        const error = await response.text();
        alert(`Error submitting bot: ${error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting bot. Please try again.');
    }
  };

  function approveBot(bot) {
    setBotList(prev => [{ ...bot, verified: true }, ...prev]);
  }

    const location = useLocation();
  // Reset scroll position to top on route change (but not if we have #play-video hash)
  useEffect(() => {
    // Only reset scroll if there's no #play-video hash
    // Pages with videos will handle their own scrolling
    if (location.hash !== '#play-video') {
      // Set scroll position to top immediately on mount/route change
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location.pathname, location.hash]);

  const toggleCategoryBar = () => {
    setShowCategoryBar(!showCategoryBar);
  };

  // Clear search when navigating to a new page
  useEffect(() => {
    setSearchValue("");
  }, [location.pathname]);

  const isLearnPage = location.pathname.startsWith('/learn');

  return (
    <>
    <div id="plasma-bg" />
      <GoogleAnalytics />
      {/* Wrapper container for ticker and nav bar - ensures both stay visible */}
      <div style={{
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'relative',
        zIndex: 10000,
        display: 'block',
        visibility: 'visible',
        opacity: 1
      }}>
        {/* Scrolling Disclaimer Ticker - At the very top, above everything, always running */}
        <div style={{ width: '100%', margin: 0, padding: 0 }}>
          {(() => {
            const path = location?.pathname || window.location.pathname || '';
            const pathLower = path.toLowerCase();
            const shouldShow = path === '/' || path === '/apps' || path === '/my-ai' || path === '/contact' || pathLower === '/podcast' || path.startsWith('/learn') || path.startsWith('/news');
            return shouldShow ? (
              <div className="site-ticker">
                {/* Ticker text container */}
                <div style={{
                  overflow: 'hidden',
                  width: '100%'
                }}>
                  <div className="ticker-container" style={{
                    display: 'inline-block',
                    animation: 'scroll-ticker 176s linear infinite',
                    minHeight: '24px',
                    lineHeight: '24px',
                    pointerEvents: 'none'
                  }}>
                  {[...tickerMessages, ...tickerMessages].map((message, index) => (
                    <span key={index} className="site-ticker-text">
                      {message}
                    </span>
                  ))}
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>
        {/* NavTabsBar - Desktop only, right below ticker */}
        {!isMobile && (
          <div className="site-nav-shell">
            <div style={{ position: 'relative', zIndex: 10002, width: '100%' }}>
              <NavTabsBar 
                showCategoryBar={showCategoryBar} 
                toggleCategoryBar={toggleCategoryBar}
              />
            </div>
          </div>
        )}
      </div>
      {/* Breadcrumbs - On mobile, pinned right under the scrolling disclaimer ticker */}
      {isMobile && <Breadcrumbs />}
      {/* Mobile header */}
      {isMobile && (
        <div>
          <AppHeader
            onOpenModal={handleOpenModal}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onMenuClick={(e) => {
              if (e && e.clientX !== undefined) {
                setMenuClickPosition({ x: e.clientX, y: e.clientY });
              }
              setMenuOpen(v => !v);
            }}
            isMobile={isMobile}
          />
        </div>
      )}
      {/* Breadcrumbs - Desktop only (mobile shows above header) */}
      {!isMobile && <Breadcrumbs />}
      <HamburgerMenu 
        open={menuOpen} 
        onClose={() => {
          setMenuOpen(false);
          setMenuClickPosition(null);
        }}
        clickPosition={menuClickPosition}
        isMobile={isMobile}
      />
      <Routes>
        <Route path="/" element={
          <Home
            botList={botList}
            onOpenModal={handleOpenModal}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            showCategoryBar={showCategoryBar}
            toggleCategoryBar={toggleCategoryBar}
          />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/learn" element={<LearnLevelSelector />} />
        <Route path="/learn/beginner" element={<Articles level="beginner" />} />
        <Route path="/learn/intermediate" element={<Articles level="intermediate" />} />
        <Route path="/learn/advanced" element={<Articles level="advanced" />} />
        <Route path="/learn/:level/:id" element={<ArticlePage />} />
        <Route path="/learn/:id" element={<ArticlePage />} />
        <Route path="/news" element={<News searchValue={searchValue} />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/my-ai" element={<MyAI trialApps={trialAppsData} freeApps={freeAppsData} paidApps={PAID_APPS} />} />
        <Route path="/Podcast" element={<Podcast />} />
        <Route path="/watch/:slug" element={<VideoWatchPage />} />
        <Route path="/:cat" element={<CategoryPage botList={botList} onOpenModal={handleOpenModal} />} />
        <Route path="/beginner-quiz" element={<AIQuiz />} />
        <Route path="/intermediate-quiz" element={<IntermediateQuiz />} />
        <Route path="/advanced-quiz" element={<AdvancedQuiz />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/moderation" element={<Moderation approveBot={approveBot} pendingBots={pendingBots} setPendingBots={setPendingBots} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div style={{ marginTop: isLearnPage ? 0 : '60px' }}>
      <FooterWithWallets showPWAInstallButton={false} />
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          width: 40,
          height: 40,
          background: 'linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(54, 255, 149, 0.3)',
          transition: 'all 0.2s ease',
          fontSize: '18px',
          color: '#101c26',
          fontWeight: 'bold'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(54, 255, 149, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(54, 255, 149, 0.3)';
        }}
        title="Scroll to top"
      >
        ↑
      </button>

      
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit a New AI Bot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Bot Name *</Form.Label>
              <Form.Control
                type="text"
                name="gptName"
                value={form.gptName}
                onChange={handleFormChange}
                required
                placeholder="Enter the name of the AI bot"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="gptDesc"
                value={form.gptDesc}
                onChange={handleFormChange}
                required
                placeholder="Describe what this bot does and its key features"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>OpenAI GPT Link *</Form.Label>
              <Form.Control
                type="url"
                name="openaiUrl"
                value={form.openaiUrl}
                onChange={handleFormChange}
                required
                placeholder="https://chatgpt.com/g/..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categories *</Form.Label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {CATEGORIES.map((cat) => (
                  <Form.Check
                    key={cat.name}
                    type="checkbox"
                    id={`category-${cat.name}`}
                    label={cat.name}
                    checked={form.categories.includes(cat.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm(prev => ({
                          ...prev,
                          categories: [...prev.categories, cat.name]
                        }));
                      } else {
                        setForm(prev => ({
                          ...prev,
                          categories: prev.categories.filter(c => c !== cat.name)
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </Form.Group>
            <div className="recaptcha-wrap">
              <ReCAPTCHA
                sitekey="6Lf2wlArAAAAAH0GDpzc02uW1KAD8TJXgD_kSz1j"
                onChange={setBotRecaptchaValue}
                theme="dark"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button 
                type="submit" 
                disabled={!botRecaptchaValue}
                style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, #09e269 0%, #0bbfdb 100%)',
                  color: '#101c26',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  opacity: !botRecaptchaValue ? 0.5 : 1,
                  pointerEvents: !botRecaptchaValue ? 'none' : 'auto'
                }}
                onMouseEnter={(e) => {
                  if (botRecaptchaValue) {
                    e.target.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (botRecaptchaValue) {
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                Submit
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

// --- FOOTER WITH WALLETS ---
function FooterWithWallets({ showPWAInstallButton = false, onPWAInstallClick }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect iOS mobile devices (iPhone/iPad)
  const isIOSMobile = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <footer
      className="site-footer"
      style={{
        marginTop: 0,
        padding: isMobile ? "5px 20px 1px 20px" : "5px 40px 1px 40px",
        fontSize: "1.01rem",
        position: "relative",
        fontFamily: "inherit",
      }}
    >
      {/* Main Footer Content: Multi-column Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
          gap: isMobile ? "30px" : "40px",
          padding: isMobile ? "10px 0" : "15px 0",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {/* Quick Links Column */}
        <div style={{
          order: isMobile ? 2 : 1
        }}>
          <h3 style={{
            color: 'var(--accent)',
            fontSize: "1.1rem",
            fontWeight: 700,
            marginBottom: "16px",
            fontFamily: "Inter, Arial, sans-serif"
          }}>
            Quick Links
          </h3>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            {[
              { to: "/", label: "Home" },
              { to: "/apps", label: "Apps" },
              { to: "/learn", label: "Learn" },
              { to: "/news", label: "News" },
              { to: "/Podcast", label: "Watch" }
            ].filter((link) => link.to !== location.pathname).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="site-footer__link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Column */}
        <div style={{
          order: isMobile ? 3 : 2
        }}>
          <h3 style={{
            color: 'var(--accent)',
            fontSize: "1.1rem",
            fontWeight: 700,
            marginBottom: "16px",
            fontFamily: "Inter, Arial, sans-serif"
          }}>
            Resources
          </h3>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <li>
              <Link to="/contact" className="site-footer__link">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/my-ai" className="site-footer__link">
                My AI
              </Link>
            </li>
            <li>
              <Link to="/about" className="site-footer__link">
                About
              </Link>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@BetterAiBots"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__link"
              >
                Channel
              </a>
            </li>
            {showPWAInstallButton && onPWAInstallClick && !isIOSMobile && (
              <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPWAInstallClick();
                  }}
                  className="site-footer__link"
                  style={{ cursor: "pointer" }}
                >
                  Install App
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* About/Info Column */}
        <div style={{
          order: isMobile ? 1 : 3,
          marginBottom: isMobile ? "20px" : "0"
        }}>
          <div style={{
            marginBottom: "16px",
            display: "flex",
            alignItems: "center"
          }}>
            <Link to="/" className="site-footer__brand-logo" aria-label="BetterAiBots home">
              <span className="brand-better">BetterAi</span>
              <span className="brand-bots">Bots</span>
            </Link>
          </div>
          <p className="site-footer__text">
            Paying for AI tools you forgot you had? BetterAiBots.com is your free command center for discovering powerful AI apps, comparing what works, and tracking every subscription so nothing slips through the cracks.
          </p>
        </div>
      </div>

      {/* Bottom Bar: Copyright and Legal */}
      <div className="site-footer__bar">
        <span className="site-footer__copyright">
          © {new Date().getFullYear()} BetterAiBots.com
        </span>
        {!isMobile && (
          <>
            <span className="site-footer__divider">|</span>
            <Link to="/legal" className="site-footer__legal-link">
              Legal & Terms
            </Link>
            <span className="site-footer__divider">|</span>
            <Link to="/privacy" className="site-footer__legal-link">
              Privacy Policy
            </Link>
            <span className="site-footer__divider">|</span>
          </>
        )}
        <div className="site-footer__powered">
          <span className="site-footer__powered-label">
            POWERED BY{" "}
          </span>
          <a
            href="https://www.skowers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__brand-link"
          >
            SKOWERS
          </a>
        </div>
      </div>
    </footer>
  );
}

// --- Wallet Address Horizontal ---
// eslint-disable-next-line no-unused-vars
function WalletAddressHorizontal({
  label,
  address,
  copied,
  handleCopy,
  copyText,
  copyColor = "#FFD700",
  showClipboard = true,
  showLabel = true
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "transparent",
        borderRadius: 6,
        padding: "0 0",
        margin: 0,
        fontFamily: "monospace"
      }}
    >
      <span
        style={{
          color: 'var(--accent)',
          background: "transparent",
          fontSize: "0.98rem",
          letterSpacing: 0.01,
          textShadow: "0 0 6px #36ff9580",
          padding: "1px 0",
          whiteSpace: "nowrap",
          userSelect: "all"
        }}
      >
        {address}
      </span>
      {showClipboard && (
        <ClipboardBtn
          address={address}
          copied={copied}
          handleCopy={handleCopy}
        />
      )}
      {showLabel && (
        <span
          style={{
            color: 'var(--accent)',
            fontWeight: 800,
            fontSize: "1.07rem",
            letterSpacing: 0.02,
            margin: "0 5px 0 1px",
            minWidth: 30,
            textShadow: "0 0 7px #36ff957a",
            textAlign: "right",
            cursor: "pointer",
            userSelect: "none"
          }}
          onClick={handleCopy}
          title={`Copy ${label} address`}
        >
          {label}
        </span>
      )}
      {copied && copyText && (
        <span
          style={{
            marginLeft: 10,
            fontSize: "1.01rem",
            color: copyColor,
            fontWeight: 700,
            letterSpacing: 0.01,
            verticalAlign: "middle"
          }}
        >
          {copyText}
        </span>
      )}
    </div>
  );
}

// --- Clipboard Button ---
function ClipboardBtn({ address, copied, handleCopy }) {
  return (
    <button
      title="Copy address"
      onClick={e => {
        e.preventDefault();
        if (handleCopy) handleCopy(e);
      }}
      style={{
        background: "none",
        border: "none",
        outline: "none",
        cursor: "pointer",
        padding: "0 2px",
        marginLeft: 0,
        display: "flex",
        alignItems: "center"
      }}
      tabIndex={0}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        style={{
          filter: "drop-shadow(0 0 6px #36ff95cc)",
          fill: copied ? "#36ff95" : "none",
          stroke: "#36ff95",
          strokeWidth: "2.1"
        }}
      >
        <rect x="8" y="8" width="10" height="10" rx="2" />
        <rect x="4" y="4" width="10" height="10" rx="2" />
      </svg>
    </button>
  );
}

// Function to find related news articles based on keywords and content similarity
function findRelatedNewsArticles(currentArticle, allArticles, limit = 2) {
  if (!currentArticle || !allArticles || !Array.isArray(allArticles) || allArticles.length === 0) return [];
  
  // Extract keywords from title and excerpt
  const currentTitle = (currentArticle.title || '').toLowerCase();
  const currentExcerpt = (currentArticle.excerpt || '').toLowerCase();
  const currentContent = (currentArticle.content || '').toLowerCase();
  
  // Create a set of keywords from title (split by common words)
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']);
  
  const extractKeywords = (text) => {
    if (!text || typeof text !== 'string') return [];
    return text
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word.toLowerCase()))
      .map(word => word.toLowerCase());
  };
  
  const currentKeywords = new Set([
    ...extractKeywords(currentTitle),
    ...extractKeywords(currentExcerpt),
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
  const seenSlugs = new Set(); // Track article slugs to prevent duplicates
  const scoredArticles = allArticles
    .filter(a => {
      // Filter out current article, articles without title/excerpt, and duplicates
      if (!a || !a.slug || a.slug === currentArticle.slug || !a.title || !a.excerpt) return false;
      if (seenSlugs.has(a.slug)) return false; // Skip duplicates
      seenSlugs.add(a.slug);
      return true;
    })
    .map(otherArticle => {
      const otherTitle = (otherArticle.title || '').toLowerCase();
      const otherExcerpt = (otherArticle.excerpt || '').toLowerCase();
      const otherKeywords = new Set([
        ...extractKeywords(otherTitle),
        ...extractKeywords(otherExcerpt)
      ]);
      
      // Calculate keyword overlap
      let score = 0;
      currentKeywords.forEach(keyword => {
        if (otherKeywords.has(keyword)) {
          score += 2; // Title/excerpt matches are weighted higher
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
      
      // Bonus for same category if it exists
      if (currentArticle.category && otherArticle.category && currentArticle.category === otherArticle.category) {
        score += 1;
      }
      
      return { article: otherArticle, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
  
  // Final deduplication by slug to ensure no duplicates
  const uniqueArticles = [];
  const finalSeenSlugs = new Set();
  for (const article of scoredArticles) {
    if (article && article.slug && !finalSeenSlugs.has(article.slug)) {
      finalSeenSlugs.add(article.slug);
      uniqueArticles.push(article);
      if (uniqueArticles.length >= limit) break;
    }
  }
  
  return uniqueArticles;
}

// Function to add internal links to news article content
function addInternalLinksToNews(content, currentSlug, allArticles) {
  if (!content || typeof content !== 'string' || !allArticles || !Array.isArray(allArticles)) return content;
  
  // Blacklist of common words that should NEVER be auto-linked
  const blacklistedWords = new Set([
    'learn', 'robot', 'complete', 'reach', 'out', 'follow', 'up', 'scalable', 'repeatable',
    'empathy', 'creativity', 'relationship', 'building', 'build', 'conversion', 'efficiency', 'research',
    'resources', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'up', 'about', 'into', 'through', 'during', 'including', 'until', 'against',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'get', 'got', 'give', 'take',
    'make', 'go', 'come', 'see', 'know', 'think', 'say', 'tell', 'ask', 'work', 'use', 'try', 'call',
    'find', 'want', 'need', 'help', 'seem', 'feel', 'become', 'leave', 'put', 'set', 'add', 'remove',
    'update', 'change', 'modify', 'create', 'edit', 'delete', 'save', 'load', 'manage', 'control',
    'access', 'start', 'stop', 'run', 'show', 'hide', 'read', 'write', 'send', 'receive', 'copy',
    'paste', 'cut', 'search', 'filter', 'sort', 'view', 'click', 'link', 'open', 'close',
    // Common nouns and descriptors
    'google', 'googles', 'world', 'small', 'tools', 'tool', 'ai', 'business', 'businesses',
    'content', 'service', 'services', 'website', 'websites', 'website', 'page', 'pages',
    'social', 'media', 'marketing', 'brand', 'brands', 'design', 'designs', 'image', 'images',
    'post', 'posts', 'campaign', 'campaigns', 'customer', 'customers', 'owner', 'owners',
    'company', 'companies', 'product', 'products', 'feature', 'features', 'system', 'systems',
    'platform', 'platforms', 'application', 'applications', 'software', 'technology', 'technologies',
    'data', 'information', 'time', 'year', 'years', 'people', 'way', 'ways', 'day', 'days',
    'man', 'men', 'woman', 'women', 'thing', 'things', 'part', 'parts', 'life', 'lives',
    'work', 'works', 'case', 'cases', 'group', 'groups', 'number', 'numbers', 'place', 'places',
    'point', 'points', 'problem', 'problems', 'fact', 'facts', 'hand', 'hands', 'eye', 'eyes',
    'head', 'heads', 'face', 'faces', 'side', 'sides', 'end', 'ends', 'back', 'backs',
    'line', 'lines', 'name', 'names', 'word', 'words', 'question', 'questions', 'answer', 'answers',
    'home', 'homes', 'room', 'rooms', 'door', 'doors', 'window', 'windows', 'table', 'tables',
    'chair', 'chairs', 'book', 'books', 'paper', 'papers', 'letter', 'letters', 'number', 'numbers',
    'money', 'moneys', 'water', 'waters', 'food', 'foods', 'car', 'cars', 'house', 'houses',
    'school', 'schools', 'student', 'students', 'teacher', 'teachers', 'class', 'classes',
    'office', 'offices', 'job', 'jobs', 'work', 'works', 'hour', 'hours', 'minute', 'minutes',
    'second', 'seconds', 'week', 'weeks', 'month', 'months', 'year', 'years', 'today', 'yesterday',
    'tomorrow', 'morning', 'mornings', 'afternoon', 'afternoons', 'evening', 'evenings', 'night', 'nights'
  ]);
  
  // Create a map of common product/tool names to article slugs
  const productNameMap = new Map();
  
  allArticles.forEach(article => {
    if (!article || !article.title || typeof article.title !== 'string' || article.slug === currentSlug) return;
    if (!article.slug || typeof article.slug !== 'string') return;
    
    // Extract the main product/tool name from title
    const title = article.title.toLowerCase();
    
    // Common patterns to extract product names
    const patterns = [
      /^([^:]+?)(?:\s*:|\s+review|\s+guide|\s+platform|\s+tool)/i,
      /^(ai-powered\s+)?([a-z0-9-]+)(?:\s+platform|\s+tool|\s+system)/i,
      /^the\s+([a-z0-9-]+)/i,
    ];
    
    let productName = null;
    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match && match[1]) {
        productName = match[1].trim().toLowerCase();
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
    
    // Also try to extract from slug
    let slugProductName = null;
    if (article.slug && typeof article.slug === 'string') {
      const slugParts = article.slug.split('-');
      slugProductName = slugParts.find(part => part && part.length > 3 && !['complete', 'guide', 'review'].includes(part));
    }
    
    if (productName && typeof productName === 'string' && productName.length > 3) {
      productNameMap.set(productName, article);
    }
    if (slugProductName && typeof slugProductName === 'string' && slugProductName.length > 3) {
      productNameMap.set(slugProductName, article);
    }
    
    // Add variations
    if (productName && typeof productName === 'string') {
      const variations = [
        productName.replace(/\.(io|ai|com)$/, ''),
        productName.replace(/\s+ai$/, ''),
      ];
      variations.forEach(variation => {
        if (variation && typeof variation === 'string' && variation.length > 3) {
          productNameMap.set(variation, article);
        }
      });
    }
  });
  
  let processedContent = content;
  const linkedArticles = new Set();
  
  // Process each potential product mention
  productNameMap.forEach((targetArticle, productName) => {
    if (!targetArticle || !targetArticle.slug || linkedArticles.has(targetArticle.slug)) return;
    if (!productName || typeof productName !== 'string') return;
    
    // CRITICAL: Check blacklist - never link common words
    const lowerProductName = productName.toLowerCase();
    if (blacklistedWords.has(lowerProductName)) {
      return; // Skip this entirely - it's a common word
    }
    
    const escapedName = productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const backtick = String.fromCharCode(96);
    const regexPattern = '(^|[^\\[\\]()' + backtick + '])(\\b' + escapedName + '\\b)(?![^<]*>)(?![^\\[]*\\]\\()';
    const regex = new RegExp(regexPattern, 'gi');
    
    const matches = [...processedContent.matchAll(regex)];
    if (matches.length === 0) return;
    
    let linkCount = 0;
    const maxLinks = 2;
    
    processedContent = processedContent.replace(regex, (match, prefix, term) => {
      if (linkCount >= maxLinks) return match;
      
      // FINAL SAFETY CHECK: Make absolutely sure the matched term isn't a blacklisted word
      // Check base form, possessive form, and plural forms
      const matchedTerm = term.toLowerCase();
      const baseTerm = matchedTerm.replace(/'s$/, '').replace(/s$/, '');
      
      if (blacklistedWords.has(matchedTerm) || blacklistedWords.has(baseTerm)) {
        return match; // Skip this match - it's a common word
      }
      
      const beforeMatch = processedContent.substring(0, processedContent.lastIndexOf(match, processedContent.indexOf(match)));
      const codeBlockCount = (beforeMatch.match(/```/g) || []).length;
      if (codeBlockCount % 2 !== 0) return match;
      
      linkCount++;
      linkedArticles.add(targetArticle.slug);
      
      // Replace with HTML link to news article
      return `${prefix}<a href="/news/${targetArticle.slug}" style="color: #36ff95; text-decoration: underline;">${term}</a>`;
    });
  });
  
  return processedContent;
}

// --- INDIVIDUAL NEWS ARTICLE PAGE ---
function NewsArticle() {
  const { slug } = useParams();
  const location = useLocation();
  
  // Convert date from MM-DD-YY format to ISO format (YYYY-MM-DD)
  const convertDateToISO = (dateString) => {
    if (!dateString) return new Date().toISOString().split('T')[0];
    
    // Handle MM-DD-YY or MM-DD-YYYY format
    if (dateString.includes('-')) {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        let month = parts[0].padStart(2, '0');
        let day = parts[1].padStart(2, '0');
        let year = parseInt(parts[2], 10);
        
        // Handle 2-digit years (assume 2000s)
        if (year < 100) {
          year = 2000 + year;
        }
        
        // Return ISO format: YYYY-MM-DD
        return `${year}-${month}-${day}`;
      }
    }
    
    // If parsing fails, try to parse as-is
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch (e) {
      // Fallback to current date
    }
    
    return new Date().toISOString().split('T')[0];
  };
  
  // Auto-scroll to and play video if #play-video hash is present
  useEffect(() => {
    if (location.hash === '#play-video') {
      // First ensure we're at the top, then scroll to video after content loads
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Wait for content to render, then find and scroll to video
      setTimeout(() => {
        const videoIframe = document.querySelector('iframe[src*="youtube.com/embed"]');
        if (videoIframe) {
          videoIframe.scrollIntoView({ behavior: 'auto', block: 'center' });
          // Try to autoplay the video by updating the src with autoplay parameter
          const currentSrc = videoIframe.getAttribute('src');
          if (currentSrc && !currentSrc.includes('autoplay=1')) {
            const separator = currentSrc.includes('?') ? '&' : '?';
            videoIframe.setAttribute('src', `${currentSrc}${separator}autoplay=1`);
          }
        }
      }, 600);
    }
  }, [location.hash, slug]);

  // Auto-scroll to and play audio if #play-audio hash is present
  useEffect(() => {
    if (location.hash === '#play-audio') {
      // First ensure we're at the top, then scroll to audio after content loads
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Wait for content to render, then find and scroll to audio player
      setTimeout(() => {
        const audioPlayer = document.getElementById('article-audio-player');
        if (audioPlayer) {
          audioPlayer.scrollIntoView({ behavior: 'auto', block: 'center' });
          // Try to autoplay the audio
          audioPlayer.play().catch(() => {
            // Autoplay prevented - this is normal browser behavior
          });
        }
      }, 600);
    }
  }, [location.hash, slug]);
  
  // Rotating image component for GPT-5 article
  const RotatingGPT5Image = ({ alt, className, style }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
      require('./assets/gpt5updates.webp'),
      require('./assets/gpt5updates2.webp')
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 10000); // 10 seconds

      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <img 
        src={images[currentImageIndex]} 
        alt={alt} 
        className={className}
        style={style}
      />
    );
  };
  
  // Use the imported newsArticles from data/news.js
  const article = newsArticles.find(article => article.slug === slug);
  
  if (!article) {
    return (
      <div className="hero-section">
        <h1 className="hero-headline">Page Not Found - BetterAiBots</h1>
        <p className="hero-subheadline custom-hero-desc">
          The article you're looking for doesn't exist.
        </p>
        <Link to="/news" className="read-more-btn">Back to News</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet key={article.slug}>
        <title>{article.title} – BetterAiBots.com</title>
        <meta name="description" content={article.excerpt} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={`https://betteraibots.com/news/${article.slug}`} />
        <link rel="canonical" href={`https://betteraibots.com/news/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={article.image ? (article.image.startsWith('http') ? article.image : `https://betteraibots.com${article.image}`) : "https://betteraibots.com/og-image.png?v=3"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={article.title} />
        <meta property="og:site_name" content="BetterAiBots.com" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={`https://betteraibots.com/news/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@BetterAiBots" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.image ? (article.image.startsWith('http') ? article.image : `https://betteraibots.com${article.image}`) : "https://betteraibots.com/og-image.png?v=3"} />
        <meta name="article:published_time" content={convertDateToISO(article.date)} />
        <meta name="article:author" content={article.author} />
        <meta name="article:section" content={article.category} />
        <meta name="article:tag" content={(() => {
          const tagMap = {
            "the-death-of-the-resume-why-companies-are-using-ai-to-hire-without-ever-reading-your-cv": "AI, Artificial Intelligence, AI Recruiting, AI Hiring, Applicant Tracking System, ATS, AI Job Screening, AI Video Interviews, HireVue, Pymetrics, AI Bias in Hiring, Automated Hiring, AI Recruitment, Job Search, Career, BetterAiBots",
            "the-rise-of-ai-companions-why-millions-are-talking-to-chatbots-daily": "AI, Artificial Intelligence, AI Companions, Chatbots, AI Relationships, Character.AI, Replika, AI Romance, Digital Intimacy, AI Psychology, Human-AI Interaction, AI Society, BetterAiBots",
            "ai-remote-jobs-home-office-gold-rush-2025": "AI, Artificial Intelligence, AI Jobs, Remote Work, AI Income, Work From Home, AI Automation, AI Tools, BetterAiBots",
            "ai-robotics-revolution-everything-you-own-2025": "AI, Artificial Intelligence, AI Robotics, Smart Home, IoT, Physical AI, AI Devices, BetterAiBots",
            "ai-virtual-assistant-how-to-automate-tasks-2025": "AI, Artificial Intelligence, AI Virtual Assistant, Task Automation, AI Productivity, Business Automation, Personal Automation, AI Tools, BetterAiBots",
            "why-small-businesses-beat-enterprise-ai-tools-2025": "AI, Artificial Intelligence, Small Business AI, Enterprise AI, Business Automation, AI Tools, SMB Technology, Competitive Advantage, BetterAiBots",
            "3-ai-tools-generate-leads-businesses-2026": "AI lead generation, AI prospecting tools, Apollo.io, Lusha, Seamless.ai, Reply.io, AI sales automation, B2B lead generation, AI outreach tools, lead generation workflow, AI CRM, AI qualification tools, sales automation, AI marketing tools, BetterAiBots"
          };
          return tagMap[article.slug] || "AI, Artificial Intelligence, AI News, BetterAiBots";
        })()} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.title,
            "description": article.excerpt,
            "image": article.image ? (article.image.startsWith('http') ? article.image : `https://betteraibots.com${article.image}`) : "https://betteraibots.com/og-image.png?v=3",
            "author": {
              "@type": "Organization",
              "name": article.author,
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
            "datePublished": convertDateToISO(article.date),
            "dateModified": convertDateToISO(article.date),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://betteraibots.com/news/${article.slug}`
            },
            "keywords": (() => {
              const keywordMap = {
                "the-death-of-the-resume-why-companies-are-using-ai-to-hire-without-ever-reading-your-cv": "AI, Artificial Intelligence, AI Recruiting, AI Hiring, Applicant Tracking System, ATS, AI Job Screening, AI Video Interviews, HireVue, Pymetrics, AI Bias in Hiring, Automated Hiring, AI Recruitment, Job Search, Career, Resume Screening, AI Assessment, BetterAiBots",
                "sora-2-physics-reality-ai-video-revolution-2025": "AI, Artificial Intelligence, Sora 2, OpenAI, AI Video Generation, Physics Simulation, AI Video Editing, Video AI, BetterAiBots",
                "ai-remote-jobs-home-office-gold-rush-2025": "AI, Artificial Intelligence, AI Jobs, Remote Work, AI Income, Work From Home, AI Automation, AI Tools, BetterAiBots",
                "ai-robotics-revolution-everything-you-own-2025": "AI, Artificial Intelligence, AI Robotics, Smart Home, IoT, Physical AI, AI Devices, BetterAiBots",
                "ai-virtual-assistant-how-to-automate-tasks-2025": "AI, Artificial Intelligence, AI Virtual Assistant, Task Automation, AI Productivity, Business Automation, Personal Automation, AI Tools, BetterAiBots",
                "why-small-businesses-beat-enterprise-ai-tools-2025": "AI, Artificial Intelligence, Small Business AI, Enterprise AI, Business Automation, AI Tools, SMB Technology, Competitive Advantage, Small Business, BetterAiBots",
                "ai-productivity-stack-solo-founders-10-tools-run-business-alone-2025": "AI, Artificial Intelligence, Solo Founder, AI Productivity Stack, Business Automation, AI Tools for Entrepreneurs, One-Person Business, Solo Entrepreneurship, AI Customer Service, AI Sales Tools, Workflow Automation, BetterAiBots"
              };
              return keywordMap[article.slug] || "AI, Artificial Intelligence, AI News, BetterAiBots";
            })(),
            "articleSection": article.category,
            "inLanguage": "en-US"
          })}
        </script>
      </Helmet>
      
      <div className="article-container">
        <div className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <p className="article-excerpt">{article.excerpt}</p>
          <div className="article-author">
            <span>By {article.author}</span>
          </div>
          <div className="article-meta">
            <span className="article-date">{article.date}</span>
            {article.readTime && (
              <span className="article-read-time">{article.readTime}</span>
            )}
          </div>
        </div>
        
        <div className="article-image">
          {article.slug === "gpt-5-dawn-ai-revolution-2025" ? (
            <RotatingGPT5Image alt={article.title} />
          ) : (
            <img src={article.image} alt={article.title} />
          )}
        </div>
        
        {/* Top Share Buttons */}
        <div className="share-buttons" style={{ marginBottom: '30px' }}>
          <h3>Share this article:</h3>
          <div className="share-buttons-container">
            <button 
              onClick={() => {
                const url = `https://betteraibots.com/news/${article.slug}`;
                const text = `${article.title} - ${article.excerpt}`;
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
                const url = `https://betteraibots.com/news/${article.slug}`;
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
                const url = `https://betteraibots.com/news/${article.slug}`;
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
                const url = `https://betteraibots.com/news/${article.slug}`;
                const text = `${article.title} - ${article.excerpt}`;
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
                const url = `https://betteraibots.com/news/${article.slug}`;
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
        
        <div className="article-content" dangerouslySetInnerHTML={{ 
          __html: (() => {
            let content = article.slug === 'how-to-use-ai-to-learn-anything-10x-faster' 
              ? article.content.replace('AUDIO_SOURCE_PLACEHOLDER', require('./assets/Learn_Ten_Times_Faster_Using_AI_Playbooks.m4a'))
              : article.slug === 'ai-virtual-assistant-how-to-automate-tasks-2025'
              ? article.content.replace('AUDIO_SOURCE_PLACEHOLDER', require('./assets/ai virtual assistant.mp3'))
              : article.slug === 'sora-2-physics-reality-ai-video-revolution-2025'
              ? article.content.replace('AUDIO_SOURCE_PLACEHOLDER', require('./assets/Sora2 physics champ of ai video.mp3'))
              : article.slug === 'ai-robotics-revolution-everything-you-own-2025'
              ? article.content.replace('AUDIO_SOURCE_PLACEHOLDER', require('./assets/WatchingYouEverywhere.mp3'))
              : article.slug === 'nano-banana-game-changing-ai-image-editor'
              ? article.content.replace('AUDIO_SOURCE_PLACEHOLDER', require('./assets/Nano_Banana_Becomes_Conversational_Image_Editor.m4a'))
              : article.slug === 'nano-banana-pro-upgrade-whats-new'
              ? article.content.replace('AUDIO_SOURCE_PLACEHOLDER', require('./assets/Nano_Banana_Pro_Versus_the_Free_Model.m4a'))
              : article.slug === 'alibaba-ai-revolution-53-billion-investment-2025'
              ? article.content.replace('AUDIO_SOURCE_PLACEHOLDER', require('./assets/Alibaba_s_$53_Billion_AI_Pivot.m4a'))
              : article.content;
            
            // Add internal links to news articles
            content = addInternalLinksToNews(content, article.slug, newsArticles);
            return content;
          })()
        }} />
        
        <div className="article-footer">
          <div className="share-buttons">
            <h3>Share this article:</h3>
            <div className="share-buttons-container">
              <button 
                onClick={() => {
                  const url = `https://betteraibots.com/news/${article.slug}`;
                  const text = `${article.title} - ${article.excerpt}`;
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
                  const url = `https://betteraibots.com/news/${article.slug}`;
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
                  const url = `https://betteraibots.com/news/${article.slug}`;
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
                  const url = `https://betteraibots.com/news/${article.slug}`;
                  const text = `${article.title} - ${article.excerpt}`;
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
                  const url = `https://betteraibots.com/news/${article.slug}`;
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
          
          <Link to="/news" className="back-to-news-btn">← Back to News</Link>
        </div>
        
        {/* Related Articles Section */}
        {(() => {
          const relatedArticles = findRelatedNewsArticles(article, newsArticles, 2);
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
                color: 'var(--accent)'
              }}>
                Related Articles
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {relatedArticles.map((relatedArticle) => {
                  const relatedImage = relatedArticle.image 
                    ? (typeof relatedArticle.image === 'string' 
                        ? (relatedArticle.image.startsWith('http') 
                            ? relatedArticle.image 
                            : relatedArticle.image.startsWith('/')
                              ? relatedArticle.image
                              : `/${relatedArticle.image}`)
                        : relatedArticle.image)
                    : null;
                  
                  return (
                    <Link
                      key={relatedArticle.slug}
                      to={`/news/${relatedArticle.slug}`}
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
                      {relatedImage && (
                        <div style={{
                          width: '100%',
                          paddingBottom: '56.25%', // 16:9 aspect ratio
                          position: 'relative',
                          overflow: 'hidden',
                          background: '#1a1a1a'
                        }}>
                          <img 
                            src={relatedImage} 
                            alt={relatedArticle.title}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
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
                        {relatedArticle.excerpt && (
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
                            {relatedArticle.excerpt}
                          </p>
                        )}
                        {relatedArticle.date && (
                          <span style={{
                            display: 'inline-block',
                            fontSize: '0.75rem',
                            color: 'var(--accent)',
                            backgroundColor: 'rgba(54, 255, 149, 0.1)',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            border: '1px solid rgba(54, 255, 149, 0.3)',
                            marginTop: '8px',
                            fontWeight: '500'
                          }}>
                            {relatedArticle.date}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Explore more - internal links for indexing */}
        <nav style={{
          marginTop: '48px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(54, 255, 149, 0.06) 0%, rgba(26, 35, 48, 0.4) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(54, 255, 149, 0.15)'
        }} aria-label="Explore more">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: 'var(--accent)' }}>Explore more</h2>
          <p style={{ fontSize: '0.95rem', color: '#b0b0b0', marginBottom: '16px' }}>Discover AI tools, guides, and news on BetterAiBots.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link to="/learn" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Learn AI guides</Link>
            <span style={{ color: '#555' }}>·</span>
            <Link to="/news" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>News</Link>
            <span style={{ color: '#555' }}>·</span>
            <Link to="/apps" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Apps</Link>
            <span style={{ color: '#555' }}>·</span>
            <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Home</Link>
          </div>
        </nav>
      </div>
    </>
  );
}

// --- AUTH0 PROVIDER WRAPPER ---
export default function AppWithRouter() {
  return (
    <ThemeProvider>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
                authorizationParams={{
            redirect_uri: "https://www.betteraibots.com/moderation",
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          }}
      >
        <HelmetProvider>
          <Router>
            <App />
          </Router>
        </HelmetProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
}



