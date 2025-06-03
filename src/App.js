import { CATEGORY_SLUGS } from './constants';
// import { CATEGORY_REVERSE } from "./constants"; // <- commented until used
import React, { useState, useEffect, useRef } from "react";
import logo from './assets/betteraibotsglowlogo.png';
import logoSmall from './assets/betteraibotsglowlogo8small.png';
import helperLogo from './assets/findbetteraibotshelper.png';
import helperBotLogo from './assets/findthebestaibotshelper.png';
import lovedocImg from './assets/lovedocplaceholder.png';
import placeholderImg from './assets/bot-placeholder.png';
import placeholderImg1 from './assets/bot-placeholder1.png';
import placeholderImg2 from './assets/bot-placeholder2.png';
import placeholderImg3 from './assets/bot-placeholder3.png';
import placeholderImg4 from './assets/bot-placeholder4.png';
import placeholderImg5 from './assets/bot-placeholder5.png';
import placeholderImg6 from './assets/bot-placeholder6.png';
import placeholderImg7 from './assets/bot-placeholder7.png';
import placeholderImg8 from './assets/bot-placeholder8.png';
import placeholderImg9 from './assets/bot-placeholder9.png';
import placeholderImg10 from './assets/bot-placeholder10.png';
import placeholderImg11 from './assets/bot-placeholder11.png';
import placeholderImg12 from './assets/bot-placeholder12.png';
import placeholderImg13 from './assets/bot-placeholder13.png';
import placeholderImg14 from './assets/bot-placeholder14.png';
import placeholderImg15 from './assets/bot-placeholder15.png';
import placeholderImg16 from './assets/bot-placeholder16.png';
import placeholderImg17 from './assets/bot-placeholder17.png';
import placeholderImg18 from './assets/bot-placeholder18.png';
import placeholderImg19 from './assets/bot-placeholder19.png';
import placeholderImg20 from './assets/bot-placeholder20.png';
import placeholderImg21 from './assets/bot-placeholder21.png';
import placeholderImg22 from './assets/bot-placeholder22.png';
import placeholderImg23 from './assets/bot-placeholder23.png';
import placeholderImg24 from './assets/bot-placeholder24.png';
import placeholderImg25 from './assets/bot-placeholder25.png';
import placeholderImg26 from './assets/bot-placeholder26.png';
import placeholderImg27 from './assets/bot-placeholder27.png';
import placeholderImg28 from './assets/bot-placeholder28.png';
import placeholderImg29 from './assets/bot-placeholder29.png';
import placeholderImg30 from './assets/bot-placeholder30.png';
import placeholderImg31 from './assets/bot-placeholder31.png';
import placeholderImg32 from './assets/bot-placeholder32.png';
import placeholderImg33 from './assets/bot-placeholder33.png';
import tipJar from './assets/thebestfreeaibotsgpt.png';
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
  Link,
  Navigate
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

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


// --- Plausible Analytics snippet ---
function PlausibleAnalytics() {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute("defer", "");
    script.setAttribute("data-domain", "betteraibots.com");
    script.src = "https://plausible.io/js/plausible.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
}

// ---- Placeholders for images ----
const placeholderImgs = [
  placeholderImg1, placeholderImg2, placeholderImg3, placeholderImg4, placeholderImg5,
  placeholderImg6, placeholderImg7, placeholderImg8, placeholderImg9, placeholderImg10,
  placeholderImg11, placeholderImg12, placeholderImg13, placeholderImg14, placeholderImg15,
  placeholderImg16, placeholderImg17, placeholderImg18, placeholderImg19, placeholderImg20, 
  placeholderImg21, placeholderImg22, placeholderImg23, placeholderImg24, placeholderImg25, 
  placeholderImg26, placeholderImg27, placeholderImg28, placeholderImg29, placeholderImg30,
  placeholderImg31, placeholderImg32, placeholderImg33
];

