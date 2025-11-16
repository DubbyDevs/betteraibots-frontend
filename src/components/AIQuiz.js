import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const AIQuiz = ({ isEmbedded = false, onClose, onAdvance }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const correctAnswers = ['b', 'b', 'b', 'b', 'b', 'c', 'c', 'b', 'b', 'b'];
  const questions = [
    {
      text: "Which company leads the AI market with 400 million weekly users?",
      options: ["A) Google", "B) Microsoft/OpenAI", "C) Anthropic", "D) Meta"],
      correct: "B) Microsoft/OpenAI"
    },
    {
      text: "What is the standard monthly price for most AI platforms' premium tiers?",
      options: ["A) $10", "B) $20", "C) $50", "D) $100"],
      correct: "B) $20"
    },
    {
      text: "How many GPT-4o messages do ChatGPT Plus subscribers get every 3 hours?",
      options: ["A) 50", "B) 80", "C) 100", "D) Unlimited"],
      correct: "B) 80"
    },
    {
      text: "Which AI model is known for superior writing capabilities and 200K token context windows?",
      options: ["A) GPT-4", "B) Claude", "C) Gemini", "D) Grok"],
      correct: "B) Claude"
    },
    {
      text: "What are tokens in AI processing?",
      options: ["A) Payment methods", "B) Processing units equivalent to about 4 characters", "C) Computer programs", "D) User accounts"],
      correct: "B) Processing units equivalent to about 4 characters"
    },
    {
      text: "What is AI hallucination?",
      options: ["A) When AI becomes conscious", "B) Visual effects in AI interfaces", "C) AI generating convincing but factually incorrect information", "D) AI processing speed"],
      correct: "C) AI generating convincing but factually incorrect information"
    },
    {
      text: "What ROI do organizations typically report within the first year of strategic AI implementation?",
      options: ["A) 25%", "B) 50%", "C) 74%", "D) 100%"],
      correct: "C) 74%"
    },
    {
      text: "Which pricing model is becoming more popular than traditional seat-based subscriptions?",
      options: ["A) Fixed annual pricing", "B) Usage-based and outcome-based pricing", "C) Free-only models", "D) One-time purchase"],
      correct: "B) Usage-based and outcome-based pricing"
    },
    {
      text: "What's the recommended approach for beginners starting with AI?",
      options: ["A) Use AI for everything immediately", "B) Start with high-impact use cases and scale systematically", "C) Only use free versions", "D) Focus on the most expensive tools first"],
      correct: "B) Start with high-impact use cases and scale systematically"
    },
    {
      text: "What represents the next evolution in AI beyond simple task automation?",
      options: ["A) Faster processing", "B) Agentic AI systems with autonomous decision-making", "C) Lower costs", "D) Better graphics"],
      correct: "B) Agentic AI systems with autonomous decision-making"
    }
  ];

  const selectOption = (questionNum, answer) => {
    setSelectedOptions(prev => ({ ...prev, [questionNum]: answer }));
    setUserAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionNum - 1] = answer;
      return newAnswers;
    });
  };

  const nextQuestion = () => {
    if (currentQuestion === 10) {
      calculateResults();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const calculateResults = () => {
    let newScore = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        newScore++;
      }
    }
    setScore(newScore);
    setShowResults(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(1);
    setScore(0);
    setUserAnswers([]);
    setShowResults(false);
    setSelectedOptions({});
  };

  const handleAdvance = () => {
    if (onAdvance) {
      onAdvance();
    } else {
      // Store in localStorage for persistence
      localStorage.setItem('aiLevel', 'intermediate');
      alert('🚀 Welcome to Intermediate AI! Advanced features unlocked!');
    }
  };

  const showShareFeedback = (platform) => {
    const message = document.createElement('div');
    message.textContent = `Shared to ${platform}!`;
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #36ff95, #0bbfdb);
      color: #1a2330;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: bold;
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
      transform: translateX(100px);
      transition: all 0.3s ease;
      white-space: nowrap;
      box-shadow: 0 4px 15px rgba(54, 255, 149, 0.3);
    `;
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
      message.style.opacity = '1';
      message.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
      message.style.opacity = '0';
      message.style.transform = 'translateX(100px)';
      setTimeout(() => {
        document.body.removeChild(message);
      }, 300);
    }, 3000);
  };

  const handleShare = async (platform) => {
    const url = 'https://betteraibots.com/AI-Starter-Quiz.html';
    const text = `I just scored ${score}/10 on the AI Starter Quiz! Test your AI knowledge:`;
    
    try {
      // Try Web Share API first (mobile)
      if (navigator.share) {
        await navigator.share({
          title: 'AI Starter Quiz Results',
          text: text,
          url: url
        });
        showShareFeedback('Native Share');
        return;
      }
    } catch (error) {
      // Web Share API failed or was cancelled, fall back to platform-specific sharing
    }
    
    // Platform-specific fallbacks
    switch (platform) {
      case 'x':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        const subject = 'AI Starter Quiz - Test Your Knowledge!';
        const body = `${text} ${url}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        break;
      case 'sms':
        const smsBody = `${text} ${url}`;
        window.open(`sms:?body=${encodeURIComponent(smsBody)}`);
        break;
      default:
        break;
    }
    
    showShareFeedback(platform.charAt(0).toUpperCase() + platform.slice(1));
  };

  const progress = (currentQuestion / 10) * 100;

  if (isEmbedded) {
    return (
      <>
        <style>{`
          .quiz-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .quiz-scrollbar::-webkit-scrollbar-track {
            background: #000000;
            border-radius: 10px;
          }
          .quiz-scrollbar::-webkit-scrollbar-thumb {
            background: #333333;
            border-radius: 10px;
          }
          .quiz-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #444444;
          }
        `}</style>
        <div 
          onClick={onClose}
          style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div 
            onClick={(e) => e.stopPropagation()}
            className="quiz-scrollbar"
            style={{
            background: 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '2px solid #36ff95',
            boxShadow: '0 0 30px rgba(54, 255, 149, 0.3)'
          }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#36ff95',
              textShadow: '0 0 10px rgba(54, 255, 149, 0.3)'
            }}>
              The AI Starter Guide Quiz
            </h1>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(16, 28, 38, 0.3)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#36ff95',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(16, 28, 38, 0.5)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(16, 28, 38, 0.3)'}
            >
              ×
            </button>
          </div>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            marginBottom: '30px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #36ff95, #0bbfdb)',
              width: `${progress}%`,
              transition: 'width 0.3s ease',
              borderRadius: '10px'
            }} />
          </div>

          {/* Quiz Content */}
          {!showResults ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(54, 255, 149, 0.2)'
            }}>
              <div style={{
                color: '#36ff95',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                Question {currentQuestion} of 10
              </div>
              <div style={{
                fontSize: '1.3rem',
                marginBottom: '25px',
                lineHeight: '1.5',
                color: '#d1efe7'
              }}>
                {questions[currentQuestion - 1].text}
              </div>
              <div style={{
                display: 'grid',
                gap: '15px',
                marginBottom: '25px'
              }}>
                {questions[currentQuestion - 1].options.map((option, index) => {
                  const answerLetter = ['a', 'b', 'c', 'd'][index];
                  const isSelected = selectedOptions[currentQuestion] === answerLetter;
                  return (
                    <div
                      key={index}
                      onClick={() => selectOption(currentQuestion, answerLetter)}
                      style={{
                        background: isSelected ? 'rgba(54, 255, 149, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${isSelected ? '#36ff95' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '15px',
                        padding: '18px 24px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem',
                        color: '#d1efe7',
                        transform: isSelected ? 'translateX(5px)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.target.style.borderColor = '#36ff95';
                          e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        }
                      }}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={nextQuestion}
                disabled={!selectedOptions[currentQuestion]}
                style={{
                  background: selectedOptions[currentQuestion] ? 'linear-gradient(135deg, #36ff95, #0bbfdb)' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedOptions[currentQuestion] ? '#1a2330' : '#666',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: selectedOptions[currentQuestion] ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  float: 'right'
                }}
                onMouseEnter={(e) => {
                  if (selectedOptions[currentQuestion]) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(54, 255, 149, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOptions[currentQuestion]) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {currentQuestion === 10 ? 'Show Results' : 'Next Question'}
              </button>
              <div style={{ clear: 'both' }} />
            </div>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              border: '1px solid rgba(54, 255, 149, 0.2)'
            }}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: `conic-gradient(#36ff95 0deg, #36ff95 ${(score / 10) * 360}deg, rgba(255, 255, 255, 0.1) ${(score / 10) * 360}deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px',
                position: 'relative'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#1a2330',
                  position: 'absolute'
                }} />
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#36ff95'
                }}>
                  {score}/10
                </div>
              </div>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: '#d1efe7'
              }}>
                {score >= 7 ? '🎉 Congratulations! You passed!' : 
                 score >= 5 ? '📚 Good effort, but not quite there yet!' : 
                 '🤔 Time to hit the books!'}
              </div>
              <div style={{
                color: '#9ca3af',
                fontSize: '1.1rem',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                {score >= 7 ? 'You have a solid understanding of AI fundamentals and are ready to advance to intermediate level. Well done!' :
                 score >= 5 ? `You scored ${score}/10. Review the AI Starter Guide and retake the quiz to advance to intermediate level. You need at least 7 correct answers.` :
                 `You scored ${score}/10. We recommend thoroughly reading the AI Starter Guide again before retaking the quiz. Focus on the key concepts and pricing details.`}
              </div>
              <button
                onClick={restartQuiz}
                style={{
                  background: 'linear-gradient(135deg, #36ff95, #0bbfdb)',
                  color: '#1a2330',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginRight: '15px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 20px rgba(54, 255, 149, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Retake Quiz
              </button>
              {score >= 7 && (
                <button
                  onClick={handleAdvance}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                    color: 'white',
                    border: 'none',
                    padding: '15px 40px',
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(255, 107, 107, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Advance to Intermediate
                </button>
              )}

              {/* Share Buttons */}
              <div style={{
                marginTop: '40px',
                paddingTop: '30px',
                borderTop: '1px solid rgba(54, 255, 149, 0.2)'
              }}>
                <h3 style={{
                  color: '#d1efe7',
                  fontSize: '1.2rem',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  Share this quiz:
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  flexWrap: 'wrap'
                }}>
                  {/* X (Twitter) */}
                  <button
                    onClick={() => handleShare('x')}
                    style={{
                      background: '#000',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Share to X
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => handleShare('facebook')}
                    style={{
                      background: '#4267B2',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(66, 103, 178, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>

                  {/* Email */}
                  <button
                    onClick={() => handleShare('email')}
                    style={{
                      background: '#ea4335',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(234, 67, 53, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20V8.99l8 7 8-7V20H4z"/>
                    </svg>
                    Email
                  </button>

                  {/* SMS */}
                  <button
                    onClick={() => handleShare('sms')}
                    style={{
                      background: '#25d366',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4C2.897 2 2 2.897 2 4v14c0 1.103.897 2 2 2h14l4 4V4c0-1.103-.897-2-2-2zm0 15.172L18.828 16H4V4h16v13.172z"/>
                    </svg>
                    SMS
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </>
    );
  }

  // Standalone page version
  return (
    <>
      <Helmet>
        <title>AI Starter Guide Quiz – BetterAiBots.com</title>
        <meta name="description" content="Test your AI knowledge and advance to intermediate level with our comprehensive AI Starter Guide Quiz." />
        <meta property="og:title" content="AI Starter Guide Quiz – BetterAiBots.com" />
        <meta property="og:description" content="Test your AI knowledge and advance to intermediate level!" />
        <meta property="og:url" content="https://betteraibots.com/quiz" />
        <link rel="canonical" href="https://betteraibots.com/quiz" />
      </Helmet>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '20px'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '30px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(54, 255, 149, 0.2)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              <span style={{ color: '#9ca3af' }}>Better</span>
              <span style={{ color: '#36ff95' }}>Ai</span>
              <span style={{ color: '#36ff95' }}>Bots</span>
            </div>
            <div style={{
              fontSize: '1.8rem',
              marginBottom: '10px',
              background: 'linear-gradient(45deg, #36ff95, #0bbfdb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              The AI Starter Guide Quiz
            </div>
            <div style={{
              color: '#9ca3af',
              fontSize: '1.1rem'
            }}>
              Test your knowledge and advance to intermediate level!
            </div>
          </div>

          {/* Quiz Content - Same as embedded version */}
          {!showResults ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(54, 255, 149, 0.2)'
            }}>
              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                marginBottom: '30px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #36ff95, #0bbfdb)',
                  width: `${progress}%`,
                  transition: 'width 0.3s ease',
                  borderRadius: '10px'
                }} />
              </div>

              <div style={{
                color: '#36ff95',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                Question {currentQuestion} of 10
              </div>
              <div style={{
                fontSize: '1.3rem',
                marginBottom: '25px',
                lineHeight: '1.5',
                color: '#d1efe7'
              }}>
                {questions[currentQuestion - 1].text}
              </div>
              <div style={{
                display: 'grid',
                gap: '15px',
                marginBottom: '25px'
              }}>
                {questions[currentQuestion - 1].options.map((option, index) => {
                  const answerLetter = ['a', 'b', 'c', 'd'][index];
                  const isSelected = selectedOptions[currentQuestion] === answerLetter;
                  return (
                    <div
                      key={index}
                      onClick={() => selectOption(currentQuestion, answerLetter)}
                      style={{
                        background: isSelected ? 'rgba(54, 255, 149, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${isSelected ? '#36ff95' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '15px',
                        padding: '18px 24px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem',
                        color: '#d1efe7',
                        transform: isSelected ? 'translateX(5px)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.target.style.borderColor = '#36ff95';
                          e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        }
                      }}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={nextQuestion}
                disabled={!selectedOptions[currentQuestion]}
                style={{
                  background: selectedOptions[currentQuestion] ? 'linear-gradient(135deg, #36ff95, #0bbfdb)' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedOptions[currentQuestion] ? '#1a2330' : '#666',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: selectedOptions[currentQuestion] ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  float: 'right'
                }}
                onMouseEnter={(e) => {
                  if (selectedOptions[currentQuestion]) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(54, 255, 149, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOptions[currentQuestion]) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {currentQuestion === 10 ? 'Show Results' : 'Next Question'}
              </button>
              <div style={{ clear: 'both' }} />
            </div>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              border: '1px solid rgba(54, 255, 149, 0.2)'
            }}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: `conic-gradient(#36ff95 0deg, #36ff95 ${(score / 10) * 360}deg, rgba(255, 255, 255, 0.1) ${(score / 10) * 360}deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px',
                position: 'relative'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#1a2330',
                  position: 'absolute'
                }} />
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#36ff95'
                }}>
                  {score}/10
                </div>
              </div>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: '#d1efe7'
              }}>
                {score >= 7 ? '🎉 Congratulations! You passed!' : 
                 score >= 5 ? '📚 Good effort, but not quite there yet!' : 
                 '🤔 Time to hit the books!'}
              </div>
              <div style={{
                color: '#9ca3af',
                fontSize: '1.1rem',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                {score >= 7 ? 'You have a solid understanding of AI fundamentals and are ready to advance to intermediate level. Well done!' :
                 score >= 5 ? `You scored ${score}/10. Review the AI Starter Guide and retake the quiz to advance to intermediate level. You need at least 7 correct answers.` :
                 `You scored ${score}/10. We recommend thoroughly reading the AI Starter Guide again before retaking the quiz. Focus on the key concepts and pricing details.`}
              </div>
              <button
                onClick={restartQuiz}
                style={{
                  background: 'linear-gradient(135deg, #36ff95, #0bbfdb)',
                  color: '#1a2330',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginRight: '15px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 20px rgba(54, 255, 149, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Retake Quiz
              </button>
              {score >= 7 && (
                <button
                  onClick={handleAdvance}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                    color: 'white',
                    border: 'none',
                    padding: '15px 40px',
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(255, 107, 107, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Advance to Intermediate
                </button>
              )}

              {/* Share Buttons */}
              <div style={{
                marginTop: '40px',
                paddingTop: '30px',
                borderTop: '1px solid rgba(54, 255, 149, 0.2)'
              }}>
                <h3 style={{
                  color: '#d1efe7',
                  fontSize: '1.2rem',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  Share this quiz:
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  flexWrap: 'wrap'
                }}>
                  {/* X (Twitter) */}
                  <button
                    onClick={() => handleShare('x')}
                    style={{
                      background: '#000',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Share to X
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => handleShare('facebook')}
                    style={{
                      background: '#4267B2',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(66, 103, 178, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>

                  {/* Email */}
                  <button
                    onClick={() => handleShare('email')}
                    style={{
                      background: '#ea4335',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(234, 67, 53, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20V8.99l8 7 8-7V20H4z"/>
                    </svg>
                    Email
                  </button>

                  {/* SMS */}
                  <button
                    onClick={() => handleShare('sms')}
                    style={{
                      background: '#25d366',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4C2.897 2 2 2.897 2 4v14c0 1.103.897 2 2 2h14l4 4V4c0-1.103-.897-2-2-2zm0 15.172L18.828 16H4V4h16v13.172z"/>
                    </svg>
                    SMS
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIQuiz; 