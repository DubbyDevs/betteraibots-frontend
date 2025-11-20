import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function IntermediateQuiz({ isEmbedded = false, onClose, onAdvance }) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const questions = [
    {
      question: "What is the CLEAR framework in advanced prompting?",
      options: [
        "A method for clearing AI cache",
        "A five-component prompt structure (Context, Logic, Examples, Action, Review)",
        "A way to clear browser history",
        "A technique for clearing memory"
      ],
      correct: 1
    },
    {
      question: "What is Chain-of-Thought (CoT) prompting?",
      options: [
        "A way to chain multiple AI models together",
        "Explicitly requesting step-by-step thinking processes",
        "A method for linking thoughts in a chain",
        "A technique for chaining prompts together"
      ],
      correct: 1
    },
    {
      question: "What percentage improvement in accuracy can CoT prompting achieve on complex analytical tasks?",
      options: [
        "10-20%",
        "30-50%",
        "85-90%",
        "95-100%"
      ],
      correct: 2
    },
    {
      question: "What is Few-Shot prompting?",
      options: [
        "Providing many examples to train the AI",
        "Providing 3-5 carefully crafted examples to guide AI behavior",
        "Shooting prompts at the AI quickly",
        "Using few words in prompts"
      ],
      correct: 1
    },
    {
      question: "What is AI workflow orchestration?",
      options: [
        "Conducting an orchestra with AI",
        "Understanding trigger events, data flow patterns, and decision trees",
        "Orchestrating music with AI",
        "Managing AI workflows manually"
      ],
      correct: 1
    },
    {
      question: "What do organizations with robust data foundations achieve compared to those without?",
      options: [
        "Same AI implementation success rates",
        "2x better AI implementation success rates",
        "3x better AI implementation success rates",
        "4x better AI implementation success rates"
      ],
      correct: 2
    },
    {
      question: "What are Agentic AI systems?",
      options: [
        "AI systems that work for agents",
        "Systems that operate autonomously to achieve business objectives",
        "AI systems that act like agents",
        "Systems that require constant human supervision"
      ],
      correct: 1
    },
    {
      question: "What do multimodal AI capabilities process?",
      options: [
        "Only text",
        "Only images",
        "Text, images, audio, and video",
        "Only audio and video"
      ],
      correct: 2
    },
    {
      question: "What is the first phase of strategic AI implementation?",
      options: [
        "Implementing workflow automation",
        "Establishing advanced prompting expertise",
        "Deploying strategic AI integration",
        "Setting up basic AI tools"
      ],
      correct: 1
    },
    {
      question: "What percentage of organizations using AI strategically report ROI within the first year?",
      options: [
        "50%",
        "60%",
        "74%",
        "85%"
      ],
      correct: 2
    }
  ];

  const selectOption = (optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: optionIndex
    });
  };

  const nextQuestion = () => {
    if (selectedOptions[currentQuestion] !== undefined) {
      const isCorrect = selectedOptions[currentQuestion] === questions[currentQuestion].correct;
      if (isCorrect) {
        setScore(score + 1);
      }
      
      setUserAnswers({
        ...userAnswers,
        [currentQuestion]: selectedOptions[currentQuestion]
      });

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResults();
      }
    }
  };

  const calculateResults = () => {
    let finalScore = score;
    if (selectedOptions[currentQuestion] === questions[currentQuestion].correct) {
      finalScore += 1;
    }
    setScore(finalScore);
    setShowResults(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers({});
    setShowResults(false);
    setShowScorecard(false);
    setSelectedOptions({});
  };

  const handleAdvance = () => {
    if (onAdvance) {
      onAdvance();
    } else {
      // Store in localStorage for persistence
      localStorage.setItem('aiLevel', 'advanced');
      
      // Show mini celebration
      const celebration = document.createElement('div');
      celebration.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-in;
        ">
          <div style="
            background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #8b5cf6 100%);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
            max-width: 350px;
            margin: 20px;
          ">
            <div style="font-size: 40px; margin-bottom: 15px;">🚀</div>
            <h2 style="color: white; font-size: 1.8rem; font-weight: bold; margin-bottom: 10px;">
              Level Up!
            </h2>
            <p style="color: white; font-size: 1.1rem; margin-bottom: 15px; font-weight: 600;">
              Welcome to Advanced Level
            </p>
            <p style="color: white; font-size: 0.95rem;">
              You're ready for expert AI concepts!
            </p>
          </div>
        </div>
      `;
      document.body.appendChild(celebration);
      
      // Add fadeIn animation if not already in styles
      if (!document.getElementById('quiz-celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'quiz-celebration-styles';
        style.textContent = `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Navigate after celebration (2 seconds)
      setTimeout(() => {
        document.body.removeChild(celebration);
        navigate('/learn/advanced');
      }, 2000);
    }
  };

  const showShareFeedback = (platform) => {
    const message = document.createElement('div');
    message.textContent = `Shared to ${platform}!`;
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #8b5cf6, #a855f7);
      color: #fff;
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
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
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
    const url = 'https://betteraibots.com/intermediate-ai-quiz.html';
    const text = `I just scored ${score}/10 on the Intermediate AI Quiz! Test your AI knowledge:`;
    
    try {
      // Try Web Share API first (mobile)
      if (navigator.share) {
        await navigator.share({
          title: 'Intermediate AI Quiz Results',
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
        const subject = 'Intermediate AI Quiz - Test Your Knowledge!';
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

  const getMessage = (score) => {
    if (score >= 9) return "Excellent! You're ready for advanced AI concepts!";
    if (score >= 7) return "Great job! You have solid intermediate AI knowledge!";
    if (score >= 5) return "Good work! Keep practicing to master intermediate concepts!";
    return "Keep learning! Review the intermediate guide and try again!";
  };

  if (!isEmbedded) {
    return (
      <>
        <Helmet>
          <title>Intermediate AI Quiz – BetterAiBots.com</title>
          <meta name="description" content="Test your intermediate AI knowledge with our comprehensive quiz. Advance to expert level with BetterAiBots." />
          <meta name="keywords" content="intermediate AI quiz, AI knowledge test, AI learning, BetterAiBots" />
          <meta property="og:title" content="Intermediate AI Quiz – BetterAiBots.com" />
          <meta property="og:description" content="Test your intermediate AI knowledge and advance to expert level." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://betteraibots.com/quiz/intermediate" />
          <meta property="og:image" content="https://betteraibots.com/og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Intermediate AI Quiz – BetterAiBots.com" />
          <meta name="twitter:description" content="Test your intermediate AI knowledge and advance to expert level." />
          <meta name="twitter:image" content="https://betteraibots.com/og-image.png" />
          <link rel="canonical" href="https://betteraibots.com/quiz/intermediate" />
        </Helmet>
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: '#8b5cf6', textAlign: 'center', marginBottom: '30px' }}>
            Intermediate AI Quiz
          </h1>
          {/* Quiz content will be rendered below */}
        </div>
      </>
    );
  }

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
          className="quiz-scrollbar"
          style={{
          background: 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
          border: '2px solid #8b5cf6',
          borderRadius: '20px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3)'
        }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
          color: '#101c26',
          padding: '20px 30px',
          borderRadius: '18px 18px 0 0',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700',
              textShadow: '0 0 10px rgba(16, 28, 38, 0.3)'
            }}>
              Intermediate AI Quiz
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#101c26',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(16, 28, 38, 0.5)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(16, 28, 38, 0.3)'}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: '30px',
          color: '#d1efe7'
        }}>
          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div style={{
                background: 'rgba(139, 92, 246, 0.2)',
                borderRadius: '10px',
                height: '8px',
                marginBottom: '30px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                  height: '100%',
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Question */}
              <h2 style={{
                color: '#8b5cf6',
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '25px',
                lineHeight: '1.4'
              }}>
                Question {currentQuestion + 1} of {questions.length}
              </h2>

              <p style={{
                fontSize: '1.1rem',
                marginBottom: '30px',
                lineHeight: '1.5'
              }}>
                {questions[currentQuestion].question}
              </p>

              {/* Options */}
              <div style={{ marginBottom: '30px' }}>
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => selectOption(index)}
                    style={{
                      background: selectedOptions[currentQuestion] === index 
                        ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' 
                        : 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
                      border: selectedOptions[currentQuestion] === index 
                        ? '2px solid #8b5cf6' 
                        : '2px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '12px',
                      padding: '15px 20px',
                      marginBottom: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      color: selectedOptions[currentQuestion] === index ? '#101c26' : '#d1efe7'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedOptions[currentQuestion] !== index) {
                        e.target.style.border = '2px solid #8b5cf6';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedOptions[currentQuestion] !== index) {
                        e.target.style.border = '2px solid rgba(139, 92, 246, 0.3)';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ color: '#8b5cf6', fontSize: '0.9rem' }}>
                  {currentQuestion + 1} of {questions.length}
                </div>
                <button
                  onClick={nextQuestion}
                  disabled={selectedOptions[currentQuestion] === undefined}
                  style={{
                    background: selectedOptions[currentQuestion] !== undefined 
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' 
                      : 'rgba(139, 92, 246, 0.3)',
                    color: selectedOptions[currentQuestion] !== undefined ? '#101c26' : '#666',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 30px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: selectedOptions[currentQuestion] !== undefined ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedOptions[currentQuestion] !== undefined) {
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedOptions[currentQuestion] !== undefined) {
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </>
          ) : (
            /* Results Screen */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px auto',
                fontSize: '3rem'
              }}>
                {score >= 7 ? '🚀' : score >= 5 ? '👍' : '📚'}
              </div>

              <h2 style={{
                color: '#8b5cf6',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '15px'
              }}>
                Quiz Complete!
              </h2>

              <p style={{
                fontSize: '1.2rem',
                marginBottom: '10px',
                color: '#d1efe7'
              }}>
                Your Score: <strong style={{ color: '#8b5cf6' }}>{score}/{questions.length}</strong>
              </p>

              <p style={{
                fontSize: '1.1rem',
                marginBottom: '30px',
                color: '#d1efe7',
                fontStyle: 'italic'
              }}>
                {getMessage(score)}
              </p>

              {/* Scorecard Section */}
              <div style={{ marginTop: '30px' }}>
                <button
                  onClick={() => setShowScorecard(!showScorecard)}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                    color: '#101c26',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginBottom: '20px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {showScorecard ? '📊 Hide Detailed Answers' : '📊 Show Detailed Answers'}
                </button>
                
                {showScorecard && (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    padding: '20px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    marginTop: '15px'
                  }}>
                    <h3 style={{
                      marginBottom: '20px',
                      color: '#8b5cf6',
                      fontSize: '1.2rem',
                      textAlign: 'center'
                    }}>
                      📋 Your Detailed Results
                    </h3>
                    {questions.map((question, index) => {
                      const isCorrect = userAnswers[index] === question.correct;
                      const userAnswerText = userAnswers[index] !== undefined ? question.options[userAnswers[index]] : 'Not answered';
                      const correctAnswerText = question.options[question.correct];
                      
                      return (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          padding: '15px',
                          marginBottom: '10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '10px',
                          border: '1px solid rgba(139, 92, 246, 0.2)'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              color: '#8b5cf6',
                              fontWeight: 'bold',
                              marginBottom: '5px'
                            }}>
                              Question {index + 1}
                            </div>
                            <div style={{
                              color: '#e0e0e0',
                              fontSize: '0.9rem',
                              marginBottom: '8px'
                            }}>
                              {question.question}
                            </div>
                            <div style={{ fontSize: '0.85rem' }}>
                              <span style={{ color: '#e0e0e0' }}>
                                Your answer: <span style={{
                                  color: isCorrect ? '#22c55e' : '#ef4444',
                                  fontWeight: 'bold'
                                }}>
                                  {userAnswerText}
                                </span>
                              </span>
                              {!isCorrect && (
                                <>
                                  <br />
                                  <span style={{ color: '#e0e0e0' }}>
                                    Correct answer: <span style={{
                                      color: '#22c55e',
                                      fontWeight: 'bold'
                                    }}>
                                      {correctAnswerText}
                                    </span>
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div style={{ marginLeft: '15px' }}>
                            <span style={{
                              color: isCorrect ? '#22c55e' : '#ef4444',
                              fontSize: '1.2rem'
                            }}>
                              {isCorrect ? '✅' : '❌'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '20px'
              }}>
                <button
                  onClick={restartQuiz}
                  style={{
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '2px solid #8b5cf6',
                    color: '#8b5cf6',
                    borderRadius: '25px',
                    padding: '12px 25px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(139, 92, 246, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(139, 92, 246, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Retake Quiz
                </button>

                <button
                  onClick={onClose}
                  style={{
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '2px solid #8b5cf6',
                    color: '#8b5cf6',
                    borderRadius: '25px',
                    padding: '12px 25px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(139, 92, 246, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(139, 92, 246, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Back to Learn
                </button>

                {score >= 7 && (
                  <button
                    onClick={handleAdvance}
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                      color: '#101c26',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '12px 25px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Advance to Advanced Level
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div style={{
            marginTop: '40px',
            paddingTop: '30px',
            borderTop: '1px solid rgba(139, 92, 246, 0.2)'
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
      </div>
      </div>
    </>
  );
} 