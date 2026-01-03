import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Modal, Button } from 'react-bootstrap';

const MyAI = ({ trialApps = [], freeApps = [], paidApps = [] }) => {
  // Combine free apps, trial apps, and paid apps for tracking, then sort alphabetically
  const allApps = [...freeApps, ...trialApps, ...paidApps].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('baib_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [filter, setFilter] = useState('all'); // all, not_started, started, currently_using, hidden
  const [showHelpModal, setShowHelpModal] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    localStorage.setItem('baib_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const updateAppStatus = (appName, status, additionalData = {}) => {
    setProgress(prev => ({
      ...prev,
      [appName]: {
        ...(prev[appName] || {}),
        status,
        ...additionalData
      }
    }));
  };

  const updateNotes = (appName, notes) => {
    setProgress(prev => ({
      ...prev,
      [appName]: {
        ...(prev[appName] || {}),
        notes
      }
    }));
  };

  const updateDates = (appName, field, value) => {
    setProgress(prev => ({
      ...prev,
      [appName]: {
        ...(prev[appName] || {}),
        [field]: value
      }
    }));
  };

  const updateCost = (appName, cost) => {
    setProgress(prev => ({
      ...prev,
      [appName]: {
        ...(prev[appName] || {}),
        monthlyCost: cost ? parseFloat(cost) || 0 : 0
      }
    }));
  };

  // Calculate total monthly cost for all current users (completed status)
  const totalMonthlyCost = allApps.reduce((total, app) => {
    const appProgress = progress[app.name] || {};
    if (appProgress.status === 'completed' && appProgress.monthlyCost) {
      return total + (parseFloat(appProgress.monthlyCost) || 0);
    }
    return total;
  }, 0);

  // Calculate total current trials
  const totalCurrentTrials = allApps.filter(app => {
    const appProgress = progress[app.name] || {};
    return appProgress.status === 'started';
  }).length;

  // Calculate trials ending within 48 hours
  const trialsEndingSoon = allApps.filter(app => {
    const appProgress = progress[app.name] || {};
    if (appProgress.status === 'started' && appProgress.endDate) {
      const endDate = new Date(appProgress.endDate);
      const now = new Date();
      const hoursUntilEnd = (endDate - now) / (1000 * 60 * 60);
      return hoursUntilEnd > 0 && hoursUntilEnd <= 48;
    }
    return false;
  }).length;

  const filteredApps = allApps.filter(app => {
    const appProgress = progress[app.name] || {};
    if (filter === 'started') return appProgress.status === 'started';
    if (filter === 'currently_using') return appProgress.status === 'started' || appProgress.status === 'completed';
    if (filter === 'hidden') return appProgress.status === 'no_longer_want';
    return appProgress.status !== 'no_longer_want'; // Default: don't show "not interested" apps in 'all'
  });

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      color: '#f8fafd',
      minHeight: '100vh'
    }}>
      <Helmet>
        <title>My AI Dashboard | AI Trial Progress Tracker & Cost Management | BetterAiBots.com</title>
        <meta name="description" content="Track your AI trial progress, manage costs, and organize all your AI subscriptions in one dashboard. Monitor trial dates, set cancellation reminders, track monthly spending, and take notes on 100+ AI tools." />
        <meta name="keywords" content="AI trial tracker, AI progress dashboard, AI subscription manager, AI cost tracker, trial management, AI tools organizer, subscription tracking, AI spending tracker, BetterAiBots" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://betteraibots.com/my-ai" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://betteraibots.com/my-ai" />
        <meta property="og:title" content="My AI Dashboard | AI Trial Progress Tracker & Cost Management | BetterAiBots.com" />
        <meta property="og:description" content="Track your AI trial progress, manage costs, and organize all your AI subscriptions in one dashboard. Monitor trial dates, set cancellation reminders, track monthly spending, and take notes on 100+ AI tools." />
        <meta property="og:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="My AI Dashboard - AI Trial Progress Tracker" />
        <meta property="og:site_name" content="BetterAiBots.com" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://betteraibots.com/my-ai" />
        <meta name="twitter:title" content="My AI Dashboard | AI Trial Progress Tracker & Cost Management" />
        <meta name="twitter:description" content="Track your AI trial progress, manage costs, and organize all your AI subscriptions. Monitor trial dates, set cancellation reminders, and track monthly spending." />
        <meta name="twitter:image" content="https://betteraibots.com/og-image.png?v=3" />
        <meta name="twitter:image:alt" content="My AI Dashboard - AI Trial Progress Tracker" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "My AI Dashboard",
          "url": "https://betteraibots.com/my-ai",
          "description": "Track your AI trial progress, manage costs, and organize all your AI subscriptions in one dashboard. Monitor trial dates, set cancellation reminders, track monthly spending, and take notes on 100+ AI tools.",
          "applicationCategory": "ProductivityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "AI trial progress tracking",
            "Trial date management",
            "Cancellation reminders",
            "Monthly cost tracking",
            "Subscription organization",
            "Personal notes for each AI tool"
          ]
        })}
        </script>
      </Helmet>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <Link 
            to="/apps" 
            style={{ 
              color: '#36ff95', 
              textDecoration: 'none', 
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            ← Back to AI Apps Directory
          </Link>
        </div>
        <h1 style={{ color: '#36ff95', fontSize: '2.5rem', marginBottom: '15px', fontWeight: 700 }}>My AI Dashboard 🚀</h1>
        <p style={{ color: '#b5ffdb', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', marginBottom: '20px' }}>
          Your personal ai progress tracker for AI applications. Track your trials, your subscription costs, take notes, and organize your own custom app directory page.
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          {totalCurrentTrials > 0 && (
            <div style={{
              background: 'rgba(54, 255, 149, 0.1)',
              border: '2px solid #36ff95',
              borderRadius: '12px',
              padding: '16px 24px',
              display: 'inline-block',
              minWidth: '200px'
            }}>
              <div style={{ color: '#36ff95', fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>
                Total Current Trials
              </div>
              <div style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 700 }}>
                {totalCurrentTrials}
              </div>
            </div>
          )}
          {trialsEndingSoon > 0 && (
            <div style={{
              background: 'rgba(255, 179, 71, 0.1)',
              border: '2px solid #ffb347',
              borderRadius: '12px',
              padding: '16px 24px',
              display: 'inline-block',
              minWidth: '200px'
            }}>
              <div style={{ color: '#ffb347', fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>
                Trials Ending Soon (≤48h)
              </div>
              <div style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 700 }}>
                {trialsEndingSoon}
              </div>
            </div>
          )}
          {totalMonthlyCost > 0 && (
            <div style={{
              background: 'rgba(54, 255, 149, 0.1)',
              border: '2px solid #36ff95',
              borderRadius: '12px',
              padding: '16px 24px',
              display: 'inline-block',
              minWidth: '200px'
            }}>
              <div style={{ color: '#36ff95', fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>
                Total Monthly Cost
              </div>
              <div style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 700 }}>
                ${totalMonthlyCost.toFixed(2)}
              </div>
              <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '4px' }}>
                Across {allApps.filter(app => {
                  const appProgress = progress[app.name] || {};
                  return appProgress.status === 'completed' && appProgress.monthlyCost;
                }).length} active subscription{allApps.filter(app => {
                  const appProgress = progress[app.name] || {};
                  return appProgress.status === 'completed' && appProgress.monthlyCost;
                }).length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {['all', 'started', 'currently_using', 'hidden'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '10px 20px',
              borderRadius: '24px',
              border: filter === f ? '2px solid #36ff95' : '2px solid rgba(54, 255, 149, 0.2)',
              background: filter === f ? 'rgba(54, 255, 149, 0.1)' : 'transparent',
              color: filter === f ? '#36ff95' : '#b5ffdb',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'capitalize',
              transition: 'all 0.2s ease'
            }}
          >
            {f === 'all' ? 'All Apps' : f === 'hidden' ? 'Not Interested' : f === 'started' ? 'Started Trial' : f === 'currently_using' ? 'Currently Using' : f.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(54, 255, 149, 0.2)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <h2 style={{ color: '#36ff95', fontSize: '1.5rem', margin: 0, fontWeight: 600 }}>AI Usage Dashboard</h2>
          <button
            onClick={() => setShowHelpModal(true)}
            onMouseEnter={() => {
              if (!isMobile) {
                hoverTimeoutRef.current = setTimeout(() => {
                  setShowHelpModal(true);
                }, 800);
              }
            }}
            onMouseLeave={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
              }
            }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '1px solid #36ff95',
              background: 'rgba(54, 255, 149, 0.1)',
              color: '#36ff95',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              padding: 0,
              flexShrink: 0
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(54, 255, 149, 0.2)';
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 0 8px rgba(54, 255, 149, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(54, 255, 149, 0.1)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
            title="Hover or click to learn how to use this dashboard"
          >
            ?
          </button>
        </div>
        
        {filteredApps.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '40px' }}>
            No apps found in this category. Start tracking your first trial!
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '24px' }}>
            {filteredApps.map(app => {
              const appProgress = progress[app.name] || { status: 'pending', notes: '', startDate: '', endDate: '' };
              return (
                <div key={app.name} style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      {app.image && (
                        <img src={app.image} alt={app.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'contain' }} />
                      )}
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#ffffff' }}>{app.name}</h3>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#9ca3af' }}>{app.category}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <select 
                        value={appProgress.status || 'not_started'}
                        onChange={(e) => updateAppStatus(app.name, e.target.value)}
                        style={{
                          background: '#18232f',
                          color: '#36ff95',
                          border: '1px solid #36ff95',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="not_started">Not Started</option>
                        <option value="started">In Trial</option>
                        <option value="completed">Current User</option>
                        <option value="no_longer_want">Not Interested</option>
                      </select>
                      <a 
                        href={app.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          background: 'linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%)',
                          color: '#101c26',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(54, 255, 149, 0.2)',
                          minHeight: '38px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 16px rgba(54, 255, 149, 0.4)';
                          e.target.style.background = 'linear-gradient(135deg, #4affb3 0%, #1bd4f0 100%)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 2px 8px rgba(54, 255, 149, 0.2)';
                          e.target.style.background = 'linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%)';
                        }}
                      >
                        Visit Site
                      </a>
                      {app.readMoreLink && (
                        <Link 
                          to={app.readMoreLink}
                          style={{
                            background: 'rgba(54, 255, 149, 0.1)',
                            color: '#36ff95',
                            border: '1px solid #36ff95',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            minHeight: '38px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(54, 255, 149, 0.2)';
                            e.target.style.borderColor = '#4affb3';
                            e.target.style.color = '#ffffff';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(54, 255, 149, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                            e.target.style.borderColor = '#36ff95';
                            e.target.style.color = '#36ff95';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          Read More
                        </Link>
                      )}
                    </div>
                  </div>

                  {appProgress.status === 'started' && (
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                      gap: '15px',
                      background: 'rgba(54, 255, 149, 0.05)',
                      padding: '15px',
                      borderRadius: '8px'
                    }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#b5ffdb', marginBottom: '8px' }}>Trial Started</label>
                        <input 
                          type="date" 
                          value={appProgress.startDate || ''}
                          onChange={(e) => updateDates(app.name, 'startDate', e.target.value)}
                          style={{
                            width: '100%',
                            background: '#18232f',
                            border: '1px solid rgba(54, 255, 149, 0.3)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            padding: '8px',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#b5ffdb', marginBottom: '8px' }}>Cancel Reminder</label>
                        <input 
                          type="date" 
                          value={appProgress.cancelDate || ''}
                          onChange={(e) => updateDates(app.name, 'cancelDate', e.target.value)}
                          style={{
                            width: '100%',
                            background: '#18232f',
                            border: '1px solid rgba(54, 255, 149, 0.3)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            padding: '8px',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#b5ffdb', marginBottom: '8px' }}>Trial Ends</label>
                        <input 
                          type="date" 
                          value={appProgress.endDate || ''}
                          onChange={(e) => updateDates(app.name, 'endDate', e.target.value)}
                          style={{
                            width: '100%',
                            background: '#18232f',
                            border: '1px solid rgba(54, 255, 149, 0.3)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            padding: '8px',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {appProgress.status === 'completed' && (
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '15px',
                      background: 'rgba(54, 255, 149, 0.05)',
                      padding: '15px',
                      borderRadius: '8px'
                    }}>
                      <div style={{ width: '200px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#b5ffdb', marginBottom: '8px' }}>Monthly Cost ($)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={appProgress.monthlyCost || ''}
                          onChange={(e) => updateCost(app.name, e.target.value)}
                          style={{
                            width: '100%',
                            background: '#18232f',
                            border: '1px solid rgba(54, 255, 149, 0.3)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            padding: '8px',
                            fontSize: '0.9rem',
                            MozAppearance: 'textfield'
                          }}
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#b5ffdb', marginBottom: '8px' }}>Notes</label>
                    <textarea 
                      placeholder="Take notes on your experience with this app..."
                      value={appProgress.notes || ''}
                      onChange={(e) => updateNotes(app.name, e.target.value)}
                      style={{
                        width: '100%',
                        height: '100px',
                        background: '#1c2835',
                        border: '1px solid rgba(54, 255, 149, 0.1)',
                        borderRadius: '8px',
                        color: '#d1efe7',
                        padding: '12px',
                        fontSize: '0.95rem',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{
        padding: '24px',
        background: 'rgba(54, 255, 149, 0.05)',
        borderRadius: '16px',
        border: '1px solid rgba(54, 255, 149, 0.2)',
        fontSize: '0.9rem',
        color: '#9ca3af'
      }}>
        <h4 style={{ color: '#36ff95', marginBottom: '10px' }}>Dashboard Info</h4>
        <p>Your progress is stored locally in your browser. Clearing your browser data may remove these settings.</p>
        <p style={{ margin: 0 }}><strong>Disclaimer:</strong> We are not responsible for tracking or canceling your trials. Please ensure you set your dates correctly and cancel any subscriptions directly with the providers to avoid unwanted charges.</p>
      </div>

      {/* Help Modal */}
      <Modal 
        show={showHelpModal} 
        onHide={() => setShowHelpModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton style={{ background: '#18232f', borderBottom: '1px solid rgba(54, 255, 149, 0.2)' }}>
          <Modal.Title style={{ color: '#36ff95', fontWeight: 600 }}>
            📝 How to Use Your AI Dashboard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#18232f', color: '#d1efe7', padding: '24px' }}>
          <div style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
            <p style={{ marginBottom: '20px', color: '#b5ffdb' }}>
              Your <strong style={{ color: '#36ff95' }}>My AI Dashboard</strong> helps you organize, track, and manage all your AI trial subscriptions in one place. Here's how to use it:
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#36ff95', marginBottom: '10px', fontSize: '1.1rem' }}>🎯 Track Your Trial Status</h4>
              <p style={{ marginBottom: '12px' }}>
                Use the dropdown menu for each app to set its status:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <li><strong>Not Started</strong> - You haven't signed up yet</li>
                <li><strong>In Trial</strong> - You're actively using the trial (this will show date fields and cost input)</li>
                <li><strong>Current User</strong> - You've completed the trial and are currently using this app</li>
                <li><strong>Not Interested</strong> - Hide this app from your main Apps page</li>
              </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#36ff95', marginBottom: '10px', fontSize: '1.1rem' }}>📅 Set Important Dates</h4>
              <p style={{ marginBottom: '12px' }}>
                When you mark an app as <strong>In Trial</strong>, you can track:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <li><strong>Trial Started</strong> - The date you signed up</li>
                <li><strong>Cancel Reminder</strong> - Set a date to remind yourself to cancel before charges</li>
                <li><strong>Trial Ends</strong> - When your free trial expires</li>
                <li><strong>Monthly Cost</strong> - Enter how much you're paying per month (use 0 for free apps)</li>
              </ul>
              <p style={{ marginBottom: '12px', fontSize: '0.9rem', color: '#9ca3af' }}>
                💡 <strong>Tip:</strong> Set your cancel reminder a few days before the trial ends to give yourself time to decide.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#36ff95', marginBottom: '10px', fontSize: '1.1rem' }}>💰 Track Your Spending</h4>
              <p style={{ marginBottom: '12px' }}>
                When you mark an app as <strong>In Trial</strong>, you can add its monthly cost. This helps you:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <li>See your <strong>total monthly spending</strong> across all AI subscriptions</li>
                <li>Track costs for both <strong>free and paid</strong> apps (including ChatGPT, Claude, Gemini)</li>
                <li>Make informed decisions about which subscriptions to keep</li>
                <li>Monitor your AI tool budget in one place</li>
              </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#36ff95', marginBottom: '10px', fontSize: '1.1rem' }}>📝 Take Notes</h4>
              <p style={{ marginBottom: '12px' }}>
                Use the Notes field to record your experience with each app:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <li>What features you liked or didn't like</li>
                <li>How easy it was to use</li>
                <li>Whether you plan to continue after the trial</li>
                <li>Any tips or tricks you discovered</li>
              </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#36ff95', marginBottom: '10px', fontSize: '1.1rem' }}>🔍 Filter Your List</h4>
              <p style={{ marginBottom: '12px' }}>
                Use the filter buttons at the top to view:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <li><strong>All Apps</strong> - See everything except apps marked as "Not Interested"</li>
                <li><strong>Started Trial</strong> - Apps with active trials</li>
                <li><strong>Currently Using</strong> - Apps you're currently using (includes active trials)</li>
                <li><strong>Not Interested</strong> - Apps you don't want to see (excluded from main apps list)</li>
              </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#36ff95', marginBottom: '10px', fontSize: '1.1rem' }}>🚀 Enable Progress Mode</h4>
              <p style={{ marginBottom: '12px' }}>
                Go back to the <strong>Apps page</strong> and enable <strong>Progress Mode</strong>. This will automatically hide apps you've started, completed, or marked as "Not Interested", keeping your workspace clean and focused on new opportunities.
              </p>
            </div>

            <div style={{ 
              background: 'rgba(54, 255, 149, 0.1)', 
              border: '1px solid rgba(54, 255, 149, 0.3)', 
              borderRadius: '8px', 
              padding: '12px',
              marginTop: '20px'
            }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#9ca3af' }}>
                <strong style={{ color: '#36ff95' }}>Remember:</strong> All your data is stored locally in your browser. We don't track or cancel trials for you - you're responsible for managing your own subscriptions and canceling before charges occur.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ background: '#18232f', borderTop: '1px solid rgba(54, 255, 149, 0.2)' }}>
          <Button 
            onClick={() => setShowHelpModal(false)}
            style={{
              background: 'linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%)',
              border: 'none',
              color: '#101c26',
              fontWeight: 600,
              padding: '8px 20px'
            }}
          >
            Got it!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyAI;

