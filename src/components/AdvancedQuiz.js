import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const AdvancedQuiz = ({ isEmbedded = false, onClose, onAdvance }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const correctAnswers = ['b', 'c', 'a', 'd', 'a', 'c', 'b', 'd', 'b', 'a', 'b', 'c', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'];
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
    },
    {
      text: "What is the primary purpose of enterprise AI governance frameworks?",
      options: ["A) To restrict AI innovation and slow down development", "B) To establish ethical standards, regulatory compliance, and stakeholder trust while enabling innovation", "C) To increase AI development costs and complexity", "D) To replace human decision-making entirely"],
      correct: "B) To establish ethical standards, regulatory compliance, and stakeholder trust while enabling innovation"
    },
    {
      text: "Which technique is most effective for creating domain-specific AI models that outperform general-purpose models?",
      options: ["A) Using only prompt engineering", "B) Fine-tuning with techniques like LoRA (Low-Rank Adaptation)", "C) Training models from scratch", "D) Using only pre-trained models without modification"],
      correct: "B) Fine-tuning with techniques like LoRA (Low-Rank Adaptation)"
    },
    {
      text: "What is the key benefit of composable AI frameworks?",
      options: ["A) They reduce system reliability", "B) They increase vendor lock-in", "C) They enable rapid experimentation and deployment while maintaining enterprise-grade security", "D) They simplify AI architecture to basic components only"],
      correct: "C) They enable rapid experimentation and deployment while maintaining enterprise-grade security"
    },
    {
      text: "What is the recommended approach for deploying AI capabilities across an organization?",
      options: ["A) Deploy all AI systems simultaneously across the entire organization", "B) Start with high-value, low-risk use cases and gradually expand", "C) Deploy only in IT departments first", "D) Wait until all employees are fully trained before any deployment"],
      correct: "B) Start with high-value, low-risk use cases and gradually expand"
    },
    {
      text: "What is the primary advantage of multi-agent orchestration systems?",
      options: ["A) They reduce the need for human oversight", "B) They coordinate multiple specialized AI agents to handle complex business processes", "C) They eliminate the need for data architecture", "D) They simplify AI implementation to single-agent systems"],
      correct: "B) They coordinate multiple specialized AI agents to handle complex business processes"
    },
    {
      text: "What is the purpose of AI observability and monitoring systems?",
      options: ["A) To increase system complexity", "B) To enable real-time governance enforcement and continuous improvement", "C) To replace human monitoring entirely", "D) To reduce system performance"],
      correct: "B) To enable real-time governance enforcement and continuous improvement"
    },
    {
      text: "What is the key characteristic of agentic AI systems?",
      options: ["A) They require constant human supervision", "B) They operate autonomously to achieve business objectives with minimal human oversight", "C) They only work in controlled laboratory environments", "D) They are limited to simple, repetitive tasks only"],
      correct: "B) They operate autonomously to achieve business objectives with minimal human oversight"
    },
    {
      text: "What is the primary goal of ROI measurement frameworks for AI initiatives?",
      options: ["A) To justify increased AI spending", "B) To track productivity gains, cost reductions, and strategic value creation", "C) To reduce AI implementation costs", "D) To eliminate the need for business case development"],
      correct: "B) To track productivity gains, cost reductions, and strategic value creation"
    },
    {
      text: "What is the purpose of risk-based governance approaches?",
      options: ["A) To apply the same governance requirements to all AI applications", "B) To prioritize oversight resources on high-impact applications while enabling faster deployment of lower-risk use cases", "C) To eliminate all AI risks completely", "D) To slow down all AI development processes"],
      correct: "B) To prioritize oversight resources on high-impact applications while enabling faster deployment of lower-risk use cases"
    },
    {
      text: "What is the key success factor for advanced AI practitioners?",
      options: ["A) Focusing only on technical implementation", "B) Treating AI as business transformation rather than technology deployment", "C) Implementing AI without considering organizational change", "D) Deploying AI systems without governance frameworks"],
      correct: "B) Treating AI as business transformation rather than technology deployment"
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
    setShowScorecard(false);
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

  const progress = (currentQuestion / 20) * 100;

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
                color: '#d1efe7',
                whiteSpace: 'pre-line'
              }}>
                {score >= 8 ? <span dangerouslySetInnerHTML={{ __html: 'Advanced Quiz<br>Get Pro Status' }} /> : 
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
                             {score >= 16 && (
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
              
              {/* Scorecard Section */}
              <div style={{ marginTop: '30px' }}>
                <button
                  onClick={() => setShowScorecard(!showScorecard)}
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #ffb347)',
                    color: '#1a2330',
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
                    e.target.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)';
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
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    marginTop: '15px'
                  }}>
                    <h3 style={{
                      marginBottom: '20px',
                      color: '#ffd700',
                      fontSize: '1.2rem',
                      textAlign: 'center'
                    }}>
                      📋 Your Detailed Results
                    </h3>
                                         {questions.map((question, index) => {
                       const isCorrect = userAnswers[index] === correctAnswers[index];
                       const userAnswerText = userAnswers[index] ? questions[index].options[['a', 'b', 'c', 'd'].indexOf(userAnswers[index])] : 'Not answered';
                       const correctAnswerText = questions[index].options[['a', 'b', 'c', 'd'].indexOf(correctAnswers[index])];
                       
                       return (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          padding: '15px',
                          marginBottom: '10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 215, 0, 0.2)'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              color: '#ffd700',
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
                              {question.text}
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
                color: '#d1efe7',
                whiteSpace: 'pre-line'
              }}>
                {score >= 8 ? <span dangerouslySetInnerHTML={{ __html: 'Advanced Quiz<br>Get Pro Status' }} /> : 
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