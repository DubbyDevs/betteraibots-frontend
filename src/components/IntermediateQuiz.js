import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function IntermediateQuiz({ isEmbedded = false, onClose, onAdvance }) {
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
    }
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
    <div style={{
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
      <div style={{
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
        </div>
      </div>
    </div>
  );
} 