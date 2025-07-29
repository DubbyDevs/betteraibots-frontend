import Articles from "./Articles";
import { CATEGORY_SLUGS } from './constants';
// import { CATEGORY_REVERSE } from "./constants"; // <- commented until used
import React, { useState, useEffect } from "react";
import logo from './assets/betteraibotsglowlogo.webp';
import helperLogo from './assets/findthebestaibotshelper.png';
import placeholderImg from './assets/bot-placeholder.webp';
import placeholderImg1 from './assets/bot-placeholder1.webp';
import placeholderImg21 from './assets/bot-placeholder21.webp';
import placeholderImg2 from './assets/bot-placeholder2.webp';
import placeholderImg3 from './assets/bot-placeholder3.webp';
import placeholderImg4 from './assets/bot-placeholder4.webp';
import placeholderImg5 from './assets/bot-placeholder5.webp';
import placeholderImg6 from './assets/bot-placeholder6.webp';
import placeholderImg7 from './assets/bot-placeholder7.webp';
import placeholderImg8 from './assets/bot-placeholder8.webp';
import placeholderImg9 from './assets/bot-placeholder9.webp';
import placeholderImg10 from './assets/bot-placeholder10.webp';
import placeholderImg11 from './assets/bot-placeholder11.webp';
import placeholderImg12 from './assets/bot-placeholder12.webp';
import placeholderImg13 from './assets/bot-placeholder13.webp';
import placeholderImg14 from './assets/bot-placeholder14.webp';
import placeholderImg15 from './assets/bot-placeholder15.webp';
import placeholderImg16 from './assets/bot-placeholder16.webp';
import placeholderImg17 from './assets/bot-placeholder17.webp';
import placeholderImg18 from './assets/bot-placeholder18.webp';
import placeholderImg19 from './assets/bot-placeholder19.webp';
import placeholderImg20 from './assets/bot-placeholder20.webp';
import placeholderImg22 from './assets/bot-placeholder22.webp';
import placeholderImg23 from './assets/bot-placeholder23.webp';
import placeholderImg24 from './assets/bot-placeholder24.webp';
import placeholderImg25 from './assets/bot-placeholder25.webp';
import placeholderImg26 from './assets/bot-placeholder26.webp';
import placeholderImg27 from './assets/bot-placeholder27.webp';
import placeholderImg28 from './assets/bot-placeholder28.webp';
import placeholderImg29 from './assets/bot-placeholder29.webp';
import placeholderImg30 from './assets/bot-placeholder30.webp';
import placeholderImg31 from './assets/bot-placeholder31.webp';
import placeholderImg32 from './assets/bot-placeholder32.webp';
import placeholderImg33 from './assets/bot-placeholder33.webp';
import placeholderImg34 from './assets/bot-placeholder34.webp';
import tipJar from './assets/thebestfreeaibotsgpt.webp';
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
import GoogleAnalytics from "./GoogleAnalytics";
import InVideoFreeTrialImg from './assets/InVideoFreeTrial.jpg';
import InVideoFreeTrialPng from './assets/InVideoFreeTrial.png';



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
  placeholderImg31, placeholderImg32, placeholderImg33, 
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
    title: "VEED AI",
    desc: "VEED is the easiest way to create videos. Edit videos, add subtitles, and more.",
    image: placeholderImg18,
    free: true,
    openaiLink: "https://veed.cello.so/rwFO6zwGZh9",
    categories: ["Productivity", "Marketing"]
  },

  {
    title: "AI Cheat Coder",
    desc: "Free AI programmer for instant coding help, reviews, and bug fixes.",
    image: placeholderImg34,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-684426fa2a588191aabb529e9ca6e26f-cheat-coder",
    categories: ["Productivity"]
  },
  
  
  // ... const rawBots = [


  {
    title: "VetGPT",
    desc: "Get general veterinary advice on animal health, nutrition, and behavior. Not a substitute for professional veterinary care.",
    image: placeholderImg28,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-ZR0aH16CQ-vetgpt",
    categories: ["Health & Wellness", "Specialized Knowledge"]
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
    title: "Astrology Birth Chart GPT",
    desc: "Personalized astrological insights based on your birth date, time, and location.",
    image: placeholderImg30,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-WxckXARTP-astrology-birth-chart-gpt",
    categories: ["Specialized Knowledge", "Lifestyle"]
  },
  {
    title: "InVideo AI",
    desc: "The Future of Video Creation Is Here!",
    image: InVideoFreeTrialImg,
    free: false, // We'll use a custom badge below
    openaiLink: "https://invideo.sjv.io/c/6368097/2210623/12258",
    isAffiliate: true,
    affiliateHtml: `<a rel="sponsored" href="https://invideo.sjv.io/c/6368097/2210623/12258" target="_top" id="2210623"><img src="//a.impactradius-go.com/display-ad/12258-2210623" border="0" alt="" width="500" height="500"/></a><img height="0" width="0" src="https://imp.pxf.io/i/6368097/2210623/12258" style="position:absolute;visibility:hidden;" border="0" />`,
    categories: ["Creative Tools"],
    freeLabel: "Free Trial"
  },
  {
    title: "Health & Medicine",
    desc: "General health and wellness info powered by AI. Not a substitute for professional medical advice.",
    image: placeholderImg8,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-t3BUYjh4C-health-medicinenot-doctor-not-medical-advice",
    categories: ["Health & Wellness", "Education"]
  },
  
  {
    title: "Finance, Economics, Stock, Crypto",
    desc: "Get in-depth financial analysis, crypto research, and investment insights. (Not financial advice)",
    image: placeholderImg14,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-iR15hX15H-finance-economics-stock-crypto-trade-invest",
    categories: ["Productivity"]
  },
  {
    title: "Blood Test Result Analysis",
    desc: "Understand your blood test results and get actionable health insights. Not real medical advice.",
    image: placeholderImg24,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-1AahKhimZ-blood-test-result-analysis-for-health-insight",
    categories: ["Health & Wellness", "Education"]
  },
  {
    title: "Cooking, Diet, Recipes, Nutrition",
    desc: "Personalized recipes, diet plans, nutrition tips, and food cooking advice in one spot.",
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
    title: "AI Video Maker",
    desc: "Create AI-generated videos instantly.",
    image: placeholderImg22, // Changed from placeholderImg1
    free: true,
    openaiLink: "https://chatgpt.com/g/g-68736569e14c81919097d15d1302fb50-video-creator",
    categories: ["Creative Tools", "Productivity"]
  },
  {
    title: "AI Music Maker",
    desc: "Turn your words or lyrics into music with this AI-powered music generator.",
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
    title: "The Love Doc",
    desc: "Relationship and dating advice (Not a real doctor)",
    image: placeholderImg7,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-6833fa918b148191a7b2d4cc2ea7114f-love-doc",
    categories: ["Health & Wellness", "Lifestyle"]
  },
   {
    title: "InVideo",
    desc: "Create stunning AI videos from text with professional editing tools and 16M+ stock media.",
    image: InVideoFreeTrialPng,
    free: true,
    openaiLink: "https://invideo.sjv.io/c/6368097/2210623/12258",
    categories: ["Creative Tools", "Productivity"]
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
    title: "GIF Generator",
    desc: "Quickly create custom GIFs on any topic or mood. Fun and easy to use.",
    image: placeholderImg6,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-45WfVCFcy-gif-generator",
    categories: ["Creative Tools"]
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
    title: "Logo",
    desc: "Design professional brand logos with this AI-powered logo creation expert.",
    image: placeholderImg32,
    free: true,
    openaiLink: "https://chatgpt.com/g/g-pCq5xaCri-logo",
    categories: ["Creative Tools"]
  },
];

// Find the indexes of the affiliate ad and Cooking, Diet, Recipes, Nutrition & Food bot
const cookingIndex = rawBots.findIndex(bot => bot.title === "Cooking, Diet, Recipes, Nutrition & Food");
const affiliateIndex = rawBots.findIndex(bot => bot.title === "InVideo AI Video Generator");
if (cookingIndex !== -1 && affiliateIndex !== -1) {
  const temp = rawBots[cookingIndex];
  rawBots[cookingIndex] = rawBots[affiliateIndex];
  rawBots[affiliateIndex] = temp;
}

 


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






// --- Nav Tabs Bar ---
function NavTabsBar({ currentCategory, showCategoryBar, toggleCategoryBar }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="nav-tabs-bar">
      <Link to="/" className="nav-tab" tabIndex={0}>Home</Link>
      <Link to="/news" className="nav-tab" tabIndex={0}>News</Link>
      <Link to="/articles" className="nav-tab" tabIndex={0}>Articles</Link>
      <Link to="/contact" className="nav-tab" tabIndex={0}>Contact Us</Link>
      {isHomePage && (
        <button 
          className="nav-tab eyeball-toggle-btn"
          onClick={toggleCategoryBar}
          tabIndex={0}
          title={showCategoryBar ? 'Hide Categories' : 'Show Categories'}
        >
          👁️
        </button>
      )}
    </nav>
  );
}

