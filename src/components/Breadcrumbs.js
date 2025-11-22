import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Get referrer from location state, or check sessionStorage as fallback
  let fromPage = location.state?.from;
  if (!fromPage && pathSegments[0] === 'learn' && pathSegments.length > 1) {
    // Check sessionStorage for referrer info
    const storedFrom = sessionStorage.getItem('articleFromPage');
    if (storedFrom) {
      fromPage = storedFrom;
    }
  }
  
  // Store referrer in sessionStorage if we have it (for persistence across refreshes)
  if (location.state?.from && pathSegments[0] === 'learn') {
    sessionStorage.setItem('articleFromPage', location.state.from);
  }
  
  // Clear sessionStorage when navigating away from learn articles
  if (pathSegments[0] !== 'learn' && pathSegments.length > 0) {
    sessionStorage.removeItem('articleFromPage');
  }

  // Don't show breadcrumbs on home page or podcast page
  if (pathSegments.length === 0 || location.pathname.toLowerCase().includes('/podcast')) {
    return null;
  }

  // Helper function for consistent capitalization
  const toTitleCase = (str) => {
    return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const generateBreadcrumbItems = () => {
    const items = [];
    let currentPath = '';

    // Always start with Home
    items.push({
      name: 'Home',
      path: '/',
      isActive: false
    });

    // Handle special case: if coming from /apps and viewing a /learn article, show Apps instead of Learn
    if (fromPage === '/apps' && pathSegments[0] === 'learn' && pathSegments.length > 1) {
      items.push({
        name: 'Apps',
        path: '/apps',
        isActive: false
      });
      
      // Handle both 2-segment (/learn/article-name) and 3-segment (/learn/level/article-name) routes
      if (pathSegments.length === 2) {
        // Direct article route: /learn/article-name
        const articleSegment = pathSegments[1];
        const decodedArticle = decodeURIComponent(articleSegment);
        const friendlyName = toTitleCase(decodedArticle);
        items.push({
          name: friendlyName,
          path: location.pathname,
          isActive: true
        });
      } else if (pathSegments.length === 3) {
        // Level route: /learn/level/article-name
        const levelSegment = pathSegments[1];
        const articleSegment = pathSegments[2];
        const decodedLevel = decodeURIComponent(levelSegment);
        const decodedArticle = decodeURIComponent(articleSegment);
        
        // Add level breadcrumb
        if (['beginner', 'intermediate', 'advanced'].includes(levelSegment.toLowerCase())) {
          const levelName = decodedLevel.charAt(0).toUpperCase() + decodedLevel.slice(1);
          items.push({
            name: levelName,
            path: `/learn/${levelSegment}`,
            isActive: false
          });
        }
        
        // Add article breadcrumb
        const friendlyName = toTitleCase(decodedArticle);
        items.push({
          name: friendlyName,
          path: location.pathname,
          isActive: true
        });
      }
      
      return items;
    }

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Decode URL-encoded segments and normalize case
      const decodedSegment = decodeURIComponent(segment);
      const lowerSegment = segment.toLowerCase();
      
      // Generate friendly names for different route types
      let friendlyName = decodedSegment;
      
      // Handle category pages
      if (index === 0 && ['productivity', 'education', 'lifestyle', 'music', 'wellness', 'creative', 'wizardry'].includes(lowerSegment)) {
        const categoryMap = {
          'wellness': 'Health & Wellness',
          'creative': 'Creative Tools',
          'wizardry': 'Specialized Knowledge',
          'productivity': 'Productivity',
          'education': 'Education',
          'lifestyle': 'Lifestyle',
          'music': 'Music'
        };
        friendlyName = categoryMap[lowerSegment] || decodedSegment;
      }
      
      // Handle apps
      if (lowerSegment === 'apps') {
        friendlyName = 'Apps';
      }
      
      // Handle learn
      if (pathSegments[0].toLowerCase() === 'learn' && index === 0) {
        friendlyName = 'Learn';
      }
      
      // Handle learn level pages (beginner, intermediate, advanced)
      if (pathSegments[0].toLowerCase() === 'learn' && index === 1) {
        if (['beginner', 'intermediate', 'advanced'].includes(lowerSegment)) {
          friendlyName = decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1);
        }
      }
      
      // Handle learn article pages (both /learn/article and /learn/level/article)
      if (pathSegments[0].toLowerCase() === 'learn') {
        // For 2-segment routes: /learn/article-name (index 1 is article)
        if (pathSegments.length === 2 && index === 1) {
          friendlyName = toTitleCase(decodedSegment);
        }
        // For 3-segment routes: /learn/level/article-name (index 2 is article)
        if (pathSegments.length === 3 && index === 2) {
          friendlyName = toTitleCase(decodedSegment);
        }
      }
      
      // Handle news
      if (pathSegments[0].toLowerCase() === 'news' && index === 1) {
        friendlyName = toTitleCase(decodedSegment);
      }
      
      // Handle contact
      if (lowerSegment === 'contact') {
        friendlyName = 'Contact Us';
      }
      
      // Handle legal
      if (lowerSegment === 'legal') {
        friendlyName = 'Legal';
      }
      
      // Handle privacy
      if (lowerSegment === 'privacy') {
        friendlyName = 'Privacy Policy';
      }

      items.push({
        name: friendlyName,
        path: currentPath,
        isActive: index === pathSegments.length - 1
      });
    });

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <ol className="breadcrumb-list">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="breadcrumb-item">
            {index > 0 && (
              <span className="breadcrumb-separator" aria-hidden="true">
                ›
              </span>
            )}
            
            {item.isActive ? (
              <span className="breadcrumb-current" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link to={item.path} className="breadcrumb-link">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 