// ---- Shuffle utility for placeholders ----
function shuffle(arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const rawBots = [
  // ... (your existing bot list, unchanged) ...
  {
    title: "Scholar GPT",
    desc: "AI-powered academic research assistant for scholars and students.",
    image: placeholderImg4,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-kZ0eYXlJe-scholar-gpt",
    categories: ["Education", "Specialized Knowledge"]
  },
  
  {
    title: "TheLoveDoc",
    desc: "Relationship and dating advice (Not a real doctor)",
    image: placeholderImg7,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-6833fa918b148191a7b2d4cc2ea7114f-love-doc",
    categories: ["Health & Wellness", "Lifestyle"]
  },
  // ... const rawBots = [


  

  {
    title: "Video AI",
    desc: "Smart video editing, summaries, and insights powered by AI.",
    image: placeholderImg22,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-h8l4uLHFQ-video-ai",
    categories: ["Productivity", "Creative Tools"]
  },
  {
    title: "VetGPT",
    desc: "Get general veterinary advice on animal health, nutrition, and behavior. Not a substitute for professional veterinary care.",
    image: placeholderImg28,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-ZR0aH16CQ-vetgpt",
    categories: ["Health & Wellness", "Specialized Knowledge"]
  },
  {
    title: "Astrology Birth Chart GPT",
    desc: "Personalized astrological insights based on your birth date, time, and location.",
    image: placeholderImg30,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-WxckXARTP-astrology-birth-chart-gpt",
    categories: ["Specialized Knowledge", "Lifestyle"]
  },
  {
    title: "Health & Medicine",
    desc: "Get general health and wellness info powered by AI. Not a substitute for professional medical advice. (Not a real Doctor)",
    image: placeholderImg8,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-t3BUYjh4C-health-medicinenot-doctor-not-medical-advice",
    categories: ["Health & Wellness", "Education"]
  },
  
  {
    title: "Finance, Economics, Stock, Crypto & Trade Invest",
    desc: "Get in-depth financial analysis, crypto research, and investment insights. (Not financial advice)",
    image: placeholderImg14,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-iR15hX15H-finance-economics-stock-crypto-trade-invest",
    categories: ["Productivity"]
  },
  {
    title: "Blood Test Result Analysis for Health Insight",
    desc: "Understand your blood test results and get actionable health insights. Not real medical advice.",
    image: placeholderImg24,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-1AahKhimZ-blood-test-result-analysis-for-health-insight",
    categories: ["Health & Wellness", "Education"]
  },
  {
    title: "Cooking, Diet, Recipes, Nutrition & Food",
    desc: "Personalized recipes, diet plans, nutrition tips, and cooking advice in one spot.",
    image: placeholderImg5,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-KU2U5o7Wj-cookingdietrecipesnutritionfood",
    categories: ["Health & Wellness", "Lifestyle"]
  },
  {
    title: "Paintr",
    desc: "Identify any exact color of paint in seconds!", 
    image: placeholderImg31,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-6833f9d3f1f88191ba83263ab7a99ea7-paintr",
    categories: ["Specialized Knowledge"] 
  },
  {
    title: "Fitness Workout Diet PhD Coach",
    desc: "AI-powered fitness, workout, and diet advice from a PhD-level virtual coach.",
    image: placeholderImg15,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-ipOIcM229-fitness-workout-diet-phd-coach",
    categories: ["Health & Wellness", "Lifestyle"]
  },
  {
    title: "GIF Generator",
    desc: "Quickly create custom GIFs on any topic or mood. Fun and easy to use.",
    image: placeholderImg6,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-45WfVCFcy-gif-generator",
    categories: ["Creative Tools"]
  },
  
  {
    title: "AI Music Maker (Song Words to Music)",
    desc: "Turn your words or lyrics into music with this AI-powered music generator. Free to use!",
    image: placeholderImg12,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-rLVq3NTrN-ai-music-maker-song-words-to-music-free",
    categories: ["Music", "Creative Tools"]
  },
  {
    title: "Glibatree Art Designer",
    desc: "AI art design, concept visuals, and creative ideas from the Glibatree bot.",
    image: placeholderImg3,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-7CKojumSX-glibatree-art-designer",
    categories: ["Creative Tools"]
  },
  {
    title: "Grammar Checker",
    desc: "Checks your grammar, spelling, and clarity with suggestions for better writing.",
    image: placeholderImg2,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-kfkNLRrwD-grammar-checker",
    categories: ["Productivity", "Education"]
  },

  {
    title: "Law, Contract, Disclaimer",
    desc: "Get AI-powered info on contracts, disclaimers, and general law concepts. Not actual legal advice.",
    image: placeholderImg27,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-My8UBHpJn-law-contractdisclaimer-not-lawyer-legal-advice",
    categories: ["Productivity", "Specialized Knowledge"]
  },
  {
    title: "Accounting GPT",
    desc: "AI-powered accounting help, bookkeeping, and finance questions answered.",
    image: placeholderImg10,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-7RJghLmOO-accounting-gpt",
    categories: ["Productivity"]
  },
  {
    title: "Academic Assistant Pro",
    desc: "Academic support, research help, citation, essay and study tools.",
    image: placeholderImg23,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-UubB08D4y-academic-assistant-pro",
    categories: ["Education"]
  },
  {
    title: "Code Copilot",
    desc: "AI pair programmer for instant coding help, reviews, and bug fixes.",
    image: placeholderImg21,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-2DQzU5UZl-code-copilot",
    categories: ["Productivity"]
  },
  
  {
    title: "Math AI",
    desc: "Math solver and explainer: equations, word problems, and more.",
    image: placeholderImg33,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-WP1diWHRl-math",
    categories: ["Education"]
  },
  {
    title: "YouTube AI",
    desc: "AI for video summaries, channel insights, and content ideas for YouTube.",
    image: placeholderImg1,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-Wud3tXQj3-youtube-ai",
    categories: ["Productivity", "Creative Tools"]
  },
  {
    title: "Crypto Sentiment Tracker",
    desc: "Analyze real-time crypto sentiment and trends with one click. (Not financial advice)",
    image: placeholderImg13,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-6834013bf6288191ab9eaabe31591539-crypto-sentiment-tracker",
    categories: ["Productivity"]
  },
  {
    title: "DesignerGPT",
    desc: "AI-powered design assistant for digital art, logos, and graphics.",
    image: placeholderImg16,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-2Eo3NxuS7-designergpt",
    categories: ["Creative Tools"] // Changed from ["Digital Art"]
  },
  {
    title: "Video GPT by VEED – Instant Free AI Video Maker",
    desc: "Create AI-generated videos instantly for free with Video GPT by VEED.",
    image: placeholderImg17, // Changed from placeholderImg1
    free: true,
    openaiLink: "https://chatgpt.com/g/g-Hkqnd7mFT-video-gpt-by-veed-instant-free-ai-video-maker",
    categories: ["Creative Tools", "Productivity"]
  },
  {
    title: "AI Music Prompt Generator",
    desc: "Generate creative prompts for AI music generation and songwriting.",
    image: placeholderImg19,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-y2J4bAO8A-ai-music-prompt-generator",
    categories: ["Music", "Creative Tools"]
  },
  {
    title: "Stocks, Crypto, Options & Forex Market Summary",
    desc: "Summaries for stocks, crypto, options, forex and market analysis.",
    image: placeholderImg20,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-5wVuKfpEt-stocks-crypto-options-forex-market-summary",
    categories: ["Productivity"]
  },
  {
    title: "SciSpace",
    desc: "Ask questions and search for scientific literature instantly with SciSpace GPT.",
    image: placeholderImg25,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-NgAcklHd8-scispace",
    categories: ["Education", "Specialized Knowledge"]
  },
  
  {
    title: "PlaylistAI – Music Playlist Maker",
    desc: "Instantly create music playlists using AI and your favorite genres or moods.",
    image: placeholderImg26,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-KkxbQAVuk-playlistai-music-playlist-maker",
    categories: ["Music", "Lifestyle"]
  },
  {
    title: "Love Language",
    desc: "Discover and explore your love languages for better relationships and connection.",
    image: placeholderImg29,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-IEqZMsTpJ-love-language",
    categories: ["Health & Wellness", "Lifestyle"]
  },
  
  {
    title: "Personal Assistant",
    desc: "Organize and optimize your daily life with this AI-powered personal assistant.",
    image: placeholderImg11,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-hWAjkwSzj-personal-assistant",
    categories: ["Productivity"]
  },
  {
    title: "Fictional Therapist",
    desc: "A fictional AI therapist/psychologist for entertainment and writing. Not a real mental health service. (Not Real Therapy)",
    image: placeholderImg18,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-FGhasb1tZ-therapist-psychologist-fictional-not-real-therapy",
    categories: ["Health & Wellness", "Lifestyle"]
  },
  
  {
    title: "Logo",
    desc: "Design professional brand logos with this AI-powered logo creation expert.",
    image: placeholderImg32,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-pCq5xaCri-logo",
    categories: ["Creative Tools"]
  }
];

 


// Assign unique placeholder images for all bots that need them
function assignBotImages(rawBots) {
  const botsNeedingImages = rawBots.filter(bot => !bot.image);
  let placeholders = shuffle([...placeholderImgs]);
  while (placeholders.length < botsNeedingImages.length) {
    placeholders = placeholders.concat(shuffle([...placeholderImgs]));
  }
  let idx = 0;
  return rawBots.map(bot => {
    if (bot.image) return bot;
    return { ...bot, image: placeholders[idx++] };
  });
}
const bots = assignBotImages(rawBots);

// --- AUTH BUTTONS ---
function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <div style={{ color: "#36ff95" }}>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <button className="header-btn" onClick={() => loginWithRedirect()}>
        Admin Login
      </button>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ color: "#36ff95", fontWeight: 600 }}>
        {user?.email}
      </span>
      <button
        className="header-btn"
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        style={{ marginLeft: 10 }}
      >
        Logout
      </button>
    </div>
  );
}

