import { CATEGORY_SLUGS } from './constants';
import React, { useState, useEffect, useMemo } from "react";
import logo from './assets/betteraibotsglowlogo.webp';
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
import pipesai from './assets/pipesai.webp';
import anybiz from './assets/anybiz.webp';
import catalisterai from './assets/catalisterai.webp';
import castmagicai from './assets/castmagicai.webp';
import runpod from './assets/runpod.webp';
import thordata from './assets/thordata.webp';
import webydoai from './assets/webydoai.webp';
import tidioai from './assets/tidioai.webp';
import humeai from './assets/humeai.webp';
import blackboxai from './assets/blackboxai.webp';
import airiaai from './assets/airiaai.webp';
import bebopai from './assets/bebopai.webp';
import adcreativeaitrial from './assets/adcreativeaitrial.png';
import apolloLogo from './assets/apolloailogo.webp';
import atria1 from './assets/atria1.jpg';
import InVideoAvatar from './assets/InVideoAvatar.webp';
import megahr from './assets/megahr.webp';
import n8nicon from './assets/n8nicon.jpg';
import warmyicon from './assets/warmyicon.jpg';
import chatgptai from './assets/chatgptai.jpg';
import claudeailogo from './assets/claudeailogo.jpg';
import geminiai from './assets/geminiai.jpg';
import recomaze1 from './assets/recomaze1.jpg';
import vida1 from './assets/vida1.jpg';
import plesk1 from './assets/plesk1.jpg';
import surecam1 from './assets/surecam1.jpg';
import diginius1 from './assets/diginius1.jpg';
import seosparkplug1 from './assets/seosparkplug1.jpg';
import smartli1 from './assets/smartli1.jpg';
import consensus1 from './assets/consensus1.jpg';
import browseai1 from './assets/browseai1.jpg';
import musebrand from './assets/musebrand.jpg';
import nanozlogo from './assets/nanozlogo.png';
import preziai from './assets/preziai.png';
import landingi1 from './assets/landingi1.jpg';
import tradify1 from './assets/tradify1.jpg';
import logome from './assets/logome1.png';
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
import Articles from "./Articles";
import ArticlePage from "./ArticlePage";
import AIQuiz from "./components/AIQuiz";
import IntermediateQuiz from "./components/IntermediateQuiz";
import AdvancedQuiz from "./components/AdvancedQuiz";
import LearnLevelSelector from "./components/LearnLevelSelector";
import Podcast from "./Podcast";
import About from "./About";
import VideoWatchPage from "./VideoWatchPage";





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

  if (isLoading) return <div style={{ color: "#36ff95", textAlign: "center" }}>Loading...</div>;

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
      <span style={{ color: "#36ff95", fontWeight: 600 }}>
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
function NavTabsBar({ currentCategory, showCategoryBar, toggleCategoryBar, animationPaused, onToggleAnimation }) {
  return (
    <nav className="nav-tabs-bar" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <Link 
        to="/" 
        style={{
          position: 'absolute',
          left: '20px',
          fontSize: '0.7rem',
          fontWeight: 700,
          fontFamily: 'inherit',
          zIndex: 1,
          textDecoration: 'none'
        }}
      >
        <span style={{ color: '#ffffff', textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>BetterAi</span>
        <span style={{ color: '#36ff95', textShadow: '0 0 10px rgba(54, 255, 149, 0.5)' }}>Bots</span>
      </Link>
      <Link to="/" className="nav-tab" tabIndex={0}>Home</Link>
      <Link to="/apps" className="nav-tab" tabIndex={0}>Apps</Link>
      <Link to="/learn" className="nav-tab" tabIndex={0}>Learn</Link>
      <Link to="/news" className="nav-tab" tabIndex={0}>News</Link>
      <Link to="/Podcast" className="nav-tab" tabIndex={0}>Watch</Link>
      <Link to="/about" className="nav-tab" tabIndex={0}>About</Link>
      <span
        className={`bookmark-star-disabled${animationPaused ? ' star-animated' : ''}`}
        onClick={onToggleAnimation}
        style={{ 
          cursor: 'pointer',
          fontSize: '26px',
          marginLeft: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title={animationPaused ? 'Resume background animation' : 'Pause background animation'}
      >
        ⭐
      </span>
    </nav>
  );
}

// --- NEWS PAGE ---
function News({ searchValue }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1150);
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 900);
  
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
      "the-rise-of-ai-companions-why-millions-are-talking-to-chatbots-daily",
      "ai-productivity-stack-solo-founders-10-tools-run-business-alone-2025",
      "ai-remote-jobs-home-office-gold-rush-2025",
      "warmy-io-spam-folder-rebellion-email-deliverability",
      "why-small-businesses-beat-enterprise-ai-tools-2025",
      "ai-doctors-are-here-how-medical-diagnosis-ai-just-passed-human-accuracy",
      "ai-chip-wars-heat-up-nvidia-challenger-unexpected-source"
    ];
    return articlesWithVideos.includes(articleSlug);
  };

  // Helper function to check if an article has audio
  const articleHasAudio = (articleSlug) => {
    const articlesWithAudio = [
      "how-to-use-ai-to-learn-anything-10x-faster"
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
                          title="Play Audio"
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
    name: "RunPod.io",
    description: "Cloud GPU platform for training, fine-tuning, and deploying AI models with zero infrastructure management",
    category: "AI Infrastructure",
    features: ["On-demand GPUs", "Serverless AI workloads", "Instant scaling", "Global deployment"],
    price: "Pay per use",
    link: "https://get.runpod.io/w3na2cm4xdjp",
    image: runpod,
    readMoreLink: "/learn/runpod"
  },
  {
    name: "Pipes.ai",
    description: "AI-powered lead engagement platform that converts web leads into live calls for your sales team",
    category: "Sales & Lead Generation",
    features: ["AI-powered voice and SMS", "Lead verification and filtering", "Automated follow-ups", "Real-time analytics"],
    price: "Contact sales",
    link: "https://try.pipes.ai/hmqj0m3am6un",
    image: pipesai,
    readMoreLink: "/learn/pipes-ai"
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
    name: "AnyBiz.io",
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
    name: "SEOSparkPlug",
    description: "AI-powered SEO platform that analyzes 25+ factors, writes code, optimizes social content, and tracks results in one workflow",
    category: "SEO & Digital Marketing",
    features: ["25+ SEO factor analysis", "AI code generation", "Social media optimization", "Competitive analysis"],
    price: "Contact sales",
    link: "https://seosparkplug.com",
    image: seosparkplug1,
    readMoreLink: "/learn/seosparkplug"
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

// --- APPS PAGE ---
function Apps() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sectionFromUrl = searchParams.get('section');
  const [activeSection, setActiveSection] = useState(sectionFromUrl || 'trial');
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });
  
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
  
  const [expandedFeatures, setExpandedFeatures] = useState({});
  
  // Toggle feature expansion on mobile
  const toggleFeature = (cardId, featureIndex) => {
    if (!isMobile) return;
    const key = `${cardId}-${featureIndex}`;
    setExpandedFeatures(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const freeApps = [
    {
      name: "ChatGPT",
      description: "Free AI chatbot with GPT-4o mini, perfect for conversations and basic tasks",
      category: "Chat & Writing",
      features: ["Unlimited GPT-4o mini", "Web browsing", "File uploads", "Mobile app"],
      link: "https://chat.openai.com",
      image: chatgptai
    },
    {
      name: "Claude",
      description: "Anthropic's AI assistant with superior writing capabilities and 200K context",
      category: "Writing & Analysis",
      features: ["200K token context", "Superior writing", "File analysis", "Web search"],
      link: "https://claude.ai",
      image: claudeailogo
    },
    {
      name: "Google Gemini",
      description: "Google's AI model with advanced reasoning and multimodal capabilities",
      category: "Multimodal AI",
      features: ["Image analysis", "Code generation", "Creative writing", "Google integration"],
      link: "https://gemini.google.com",
      image: geminiai
    }
  ];

  const trialApps = [
    {
      name: "AdCreative",
      description: "AI-powered ad creative generator that creates high-converting ads in seconds",
      category: "Marketing & Advertising",
      features: ["AI ad generation", "Brand customization", "Performance tracking", "Multiple formats"],
      link: "https://free-trial.adcreative.ai/0dkpoiajb7o2",
      trialInfo: "Free Trial Available",
      image: adcreativeaitrial,
      readMoreLink: "/learn/adcreative-ai"
    },
    {
      name: "Alli AI",
      description: "AI-powered SEO automation platform that optimizes, automates, and scales SEO campaigns without coding",
      category: "SEO & Marketing",
      features: ["On-page optimization", "Real-time deployment", "No coding required", "Works with any CMS"],
      link: "https://try.alliai.com/0guepbqpqhsf",
      trialInfo: "10-Day Free Trial",
      image: "https://betteraibots.com/alliai.png",
      readMoreLink: "/learn/alli-ai"
    },
    {
      name: "Apollo AI",
      description: "AI sales platform with over 210 million contacts to find, contact, and close your ideal buyers",
      category: "Sales & CRM",
      features: ["Contact database", "AI-powered prospecting", "Email automation", "Sales intelligence"],
      link: "https://get.apollo.io/BAIB",
      trialInfo: "Pro plans from $49/month",
      image: apolloLogo,
      readMoreLink: "/learn/apollo-io"
    },
    {
      name: "Atria",
      description: "The AI ad engine that grows your revenue with analytics, research, creation, and inspiration tools all in one platform",
      category: "Marketing & Advertising",
      features: ["AI ad analytics", "25M+ ad library", "AI ad creation", "Competitor research", "Asset management"],
      link: "https://affiliates.tryatria.com/BAIB",
      trialInfo: "7-Day Free Trial",
      image: atria1,
      readMoreLink: "/learn/atria"
    },
    {
      name: "Blackbox.ai",
      description: "AI-powered code assistant that helps developers write code faster with real-time autocomplete and intelligent suggestions",
      category: "Development & Coding",
      features: ["AI code completion", "Multi-language support", "Context-aware suggestions", "Real-time autocomplete"],
      link: "https://blackboxai.partnerlinks.io/BAIB",
      trialInfo: "Free Trial Available",
      image: blackboxai,
      readMoreLink: "/learn/blackbox-ai"
    },
    {
      name: "Brevo",
      description: "AI-driven email marketing platform trusted by 500,000+ companies with automation and smart segmentation",
      category: "Email Marketing & Automation",
      features: ["Smart segmentation", "Send time optimization", "Automation workflows", "150+ integrations"],
      link: "https://get.brevo.com/um9xszmf3nfd",
      trialInfo: "Free plan available",
      image: "/brevologo.png",
      readMoreLink: "/learn/brevo-complete-guide"
    },
    {
      name: "Browse AI",
      description: "AI-powered web scraping and monitoring platform that extracts data from any website with no coding required",
      category: "Data Extraction & Web Scraping",
      features: ["No-code web scraping", "Website monitoring", "API generation", "7,000+ integrations"],
      link: "https://partners.browse.ai/BAIB",
      trialInfo: "Free trial available",
      image: browseai1,
      readMoreLink: "/learn/browse-ai"
    },
    {
      name: "Capsule CRM",
      description: "Simple CRM for small businesses to manage contacts, sales pipeline, and customer relationships",
      category: "Sales & CRM",
      features: ["Contact management", "Email marketing", "Project management", "Workflow automation"],
      link: "https://get.capsulenow.io/6894ebdizsds",
      trialInfo: "14-day free trial",
      image: "/capsulecrm.png",
      readMoreLink: "/learn/capsule-crm-complete-guide"
    },
    {
      name: "Consensus",
      description: "AI-powered research tool that finds and synthesizes evidence from scientific papers and academic literature",
      category: "Research & Education",
      features: ["AI research synthesis", "Academic paper search", "Evidence-based answers", "Citation management"],
      link: "https://get.consensus.app/BAIB",
      trialInfo: "Free trial available",
      image: consensus1,
      readMoreLink: "/learn/consensus"
    },
    {
      name: "Flowith.io",
      description: "AI-powered workflow automation platform that helps streamline your business processes",
      category: "Workflow Automation",
      features: ["AI process automation", "No-code workflows", "Integration capabilities", "Analytics dashboard"],
      link: "https://aff.flowith.io/52dtlja1b580",
      trialInfo: "Free trial available",
      image: "/flowith.jpg",
      readMoreLink: "/learn/flowith-io"
    },
    {
      name: "Hume AI",
      description: "Empathic AI platform that understands human emotion and expression to create more natural, engaging interactions",
      category: "AI & Machine Learning",
      features: ["Emotion recognition", "Voice AI", "Facial expression analysis", "Empathic AI models", "Real-time emotion detection"],
      link: "https://try.hume.ai/BAIB",
      trialInfo: "Free Trial Available",
      image: humeai,
      readMoreLink: "/learn/hume-ai"
    },
    {
      name: "Invideo",
      description: "AI video creation platform with thousands of templates and easy editing",
      category: "Video Creation",
      features: ["AI video generation", "5000+ templates", "Text-to-video", "Easy editing"],
      link: "https://betteraibots.com/invideo",
      trialInfo: "Free Trial Available",
      image: InVideoAvatar,
      readMoreLink: "/learn/invideo-ai"
    },
    {
      name: "Landingi",
      description: "AI-powered landing page builder that creates high-converting landing pages in minutes. Build beautiful, responsive landing pages with drag-and-drop editor and AI assistance.",
      category: "Marketing & Web Design",
      features: ["AI landing page builder", "Drag-and-drop editor", "High-converting templates", "A/B testing", "Lead generation"],
      link: "https://try.landingi.com/lwfc597yjm25",
      trialInfo: "Free trial available",
      image: landingi1,
      readMoreLink: "/learn/landingi-complete-guide"
    },
    {
      name: "Lindy",
      description: "AI-powered personal assistant that helps you manage tasks",
      category: "Productivity & Personal Assistant",
      features: ["Task management", "Smart scheduling", "Email organization", "Meeting assistance"],
      link: "https://try.lindy.ai/lhgvxfidor04",
      trialInfo: "Free Trial Available",
      image: "/lindy.png",
      readMoreLink: "/learn/lindy-ai"
    },
    {
      name: "Lusha",
      description: "B2B contact data platform with verified emails, phone numbers, and company intelligence for sales teams",
      category: "Sales & CRM",
      features: ["Verified contact data", "Email finder", "Phone number lookup", "Company intelligence", "CRM integrations"],
      link: "https://partnerstack.lusha.com/w61xn76pa3sr",
      trialInfo: "Free Trial Available",
      image: "/lusha1.jpg",
      readMoreLink: "/learn/lusha"
    },
    {
      name: "Miro",
      description: "AI-powered collaboration platform with limitless canvas for teams to build, plan, and innovate together",
      category: "Collaboration & Design",
      features: ["AI-powered canvas", "160+ integrations", "Real-time collaboration", "Templates & workflows"],
      link: "https://ps.miro-affiliate.com/gwnvu4zj3r8r",
      trialInfo: "Free plan available",
      image: "/miro.png",
      readMoreLink: "/learn/miro-complete-guide"
    },
    {
      name: "MRPeasy",
      description: "AI-powered MRP software for small manufacturers with 10-200 employees",
      category: "Manufacturing & ERP",
      features: ["Production planning", "Inventory management", "CRM integration", "Real-time reporting"],
      link: "https://try.mrpeasy.com/m72w6bztymwh",
      trialInfo: "14-Day Free Trial",
      image: "/mrpeasy.png",
      readMoreLink: "/learn/mrpeasy-complete-guide"
    },
    {
      name: "Murf.ai",
      description: "Versatile AI voice generator & Text to Speech software with 200+ realistic voices in 20+ languages",
      category: "Voice AI & Audio",
      features: ["Voice cloning", "AI dubbing", "Voice changer", "200+ voices"],
      link: "https://get.murf.ai/i5n7gfvz5cbw",
      trialInfo: "Free trial available",
      image: "/murfai.png",
      readMoreLink: "/learn/murf-ai-complete-guide"
    },
    {
      name: "Museit.art",
      description: "AI-powered art creation platform that turns your imagination into beautiful artwork. Turn the noise into art with guided creativity and mindfulness-focused design.",
      category: "Creative & Design",
      features: ["AI art generation", "Mindfulness-focused creation", "Gallery-ready quality", "No technical skills required", "Creative inspiration"],
      link: "https://Museit.art",
      trialInfo: "Free trial available",
      image: musebrand,
      readMoreLink: "/learn/museit-art-complete-guide"
    },
    {
      name: "NanoZ.fun",
      description: "Branding Made Easy - Professional brand imagery at a fraction of traditional costs. Powered by cutting-edge AI that delivers results you've never seen before.",
      category: "Creative & Design",
      features: ["AI brand image generation", "Brand consistency", "Professional quality", "Affordable pricing", "Organizational tools", "Workflow optimization"],
      link: "https://nanoz.fun",
      trialInfo: "Free Trial Available",
      image: nanozlogo,
      readMoreLink: "/learn/nanoz-complete-guide"
    },
    {
      name: "Prezi",
      description: "AI-powered presentation platform that creates engaging, interactive presentations in minutes. Better presentations, faster with AI—stand out from the crowd with Prezi's unique open canvas and dynamic movement.",
      category: "Content Creation & Media",
      features: ["AI presentation creation", "Interactive presentations", "Prezi Video integration", "1M+ images and assets", "25% more effective than slides"],
      link: "https://try.prezi.com/9kk83fjh4yri",
      trialInfo: "Free trial available",
      image: preziai,
      readMoreLink: "/learn/prezi-complete-guide"
    },
    {
      name: "Recomaze",
      description: "AI-powered e-commerce platform that turns your store into an AI sales agent with discoverability, concierge, and conversion optimization",
      category: "E-commerce & Sales",
      features: ["AI discoverability", "AI concierge", "Agentic sales flows", "Cart uplift", "Conversion memory"],
      link: "https://affiliate.recomaze.ai/BAIB",
      trialInfo: "7-Day Free Trial",
      image: recomaze1,
      readMoreLink: "/learn/recomaze"
    },
    {
      name: "Reply.io",
      description: "AI-powered sales outreach platform with multichannel sequences, email automation, and AI SDR agents",
      category: "Sales & CRM",
      features: ["AI SDR agents", "Multichannel sequences", "Email automation", "LinkedIn automation", "Meeting scheduler"],
      link: "https://get.reply.io/ub7edypmq2gj",
      trialInfo: "14-day free trial",
      image: "/replyio.png",
      readMoreLink: "/learn/reply-io-complete-guide"
    },
    {
      name: "Smartli",
      description: "AI-powered content creation platform with product description generator, blog writer, ads writer, and image editing tools",
      category: "Content Creation & E-commerce",
      features: ["AI product descriptions", "AI blog writer", "AI ads writer", "Background remover", "Watermark remover"],
      link: "https://smartli.partnerlinks.io/BAIB",
      trialInfo: "7-day free trial",
      image: smartli1,
      readMoreLink: "/learn/smartli"
    },
    {
      name: "ThorData",
      description: "Enterprise-grade proxy and web scraping infrastructure with 60M+ IPs, 120+ scraper APIs, and powerful tools for AI data collection",
      category: "Data & Proxies",
      features: ["60M+ residential IPs", "120+ scraper APIs", "99.9% uptime", "Free trial available"],
      link: "https://affiliate.thordata.com/BAIB",
      trialInfo: "Free Trial Available",
      image: thordata,
      readMoreLink: "/learn/thordata"
    },
    {
      name: "Tidio AI",
      description: "AI customer service platform with Lyro AI Agent, Live Chat, Help Desk, and automated flows to eliminate up to 90% of support questions",
      category: "Customer Service & Support",
      features: ["Lyro AI Agent", "Live Chat", "Help Desk", "Automated Flows", "67% resolution rate"],
      link: "https://affiliate.tidio.com/BAIB",
      trialInfo: "Free Trial Available",
      image: tidioai,
      readMoreLink: "/learn/tidio-ai"
    },
    {
      name: "Tradify",
      description: "Save 10+ hours/week on admin with quoting, invoicing, scheduling, job tracking, and accounting integrations. Built for electricians, plumbers, HVAC, and all trade businesses.",
      category: "Business & Productivity",
      features: ["Job management", "Quoting & invoicing", "Scheduling & dispatch", "Job tracking", "Accounting integrations", "Digital timesheets"],
      link: "https://partners.tradifyhq.com/rh188vnbjrvr",
      trialInfo: "Free Trial Available",
      image: tradify1,
      readMoreLink: "/learn/tradify-complete-guide"
    },
    {
      name: "VEED",
      description: "Online video editor with AI features for creating professional content",
      category: "Video Editing",
      features: ["AI video editing", "Auto-subtitles", "Background removal", "Collaboration tools"],
      link: "https://veed.cello.so/rwFO6zwGZh9",
      trialInfo: "Free plan available",
      image: "/veedreview.png",
      readMoreLink: "/learn/veed-complete-guide"
    },
    {
      name: "Vida",
      description: "AI Agent Operating System for deploying omnichannel AI agents that call, text, email, chat, and manage business workflows",
      category: "AI & Automation",
      features: ["AI phone agents", "Omnichannel communication", "No-code agent builder", "Enterprise scalability"],
      link: "https://try.vida.io/BAIB",
      trialInfo: "Free Trial Available",
      image: vida1,
      readMoreLink: "/learn/vida-ai-agent-os"
    },
    {
      name: "Warmy",
      description: "Auto All-In-One Tool For Email Deliverability To Make Your Email Channel Reliable",
      category: "Email Marketing",
      features: ["AI-driven automation", "Email deliverability optimization", "Spam folder avoidance", "Real-time insights"],
      link: "https://warmyio.partnerlinks.io/ffy5y6ll9374",
      trialInfo: "7-Day Free Trial",
      image: warmyicon,
      readMoreLink: "/news/warmy-io-spam-folder-rebellion-email-deliverability"
    },
    {
      name: "Webydo",
      description: "Professional web design platform that lets you create pixel-perfect websites without coding, with built-in CMS and client management",
      category: "Web Design & Development",
      features: ["No-code design", "Built-in CMS", "Client management", "Secure hosting"],
      link: "https://partners.webydo.com/BAIB",
      trialInfo: "Free Trial Available",
      image: webydoai,
      readMoreLink: "/learn/webydo"
    },
    {
      name: "Wispr Flow",
      description: "Voice-first AI assistant for faster typing, note-taking, and content creation across all your apps",
      category: "Productivity & Voice AI",
      features: ["Voice dictation", "Cross-platform compatibility", "AI-powered transcription", "Background operation"],
      link: "https://wisprflow.ai/downloads?referral=KING16",
      trialInfo: "Free trial available",
      image: "https://betteraibots.com/wispr.png",
      readMoreLink: "/learn/wispr-flow-complete-guide"
    },
    {
      name: "Logome",
      description: "AI-powered logo generator and brand kit creator.",
      category: "Creative & Design",
      features: ["AI logo generator", "Brand kit creation", "Website templates", "Social media templates", "Business cards", "Email signatures", "100+ fonts", "Free logo design"],
      link: "https://logomeai.partnerlinks.io/BAIB",
      trialInfo: "Start for free",
      image: logome,
      readMoreLink: "/learn/logome-complete-guide"
    }
  ];


  const renderAppCard = (app, type) => {
    const cardId = `${app.name}-${type}`;
    return (
    <div key={app.name} className="app-card" style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      border: '2px solid #36ff95',
      boxShadow: '0 0 20px rgba(54, 255, 149, 0.4), 0 0 40px rgba(54, 255, 149, 0.2), inset 0 0 20px rgba(54, 255, 149, 0.1)',
      borderRadius: '16px',
      padding: isMobile ? '16px' : '24px',
      marginBottom: '20px',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      cursor: isMobile ? 'default' : 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: isMobile ? 'auto' : '400px',
      width: '100%',
      maxWidth: isMobile ? 'calc(100vw - 40px)' : '100%',
      boxSizing: 'border-box'
    }} onClick={!isMobile ? (e) => {
      // Don't open affiliate link if clicking on "Read More" link
      if (e.target.closest('a[href]')) {
        return;
      }
      window.open(app.link, '_blank');
    } : undefined}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div 
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
            border: '1px solid rgba(54, 255, 149, 0.2)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(54, 255, 149, 0.4)';
            e.currentTarget.style.boxShadow = '0 0 8px rgba(54, 255, 149, 0.25)';
            const img = e.currentTarget.querySelector('img');
            if (img) {
              img.style.transform = 'scale(1.2)';
              img.style.padding = '4px';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(54, 255, 149, 0.2)';
            e.currentTarget.style.boxShadow = 'none';
            const img = e.currentTarget.querySelector('img');
            if (img) {
              img.style.transform = 'scale(1)';
              img.style.padding = '8px';
            }
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
                padding: '8px',
                transition: 'transform 0.3s ease, padding 0.3s ease'
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
              color: '#36ff95'
            }}>
              {app.name.charAt(0)}
            </span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 8px 0',
            fontSize: '1.43rem',
            fontWeight: '600',
            color: '#36ff95',
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
          <p style={{
            margin: '0 0 8px 0',
            color: '#ffffff',
            fontSize: '0.99rem',
            fontWeight: '500'
          }}>
            {app.category}
          </p>
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
        color: '#d1efe7',
        fontSize: '1rem',
        lineHeight: '1.5'
      }}>
        {app.description}
      </p>
      
      <div style={{ marginBottom: '16px', flex: 1 }}>
        <h4 style={{
          margin: '0 0 8px 0',
          fontSize: '0.9rem',
          color: '#36ff95',
          fontWeight: '600'
        }}>
          Key Features:
        </h4>
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          color: '#9ca3af',
          fontSize: '0.9rem'
        }}>
          {app.features.map((feature, index) => {
            const featureKey = `${cardId}-${index}`;
            const isExpanded = expandedFeatures[featureKey];
            return (
            <li 
              key={index} 
              style={{ 
                marginBottom: '4px',
                transition: 'all 0.2s ease',
                cursor: isMobile ? 'pointer' : 'default',
                color: isMobile && isExpanded ? '#ffffff' : '#9ca3af',
                fontSize: isMobile && isExpanded ? '1.035rem' : '0.9rem',
                fontWeight: isMobile && isExpanded ? '500' : 'normal'
              }}
              onClick={isMobile ? () => toggleFeature(cardId, index) : undefined}
              onMouseEnter={!isMobile ? (e) => {
                e.target.style.color = '#ffffff';
                e.target.style.fontSize = '1.035rem';
                e.target.style.fontWeight = '500';
              } : undefined}
              onMouseLeave={!isMobile ? (e) => {
                e.target.style.color = '#9ca3af';
                e.target.style.fontSize = '0.9rem';
                e.target.style.fontWeight = 'normal';
              } : undefined}
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
            color: '#36ff95',
            fontSize: '0.99rem',
            fontWeight: '600',
            cursor: isMobile ? 'pointer' : 'default',
            userSelect: 'none'
          }}
          onClick={isMobile ? (e) => {
            e.stopPropagation();
            window.open(app.link, '_blank');
          } : undefined}
        >
          Click to visit →
        </span>
        {app.readMoreLink && (
          <Link
            to={app.readMoreLink}
            state={{ from: '/apps' }}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              // Store referrer in sessionStorage as backup
              sessionStorage.setItem('articleFromPage', '/apps');
            }}
            style={{
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: '600',
              textDecoration: 'none',
              padding: '4px 8px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              transition: 'all 0.2s ease',
              position: 'relative',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(54, 255, 149, 0.2)';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.border = '1px solid rgba(54, 255, 149, 0.5)';
              e.target.style.color = '#36ff95';
              e.target.style.boxShadow = '0 0 10px rgba(54, 255, 149, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(139, 92, 246, 0.1)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.border = '1px solid rgba(139, 92, 246, 0.5)';
              e.target.style.color = '#ffffff';
              e.target.style.boxShadow = 'none';
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
        <title>AI Apps Directory 2025 – Free, Trial & Paid AI Tools | BetterAiBots.com</title>
        <meta name="description" content="Discover the best AI apps and tools in 2025: free AI applications, free trials, and premium paid AI tools for productivity, creativity, marketing, and business automation." />
        <meta name="keywords" content="AI apps, free AI tools, AI software, ChatGPT, Claude, Google Gemini, AI trials, paid AI tools, artificial intelligence apps, AI productivity tools, AI marketing tools, AI video creation, AI workflow automation, n8n, AdCreative, Invideo, VEED, Viral Launch, AI chatbots, AI writing tools, AI image generation, AI business tools" />
        <meta name="author" content="BetterAiBots.com" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Apps Directory 2025 – Free, Trial & Paid AI Tools" />
        <meta property="og:description" content="Explore curated AI apps and tools: free applications, trial versions, and premium paid tools to enhance your workflow and boost productivity." />
        <meta property="og:url" content="https://betteraibots.com/apps" />
        <meta property="og:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AI Apps Directory 2025 - Free, Trial & Paid AI Tools" />
        <meta property="og:site_name" content="BetterAiBots.com" />
        <meta property="og:locale" content="en_US" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="AI Apps Directory 2025 – Free, Trial & Paid AI Tools" />
        <meta property="twitter:description" content="Discover the best AI apps and tools in 2025: free applications, trial versions, and premium paid tools for productivity and business." />
        <meta property="twitter:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta property="twitter:image:alt" content="AI Apps Directory 2025" />
        <link rel="canonical" href="https://betteraibots.com/apps" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "AI Apps Directory 2025",
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
        <h1 className="hero-headline">AI Apps Directory</h1>
        <p className="hero-subheadline custom-hero-desc">
          Discover the best AI applications: free tools, trial versions, and premium paid solutions
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
            style={{
              background: activeSection === 'free' 
                ? 'linear-gradient(135deg, #36ff95, #0bbfdb)' 
                : 'rgba(255, 255, 255, 0.05)',
              color: activeSection === 'free' ? '#1a2330' : '#d1efe7',
              border: '1px solid rgba(54, 255, 149, 0.3)',
              borderRadius: '30px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            🆓 Free AI Apps ({freeApps.length})
          </button>
          <button
            onClick={() => setActiveSection('trial')}
            style={{
              background: activeSection === 'trial' 
                ? 'linear-gradient(135deg, #8b5cf6, #a855f7)' 
                : 'rgba(255, 255, 255, 0.05)',
              color: activeSection === 'trial' ? 'white' : '#d1efe7',
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
            style={{
              background: activeSection === 'paid' 
                ? 'linear-gradient(135deg, #ffd700, #ffb347)' 
                : 'rgba(255, 255, 255, 0.05)',
              color: activeSection === 'paid' ? '#1a2330' : '#d1efe7',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '30px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            💎 Paid AI Apps ({PAID_APPS.length})
          </button>
        </div>

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
                  color: '#36ff95',
                  fontSize: '2rem',
                  marginBottom: '16px'
                }}>
                  🆓 Free AI Applications
                </h2>
                <p style={{
                  color: '#d1efe7',
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
                {freeApps.map(app => renderAppCard(app, 'free'))}
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
                  color: '#d1efe7',
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
                  color: '#d1efe7',
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
                {trialApps.map(app => renderAppCard(app, 'trial'))}
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
                  color: '#d1efe7',
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
                {PAID_APPS.map(app => renderAppCard(app, 'paid'))}
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
            color: '#36ff95',
            fontSize: '1.5rem',
            marginBottom: '16px'
          }}>
            Can't find what you're looking for?
          </h3>
          <p style={{
            color: '#d1efe7',
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
        </ul>
      </div>
    </div>
  );
}


// --- HEADER with AUTH BUTTONS ---
function AppHeader({ onOpenModal, searchValue, setSearchValue, onMenuClick, isMobile, onToggleAnimation, animationPaused }) {
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
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect y="6" width="28" height="2.7" rx="1.35" fill="#36ff95"/>
              <rect y="13" width="28" height="2.7" rx="1.35" fill="#36ff95"/>
              <rect y="20" width="28" height="2.7" rx="1.35" fill="#36ff95"/>
            </svg>
          </button>
          <span
            className={`bookmark-star-disabled${animationPaused ? ' star-animated' : ''}`}
            onClick={onToggleAnimation}
            style={{ cursor: 'pointer' }}
            title={animationPaused ? 'Resume background animation' : 'Pause background animation'}
          >
            ⭐
          </span>
        </div>
      ) : null}
      {isMobile && (
        <div className="header-icons" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
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
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect y="6" width="28" height="2.7" rx="1.35" fill="#36ff95"/>
              <rect y="13" width="28" height="2.7" rx="1.35" fill="#36ff95"/>
              <rect y="20" width="28" height="2.7" rx="1.35" fill="#36ff95"/>
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
          background: 'linear-gradient(135deg, #172d3e 0%, #101c26 100%)',
          borderRadius: 22,
          boxShadow: '0 4px 32px #16ff6c22',
          border: '1.5px dashed #36ff95',
          color: '#e9f7ee',
          minHeight: 320,
          cursor: 'pointer',
          marginBottom: 18,
          transition: 'box-shadow 0.2s, border 0.2s',
        }}
      >
        <div style={{ fontSize: "2.2rem", marginBottom: 10, marginTop: 6 }}>✨</div>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, textAlign: "center" }}>Build Something Awesome?</div>
        <div style={{ marginTop: 10, color: "#36ff95", fontWeight: 500, textAlign: "center" }}>
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
        <div className={`bot-card${bot.isAffiliate ? ' affiliate-ad' : ''}${bot.title === "InVideo" ? ' invideo-bot' : ''}${bot.title === "VEED AI" ? ' veed-bot' : ''}${bot.title === "n8n - AI Workflow Automation" ? ' n8n-bot' : ''}${bot.title === "AI Music Maker" ? ' ai-music-maker' : ''}${bot.title === "Accounting GPT" ? ' accounting-gpt' : ''}`} key={i}>
          {bot.isAffiliate ? (
            <a href={bot.openaiLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', width: '100%', height: '100%', position: 'relative' }}>
              {bot.rotatingImages ? (
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
                {bot.free && bot.title !== "InVideo" && bot.title !== "VEED AI" && <div className="verified-badge">Free</div>}
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
                  <button className="openai-btn">{bot.title === "InVideo" ? "Try for free!" : bot.title === "VEED AI" ? "View VEED" : "View on OpenAI"}</button>
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
  
  // Randomize bot list while keeping affiliate ads in fixed middle positions
  // This randomizes every time the Home component mounts (when someone visits the page)
  const [randomizedBots] = useState(() => {
    // Identify the 3 affiliate ads
    const affiliateAds = botList.filter(bot => bot.isAffiliate === true);
    // Get all non-affiliate bots (including the free "InVideo" app)
    const regularBots = botList.filter(bot => bot.isAffiliate !== true);
    
    // Shuffle the regular bots using Fisher-Yates algorithm for better randomization
    const shuffledRegularBots = [...regularBots];
    for (let i = shuffledRegularBots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRegularBots[i], shuffledRegularBots[j]] = [shuffledRegularBots[j], shuffledRegularBots[i]];
    }
    
    // Calculate total length and middle positions for affiliate ads
    const totalLength = shuffledRegularBots.length + affiliateAds.length;
    const middleStart = Math.floor((totalLength - affiliateAds.length) / 2);
    
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
    // Preload all learn images
    learnImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

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
      
      <h1 style={{
        textAlign: 'center',
        fontSize: isMobile ? '2rem' : '3rem',
        fontWeight: 700,
        marginTop: '40px',
        marginBottom: '20px',
        fontFamily: 'inherit'
      }}>
        <span style={{ color: '#ffffff', textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>BetterAi</span>
        <span style={{ color: '#36ff95', textShadow: '0 0 20px rgba(54, 255, 149, 0.5)' }}>Bots</span>
      </h1>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%',
        marginTop: '0',
        marginBottom: '20px',
        padding: '20px'
      }}>
        <div style={{
          position: 'relative',
          maxWidth: '600px',
          width: '100%',
          padding: '8px',
          background: 'linear-gradient(135deg, #36ff95, #0bbfdb, #36ff95)',
          borderRadius: '12px',
          boxShadow: '0 0 30px rgba(54, 255, 149, 0.5), 0 0 60px rgba(11, 191, 219, 0.3)',
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
      
      <h3 style={{
        color: '#b5ffdb',
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
        Explore our <strong style={{ color: '#36ff95' }}>Apps</strong> directory to find free and premium AI tools, browse our <strong style={{ color: '#36ff95' }}>GPT Discovery Hub</strong> for custom GPTs, stay updated with the latest <strong style={{ color: '#36ff95' }}>News</strong> in the AI world, and enhance your knowledge through our <strong style={{ color: '#36ff95' }}>Learn</strong> section with beginner, intermediate, and advanced guides.
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
                  border: '2px solid #36ff95',
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
                <span style={{
                  color: '#b5ffdb',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  Apps
                </span>
                <span style={{
                  color: '#a0d4c0',
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  textAlign: 'center',
                  marginTop: '4px',
                  opacity: 0.8
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
                  border: '2px solid #36ff95',
                  boxShadow: '0 4px 12px rgba(54, 255, 149, 0.3)',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={learnImages[learnPrevIndex]} 
                    alt="Learn" 
                    style={{ 
                      maxWidth: isMobile ? '180px' : '240px',
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      opacity: learnImageIndex === learnPrevIndex ? 1 : 0,
                      transition: 'opacity 1.5s ease-in-out',
                      pointerEvents: 'none',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1
                    }} 
                  />
                  <img 
                    src={learnImages[learnImageIndex]} 
                    alt="Learn" 
                    style={{ 
                      maxWidth: isMobile ? '180px' : '240px',
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      opacity: learnImageIndex === learnPrevIndex ? 0 : 1,
                      transition: 'opacity 1.5s ease-in-out',
                      pointerEvents: 'none',
                      position: 'relative',
                      zIndex: 2
                    }} 
                  />
                </div>
                <span style={{
                  color: '#b5ffdb',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  Learn
                </span>
                <span style={{
                  color: '#a0d4c0',
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  textAlign: 'center',
                  marginTop: '4px',
                  opacity: 0.8
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
                  border: '2px solid #36ff95',
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
                <span style={{
                  color: '#b5ffdb',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  News
                </span>
                <span style={{
                  color: '#a0d4c0',
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  textAlign: 'center',
                  marginTop: '4px',
                  opacity: 0.8
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
                  heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                  border: '2px solid #36ff95',
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
                  color: '#b5ffdb',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  GPTs
                </span>
                <span style={{
                  color: '#a0d4c0',
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
                  border: '2px solid #36ff95',
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
                  color: '#b5ffdb',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  Show
                </span>
                <span style={{
                  color: '#a0d4c0',
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
          <Link to="/apps" style={{ textDecoration: 'none' }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(54, 255, 149, 0.1) 0%, rgba(11, 191, 219, 0.1) 100%)",
              borderRadius: "16px",
              padding: "30px",
              border: "1px solid rgba(54, 255, 149, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(54, 255, 149, 0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(54, 255, 149, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(54, 255, 149, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <h3 style={{
                color: "#36ff95",
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: "16px",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                🆓 Free & Premium Tools
              </h3>
              <p style={{
                color: "#d1efe7",
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0
              }}>
                Browse free AI bots you can try immediately, plus premium tools with free trials that usually don't require a credit card. Test them out, compare options, and find what actually fits your workflow — no pressure, no guesswork.
              </p>
            </div>
          </Link>
          
          <Link to="/learn" style={{ textDecoration: 'none' }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(54, 255, 149, 0.1) 0%, rgba(11, 191, 219, 0.1) 100%)",
              borderRadius: "16px",
              padding: "30px",
              border: "1px solid rgba(54, 255, 149, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(54, 255, 149, 0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(54, 255, 149, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(54, 255, 149, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <h3 style={{
                color: "#36ff95",
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: "16px",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                📘 Guides & Learning
              </h3>
              <p style={{
                color: "#d1efe7",
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0
              }}>
                Every tool on BetterAiBots comes with a clear, beginner-friendly user guide so you know exactly how to use it, what to expect, and what to avoid. Our learning paths help you level up fast—from exploring new AI tools to mastering advanced workflows—with quizzes to track your progress.
              </p>
            </div>
          </Link>
          
          <Link to="/news" style={{ textDecoration: 'none' }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(54, 255, 149, 0.1) 0%, rgba(11, 191, 219, 0.1) 100%)",
              borderRadius: "16px",
              padding: "30px",
              border: "1px solid rgba(54, 255, 149, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(54, 255, 149, 0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(54, 255, 149, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(54, 255, 149, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <h3 style={{
                color: "#36ff95",
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: "16px",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                📰 News & Updates
              </h3>
              <p style={{
                color: "#d1efe7",
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0
              }}>
                AI changes fast — and we keep you ahead of it. Our News & Updates section breaks down major AI announcements, new AI tools, and big platform changes in simple, clear language so you always know what matters and why.
              </p>
            </div>
          </Link>
          
          <Link to="/Podcast" style={{ textDecoration: 'none' }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(54, 255, 149, 0.1) 0%, rgba(11, 191, 219, 0.1) 100%)",
              borderRadius: "16px",
              padding: "30px",
              border: "1px solid rgba(54, 255, 149, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(54, 255, 149, 0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(54, 255, 149, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(54, 255, 149, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <h3 style={{
                color: "#36ff95",
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: "16px",
                fontFamily: "Inter, Arial, sans-serif"
              }}>
                🎯 Smart Testing
              </h3>
              <p style={{
                color: "#d1efe7",
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: 0
              }}>
                Smart testing matters. We show you how to evaluate new AI tools, which workflows to experiment with, and how to identify genuine value versus marketing hype — long before you spend a dollar.
              </p>
            </div>
          </Link>
        </div>
        
        <div style={{
          marginTop: isMobile ? "50px" : "80px"
        }}>
          <h2 style={{
            color: "#36ff95",
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            fontWeight: 700,
            marginBottom: "30px",
            textAlign: "center",
            fontFamily: "Inter, Arial, sans-serif"
          }}>
            Visit our Channel
          </h2>
          
          <div style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: isMobile ? "block" : "flex",
            alignItems: "flex-start",
            gap: "30px"
          }}>
            <div style={{
              flex: 1,
              textAlign: isMobile ? "center" : "left"
            }}>
              <p style={{
                color: "#d1efe7",
                fontSize: isMobile ? "1rem" : "1.05rem",
                lineHeight: "1.7",
                marginBottom: "20px"
              }}>
                If you've ever wondered which AI tools are worth your time, how to actually use them, or how to stay ahead in a world changing by the week… you're in the right place.
              </p>
              <p style={{
                color: "#d1efe7",
                fontSize: isMobile ? "0.95rem" : "1rem",
                lineHeight: "1.7",
                marginBottom: "24px"
              }}>
                On our <a 
                  href="https://www.youtube.com/@BetterAiBots" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: "#36ff95",
                    textDecoration: "underline",
                    fontWeight: 600
                  }}
                >YouTube channel</a>, we break down the newest AI tools, bots, and apps — from powerful paid platforms to the best free tools you can start using today. We test everything, explain how it works, and give you real results (not hype).
              </p>
            </div>
            
            <Link
              to="/Podcast"
              style={{
                display: "block",
                cursor: "pointer",
                maxWidth: isMobile ? "100%" : "420px",
                width: isMobile ? "100%" : "420px",
                flexShrink: 0,
                marginBottom: isMobile ? "30px" : "0",
                transition: "box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(54, 255, 149, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(54, 255, 149, 0.2)";
              }}
            >
              <img
                src={slideshowImages[currentImageIndex]}
                alt="BetterAiBots"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(54, 255, 149, 0.2)",
                  transform: currentImageIndex === 0 ? "scale(1)" : "scale(1.02)",
                  opacity: imageOpacity,
                  transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                  display: "block"
                }}
                draggable={false}
              />
            </Link>
          </div>
          
          {/* Navigation Buttons */}
          <div style={{
            maxWidth: "1000px",
            margin: isMobile ? "50px auto 0" : "90px auto 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "15px" : "20px"
          }}>
            <Link
              to="/apps"
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #36ff95 10%, #0bbfdb 90%)",
                color: "#101c26",
                padding: isMobile ? "14px 28px" : "16px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: isMobile ? "1rem" : "1.1rem",
                transition: "all 0.2s",
                textAlign: "center",
                minWidth: isMobile ? "140px" : "160px"
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
              View Apps
            </Link>
            
            <Link
              to="/learn"
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #36ff95 10%, #0bbfdb 90%)",
                color: "#101c26",
                padding: isMobile ? "14px 28px" : "16px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: isMobile ? "1rem" : "1.1rem",
                transition: "all 0.2s",
                textAlign: "center",
                minWidth: isMobile ? "140px" : "160px"
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
              Learn AI
            </Link>
            
            <Link
              to="/news"
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #36ff95 10%, #0bbfdb 90%)",
                color: "#101c26",
                padding: isMobile ? "14px 28px" : "16px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: isMobile ? "1rem" : "1.1rem",
                transition: "all 0.2s",
                textAlign: "center",
                minWidth: isMobile ? "140px" : "160px"
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
              Go To News
            </Link>
            
            <a
              href="https://www.youtube.com/@BetterAiBots"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #36ff95 10%, #0bbfdb 90%)",
                color: "#101c26",
                padding: isMobile ? "14px 28px" : "16px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: isMobile ? "1rem" : "1.1rem",
                transition: "all 0.2s",
                textAlign: "center",
                minWidth: isMobile ? "140px" : "160px"
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
              Visit Channel
            </a>
          </div>
          
          {/* Free Trials Link */}
          <div style={{
            width: "100%",
            textAlign: "center",
            marginTop: isMobile ? "25px" : "30px"
          }}>
            <Link
              to="/apps?section=trial"
              style={{
                color: "#36ff95",
                textDecoration: "none",
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontWeight: 600,
                transition: "all 0.2s",
                display: "inline-block"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#ffffff";
                e.target.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#36ff95";
                e.target.style.textDecoration = "none";
              }}
            >
              Looking for free trials?
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
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.name.length < 2 || !form.email.includes('@') || form.message.length < 4) {
      setError("Please fill in all fields with valid info.");
      return;
    }
    if (!recaptchaValue) {
      setError("Please verify you are not a robot.");
      return;
    }

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
      <form className="contact-form"
        style={{ maxWidth: 420, margin: "32px auto 0", background: "#172d3e", borderRadius: 20, padding: 28, boxShadow: "0 3px 26px #09e26924" }}
        onSubmit={handleSubmit}
      >
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
        <Button type="submit" className="header-btn" style={{ width: "100%", marginTop: 15 }}>Send Message</Button>
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
      <p style={{ color: "#d1efe7", fontSize: "1.1rem", marginBottom: "40px" }}>
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
        <b>6. Privacy Concerns:</b> Use the contact form for privacy-related questions or concerns. Do not email us.
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
        <div style={{ color: "#36ff95", textAlign: "center", fontSize: "1.2rem" }}>Loading...</div>
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
      <h2 style={{ color: "#36ff95", fontWeight: 700, fontSize: "1.28rem" }}>Pending Bot Submissions</h2>
      {pendingBots.length === 0 ? (
        <div className="neon-green" style={{ marginTop: 35 }}>No pending submissions 🎉</div>
      ) : (
        pendingBots.map((bot, idx) => (
          <div key={idx} style={{ background: "#172d3e", borderRadius: 18, padding: "20px 24px", margin: "22px auto", maxWidth: 560, boxShadow: "0 2px 14px #36ff9544" }}>
            <div style={{ fontWeight: 700, fontSize: "1.13rem" }}>{bot.title}</div>
            <div style={{ color: "#36ff95", margin: "8px 0" }}>{bot.desc}</div>
            <a href={bot.openaiLink} target="_blank" rel="noopener noreferrer" style={{ color: "#0bbfdb" }}>{bot.openaiLink}</a>
            <div style={{ marginTop: 12 }}>
              <Button style={{ background: "#36ff95", color: "#101c26", border: "none", marginRight: 10 }} onClick={() => handleApprove(idx)}>Approve</Button>
              <Button style={{ background: "#f66", color: "#fff", border: "none" }} onClick={() => handleReject(idx)}>Reject</Button>
            </div>
          </div>
        ))
      )}
      <h2 style={{ color: "#36ff95", fontWeight: 700, fontSize: "1.15rem", marginTop: 30 }}>
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
            <div style={{ fontWeight: 600, color: "#36ff95" }}>
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        color: "#36ff95",
        fontWeight: 700,
        fontFamily: "Inter, Arial, sans-serif"
      }}>
        Some content is AI-generated. BetterAiBots.com does not review, vet, or verify accuracy. Information may be incomplete, outdated, or biased.
      </span>
      <br />
      <span style={{
        color: "#36ff95",
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
  const [animationPaused, setAnimationPaused] = useState(false);
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

  return (
    <>
    <div id="plasma-bg" style={animationPaused ? { animationPlayState: 'paused' } : {}} />
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
            const shouldShow = path === '/' || path === '/apps' || path === '/contact' || pathLower === '/podcast' || path.startsWith('/learn') || path.startsWith('/news');
            return shouldShow ? (
              <div style={{
                position: 'relative',
                width: '100%',
                minHeight: '48px',
                background: 'linear-gradient(135deg, #172d3e 0%, #101c26 100%)',
                borderBottom: '2px solid rgba(54, 255, 149, 0.3)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                padding: '12px 0',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                zIndex: 10000,
                display: 'block',
                flexShrink: 0,
                visibility: 'visible',
                opacity: 1,
                margin: 0,
                top: 0,
                left: 0
              }}>
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
                    <span key={index} style={{
                      display: 'inline-block',
                      paddingRight: '80px',
                      color: '#36ff95',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      lineHeight: '24px'
                    }}>
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
          <div style={{
            background: "linear-gradient(135deg, #101c26 0%, #172d3e 100%)",
            zIndex: 10001,
            position: 'sticky',
            top: 0,
            width: '100%',
            display: 'block',
            visibility: 'visible',
            opacity: 1
          }}>
            <div style={{ position: 'relative', zIndex: 10002, width: '100%' }}>
              <NavTabsBar 
                showCategoryBar={showCategoryBar} 
                toggleCategoryBar={toggleCategoryBar}
                animationPaused={animationPaused}
                onToggleAnimation={() => setAnimationPaused(v => !v)}
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
            onToggleAnimation={() => setAnimationPaused(v => !v)}
            animationPaused={animationPaused}
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
      <div style={{ marginTop: '60px' }}>
      <FooterWithWallets showPWAInstallButton={false} />
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
      style={{
        marginTop: 0,
        background: "linear-gradient(90deg, #172d3e 0%, #18232f 100%)",
        color: "#b5ffdb",
        boxShadow: "0 -2px 24px #16ff6c16",
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
            color: "#36ff95",
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
                  style={{
                    color: "#b5ffdb",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    transition: "color 0.2s",
                    display: "inline-block"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#36ff95";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#b5ffdb";
                  }}
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
            color: "#36ff95",
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
              <Link
                to="/legal"
                style={{
                  color: "#b5ffdb",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  display: "inline-block"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#36ff95";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#b5ffdb";
                }}
              >
                Legal & Terms
              </Link>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                to="/privacy"
                style={{
                  color: "#b5ffdb",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  display: "inline-block"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#36ff95";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#b5ffdb";
                }}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{
                  color: "#b5ffdb",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  display: "inline-block"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#36ff95";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#b5ffdb";
                }}
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@BetterAiBots"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#b5ffdb",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  display: "inline-block"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#36ff95";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#b5ffdb";
                }}
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
                  style={{
                    color: "#b5ffdb",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    transition: "color 0.2s",
                    display: "inline-block",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#36ff95";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#b5ffdb";
                  }}
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
            <img
              src={logo}
              alt="BetterAiBots Logo"
              style={{
                height: "20px",
                width: "auto",
                background: "transparent",
                display: "block"
              }}
              draggable={false}
            />
          </div>
          <p style={{
            color: "#b5ffdb",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            margin: 0
          }}>
            BetterAiBots.com is a free AI app directory helping you discover the best tools, bots, and workflows. Explore, compare, and share powerful AI applications to boost productivity and simplify your life.
          </p>
        </div>
      </div>

      {/* Bottom Bar: Copyright and Legal */}
      <div
        style={{
          fontSize: "0.9rem",
          color: "#b5ffdb",
          textAlign: "center",
          fontWeight: 500,
          letterSpacing: 0.05,
          paddingTop: isMobile ? "5px" : "5px",
          paddingBottom: isMobile ? "5px" : "5px",
          borderTop: "1px solid rgba(54, 255, 149, 0.1)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: isMobile ? "8px" : "12px"
        }}
      >
        <span style={{ color: "#fff" }}>
          © {new Date().getFullYear()} BetterAiBots.com
        </span>
        {!isMobile && (
          <>
            <span style={{ color: "#b5ffdb", opacity: 0.5 }}>|</span>
            <Link
              to="/legal"
              style={{
                background: "linear-gradient(90deg, #36ff95 10%, #0bbfdb 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem"
              }}
            >
              Legal & Terms
            </Link>
            <span style={{ color: "#b5ffdb", opacity: 0.5 }}>|</span>
            <Link
              to="/privacy"
              style={{
                background: "linear-gradient(90deg, #36ff95 10%, #0bbfdb 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem"
              }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: "#b5ffdb", opacity: 0.5 }}>|</span>
          </>
        )}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{ color: "#fff", fontSize: "0.75rem" }}>
            POWERED BY{" "}
          </span>
          <a
            href="https://Dubby.fun"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(90deg, #36ff95, #ffd700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "Inter, Arial, sans-serif",
              display: "inline",
              fontSize: "0.9rem",
              paddingLeft: "3px"
            }}
          >
            DubbyDevs
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
          color: "#36ff95",
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
            color: "#36ff95",
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

// --- INDIVIDUAL NEWS ARTICLE PAGE ---
function NewsArticle() {
  const { slug } = useParams();
  const location = useLocation();
  console.log('NewsArticle component rendered with slug:', slug);
  
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
          videoIframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
          audioPlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Try to autoplay the audio
          audioPlayer.play().catch(err => {
            console.log('Autoplay prevented:', err);
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
  console.log('Article found:', article);
  
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
        <meta name="article:published_time" content={article.date} />
        <meta name="article:author" content={article.author} />
        <meta name="article:section" content={article.category} />
        <meta name="article:tag" content={(() => {
          const tagMap = {
            "the-rise-of-ai-companions-why-millions-are-talking-to-chatbots-daily": "AI, Artificial Intelligence, AI Companions, Chatbots, AI Relationships, Character.AI, Replika, AI Romance, Digital Intimacy, AI Psychology, Human-AI Interaction, AI Society, BetterAiBots",
            "ai-remote-jobs-home-office-gold-rush-2025": "AI, Artificial Intelligence, AI Jobs, Remote Work, AI Income, Work From Home, AI Automation, AI Tools, BetterAiBots",
            "ai-robotics-revolution-everything-you-own-2025": "AI, Artificial Intelligence, AI Robotics, Smart Home, IoT, Physical AI, AI Devices, BetterAiBots",
            "ai-virtual-assistant-how-to-automate-tasks-2025": "AI, Artificial Intelligence, AI Virtual Assistant, Task Automation, AI Productivity, Business Automation, Personal Automation, AI Tools, BetterAiBots",
            "why-small-businesses-beat-enterprise-ai-tools-2025": "AI, Artificial Intelligence, Small Business AI, Enterprise AI, Business Automation, AI Tools, SMB Technology, Competitive Advantage, BetterAiBots"
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
            "datePublished": article.date,
            "dateModified": article.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://betteraibots.com/news/${article.slug}`
            },
            "keywords": (() => {
              const keywordMap = {
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
            <span className="article-read-time">{article.readTime}</span>
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
          __html: article.slug === 'how-to-use-ai-to-learn-anything-10x-faster' 
            ? article.content.replace('AUDIO_SOURCE_PLACEHOLDER', require('./assets/Learn_Ten_Times_Faster_Using_AI_Playbooks.m4a'))
            : article.content 
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
      </div>
    </>
  );
}

// --- AUTH0 PROVIDER WRAPPER ---
export default function AppWithRouter() {
  return (
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
  );
}