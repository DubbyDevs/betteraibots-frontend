import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articles } from "./Articles";
import ReactMarkdown from "react-markdown";

function ShareButtons({ url, title }) {
  // Copy link handler
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
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
  const article = articles.find(a => a.id === id);

  const ScholarGPTHeading = ({ level, children, ...props }) => {
    if (
      article.id === 'scholar-gpt' &&
      level === 2 &&
      typeof children[0] === 'string' &&
      children[0].trim().toLowerCase() === 'how it works'
    ) {
      return (
        <>
          <h2 {...props} style={{ color: '#36ff95', fontWeight: 700, margin: '32px 0 12px 0', fontSize: '1.4rem', letterSpacing: 0.1 }}>{children}</h2>
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
    return <Tag {...props} style={{ color: '#36ff95', fontWeight: 700, margin: '32px 0 12px 0', fontSize: '1.4rem', letterSpacing: 0.1 }}>{children}</Tag>;
  };

  if (!article) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>BetterAiBots Article Not Found</h2>
        <Link to="/learn" style={{ color: "#0bbfdb" }}>Back to Learn</Link>
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
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.preview} />
        <link rel="canonical" href={`https://betteraibots.com/learn/${article.id}`} />
        <meta property="og:image" content={(() => {
          // Article-specific Open Graph images for better social sharing
          const ogImageMap = {
            "paintr": "https://betteraibots.com/paintindetifierai.webp",
            "invideo-ai": "https://betteraibots.com/assets/InVideoFreeTrial.png", 
            "scholar-gpt": "https://betteraibots.com/assets/bot-placeholder4.webp",
            "vetgpt": "https://betteraibots.com/assets/vetgpt-1.png",
            "ai-fitness-coach": "https://betteraibots.com/assets/bot-placeholder15.webp",
            "cheat-coder": "https://betteraibots.com/assets/cheatcoder.png",
            "love-doc-ai": "https://betteraibots.com/assets/bot-placeholder7.webp"
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
            "vetgpt": "https://betteraibots.com/assets/vetgpt-1.png",
            "ai-fitness-coach": "https://betteraibots.com/assets/bot-placeholder15.webp",
            "cheat-coder": "https://betteraibots.com/assets/cheatcoder.png",
            "love-doc-ai": "https://betteraibots.com/assets/bot-placeholder7.webp"
          };
          return ogImageMap[article.id] || images[0] || article.cover;
        })()} />
        <meta name="article:published_time" content={article.date} />
        <meta name="article:author" content="BetterAiBots" />
        <meta name="article:section" content="AI Tools" />
        <meta name="article:tag" content="AI, Artificial Intelligence, GPT, ChatGPT, AI Tools" />
        
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
                "vetgpt": "https://betteraibots.com/assets/vetgpt-1.png",
                "ai-fitness-coach": "https://betteraibots.com/assets/bot-placeholder15.webp",
                "cheat-coder": "https://betteraibots.com/assets/cheatcoder.png",
                "love-doc-ai": "https://betteraibots.com/assets/bot-placeholder7.webp"
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
            "keywords": "AI, Artificial Intelligence, GPT, ChatGPT, AI Tools, BetterAiBots",
            "articleSection": "AI Tools",
            "inLanguage": "en-US"
          })}
        </script>
      </Helmet>
      <div style={{ marginBottom: 15 }}>
        <Link to="/learn" style={{ color: "#36ff95", textDecoration: "underline" }}>&larr; Back to Learn</Link>
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
            },
            "love-doc-ai": {
              name: "Love Doc",
              link: "https://chatgpt.com/g/g-6833fa918b148191a7b2d4cc2ea7114f-love-doc"
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
        <img src={images[0]} alt="" style={{
          width: "480px",
          height: "480px",
          maxWidth: "100%",
          borderRadius: 16,
          margin: "0 0 24px 0",
          display: "block",
          objectFit: "cover"
        }} />
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
          components={{
            h2: ScholarGPTHeading,
            h3: ({ node, children, ...props }) => (
              <h3 {...props} style={{ color: '#36ff95', fontWeight: 700, margin: '28px 0 10px 0', fontSize: '1.13rem', letterSpacing: 0.1 }}>{children}</h3>
            ),
            p: ({ children }) => <p>{children}</p>,
            strong: ({ children, ...props }) => {
              // Neon highlight for speaker names
              return highlightSpeakers(children);
            },
            li: ({ children, ...props }) => (
              <li style={{ marginBottom: 4 }}>{children}</li>
            ),
            img: () => null, // Prevent user-submitted inline images
            a: ({ href, children, ...props }) => {
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
              if (href && href.includes('betteraibots.com/adcreative')) {
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
                        // Copy link functionality
                        navigator.clipboard.writeText(window.location.href).then(() => {
                          alert('Link copied to clipboard!');
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
          },
          "love-doc-ai": {
            name: "Love Doc",
            link: "https://chatgpt.com/g/g-6833fa918b148191a7b2d4cc2ea7114f-love-doc"
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