// --- SECURE MODERATION ROUTE ---
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const adminEmail = "shayne@shayneskower.com"; // always use lowercase for emails

  useEffect(() => {
    // Always compare as lowercase to avoid Auth0 mismatch issues
    if (
      !isLoading &&
      (
        !isAuthenticated ||
        (user?.email || "").toLowerCase() !== adminEmail
      )
    ) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, user]);

  if (isLoading) {
    return (
      <div className="hero-section">
        <h2>Checking authentication…</h2>
      </div>
    );
  }
  if (
    !isAuthenticated ||
    (user?.email || "").toLowerCase() !== adminEmail
  ) {
    return (
      <div className="hero-section">
        <h2>Admin only: Access denied</h2>
      </div>
    );
  }
  return children;
}


// --- Nav Tabs Bar ---
function NavTabsBar({ currentCategory }) {
  const navRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!showDropdown) return;
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setShowDropdown(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [showDropdown]);

  return (
    <nav className="nav-tabs-bar" ref={navRef}>
      <Link to="/" className="nav-tab" tabIndex={0}>Home</Link>
      <div
        className="nav-tab nav-tab-dropdown"
        tabIndex={0}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
        style={{ position: "relative" }}
      >
               Categories
        <div className="nav-dropdown-list" style={{ display: showDropdown ? "flex" : "none" }}>
          {CATEGORIES.map((cat) => {
            const slug = CATEGORY_SLUGS[cat.name] || encodeURIComponent(cat.name);
            return (
              <Link
  to={`/${slug}`}
  className="nav-dropdown-item"
  key={cat.name}
  onClick={() => setShowDropdown(false)}
  tabIndex={0}
>
  {cat.name}
</Link>

            );
          })}
                </div>
      </div>
      <Link to="/articles" className="nav-tab" tabIndex={0}>Articles</Link>
      <Link to="/contact" className="nav-tab" tabIndex={0}>Contact Us</Link>
    </nav>
  );
}

