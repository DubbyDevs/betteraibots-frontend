import React from 'react';
import { Helmet } from 'react-helmet-async';
import welcometobaib from './assets/welcometobaib.jpg';

function Podcast() {
  return (
    <>
      <Helmet>
        <title>Podcast - BetterAiBots</title>
        <meta name="description" content="BetterAiBots Podcast - AI tools, news, and educational content" />
      </Helmet>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%',
        marginTop: '0',
        marginBottom: '20px',
        padding: '20px'
      }}>
        <div style={{
          position: 'relative',
          maxWidth: '600px',
          width: '100%',
          padding: '8px',
          background: 'linear-gradient(135deg, #36ff95, #0bbfdb, #36ff95)',
          borderRadius: '12px',
          boxShadow: '0 0 30px rgba(54, 255, 149, 0.5), 0 0 60px rgba(11, 191, 219, 0.3)',
        }}>
          <img 
            src={welcometobaib} 
            alt="Welcome to BAIB" 
            style={{ 
              maxWidth: '100%', 
              width: '100%', 
              height: 'auto',
              display: 'block',
              borderRadius: '8px'
            }} 
          />
        </div>
      </div>
      
      {/* Empty page content for now */}
      <div style={{ minHeight: '400px', padding: '20px' }}>
        {/* Content will be added here later */}
      </div>
    </>
  );
}

export default Podcast;

