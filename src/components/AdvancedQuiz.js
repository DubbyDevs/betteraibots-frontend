import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const AdvancedQuiz = ({ isEmbedded = false, onClose, onAdvance }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const correctAnswers = ['b', 'c', 'a', 'd', 'a', 'c', 'b', 'd', 'b', 'a', 'b', 'b', 'c', 'b', 'b', 'b', 'b', 'b', 'b', 'b'];
  const questions = [
    {
      text: "What is a primary challenge when implementing AI at enterprise scale?",
      options: ["A) Cost of computation alone", "B) Data governance, privacy, and compliance across systems", "C) Choosing a chat UI theme", "D) Writing shorter prompts only"],
      correct: "B) Data governance, privacy, and compliance across systems"
    },
    {
      text: "Which approach is generally best for real-time AI decisions on live data?",
      options: ["A) Overnight batch jobs only", "B) Monthly spreadsheet exports", "C) Stream or event-driven processing with models in the loop", "D) Retraining a foundation model from scratch for every request"],
      correct: "C) Stream or event-driven processing with models in the loop"
    },
    {
      text: "What is a core principle of responsible AI ethics programs?",
      options: ["A) Transparency and accountability", "B) Maximum automation with no review", "C) Cost cutting above all else", "D) Shipping as fast as possible with no documentation"],
      correct: "A) Transparency and accountability"
    },
    {
      text: "Which approach best helps reduce harmful bias in production AI systems?",
      options: ["A) Using only larger models with no evaluation", "B) Ignoring edge cases after launch", "C) Never measuring outcomes by demographic or segment", "D) Continuous monitoring, evaluation, and feedback loops"],
      correct: "D) Continuous monitoring, evaluation, and feedback loops"
    },
    {
      text: "What is a strong deployment strategy for high-stakes AI use cases?",
      options: ["A) Gradual rollout with testing and safeguards", "B) Immediate full production cutover with no monitoring", "C) Skipping evaluation because demos looked good", "D) Disabling all logging for privacy theater"],
      correct: "A) Gradual rollout with testing and safeguards"
    },
    {
      text: "Which reliability concern matters beyond raw model accuracy?",
      options: ["A) Font choice in dashboards", "B) How long training took last year", "C) Availability, latency, and consistent uptime under load", "D) Whether the logo uses neon green"],
      correct: "C) Availability, latency, and consistent uptime under load"
    },
    {
      text: "What is the primary benefit of federated learning?",
      options: ["A) Guaranteed higher accuracy than any centralized model", "B) Training across decentralized data sources while reducing raw data sharing", "C) Eliminating the need for any security controls", "D) Making GPUs unnecessary"],
      correct: "B) Training across decentralized data sources while reducing raw data sharing"
    },
    {
      text: "Which statement about enterprise AI governance is most accurate?",
      options: ["A) Only ISO 27001 matters and nothing else", "B) Only marketing approvals are required", "C) Governance is optional once a model is accurate", "D) Strong programs combine security, privacy/compliance, and AI risk management practices"],
      correct: "D) Strong programs combine security, privacy/compliance, and AI risk management practices"
    },
    {
      text: "What often determines whether large-organization AI initiatives succeed?",
      options: ["A) Buying the trendiest vendor logo", "B) Change management, skills, and culture alongside the technology", "C) Skipping stakeholder communication", "D) Deploying tools without process redesign"],
      correct: "B) Change management, skills, and culture alongside the technology"
    },
    {
      text: "Which approach best supports long-term AI system sustainability?",
      options: ["A) Continuous evaluation, updates, and adaptation", "B) Deploy once and never revisit performance", "C) Freeze prompts forever with no versioning", "D) Hide failures from operators"],
      correct: "A) Continuous evaluation, updates, and adaptation"
    },
    {
      text: "What is the primary purpose of enterprise AI governance frameworks?",
      options: ["A) To block all innovation", "B) To set ethical standards, compliance expectations, and trust while still enabling useful delivery", "C) To maximize paperwork with no business value", "D) To replace every human decision automatically"],
      correct: "B) To set ethical standards, compliance expectations, and trust while still enabling useful delivery"
    },
    {
      text: "Which technique is usually most practical for specializing a general model to a domain?",
      options: ["A) Prompting only, with no evaluation ever", "B) Parameter-efficient fine-tuning such as LoRA on high-quality domain data", "C) Training a frontier-scale model from scratch for every team", "D) Ignoring domain data and hoping generic answers suffice"],
      correct: "B) Parameter-efficient fine-tuning such as LoRA on high-quality domain data"
    },
    {
      text: "What is a key benefit of composable AI architectures?",
      options: ["A) They force permanent vendor lock-in", "B) They make security impossible", "C) They let teams assemble and swap components for faster experimentation with controlled interfaces", "D) They remove the need for testing"],
      correct: "C) They let teams assemble and swap components for faster experimentation with controlled interfaces"
    },
    {
      text: "What is the recommended approach for rolling out AI across an organization?",
      options: ["A) Launch every use case company-wide on day one", "B) Start with high-value, lower-risk use cases, learn, then expand", "C) Restrict AI forever to one intern laptop", "D) Wait until every employee is certified before any pilot"],
      correct: "B) Start with high-value, lower-risk use cases, learn, then expand"
    },
    {
      text: "What is the primary advantage of multi-agent orchestration?",
      options: ["A) Removing all need for data quality", "B) Coordinating specialized agents/tools across complex multi-step workflows", "C) Guaranteeing zero errors without monitoring", "D) Replacing networking and databases entirely"],
      correct: "B) Coordinating specialized agents/tools across complex multi-step workflows"
    },
    {
      text: "What is the purpose of AI observability and monitoring?",
      options: ["A) To make systems slower on purpose", "B) To detect drift, failures, and policy issues so teams can improve and govern in production", "C) To replace every human reviewer permanently", "D) To hide incidents from leadership"],
      correct: "B) To detect drift, failures, and policy issues so teams can improve and govern in production"
    },
    {
      text: "What characterizes agentic AI systems?",
      options: ["A) They only complete one-word answers", "B) They can plan and take multi-step actions toward goals with limited human oversight", "C) They never use tools or external data", "D) They only run offline with no objectives"],
      correct: "B) They can plan and take multi-step actions toward goals with limited human oversight"
    },
    {
      text: "What should an AI ROI framework primarily track?",
      options: ["A) Hype mentions on social media only", "B) Productivity gains, cost impact, quality, and strategic value on real workflows", "C) GPU marketing slogans", "D) Number of models downloaded with no outcomes"],
      correct: "B) Productivity gains, cost impact, quality, and strategic value on real workflows"
    },
    {
      text: "What is the purpose of risk-based AI governance?",
      options: ["A) Apply identical heavy controls to a spellchecker and a medical triage bot", "B) Focus stronger oversight on higher-impact systems while enabling faster iteration on lower-risk uses", "C) Eliminate uncertainty from every model forever", "D) Slow every experiment equally regardless of risk"],
      correct: "B) Focus stronger oversight on higher-impact systems while enabling faster iteration on lower-risk uses"
    },
    {
      text: "What is a key success factor for advanced AI practitioners?",
      options: ["A) Treating AI as only a model demo", "B) Treating AI as business and operating-model transformation, not just a tech install", "C) Ignoring change management and training", "D) Shipping without governance or evaluation"],
      correct: "B) Treating AI as business and operating-model transformation, not just a tech install"
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
    if (currentQuestion === 20) {
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
      
      // Show celebration message
      const celebration = document.createElement('div');
      celebration.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10060;
          animation: fadeIn 0.5s ease-in;
        ">
          <div style="
            background: linear-gradient(135deg, #ffd700 0%, #ffb347 50%, #ffd700 100%);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
            max-width: 400px;
            margin: 20px;
          ">
            <div style="font-size: 48px; margin-bottom: 20px;">👑</div>
            <h2 style="color: #1a2330; font-size: 2rem; font-weight: bold; margin-bottom: 10px;">
              PRO STATUS UNLOCKED!
            </h2>
            <p style="color: #1a2330; font-size: 1.2rem; margin-bottom: 20px; font-weight: 600;">
              Welcome to the Elite AI Community
            </p>
            <p style="color: #1a2330; font-size: 1rem;">
              You now have access to advanced content and exclusive features!
            </p>
          </div>
        </div>
      `;
      document.body.appendChild(celebration);
      
      // Add fadeIn animation if not already in styles
      if (!document.getElementById('pro-celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'pro-celebration-styles';
        style.textContent = `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Navigate after celebration (3 seconds)
      setTimeout(() => {
        document.body.removeChild(celebration);
        navigate('/learn/advanced');
      }, 3000);
    }
  };

  const showShareFeedback = (platform) => {
    const message = document.createElement('div');
    message.textContent = `Shared to ${platform}!`;
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ffd700, #ffb347);
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
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
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
    const url = 'https://betteraibots.com/advanced-ai-quiz.html';
    const text = `I just scored ${score}/20 on the Advanced AI Quiz! Test your AI knowledge:`;
    
    try {
      // Try Web Share API first (mobile)
      if (navigator.share) {
        await navigator.share({
          title: 'Advanced AI Quiz Results',
          text: text,
          url: url
        });
        showShareFeedback(platform);
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
        const subject = 'Advanced AI Quiz - Test Your Knowledge!';
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

  const progress = (currentQuestion / 20) * 100;

  if (isEmbedded) {
    return (
      <>
        <div 
          className="quiz-overlay"
          onClick={onClose}
          style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div 
            onClick={(e) => e.stopPropagation()}
            className="quiz-scrollbar quiz-modal quiz-modal--advanced"
            style={{
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
          <div className="quiz-progress-track" style={{
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
            <div className="quiz-content-box" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(255, 215, 0, 0.2)'
            }}>
              <div className="quiz-label" style={{
                color: '#ffd700',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                Question {currentQuestion} of 20
              </div>
              <div className="quiz-question" style={{
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
                      className={`quiz-option${isSelected ? ' quiz-option--selected' : ''}`}
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
                {score >= 16 ? 'You have demonstrated expert-level AI knowledge and are now certified as a Pro! Welcome to the elite AI community with access to exclusive content and features.' :
                 score >= 12 ? `You scored ${score}/20. You're very close to Pro status! Review the advanced concepts and retake the quiz. You need at least 16 correct answers for Pro certification.` :
                 `You scored ${score}/20. We recommend thoroughly reviewing the advanced AI concepts before retaking the quiz. Focus on enterprise implementation, ethics, and governance.`}
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
      </>
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
                Question {currentQuestion} of 20
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
                      className={`quiz-option${isSelected ? ' quiz-option--selected' : ''}`}
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
                                 {score >= 16 ? 'You have demonstrated expert-level AI knowledge and are now certified as a Pro! Welcome to the elite AI community with access to exclusive content and features.' :
                  score >= 12 ? `You scored ${score}/20. You're very close to Pro status! Review the advanced concepts and retake the quiz. You need at least 16 correct answers for Pro certification.` :
                  `You scored ${score}/20. We recommend thoroughly reviewing the advanced AI concepts before retaking the quiz. Focus on enterprise implementation, ethics, and governance.`}
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
                  Claim Pro Status
                </button>
              )}

              {/* Share Buttons */}
              <div style={{
                marginTop: '40px',
                paddingTop: '30px',
                borderTop: '1px solid rgba(255, 215, 0, 0.2)'
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

export default AdvancedQuiz; 