// --- Hamburger Menu (mobile) ---
function HamburgerMenu({ open, onClose }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  if (!open) return null;
  return (
    <div className="menu-overlay" onClick={onClose}>
      <div className="menu-dropdown-centered" onClick={e => e.stopPropagation()} style={{ minWidth: 240 }}>
        <ul>
          <li onClick={() => { navigate('/'); onClose(); }}>Home</li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{ position: "relative" }}
          >
            <span>Categories ▾</span>
            <ul className="nav-dropdown-list mobile" style={{ display: showDropdown ? "flex" : "none", position: "static" }}>
              {CATEGORIES.map((cat) => (
                <li
  key={cat.name}
  className="nav-dropdown-item"
  onClick={() => { navigate(`/${encodeURIComponent(cat.name)}`); onClose(); }}
>
  {cat.name}
</li>

              ))}
            </ul>
          </li>
          <li onClick={() => { navigate('/articles'); onClose(); }}>Articles</li>
          <li onClick={() => { navigate('/contact'); onClose(); }}>Contact Us</li>
        </ul>
      </div>
    </div>
  );
}

// --- HEADER with AUTH BUTTONS ---
function AppHeader({ onOpenModal, searchValue, setSearchValue, onMenuClick, isMobile }) {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} className="header-logo" alt="BetterAiBots Logo" style={{ cursor: "pointer" }} />
      </Link>
      {!isMobile ? (
        <div className="header-search">
          <input
            type="text"
            placeholder="Search BetterAiBots.com"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          <button className="header-btn" onClick={onOpenModal}>Submit Bot</button>
        <span className="bookmark-star-disabled">⭐</span>
        </div>
      ) : null}
      {isMobile && (
        <div className="header-icons" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <button className="header-mob-menu-icon" onClick={onMenuClick}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
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
        <div className="bot-card" key={i}>
          {bot.free && <div className="verified-badge">Free</div>}
          <img
            src={bot.image}
            alt={bot.title}
            className="bot-image"
            onError={e => { e.target.onerror = null; e.target.src = placeholderImg; }}
          />
          <div className="bot-title">{bot.title}</div>
          <div className="bot-desc">{bot.desc}</div>
          <div className="bot-card-btn-wrapper">
            <a href={bot.openaiLink} target="_blank" rel="noopener noreferrer">
              <button className="openai-btn">View on OpenAI</button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- HOME PAGE ---
function Home({ botList, onOpenModal, searchValue, setSearchValue }) {
  const [showSearchBubble, setShowSearchBubble] = useState(false);
  const [bubbleSearch, setBubbleSearch] = useState("");
  const effectiveSearch = bubbleSearch.length > 0 ? bubbleSearch : searchValue;
  const filteredBots = botList.filter(bot =>
    bot.title.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
    bot.desc.toLowerCase().includes(effectiveSearch.toLowerCase())
  );

  function handleBubbleSearch(e) {
    e.preventDefault();
    setShowSearchBubble(false);
    setSearchValue(bubbleSearch);
  }

  useEffect(() => {
    if (!showSearchBubble) return;
    const onKey = (e) => { if (e.key === "Escape") setShowSearchBubble(false); };
    const onClick = (e) => {
      if (e.target.closest(".floating-search-box") || e.target.closest(".chat-btn")) return;
      setShowSearchBubble(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [showSearchBubble]);

  return (
    <>
      <Helmet>
        <title>BetterAiBots.com – Curated Free AI Bots Directory</title>
        <meta
          name="description"
          content="Discover free AI bots for productivity, education, lifestyle, music, health, creative tools, & more. Curated & easy to install. Explore now!"
        />
        <meta
          name="keywords"
          content="free AI bots, AI tools, productivity bots, creative tools, health bots, education bots, lifestyle bots, music bots, specialized knowledge, OpenAI GPTs, BetterAiBots"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="content-language" content="en-us" />
        <meta property="og:title" content="BetterAiBots.com – Free AI Bots Directory" />
        <meta
          property="og:description"
          content="Curated directory of free AI bots: Find, install, and share the best bots for productivity, health, creativity, and more."
        />
        <meta property="og:image" content="/betteraibotsglowlogo8.png" />
        <meta property="og:url" content="https://betteraibots.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BetterAiBots.com – Free AI Bots Directory" />
        <meta
          name="twitter:description"
          content="Curated directory of free AI bots: Find, install, and share the best bots for productivity, health, creativity, and more."
        />
        <meta name="twitter:image" content="/betteraibotsglowlogo8.png" />
        <link rel="canonical" href="https://betteraibots.com/" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "BetterAiBots.com",
            "url": "https://betteraibots.com/",
            "description": "Curated directory of free AI bots for productivity, health, creativity, and more.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://betteraibots.com/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      <div className="hero-section">
        <h1 className="hero-headline">Discover & Share The Best Free AI Bots</h1>
        <p className="hero-subheadline custom-hero-desc">
          Find better AI Bots to help improve workflow, improve your skills or make some money working from home!
        </p>
      </div>
      <div className="site-disclaimer">
  🔴 <strong>This site does not provide financial, legal, or medical advice. Bots are provided “as is” for entertainment and education only. Use at your own risk.</strong>
</div>
      <BotGrid bots={filteredBots} onOpenModal={onOpenModal} />
      {!showSearchBubble && (
        <button
          className="chat-btn"
          onClick={() => { setShowSearchBubble(true); setBubbleSearch(""); }}
          style={{ padding: 0, background: "none", border: "none", boxShadow: "none" }}
        >
          <img
            src={helperBotLogo}
            alt="Chat Bot Helper"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              boxShadow: "0 0 18px #36ff9588, 0 0 32px #1affad55",
              background: "transparent",
              transition: "box-shadow 0.2s"
            }}
          />
        </button>
      )}
      {showSearchBubble && (
        <div className="floating-search-box" style={{
          position: 'fixed', bottom: 110, right: 36, width: 300, background: '#192738',
          borderRadius: 22, boxShadow: '0 7px 48px #16ff6c58, 0 2px 8px #0bbfdb18', zIndex: 100, padding: 22, display: 'flex', flexDirection: 'column',
        }}>
          <form onSubmit={handleBubbleSearch} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input className="floating-chat-input" style={{ flex: 1, fontSize: "1.18rem" }} value={bubbleSearch}
              onChange={e => setBubbleSearch(e.target.value)} placeholder="search" autoFocus />
            <button type="submit" className="floating-chat-send" style={{ fontSize: "1.09rem", padding: "7px 20px" }}>
              search
            </button>
          </form>
        </div>
      )}
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
        <meta property="og:title" content={`${catName} Bots – BetterAiBots.com`} />
        <meta property="og:url" content={`https://betteraibots.com/${encodeURIComponent(cat)}`} />

      </Helmet>
      <div className="hero-section">
        <h1 className="hero-headline">{catName} Bots</h1>
        <p className="hero-subheadline custom-hero-desc">
          Curated bots for the <span className="neon-green">{catName}</span> category.
        </p>
      </div>
      <div className="site-disclaimer" style={{ padding: '0 20px', textAlign: 'center' }}>
        🔴 <strong>This site does not provide financial, legal, or medical advice. Bots are provided “as is” for entertainment and education only. Use at your own risk.</strong>
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
        <title>Contact Us – BetterAiBots.com</title>
        <meta
          name="description"
          content="Contact BetterAiBots.com for inquiries about our curated free AI bots directory. Questions, suggestions, or feedback? Reach out!"
        />
        <meta property="og:title" content="Contact Us – BetterAiBots.com" />
        <meta
          property="og:description"
          content="Contact BetterAiBots.com for inquiries about our curated free AI bots directory. Questions, suggestions, or feedback? Reach out!"
        />
        <meta property="og:image" content="/betteraibotsglowlogo8.png" />
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
        <div style={{ margin: "18px 0" }}>
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

// --- ARTICLES PAGE ---
function Articles() {
  return (
    <div className="hero-section">
      <Helmet>
        <title>Articles – BetterAiBots.com</title>
        <meta name="description" content="AI guides, bot spotlights, OpenAI tips, and more coming soon to BetterAiBots.com." />
        <meta property="og:title" content="Articles – BetterAiBots.com" />
        <meta property="og:description" content="AI guides, bot spotlights, OpenAI tips, and more coming soon to BetterAiBots.com." />
        <meta property="og:image" content="/betteraibotsglowlogo8.png" />
        <meta property="og:url" content="https://betteraibots.com/articles" />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1 className="hero-headline">Articles Coming Soon!</h1>
      <p className="hero-subheadline custom-hero-desc">
        We’ll post AI guides, tips, bot spotlights, and more. Stay tuned!
      </p>
    </div>
  );
}

// --- LEGAL PAGE ---
function Legal() {
  return (
    <div className="hero-section" style={{ maxWidth: 900, margin: "auto" }}>
      <Helmet>
        <title>Legal & Terms – BetterAiBots.com</title>
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Legal, Terms & Privacy – BetterAiBots.com" />
        <meta property="og:description" content="Legal info, privacy policy, and terms of use for BetterAiBots.com." />
        <meta property="og:image" content="/betteraibotsglowlogo8.png" />
        <meta property="og:url" content="https://betteraibots.com/legal" />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1 className="hero-headline">Legal, Terms & Disclaimers</h1>
      <div style={{
        textAlign: "left", margin: "30px auto", fontSize: "1.15rem", color: "#e9f7ee",
        background: "#172d3e", borderRadius: 18, padding: "36px 28px", boxShadow: "0 2px 22px #09e26924"
      }}>
        <b>Disclaimer & Important Notices:</b><br />
        BetterAiBots.com (“the Site”) is an <b>independent, free public directory</b> listing and linking to AI bots and OpenAI GPTs. The Site <b>does not own, operate, control, endorse, monitor, review, or vet any listed bots, AI services, or third-party content</b>. Bots, content, and links are provided “as is” and solely for informational, entertainment, and educational purposes.
        <br /><br />
        <b>No Affiliation or Endorsement:</b><br />
        BetterAiBots.com is not affiliated with OpenAI or any other bot developer or provider. Listing a bot does not constitute endorsement or verification of any kind.
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
        By using BetterAiBots.com, you agree to indemnify and hold harmless its owners, operators, affiliates, and contributors from any and all claims, liabilities, damages, or costs (including attorney’s fees) arising from your use of the Site, submissions, or interactions with any third-party bots or links.
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
        <b>2. Analytics:</b> We use privacy-friendly Plausible Analytics, which does not use cookies and only collects aggregate, anonymous site usage statistics.
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


// --- MODERATION PAGE ---
function Moderation({ approveBot, pendingBots, setPendingBots }) {
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

  return (
    <div className="hero-section">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <AuthButtons />
      </div>
      <h1 className="hero-headline">Moderation</h1>
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
        The content on this page is generated by artificial intelligence (AI) and is provided for informational and entertainment purposes only. The information may be incomplete, outdated, or biased and should not be considered professional advice. BetterAiBots.com does not review, vet, or verify the accuracy of any articles or information posted. Always consult a qualified professional before making important decisions. Use at your own risk.
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
        BetterAiBots is an independent directory for OpenAI GPTs and AI bots. All trademarks and content belong to their respective owners.
      </span>
    </div>
  );
}
// --- MAIN APP ROUTER ---
function App() { 
  const MAX_LOCAL_PENDING_BOTS = 10; // Change this number if you want a higher/lower limit

  const [botList, setBotList] = useState(bots);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [form, setForm] = useState({
    gptName: "",
    gptDesc: "",
    openaiUrl: "",
    customImageUrl: ""
  });
  const [formValidated, setFormValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [pendingBots, setPendingBots] = useState(() => {
    const stored = localStorage.getItem("pendingBots");
    return stored ? JSON.parse(stored) : [];
  });
  const [botRecaptchaValue, setBotRecaptchaValue] = useState("");
  const [showStickyLogo, setShowStickyLogo] = useState(false);

  useEffect(() => {
    function handleResize() { setWindowWidth(window.innerWidth); }
    window.addEventListener("resize", handleResize);

    function onScroll() {
      const logo = document.querySelector('.header-logo');
      if (!logo) return;
      const rect = logo.getBoundingClientRect();
      setShowStickyLogo(rect.bottom <= 0);
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const isMobile = windowWidth < 900;

  function getRandomPlaceholder() {
    return placeholderImgs[Math.floor(Math.random() * placeholderImgs.length)];
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === "customImageUrl" && value) {
      setPreviewImg(value);
    } else if (name === "openaiUrl" && value) {
      setPreviewImg(getRandomPlaceholder());
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setFormSubmitted(false);
    setPreviewImg("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ gptName: "", gptDesc: "", openaiUrl: "", customImageUrl: "" });
    setFormValidated(false);
    setPreviewImg("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // --- Submission limit check here ---
    if (pendingBots.length >= MAX_LOCAL_PENDING_BOTS) {
      alert("Submission box is full. Please wait for an admin to review before submitting more.");
      return;
    }

    const formIsValid = form.gptName && form.gptDesc && form.openaiUrl;
    setFormValidated(true);

    if (!botRecaptchaValue) {
      alert("Please verify you are not a robot.");
      return;
    }

    if (formIsValid) {
      let img = placeholderImg;
      if (form.gptName.toLowerCase().includes("lovedoc") || form.gptName.toLowerCase().includes("love doc")) {
        img = lovedocImg;
      } else if (form.customImageUrl) {
        img = form.customImageUrl;
      } else {
        img = getRandomPlaceholder();
      }
      const newBot = {
        title: form.gptName,
        desc: form.gptDesc,
        image: img,
        verified: false,
        openaiLink: form.openaiUrl,
        categories: []
      };
      setPendingBots(prev => {
        const updated = [newBot, ...prev];
        localStorage.setItem("pendingBots", JSON.stringify(updated));
        return updated;
      });
      setFormSubmitted(true);
      setTimeout(() => {
        handleCloseModal();
      }, 1200);
    }
  };

  function approveBot(bot) {
    setBotList(prev => [{ ...bot, verified: true }, ...prev]);
  }

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <PlausibleAnalytics />
      <AppHeader
        onOpenModal={handleOpenModal}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onMenuClick={() => setMenuOpen(v => !v)}
        isMobile={isMobile}
      />
      {showStickyLogo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: isMobile ? '100vw' : '1160px',
            zIndex: 1002,
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
            transition: 'opacity 0.18s',
          }}
        >
          <div
            style={{
              marginLeft: isMobile ? 12 : '0px',
              marginTop: 0,
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'auto',
              background: 'rgba(16,28,38,0.89)',
              borderRadius: 16,
              boxShadow: 'none',
              padding: isMobile ? '0 7px' : '0 14px',
              height: 41,
            }}
          >
            <img
              src={logoSmall}
              alt="BetterAiBots Small Logo"
              style={{
                height: isMobile ? 21 : 33,
                width: 'auto',
                display: 'block',
                background: 'none',
                borderRadius: 8,
                boxShadow: 'none',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              draggable={false}
            />
          </div>
        </div>
      )}
      <div style={{
        position: "sticky",
        top: 0,
        background: "linear-gradient(135deg, #101c26 0%, #172d3e 100%)",
        zIndex: 20,
      }}>
        {!isMobile && (
          <NavTabsBar />
        )}
      </div>
      <HamburgerMenu open={menuOpen && isMobile} onClose={() => setMenuOpen(false)} />
      <Routes>
        <Route path="/" element={
          <Home
            botList={botList}
            onOpenModal={handleOpenModal}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />}
        />
        {/* Specific routes must go BEFORE the catch-all /:cat */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/legal" element={<Legal />} />
        <Route
          path="/moderation"
          element={
            <ProtectedRoute>
              <Moderation
                botList={botList}
                approveBot={approveBot}
                pendingBots={pendingBots}
                setPendingBots={setPendingBots}
              />
            </ProtectedRoute>
          }
        />
        {/* Clean URL for categories: now /lifestyle, /music, etc. */}
        <Route path=":cat" element={<CategoryPage botList={botList} onOpenModal={handleOpenModal} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Suggest a GPT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Limit reached: show message and no form */}
          {pendingBots.length >= MAX_LOCAL_PENDING_BOTS ? (
            <div style={{ color: "#ff6464", textAlign: "center", fontSize: "1.18rem", margin: "28px 0" }}>
              The submission box is full. Please wait for admin review before submitting more.
            </div>
          ) : !formSubmitted ? (
            <Form noValidate validated={formValidated} onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formGptName">
                <Form.Label className="form-label neon-green">GPT Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="E.g. 'GPT NAME'"
                  name="gptName"
                  value={form.gptName}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGptDesc">
                <Form.Label className="form-label neon-green">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="What does this bot do? Who is it for?"
                  name="gptDesc"
                  value={form.gptDesc}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formOpenaiUrl">
                <Form.Label className="form-label neon-green">OpenAI GPT Link</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://chat.openai.com/g/g-..."
                  name="openaiUrl"
                  value={form.openaiUrl}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formCustomImage">
                <Form.Label className="form-label neon-green">Custom Image URL (optional, non-OpenAI)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://yourdomain.com/image.png"
                  name="customImageUrl"
                  value={form.customImageUrl}
                  onChange={handleFormChange}
                />
              </Form.Group>
              {(previewImg || form.openaiUrl) && (
                <div style={{ textAlign: 'center', margin: '14px 0' }}>
                  <img src={previewImg || getRandomPlaceholder()} alt="preview" style={{ width: 64, height: 64, borderRadius: '50%', boxShadow: '0 0 10px #36ff95' }} />
                  <div style={{ color: '#36ff95', marginTop: 7, fontSize: '0.92rem' }}>Live Preview</div>
                </div>
              )}
              <Form.Group className="mb-2" controlId="formRecaptcha">
                <div className="recaptcha-wrap">
                  <ReCAPTCHA
                    sitekey="6Lf2wlArAAAAAH0GDpzc02uW1KAD8TJXgD_kSz1j"
                    onChange={val => setBotRecaptchaValue(val)}
                    theme="dark"
                  />
                </div>
              </Form.Group>
              {/* Add the warning above the button! */}
              {pendingBots.length >= MAX_LOCAL_PENDING_BOTS && (
                <div style={{ color: "#ff6464", marginBottom: 12, fontWeight: 600 }}>
                  Submission box full. Please wait for admin review.
                </div>
              )}
              <Button
                variant="success"
                type="submit"
                style={{
                  background: "linear-gradient(90deg, #09e269 0%, #0bbfdb 100%)",
                  border: "none",
                  borderRadius: "22px",
                  fontWeight: 600,
                  fontSize: "1.12rem",
                  color: "#101c26",
                  width: "100%",
                  boxShadow: "0 2px 18px #16ff6c40",
                  marginTop: "10px"
                }}
                disabled={pendingBots.length >= MAX_LOCAL_PENDING_BOTS}
              >
                Submit
              </Button>
            </Form>
          ) : (
            <div className="neon-green" style={{ fontSize: "1.15rem", textAlign: "center", margin: "28px 0" }}>
              Thank you for your suggestion! <br />Our team will review your bot soon. 🚀
            </div>
          )}
        </Modal.Body>
      </Modal>
      {location.pathname !== "/moderation" && <DisclaimerBar />}
      <FooterWithWallets />
    </>
  );
}

// --- FOOTER WITH WALLETS ---
function FooterWithWallets() {
  const [showTip, setShowTip] = React.useState(false);
  const [btcCopied, setBtcCopied] = React.useState(false);
  const [solCopied, setSolCopied] = React.useState(false);

  const BTC = "bc1qnswf7fyzkrwczkmlm9ann6rkmzcp0jd4jvzwxw";
  const SOL = "GCowBrjFfoXctJTQxwNgUuhCvuzD9hE4tHgBLWL39UR8";

  const handleCopyBTC = (e) => {
    e?.preventDefault && e.preventDefault();
    navigator.clipboard.writeText(BTC);
    setBtcCopied(true);
    setTimeout(() => setBtcCopied(false), 1200);
  };

  const handleCopySOL = (e) => {
    e?.preventDefault && e.preventDefault();
    navigator.clipboard.writeText(SOL);
    setSolCopied(true);
    setTimeout(() => setSolCopied(false), 1200);
  };

  return (
    <footer
      style={{
        marginTop: 0,
        background: "linear-gradient(90deg, #172d3e 0%, #18232f 100%)",
        color: "#b5ffdb",
        borderRadius: "18px 18px 0 0",
        boxShadow: "0 -2px 24px #16ff6c16",
        padding: "10px 10px 0px 10px",
        fontSize: "1.01rem",
        position: "relative",
        fontFamily: "inherit",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          width: "100%",
          fontWeight: 600,
          fontSize: "1.07rem",
          padding: "10px 0 18px 0",
          flexWrap: "wrap",
          position: "relative"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 22,
            marginRight: 5,
            cursor: "default",
            padding: "10px 2px",
            borderRadius: 16,
            transition: "box-shadow 0.24s"
          }}
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
        >
          {showTip && (
            <div
              style={{
                position: "absolute",
                bottom: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginBottom: 0,
                color: "#36ff95",
                fontWeight: 200,
                fontSize: "1.00rem",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                fontFamily: "Inter, Arial, sans-serif",
                textShadow: "0 0 2px #16161680"
              }}
            >
              Tip Jar
            </div>
          )}
          {showTip && (
            <div
              style={{
                position: "absolute",
                right: "100%",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                padding: "32px 36px 32px 20px",
                borderRadius: 0,
                opacity: 1,
                pointerEvents: "auto",
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                minWidth: 0,
                zIndex: 99,
                alignItems: "flex-end",
                fontFamily: "monospace",
                willChange: "transform, opacity"
              }}
            >
              <WalletAddressHorizontal
                address={BTC}
                label="BTC"
                copied={btcCopied}
                handleCopy={handleCopyBTC}
                copyText={btcCopied ? "Copied!" : ""}
                copyColor="#FFD700"
                showClipboard={true}
                showLabel={true}
              />
              <WalletAddressHorizontal
                address={SOL}
                label="SOL"
                copied={solCopied}
                handleCopy={handleCopySOL}
                copyText={solCopied ? "Arigato!" : ""}
                copyColor="#FFD700"
                showClipboard={true}
                showLabel={true}
              />
            </div>
          )}
          <span style={{ display: "flex", alignItems: "center" }}>
            <img
              src={tipJar}
              alt="Tip Jar"
              style={{
                height: 30,
                width: "auto",
                borderRadius: 8,
                background: "#18232f",
                boxShadow: showTip
                  ? "0 0 20px #36ff95cc, 0 2px 18px #16ff6c50"
                  : "none",
                transition: "box-shadow 0.24s"
              }}
              draggable={false}
            />
          </span>
        </div>
        <div
          className="footer-logo-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginLeft: "0",
            marginRight: "7px"
          }}
        >
          <img
            src={logo}
            alt="BetterAiBots Logo"
            className="footer-main-logo"
            style={{
              height: 44,
              width: "auto",
              borderRadius: 12,
              marginRight: 13,
              background: "#18232f",
              boxShadow: "none",
              transition: "box-shadow 0.25s"
            }}
            onMouseOver={e =>
              (e.currentTarget.style.boxShadow =
                "0 0 28px #36ff95cc, 0 2px 18px #16ff6c40")
            }
            onMouseOut={e =>
              (e.currentTarget.style.boxShadow = "none")
            }
            draggable={false}
          />
        </div>
        <div
          style={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            position: "relative"
          }}
        >
          <span>Powered by </span>
          <span
            style={{
              background: "linear-gradient(90deg, #36ff95, #ffd700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
              cursor: "default",
              position: "relative",
              zIndex: 20,
              display: "inline-block",
              fontFamily: "Inter, Arial, sans-serif"
            }}
          >
            DubbyDevs
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: "0.94rem",
          color: "#b5ffdb",
          textAlign: "center",
          fontWeight: 500,
          letterSpacing: 0.05,
          marginBottom: 6
        }}
      >
        <span style={{ color: "#fff" }}>
          © {new Date().getFullYear()} BetterAiBots.com
        </span>
         | 
        <Link
          to="/legal"
          style={{
            background: "linear-gradient(90deg, #36ff95 10%, #0bbfdb 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textDecoration: "underline",
            fontWeight: 700
          }}
        >
          Legal, Terms & Privacy
        </Link>
      </div>
    </footer>
  );
}

// --- Wallet Address Horizontal ---
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

// --- AUTH0 PROVIDER WRAPPER ---
export default function AppWithRouter() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
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