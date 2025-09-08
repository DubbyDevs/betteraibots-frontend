import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const LearnLevelSelector = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1030);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'New to AI? Start here with the fundamentals',
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
    <>
      <Helmet>
        <title>Choose Your AI Learning Path | BetterAiBots.com</title>
        <meta name="description" content="Select your AI learning level: Beginner, Intermediate, or Advanced. Start your journey to AI mastery with our structured learning paths." />
        <meta name="keywords" content="AI learning, AI education, AI courses, AI training, artificial intelligence learning, AI beginner, AI intermediate, AI advanced, AI certification" />
        <meta property="og:title" content="Choose Your AI Learning Path | BetterAiBots.com" />
        <meta property="og:description" content="Select your AI learning level and start your journey to AI mastery with our structured learning paths." />
        <meta property="og:url" content="https://betteraibots.com/learn" />
        <link rel="canonical" href="https://betteraibots.com/learn" />
      </Helmet>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '800',
              marginBottom: '20px',
              background: 'linear-gradient(45deg, #36ff95, #0bbfdb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Choose Your AI Learning Path
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#9ca3af',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Select your experience level and start your journey to AI mastery. Each path includes comprehensive guides, practical examples, and quizzes to test your knowledge.
            </p>
          </div>

          {/* Level Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '20px' : '30px',
            marginBottom: '40px',
            justifyContent: 'center',
            maxWidth: isMobile ? '100%' : 'none',
            padding: isMobile ? '0 8px' : '0'
          }}>
            {levels.map((level) => (
              <div
                key={level.id}
                onClick={() => handleLevelSelect(level.id)}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  border: `2px solid ${level.color}40`,
                  borderRadius: '20px',
                  padding: isMobile ? '20px' : '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: isMobile ? '400px' : '500px'
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
                {/* Content Container */}
                <div style={{ flex: '1' }}>
                                  {/* Badge */}
                                 <div style={{
                   width: isMobile ? '100px' : '125px',
                   height: isMobile ? '100px' : '125px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   marginBottom: isMobile ? '15px' : '20px',
                   margin: '0 auto 15px auto'
                 }}>
                  <img 
                    src={level.id === 'beginner' ? '/beginnerbadge.webp' : level.id === 'intermediate' ? '/intermediatebadge.webp' : '/advancedbadge.webp'}
                    alt={`${level.title} badge`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                  {/* Title and Difficulty */}
                  <div style={{
                    textAlign: 'center',
                    marginBottom: isMobile ? '20px' : '25px'
                  }}>
                    <h2 style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      margin: '0 0 10px 0',
                      color: level.color
                    }}>
                      {level.title}
                    </h2>
                    <span style={{
                      background: level.gradient,
                      color: level.id === 'advanced' ? '#1a2330' : 'white',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {level.difficulty}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{
                    color: '#9ca3af',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    lineHeight: '1.6',
                    marginBottom: isMobile ? '20px' : '25px',
                    textAlign: 'center'
                  }}>
                    {level.description}
                  </p>

                  {/* Features */}
                  <div style={{
                    marginBottom: isMobile ? '20px' : '25px'
                  }}>
                    <h3 style={{
                      color: '#d1efe7',
                      fontSize: '1.1rem',
                      marginBottom: '15px',
                      fontWeight: '600'
                    }}>
                      What you'll learn:
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {level.features.map((feature, index) => (
                        <li key={index} style={{
                          color: '#9ca3af',
                          fontSize: '0.95rem',
                          marginBottom: '8px',
                          paddingLeft: '20px',
                          position: 'relative'
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            top: '2px',
                            color: level.color,
                            fontSize: '0.8rem'
                          }}>
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button - Pinned to Bottom */}
                <button style={{
                  width: '100%',
                  background: level.gradient,
                  color: level.id === 'advanced' ? '#1a2330' : 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: 'auto'
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
            padding: '30px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            border: '1px solid rgba(54, 255, 149, 0.2)'
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
            marginTop: 40,
            marginBottom: 40,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h2 style={{ 
              textAlign: "center", 
              color: "#36ff95", 
              fontSize: "1.4rem", 
              fontWeight: 600, 
              marginBottom: 30,
              textShadow: "0 0 8px #36ff9544"
            }}>
              Guides
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: isMobile ? "15px" : "20px",
              maxWidth: isMobile ? "600px" : "1200px",
              margin: "0 auto",
              padding: isMobile ? "0 15px" : "0 40px",
              justifyItems: "center",
              alignItems: "start",
              width: "100%"
            }}>
              {/* AI for Dummies Guide */}
              <a 
                href="/ai-for-dummies-guide.html"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s ease-in-out",
                  width: "100%"
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div style={{
                  background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                  border: "2px solid #36ff95",
                  borderRadius: "16px",
                  padding: isMobile ? "15px" : "20px",
                  textAlign: "center",
                  boxShadow: "0 0 20px #36ff9544",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: isMobile ? "280px" : "320px",
                  width: "100%"
                }}>
                  <img
                    src="/aifordummies.png"
                    alt="AI for Dummies Guide"
                    style={{
                      width: isMobile ? "120px" : "160px",
                      height: isMobile ? "120px" : "160px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "15px"
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <h3 style={{
                    color: "#36ff95",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: 600,
                    margin: "0",
                    textShadow: "0 0 8px #36ff9544"
                  }}>
                    AI for Dummies
                  </h3>
                  <p style={{
                    color: "#b2ffe0",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    margin: "8px 0 0 0",
                    lineHeight: "1.4"
                  }}>
                    Super simple guide to getting started with AI
                  </p>
                </div>
              </a>

              {/* Beginner Guide */}
              <a 
                href="/ai-starter-guide.html"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s ease-in-out",
                  width: "100%"
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div style={{
                  background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                  border: "2px solid #36ff95",
                  borderRadius: "16px",
                  padding: isMobile ? "15px" : "20px",
                  textAlign: "center",
                  boxShadow: "0 0 20px #36ff9544",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: isMobile ? "280px" : "320px",
                  width: "100%"
                }}>
                  <img
                    src="/begguide.png"
                    alt="Beginner AI Guide"
                    style={{
                      width: isMobile ? "120px" : "160px",
                      height: isMobile ? "120px" : "160px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "15px"
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <h3 style={{
                    color: "#36ff95",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: 600,
                    margin: "0",
                    textShadow: "0 0 8px #36ff9544"
                  }}>
                    Beginner Guide
                  </h3>
                  <p style={{
                    color: "#b2ffe0",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    margin: "8px 0 0 0",
                    lineHeight: "1.4"
                  }}>
                    Master the fundamentals of AI
                  </p>
                </div>
              </a>

              {/* Intermediate Guide */}
              <a 
                href="/intermediate-ai-guide.html"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s ease-in-out",
                  width: "100%"
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div style={{
                  background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                  border: "2px solid #36ff95",
                  borderRadius: "16px",
                  padding: isMobile ? "15px" : "20px",
                  textAlign: "center",
                  boxShadow: "0 0 20px #36ff9544",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: isMobile ? "280px" : "320px",
                  width: "100%"
                }}>
                  <img
                    src="/intguide.png"
                    alt="Intermediate AI Guide"
                    style={{
                      width: isMobile ? "120px" : "160px",
                      height: isMobile ? "120px" : "160px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "15px"
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <h3 style={{
                    color: "#36ff95",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: 600,
                    margin: "0",
                    textShadow: "0 0 8px #36ff9544"
                  }}>
                    Intermediate Guide
                  </h3>
                  <p style={{
                    color: "#b2ffe0",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    margin: "8px 0 0 0",
                    lineHeight: "1.4"
                  }}>
                    Dive deeper into AI applications
                  </p>
                </div>
              </a>

              {/* Advanced Guide */}
              <a 
                href="/advanced-ai-guide.html"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s ease-in-out",
                  width: "100%"
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div style={{
                  background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                  border: "2px solid #36ff95",
                  borderRadius: "16px",
                  padding: isMobile ? "15px" : "20px",
                  textAlign: "center",
                  boxShadow: "0 0 20px #36ff9544",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: isMobile ? "280px" : "320px",
                  width: "100%"
                }}>
                  <img
                    src="/advguide.png"
                    alt="Advanced AI Guide"
                    style={{
                      width: isMobile ? "120px" : "160px",
                      height: isMobile ? "120px" : "160px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "15px"
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <h3 style={{
                    color: "#36ff95",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: 600,
                    margin: "0",
                    textShadow: "0 0 8px #36ff9544"
                  }}>
                    Advanced Guide
                  </h3>
                  <p style={{
                    color: "#b2ffe0",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    margin: "8px 0 0 0",
                    lineHeight: "1.4"
                  }}>
                    Become an AI expert and earn Pro status
                  </p>
                </div>
              </a>
            </div>
          </div>

                     {/* APP SPOTLIGHT SECTION */}
           <div style={{
             marginTop: 40,
             marginBottom: 40,
             width: "100%",
             display: "flex",
             flexDirection: "column",
             alignItems: "center"
           }}>
             <h2 style={{ 
               textAlign: "center", 
               color: "#36ff95", 
               fontSize: "1.4rem", 
               fontWeight: 600, 
               marginBottom: 30,
               textShadow: "0 0 8px #36ff9544"
             }}>
               App Spotlight
             </h2>
             
                                         {/* App Spotlight Cards Grid */}
               <div style={{
                 display: "grid",
                 gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(600px, 1fr))",
                 gap: "30px",
                 maxWidth: isMobile ? "600px" : "1000px",
                 margin: "0 auto",
                 padding: isMobile ? "0 15px" : "0 40px",
                 width: "100%"
               }}>
                               {/* Capsule CRM Card */}
               <div style={{
                 background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                 border: "2px solid #36ff95",
                 borderRadius: "16px",
                 overflow: "hidden",
                 boxShadow: "0 0 20px #36ff9544",
                 transition: "transform 0.2s ease-in-out"
               }}
               onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
               onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
               >
                                   <div style={{
                    display: "flex",
                    alignItems: "stretch"
                  }}>
                    <div style={{
                      flex: isMobile ? "0 0 120px" : "0 0 300px",
                      position: "relative"
                    }}>
                                                                                        <img
                       src="/capsulecrm.png"
                       alt="Capsule CRM - Simple Yet Powerful CRM"
                         style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "contain"
                         }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                   </div>
                     <div style={{
                     flex: 1,
                     padding: "24px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between"
                   }}>
                     <div>
                       <h3 style={{
                         color: "#36ff95",
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         Capsule CRM
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • Sales & CRM
                       </p>
                       <p style={{
                         color: "#e0e0e0",
                         fontSize: isMobile ? "0.9rem" : "1rem",
                         lineHeight: 1.5,
                         margin: "0 0 16px 0"
                       }}>
                         Simple yet powerful CRM trusted by 10,000+ businesses. Manage contacts, track deals, and automate workflows without complexity.
                       </p>
                       <div style={{
                         display: "flex",
                         flexWrap: "wrap",
                         gap: "8px",
                         marginBottom: "16px"
                       }}>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                       fontSize: "0.8rem",
                           border: "1px solid rgba(54, 255, 149, 0.3)"
                         }}>
                           Free Plan Available
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.8rem",
                           border: "1px solid rgba(54, 255, 149, 0.3)"
                         }}>
                           Easy Setup
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.8rem",
                           border: "1px solid rgba(54, 255, 149, 0.3)"
                         }}>
                           60+ Integrations
                         </span>
                     </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://get.capsulenow.io/6894ebdizsds"
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
                         Try Free Trial
                       </a>
                       <Link
                         to="/learn/capsule-crm-complete-guide"
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

                               {/* MRPeasy Card */}
               <div style={{
                 background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                 border: "2px solid #36ff95",
                 borderRadius: "16px",
                 overflow: "hidden",
                 boxShadow: "0 0 20px #36ff9544",
                 transition: "transform 0.2s ease-in-out"
               }}
               onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
               onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
               >
                 <div style={{
                   display: "flex",
                   alignItems: "stretch"
                 }}>
                   <div style={{
                     flex: isMobile ? "0 0 120px" : "0 0 300px",
                     position: "relative"
                   }}>
                     <img
                       src="/mrpeasy.png"
                       alt="MRPeasy - Manufacturing ERP Solution"
                       style={{
                         width: "100%",
                         height: "100%",
                         objectFit: "contain"
                       }}
                       onError={(e) => {
                         e.target.style.display = 'none';
                       }}
                     />
                   </div>
                   <div style={{
                     flex: 1,
                     padding: "24px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between"
                   }}>
                     <div>
                       <h3 style={{
                         color: "#36ff95",
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         MRPeasy
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • Manufacturing & ERP
                       </p>
                       <p style={{
                         color: "#e0e0e0",
                         fontSize: isMobile ? "0.9rem" : "1rem",
                         lineHeight: 1.5,
                         margin: "0 0 16px 0"
                       }}>
                         Complete Manufacturing ERP for small businesses. Manage production, inventory, sales, and finances in one integrated platform.
                       </p>
                       <div style={{
                         display: "flex",
                         flexWrap: "wrap",
                         gap: "8px",
                         marginBottom: "16px"
                       }}>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.8rem",
                           border: "1px solid rgba(54, 255, 149, 0.3)"
                         }}>
                           30-Day Free Trial
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.8rem",
                           border: "1px solid rgba(54, 255, 149, 0.3)"
                         }}>
                           All-in-One ERP
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.8rem",
                           border: "1px solid rgba(54, 255, 149, 0.3)"
                         }}>
                           Production Planning
                         </span>
                       </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://try.mrpeasy.com/m72w6bztymwh"
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
                         Try Free Trial
                       </a>
                       <Link
                         to="/learn/mrpeasy-complete-guide"
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

                               {/* Lindy.ai Card */}
               <div style={{
                 background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                 border: "2px solid #36ff95",
                 borderRadius: "16px",
                 overflow: "hidden",
                 boxShadow: "0 0 20px #36ff9544",
                 transition: "transform 0.2s ease-in-out"
               }}
               onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
               onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
               >
                                   <div style={{
                    display: "flex",
                    alignItems: "stretch"
                  }}>
                    <div style={{
                      flex: isMobile ? "0 0 120px" : "0 0 300px",
                      position: "relative"
                    }}>
                                                                                        <img
                          src="/lindy.png"
                          alt="Lindy.ai - AI Automation Platform"
                         style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "contain"
                         }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                   </div>
                   <div style={{
                     flex: "1",
                     padding: isMobile ? "15px" : "25px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between"
                   }}>
                     <div>
                       <h3 style={{
                         color: "#36ff95",
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         Lindy.ai - AI Automation Platform
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • Productivity & Automation
                       </p>
                       <p style={{
                         color: "#e0e0e0",
                         fontSize: isMobile ? "0.9rem" : "1rem",
                         lineHeight: 1.5,
                         margin: "0 0 16px 0"
                       }}>
                         Discover how Lindy.ai's AI automation platform helps businesses create custom AI agents without coding, with 6,000+ integrations and 24/7 operation capabilities.
                       </p>
                       <div style={{
                         display: "flex",
                         flexWrap: "wrap",
                         gap: "8px",
                         marginBottom: "16px"
                       }}>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           Free Trial Available
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           AI Automation
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           6,000+ Integrations
                         </span>
                     </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://try.lindy.ai/lhgvxfidor04"
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
                       onMouseOver={(e) => {
                         e.target.style.transform = "translateY(-2px)";
                           e.target.style.boxShadow = "0 6px 16px rgba(54, 255, 149, 0.4)";
                       }}
                       onMouseOut={(e) => {
                         e.target.style.transform = "translateY(0)";
                           e.target.style.boxShadow = "0 4px 12px rgba(54, 255, 149, 0.3)";
                         }}
                       >
                         Try Free Trial
                       </a>
                       <Link
                         to="/learn/lindy-ai"
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

                               {/* Viral Launch Card */}
               <div style={{
                 background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                 border: "2px solid #36ff95",
                 borderRadius: "16px",
                 overflow: "hidden",
                 boxShadow: "0 0 20px #36ff9544",
                 transition: "transform 0.2s ease-in-out"
               }}
               onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
               onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
               >
                                   <div style={{
                    display: "flex",
                    alignItems: "stretch"
                  }}>
                    <div style={{
                      flex: isMobile ? "0 0 120px" : "0 0 300px",
                      position: "relative"
                    }}>
                                                                                        <img
                          src="/virallaunch.png"
                          alt="Viral Launch - Amazon Seller Optimization Platform"
                         style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "contain"
                         }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                   </div>
                   <div style={{
                     flex: "1",
                     padding: isMobile ? "15px" : "25px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between"
                   }}>
                     <div>
                       <h3 style={{
                         color: "#36ff95",
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         Viral Launch - Amazon Seller Optimization Platform
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • E-commerce & Amazon
                       </p>
                       <p style={{
                         color: "#e0e0e0",
                         fontSize: isMobile ? "0.9rem" : "1rem",
                         lineHeight: 1.5,
                         margin: "0 0 16px 0"
                       }}>
                         Discover how Viral Launch's AI-powered platform has helped over 300,000 businesses drive $34 billion in Amazon sales with data-driven product research and optimization tools.
                       </p>
                       <div style={{
                         display: "flex",
                         flexWrap: "wrap",
                         gap: "8px",
                         marginBottom: "16px"
                       }}>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           Free Trial Available
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           Amazon Optimization
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           Product Research
                         </span>
                       </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://affiliate.viral-launch.com/BAIB"
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
                         Try Free Trial
                       </a>
                       <Link
                         to="/learn/viral-launch"
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

                               {/* Apollo Card */}
               <div style={{
                 background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                 border: "2px solid #36ff95",
                 borderRadius: "16px",
                 overflow: "hidden",
                 boxShadow: "0 0 20px #36ff9544",
                 transition: "transform 0.2s ease-in-out"
               }}
               onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
               onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
               >
                                   <div style={{
                    display: "flex",
                    alignItems: "stretch"
                  }}>
                    <div style={{
                      flex: isMobile ? "0 0 120px" : "0 0 300px",
                      position: "relative"
                    }}>
                                                                                        <img
                          src={require("../assets/apolloailogo.webp")}
                          alt="Apollo AI - Sales Intelligence Platform"
                         style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "contain"
                         }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                   </div>
                   <div style={{
                     flex: "1",
                     padding: isMobile ? "15px" : "25px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between"
                   }}>
                     <div>
                       <h3 style={{
                         color: "#36ff95",
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         Apollo AI - Sales Intelligence Platform
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • Sales & CRM
                       </p>
                       <p style={{
                         color: "#e0e0e0",
                         fontSize: isMobile ? "0.9rem" : "1rem",
                         lineHeight: 1.5,
                         margin: "0 0 16px 0"
                       }}>
                         Explore how Apollo AI is transforming sales with over 210 million contacts, AI-powered prospecting, and intelligent lead generation.
                       </p>
                       <div style={{
                         display: "flex",
                         flexWrap: "wrap",
                         gap: "8px",
                         marginBottom: "16px"
                       }}>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           Free Trial Available
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           Sales Intelligence
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           210M+ Contacts
                         </span>
                       </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://get.apollo.io/BAIB"
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
                         Try Free Trial
                       </a>
                       <Link
                         to="/learn/apollo-io"
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

               {/* Alli AI Card */}
               <div style={{
                 background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                 border: "2px solid #36ff95",
                 borderRadius: "16px",
                 overflow: "hidden",
                 boxShadow: "0 0 20px #36ff9544",
                 transition: "transform 0.2s ease-in-out"
               }}
               onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
               onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
               >
                 <div style={{
                   display: "flex",
                   alignItems: "stretch"
                 }}>
                   <div style={{
                     flex: isMobile ? "0 0 120px" : "0 0 300px",
                     position: "relative"
                   }}>
                     <img
                       src="/alliai.png"
                       alt="Alli AI - SEO Automation Platform"
                       style={{
                         width: "100%",
                         height: "100%",
                         objectFit: "contain"
                       }}
                       onError={(e) => {
                         e.target.style.display = 'none';
                       }}
                     />
                   </div>
                   <div style={{
                     flex: "1",
                     padding: isMobile ? "15px" : "25px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between"
                   }}>
                     <div>
                       <h3 style={{
                         color: "#36ff95",
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         Alli AI - SEO Automation Platform
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • SEO & Marketing
                       </p>
                       <p style={{
                         color: "#e0e0e0",
                         fontSize: isMobile ? "0.9rem" : "1rem",
                         lineHeight: 1.5,
                         margin: "0 0 16px 0"
                       }}>
                         Discover how Alli AI is revolutionizing SEO with AI-powered automation that optimizes, deploys, and scales SEO campaigns without any coding required.
                       </p>
                       <div style={{
                         display: "flex",
                         flexWrap: "wrap",
                         gap: "8px",
                         marginBottom: "16px"
                       }}>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           10-Day Free Trial
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           SEO Automation
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           No Coding Required
                         </span>
                       </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://try.alliai.com/0guepbqpqhsf"
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
                         Try Free Trial
                       </a>
                       <Link
                         to="/learn/alli-ai"
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

               {/* AdCreative Card */}
               <div style={{
                 background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                 border: "2px solid #36ff95",
                 borderRadius: "16px",
                 overflow: "hidden",
                 boxShadow: "0 0 20px #36ff9544",
                 transition: "transform 0.2s ease-in-out"
               }}
               onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
               onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
               >
                                   <div style={{
                    display: "flex",
                    alignItems: "stretch"
                  }}>
                    <div style={{
                      flex: isMobile ? "0 0 120px" : "0 0 300px",
                      position: "relative"
                    }}>
                                                                                        <img
                           src={require("../assets/adcreativeaitrial.png")}
                           alt="AdCreative AI - Ad Generation Platform"
                         style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "contain"
                         }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                   </div>
                   <div style={{
                     flex: "1",
                     padding: isMobile ? "15px" : "25px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between"
                   }}>
                     <div>
                       <h3 style={{
                         color: "#36ff95",
                         fontSize: isMobile ? "1.1rem" : "1.3rem",
                         fontWeight: 700,
                         margin: "0 0 12px 0",
                         lineHeight: 1.3
                       }}>
                         AdCreative AI - Ad Generation Platform
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                         Featured • Marketing & Advertising
                       </p>
                       <p style={{
                         color: "#e0e0e0",
                         fontSize: isMobile ? "0.9rem" : "1rem",
                         lineHeight: 1.5,
                         margin: "0 0 16px 0"
                       }}>
                         Learn how AdCreative AI is revolutionizing digital advertising with AI-powered ad generation and high-converting creative assets.
                       </p>
                       <div style={{
                         display: "flex",
                         flexWrap: "wrap",
                         gap: "8px",
                         marginBottom: "16px"
                       }}>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           Free Trial Available
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           AI Ad Generation
                         </span>
                         <span style={{
                           background: "rgba(54, 255, 149, 0.1)",
                           color: "#36ff95",
                           padding: "4px 8px",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: "500"
                         }}>
                           High-Converting Ads
                         </span>
                       </div>
                     </div>
                     <div style={{
                       display: "flex",
                       gap: "12px",
                       flexWrap: "wrap"
                     }}>
                       <a
                         href="https://betteraibots.com/adcreative"
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
                         Try Free Trial
                       </a>
                       <Link
                         to="/learn/adcreative-ai"
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

                {/* Flowith Card */}
               <div style={{
                 background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                 border: "2px solid #36ff95",
                 borderRadius: "16px",
                 overflow: "hidden",
                 boxShadow: "0 0 20px #36ff9544",
                 transition: "transform 0.2s ease-in-out"
               }}
               onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
               onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
               >
                                   <div style={{
                    display: "flex",
                    alignItems: "stretch"
                  }}>
                    <div style={{
                      flex: isMobile ? "0 0 120px" : "0 0 300px",
                      position: "relative"
                    }}>
                                                                                                                                                                                <img
                        src="/flowith.jpg"
                        alt="Flowith.io - Revolutionary AI Canvas"
                         style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "contain"
                         }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                     <div style={{
                       position: "absolute",
                       top: "15px",
                       right: "15px",
                       background: "rgba(54, 255, 149, 0.9)",
                       color: "#1a2330",
                       padding: "5px 12px",
                       borderRadius: "20px",
                       fontSize: "0.8rem",
                       fontWeight: "600"
                     }}>
                       FEATURED
                     </div>
                   </div>
                   <div style={{
                     flex: "1",
                     padding: isMobile ? "15px" : "25px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between"
                   }}>
                     <div>
                       <h3 style={{
                         color: "#36ff95",
                         fontSize: isMobile ? "1rem" : "1.4rem",
                         fontWeight: "600",
                         margin: "0 0 10px 0",
                         lineHeight: "1.3"
                       }}>
                          Flowith.io - Revolutionary AI Canvas
                       </h3>
                       <p style={{
                         color: "#9ca3af",
                         fontSize: isMobile ? "0.8rem" : "0.9rem",
                         margin: "0 0 15px 0"
                       }}>
                          Featured • Productivity & AI Workspace
                       </p>
                       <p style={{
                         color: "#b2ffe0",
                         fontSize: isMobile ? "0.9rem" : "1rem",
                         lineHeight: "1.5",
                         margin: "0 0 20px 0"
                       }}>
                          Discover how Flowith.io is revolutionizing AI interaction with its infinite canvas, multi-threaded conversations, and collaborative AI workspace.
                       </p>
                     </div>
                                           <a
                        href="/learn/flowith-io"
                        style={{
                          background: "linear-gradient(135deg, #36ff95, #0bbfdb)",
                          color: "#1a2330",
                          textDecoration: "none",
                          padding: "12px 24px",
                          borderRadius: "8px",
                          fontWeight: "600",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                          alignSelf: "stretch",
                          width: "100%",
                          display: "block"
                        }}
                       onMouseOver={(e) => {
                         e.target.style.transform = "translateY(-2px)";
                         e.target.style.boxShadow = "0 8px 20px rgba(54, 255, 149, 0.4)";
                       }}
                       onMouseOut={(e) => {
                         e.target.style.transform = "translateY(0)";
                         e.target.style.boxShadow = "none";
                       }}
                                           >
                        Read Full Article
                      </a>
                    </div>
                  </div>
                </div>

                                {/* ScholarGPT Card */}
                <div style={{
                  background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                  border: "2px solid #36ff95",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 0 20px #36ff9544",
                  transition: "transform 0.2s ease-in-out"
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "stretch"
                  }}>
                    <div style={{
                      flex: isMobile ? "0 0 120px" : "0 0 300px",
                      position: "relative"
                    }}>
                      <img
                        src="/scholargpt.jpg"
                        alt="ScholarGPT - AI Research Assistant"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain"
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        background: "rgba(54, 255, 149, 0.9)",
                        color: "#1a2330",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: "600"
                      }}>
                        FEATURED
                      </div>
                    </div>
                    <div style={{
                      flex: "1",
                      padding: isMobile ? "15px" : "25px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}>
                      <div>
                        <h3 style={{
                          color: "#36ff95",
                          fontSize: isMobile ? "1rem" : "1.4rem",
                          fontWeight: "600",
                          margin: "0 0 10px 0",
                          lineHeight: "1.3"
                        }}>
                          ScholarGPT - AI Research Assistant
                        </h3>
                        <p style={{
                          color: "#9ca3af",
                          fontSize: isMobile ? "0.8rem" : "0.9rem",
                          margin: "0 0 15px 0"
                        }}>
                          Featured • Research & Education
                        </p>
                        <p style={{
                          color: "#b2ffe0",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          lineHeight: "1.5",
                          margin: "0 0 20px 0"
                        }}>
                          Discover how ScholarGPT is revolutionizing academic research with AI-powered literature analysis, citation management, and research paper generation.
                        </p>
                      </div>
                      <a
                        href="/learn/scholar-gpt"
                        style={{
                          background: "linear-gradient(135deg, #36ff95, #0bbfdb)",
                          color: "#1a2330",
                          textDecoration: "none",
                          padding: "12px 24px",
                          borderRadius: "8px",
                          fontWeight: "600",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                          alignSelf: "stretch",
                          width: "100%",
                          display: "block"
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 8px 20px rgba(54, 255, 149, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        Read Full Article
                      </a>
                    </div>
                  </div>
                </div>

                {/* Brevo Card */}
                <div style={{
                  background: "linear-gradient(135deg, #133626 0%, #18232f 100%)",
                  border: "2px solid #36ff95",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 0 20px #36ff9544",
                  transition: "transform 0.2s ease-in-out"
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "stretch"
                  }}>
                    <div style={{
                      flex: isMobile ? "0 0 120px" : "0 0 300px",
                      position: "relative"
                    }}>
                      <img
                        src="/brevologo.png"
                        alt="Brevo - All-in-One Marketing Platform"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain"
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        background: "rgba(54, 255, 149, 0.9)",
                        color: "#1a2330",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: "600"
                      }}>
                        FEATURED
                      </div>
                    </div>
                    <div style={{
                      flex: "1",
                      padding: isMobile ? "15px" : "25px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}>
                      <div>
                        <h3 style={{
                          color: "#36ff95",
                          fontSize: isMobile ? "1rem" : "1.4rem",
                          fontWeight: "600",
                          margin: "0 0 10px 0",
                          lineHeight: "1.3"
                        }}>
                          Brevo - All-in-One Marketing Platform
                        </h3>
                        <p style={{
                          color: "#9ca3af",
                          fontSize: isMobile ? "0.8rem" : "0.9rem",
                          margin: "0 0 15px 0"
                        }}>
                          Featured • Email Marketing & Automation
                        </p>
                        <p style={{
                          color: "#b2ffe0",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          lineHeight: "1.5",
                          margin: "0 0 20px 0"
                        }}>
                          Discover how Brevo's AI-powered marketing platform helps businesses of all sizes connect with customers through email, SMS, WhatsApp, and automation workflows.
                        </p>
                      </div>
                      <a
                        href="/learn/brevo-complete-guide"
                        style={{
                          background: "linear-gradient(135deg, #36ff95, #0bbfdb)",
                          color: "#1a2330",
                          textDecoration: "none",
                          padding: "12px 24px",
                          borderRadius: "8px",
                          fontWeight: "600",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                          alignSelf: "stretch",
                          width: "100%",
                          display: "block"
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 8px 20px rgba(54, 255, 149, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        Read Full Article
                      </a>
                    </div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default LearnLevelSelector; 