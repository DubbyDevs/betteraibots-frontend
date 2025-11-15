import React from 'react';
import { Link } from 'react-router-dom';

// Articles data array - can be populated with actual articles
export const articles = [
  // Add your articles here with structure:
  // {
  //   id: 'article-id',
  //   level: 'beginner' | 'intermediate' | 'advanced',
  //   title: 'Article Title',
  //   content: 'Article content...',
  //   excerpt: 'Article excerpt...',
  // }
];

// Articles component that displays articles filtered by level
export default function Articles({ level }) {
  const filteredArticles = articles.filter(article => article.level === level);
  const levelTitle = level ? level.charAt(0).toUpperCase() + level.slice(1) : 'All';

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#36ff95', marginBottom: '30px' }}>
        {levelTitle} Level Articles
      </h1>
      
      {filteredArticles.length === 0 ? (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          color: '#ffffff',
          background: 'rgba(54, 255, 149, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(54, 255, 149, 0.3)'
        }}>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>
            No {level} level articles available yet.
          </p>
          <p style={{ color: '#d1efe7', fontSize: '14px' }}>
            Check back soon for new content!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredArticles.map(article => (
            <article 
              key={article.id}
              style={{
                padding: '20px',
                background: 'rgba(54, 255, 149, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(54, 255, 149, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <Link 
                to={`/learn/${level}/${article.id}`}
                state={{ from: `/learn/${level}` }}
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <h2 style={{ 
                  color: '#36ff95', 
                  marginBottom: '10px',
                  fontSize: '24px'
                }}>
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p style={{ 
                    color: '#d1efe7', 
                    marginBottom: '15px',
                    lineHeight: '1.6'
                  }}>
                    {article.excerpt}
                  </p>
                )}
                <span style={{
                  color: '#36ff95',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Read More →
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
