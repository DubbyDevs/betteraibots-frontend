import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const AdvancedQuiz = ({ isEmbedded = false, onClose, onAdvance }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const correctAnswers = ['b', 'c', 'a', 'd', 'b', 'c', 'a', 'd', 'b', 'c'];
  const questions = [
    {
      text: "What is the primary challenge in implementing AI at enterprise scale?",
      options: ["A) Cost of computation", "B) Data governance and compliance", "C) Model accuracy", "D) User adoption"],
      correct: "B) Data governance and compliance"
    },
    {
      text: "Which AI architecture pattern is most effective for real-time decision making?",
      options: ["A) Batch processing", "B) Event-driven", "C) Stream processing with ML", "D) All of the above"],
      correct: "C) Stream processing with ML"
    },
    {
      text: "What is the key principle behind successful AI ethics implementation?",
      options: ["A) Transparency and accountability", "B) Maximum automation", "C) Cost optimization", "D) Speed of deployment"],
      correct: "A) Transparency and accountability"
    },
    {
      text: "Which approach is most effective for reducing AI bias in production systems?",
      options: ["A) Larger training datasets", "B) More complex models", "C) Regular retraining", "D) Continuous monitoring and feedback loops"],
      correct: "D) Continuous monitoring and feedback loops"
    },
    {
      text: "What is the optimal strategy for AI model deployment in high-stakes environments?",
      options: ["A) Gradual rollout with A/B testing", "B) Immediate full deployment", "C) Manual review of all outputs", "D) Human-in-the-loop validation"],
      correct: "A) Gradual rollout with A/B testing"
    },
    {
      text: "Which metric is most important for evaluating AI system reliability?",
      options: ["A) Model accuracy", "B) Response time", "C) System availability and uptime", "D) Training time"],
      correct: "C) System availability and uptime"
    },
    {
      text: "What is the primary benefit of using federated learning in enterprise AI?",
      options: ["A) Improved model performance", "B) Data privacy preservation", "C) Reduced computational costs", "D) Faster training"],
      correct: "B) Data privacy preservation"
    },
    {
      text: "Which AI governance framework is most comprehensive for enterprise deployment?",
      options: ["A) ISO 27001", "B) GDPR compliance", "C) NIST AI Risk Management", "D) All of the above"],
      correct: "D) All of the above"
    },
    {
      text: "What is the key success factor for AI transformation in large organizations?",
      options: ["A) Technology selection", "B) Change management and culture", "C) Budget allocation", "D) Vendor selection"],
      correct: "B) Change management and culture"
    },
    {
      text: "Which approach ensures long-term AI system sustainability?",
      options: ["A) Continuous learning and adaptation", "B) Static model deployment", "C) Periodic updates", "D) Manual intervention"],
      correct: "A) Continuous learning and adaptation"
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

  const handleProStatus = () => {
    if (onAdvance) {
      onAdvance();
    } else {
      // Store in localStorage for persistence
      localStorage.setItem('aiLevel', 'pro');
      localStorage.setItem('proStatus', 'true');
      alert('👑 Congratulations! You are now a Pro! Welcome to the elite AI community!');
    }
  };

  const progress = (currentQuestion / 10) * 100;

  if (isEmbedded) {
    return (
      <div style={{
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
        <div style={{
          background: 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          border: '2px solid #ffd700',
          boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
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
              color: '#ffd700',
              textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
            }}>
              Advanced AI Quiz - Pro Certification
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
                color: '#ffd700',
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
              background: 'linear-gradient(90deg, #ffd700, #ffb347)',
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
              border: '1px solid rgba(255, 215, 0, 0.2)'
            }}>
              <div style={{
                color: '#ffd700',
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
                        background: isSelected ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${isSelected ? '#ffd700' : 'rgba(255, 255, 255, 0.1)'}`,
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
                          e.target.style.borderColor = '#ffd700';
                          e.target.style.background = 'rgba(255, 215, 0, 0.1)';
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
                  background: selectedOptions[currentQuestion] ? 'linear-gradient(135deg, #ffd700, #ffb347)' : 'rgba(255, 255, 255, 0.1)',
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
                    e.target.style.boxShadow = '0 10px 20px rgba(255, 215, 0, 0.3)';
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
              border: '1px solid rgba(255, 215, 0, 0.2)'
            }}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: `conic-gradient(#ffd700 0deg, #ffd700 ${(score / 10) * 360}deg, rgba(255, 255, 255, 0.1) ${(score / 10) * 360}deg)`,
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
                  color: '#ffd700'
                }}>
                  {score}/10
                </div>
              </div>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: '#d1efe7'
              }}>
                {score >= 8 ? '👑 Congratulations! You are now a Pro!' : 
                 score >= 6 ? '📚 Excellent work! Almost there!' : 
                 '🤔 Time to review the advanced concepts!'}
              </div>
              <div style={{
                color: '#9ca3af',
                fontSize: '1.1rem',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                {score >= 8 ? 'You have demonstrated expert-level AI knowledge and are now certified as a Pro! Welcome to the elite AI community with access to exclusive content and features.' :
                 score >= 6 ? `You scored ${score}/10. You're very close to Pro status! Review the advanced concepts and retake the quiz. You need at least 8 correct answers for Pro certification.` :
                 `You scored ${score}/10. We recommend thoroughly reviewing the advanced AI concepts before retaking the quiz. Focus on enterprise implementation, ethics, and governance.`}
              </div>
              <button
                onClick={restartQuiz}
                style={{
                  background: 'linear-gradient(135deg, #ffd700, #ffb347)',
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
                  e.target.style.boxShadow = '0 10px 20px rgba(255, 215, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Retake Quiz
              </button>
              {score >= 8 && (
                <button
                  onClick={handleProStatus}
                  style={{
                    background: 'linear-gradient(135deg, #36ff95, #0bbfdb)',
                    color: '#1a2330',
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
                    e.target.style.boxShadow = '0 10px 20px rgba(54, 255, 149, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Claim Pro Status
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standalone page version
  return (
    <>
      <Helmet>
        <title>Advanced AI Quiz - Pro Certification – BetterAiBots.com</title>
        <meta name="description" content="Test your advanced AI knowledge and earn Pro certification with our comprehensive expert-level quiz." />
        <meta property="og:title" content="Advanced AI Quiz - Pro Certification – BetterAiBots.com" />
        <meta property="og:description" content="Test your advanced AI knowledge and earn Pro certification!" />
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
            border: '1px solid rgba(255, 215, 0, 0.2)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              <span style={{ color: '#9ca3af' }}>Better</span>
              <span style={{ color: '#ffd700' }}>Ai</span>
              <span style={{ color: '#ffd700' }}>Bots</span>
            </div>
            <div style={{
              fontSize: '1.8rem',
              marginBottom: '10px',
              background: 'linear-gradient(45deg, #ffd700, #ffb347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Advanced AI Quiz - Pro Certification
            </div>
            <div style={{
              color: '#9ca3af',
              fontSize: '1.1rem'
            }}>
              Test your expert knowledge and earn Pro status!
            </div>
          </div>

          {/* Quiz Content - Same as embedded version */}
          {!showResults ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(255, 215, 0, 0.2)'
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
                  background: 'linear-gradient(90deg, #ffd700, #ffb347)',
                  width: `${progress}%`,
                  transition: 'width 0.3s ease',
                  borderRadius: '10px'
                }} />
              </div>

              <div style={{
                color: '#ffd700',
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
                        background: isSelected ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${isSelected ? '#ffd700' : 'rgba(255, 255, 255, 0.1)'}`,
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
                          e.target.style.borderColor = '#ffd700';
                          e.target.style.background = 'rgba(255, 215, 0, 0.1)';
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
                  background: selectedOptions[currentQuestion] ? 'linear-gradient(135deg, #ffd700, #ffb347)' : 'rgba(255, 255, 255, 0.1)',
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
                    e.target.style.boxShadow = '0 10px 20px rgba(255, 215, 0, 0.3)';
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
              border: '1px solid rgba(255, 215, 0, 0.2)'
            }}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: `conic-gradient(#ffd700 0deg, #ffd700 ${(score / 10) * 360}deg, rgba(255, 255, 255, 0.1) ${(score / 10) * 360}deg)`,
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
                  color: '#ffd700'
                }}>
                  {score}/10
                </div>
              </div>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: '#d1efe7'
              }}>
                {score >= 8 ? '👑 Congratulations! You are now a Pro!' : 
                 score >= 6 ? '📚 Excellent work! Almost there!' : 
                 '🤔 Time to review the advanced concepts!'}
              </div>
              <div style={{
                color: '#9ca3af',
                fontSize: '1.1rem',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                {score >= 8 ? 'You have demonstrated expert-level AI knowledge and are now certified as a Pro! Welcome to the elite AI community with access to exclusive content and features.' :
                 score >= 6 ? `You scored ${score}/10. You're very close to Pro status! Review the advanced concepts and retake the quiz. You need at least 8 correct answers for Pro certification.` :
                 `You scored ${score}/10. We recommend thoroughly reviewing the advanced AI concepts before retaking the quiz. Focus on enterprise implementation, ethics, and governance.`}
              </div>
              <button
                onClick={restartQuiz}
                style={{
                  background: 'linear-gradient(135deg, #ffd700, #ffb347)',
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
                  e.target.style.boxShadow = '0 10px 20px rgba(255, 215, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Retake Quiz
              </button>
              {score >= 8 && (
                <button
                  onClick={handleProStatus}
                  style={{
                    background: 'linear-gradient(135deg, #36ff95, #0bbfdb)',
                    color: '#1a2330',
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
                    e.target.style.boxShadow = '0 10px 20px rgba(54, 255, 149, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Claim Pro Status
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvancedQuiz; 