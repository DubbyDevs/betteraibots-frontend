import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const LearnLevelSelector = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
            gap: '30px',
            marginBottom: '40px',
            justifyContent: 'center',
            maxWidth: isMobile ? '100%' : 'none',
            padding: isMobile ? '0 16px' : '0'
          }}>
            {levels.map((level) => (
              <div
                key={level.id}
                onClick={() => handleLevelSelect(level.id)}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  border: `2px solid ${level.color}40`,
                  borderRadius: '20px',
                  padding: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: '500px'
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
                   width: '125px',
                   height: '125px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   marginBottom: '20px',
                   margin: '0 auto 20px auto'
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
                    marginBottom: '25px'
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
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    marginBottom: '25px',
                    textAlign: 'center'
                  }}>
                    {level.description}
                  </p>

                  {/* Features */}
                  <div style={{
                    marginBottom: '25px'
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
        </div>
      </div>
    </>
  );
};

export default LearnLevelSelector; 