// --- NEWS PAGE ---
function News() {
  const newsArticles = [
    {
      id: 1,
      title: "OpenAI Announces GPT-5: Revolutionary Multimodal AI Model",
      excerpt: "OpenAI has officially unveiled GPT-5, their most advanced AI model yet, featuring unprecedented multimodal capabilities and improved reasoning abilities.",
      content: `
        <p>OpenAI's groundbreaking ChatGPT Agent, launched July 17, 2025, transforms AI from conversational assistant to autonomous task executor. Achieving 41.6% accuracy on Humanity's Last Exam benchmark—double previous models' performance—this AI automation breakthrough handles complex workflows including web operations, coding, and financial analysis for Pro, Plus, and Team subscribers.</p>
        
        <h3>ChatGPT Agent Redefines AI Automation Capabilities</h3>
        <p>OpenAI CEO Sam Altman describes the new agent as "a new level of capability for AI systems" that can accomplish "remarkable, complex tasks" using its own computer. This represents a fundamental shift from traditional ask-and-answer AI interactions toward truly autonomous artificial intelligence systems.</p>
        
        <h4>Core Features and Technical Capabilities</h4>
        <p>ChatGPT Agent seamlessly switches between reasoning and action, conducting in-depth research across public websites, uploaded files, and connected third-party sources while performing actions like filling out forms and editing spreadsheets. The system's unified architecture combines multiple advanced AI functionalities:</p>
        
        <p><strong>Web Automation and Browser Control</strong>: The agent utilizes both visual and text-based browsers, choosing the optimal method to gather and interact with web data whether through GUI websites or text content. This dual-mode approach ensures maximum compatibility across different web platforms and data sources.</p>
        
        <p><strong>Advanced Code Execution</strong>: Terminal and code execution capabilities enable automated task completion, data analysis, and script writing. This programming functionality allows users to delegate complex coding projects directly to the AI system.</p>
        
        <p><strong>Multi-Modal Research Integration</strong>: The agent processes information from diverse sources including documents, emails, and web repositories, synthesizing comprehensive insights for decision-making processes.</p>
        
        <h4>Benchmark Performance Sets New Industry Standards</h4>
        <p>On Humanity's Last Exam (HLE), ChatGPT Agent achieved 41.6% accuracy—roughly double what OpenAI's previous o3 and o4-mini models scored. This challenging assessment covers thousands of questions across 100+ diverse academic and professional subjects, demonstrating the agent's broad reasoning capabilities.</p>
        
        <p>For mathematical problem-solving, the agent scored 27.4% on FrontierMath when equipped with tool access, significantly outperforming previous state-of-the-art models. These benchmarks indicate human-level performance on complex analytical tasks.</p>
        
        <h4>Business Applications and Use Cases</h4>
        <p>The ChatGPT Agent excels in professional environments where task automation drives productivity gains:</p>
        
        <p><strong>Financial Analysis and Reporting</strong>: Automated data processing, spreadsheet management, and comprehensive financial report generation streamline accounting and business intelligence workflows.</p>
        
        <p><strong>Content Creation and Presentation</strong>: The system can create sales presentations and handle multi-step content development projects autonomously, reducing manual effort in marketing and communication tasks.</p>
        
        <p><strong>Research and Documentation</strong>: Deep web research capabilities combined with document synthesis enable comprehensive market analysis, competitive intelligence, and academic research automation.</p>
        
        <h4>Pricing and Availability</h4>
        <p>ChatGPT Agent is available for Pro ($200/month), Plus ($20/month), and Team plan subscribers. The rollout to Plus users began recently, with OpenAI noting the gradual deployment will take several days to complete.</p>
        
        <p>The service is not yet available in Switzerland or the European Economic Area, reflecting ongoing regulatory considerations for advanced AI agent deployment.</p>
        
        <h4>The Path Toward Artificial General Intelligence</h4>
        <p>Unlike traditional chat-based assistants, these agents go beyond simple prompts to reason, plan, and take multi-step actions autonomously. This capability advancement represents significant progress toward artificial general intelligence (AGI) systems that can match human cognitive flexibility across diverse task domains.</p>
        
        <p>The ChatGPT Agent launch fulfills OpenAI's earlier prediction that "2025 is when agents will work," marking a pivotal moment in AI automation adoption for business and professional applications.</p>
        
        <h3>Conclusion</h3>
        <p>OpenAI's ChatGPT Agent represents a transformative leap in AI automation technology, combining autonomous task execution with human-level performance benchmarks. For businesses seeking to leverage AI for complex workflow automation, this tool offers unprecedented capabilities in web operations, coding, research, and analytical tasks. As the technology continues rolling out to subscribers, early adopters gain competitive advantages through enhanced productivity and automated business processes.</p>
      `,
      author: "BetterAiBots",
      date: "July 28, 2025",
      readTime: "4 min read",
      category: "AI Development",
      image: require('./assets/openaigpt5announced.jpg'),
      featured: true,
      slug: "openai-gpt5-revolutionary-multimodal-ai"
    },
    {
      id: 2,
      title: "Google's Gemini Pro Surpasses 100 Million Users in Record Time",
      excerpt: "AI assistant achieves unprecedented adoption rate, outpacing all previous artificial intelligence products",
      content: `
        <p>Google's Gemini Pro has shattered user adoption records by reaching 100 million users faster than any AI product in history, marking a pivotal moment in the artificial intelligence revolution. The achievement underscores the rapidly accelerating public embrace of AI technology and positions Google as a formidable competitor in the AI assistant market.</p>
        
        <h3>Breaking New Ground</h3>
        <p>The milestone represents more than just impressive numbers—it signals a fundamental shift in how consumers interact with artificial intelligence. While previous AI products took months or even years to build substantial user bases, Gemini Pro's meteoric rise demonstrates the growing mainstream appetite for sophisticated AI capabilities.</p>
        
        <p>"This unprecedented adoption rate shows that AI has moved from being a novelty to an essential tool for millions of people," said technology analyst Sarah Chen from Digital Trends Research. "Google has clearly struck the right balance between capability and accessibility."</p>
        
        <h3>What Sets Gemini Pro Apart</h3>
        <p>Gemini Pro's rapid success can be attributed to several key factors that distinguish it from competitors. The AI assistant offers multimodal capabilities, allowing users to interact through text, voice, and images seamlessly. Its integration with Google's ecosystem of services—from Gmail to Google Docs—provides users with a cohesive experience across platforms they already use daily.</p>
        
        <p>The system's advanced reasoning capabilities enable it to handle complex queries, creative tasks, and professional workflows with remarkable sophistication. Users report particular satisfaction with its ability to understand context and maintain coherent conversations across extended interactions.</p>
        
        <h3>Market Impact and Competition</h3>
        <p>This achievement intensifies the competition in the AI assistant space, where companies like OpenAI, Microsoft, and Anthropic are vying for dominance. Google's success with Gemini Pro demonstrates that established tech giants can leverage their existing user bases and infrastructure to rapidly scale AI products.</p>
        
        <p>The milestone also highlights the broader trend of AI democratization, where advanced artificial intelligence capabilities are becoming accessible to everyday consumers rather than remaining confined to technical specialists or enterprise users.</p>
        
        <h3>User Adoption Patterns</h3>
        <p>Early data suggests that Gemini Pro users are engaging with the platform for diverse purposes, from creative writing and problem-solving to professional tasks and educational support. The broad appeal across different use cases has contributed to its rapid growth trajectory.</p>
        
        <p>Small business owners report using Gemini Pro for content creation and customer service support, while students and educators have embraced it as a learning and research companion. This versatility has helped drive sustained engagement beyond initial trial periods.</p>
        
        <h3>Looking Ahead</h3>
        <p>The 100 million user milestone positions Google strongly as the AI market continues to evolve. Industry experts anticipate that this success will accelerate further innovation and investment in AI assistant technology, potentially leading to more sophisticated capabilities and new use cases.</p>
        
        <p>However, questions remain about how Google will maintain user engagement and continue growing its user base as the novelty of AI assistants becomes more commonplace. The company's ability to continuously improve and expand Gemini Pro's capabilities will likely determine its long-term success in this competitive landscape.</p>
        
        <p>As artificial intelligence becomes increasingly integrated into daily digital experiences, Gemini Pro's record-breaking adoption suggests that the future of human-AI interaction is arriving faster than many predicted. The milestone serves as a clear indicator that we are witnessing the early stages of a transformation in how people work, learn, and communicate with technology.</p>
      `,
      author: "BetterAiBots",
      date: "July 25, 2025",
      readTime: "8 min read",
      category: "AI Adoption",
      image: require('./assets/googlegemininews.jpg'),
      featured: false,
      slug: "google-gemini-pro-100-million-users"
    },
    {
      id: 3,
      title: "Meta's Llama 3 is Changing the Game for Open-Source AI",
      excerpt: "The tech giant's latest model is winning over developers with its impressive capabilities and free accessibility",
      content: `
        <p>Meta has just dropped something that's got the AI community buzzing: Llama 3, their newest open-source artificial intelligence model that's already proving to be a game-changer. What makes this release particularly exciting isn't just that it's free for developers to use—it's that the model is genuinely outperforming expectations across the board.</p>
        
        <h3>Why Developers Are Flocking to Llama 3</h3>
        <p>The numbers tell the story: thousands of developers have already started building with Llama 3 since its release, and it's easy to see why. The model represents a significant leap forward from its predecessor, bringing substantial improvements in areas that matter most to real-world applications.</p>
        
        <p>Perhaps most notably, Llama 3 has dramatically improved its reasoning abilities. Where earlier models might struggle with complex problem-solving tasks, this latest version demonstrates a more sophisticated understanding of nuanced questions and multi-step reasoning challenges. For developers building everything from customer service bots to research tools, this enhanced cognitive capability opens up entirely new possibilities.</p>
        
        <h3>A Truly Global AI Model</h3>
        <p>One of Llama 3's standout features is its expanded multilingual support, now covering more than 50 languages with impressive fluency. This isn't just about translation—the model demonstrates genuine understanding of cultural context and linguistic nuances across different languages, making it invaluable for companies looking to build AI applications for global markets.</p>
        
        <p>The model also shines in code generation and debugging, areas where many AI models still struggle. Developers report that Llama 3 can not only write cleaner, more efficient code but also identify and suggest fixes for bugs with remarkable accuracy. This capability alone could save development teams countless hours of troubleshooting.</p>
        
        <h3>Safety First, Innovation Always</h3>
        <p>Meta hasn't just focused on performance improvements—they've also made significant strides in AI safety. Llama 3 incorporates advanced bias mitigation features and safety protocols, addressing one of the most pressing concerns in AI development today. This focus on responsible AI development makes the model more suitable for enterprise applications where trust and reliability are paramount.</p>
        
        <p>"We believe in the power of open AI to drive innovation," explains Meta CEO Mark Zuckerberg. "Llama 3 represents our commitment to making advanced AI accessible to developers and researchers worldwide, fostering a more collaborative and innovative AI ecosystem."</p>
        
        <h3>Built for Real-World Performance</h3>
        <p>Beyond its cognitive improvements, Llama 3 has been optimized to run efficiently across various hardware configurations. This means developers don't need cutting-edge, expensive hardware to harness the model's capabilities—a crucial consideration for startups and smaller organizations looking to integrate AI into their products.</p>
        
        <p>The model's architecture strikes an impressive balance between performance and accessibility, ensuring that high-quality AI capabilities aren't limited to tech giants with massive computational resources.</p>
        
        <h3>The Ripple Effect of Open Source</h3>
        <p>The open-source nature of Llama 3 is creating a ripple effect across the AI industry. When powerful AI models are freely available, it democratizes innovation in ways that proprietary models simply can't match. Small teams can now build sophisticated AI applications that previously would have required partnerships with major tech companies or prohibitively expensive licensing deals.</p>
        
        <p>This accessibility is already spurring innovation across industries. Healthcare startups are using it to build diagnostic tools, educational companies are creating personalized learning assistants, and creative agencies are developing new forms of interactive content.</p>
        
        <h3>Looking Ahead</h3>
        <p>As more developers experiment with Llama 3's capabilities, we're likely to see a new wave of AI-powered applications that push the boundaries of what's possible. The model's combination of high performance, broad language support, and open accessibility creates a foundation for innovation that could reshape how we think about AI integration across industries.</p>
        
        <p>For Meta, Llama 3 represents more than just a technical achievement—it's a statement about the future of AI development. By choosing to make their most advanced model freely available, they're betting that collaborative, open development will ultimately drive faster innovation than closed, proprietary approaches.</p>
        
        <p>Whether this strategy pays off remains to be seen, but early adoption numbers suggest that developers are enthusiastically embracing this more open approach to AI development. In a field often dominated by secrecy and competitive advantage, Llama 3's success could signal a shift toward more collaborative and accessible AI development practices.</p>
      `,
      author: "BetterAiBots",
      date: "June 2, 2025",
      readTime: "7 min read",
      category: "AI Development",
      image: require('./assets/llama3news.jpg'),
      featured: false,
      slug: "meta-llama-3-open-source-ai"
    },
    {
      id: 4,
      title: "Microsoft Copilot Pro is Transforming the Daily Grind",
      excerpt: "How AI integration in Office apps is saving workers hours every day—and changing the way we think about productivity",
      content: `
        <p>Remember when spell-check felt revolutionary? Microsoft is betting that Copilot Pro will be the next workplace transformation that makes us wonder how we ever got by without it. This isn't just another AI tool—it's a complete reimagining of how artificial intelligence can seamlessly blend into the software millions of people use every single day.</p>
        
        <h3>Your Office Suite Just Got a Brain Upgrade</h3>
        <p>Copilot Pro doesn't replace your familiar Office applications; instead, it makes them dramatically smarter. Imagine having a tireless, highly skilled assistant sitting right inside Word, Excel, PowerPoint, and Outlook—one that never gets coffee breaks and actually enjoys analyzing spreadsheets at 2 AM.</p>
        
        <p>The integration feels natural rather than bolted-on, which is crucial for adoption. Users aren't learning an entirely new system; they're discovering that their existing tools have suddenly become far more capable. It's the difference between getting a completely new car and discovering your current car has been secretly upgraded with autopilot features overnight.</p>
        
        <h3>Where the Magic Really Happens</h3>
        <h4>Word: Your Writing Partner That Actually Gets It</h4>
        <p>Writing in Word with Copilot Pro feels like having a conversation with someone who understands both your intent and your audience. Need to draft a project proposal? Copilot can generate a structured outline, suggest compelling arguments, and even adjust the tone for different stakeholders. It's not just autocomplete on steroids—it's genuine writing assistance that understands context, maintains consistency, and can transform rough ideas into polished communication.</p>
        
        <h4>Excel: Making Data Analysis Accessible to Everyone</h4>
        <p>Perhaps nowhere is Copilot Pro more transformative than in Excel. For many users, spreadsheets represent a necessary evil—powerful but intimidating. Copilot changes this dynamic entirely. You can now ask questions in plain English like "What were our best-performing products last quarter?" and watch as complex formulas, pivot tables, and visualizations appear automatically. It's democratizing data analysis in ways that could fundamentally change how businesses make decisions.</p>
        
        <h4>PowerPoint: From Blank Slide Anxiety to Compelling Presentations</h4>
        <p>Anyone who's stared at a blank PowerPoint slide knows the particular form of creative paralysis it can induce. Copilot Pro transforms this experience by helping users structure their ideas, suggest compelling visuals, and maintain consistent design throughout their presentation. More importantly, it can adapt content for different audiences—taking the same core information and reshaping it for executives, technical teams, or client presentations.</p>
        
        <h4>Outlook: Email Management That Actually Works</h4>
        <p>Email overwhelm is a modern workplace epidemic, and Copilot Pro tackles it head-on. Beyond just drafting responses, it can analyze email threads, summarize key decisions, identify action items, and even suggest optimal meeting times based on everyone's availability. It's like having a personal assistant who specializes in making sure nothing falls through the cracks.</p>
        
        <h3>The Numbers Don't Lie</h3>
        <p>Early users are reporting productivity improvements that sound almost too good to be true—until you experience them firsthand. Some organizations are seeing 40% improvements in daily workflow efficiency, but the real impact goes beyond time savings. Workers report feeling less stressed about routine tasks and more able to focus on creative and strategic thinking.</p>
        
        <p>"Copilot Pro is designed to augment human capabilities, not replace them," explains Microsoft CEO Satya Nadella. "We're seeing incredible productivity gains when AI works alongside humans in familiar tools."</p>
        
        <p>This philosophy of augmentation rather than replacement is evident in how Copilot Pro functions. It doesn't make decisions for users; instead, it provides intelligent suggestions, automates routine tasks, and helps humans make better decisions faster.</p>
        
        <h3>The Bigger Picture: AI That Feels Human</h3>
        <p>What sets Copilot Pro apart from other AI productivity tools is its understanding of context and workflow. It doesn't just respond to individual requests—it learns patterns, remembers preferences, and anticipates needs across different applications. When you're working on a project in Word, it can suggest relevant data from Excel or remind you about related email conversations in Outlook.</p>
        
        <p>This interconnected intelligence creates a productivity multiplier effect. Tasks that previously required switching between applications, copying and pasting data, and manually maintaining consistency across documents now happen automatically in the background.</p>
        
        <h3>Challenges and Considerations</h3>
        <p>Like any transformative technology, Copilot Pro isn't without its considerations. Organizations need to think carefully about data privacy, training requirements, and the potential for over-reliance on AI assistance. There's also the question of how these tools might change workplace skills and expectations over time.</p>
        
        <p>However, early evidence suggests that rather than making workers lazy, AI assistance is freeing them to tackle more complex, creative challenges. When routine tasks become effortless, human energy can be redirected toward innovation, relationship-building, and strategic thinking.</p>
        
        <h3>The Future of Work, Today</h3>
        <p>Copilot Pro represents more than just a software upgrade—it's a glimpse into a future where AI seamlessly augments human capability in everyday work environments. As more organizations adopt these tools, we're likely to see a shift in what constitutes baseline productivity expectations.</p>
        
        <p>For Microsoft, this represents a bold bet on the future of workplace technology. Rather than creating standalone AI tools that compete with existing workflows, they've chosen to enhance the software people already know and trust. If successful, this approach could set the standard for how AI integration should feel: powerful, intuitive, and genuinely helpful rather than disruptive.</p>
        
        <p>The early results suggest they might be onto something transformative. In a world where everyone is looking for ways to work smarter rather than harder, Copilot Pro offers a compelling answer: let AI handle the routine stuff, so humans can focus on what they do best.</p>
      `,
      author: "BetterAiBots",
      date: "May 5, 2025",
      readTime: "7 min read",
      category: "AI Adoption",
      image: require('./assets/mocrosoftcopilotaifreebots.jpg'),
      featured: false,
      slug: "microsoft-copilot-pro-productivity"
    },
    {
      id: 5,
      title: "Meet Claude: The AI That Actually Admits When Its Wrong",
      excerpt: "Claude 3.5 Sonnet is quietly solving one of artificial intelligence's biggest problems: overconfidence",
      content: `
        <p>Most AI systems have a dangerous habit: they sound absolutely certain even when they're completely wrong. Ask a typical AI model about something obscure or controversial, and it will confidently deliver an answer with the same tone it uses for basic math. This overconfidence problem has been a persistent thorn in the side of AI adoption, making these systems unreliable for anything truly important.</p>
        
        <p>Anthropic's Claude 3.5 Sonnet takes a radically different approach. Instead of trying to have an answer for everything, it's designed to think more carefully about what it actually knows—and more importantly, what it doesn't.</p>
        
        <h3>The Honesty Experiment</h3>
        <p>The most striking thing about interacting with Claude 3.5 Sonnet isn't its knowledge base or processing speed—it's its intellectual humility. When faced with ambiguous questions or incomplete information, the model doesn't just guess and present its guess as fact. Instead, it acknowledges uncertainty, outlines what it would need to know to give a better answer, and often identifies multiple valid perspectives on complex issues.</p>
        
        <p>This might sound like a limitation, but it's actually a breakthrough. In a world drowning in misinformation and overconfident AI-generated content, having a system that can distinguish between what it knows and what it's guessing represents a fundamental shift in how AI systems should behave.</p>
        
        <h3>Why Most AI Gets Reasoning Wrong</h3>
        <p>Traditional language models are essentially sophisticated pattern-matching systems. They've learned to associate certain inputs with certain outputs based on massive amounts of training data, but they don't really "understand" in the way humans do. When you ask them a question, they generate what seems like the most statistically probable response, regardless of whether that response is actually correct or even coherent.</p>
        
        <p>This approach works remarkably well for many tasks, but it breaks down when dealing with novel problems, edge cases, or situations that require genuine reasoning rather than pattern recognition. The result is AI that can sound impressively knowledgeable while being fundamentally unreliable.</p>
        
        <p>Claude 3.5 Sonnet represents an attempt to move beyond this limitation by implementing something closer to actual reasoning processes—the kind of step-by-step logical thinking that allows humans to work through unfamiliar problems rather than just recalling similar situations.</p>
        
        <h3>The Logic of Uncertainty</h3>
        <p>What makes Sonnet's approach particularly interesting is how it handles uncertainty. Rather than treating uncertainty as a weakness to be hidden, the model treats it as valuable information. When working through a complex problem, it will often outline its reasoning process, identify potential weaknesses in its logic, and suggest alternative approaches.</p>
        
        <p>This transparency makes the model significantly more useful for serious applications. Instead of having to guess whether an AI's confident-sounding answer is actually reliable, users can see the reasoning behind conclusions and make their own judgments about validity.</p>
        
        <p>For professionals who need to make important decisions based on AI assistance, this represents a fundamental improvement in trustworthiness. A model that shows its work and acknowledges its limitations is infinitely more valuable than one that presents every guess as gospel truth.</p>
        
        <h3>The Chess Master's Approach</h3>
        <p>There's an old saying in chess that a master-level player thinks differently from a beginner not because they can see more moves ahead, but because they know which moves are worth calculating in the first place. Claude 3.5 Sonnet demonstrates a similar kind of analytical maturity.</p>
        
        <p>Rather than trying to process every possible angle of a problem simultaneously, it focuses its computational resources on the most promising approaches. This selective attention allows for deeper analysis of the factors that actually matter, rather than getting lost in irrelevant details.</p>
        
        <p>This focused reasoning capability becomes particularly apparent when dealing with problems that require sustained logical thinking over multiple steps. The model can maintain coherence and accuracy even when working through complex chains of reasoning that might trip up less sophisticated systems.</p>
        
        <h3>When Perfectionism Becomes the Enemy</h3>
        <p>The AI industry has become obsessed with benchmark scores and performance metrics, leading to systems optimized for looking impressive in controlled tests rather than being genuinely useful in messy real-world scenarios. Claude 3.5 Sonnet represents a different set of priorities.</p>
        
        <p>Instead of trying to maximize performance on every possible task, Anthropic has focused on building a system that performs reliably on the tasks it attempts. This means accepting that the model won't always have an answer, but when it does provide an answer, that answer is much more likely to be accurate and useful.</p>
        
        <p>This philosophy of "doing fewer things better" runs counter to the prevailing industry trend of building ever-larger models that claim to be capable of everything. But for users who need reliable AI assistance rather than impressive demonstrations, Sonnet's approach may prove more valuable.</p>
        
        <h3>The Trust Problem in AI</h3>
        <p>As AI systems become more prevalent in important decision-making processes, the question of trust becomes paramount. How do you know when to rely on an AI's recommendations? How do you identify when an AI is operating outside its area of competence?</p>
        
        <p>Claude 3.5 Sonnet addresses these questions not through technical complexity, but through transparency and intellectual honesty. By being explicit about its reasoning process and limitations, it gives users the information they need to make informed decisions about when and how to trust its output.</p>
        
        <p>This approach may be less flashy than systems that confidently claim to be able to solve any problem, but it's arguably more important for the long-term development of reliable AI systems.</p>
        
        <h3>Beyond the Hype Cycle</h3>
        <p>In an industry driven by dramatic claims and revolutionary promises, Claude 3.5 Sonnet represents something more modest but potentially more significant: steady progress toward AI systems that are genuinely trustworthy and reliable.</p>
        
        <p>Rather than promising to replace human thinking, it offers to augment human reasoning with a tool that can think through problems systematically while remaining honest about its limitations. For many applications, this combination of capability and humility may be exactly what's needed to move AI from an impressive technology demonstration to a genuinely useful partner in complex problem-solving.</p>
        
        <p>The model's success suggests that the future of AI development may depend less on building systems that can do everything and more on building systems that can be trusted to do what they claim to do. In a world increasingly skeptical of overconfident AI claims, that kind of reliability might be the most revolutionary feature of all.</p>
      `,
      author: "BetterAiBots",
      date: "April 10, 2025",
      readTime: "5 min read",
      category: "AI Development",
      image: require('./assets/claudecode.png'),
      featured: false,
      slug: "anthropic-claude-35-sonnet-reasoning"
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI News & Updates – BetterAiBots.com</title>
        <meta name="description" content="Latest news, updates, and insights from the world of AI bots and artificial intelligence." />
        <meta property="og:title" content="AI News & Updates – BetterAiBots.com" />
        <meta property="og:description" content="Stay informed with the latest AI news, bot updates, and industry insights." />
        <meta property="og:url" content="https://betteraibots.com/news" />
      </Helmet>
      
      <div className="hero-section">
        <h1 className="hero-headline">AI News & Updates</h1>
        <p className="hero-subheadline custom-hero-desc">
          Stay informed with the latest developments in AI bots, artificial intelligence, and emerging technologies.
        </p>
      </div>
      
      <div className="site-disclaimer" style={{ padding: '0 20px', textAlign: 'center' }}>
        🔴 <strong>This site does not provide financial, legal, or medical advice. News articles are for informational purposes only.</strong>
      </div>

      <div className="news-container">
        {/* Featured Article */}
        {newsArticles.filter(article => article.featured).map(article => (
          <article key={article.id} className="featured-news-article">
            <div className="featured-news-image">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="featured-news-content">
              <h2 className="featured-news-title">{article.title}</h2>
              <p className="featured-news-excerpt">{article.excerpt}</p>
              <div className="featured-news-meta">
                <span className="news-author">By {article.author}</span>
                <span className="news-date">{article.date}</span>
              </div>
              <Link to={`/news/${article.slug}`} className="read-more-btn">Read Full Article</Link>
            </div>
          </article>
        ))}

        {/* News Grid */}
        <div className="news-grid">
          {newsArticles.filter(article => !article.featured).map(article => (
            <article key={article.id} className="news-card">
              <div className="news-card-image">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="news-card-content">
                <h3 className="news-card-title">{article.title}</h3>
                <p className="news-card-excerpt">{article.excerpt}</p>
                <div className="news-card-meta">
                  <span className="news-author">By {article.author}</span>
                  <span className="news-date">{article.date}</span>
                </div>
                <Link to={`/news/${article.slug}`} className="read-more-btn-small">Read Full Article</Link>
              </div>
            </article>
          ))}
        </div>

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



// --- Hamburger Menu (mobile) ---
function HamburgerMenu({ open, onClose }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!open) return null;

  return (
    <div className="menu-overlay" onClick={onClose}>
      <div
        className="menu-dropdown-centered"
        onClick={(e) => e.stopPropagation()}
        style={{ minWidth: 240 }}
      >
        <ul>
          <li onClick={() => { navigate('/'); onClose(); }}>Home</li>

          <li
            onClick={() => setShowDropdown((prev) => !prev)}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <span>Categories {showDropdown ? '▴' : '▾'}</span>
            <ul
              className="nav-dropdown-list mobile"
              style={{
                display: showDropdown ? 'flex' : 'none',
                position: 'static',
                flexDirection: 'column',
                gap: '10px',
                paddingLeft: '10px'
              }}
            >
              {CATEGORIES.map((cat) => (
                <li
                  key={cat.name}
                  className="nav-dropdown-item"
                  onClick={() => {
                    navigate(`/${encodeURIComponent(cat.name)}`);
                    onClose();
                  }}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </li>

          <li onClick={() => { navigate('/news'); onClose(); }}>News</li>
          <li onClick={() => { navigate('/articles'); onClose(); }}>Articles</li>
          <li onClick={() => { navigate('/contact'); onClose(); }}>Contact Us</li>
        </ul>
      </div>
    </div>
  );
}


// --- HEADER with AUTH BUTTONS ---
function AppHeader({ onOpenModal, searchValue, setSearchValue, onMenuClick, isMobile, onToggleAnimation, animationPaused }) {
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

// --- CATEGORY BUTTONS COMPONENT ---


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
        <div className={`bot-card${bot.isAffiliate ? ' affiliate-ad' : ''}${bot.title === "InVideo" ? ' invideo-bot' : ''}${bot.title === "VEED AI" ? ' veed-bot' : ''}`} key={i}>
          {bot.isAffiliate ? (
            <a href={bot.openaiLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={bot.image}
                alt={bot.title}
                style={{ width: '100%', borderRadius: 18 }}
                onError={e => { e.target.onerror = null; e.target.src = placeholderImg; }}
              />
            </a>
          ) : (
            <>
              <div className="bot-card-content">
                {bot.free && bot.title !== "InVideo" && bot.title !== "VEED AI" && <div className="verified-badge">Free</div>}
                {!bot.free && <div className="verified-badge">Paid</div>}
                <img
                  src={bot.image}
                  alt={bot.title}
                  className="bot-image"
                  onError={e => { e.target.onerror = null; e.target.src = placeholderImg; }}
                />
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

// --- HOME PAGE ---
function Home({ botList, onOpenModal, searchValue, setSearchValue, showCategoryBar, toggleCategoryBar }) {
  const filteredBots = botList.filter(bot =>
    bot.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    bot.desc.toLowerCase().includes(searchValue.toLowerCase())
  );

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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "BetterAiBots.com",
            "url": "https://betteraibots.com/",
            "description": "Curated directory of AI bots for productivity, health, creativity, and more.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://betteraibots.com/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      
      <CategoryBar showCategoryBar={showCategoryBar} toggleCategoryBar={toggleCategoryBar} />
      
      <div className="hero-section">
        <h1 className="hero-headline">Discover & Share The Best AI Bots</h1>
        <p className="hero-subheadline custom-hero-desc">
          Find better AI Bots to help improve workflow, improve your skills!
        </p>
      </div>
      <div className="site-disclaimer">
  🔴 <strong>This site does not provide financial, legal, or medical advice. Bots are provided "as is" for entertainment and education only. Use at your own risk.</strong>
</div>
      <BotGrid bots={filteredBots} onOpenModal={onOpenModal} />
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
        🔴 <strong>This site does not provide financial, legal, or medical advice. Bots are provided "as is" for entertainment and education only. Use at your own risk.</strong>
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
        BetterAiBots.com ("the Site") is an <b>independent, free public directory</b> listing and linking to AI bots and OpenAI GPTs. The Site <b>does not own, operate, control, endorse, monitor, review, or vet any listed bots, AI services, or third-party content</b>. Bots, content, and links are provided "as is" and solely for informational, entertainment, and educational purposes.
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
  const [botList, setBotList] = useState(bots);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showStickyLogo, setShowStickyLogo] = useState(false);
  const [animationPaused, setAnimationPaused] = useState(false);
  const [showCategoryBar, setShowCategoryBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSearchBubble, setShowSearchBubble] = useState(false);
  const [bubbleSearch, setBubbleSearch] = useState("");
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

  function onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowStickyLogo(scrollTop > 100);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleCategoryBar = () => {
    setShowCategoryBar(!showCategoryBar);
  };

  // Floating chat search functionality
  const handleBubbleSearch = (e) => {
    e.preventDefault();
    if (bubbleSearch.trim()) {
      setSearchValue(bubbleSearch);
      setShowSearchBubble(false);
      setBubbleSearch("");
      // Navigate to home page if not already there
      if (location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    if (!showSearchBubble) return;
    const onKey = (e) => { if (e.key === "Escape") setShowSearchBubble(false); };
    const onClick = (e) => {
      if (!e.target.closest('.floating-search-box') && !e.target.closest('.chat-btn')) {
        setShowSearchBubble(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [showSearchBubble]);

  return (
    <>
    <div id="plasma-bg" style={animationPaused ? { animationPlayState: 'paused' } : {}} />
      <PlausibleAnalytics />
      <GoogleAnalytics />
      <AppHeader
        onOpenModal={handleOpenModal}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onMenuClick={() => setMenuOpen(v => !v)}
        isMobile={isMobile}
        onToggleAnimation={() => setAnimationPaused(v => !v)}
        animationPaused={animationPaused}
      />
      {showStickyLogo && isMobile && (
  <div
    style={{
      position: 'fixed',
      top: 12,
      right: 12,
      zIndex: 1002,
      background: 'rgba(16,28,38,0.95)',
      borderRadius: 12,
      padding: 6,
      boxShadow: '0 2px 12px #0bbfdb50',
    }}
  >
    <button className="header-mob-menu-icon" onClick={() => setMenuOpen(true)}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect y="6" width="28" height="2.7" rx="1.35" fill="#36ff95" />
        <rect y="13" width="28" height="2.7" rx="1.35" fill="#36ff95" />
        <rect y="20" width="28" height="2.7" rx="1.35" fill="#36ff95" />
      </svg>
    </button>
  </div>


      )}
      <div style={{
        position: "sticky",
        top: 0,
        background: "linear-gradient(135deg, #101c26 0%, #172d3e 100%)",
        zIndex: 20,
      }}>
        {!isMobile && (
          <NavTabsBar 
            showCategoryBar={showCategoryBar} 
            toggleCategoryBar={toggleCategoryBar}
          />
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
            showCategoryBar={showCategoryBar}
            toggleCategoryBar={toggleCategoryBar}
          />}
        />
        <Route path="/:cat" element={<CategoryPage botList={botList} onOpenModal={handleOpenModal} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/moderation" element={<Moderation botList={botList} approveBot={approveBot} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <DisclaimerBar />
      <FooterWithWallets />
      
      {/* Floating Chat Button (opens search) */}
      {!showSearchBubble && (
        <button
          className="chat-btn"
          onClick={() => { setShowSearchBubble(true); setBubbleSearch(""); }}
          style={{ padding: 0, background: "none", border: "none", boxShadow: "none" }}
        >
          <img
            src={require('./assets/findthebestaibotshelper.png')}
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
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 300,
          background: '#192738',
          borderRadius: 22,
          boxShadow: '0 7px 48px #16ff6c58, 0 2px 8px #0bbfdb18',
          zIndex: 100,
          padding: 22,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}>
          <input
            className="floating-chat-input"
            style={{ 
              width: '100%', 
              fontSize: "1.18rem",
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              background: '#2a3a4a',
              color: '#ffffff',
              marginBottom: '8px'
            }}
            value={bubbleSearch}
            onChange={e => setBubbleSearch(e.target.value)}
            placeholder="search"
            autoFocus
          />
          <button 
            type="button"
            className="floating-chat-send" 
            style={{ 
              width: '100%',
              fontSize: "1.09rem", 
              padding: "8px 16px",
              background: 'linear-gradient(90deg, #09e269 0%, #0bbfdb 100%)',
              color: '#101c26',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '8px'
            }}
            onClick={handleBubbleSearch}
          >
            search
          </button>
          <div 
            style={{
              color: '#09e269',
              fontSize: '1.08rem',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'center',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onClick={() => {
              window.open('https://chatgpt.com/g/g-683e57f7b0b88191b0b8313aee04ea59-betteraibots-concierge', '_blank');
            }}
          >
            <span>Click Here to talk with BAIB</span>
            <img
              src={require('./assets/findthebestaibotshelper.png')}
              alt="BAIB Logo"
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                boxShadow: "0 0 4px #36ff9588",
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://chatgpt.com/g/g-683e57f7b0b88191b0b8313aee04ea59-betteraibots-concierge', '_blank');
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
        </div>
      )}
      
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
                sitekey="6LfKNiIpAAAAAF_aBzJK6QK6QK6QK6QK6QK6QK6Q"
                onChange={setBotRecaptchaValue}
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
                marginBottom: "-6px",
                color: "#36ff95",
                fontWeight: 200,
                fontSize: "0.89rem",
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
      marginLeft: 6,
      fontFamily: "Inter, Arial, sans-serif"
    }}
  >
    DubbyDevs
  </a>
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

// --- INDIVIDUAL NEWS ARTICLE PAGE ---
function NewsArticle() {
  const { slug } = useParams();
  
  const newsArticles = [
    {
      id: 1,
      title: "OpenAI Announces GPT-5: Revolutionary Multimodal AI Model",
      excerpt: "OpenAI has officially unveiled GPT-5, their most advanced AI model yet, featuring unprecedented multimodal capabilities and improved reasoning abilities.",
      content: `
        <p>OpenAI's groundbreaking ChatGPT Agent, launched July 17, 2025, transforms AI from conversational assistant to autonomous task executor. Achieving 41.6% accuracy on Humanity's Last Exam benchmark—double previous models' performance—this AI automation breakthrough handles complex workflows including web operations, coding, and financial analysis for Pro, Plus, and Team subscribers.</p>
        
        <h3>ChatGPT Agent Redefines AI Automation Capabilities</h3>
        <p>OpenAI CEO Sam Altman describes the new agent as "a new level of capability for AI systems" that can accomplish "remarkable, complex tasks" using its own computer. This represents a fundamental shift from traditional ask-and-answer AI interactions toward truly autonomous artificial intelligence systems.</p>
        
        <h4>Core Features and Technical Capabilities</h4>
        <p>ChatGPT Agent seamlessly switches between reasoning and action, conducting in-depth research across public websites, uploaded files, and connected third-party sources while performing actions like filling out forms and editing spreadsheets. The system's unified architecture combines multiple advanced AI functionalities:</p>
        
        <p><strong>Web Automation and Browser Control</strong>: The agent utilizes both visual and text-based browsers, choosing the optimal method to gather and interact with web data whether through GUI websites or text content. This dual-mode approach ensures maximum compatibility across different web platforms and data sources.</p>
        
        <p><strong>Advanced Code Execution</strong>: Terminal and code execution capabilities enable automated task completion, data analysis, and script writing. This programming functionality allows users to delegate complex coding projects directly to the AI system.</p>
        
        <p><strong>Multi-Modal Research Integration</strong>: The agent processes information from diverse sources including documents, emails, and web repositories, synthesizing comprehensive insights for decision-making processes.</p>
        
        <h4>Benchmark Performance Sets New Industry Standards</h4>
        <p>On Humanity's Last Exam (HLE), ChatGPT Agent achieved 41.6% accuracy—roughly double what OpenAI's previous o3 and o4-mini models scored. This challenging assessment covers thousands of questions across 100+ diverse academic and professional subjects, demonstrating the agent's broad reasoning capabilities.</p>
        
        <p>For mathematical problem-solving, the agent scored 27.4% on FrontierMath when equipped with tool access, significantly outperforming previous state-of-the-art models. These benchmarks indicate human-level performance on complex analytical tasks.</p>
        
        <h4>Business Applications and Use Cases</h4>
        <p>The ChatGPT Agent excels in professional environments where task automation drives productivity gains:</p>
        
        <p><strong>Financial Analysis and Reporting</strong>: Automated data processing, spreadsheet management, and comprehensive financial report generation streamline accounting and business intelligence workflows.</p>
        
        <p><strong>Content Creation and Presentation</strong>: The system can create sales presentations and handle multi-step content development projects autonomously, reducing manual effort in marketing and communication tasks.</p>
        
        <p><strong>Research and Documentation</strong>: Deep web research capabilities combined with document synthesis enable comprehensive market analysis, competitive intelligence, and academic research automation.</p>
        
        <h4>Pricing and Availability</h4>
        <p>ChatGPT Agent is available for Pro ($200/month), Plus ($20/month), and Team plan subscribers. The rollout to Plus users began recently, with OpenAI noting the gradual deployment will take several days to complete.</p>
        
        <p>The service is not yet available in Switzerland or the European Economic Area, reflecting ongoing regulatory considerations for advanced AI agent deployment.</p>
        
        <h4>The Path Toward Artificial General Intelligence</h4>
        <p>Unlike traditional chat-based assistants, these agents go beyond simple prompts to reason, plan, and take multi-step actions autonomously. This capability advancement represents significant progress toward artificial general intelligence (AGI) systems that can match human cognitive flexibility across diverse task domains.</p>
        
        <p>The ChatGPT Agent launch fulfills OpenAI's earlier prediction that "2025 is when agents will work," marking a pivotal moment in AI automation adoption for business and professional applications.</p>
        
        <h3>Conclusion</h3>
        <p>OpenAI's ChatGPT Agent represents a transformative leap in AI automation technology, combining autonomous task execution with human-level performance benchmarks. For businesses seeking to leverage AI for complex workflow automation, this tool offers unprecedented capabilities in web operations, coding, research, and analytical tasks. As the technology continues rolling out to subscribers, early adopters gain competitive advantages through enhanced productivity and automated business processes.</p>
      `,
      author: "BetterAiBots",
      date: "July 28, 2025",
      readTime: "4 min read",
      category: "AI Development",
      image: require('./assets/openaigpt5announced.jpg'),
      featured: true,
      slug: "openai-gpt5-revolutionary-multimodal-ai"
    },
    {
      id: 2,
      title: "Google's Gemini Pro Surpasses 100 Million Users in Record Time",
      excerpt: "AI assistant achieves unprecedented adoption rate, outpacing all previous artificial intelligence products",
      content: `
        <p>Google's Gemini Pro has shattered user adoption records by reaching 100 million users faster than any AI product in history, marking a pivotal moment in the artificial intelligence revolution. The achievement underscores the rapidly accelerating public embrace of AI technology and positions Google as a formidable competitor in the AI assistant market.</p>
        
        <h3>Breaking New Ground</h3>
        <p>The milestone represents more than just impressive numbers—it signals a fundamental shift in how consumers interact with artificial intelligence. While previous AI products took months or even years to build substantial user bases, Gemini Pro's meteoric rise demonstrates the growing mainstream appetite for sophisticated AI capabilities.</p>
        
        <p>"This unprecedented adoption rate shows that AI has moved from being a novelty to an essential tool for millions of people," said technology analyst Sarah Chen from Digital Trends Research. "Google has clearly struck the right balance between capability and accessibility."</p>
        
        <h3>What Sets Gemini Pro Apart</h3>
        <p>Gemini Pro's rapid success can be attributed to several key factors that distinguish it from competitors. The AI assistant offers multimodal capabilities, allowing users to interact through text, voice, and images seamlessly. Its integration with Google's ecosystem of services—from Gmail to Google Docs—provides users with a cohesive experience across platforms they already use daily.</p>
        
        <p>The system's advanced reasoning capabilities enable it to handle complex queries, creative tasks, and professional workflows with remarkable sophistication. Users report particular satisfaction with its ability to understand context and maintain coherent conversations across extended interactions.</p>
        
        <h3>Market Impact and Competition</h3>
        <p>This achievement intensifies the competition in the AI assistant space, where companies like OpenAI, Microsoft, and Anthropic are vying for dominance. Google's success with Gemini Pro demonstrates that established tech giants can leverage their existing user bases and infrastructure to rapidly scale AI products.</p>
        
        <p>The milestone also highlights the broader trend of AI democratization, where advanced artificial intelligence capabilities are becoming accessible to everyday consumers rather than remaining confined to technical specialists or enterprise users.</p>
        
        <h3>User Adoption Patterns</h3>
        <p>Early data suggests that Gemini Pro users are engaging with the platform for diverse purposes, from creative writing and problem-solving to professional tasks and educational support. The broad appeal across different use cases has contributed to its rapid growth trajectory.</p>
        
        <p>Small business owners report using Gemini Pro for content creation and customer service support, while students and educators have embraced it as a learning and research companion. This versatility has helped drive sustained engagement beyond initial trial periods.</p>
        
        <h3>Looking Ahead</h3>
        <p>The 100 million user milestone positions Google strongly as the AI market continues to evolve. Industry experts anticipate that this success will accelerate further innovation and investment in AI assistant technology, potentially leading to more sophisticated capabilities and new use cases.</p>
        
        <p>However, questions remain about how Google will maintain user engagement and continue growing its user base as the novelty of AI assistants becomes more commonplace. The company's ability to continuously improve and expand Gemini Pro's capabilities will likely determine its long-term success in this competitive landscape.</p>
        
        <p>As artificial intelligence becomes increasingly integrated into daily digital experiences, Gemini Pro's record-breaking adoption suggests that the future of human-AI interaction is arriving faster than many predicted. The milestone serves as a clear indicator that we are witnessing the early stages of a transformation in how people work, learn, and communicate with technology.</p>
      `,
      author: "BetterAiBots",
      date: "July 25, 2025",
      readTime: "8 min read",
      category: "AI Adoption",
      image: require('./assets/googlegemininews.jpg'),
      featured: false,
      slug: "google-gemini-pro-100-million-users"
    },
    {
      id: 3,
      title: "Meta's Llama 3 is Changing the Game for Open-Source AI",
      excerpt: "The tech giant's latest model is winning over developers with its impressive capabilities and free accessibility",
      content: `
        <p>Meta has just dropped something that's got the AI community buzzing: Llama 3, their newest open-source artificial intelligence model that's already proving to be a game-changer. What makes this release particularly exciting isn't just that it's free for developers to use—it's that the model is genuinely outperforming expectations across the board.</p>
        
        <h3>Why Developers Are Flocking to Llama 3</h3>
        <p>The numbers tell the story: thousands of developers have already started building with Llama 3 since its release, and it's easy to see why. The model represents a significant leap forward from its predecessor, bringing substantial improvements in areas that matter most to real-world applications.</p>
        
        <p>Perhaps most notably, Llama 3 has dramatically improved its reasoning abilities. Where earlier models might struggle with complex problem-solving tasks, this latest version demonstrates a more sophisticated understanding of nuanced questions and multi-step reasoning challenges. For developers building everything from customer service bots to research tools, this enhanced cognitive capability opens up entirely new possibilities.</p>
        
        <h3>A Truly Global AI Model</h3>
        <p>One of Llama 3's standout features is its expanded multilingual support, now covering more than 50 languages with impressive fluency. This isn't just about translation—the model demonstrates genuine understanding of cultural context and linguistic nuances across different languages, making it invaluable for companies looking to build AI applications for global markets.</p>
        
        <p>The model also shines in code generation and debugging, areas where many AI models still struggle. Developers report that Llama 3 can not only write cleaner, more efficient code but also identify and suggest fixes for bugs with remarkable accuracy. This capability alone could save development teams countless hours of troubleshooting.</p>
        
        <h3>Safety First, Innovation Always</h3>
        <p>Meta hasn't just focused on performance improvements—they've also made significant strides in AI safety. Llama 3 incorporates advanced bias mitigation features and safety protocols, addressing one of the most pressing concerns in AI development today. This focus on responsible AI development makes the model more suitable for enterprise applications where trust and reliability are paramount.</p>
        
        <p>"We believe in the power of open AI to drive innovation," explains Meta CEO Mark Zuckerberg. "Llama 3 represents our commitment to making advanced AI accessible to developers and researchers worldwide, fostering a more collaborative and innovative AI ecosystem."</p>
        
        <h3>Built for Real-World Performance</h3>
        <p>Beyond its cognitive improvements, Llama 3 has been optimized to run efficiently across various hardware configurations. This means developers don't need cutting-edge, expensive hardware to harness the model's capabilities—a crucial consideration for startups and smaller organizations looking to integrate AI into their products.</p>
        
        <p>The model's architecture strikes an impressive balance between performance and accessibility, ensuring that high-quality AI capabilities aren't limited to tech giants with massive computational resources.</p>
        
        <h3>The Ripple Effect of Open Source</h3>
        <p>The open-source nature of Llama 3 is creating a ripple effect across the AI industry. When powerful AI models are freely available, it democratizes innovation in ways that proprietary models simply can't match. Small teams can now build sophisticated AI applications that previously would have required partnerships with major tech companies or prohibitively expensive licensing deals.</p>
        
        <p>This accessibility is already spurring innovation across industries. Healthcare startups are using it to build diagnostic tools, educational companies are creating personalized learning assistants, and creative agencies are developing new forms of interactive content.</p>
        
        <h3>Looking Ahead</h3>
        <p>As more developers experiment with Llama 3's capabilities, we're likely to see a new wave of AI-powered applications that push the boundaries of what's possible. The model's combination of high performance, broad language support, and open accessibility creates a foundation for innovation that could reshape how we think about AI integration across industries.</p>
        
        <p>For Meta, Llama 3 represents more than just a technical achievement—it's a statement about the future of AI development. By choosing to make their most advanced model freely available, they're betting that collaborative, open development will ultimately drive faster innovation than closed, proprietary approaches.</p>
        
        <p>Whether this strategy pays off remains to be seen, but early adoption numbers suggest that developers are enthusiastically embracing this more open approach to AI development. In a field often dominated by secrecy and competitive advantage, Llama 3's success could signal a shift toward more collaborative and accessible AI development practices.</p>
      `,
      author: "BetterAiBots",
      date: "June 2, 2025",
      readTime: "7 min read",
      category: "AI Development",
      image: require('./assets/llama3news.jpg'),
      featured: false,
      slug: "meta-llama-3-open-source-ai"
    },
    {
      id: 4,
      title: "Microsoft Copilot Pro is Transforming the Daily Grind",
      excerpt: "How AI integration in Office apps is saving workers hours every day—and changing the way we think about productivity",
      content: `
        <p>Remember when spell-check felt revolutionary? Microsoft is betting that Copilot Pro will be the next workplace transformation that makes us wonder how we ever got by without it. This isn't just another AI tool—it's a complete reimagining of how artificial intelligence can seamlessly blend into the software millions of people use every single day.</p>
        
        <h3>Your Office Suite Just Got a Brain Upgrade</h3>
        <p>Copilot Pro doesn't replace your familiar Office applications; instead, it makes them dramatically smarter. Imagine having a tireless, highly skilled assistant sitting right inside Word, Excel, PowerPoint, and Outlook—one that never gets coffee breaks and actually enjoys analyzing spreadsheets at 2 AM.</p>
        
        <p>The integration feels natural rather than bolted-on, which is crucial for adoption. Users aren't learning an entirely new system; they're discovering that their existing tools have suddenly become far more capable. It's the difference between getting a completely new car and discovering your current car has been secretly upgraded with autopilot features overnight.</p>
        
        <h3>Where the Magic Really Happens</h3>
        <h4>Word: Your Writing Partner That Actually Gets It</h4>
        <p>Writing in Word with Copilot Pro feels like having a conversation with someone who understands both your intent and your audience. Need to draft a project proposal? Copilot can generate a structured outline, suggest compelling arguments, and even adjust the tone for different stakeholders. It's not just autocomplete on steroids—it's genuine writing assistance that understands context, maintains consistency, and can transform rough ideas into polished communication.</p>
        
        <h4>Excel: Making Data Analysis Accessible to Everyone</h4>
        <p>Perhaps nowhere is Copilot Pro more transformative than in Excel. For many users, spreadsheets represent a necessary evil—powerful but intimidating. Copilot changes this dynamic entirely. You can now ask questions in plain English like "What were our best-performing products last quarter?" and watch as complex formulas, pivot tables, and visualizations appear automatically. It's democratizing data analysis in ways that could fundamentally change how businesses make decisions.</p>
        
        <h4>PowerPoint: From Blank Slide Anxiety to Compelling Presentations</h4>
        <p>Anyone who's stared at a blank PowerPoint slide knows the particular form of creative paralysis it can induce. Copilot Pro transforms this experience by helping users structure their ideas, suggest compelling visuals, and maintain consistent design throughout their presentation. More importantly, it can adapt content for different audiences—taking the same core information and reshaping it for executives, technical teams, or client presentations.</p>
        
        <h4>Outlook: Email Management That Actually Works</h4>
        <p>Email overwhelm is a modern workplace epidemic, and Copilot Pro tackles it head-on. Beyond just drafting responses, it can analyze email threads, summarize key decisions, identify action items, and even suggest optimal meeting times based on everyone's availability. It's like having a personal assistant who specializes in making sure nothing falls through the cracks.</p>
        
        <h3>The Numbers Don't Lie</h3>
        <p>Early users are reporting productivity improvements that sound almost too good to be true—until you experience them firsthand. Some organizations are seeing 40% improvements in daily workflow efficiency, but the real impact goes beyond time savings. Workers report feeling less stressed about routine tasks and more able to focus on creative and strategic thinking.</p>
        
        <p>"Copilot Pro is designed to augment human capabilities, not replace them," explains Microsoft CEO Satya Nadella. "We're seeing incredible productivity gains when AI works alongside humans in familiar tools."</p>
        
        <p>This philosophy of augmentation rather than replacement is evident in how Copilot Pro functions. It doesn't make decisions for users; instead, it provides intelligent suggestions, automates routine tasks, and helps humans make better decisions faster.</p>
        
        <h3>The Bigger Picture: AI That Feels Human</h3>
        <p>What sets Copilot Pro apart from other AI productivity tools is its understanding of context and workflow. It doesn't just respond to individual requests—it learns patterns, remembers preferences, and anticipates needs across different applications. When you're working on a project in Word, it can suggest relevant data from Excel or remind you about related email conversations in Outlook.</p>
        
        <p>This interconnected intelligence creates a productivity multiplier effect. Tasks that previously required switching between applications, copying and pasting data, and manually maintaining consistency across documents now happen automatically in the background.</p>
        
        <h3>Challenges and Considerations</h3>
        <p>Like any transformative technology, Copilot Pro isn't without its considerations. Organizations need to think carefully about data privacy, training requirements, and the potential for over-reliance on AI assistance. There's also the question of how these tools might change workplace skills and expectations over time.</p>
        
        <p>However, early evidence suggests that rather than making workers lazy, AI assistance is freeing them to tackle more complex, creative challenges. When routine tasks become effortless, human energy can be redirected toward innovation, relationship-building, and strategic thinking.</p>
        
        <h3>The Future of Work, Today</h3>
        <p>Copilot Pro represents more than just a software upgrade—it's a glimpse into a future where AI seamlessly augments human capability in everyday work environments. As more organizations adopt these tools, we're likely to see a shift in what constitutes baseline productivity expectations.</p>
        
        <p>For Microsoft, this represents a bold bet on the future of workplace technology. Rather than creating standalone AI tools that compete with existing workflows, they've chosen to enhance the software people already know and trust. If successful, this approach could set the standard for how AI integration should feel: powerful, intuitive, and genuinely helpful rather than disruptive.</p>
        
        <p>The early results suggest they might be onto something transformative. In a world where everyone is looking for ways to work smarter rather than harder, Copilot Pro offers a compelling answer: let AI handle the routine stuff, so humans can focus on what they do best.</p>
      `,
      author: "BetterAiBots",
      date: "May 5, 2025",
      readTime: "7 min read",
      category: "AI Adoption",
      image: require('./assets/mocrosoftcopilotaifreebots.jpg'),
      featured: false,
      slug: "microsoft-copilot-pro-productivity"
    },
    {
      id: 5,
      title: "Meet Claude: The AI That Actually Admits When Its Wrong",
      excerpt: "Claude 3.5 Sonnet is quietly solving one of artificial intelligence's biggest problems: overconfidence",
      content: `
        <p>Most AI systems have a dangerous habit: they sound absolutely certain even when they're completely wrong. Ask a typical AI model about something obscure or controversial, and it will confidently deliver an answer with the same tone it uses for basic math. This overconfidence problem has been a persistent thorn in the side of AI adoption, making these systems unreliable for anything truly important.</p>
        
        <p>Anthropic's Claude 3.5 Sonnet takes a radically different approach. Instead of trying to have an answer for everything, it's designed to think more carefully about what it actually knows—and more importantly, what it doesn't.</p>
        
        <h3>The Honesty Experiment</h3>
        <p>The most striking thing about interacting with Claude 3.5 Sonnet isn't its knowledge base or processing speed—it's its intellectual humility. When faced with ambiguous questions or incomplete information, the model doesn't just guess and present its guess as fact. Instead, it acknowledges uncertainty, outlines what it would need to know to give a better answer, and often identifies multiple valid perspectives on complex issues.</p>
        
        <p>This might sound like a limitation, but it's actually a breakthrough. In a world drowning in misinformation and overconfident AI-generated content, having a system that can distinguish between what it knows and what it's guessing represents a fundamental shift in how AI systems should behave.</p>
        
        <h3>Why Most AI Gets Reasoning Wrong</h3>
        <p>Traditional language models are essentially sophisticated pattern-matching systems. They've learned to associate certain inputs with certain outputs based on massive amounts of training data, but they don't really "understand" in the way humans do. When you ask them a question, they generate what seems like the most statistically probable response, regardless of whether that response is actually correct or even coherent.</p>
        
        <p>This approach works remarkably well for many tasks, but it breaks down when dealing with novel problems, edge cases, or situations that require genuine reasoning rather than pattern recognition. The result is AI that can sound impressively knowledgeable while being fundamentally unreliable.</p>
        
        <p>Claude 3.5 Sonnet represents an attempt to move beyond this limitation by implementing something closer to actual reasoning processes—the kind of step-by-step logical thinking that allows humans to work through unfamiliar problems rather than just recalling similar situations.</p>
        
        <h3>The Logic of Uncertainty</h3>
        <p>What makes Sonnet's approach particularly interesting is how it handles uncertainty. Rather than treating uncertainty as a weakness to be hidden, the model treats it as valuable information. When working through a complex problem, it will often outline its reasoning process, identify potential weaknesses in its logic, and suggest alternative approaches.</p>
        
        <p>This transparency makes the model significantly more useful for serious applications. Instead of having to guess whether an AI's confident-sounding answer is actually reliable, users can see the reasoning behind conclusions and make their own judgments about validity.</p>
        
        <p>For professionals who need to make important decisions based on AI assistance, this represents a fundamental improvement in trustworthiness. A model that shows its work and acknowledges its limitations is infinitely more valuable than one that presents every guess as gospel truth.</p>
        
        <h3>The Chess Master's Approach</h3>
        <p>There's an old saying in chess that a master-level player thinks differently from a beginner not because they can see more moves ahead, but because they know which moves are worth calculating in the first place. Claude 3.5 Sonnet demonstrates a similar kind of analytical maturity.</p>
        
        <p>Rather than trying to process every possible angle of a problem simultaneously, it focuses its computational resources on the most promising approaches. This selective attention allows for deeper analysis of the factors that actually matter, rather than getting lost in irrelevant details.</p>
        
        <p>This focused reasoning capability becomes particularly apparent when dealing with problems that require sustained logical thinking over multiple steps. The model can maintain coherence and accuracy even when working through complex chains of reasoning that might trip up less sophisticated systems.</p>
        
        <h3>When Perfectionism Becomes the Enemy</h3>
        <p>The AI industry has become obsessed with benchmark scores and performance metrics, leading to systems optimized for looking impressive in controlled tests rather than being genuinely useful in messy real-world scenarios. Claude 3.5 Sonnet represents a different set of priorities.</p>
        
        <p>Instead of trying to maximize performance on every possible task, Anthropic has focused on building a system that performs reliably on the tasks it attempts. This means accepting that the model won't always have an answer, but when it does provide an answer, that answer is much more likely to be accurate and useful.</p>
        
        <p>This philosophy of "doing fewer things better" runs counter to the prevailing industry trend of building ever-larger models that claim to be capable of everything. But for users who need reliable AI assistance rather than impressive demonstrations, Sonnet's approach may prove more valuable.</p>
        
        <h3>The Trust Problem in AI</h3>
        <p>As AI systems become more prevalent in important decision-making processes, the question of trust becomes paramount. How do you know when to rely on an AI's recommendations? How do you identify when an AI is operating outside its area of competence?</p>
        
        <p>Claude 3.5 Sonnet addresses these questions not through technical complexity, but through transparency and intellectual honesty. By being explicit about its reasoning process and limitations, it gives users the information they need to make informed decisions about when and how to trust its output.</p>
        
        <p>This approach may be less flashy than systems that confidently claim to be able to solve any problem, but it's arguably more important for the long-term development of reliable AI systems.</p>
        
        <h3>Beyond the Hype Cycle</h3>
        <p>In an industry driven by dramatic claims and revolutionary promises, Claude 3.5 Sonnet represents something more modest but potentially more significant: steady progress toward AI systems that are genuinely trustworthy and reliable.</p>
        
        <p>Rather than promising to replace human thinking, it offers to augment human reasoning with a tool that can think through problems systematically while remaining honest about its limitations. For many applications, this combination of capability and humility may be exactly what's needed to move AI from an impressive technology demonstration to a genuinely useful partner in complex problem-solving.</p>
        
        <p>The model's success suggests that the future of AI development may depend less on building systems that can do everything and more on building systems that can be trusted to do what they claim to do. In a world increasingly skeptical of overconfident AI claims, that kind of reliability might be the most revolutionary feature of all.</p>
      `,
      author: "BetterAiBots",
      date: "April 10, 2025",
      readTime: "5 min read",
      category: "AI Development",
      image: require('./assets/claudecode.png'),
      featured: false,
      slug: "anthropic-claude-35-sonnet-reasoning"
    }
  ];

  const article = newsArticles.find(article => article.slug === slug);

  if (!article) {
    return (
      <div className="hero-section">
        <h1 className="hero-headline">Article Not Found</h1>
        <p className="hero-subheadline custom-hero-desc">
          The article you're looking for doesn't exist.
        </p>
        <Link to="/news" className="read-more-btn">Back to News</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} – BetterAiBots.com</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={`https://betteraibots.com/news/${article.slug}`} />
      </Helmet>
      
      <div className="article-container">
        <div className="article-header">
          <div className="article-meta">
            <span className="article-category">{article.category}</span>
            <span className="article-date">{article.date}</span>
            <span className="article-read-time">{article.readTime}</span>
          </div>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-excerpt">{article.excerpt}</p>
          <div className="article-author">
            <span>By {article.author}</span>
          </div>
        </div>
        
        <div className="article-image">
          <img src={article.image} alt={article.title} />
        </div>
        
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        
        <div className="article-footer">
          <Link to="/news" className="back-to-news-btn">← Back to News</Link>
        </div>
      </div>
    </>
  );
}

// --- CATEGORY BAR COMPONENT ---
function CategoryBar({ showCategoryBar, toggleCategoryBar }) {
  if (!showCategoryBar) return null;
  
  return (
    <div className="category-bar">
      <div className="category-bar-container">
        {CATEGORIES.map((cat) => {
          const slug = CATEGORY_SLUGS[cat.name] || encodeURIComponent(cat.name);
          return (
            <Link
              to={`/${slug}`}
              className="category-bar-button"
              key={cat.name}
              tabIndex={0}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
      <button 
        className="category-bar-toggle"
        onClick={toggleCategoryBar}
        title="Hide category bar"
              >
          ×
        </button>
      </div>
    );
  }

