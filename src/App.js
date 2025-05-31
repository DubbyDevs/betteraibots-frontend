import helperLogo from './assets/findbetteraibotshelper.png';
import helperBotLogo from './assets/findthebestaibotshelper.png';
import ReCAPTCHA from "react-google-recaptcha";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
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
import logo from './assets/betteraibotsglowlogo.png';
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

// ---- Category List ----
const CATEGORIES = [
  { name: "Productivity" },
  { name: "Education" },
  { name: "Lifestyle" },
  { name: "Music" },
  { name: "Digital Art" }
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
  placeholderImg16, placeholderImg17, placeholderImg18,
];

// ---- Shuffle utility for placeholders ----
function shuffle(arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// ---- BOTS with categories ----
const rawBots = [
  {
    title: "TheLoveDoc",
    desc: "Relationship, dating, and vulnerability advice from a friendly doc. (Not a real doctor)",
    image: placeholderImg7,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-6833fa918b148191a7b2d4cc2ea7114f-love-doc",
    categories: ["Lifestyle"]
  },
  {
    title: "Crypto Sentiment Tracker",
    desc: "Analyze real-time crypto sentiment and trends with one click. (Not financial advice)",
    image: placeholderImg13,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-6834013bf6288191ab9eaabe31591539-crypto-sentiment-tracker",
    categories: ["Productivity"]
  },
  {
    title: "Video AI",
    desc: "Smart video editing, summaries, and insights powered by AI.",
    image: placeholderImg1,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-h8l4uLHFQ-video-ai",
    categories: ["Productivity", "Digital Art"]
  },
  {
    title: "Finance, Economics, Stock, Crypto & Trade Invest",
    desc: "Get in-depth financial analysis, crypto research, and investment insights. (Not financial advice)",
    image: placeholderImg14,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-iR15hX15H-finance-economics-stock-crypto-trade-invest",
    categories: ["Productivity"]
  },
  {
    title: "Code Copilot",
    desc: "AI pair programmer for instant coding help, reviews, and bug fixes.",
    image: placeholderImg9,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-2DQzU5UZl-code-copilot",
    categories: ["Productivity"]
  },
  {
    title: "Fictional Therapist",
    desc: "A fictional AI therapist/psychologist for entertainment and writing. Not a real mental health service. (Not Real Therapy)",
    image: placeholderImg18,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-FGhasb1tZ-therapist-psychologist-fictional-not-real-therapy",
    categories: ["Lifestyle"]
  },
  {
    title: "GIF Generator",
    desc: "Quickly create custom GIFs on any topic or mood. Fun and easy to use.",
    image: placeholderImg6,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-45WfVCFcy-gif-generator",
    categories: ["Digital Art"]
  },
  {
    title: "Cooking, Diet, Recipes, Nutrition & Food",
    desc: "Personalized recipes, diet plans, nutrition tips, and cooking advice in one spot.",
    image: placeholderImg5,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-KU2U5o7Wj-cookingdietrecipesnutritionfood",
    categories: ["Lifestyle"]
  },
  {
    title: "Fitness Workout Diet PhD Coach",
    desc: "AI-powered fitness, workout, and diet advice from a PhD-level virtual coach.",
    image: placeholderImg15,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-ipOIcM229-fitness-workout-diet-phd-coach",
    categories: ["Lifestyle"]
  },
  {
    title: "Glibatree Art Designer",
    desc: "AI art design, concept visuals, and creative ideas from the Glibatree bot.",
    image: placeholderImg3,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-7CKojumSX-glibatree-art-designer",
    categories: ["Digital Art"]
  },
  {
    title: "Grammar Checker",
    desc: "Checks your grammar, spelling, and clarity with suggestions for better writing.",
    image: placeholderImg2,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-kfkNLRrwD-grammar-checker",
    categories: ["Productivity", "Education"]
  },
  {
    title: "AI Music Maker (Song Words to Music)",
    desc: "Turn your words or lyrics into music with this AI-powered music generator. Free to use!",
    image: placeholderImg12,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-rLVq3NTrN-ai-music-maker-song-words-to-music-free",
    categories: ["Music"]
  },
  {
    title: "Health & Medicine",
    desc: "Get general health and wellness info powered by AI. Not a substitute for professional medical advice.  (Not a real Doctor)",
    image: placeholderImg8,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-t3BUYjh4C-health-medicinenot-doctor-not-medical-advice",
    categories: ["Lifestyle", "Education"]
  },
  {
    title: "Law, Contract, Disclaimer",
    desc: "Get AI-powered info on contracts, disclaimers, and general law concepts. Not actual legal advice.",
    image: placeholderImg11,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-My8UBHpJn-law-contractdisclaimer-not-lawyer-legal-advice",
    categories: ["Productivity", "Education"]
  },
  {
    title: "Accounting GPT",
    desc: "AI-powered accounting help, bookkeeping, and finance questions answered.",
    image: placeholderImg10,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-7RJghLmOO-accounting-gpt",
    categories: ["Productivity"]
  },
  {
    title: "Stocks, Crypto, Options & Forex Market Summary",
    desc: "Summaries for stocks, crypto, options, forex and market analysis.",
    image: placeholderImg8,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-5wVuKfpEt-stocks-crypto-options-forex-market-summary",
    categories: ["Productivity"]
  },
  {
    title: "Academic Assistant Pro",
    desc: "Academic support, research help, citation, essay and study tools.",
    image: placeholderImg4,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-UubB08D4y-academic-assistant-pro",
    categories: ["Education"]
  },
  {
    title: "Math AI",
    desc: "Math solver and explainer: equations, word problems, and more.",
    image: placeholderImg2,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-WP1diWHRl-math",
    categories: ["Education"]
  },
  {
    title: "YouTube AI",
    desc: "AI for video summaries, channel insights, and content ideas for YouTube.",
    image: placeholderImg7,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-Wud3tXQj3-youtube-ai",
    categories: ["Productivity", "Digital Art"]
  },
  {
    title: "DesignerGPT",
    desc: "AI-powered design assistant for digital art, logos, and graphics.",
    image: placeholderImg16,
    verified: true,
    openaiLink: "https://chatgpt.com/g/g-2Eo3NxuS7-designergpt",
    categories: ["Digital Art"]
  },
];

// Assign unique placeholder images for all bots that need them (no repeats until pool exhausted)
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
          {CATEGORIES.map((cat) => (
            <Link
              to={`/category/${encodeURIComponent(cat.name)}`}
              className="nav-dropdown-item"
              key={cat.name}
              onClick={() => setShowDropdown(false)}
              tabIndex={0}
            >
              {cat.name}
            </Link>
          ))}
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
                  onClick={() => { navigate(`/category/${encodeURIComponent(cat.name)}`); onClose(); }}
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

// --- HEADER ---
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
      {/* Suggest new GPT bot card */}
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
      {/* Render all bots */}
      {bots.map((bot, i) => (
        <div className="bot-card" key={i}>
          {bot.verified && <div className="verified-badge">Verified</div>}
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
        <title>BetterAiBots.com – Curated OpenAI GPT Bots Directory</title>
        <meta name="description" content="Discover the best OpenAI GPT bots. Curated, categorized, and easy to install." />
        <meta property="og:title" content="BetterAiBots.com" />
        <meta property="og:description" content="Curated OpenAI GPT directory: Find, install, and share the best AI bots." />
        <meta property="og:image" content="/betteraibotsglowlogo8.png" />
        <meta property="og:url" content="https://betteraibots.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="hero-section">
        <h1 className="hero-headline">Discover, Share & Install the Best AI Bots</h1>
        <p className="hero-subheadline custom-hero-desc">
          Find better AI Bots to help improve workflow, improve your skills or make some money working from home!
        </p>
      </div>
      <BotGrid bots={filteredBots} onOpenModal={onOpenModal} />
      {/* ---- BRAND LOGO BUTTON ---- */}
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
      {/* ---- /BRAND LOGO BUTTON ---- */}
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
  const catDecoded = decodeURIComponent(cat || "");
  const botsForCategory = botList.filter(bot =>
    bot.categories && bot.categories.some(c => c.toLowerCase() === catDecoded.toLowerCase())
  );
  return (
    <>
      <Helmet>
        <title>{catDecoded} Bots – BetterAiBots.com</title>
        <meta name="description" content={`Best ${catDecoded} AI Bots curated for you. Find, install, and share the best OpenAI GPTs.`} />
        <meta property="og:title" content={`${catDecoded} Bots – BetterAiBots.com`} />
        <meta property="og:description" content={`Best ${catDecoded} AI Bots curated for you. Find, install, and share the best OpenAI GPTs.`} />
        <meta property="og:image" content="/betteraibotsglowlogo8.png" />
        <meta property="og:url" content={`https://betteraibots.com/category/${encodeURIComponent(catDecoded)}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="hero-section">
        <h1 className="hero-headline">{catDecoded} Bots</h1>
        <p className="hero-subheadline custom-hero-desc">
          Curated bots for the <span className="neon-green">{catDecoded}</span> category.
        </p>
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

    // --- Save contact message to localStorage ---
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
        <meta name="description" content="Contact BetterAiBots.com. Questions, suggestions, or feedback? Reach out to our team!" />
        <meta property="og:title" content="Contact Us – BetterAiBots.com" />
        <meta property="og:description" content="Contact BetterAiBots.com. Questions, suggestions, or feedback? Reach out to our team!" />
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
      <div style={{ textAlign: "left", margin: "30px auto", fontSize: "1.15rem", color: "#e9f7ee", background: "#172d3e", borderRadius: 18, padding: "36px 28px", boxShadow: "0 2px 22px #09e26924" }}>
        <b>Disclaimer:</b> BetterAiBots.com is an independent directory for curated OpenAI GPTs and third-party bots. We do not own or operate any bots listed and are not responsible for their function, accuracy, legality, or outcomes. All bots are provided "as is" and are subject to their respective platforms' terms.
        <br /><br />
        <b>No AI, Financial, Legal, or Medical Advice:</b> Bots listed here do not provide financial, legal, or medical advice. Use any bot at your own risk and always consult a qualified professional for important decisions.
        <br /><br />
        <b>Submissions:</b> By submitting a bot, you affirm that you have the right to submit it and that it does not violate any third-party rights or applicable law.
        <br /><br />
        <b>Data/Privacy:</b> We do not sell user data. Basic analytics (page views, popular bots) are tracked anonymously for site improvement. For more, see our <a href="#privacy" style={{ color: "#36ff95" }}>Privacy Policy</a>.
        <br /><br />
        <b>Copyright:</b> All images, logos, and trademarks are property of their respective owners. Please contact us if you believe any content should be removed.
        <br /><br />
        <b>Contact:</b> For DMCA notices or legal issues, contact <a href="mailto:support@betteraibots.com" style={{ color: "#36ff95" }}>support@betteraibots.com</a>.
      </div>
      <h2 className="hero-headline" style={{ fontSize: "2.1rem" }}>Privacy Policy</h2>
      <div style={{ textAlign: "left", margin: "30px auto", fontSize: "1.08rem", color: "#e9f7ee", background: "#18232f", borderRadius: 16, padding: "25px 23px" }}>
        <b>1. Data Collection:</b> We only collect information you provide directly (such as bot submissions or contact forms). No account or login is required for browsing.
        <br /><br />
        <b>2. Analytics:</b> We use Plausible Analytics, which does not use cookies and tracks visits anonymously for aggregate statistics.
        <br /><br />
        <b>3. Data Usage:</b> We do not sell or share your data. We may respond to legal requests or abuse reports as required by law.
        <br /><br />
        <b>4. Third Party Sites:</b> Clicking external links (like OpenAI bot links) is at your own risk and subject to those sites' policies.
        <br /><br />
        <b>5. Contact:</b> Email us at <a href="mailto:support@betteraibots.com" style={{ color: "#36ff95" }}>support@betteraibots.com</a> for privacy concerns.
      </div>
      <h2 className="hero-headline" style={{ fontSize: "2.1rem" }}>Terms of Use</h2>
      <div style={{ textAlign: "left", margin: "30px auto", fontSize: "1.08rem", color: "#e9f7ee", background: "#18232f", borderRadius: 16, padding: "25px 23px" }}>
        <b>By using BetterAiBots.com, you agree to:</b>
        <ul>
          <li>Not submit or use bots for any unlawful purpose.</li>
          <li>Use bots at your own risk and verify all information independently.</li>
          <li>Respect all copyright and trademark laws.</li>
          <li>Report issues to our team promptly.</li>
        </ul>
        <b>These terms may be updated at any time.</b>
      </div>
    </div>
  );
}

// --- MODERATION PAGE (admin add bot) ---
function Moderation({ botList, approveBot }) {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pending, setPending] = useState(() => {
    const stored = localStorage.getItem("pendingBots");
    return stored ? JSON.parse(stored) : [];
  });

  // --- Contact Messages state and effect ---
  const [contactMessages, setContactMessages] = useState(() => {
    const stored = localStorage.getItem("contactMessages");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    const stored = localStorage.getItem("contactMessages");
    setContactMessages(stored ? JSON.parse(stored) : []);
  }, []);

  // Admin Add Bot states
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
    localStorage.setItem("pendingBots", JSON.stringify(pending));
  }, [pending]);

  const MOD_PASS = "letmein"; // Change for production

  function handleAuth(e) {
    e.preventDefault();
    if (pw === MOD_PASS) setAuthed(true);
  }

  function handleApprove(idx) {
    approveBot(pending[idx]);
    setPending(prev => prev.filter((_, i) => i !== idx));
  }

  function handleReject(idx) {
    setPending(prev => prev.filter((_, i) => i !== idx));
  }

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
      image: adminBot.image || undefined, // auto placeholder if blank
      verified: true,
      categories: adminBot.categories
        ? adminBot.categories.split(",").map(s => s.trim()).filter(Boolean)
        : [],
    };
    // Save in localStorage so it appears right away (for dev only)
    let approvedBots = [];
    try {
      approvedBots = JSON.parse(localStorage.getItem("approvedBots") || "[]");
    } catch { }
    approvedBots.unshift(newBot);
    localStorage.setItem("approvedBots", JSON.stringify(approvedBots));
    setAdminBot({
      title: "",
      desc: "",
      openaiLink: "",
      image: "",
      categories: "",
    });
    setAdminErr("");
    setAdminSuccess("Bot added and live!");
    setTimeout(() => setAdminSuccess(""), 1500);
  }

  // On mount, if approvedBots in localStorage, add to botList via approveBot
  useEffect(() => {
    let approvedBots = [];
    try {
      approvedBots = JSON.parse(localStorage.getItem("approvedBots") || "[]");
    } catch { }
    if (approvedBots.length > 0 && typeof approveBot === "function") {
      approvedBots.forEach(bot => approveBot(bot));
      localStorage.removeItem("approvedBots");
    }
    // eslint-disable-next-line
  }, []);

  if (!authed) {
    return (
      <div className="hero-section">
        <h1 className="hero-headline">Moderator Login</h1>
        <form style={{ maxWidth: 330, margin: "40px auto", background: "#172d3e", borderRadius: 20, padding: 28, boxShadow: "0 3px 26px #09e26924" }} onSubmit={handleAuth}>
          <label className="form-label neon-green">Moderator Password</label>
          <input className="form-control" type="password" value={pw} onChange={e => setPw(e.target.value)} />
          <Button type="submit" className="header-btn" style={{ width: "100%", marginTop: 15 }}>Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <h1 className="hero-headline">Moderation</h1>

      {/* Admin Add Bot */}
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
              <label className="form-label neon-green">Image Import (e.g. placeholderImg2, or leave blank)</label>
              <input className="form-control" name="image" value={adminBot.image} onChange={handleAdminBotChange} />
            </div>
            <div style={{ marginBottom: 7 }}>
              <label className="form-label neon-green">Categories (comma separated, e.g. Productivity, Music)</label>
              <input className="form-control" name="categories" value={adminBot.categories} onChange={handleAdminBotChange} />
            </div>
            <Button type="submit" className="header-btn" style={{ marginTop: 6, width: "100%" }}>Add Bot</Button>
            {adminErr && <div style={{ color: "#ff5252", marginTop: 7 }}>{adminErr}</div>}
            {adminSuccess && <div className="neon-green" style={{ marginTop: 7 }}>{adminSuccess}</div>}
          </form>
        )}
      </div>

      {/* Pending Submissions */}
      {pending.length === 0 ? (
        <div className="neon-green" style={{ marginTop: 35 }}>No pending submissions 🎉</div>
      ) : (
        <>
          <h2 style={{ color: "#36ff95", fontWeight: 700, fontSize: "1.28rem" }}>Pending Bot Submissions</h2>
          {pending.map((bot, idx) => (
            <div key={idx} style={{ background: "#172d3e", borderRadius: 18, padding: "20px 24px", margin: "22px auto", maxWidth: 560, boxShadow: "0 2px 14px #36ff9544" }}>
              <div style={{ fontWeight: 700, fontSize: "1.13rem" }}>{bot.title}</div>
              <div style={{ color: "#36ff95", margin: "8px 0" }}>{bot.desc}</div>
              <a href={bot.openaiLink} target="_blank" rel="noopener noreferrer" style={{ color: "#0bbfdb" }}>{bot.openaiLink}</a>
              <div style={{ marginTop: 12 }}>
                <Button style={{ background: "#36ff95", color: "#101c26", border: "none", marginRight: 10 }} onClick={() => handleApprove(idx)}>Approve</Button>
                <Button style={{ background: "#f66", color: "#fff", border: "none" }} onClick={() => handleReject(idx)}>Reject</Button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Contact Messages */}
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
            <div style={{ fontWeight: 600, color: "#36ff95" }}>{msg.name} &lt;{msg.email}&gt;</div>
            <div style={{ fontSize: "0.97rem", margin: "7px 0 0 0" }}>{msg.message}</div>
            <div style={{ fontSize: "0.85rem", color: "#ccc", marginTop: 4 }}>{msg.date}</div>
          </div>
        ))
      )}
    </div>
  );
}


// --- Disclaimer Bar (responsive, no background, less bold, softer red text) ---
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
      color: "#ff5252",
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
      *This site does not provide financial, legal, or medical advice. Bots are provided “as is” for entertainment and education only. Always verify information and consult qualified professionals as needed.
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

// --- Footer Component ---
function Footer() {
  return (
    <footer style={{
      marginTop: 0,
      background: "linear-gradient(90deg, #172d3e 0%, #18232f 100%)",
      color: "#b5ffdb",
      borderRadius: "18px 18px 0 0",
      boxShadow: "0 -2px 24px #16ff6c16",
      padding: "10px 10px 0px 10px",
      fontSize: "1.01rem"
    }}>
      <div style={{
        fontSize: "0.94rem",
        color: "#b5ffdb",
        textAlign: "center",
        fontWeight: 500,
        letterSpacing: 0.05,
        marginBottom: 6
      }}>
        <span style={{ color: "#fff" }}>
          &copy; {new Date().getFullYear()} BetterAiBots.com
        </span>
        &nbsp;|&nbsp;
        <Link to="/legal" style={{
          background: "linear-gradient(90deg, #36ff95 10%, #0bbfdb 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textDecoration: "underline",
          fontWeight: 700
        }}>Legal, Terms & Privacy</Link>
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        width: "100%",
        fontWeight: 600,
        fontSize: "1.01rem",
        padding: "8px 0 18px 0"
      }}>
        {/* --- Logo Icon (smaller size) --- */}
        <img
          src={logo}
          alt="BetterAiBots Logo"
          style={{
            height: 13, // ~70% of previous
            width: "auto",
            borderRadius: 8,
            marginRight: 8,
            background: "#18232f",
            boxShadow: "0 2px 8px #16ff6c16"
          }}
        />
        <div style={{ color: "#fff" }}>Powered by{" "}
          <span style={{
            background: "linear-gradient(90deg, #36ff95, #ffd700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 700,
            marginLeft: 6
          }}>
            DubbyDevs
          </span>
        </div>
      </div>
    </footer>
  );
}



// --- MAIN APP ROUTER ---
function App() {
  const [botList, setBotList] = useState(bots);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // ADD THESE ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
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
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  // Responsive width effect
  useEffect(() => {
    function handleResize() { setWindowWidth(window.innerWidth); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // Approve bot from moderation
  function approveBot(bot) {
    setBotList(prev => [{ ...bot, verified: true }, ...prev]);
  }

  // Sticky nav: scroll to top on nav change
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
        <Route path="/category/:cat" element={<CategoryPage botList={botList} onOpenModal={handleOpenModal} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/moderation" element={<Moderation botList={botList} approveBot={approveBot} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Suggest a GPT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {!formSubmitted ? (
    <Form noValidate validated={formValidated} onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formGptName">
        <Form.Label className="form-label neon-green">GPT Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="E.g. 'CryptoSignals GPT'"
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
      {/* ---- reCAPTCHA ---- */}
      <Form.Group className="mb-2" controlId="formRecaptcha">
        <div style={{ margin: "18px 0" }}>
          <ReCAPTCHA
            sitekey="6Lf2wlArAAAAAH0GDpzc02uW1KAD8TJXgD_kSz1j"
            onChange={val => setBotRecaptchaValue(val)}
            theme="dark"
          />
        </div>
      </Form.Group>
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
      <Footer />
    </>
  );
}

// --- HelmetProvider Wrapper for SEO ---
export default function AppWithRouter() {
  return (
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  );
}
