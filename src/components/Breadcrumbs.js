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
      // Skip "learn" segment and go directly to article name
      const articleSegment = pathSegments[1];
      const decodedArticle = decodeURIComponent(articleSegment);
      const friendlyName = decodedArticle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      items.push({
        name: friendlyName,
        path: location.pathname, // Keep current path for article name (non-clickable)
        isActive: true
      });
      return items;
    }

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Decode URL-encoded segments
      const decodedSegment = decodeURIComponent(segment);
      
      // Generate friendly names for different route types
      let friendlyName = decodedSegment;
      
      // Handle category pages
      if (index === 0 && ['productivity', 'education', 'lifestyle', 'music', 'wellness', 'creative', 'wizardry'].includes(segment)) {
        const categoryMap = {
          'wellness': 'Health & Wellness',
          'creative': 'Creative Tools',
          'wizardry': 'Specialized Knowledge',
          'productivity': 'Productivity',
          'education': 'Education',
          'lifestyle': 'Lifestyle',
          'music': 'Music'
        };
        friendlyName = categoryMap[segment] || decodedSegment;
      }
      
      // Handle learn
      if (pathSegments[0] === 'learn' && index === 0) {
        friendlyName = 'Learn';
      }
      
      // Handle learn article pages
      if (pathSegments[0] === 'learn' && index === 1) {
        // Handle learning levels
        if (['beginner', 'intermediate', 'advanced'].includes(segment)) {
          friendlyName = decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1);
        } else {
          // For article pages, we'll get the title from the URL or use a generic name
          friendlyName = decodedSegment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
      }
      
      // Handle news
      if (pathSegments[0] === 'news' && index === 1) {
        // For news pages, we'll get the title from the URL or use a generic name
        friendlyName = decodedSegment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
      
      // Handle contact
      if (segment === 'contact') {
        friendlyName = 'Contact Us';
      }
      
      // Handle legal
      if (segment === 'legal') {
        friendlyName = 'Legal';
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