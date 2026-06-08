import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import musebrand from '../assets/musebrand.jpg';
import blackboxai from '../assets/blackboxai.webp';

// --- AI FOR DUMMIES GUIDE COMPONENT ---
function AIForDummiesGuide({ onClose }) {
  return (
    <div 
      className="learn-path-guide-overlay"
      onClick={onClose}
      style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
        background: 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
        border: '2px solid #36ff95',
        borderRadius: '20px',
        maxWidth: '900px',
        maxHeight: '90vh',
        width: '100%',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(54, 255, 149, 0.3)'
      }}
      className="learn-path-guide learn-path-guide--dummies custom-scrollbar">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #000000;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #333333;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #444444;
          }
        `}</style>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#36ff95',
            fontSize: '24px',
            cursor: 'pointer',
            fontWeight: 'bold',
            zIndex: 10
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px', paddingTop: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <img
              src="/aifordummies.png"
              alt="AI for Dummies"
              style={{
                width: '120px',
                height: '120px',
                maxWidth: '120px',
                maxHeight: '120px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(54, 255, 149, 0.6))'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 style={{
            color: '#36ff95',
            fontSize: '2.2rem',
            fontWeight: 'bold',
            marginBottom: '15px',
            marginTop: '10px',
            background: 'linear-gradient(135deg, #36ff95, #0bbfdb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI for Dummies
          </h1>
          <p style={{
            color: '#b2ffe0',
            fontSize: '1.1rem',
            marginBottom: '20px'
          }}>
            Your Super Simple Guide to Getting Started with Artificial Intelligence
          </p>
        </div>

        {/* Content */}
        <div className="learn-path-guide__content" style={{
          padding: '0 30px 30px 30px',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          fontSize: '1rem'
        }}>
          <div style={{ marginBottom: '25px' }}>
            <p style={{ marginBottom: '15px', fontSize: '1.1rem' }}>
              <strong>Don't worry - you're not actually a dummy!</strong> Everyone starts somewhere, and if you're reading this, you're already taking the smart step of learning about AI. Think of this as your friendly neighbor explaining AI over coffee - no confusing tech jargon, no intimidating concepts, just simple explanations that anyone can understand. By the end of this guide, you'll know exactly what AI is, how to use it in your daily life, and why it's actually way less scary than you might think.
            </p>
            <p style={{ marginBottom: '15px' }}>
              You've probably already used AI without even knowing it! When Netflix suggests a movie you might like, when your phone's camera recognizes faces, or when you ask Siri a question - that's all AI working behind the scenes. The good news? <strong>AI is designed to make your life easier, not more complicated</strong>. Let's explore this amazing technology together, one simple step at a time.
            </p>
          </div>

          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>
            What is AI? (Don't worry, it's simpler than you think!)
          </h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>AI stands for Artificial Intelligence, but let's call it "smart computer helpers."</strong> Imagine if you had a really smart assistant who never gets tired, can read incredibly fast, and remembers everything. That's basically what AI is - computer programs that can think, learn, and help you with tasks that normally require human intelligence.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Think of AI like a really smart calculator, but for words and ideas instead of just numbers.</strong> Just like a calculator can instantly solve math problems you might struggle with, AI can instantly write emails, answer questions, or create pictures based on what you tell it. The difference is that instead of typing "2+2" and getting "4," you might type "write a birthday card message for my mom" and get a beautiful, personalized message.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>AI learns patterns from lots and lots of examples.</strong> Imagine you showed a computer millions of photos of cats and told it "these are cats." Eventually, it would get really good at recognizing cats in new photos. That's basically how AI works - it learns from tons of examples and then uses that knowledge to help you with new situations.
          </p>
          <p style={{ marginBottom: '25px' }}>
            <strong>The most important thing to understand: AI is a tool, like a hammer or a microwave.</strong> It's not magic, it's not going to take over the world, and it's not trying to replace you. It's just a very useful tool that can help you get things done faster and easier. You're always in control of what you ask it to do.
          </p>

          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>
            The most common AI tools you can start using today
          </h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>ChatGPT is like having a conversation with a really smart friend.</strong> You can ask it questions, ask for help with writing, or even just chat about your day. It's completely free to try, and you don't need to download anything - just go to chat.openai.com and start typing. You can ask it things like "help me write an email to my boss about taking time off" or "explain why my car might be making a weird noise."
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Google's AI (called Gemini) works similarly to ChatGPT</strong> and you can find it at gemini.google.com. Some people prefer one over the other, like preferring Pepsi vs Coke - they both do similar things, just with slightly different styles. Google's version is really good if you want to search for current information or connect with other Google services you might already use.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Voice assistants like Siri, Alexa, and Google Assistant</strong> are AI tools you might already have! If you have an iPhone, just say "Hey Siri" and ask a question. If you have an Amazon Echo, say "Alexa" first. These are great starting points because talking feels more natural than typing for many people. You can ask them about the weather, set timers, play music, or ask simple questions.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>AI writing helpers like Grammarly</strong> check your writing and suggest improvements. If you ever write emails, social media posts, or any kind of text, these tools can help you sound more professional and catch spelling mistakes. Many of them work right inside your web browser or email program, so you don't have to learn anything new.
          </p>
          <p style={{ marginBottom: '25px' }}>
            <strong>AI photo tools</strong> can help you edit pictures or even create new ones. Your phone's photo app probably already has some AI features - like automatically improving your photos or organizing them by the people in them. Apps like Canva use AI to help you design things like birthday invitations or social media posts without needing to be a graphic designer.
          </p>

          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>
            How to have your first AI conversation (it's easier than texting!)
          </h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>Start with something simple and friendly.</strong> Instead of jumping into complex requests, try something like "Hi! Can you help me write a thank you note to my neighbor who brought me soup when I was sick?" This gives the AI context and a clear, simple task. Think of it like asking a helpful friend for advice.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Be specific about what you want.</strong> Instead of "help me cook," try "give me a simple recipe for chicken dinner that takes less than 30 minutes." The more details you provide, the better help you'll get. It's like the difference between asking someone "what should I wear?" versus "what should I wear to a casual outdoor wedding in June?"
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Don't worry about perfect grammar or sounding smart.</strong> AI understands normal, everyday language. You can type exactly how you would talk to a friend. "hey can you help me figure out what to say to my teenage daughter about curfew?" works just as well as a perfectly written formal request.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>If you don't like the first answer, just ask again differently.</strong> AI won't get offended or annoyed if you say "that's not quite what I meant, can you try again?" or "make it more casual" or "make it shorter." Think of it like having a conversation where you're clarifying what you need.
          </p>
          <p style={{ marginBottom: '25px' }}>
            <strong>Remember that AI makes mistakes sometimes, just like humans do.</strong> If something doesn't sound right, trust your gut. AI is very helpful, but it's not perfect. Always double-check important information, especially things like medical advice, legal questions, or facts you plan to share with others.
          </p>

          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>
            Simple everyday uses that will blow your mind
          </h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>Writing help for everyday tasks</strong> can save you so much time and stress. Ask AI to help you write emails to your doctor's office, responses to wedding invitations, birthday card messages, or even grocery lists organized by store sections. You can say "help me write a polite email declining my cousin's party invitation" and get a perfectly worded response in seconds.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Planning and organizing</strong> becomes so much easier with AI. Ask it to help you plan a menu for the week, create a packing list for vacation, organize your garage sale items by category, or even plan out your garden. You can say "I want to have a small dinner party for 6 people, help me plan the menu and shopping list" and get a complete plan.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Learning and explaining things</strong> is where AI really shines. If you've ever been confused by technology, recipes, instructions, or just about anything, AI can explain it in simple terms. Try "explain how WiFi works like I'm 10 years old" or "walk me through how to change the time on my car's clock step by step."
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Problem-solving for daily annoyances</strong> can make your life smoother. Ask things like "my houseplant's leaves are turning yellow, what might be wrong?" or "give me ideas for organizing my messy closet on a budget" or "how do I get red wine stains out of my carpet?" AI has been trained on millions of helpful tips and solutions.
          </p>
          <p style={{ marginBottom: '25px' }}>
            <strong>Creative inspiration</strong> when you're stuck can be incredibly helpful. Whether you need gift ideas for a picky teenager, ways to use up leftover chicken, craft projects for a rainy day, or ideas for entertaining visiting grandchildren, AI can generate lists of suggestions you might never have thought of.
          </p>

          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>
            What costs money and what's completely free
          </h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>Many AI tools are completely free to try</strong> and free versions often provide everything most people need. ChatGPT, Google's Gemini, and Microsoft's Copilot all have free versions that let you ask questions, get help with writing, and explore what AI can do. You don't need to pay anything to start learning and using these tools.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Free versions usually have some limits, but they're generous.</strong> You might be able to ask 20-30 questions per day for free, which is plenty for most people just starting out. It's like getting free samples at the grocery store - enough to try everything and see what you like before deciding if you want to buy more.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Paid versions typically cost around $20 per month</strong> and give you more questions, faster responses, and access to newer features. Think of it like the difference between basic cable and premium cable - the free version does most of what you need, but paying gets you extra convenience and features. Most beginners should start with free versions and only consider paying if they find themselves using AI a lot.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Your phone and computer probably already include some AI features for free.</strong> iPhone users have Siri, Android users have Google Assistant, and many email programs now include AI writing help. These built-in features are completely free and don't count against any daily limits since they're part of what you already own.
          </p>
          <p style={{ marginBottom: '25px' }}>
            <strong>Be careful about apps that ask for payment upfront.</strong> Legitimate AI companies offer free trials or free versions. If an app wants your credit card information before you can try anything, that's often a red flag. Stick to well-known names like OpenAI (ChatGPT), Google (Gemini), Microsoft (Copilot), or Anthropic (Claude).
          </p>

          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>
            Safety and privacy (staying smart while using smart tools)
          </h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>Never share personal information like passwords, Social Security numbers, or bank details</strong> with any AI tool. While AI companies work hard to protect your privacy, it's always better to be safe. Think of AI conversations like talking to a helpful stranger - you'd share your recipe questions but not your house key.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Be cautious about sharing private family information or sensitive details.</strong> While it's usually fine to ask for help with general relationship advice or parenting tips, avoid sharing specific names, addresses, or private family situations that you wouldn't want others to know about. Keep conversations general rather than specific.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Remember that AI tools learn from conversations, so avoid sharing anything confidential.</strong> If you're asking for help with work documents, remove any company-specific information first. Instead of "help me write an email about the Johnson account," try "help me write a professional email about a client account."
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>AI can make mistakes, especially with important facts, dates, or current events.</strong> Always double-check information that matters, like medical advice, legal guidance, financial tips, or facts you plan to share with others. Think of AI like getting advice from a smart friend - helpful, but you'd still verify important stuff with an expert.
          </p>
          <p style={{ marginBottom: '25px' }}>
            <strong>Use AI as a starting point, not the final answer.</strong> AI is fantastic for brainstorming, getting started on projects, or overcoming writer's block. But for important decisions about health, money, legal issues, or relationships, always consult with real human experts who understand your specific situation.
          </p>

          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>
            Common fears and why they're mostly overblown
          </h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>"AI will steal my job"</strong> is probably the biggest worry people have, but for most people, AI is more like getting a powerful new tool than getting replaced. Think about how calculators didn't eliminate accountants - they just made them more efficient. AI will likely change how you work, but it's more likely to handle boring tasks so you can focus on interesting, creative, and people-focused work.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>"AI is too complicated for me to understand"</strong> is completely understandable but not true! You don't need to understand how your microwave works to heat up leftovers, and you don't need to understand how AI works to use it. If you can send text messages or use a search engine, you can use AI. The companies building these tools work very hard to make them simple and user-friendly.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>"AI will become too powerful and take over"</strong> is a fear often fueled by science fiction movies. In reality, current AI is more like a very sophisticated autocomplete tool than a thinking robot. It can't make decisions on its own, can't access your computer without permission, and can't do anything you don't specifically ask it to do. You're always in control.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>"AI will make people lazy or stupid"</strong> is like saying calculators make people bad at math. Tools change how we work, but they don't change our need to think, create, and solve problems. AI might help you write emails faster, but you still need to decide what to say and whether it sounds right. It's a productivity tool, not a replacement for your brain.
          </p>
          <p style={{ marginBottom: '25px' }}>
            <strong>"I'm too old to learn this technology"</strong> is never true! Many of the most enthusiastic AI users are retirees who love having a patient, helpful assistant for everything from planning trips to helping with grandchildren's homework. Age brings wisdom and life experience that helps you ask better questions and spot when AI responses don't make sense.
          </p>

          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>
            Your next steps (baby steps are perfectly fine!)
          </h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>Start with just one simple question today.</strong> Go to chat.openai.com or gemini.google.com and ask something easy like "give me three ideas for what to make for dinner tonight" or "help me write a short birthday text to my friend." Don't overthink it - just try one thing and see what happens.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Play around with different types of questions</strong> over the next week. Try asking for help with writing, ask it to explain something you're curious about, or ask for ideas to solve a small problem. The more you experiment, the more you'll discover what AI can help you with in your daily life.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Don't worry about learning everything at once.</strong> You don't need to become an AI expert overnight. Start with the basics, get comfortable with simple conversations, and gradually try new things as you feel ready. It's like learning to drive - you start in empty parking lots before hitting the highway.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Share your experiences with friends and family.</strong> Many people are curious about AI but nervous about trying it. Once you've had some success with simple tasks, you can help others get started too. Teaching someone else is often the best way to solidify your own learning.
          </p>
          <p style={{ marginBottom: '25px' }}>
            <strong>Remember that it's okay to take breaks or go slowly.</strong> Technology can feel overwhelming sometimes, and that's completely normal. Use AI when it feels helpful and ignore it when it doesn't. There's no pressure to use it for everything or to become a power user. Even using it occasionally for simple tasks can make your life a little easier.
          </p>

          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>
            Conclusion
          </h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>You've just learned that AI isn't scary, complicated, or threatening - it's actually a helpful tool that's designed to make your life easier.</strong> Like learning to use a smartphone or send emails, getting comfortable with AI just takes a little practice and patience. The most important thing to remember is that you're in control, you can start small, and there's no rush to become an expert.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>The best part about AI is that it's patient, available 24/7, and never judges your questions.</strong> Whether you're asking for help with technology, cooking, writing, organizing, or just satisfying your curiosity about something, AI is like having a knowledgeable friend who's always ready to help. Start with simple questions, experiment when you feel ready, and don't worry about making mistakes.
          </p>
          <p style={{ marginBottom: '30px' }}>
            <strong>Technology is supposed to serve you, not the other way around.</strong> Use AI when it's helpful, ignore it when it's not, and always trust your own judgment. You've successfully adapted to many technological changes throughout your life, and AI is just another tool that can make certain tasks easier and more enjoyable. Welcome to the world of AI - it's excited to meet you!
          </p>
        </div>
      </div>
    </div>
  );
}

const LearnLevelSelector = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const [showAIForDummiesGuide, setShowAIForDummiesGuide] = useState(false);
  const [showAIStarterGuide, setShowAIStarterGuide] = useState(false);
  const [showIntermediateGuide, setShowIntermediateGuide] = useState(false);
  const [showAdvancedGuide, setShowAdvancedGuide] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1030);
      setScreenWidth(width);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // iPhone breakpoint helpers
  const is360px = screenWidth >= 360 && screenWidth < 390;
  const is390px = screenWidth >= 390 && screenWidth < 430;
  const isVerySmall = screenWidth < 360; // 320px devices

  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'Start here with the basics',
      features: [
        'AI basics and terminology',
        'ChatGPT and Claude introduction',
        'Simple use cases and examples',
        'Free tools and resources',
        'Basic quiz to test knowledge'
      ],
      badge: '🎯',
      color: '#36ff95',
      gradient: 'linear-gradient(135deg, #36ff95, #0bbfdb)',
      difficulty: 'Easy'
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'Ready to dive deeper into AI applications',
      features: [
        'Advanced AI concepts and strategies',
        'Workflow automation techniques',
        'Business integration methods',
        'Performance optimization tips',
        'Intermediate quiz with practical scenarios'
      ],
      badge: '🚀',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
      difficulty: 'Medium'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Master AI and earn Pro status',
      features: [
        'Enterprise AI implementation',
        'Custom AI model development',
        'Advanced automation strategies',
        'AI ethics and best practices',
        'Advanced quiz for Pro certification'
      ],
      badge: '👑',
      color: '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #ffb347)',
      difficulty: 'Hard'
    }
  ];

  const handleLevelSelect = (levelId) => {
    navigate(`/learn/${levelId}`);
  };

  return (
    <div>
      <Helmet>
        <title>Choose Your AI Learning Path | BetterAiBots.com</title>
        <meta name="description" content="Select your AI learning level: Beginner, Intermediate, or Advanced. Start your journey to AI mastery with our structured learning paths." />
        <meta name="keywords" content="AI learning, AI education, AI courses, AI training, artificial intelligence learning, AI beginner, AI intermediate, AI advanced, AI certification" />
        <meta property="og:title" content="Choose Your AI Learning Path | BetterAiBots.com" />
        <meta property="og:description" content="Select your AI learning level and start your journey to AI mastery with our structured learning paths." />
        <meta property="og:url" content="https://betteraibots.com/learn" />
        <link rel="canonical" href="https://betteraibots.com/learn" />
      </Helmet>

      <div className="learn-page-shell" style={{
        padding: isVerySmall ? '12px 8px' : (is360px ? '14px 10px' : (is390px ? '16px 12px' : (isMobile ? '16px 12px' : '20px'))),
        paddingBottom: '0',
        minHeight: 'calc(100vh - 150px)',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          marginTop: '0',
          marginRight: 'auto',
          marginBottom: '0',
          marginLeft: 'auto',
          padding: isVerySmall ? '20px 8px' : (is360px ? '25px 10px' : (is390px ? '30px 12px' : (isMobile ? '30px 12px' : '40px 20px'))),
          paddingBottom: '0',
          boxSizing: 'border-box',
          width: '100%'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: isVerySmall ? '30px' : (is360px ? '35px' : (is390px ? '40px' : (isMobile ? '45px' : '60px')))
          }}>
            <h1 style={{
              fontSize: isVerySmall ? '1.5rem' : (is360px ? '1.75rem' : (is390px ? '2rem' : (isMobile ? '2.25rem' : '3rem'))),
              fontWeight: '800',
              marginBottom: isVerySmall ? '12px' : (is360px ? '14px' : (is390px ? '16px' : '20px')),
              background: 'linear-gradient(45deg, #36ff95, #0bbfdb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.2',
              padding: isVerySmall ? '0 4px' : '0'
            }}>
              Choose Your AI Learning Path
            </h1>
          </div>

          {/* Level Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isVerySmall ? '8px' : (is360px ? '10px' : (is390px ? '12px' : (isMobile ? '12px' : '20px'))),
            marginBottom: '5px',
            justifyContent: 'center',
            maxWidth: isMobile ? '100%' : '1200px',
            margin: '0 auto',
            padding: isVerySmall ? '0 8px' : (is360px ? '0 10px' : (is390px ? '0 12px' : (isMobile ? '0 12px' : '0'))),
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {levels.map((level) => (
              <div
                key={level.id}
                className="learn-level-card"
                onClick={() => handleLevelSelect(level.id)}
                style={{
                  border: `2px solid ${level.color}40`,
                  borderRadius: '20px',
                  padding: isVerySmall ? '12px' : (is360px ? '14px' : (is390px ? '16px' : (isMobile ? '16px' : '20px'))),
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  aspectRatio: '1 / 1',
                  maxWidth: '370px',
                  maxHeight: '370px',
                  width: '100%',
                  height: 'auto',
                  margin: '0 auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = `${level.color}80`;
                  e.currentTarget.style.boxShadow = `0 20px 40px ${level.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `${level.color}40`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Content Container - Flex to fill space */}
                                 <div style={{
                  flex: '1', 
                   display: 'flex',
                  flexDirection: 'column', 
                   alignItems: 'center',
                   justifyContent: 'center',
                  width: '100%',
                  overflow: 'hidden'
                }}>
                  {/* Badge - Responsive with locked aspect ratio */}
                  <div
                    className="learn-level-badge-wrap"
                    style={{
                      marginBottom: isVerySmall ? '8px' : (is360px ? '10px' : (is390px ? '12px' : (isMobile ? '12px' : '15px'))),
                      width: isVerySmall ? '80px' : (is360px ? '90px' : (is390px ? '100px' : (isMobile ? '110px' : '140px')))
                    }}
                  >
                  <img 
                    className="learn-level-badge"
                    src={level.id === 'beginner' ? '/beginnerbadge.webp' : level.id === 'intermediate' ? '/intermediatebadge.webp' : '/advancedbadge.webp'}
                    alt={`${level.title} badge`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                  {/* Title and Difficulty */}
                  <div style={{
                    textAlign: 'center',
                    marginBottom: isVerySmall ? '6px' : (is360px ? '8px' : (is390px ? '10px' : (isMobile ? '10px' : '12px'))),
                    width: '100%'
                  }}>
                    <h2 style={{
                      fontSize: isVerySmall ? '0.9rem' : (is360px ? '1rem' : (is390px ? '1.1rem' : (isMobile ? '1.2rem' : '1.4rem'))),
                      fontWeight: '700',
                      margin: '0 0 4px 0',
                      color: level.color,
                      lineHeight: '1.2'
                    }}>
                      {level.title}
                    </h2>
                    <span style={{
                      background: level.gradient,
                      color: level.id === 'advanced' ? '#1a2330' : 'white',
                      padding: isVerySmall ? '3px 8px' : (is360px ? '4px 10px' : (is390px ? '4px 12px' : (isMobile ? '5px 14px' : '6px 16px'))),
                      borderRadius: '20px',
                      fontSize: isVerySmall ? '0.65rem' : (is360px ? '0.7rem' : (is390px ? '0.75rem' : (isMobile ? '0.8rem' : '0.9rem'))),
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      {level.difficulty}
                    </span>
                  </div>

                  {/* Description - Scales down on small screens */}
                  <p style={{
                    color: '#9ca3af',
                    fontSize: isVerySmall ? '0.7rem' : (is360px ? '0.75rem' : (is390px ? '0.8rem' : (isMobile ? '0.85rem' : '0.95rem'))),
                    lineHeight: '1.4',
                    marginBottom: isVerySmall ? '6px' : (is360px ? '8px' : (is390px ? '10px' : (isMobile ? '10px' : '12px'))),
                    textAlign: 'center',
                    padding: '0 4px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {level.description}
                  </p>
                </div>

                {/* CTA Button - Scales with card */}
                <button style={{
                  width: '100%',
                  background: level.gradient,
                  color: level.id === 'advanced' ? '#1a2330' : 'white',
                  border: 'none',
                  padding: isVerySmall ? '8px 12px' : (is360px ? '9px 14px' : (is390px ? '10px 16px' : (isMobile ? '10px 18px' : '12px 24px'))),
                  borderRadius: '12px',
                  fontSize: isVerySmall ? '0.75rem' : (is360px ? '0.8rem' : (is390px ? '0.85rem' : (isMobile ? '0.9rem' : '1rem'))),
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: 'auto',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 10px 20px ${level.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  Start {level.title} Path
                </button>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div style={{
            textAlign: 'center',
            padding: isVerySmall ? '20px 12px' : (is360px ? '22px 14px' : (is390px ? '25px 16px' : '30px')),
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            border: '1px solid rgba(54, 255, 149, 0.2)',
            marginBottom: isVerySmall ? '25px' : (is360px ? '22px' : (isMobile ? '20px' : '0')),
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <h3 style={{
              color: '#36ff95',
              fontSize: '1.3rem',
              marginBottom: '15px',
              fontWeight: '600'
            }}>
              🎯 Progression System
            </h3>
            <p style={{
              color: '#9ca3af',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Complete each level's quiz to unlock the next tier. Advanced users who pass the final quiz earn <strong style={{ color: '#ffd700' }}>Pro status</strong> and access to exclusive content.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#9ca3af',
                fontSize: '0.9rem'
              }}>
                <span style={{ color: '#36ff95' }}>✓</span>
                Free access to all levels
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#9ca3af',
                fontSize: '0.9rem'
              }}>
                <span style={{ color: '#36ff95' }}>✓</span>
                Self-paced learning
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#9ca3af',
                fontSize: '0.9rem'
              }}>
                <span style={{ color: '#36ff95' }}>✓</span>
                Practical examples
              </div>
            </div>
          </div>

          {/* GUIDES SECTION */}
          <div style={{
            marginTop: isVerySmall ? "30px" : (is360px ? "25px" : (isMobile ? "30px" : "40px")),
            marginBottom: isMobile ? "20px" : "40px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: isVerySmall ? "0 8px" : (is360px ? "0 10px" : (is390px ? "0 12px" : "0")),
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1
          }}>
            <h2 className="learn-section-title" style={{ 
              textAlign: "center", 
              fontSize: isVerySmall ? "1.1rem" : (is360px ? "1.15rem" : (isMobile ? "1.2rem" : "1.4rem")), 
              fontWeight: 600, 
              marginTop: isVerySmall ? "8px" : (is360px ? "6px" : "0"),
              marginBottom: isVerySmall ? "12px" : (isMobile ? "15px" : "30px"),
              width: "100%",
              position: "relative",
              zIndex: 2
            }}>
              AI Guides
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: isVerySmall ? "8px" : (is360px ? "10px" : (is390px ? "12px" : (isMobile ? "12px" : "16px"))),
              maxWidth: isMobile ? "100%" : "1200px",
              margin: "0 auto",
              padding: isVerySmall ? "0 4px" : (is360px ? "0 6px" : (is390px ? "0 8px" : (isMobile ? "0 8px" : "0 40px"))),
              justifyItems: "stretch",
              alignItems: "stretch",
              width: "100%",
              boxSizing: "border-box"
            }}>
              {/* AI for Dummies Guide */}
              <div 
                onClick={() => setShowAIForDummiesGuide(true)}
                style={{
                  cursor: 'pointer',
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s ease-in-out",
                  width: "100%",
                  height: "100%",
                  margin: isVerySmall ? "4px" : (is360px ? "5px" : (is390px ? "6px" : (isMobile ? "6px" : "8px")))
                }}
                onMouseOver={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseOut={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div 
                  style={{
                    background: "var(--surface-card)",
                    borderRadius: "16px",
                    padding: isVerySmall ? "12px" : (is360px ? "14px" : (is390px ? "16px" : (isMobile ? "16px" : "20px"))),
                    textAlign: "center",
                    border: "1px solid var(--border-accent-soft)",
                    boxShadow: "0 4px 16px var(--shadow-card)",
                    height: isMobile ? "auto" : "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: isMobile ? "flex-start" : "space-between",
                    minHeight: isMobile ? "auto" : "auto",
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "border 0.3s ease, box-shadow 0.3s ease"
                  }}
                  className="guide-card-neon neon-pulse-card"
                  onMouseEnter={e => {
                    if (!isMobile && document.documentElement.getAttribute('data-theme') !== 'light') {
                      e.currentTarget.style.border = "1px solid var(--border-accent)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isMobile && document.documentElement.getAttribute('data-theme') !== 'light') {
                      e.currentTarget.style.border = "1px solid var(--border-accent-soft)";
                    }
                  }}
                >
                  <div style={{ 
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                    flex: isMobile ? "0 1 auto" : "1",
                    width: "100%",
                    gap: isMobile ? "10px" : "0"
                  }}>
                    <div className="learn-guide-card__icon-frame" style={{
                      borderRadius: "12px",
                      padding: isVerySmall ? "4px" : (is360px ? "5px" : (is390px ? "6px" : (isMobile ? "6px" : "8px"))),
                      aspectRatio: "1 / 1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isVerySmall ? "58px" : (is360px ? "70px" : (is390px ? "82px" : (isMobile ? "92px" : "126px"))),
                      height: "auto",
                      boxSizing: "border-box",
                      flexShrink: 0,
                      marginBottom: isMobile ? "0" : (isVerySmall ? "6px" : (is360px ? "8px" : (is390px ? "10px" : "12px")))
                }}>
                  <img
                    src="/aifordummies.png"
                    alt="AI for Dummies Guide"
                    style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "1 / 1",
                      objectFit: "contain",
                          borderRadius: "8px"
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                    </div>
                  <h3 className="learn-guide-card__title" style={{
                      fontSize: isVerySmall ? "0.75rem" : (is360px ? "0.8rem" : (is390px ? "0.85rem" : (isMobile ? "0.9rem" : "1.1rem"))),
                    fontWeight: 600,
                      margin: "0 0 4px 0",
                      lineHeight: "1.2"
                  }}>
                    AI for Dummies
                  </h3>
                  <p className="learn-guide-card__desc" style={{
                      fontSize: isVerySmall ? "0.65rem" : (is360px ? "0.7rem" : (is390px ? "0.75rem" : (isMobile ? "0.8rem" : "0.9rem"))),
                      margin: "0",
                      lineHeight: "1.4",
                      textAlign: "center",
                      width: "100%"
                  }}>
                    Super simple guide to getting started with AI
                  </p>
                  </div>
                </div>
              </div>

              {/* Beginner Guide */}
              <div 
                onClick={() => navigate('/learn/beginner')}
                style={{
                  cursor: 'pointer',
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s ease-in-out",
                  width: "100%",
                  height: "100%",
                  margin: isVerySmall ? "4px" : (is360px ? "5px" : (is390px ? "6px" : (isMobile ? "6px" : "8px")))
                }}
                onMouseOver={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseOut={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div 
                  style={{
                    background: "var(--surface-card)",
                    borderRadius: "16px",
                    padding: isVerySmall ? "12px" : (is360px ? "14px" : (is390px ? "16px" : (isMobile ? "16px" : "20px"))),
                    textAlign: "center",
                    border: "1px solid var(--border-accent-soft)",
                    boxShadow: "0 4px 16px var(--shadow-card)",
                    height: isMobile ? "auto" : "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: isMobile ? "flex-start" : "space-between",
                    minHeight: isMobile ? "auto" : "auto",
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "border 0.3s ease, box-shadow 0.3s ease"
                  }}
                  className="guide-card-neon neon-pulse-card"
                  onMouseEnter={e => {
                    if (!isMobile && document.documentElement.getAttribute('data-theme') !== 'light') {
                      e.currentTarget.style.border = "1px solid var(--border-accent)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isMobile && document.documentElement.getAttribute('data-theme') !== 'light') {
                      e.currentTarget.style.border = "1px solid var(--border-accent-soft)";
                    }
                  }}
                >
                  <div style={{ 
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                    flex: isMobile ? "0 1 auto" : "1",
                    width: "100%",
                    gap: isMobile ? "10px" : "0"
                  }}>
                    <div className="learn-guide-card__icon-frame" style={{
                      borderRadius: "12px",
                      padding: isVerySmall ? "4px" : (is360px ? "5px" : (is390px ? "6px" : (isMobile ? "6px" : "8px"))),
                      aspectRatio: "1 / 1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isVerySmall ? "58px" : (is360px ? "70px" : (is390px ? "82px" : (isMobile ? "92px" : "126px"))),
                      height: "auto",
                      boxSizing: "border-box",
                      flexShrink: 0,
                      marginBottom: isMobile ? "0" : (isVerySmall ? "6px" : (is360px ? "8px" : (is390px ? "10px" : "12px")))
                }}>
                  <img
                    src="/begguide.png"
                    alt="Beginner AI Guide"
                    style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "1 / 1",
                      objectFit: "contain",
                          borderRadius: "8px"
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                    </div>
                  <h3 className="learn-guide-card__title" style={{
                      fontSize: isVerySmall ? "0.75rem" : (is360px ? "0.8rem" : (is390px ? "0.85rem" : (isMobile ? "0.9rem" : "1.1rem"))),
                    fontWeight: 600,
                      margin: "0 0 4px 0",
                      lineHeight: "1.2"
                  }}>
                    Beginner Guide
                  </h3>
                  <p className="learn-guide-card__desc" style={{
                      fontSize: isVerySmall ? "0.65rem" : (is360px ? "0.7rem" : (is390px ? "0.75rem" : (isMobile ? "0.8rem" : "0.9rem"))),
                      margin: "0",
                      lineHeight: "1.4",
                      textAlign: "center",
                      width: "100%"
                  }}>
                    Master the fundamentals of AI
                  </p>
                  </div>
                </div>
              </div>

              {/* Intermediate Guide */}
              <div 
                onClick={() => navigate('/learn/intermediate')}
                style={{
                  cursor: 'pointer',
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s ease-in-out",
                  width: "100%",
                  height: "100%",
                  margin: isVerySmall ? "4px" : (is360px ? "5px" : (is390px ? "6px" : (isMobile ? "6px" : "8px")))
                }}
                onMouseOver={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseOut={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div 
                  style={{
                    background: "var(--surface-card)",
                    borderRadius: "16px",
                    padding: isVerySmall ? "12px" : (is360px ? "14px" : (is390px ? "16px" : (isMobile ? "16px" : "20px"))),
                    textAlign: "center",
                    border: "1px solid var(--border-accent-soft)",
                    boxShadow: "0 4px 16px var(--shadow-card)",
                    height: isMobile ? "auto" : "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: isMobile ? "flex-start" : "space-between",
                    minHeight: isMobile ? "auto" : "auto",
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "border 0.3s ease, box-shadow 0.3s ease"
                  }}
                  className="guide-card-neon neon-pulse-card"
                  onMouseEnter={e => {
                    if (!isMobile && document.documentElement.getAttribute('data-theme') !== 'light') {
                      e.currentTarget.style.border = "1px solid var(--border-accent)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isMobile && document.documentElement.getAttribute('data-theme') !== 'light') {
                      e.currentTarget.style.border = "1px solid var(--border-accent-soft)";
                    }
                  }}
                >
                  <div style={{ 
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                    flex: isMobile ? "0 1 auto" : "1",
                    width: "100%",
                    gap: isMobile ? "10px" : "0"
                  }}>
                    <div className="learn-guide-card__icon-frame" style={{
                      borderRadius: "12px",
                      padding: isVerySmall ? "4px" : (is360px ? "5px" : (is390px ? "6px" : (isMobile ? "6px" : "8px"))),
                      aspectRatio: "1 / 1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isVerySmall ? "58px" : (is360px ? "70px" : (is390px ? "82px" : (isMobile ? "92px" : "126px"))),
                      height: "auto",
                      boxSizing: "border-box",
                      flexShrink: 0,
                      marginBottom: isMobile ? "0" : (isVerySmall ? "6px" : (is360px ? "8px" : (is390px ? "10px" : "12px")))
                }}>
                  <img
                    src="/intguide.png"
                    alt="Intermediate AI Guide"
                    style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "1 / 1",
                      objectFit: "contain",
                          borderRadius: "8px"
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                    </div>
                  <h3 className="learn-guide-card__title" style={{
                      fontSize: isVerySmall ? "0.75rem" : (is360px ? "0.8rem" : (is390px ? "0.85rem" : (isMobile ? "0.9rem" : "1.1rem"))),
                    fontWeight: 600,
                      margin: "0 0 4px 0",
                      lineHeight: "1.2"
                  }}>
                    Intermediate Guide
                  </h3>
                  <p className="learn-guide-card__desc" style={{
                      fontSize: isVerySmall ? "0.65rem" : (is360px ? "0.7rem" : (is390px ? "0.75rem" : (isMobile ? "0.8rem" : "0.9rem"))),
                      margin: "0",
                      lineHeight: "1.4",
                      textAlign: "center",
                      width: "100%"
                  }}>
                    Dive deeper into AI applications
                  </p>
                  </div>
                </div>
              </div>

              {/* Advanced Guide */}
              <div 
                onClick={() => navigate('/learn/advanced')}
                style={{
                  cursor: 'pointer',
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s ease-in-out",
                  width: "100%",
                  height: "100%",
                  margin: isVerySmall ? "4px" : (is360px ? "5px" : (is390px ? "6px" : (isMobile ? "6px" : "8px")))
                }}
                onMouseOver={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseOut={e => { if (!isMobile) e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div 
                  style={{
                    background: "var(--surface-card)",
                    borderRadius: "16px",
                    padding: isVerySmall ? "12px" : (is360px ? "14px" : (is390px ? "16px" : (isMobile ? "16px" : "20px"))),
                    textAlign: "center",
                    border: "1px solid var(--border-accent-soft)",
                    boxShadow: "0 4px 16px var(--shadow-card)",
                    height: isMobile ? "auto" : "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: isMobile ? "flex-start" : "space-between",
                    minHeight: isMobile ? "auto" : "auto",
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "border 0.3s ease, box-shadow 0.3s ease"
                  }}
                  className="guide-card-neon neon-pulse-card"
                  onMouseEnter={e => {
                    if (!isMobile && document.documentElement.getAttribute('data-theme') !== 'light') {
                      e.currentTarget.style.border = "1px solid var(--border-accent)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isMobile && document.documentElement.getAttribute('data-theme') !== 'light') {
                      e.currentTarget.style.border = "1px solid var(--border-accent-soft)";
                    }
                  }}
                >
                  <div style={{ 
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                    flex: isMobile ? "0 1 auto" : "1",
                    width: "100%",
                    gap: isMobile ? "10px" : "0"
                  }}>
                    <div className="learn-guide-card__icon-frame" style={{
                      borderRadius: "12px",
                      padding: isVerySmall ? "4px" : (is360px ? "5px" : (is390px ? "6px" : (isMobile ? "6px" : "8px"))),
                      aspectRatio: "1 / 1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isVerySmall ? "58px" : (is360px ? "70px" : (is390px ? "82px" : (isMobile ? "92px" : "126px"))),
                      height: "auto",
                      boxSizing: "border-box",
                      flexShrink: 0,
                      marginBottom: isMobile ? "0" : (isVerySmall ? "6px" : (is360px ? "8px" : (is390px ? "10px" : "12px")))
                }}>
                  <img
                    src="/advguide.png"
                    alt="Advanced AI Guide"
                    style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "1 / 1",
                      objectFit: "contain",
                          borderRadius: "8px"
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                    </div>
                  <h3 className="learn-guide-card__title" style={{
                      fontSize: isVerySmall ? "0.75rem" : (is360px ? "0.8rem" : (is390px ? "0.85rem" : (isMobile ? "0.9rem" : "1.1rem"))),
                    fontWeight: 600,
                      margin: "0 0 4px 0",
                      lineHeight: "1.2"
                  }}>
                    Advanced Guide
                  </h3>
                  <p style={{
                    color: "#b2ffe0",
                      fontSize: isVerySmall ? "0.65rem" : (is360px ? "0.7rem" : (is390px ? "0.75rem" : (isMobile ? "0.8rem" : "0.9rem"))),
                      margin: "0",
                      lineHeight: "1.4",
                      textAlign: "center",
                      width: "100%"
                    }}>
                      Earn your AI Pro status badge!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* APP SPOTLIGHT SECTION */}
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
             <h2 className="learn-section-title" style={{ 
               textAlign: "center", 
               fontSize: isVerySmall ? "1.2rem" : (is360px ? "1.25rem" : (is390px ? "1.3rem" : "1.4rem")), 
               fontWeight: 600, 
               marginTop: "0",
               marginBottom: isVerySmall ? "20px" : (is360px ? "22px" : (is390px ? "25px" : "30px")),
               width: "100%"
             }}>
               App Spotlight
             </h2>
             
            {/* App Spotlight Cards Grid */}
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
                               {/* Flowith.io Card */}
                <div className="spotlight-card"
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
                     <img
                       src="/flowith.jpg"
                       alt="Flowith.io - AI Workspace Platform"
                       className="spotlight-card__img"
                       style={{
                         width: "200px",
                         height: "200px",
                       }}
                       onError={(e) => {
                         e.target.style.display = 'none';
                       }}
                     />
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
                       <h3 className="spotlight-card__title" style={{
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         Flowith.io
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • AI Workspace
                       </p>
                       <p className="spotlight-card__desc" style={{
                         fontSize: isMobile ? "0.85rem" : "0.95rem",
                         lineHeight: 1.5,
                         margin: "0 0 15px 0"
                       }}>
                         Revolutionary AI canvas workspace that goes beyond traditional chatbots. Interact with multiple AI models simultaneously, create visual workflows, and organize complex projects on an infinite canvas.
                       </p>
                       <div style={{
                         display: "flex",
                         gap: "8px",
                         flexWrap: "wrap",
                         marginBottom: "20px"
                       }}>
                         <span className="spotlight-card__badge">
                           Infinite Canvas
                         </span>
                         <span className="spotlight-card__badge">
                           Multi-AI Models
                         </span>
                         <span className="spotlight-card__badge">
                           Agent Neo
                         </span>
                       </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://aff.flowith.io/52dtlja1b580"
                         target="_blank"
                         rel="noopener noreferrer"
                         style={{
                           background: "linear-gradient(135deg, #36ff95 0%, #00d4aa 100%)",
                           color: "#000",
                           padding: "12px 24px",
                           borderRadius: "8px",
                           textDecoration: "none",
                           fontWeight: 600,
                           fontSize: "0.9rem",
                           transition: "all 0.2s ease",
                           boxShadow: "0 4px 12px rgba(54, 255, 149, 0.3)"
                         }}
                         onMouseOver={e => {
                           e.target.style.transform = "translateY(-2px)";
                           e.target.style.boxShadow = "0 6px 16px rgba(54, 255, 149, 0.4)";
                         }}
                         onMouseOut={e => {
                           e.target.style.transform = "translateY(0)";
                           e.target.style.boxShadow = "0 4px 12px rgba(54, 255, 149, 0.3)";
                         }}
                       >
                         Try Flowith.io Free
                       </a>
                <Link
                  to="/learn/flowith-io"
                         style={{
                           background: "transparent",
                           color: "#36ff95",
                           padding: "12px 24px",
                           borderRadius: "8px",
                           textDecoration: "none",
                           fontWeight: 600,
                           fontSize: "0.9rem",
                           border: "2px solid #36ff95",
                           transition: "all 0.2s ease"
                         }}
                         onMouseOver={e => {
                           e.target.style.background = "rgba(54, 255, 149, 0.1)";
                           e.target.style.transform = "translateY(-2px)";
                         }}
                         onMouseOut={e => {
                           e.target.style.background = "transparent";
                           e.target.style.transform = "translateY(0)";
                         }}
                       >
                         Read Full Article
                       </Link>
                     </div>
                   </div>
               </div>

                               {/* Blackbox.ai Card */}
                <div className="spotlight-card"
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
                     <img
                       src={blackboxai}
                       alt="Blackbox.ai - AI Code Assistant"
                       className="spotlight-card__img"
                       style={{
                         width: "200px",
                         height: "200px",
                       }}
                       onError={(e) => {
                         e.target.style.display = 'none';
                       }}
                     />
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
                       <h3 className="spotlight-card__title" style={{
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         Blackbox.ai
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • Development & Coding
                       </p>
                       <p className="spotlight-card__desc" style={{
                         fontSize: isMobile ? "0.85rem" : "0.95rem",
                         lineHeight: 1.5,
                         margin: "0 0 15px 0"
                       }}>
                         AI-powered code assistant that helps developers write code faster with real-time autocomplete and intelligent suggestions.
                       </p>
                       <div style={{
                         display: "flex",
                         gap: "8px",
                         flexWrap: "wrap",
                         marginBottom: "20px"
                       }}>
                         <span className="spotlight-card__badge">
                           AI Code Completion
                         </span>
                         <span className="spotlight-card__badge">
                           Multi-Language
                         </span>
                         <span className="spotlight-card__badge">
                           Real-Time Autocomplete
                         </span>
                       </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://blackboxai.partnerlinks.io/BAIB"
                         target="_blank"
                         rel="noopener noreferrer"
                         style={{
                           background: "linear-gradient(135deg, #36ff95 0%, #00d4aa 100%)",
                           color: "#000",
                           padding: "12px 24px",
                           borderRadius: "8px",
                           textDecoration: "none",
                           fontWeight: 600,
                           fontSize: "0.9rem",
                           transition: "all 0.2s ease",
                           boxShadow: "0 4px 12px rgba(54, 255, 149, 0.3)"
                         }}
                         onMouseOver={e => {
                           e.target.style.transform = "translateY(-2px)";
                           e.target.style.boxShadow = "0 6px 16px rgba(54, 255, 149, 0.4)";
                         }}
                         onMouseOut={e => {
                           e.target.style.transform = "translateY(0)";
                           e.target.style.boxShadow = "0 4px 12px rgba(54, 255, 149, 0.3)";
                         }}
                       >
                         Try Blackbox.ai Free
                       </a>
                       <Link
                         to="/learn/blackbox-ai"
                         style={{
                           background: "transparent",
                           color: "#36ff95",
                           padding: "12px 24px",
                           borderRadius: "8px",
                           textDecoration: "none",
                           fontWeight: 600,
                           fontSize: "0.9rem",
                           border: "2px solid #36ff95",
                           transition: "all 0.2s ease"
                         }}
                         onMouseOver={e => {
                           e.target.style.background = "rgba(54, 255, 149, 0.1)";
                           e.target.style.transform = "translateY(-2px)";
                         }}
                         onMouseOut={e => {
                           e.target.style.background = "transparent";
                           e.target.style.transform = "translateY(0)";
                         }}
                       >
                         Read Full Article
                       </Link>
                     </div>
                   </div>
               </div>

                               {/* MuseIt Card */}
                <div className="spotlight-card"
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
                      <img
                       src={musebrand}
                       alt="MuseIt - AI Art Creation Platform"
                       className="spotlight-card__img"
                       style={{
                         width: "200px",
                         height: "200px",
                       }}
                       onError={(e) => {
                         e.target.style.display = 'none';
                       }}
                     />
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
                       <h3 className="spotlight-card__title" style={{
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         MuseIt
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • Creative & Design
                       </p>
                       <p className="spotlight-card__desc" style={{
                         fontSize: isMobile ? "0.85rem" : "0.95rem",
                         lineHeight: 1.5,
                         margin: "0 0 15px 0"
                       }}>
                         AI-powered art creation platform that turns your imagination into beautiful artwork. Turn the noise into art with guided creativity and mindfulness-focused design.
                       </p>
                       <div style={{
                         display: "flex",
                         gap: "8px",
                         flexWrap: "wrap",
                         marginBottom: "20px"
                       }}>
                         <span className="spotlight-card__badge">
                           AI Art Generation
                         </span>
                         <span className="spotlight-card__badge">
                           Gallery-Ready Quality
                         </span>
                         <span className="spotlight-card__badge">
                           No Technical Skills
                         </span>
                       </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://Museit.art"
                         target="_blank"
                         rel="noopener noreferrer"
                         style={{
                           background: "linear-gradient(135deg, #36ff95 0%, #00d4aa 100%)",
                           color: "#000",
                           padding: "12px 24px",
                           borderRadius: "8px",
                           textDecoration: "none",
                           fontWeight: 600,
                           fontSize: "0.9rem",
                           transition: "all 0.2s ease",
                           boxShadow: "0 4px 12px rgba(54, 255, 149, 0.3)"
                         }}
                         onMouseOver={e => {
                           e.target.style.transform = "translateY(-2px)";
                           e.target.style.boxShadow = "0 6px 16px rgba(54, 255, 149, 0.4)";
                         }}
                         onMouseOut={e => {
                           e.target.style.transform = "translateY(0)";
                           e.target.style.boxShadow = "0 4px 12px rgba(54, 255, 149, 0.3)";
                         }}
                       >
                         Try MuseIt Free
                       </a>
                       <Link
                         to="/learn/museit-art-complete-guide"
                         style={{
                           background: "transparent",
                           color: "#36ff95",
                           padding: "12px 24px",
                           borderRadius: "8px",
                           textDecoration: "none",
                           fontWeight: 600,
                           fontSize: "0.9rem",
                           border: "2px solid #36ff95",
                           transition: "all 0.2s ease"
                         }}
                         onMouseOver={e => {
                           e.target.style.background = "rgba(54, 255, 149, 0.1)";
                           e.target.style.transform = "translateY(-2px)";
                         }}
                         onMouseOut={e => {
                           e.target.style.background = "transparent";
                           e.target.style.transform = "translateY(0)";
                         }}
                       >
                         Read Full Article
                       </Link>
                     </div>
                   </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Guide Modals */}
      {showAIForDummiesGuide && (
        <AIForDummiesGuide onClose={() => setShowAIForDummiesGuide(false)} />
      )}
      {showAIStarterGuide && (
        <div onClick={() => setShowAIStarterGuide(false)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
            border: '2px solid #36ff95',
            borderRadius: '20px',
            maxWidth: '900px',
            maxHeight: '90vh',
            width: '100%',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(54, 255, 149, 0.3)',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}
          className="custom-scrollbar">
            <button onClick={() => setShowAIStarterGuide(false)} style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#36ff95',
              fontSize: '24px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>✕</button>
            <h1 style={{ color: '#36ff95', fontSize: '2rem', marginBottom: '20px' }}>Beginner Guide</h1>
            <p style={{ marginBottom: '20px' }}>Click below to view the full beginner guide.</p>
            <button onClick={() => {
              setShowAIStarterGuide(false);
              navigate('/learn/beginner');
            }} style={{
              background: 'linear-gradient(135deg, #36ff95, #0bbfdb)',
              color: '#101c26',
              border: 'none',
              borderRadius: '25px',
              padding: '15px 40px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginTop: '20px'
            }}>
              View Beginner Guide
            </button>
          </div>
        </div>
      )}
      {showIntermediateGuide && (
        <div onClick={() => setShowIntermediateGuide(false)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
            border: '2px solid #8b5cf6',
            borderRadius: '20px',
            maxWidth: '900px',
            maxHeight: '90vh',
            width: '100%',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(20, 184, 166, 0.3)',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}
          className="custom-scrollbar">
            <button onClick={() => setShowIntermediateGuide(false)} style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#8b5cf6',
              fontSize: '24px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>✕</button>
            <h1 style={{ color: '#8b5cf6', fontSize: '2rem', marginBottom: '20px' }}>Intermediate Guide</h1>
            <p style={{ marginBottom: '20px' }}>Click below to view the full intermediate guide.</p>
            <button onClick={() => {
              setShowIntermediateGuide(false);
              navigate('/learn/intermediate');
            }} style={{
              background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '25px',
              padding: '15px 40px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginTop: '20px'
            }}>
              View Intermediate Guide
            </button>
          </div>
        </div>
      )}
      {showAdvancedGuide && (
        <div onClick={() => setShowAdvancedGuide(false)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
            border: '2px solid #ffd700',
            borderRadius: '20px',
            maxWidth: '900px',
            maxHeight: '90vh',
            width: '100%',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
            padding: '40px',
            textAlign: 'center',
            color: '#ffffff'
          }}
          className="custom-scrollbar">
            <button onClick={() => setShowAdvancedGuide(false)} style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#ffd700',
              fontSize: '24px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>✕</button>
            <h1 style={{ color: '#ffd700', fontSize: '2rem', marginBottom: '20px' }}>Advanced Guide</h1>
            <p style={{ marginBottom: '20px' }}>Click below to view the full advanced guide.</p>
            <button onClick={() => {
              setShowAdvancedGuide(false);
              navigate('/learn/advanced');
            }} style={{
              background: 'linear-gradient(135deg, #ffd700, #ffb347)',
              color: '#000000',
              border: 'none',
              borderRadius: '25px',
              padding: '15px 40px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginTop: '20px'
            }}>
              View Advanced Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnLevelSelector; 
