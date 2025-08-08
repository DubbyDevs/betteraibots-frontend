import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1a2330 0%, #0f1419 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff6b6b',
          fontFamily: 'Poppins, sans-serif',
          textAlign: 'center',
          padding: '20px',
          zIndex: 9999
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#ff6b6b'
          }}>
            Something went wrong
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#9ca3af',
            marginBottom: '30px',
            maxWidth: '500px'
          }}>
            We encountered an unexpected error. This might be due to cached data. Try refreshing the page or clearing your cache.
          </div>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              background: 'linear-gradient(135deg, #36ff95, #0bbfdb)',
              color: '#1a2330',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '15px'
            }}
          >
            Refresh Page
          </button>
          
          <button 
            onClick={() => window.location.href = '/clear-cache'} 
            style={{
              background: 'rgba(255, 107, 107, 0.1)',
              color: '#ff6b6b',
              border: '1px solid #ff6b6b',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '15px'
            }}
          >
            Clear Cache
          </button>
          
          <button 
            onClick={() => this.setState({ hasError: false })} 
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#9ca3af',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 