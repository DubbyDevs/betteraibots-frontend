import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import welcometobaibpod from './assets/welcometobaibpod.jpg';
import baiblive from './assets/liveslider/baiblive.jpg';
import baiblive2 from './assets/liveslider/baiblive2.jpg';
import baiblive3 from './assets/liveslider/baiblive3.jpg';
import baiblive4 from './assets/liveslider/baiblive4.jpg';
import baiblive5 from './assets/liveslider/baiblive5.jpg';
import baiblive6 from './assets/liveslider/baiblive6.jpg';
import baiblive7 from './assets/liveslider/baiblive7.jpg';
import baiblive8 from './assets/liveslider/baiblive8.jpg';
import baiblive9 from './assets/liveslider/baiblive9.jpg';
import aigoldrush from './assets/aigoldrush.webp';
import baibliveMain from './assets/baiblive.jpg';

function Podcast() {
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoCurrentTime, setVideoCurrentTime] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const playerRefs = useRef({});
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });
  const [leftImageIndex, setLeftImageIndex] = useState(0);

  const livesliderImages = [
    baiblive,
    baiblive2,
    baiblive3,
    baiblive4,
    baiblive5,
    baiblive6,
    baiblive7,
    baiblive8,
    baiblive9
  ];

  // Bottom slideshow images (remove baiblive3 and baiblive6 from rotation)
  const bottomSliderImages = [
    baiblive,
    baiblive2,
    baiblive4,
    baiblive5,
    baiblive7,
    baiblive8,
    baiblive9
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rotate left image every 30 seconds (bottom slideshow)
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftImageIndex((prevIndex) => (prevIndex + 1) % bottomSliderImages.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [bottomSliderImages.length]);

  // Duplicate images for seamless infinite scroll (exactly 2 copies)
  const duplicatedImages = [...livesliderImages, ...livesliderImages];

  // YouTube videos - replace with your actual video IDs
  const youtubeVideos = useMemo(() => [
    {
      id: 'StFLNRmH7XQ',
      title: 'Welcome to BetterAiBots Podcast',
      description: 'Introduction to our podcast channel and what to expect',
      thumbnail: baiblive3
    },
    {
      id: 'iJi5a2c32n4',
      startTime: 665, // Start at 665 seconds
      title: 'Latest Episode: AI Tools Discussion',
      description: 'Exploring the latest AI tools and their applications',
      thumbnail: aigoldrush
    },
    {
      id: 'tFNJJsNHjzU',
      title: 'BAIB Live Studio Session',
      description: 'Behind-the-scenes look at our live show production and guest interviews',
      thumbnail: baibliveMain
    },
    {
      id: 'JiF-eCQc_SM',
      title: 'AI News Roundup',
      description: 'Weekly roundup of the most important AI news'
    },
    {
      id: 'dQw4w9WgXcQ', // Replace with your video ID
      title: 'Interview with AI Expert',
      description: 'Deep dive into AI technology with industry experts'
    },
    {
      id: 'dQw4w9WgXcQ', // Replace with your video ID
      title: 'AI Tutorial Series',
      description: 'Learn how to use AI tools effectively'
    },
    {
      id: 'dQw4w9WgXcQ', // Replace with your video ID
      title: 'Product Reviews',
      description: 'Honest reviews of the latest AI products'
    },
  ], [baiblive3, aigoldrush, baibliveMain]);

  // Bottom video removed - no longer needed

  // Extract video ID from YouTube URL or use direct ID
  const getVideoId = (video) => {
    if (video.id) return video.id;
    if (video.url) {
      const match = video.url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
      return match ? match[1] : null;
    }
    return null;
  };

  const getThumbnail = (video) => {
    if (video.thumbnail) return video.thumbnail;
    const videoId = getVideoId(video);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        // API is ready
      };
    }
  }, []);

  // Initialize YouTube player when video starts playing (only when explicitly set by user)
  const safeDestroyPlayer = (player, elementId) => {
    if (!player) return;
    
    // Always try to stop the video first (safest operation)
    if (typeof player.stopVideo === 'function') {
      try {
        player.stopVideo();
      } catch (e) {
        // Ignore stop errors - video might already be stopped
      }
    }
    
    // Only try to destroy if we can safely verify the DOM structure
    try {
      const element = elementId ? document.getElementById(elementId) : null;
      if (!element || !document.body.contains(element)) {
        // Element doesn't exist or has been removed by React - just return
        return;
      }
      
      // Check if player has an iframe and if it's still in the element
      try {
        const iframe = player.getIframe ? player.getIframe() : null;
        if (iframe && iframe.parentNode && element.contains(iframe)) {
          // Iframe exists and is still in element - safe to destroy
          try {
            player.destroy();
          } catch (destroyErr) {
            // If destroy fails, just clear the element content
            try {
              if (element && element.parentNode) {
                element.innerHTML = '';
              }
            } catch (e) {
              // Ignore all errors - React will handle cleanup
            }
          }
        } else {
          // Iframe doesn't exist or has been moved - just clear element
          try {
            if (element && element.parentNode) {
              element.innerHTML = '';
            }
          } catch (e) {
            // Ignore - React will handle it
          }
        }
      } catch (iframeErr) {
        // Can't access iframe - just clear element
        try {
          if (element && element.parentNode) {
            element.innerHTML = '';
          }
        } catch (e) {
          // Ignore all errors
        }
      }
    } catch (err) {
      // Silently swallow all errors - React will handle DOM cleanup
      // This prevents the "removeChild" error from crashing the app
    }
  };

  useEffect(() => {
    // Only initialize if playingVideoIndex is explicitly set (not null) and YouTube API is ready
    // Allow video 1 (index 0) to play, block videos 2 and 3 (indices 1, 2)
    if (playingVideoIndex !== null && playingVideoIndex !== undefined && playingVideoIndex === 0 && window.YT && window.YT.Player) {
      const video = youtubeVideos[playingVideoIndex];
      if (!video) return; // Safety check
      
      const videoId = getVideoId(video);
      if (!videoId) return; // Safety check
      
      const playerId = `youtube-player-${playingVideoIndex}`;
      const startTime = video.startTime || 0;
      const currentIndex = playingVideoIndex;
      
      // Clean up ALL previous players before creating a new one
      // Use setTimeout to ensure cleanup happens after React's DOM updates
      setTimeout(() => {
        Object.keys(playerRefs.current).forEach((key) => {
          const player = playerRefs.current[key];
          if (player && key !== String(currentIndex)) {
            const elementId = `youtube-player-${key}`;
            // Check if element exists before trying to clean up
            const element = document.getElementById(elementId);
            if (element && document.body.contains(element)) {
              safeDestroyPlayer(player, elementId);
            } else if (typeof player.stopVideo === 'function') {
              // If element doesn't exist, just stop the video
              try {
                player.stopVideo();
              } catch (e) {
                // Ignore errors
              }
            }
            playerRefs.current[key] = null;
          }
        });
        
        // Clean up the current player if it exists
        if (playerRefs.current[currentIndex]) {
          const element = document.getElementById(playerId);
          if (element && document.body.contains(element)) {
            safeDestroyPlayer(playerRefs.current[currentIndex], playerId);
          } else if (playerRefs.current[currentIndex] && typeof playerRefs.current[currentIndex].stopVideo === 'function') {
            try {
              playerRefs.current[currentIndex].stopVideo();
            } catch (e) {
              // Ignore errors
            }
          }
          playerRefs.current[currentIndex] = null;
        }
      }, 0);
      
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(playerId);
        if (element && !playerRefs.current[currentIndex]) {
          try {
            playerRefs.current[currentIndex] = new window.YT.Player(playerId, {
              videoId: videoId,
              playerVars: {
                autoplay: 1, // Only autoplays when user explicitly clicks to play
                rel: 0,
                enablejsapi: 1,
                start: startTime,
              },
              events: {
                onReady: (event) => {
                  onPlayerReady(event, currentIndex);
                  // If there's a start time, seek to it
                  if (startTime > 0) {
                    event.target.seekTo(startTime, true);
                  }
                },
              },
            });
          } catch (e) {
            console.error('Error creating YouTube player:', e);
          }
        }
      }, 200);

      return () => {
        clearTimeout(timeoutId);
        // Clean up when switching away from this video
        // Capture values at the time of effect to avoid stale closures
        const playerToCleanup = playerRefs.current[currentIndex];
        const elementIdToCheck = playerId;
        const indexToCleanup = currentIndex;
        // Capture the ref object to avoid accessing it in cleanup
        const refsObject = playerRefs.current;
        
        if (playerToCleanup) {
          // Check if element still exists in DOM before trying to clean up
          try {
            const element = document.getElementById(elementIdToCheck);
            if (element && document.body.contains(element)) {
              // Check if player's iframe is still in the element
              const iframe = playerToCleanup.getIframe ? playerToCleanup.getIframe() : null;
              if (iframe && element.contains(iframe)) {
                safeDestroyPlayer(playerToCleanup, elementIdToCheck);
              } else if (typeof playerToCleanup.stopVideo === 'function') {
                // If iframe is not in element, just stop the video
                try {
                  playerToCleanup.stopVideo();
                } catch (e) {
                  // Ignore errors
                }
              }
            } else if (typeof playerToCleanup.stopVideo === 'function') {
              // Element doesn't exist, just stop the video
              try {
                playerToCleanup.stopVideo();
              } catch (e) {
                // Ignore errors
              }
            }
          } catch (err) {
            // Silently handle any cleanup errors
            console.warn('Player cleanup warning:', err);
          }
          // Clear the ref using the captured ref object
          refsObject[indexToCleanup] = null;
        }
      };
    }
  }, [playingVideoIndex, youtubeVideos]);

  // Track video playback time
  useEffect(() => {
    if (playingVideoIndex !== null) {
      const interval = setInterval(() => {
        const player = playerRefs.current[playingVideoIndex];
        if (player && typeof player.getCurrentTime === 'function') {
          try {
            const currentTime = player.getCurrentTime();
            setVideoCurrentTime(currentTime);
          } catch (e) {
            // Player not ready yet
          }
        }
      }, 500); // Update every 500ms

      return () => clearInterval(interval);
    }
  }, [playingVideoIndex]);

  // Handle expand button click
  const handleExpand = (video, index) => {
    const player = playerRefs.current[index];
    if (player) {
      try {
        const currentTime = player.getCurrentTime();
        player.pauseVideo();
        setVideoCurrentTime(currentTime);
        setSelectedVideo({ ...video, startTime: currentTime });
      } catch (e) {
        // Fallback if API not available
        setSelectedVideo({ ...video, startTime: videoCurrentTime || 0 });
      }
    } else {
      setSelectedVideo({ ...video, startTime: videoCurrentTime || 0 });
    }
  };

  // Handle welcome image click - toggle play/pause for first video
  const handleWelcomeImageClick = () => {
    // Scroll to video section
    const videoSection = document.getElementById('video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Toggle first video play/pause
    if (playingVideoIndex === 0) {
      // First video is playing, pause it and hide the player
      const player = playerRefs.current[0];
      if (player && typeof player.pauseVideo === 'function') {
        try {
          player.pauseVideo();
        } catch (e) {
          // Ignore errors
        }
      }
      // Set to null to hide the embedded player and show thumbnail
      setPlayingVideoIndex(null);
    } else {
      // First video is not playing, start it
      setTimeout(() => {
        setPlayingVideoIndex(0);
      }, 300); // Small delay to ensure scroll has started
    }
  };

  // Handle video click - show coming soon for top 2, allow video 1 and bottom video
  const handleVideoClick = (index) => {
    // Videos 2 and 3 (indices 1, 2) show coming soon
    if (index === 1 || index === 2) {
      setShowComingSoon(true);
      setTimeout(() => {
        setShowComingSoon(false);
      }, 2000); // Show for 2 seconds
      return; // Don't set playingVideoIndex for these videos
    }
    // Video 1 (index 0) and bottom video (index 3+) are playable
    setPlayingVideoIndex(index);
  };

  // Initialize YouTube player
  const onPlayerReady = (event, index) => {
    playerRefs.current[index] = event.target;
  };

  return (
    <>
      <Helmet>
        <title>BetterAiBots Podcast - AI Tools, News &amp; Educational Content | Watch Live</title>
        <meta name="description" content="Watch BetterAiBots Podcast for the latest AI tools, breaking AI news, expert interviews, and educational content. Join our live studio sessions and stay ahead of the AI revolution. Free AI resources and tutorials." />
        <meta name="keywords" content="AI podcast, AI tools podcast, artificial intelligence news, AI education, AI tutorials, BetterAiBots podcast, AI live show, AI expert interviews, AI tools review, AI news 2025" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://betteraibots.com/Podcast" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://betteraibots.com/Podcast" />
        <meta property="og:title" content="BetterAiBots Podcast - AI Tools, News &amp; Educational Content" />
        <meta property="og:description" content="Watch BetterAiBots Podcast for the latest AI tools, breaking AI news, expert interviews, and educational content. Join our live studio sessions and stay ahead of the AI revolution." />
        <meta property="og:image" content="https://betteraibots.com/betteraibotslive.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="BetterAiBots Podcast - AI Tools, News &amp; Educational Content" />
        <meta property="og:site_name" content="BetterAiBots" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://betteraibots.com/Podcast" />
        <meta name="twitter:title" content="BetterAiBots Podcast - AI Tools, News &amp; Educational Content" />
        <meta name="twitter:description" content="Watch BetterAiBots Podcast for the latest AI tools, breaking AI news, expert interviews, and educational content. Join our live studio sessions." />
        <meta name="twitter:image" content="https://betteraibots.com/betteraibotslive.webp" />
        <meta name="twitter:image:alt" content="BetterAiBots Podcast - AI Tools, News &amp; Educational Content" />
        
        {/* Structured Data for VideoObject */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "BetterAiBots Podcast",
            "description": "Watch BetterAiBots Podcast for the latest AI tools, breaking AI news, expert interviews, and educational content. Join our live studio sessions and stay ahead of the AI revolution.",
            "thumbnailUrl": "https://betteraibots.com/betteraibotslive.webp",
            "uploadDate": "2025-11-20",
            "contentUrl": "https://betteraibots.com/Podcast",
            "embedUrl": "https://betteraibots.com/Podcast",
            "publisher": {
              "@type": "Organization",
              "name": "BetterAiBots",
              "logo": {
                "@type": "ImageObject",
                "url": "https://betteraibots.com/betteraibotsglowlogo8.png"
              }
            }
          })}
        </script>
        
        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://betteraibots.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Podcast",
                "item": "https://betteraibots.com/Podcast"
              }
            ]
          })}
        </script>
        <style>{`
          @keyframes scrollCarousel {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-210px * 9 - 20px * 8));
            }
          }
          .liveslider-carousel {
            width: 100%;
            overflow: hidden;
            position: relative;
            margin-bottom: 20px;
            padding: 20px 0;
            background: transparent;
          }
          .liveslider-track {
            display: flex;
            animation: scrollCarousel 60s linear infinite;
            gap: 20px;
            width: fit-content;
            will-change: transform;
          }
          .liveslider-item {
            flex-shrink: 0;
            width: 210px;
            height: auto;
            position: relative;
          }
          .liveslider-item img {
            width: 210px;
            height: auto;
            object-fit: contain;
            display: block;
            filter: drop-shadow(0 0 10px rgba(54, 255, 149, 0.4)) drop-shadow(0 0 20px rgba(11, 191, 219, 0.3));
            pointer-events: none;
          }
          .podcast-section {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .podcast-intro {
            text-align: center;
            margin-bottom: 50px;
          }
          .podcast-intro h2 {
            font-size: 2.5rem;
            background: linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            font-weight: 700;
          }
          .podcast-intro p {
            font-size: 1.2rem;
            color: #e0e0e0;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
          }
          .video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 30px;
            margin-top: 40px;
          }
          .video-card {
            background: linear-gradient(135deg, rgba(16, 28, 38, 0.9) 0%, rgba(23, 45, 62, 0.9) 100%);
            border-radius: 16px;
            overflow: hidden;
            transition: box-shadow 0.3s ease;
            border: 1px solid rgba(54, 255, 149, 0.2);
            cursor: pointer;
          }
          .video-card:hover {
            box-shadow: 0 10px 40px rgba(54, 255, 149, 0.3), 0 0 60px rgba(11, 191, 219, 0.2);
            border-color: rgba(54, 255, 149, 0.5);
          }
          .video-thumbnail {
            position: relative;
            width: 100%;
            padding-top: 56.25%;
            background: #000;
            overflow: hidden;
          }
          .video-thumbnail img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .video-play-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background: rgba(54, 255, 149, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 0 30px rgba(54, 255, 149, 0.6);
          }
          .video-card:hover .video-play-overlay {
            background: rgba(11, 191, 219, 0.9);
            box-shadow: 0 0 40px rgba(11, 191, 219, 0.8);
            transform: translate(-50%, -50%) scale(1.1);
          }
          .video-play-overlay::before {
            content: '';
            width: 0;
            height: 0;
            border-left: 25px solid #000;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            margin-left: 5px;
          }
          .video-info {
            padding: 20px;
          }
          .video-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #fff;
            margin-bottom: 10px;
            line-height: 1.4;
          }
          .video-description {
            font-size: 0.95rem;
            color: #b0b0b0;
            line-height: 1.5;
            margin-bottom: 15px;
          }
          .video-expand-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%);
            color: #000;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(54, 255, 149, 0.3);
          }
          .video-expand-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(54, 255, 149, 0.5);
          }
          .video-embed-inline {
            position: relative;
            width: 100%;
            padding-top: 56.25%;
            background: #000;
            overflow: hidden;
            border-radius: 12px;
          }
          .video-embed-inline > div {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .video-embed-inline iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
          .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
          }
          .video-modal-content {
            position: relative;
            width: 100%;
            max-width: 1200px;
            background: #000;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 50px rgba(54, 255, 149, 0.3);
          }
          .video-modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            transition: all 0.3s ease;
          }
          .video-modal-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
          }
          .video-embed {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
          }
          .video-embed iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
          .channel-cta {
            text-align: center;
            margin-top: 50px;
            padding: 40px;
            background: linear-gradient(135deg, rgba(54, 255, 149, 0.1) 0%, rgba(11, 191, 219, 0.1) 100%);
            border-radius: 16px;
            border: 1px solid rgba(54, 255, 149, 0.3);
          }
          .channel-cta h3 {
            font-size: 1.8rem;
            color: #36ff95;
            margin-bottom: 15px;
          }
          .channel-cta p {
            color: #e0e0e0;
            margin-bottom: 25px;
            font-size: 1.1rem;
          }
          .channel-cta a {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%);
            color: #000;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(54, 255, 149, 0.3);
          }
          .channel-cta a:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 30px rgba(54, 255, 149, 0.5);
          }
          @media (max-width: 768px) {
            .podcast-intro h2 {
              font-size: 2rem;
            }
            .podcast-intro p {
              font-size: 1rem;
            }
            .video-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
          .coming-soon-flash {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%);
            color: #000;
            padding: 30px 60px;
            border-radius: 16px;
            font-size: 2rem;
            font-weight: 700;
            z-index: 10000;
            box-shadow: 0 10px 50px rgba(54, 255, 149, 0.5), 0 0 100px rgba(11, 191, 219, 0.4);
            animation: flashFadeIn 0.3s ease-out, flashFadeOut 0.3s ease-in 1.7s;
            pointer-events: none;
            text-align: center;
            letter-spacing: 1px;
          }
          @keyframes flashFadeIn {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
          @keyframes flashFadeOut {
            from {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            to {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
          }
        `}</style>
      </Helmet>
      
      {/* Coming Soon Flash */}
      {showComingSoon && (
        <div className="coming-soon-flash">
          Coming Soon
        </div>
      )}
      
      {/* Liveslider Carousel */}
      <div className="liveslider-carousel">
        <div className="liveslider-track">
          {duplicatedImages.map((img, index) => (
            <div key={index} className="liveslider-item">
              <img src={img} alt={`BAIB Live ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      
      <h1 style={{
        textAlign: 'center',
        fontSize: isMobile ? '2rem' : '3rem',
        fontWeight: 700,
        marginTop: '40px',
        marginBottom: '20px',
        fontFamily: 'inherit'
      }}>
        <span style={{ color: '#ffffff', textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>BetterAi</span>
        <span style={{ color: '#36ff95', textShadow: '0 0 20px rgba(54, 255, 149, 0.5)' }}>Bots</span>
      </h1>
      
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
            src={welcometobaibpod} 
            alt="Welcome to BAIB Podcast" 
            onClick={handleWelcomeImageClick}
            style={{ 
              maxWidth: '100%', 
              width: '100%', 
              height: 'auto',
              display: 'block',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
            }} 
          />
        </div>
      </div>
      
      {/* Podcast Content Section */}
      <div className="podcast-section">
        {/* Channel Introduction */}
        <div className="podcast-intro">
          <h2>Welcome to BetterAiBots Podcast</h2>
          <p>
            Discover the latest in AI technology, tools, and insights. Our podcast brings you in-depth discussions, 
            expert interviews, product reviews, and tutorials to help you stay ahead in the world of artificial intelligence. 
            Watch or listen to our episodes directly here, or subscribe to our YouTube channel for the latest content.
          </p>
        </div>

        {/* Video Grid */}
        <div id="video-section" className="video-grid">
          {youtubeVideos.slice(0, 3).map((video, index) => {
            const videoId = getVideoId(video);
            const thumbnail = getThumbnail(video);
            // Only the video at the playing index should be playing
            // Video 1 (index 0) is playable, videos 2 and 3 (indices 1, 2) show coming soon
            const isPlaying = playingVideoIndex === index && index === 0;
            
            return (
              <div
                key={index}
                className="video-card"
              >
                {isPlaying ? (
                  <div className="video-embed-inline">
                    <div
                      id={`youtube-player-${index}`}
                      style={{ width: '100%', height: '100%' }}
                    ></div>
                  </div>
                ) : (
                  <div 
                    className="video-thumbnail"
                    onClick={() => handleVideoClick(index)}
                  >
                    {thumbnail && (
                      <img
                        src={thumbnail}
                        alt={video.title}
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                        }}
                      />
                    )}
                    <div className="video-play-overlay"></div>
                  </div>
                )}
                <div className="video-info">
                  <div className="video-title">{video.title}</div>
                  <div className="video-description">{video.description}</div>
                  {isPlaying && index === 0 && (
                    <button
                      className="video-expand-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpand(video, index);
                      }}
                    >
                      <span>⛶</span> Expand
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Images */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '880px',
          margin: '50px auto 30px auto',
          padding: '0 20px',
          gap: '20px',
          flexWrap: 'nowrap'
        }}>
          <div 
            className="studio-image-container"
            style={{
              flex: '1 1 50%',
              maxWidth: '420px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              borderRadius: '16px',
              padding: '8px',
              background: 'linear-gradient(135deg, rgba(16, 28, 38, 0.9) 0%, rgba(23, 45, 62, 0.9) 100%)',
              border: '1px solid rgba(54, 255, 149, 0.5)',
              boxShadow: '0 10px 40px rgba(54, 255, 149, 0.3), 0 0 60px rgba(11, 191, 219, 0.2)'
            }}
          >
            {bottomSliderImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`BAIB Live ${index + 1}`}
                style={{
                  maxWidth: '100%',
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  position: index === leftImageIndex ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  opacity: index === leftImageIndex ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                  pointerEvents: 'none',
                  borderRadius: '8px'
                }}
              />
            ))}
          </div>
          <div 
            className="studio-image-container"
            style={{
              flex: '1 1 50%',
              maxWidth: '420px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '16px',
              padding: '8px',
              background: 'linear-gradient(135deg, rgba(16, 28, 38, 0.9) 0%, rgba(23, 45, 62, 0.9) 100%)',
              border: '1px solid rgba(54, 255, 149, 0.5)',
              boxShadow: '0 10px 40px rgba(54, 255, 149, 0.3), 0 0 60px rgba(11, 191, 219, 0.2)'
            }}
          >
            <img 
              src="/baibimage.png" 
              alt="BAIB" 
              style={{ 
                maxWidth: '100%',
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                borderRadius: '8px'
              }} 
            />
          </div>
        </div>

        {/* Channel CTA */}
        <div className="channel-cta">
          <h3>Subscribe to Our Channel</h3>
          <p>Get notified when we release new episodes and content</p>
          <a
            href="https://www.youtube.com/@BetterAiBots"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit YouTube Channel
          </a>
        </div>

      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="video-modal"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal-close"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
            >
              ×
            </button>
            <div className="video-embed">
              <iframe
                src={`https://www.youtube.com/embed/${getVideoId(selectedVideo)}?autoplay=1&rel=0${selectedVideo.startTime ? `&start=${Math.floor(selectedVideo.startTime)}` : videoCurrentTime ? `&start=${Math.floor(videoCurrentTime)}` : ''}`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Podcast;



