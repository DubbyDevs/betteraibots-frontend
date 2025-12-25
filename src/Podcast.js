import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import welcometobaibpod from './assets/welcometobaibpod.jpg';
import baiblive from './assets/liveslider/baiblive.jpg';
import baiblive2 from './assets/liveslider/baiblive2.jpg';
import baiblive3 from './assets/liveslider/baiblive3.jpg';
import warmyio2 from './assets/warmyio2.jpg';
import baiblive4 from './assets/liveslider/baiblive4.jpg';
import baiblive5 from './assets/liveslider/baiblive5.jpg';
import baiblive6 from './assets/liveslider/baiblive6.jpg';
import baiblive7 from './assets/liveslider/baiblive7.jpg';
import baiblive8 from './assets/liveslider/baiblive8.jpg';
import baiblive9 from './assets/liveslider/baiblive9.jpg';
import baibview from './assets/baibview.mp4';
import betteraibotsliveEp155Copy55 from './assets/betteraibotslive ep155 copy55.jpg';
import smallBusinessTools from './assets/BetterAiBots Small Business Tools.jpg';
import aichipwars from './assets/aichipwars nvidia amd.jpg';

function Podcast() {
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoCurrentTime, setVideoCurrentTime] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showLinksDropdown, setShowLinksDropdown] = useState({});
  const [showInfoDropdown, setShowInfoDropdown] = useState({});
  const [showModalLinksDropdown, setShowModalLinksDropdown] = useState(false);
  const [showModalInfoDropdown, setShowModalInfoDropdown] = useState(false);
  const [isBottomVideoPlaying, setIsBottomVideoPlaying] = useState(false);
  const playerRefs = useRef({});

  // Affiliate links for AI Tools Discussion video (index 1)
  const aiToolsLinks = [
    { name: 'Tidio AI', url: 'https://affiliate.tidio.com/BAIB' },
    { name: 'Lusha', url: 'https://partnerstack.lusha.com/w61xn76pa3sr' },
    { name: 'Apollo AI', url: 'https://get.apollo.io/BAIB' },
    { name: 'Brevo', url: 'https://get.brevo.com/um9xszmf3nfd' },
    { name: 'Capsule CRM', url: 'https://get.capsulenow.io/6894ebdizsds' },
    { name: 'Flowith.io', url: 'https://aff.flowith.io/52dtlja1b580' },
    { name: 'Lindy', url: 'https://try.lindy.ai/lhgvxfidor04' },
    { name: 'Miro', url: 'https://ps.miro-affiliate.com/gwnvu4zj3r8r' },
    { name: 'Reply.io', url: 'https://get.reply.io/ub7edypmq2gj' },
    { name: 'AdCreative', url: 'https://free-trial.adcreative.ai/0dkpoiajb7o2' }
  ];

  // Affiliate links for Email Deliverability video (index 2, welcome video)
  const emailDeliverabilityLinks = [
    { name: 'Warmy.io', url: 'https://warmyio.partnerlinks.io/ffy5y6ll9374' }
  ];
  const capsuleCrmLinks = [
    { name: 'Capsule CRM', url: 'https://capsulecrm.com/signup/?ref=betteraibots' }
  ];
  const thorDataLinks = [
    { name: 'ThorData', url: 'https://www.thordata.com/' }
  ];
  const museitLinks = [
    { name: 'Museit.art', url: 'https://museit.art' }
  ];
  const linksByVideoId = {
    'jOMD55PrX-Y': aiToolsLinks,
    'PbanVBegAlk': aiToolsLinks,
    'ytCyZ3LeXJ4': emailDeliverabilityLinks,
    'cz1UN93IBzU': capsuleCrmLinks,
    '5XFaLaiiVnc': thorDataLinks,
    'VEbHf-jICZc': museitLinks,
    'hGeW2slgRcY': museitLinks
  };
  const getVideoLinks = (video) => linksByVideoId[video?.id] || null;
  const hideWatchPageIds = new Set([
    'Kv-JFSjQsRs', // Why Small Businesses Are Beating Enterprise
    'tvU6VpFxl0c', // The AI Home Office GOLD RUSH
    'bou2k-TXtvs', // AI Chip WARS
    'O9xN3anQKbM', // AI Companions
    'PbanVBegAlk', // 10 AI Tools
    'ytCyZ3LeXJ4', // How to Fix Email Deliverability
    'jOMD55PrX-Y', // The AI Job Boom
    'gxiFa0KiXrA'  // The Death of the Resume
  ]);
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
    baibview,
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
  // Order: Video 3 (left, coming soon) -> Video 2 (middle) -> Video 1 (right, welcome podcast)
  const youtubeVideos = useMemo(() => [
    {
      id: 'gxiFa0KiXrA',
      title: 'The Death of the Resume',
      description: 'AI-driven hiring is rewriting the rules. See why resumes are getting skipped and what the new screening game really looks like.',
      thumbnail: '/aihiring.jpg'
    },
    {
      id: 'hGeW2slgRcY',
      title: 'Museit.art — AI Art for Beginners',
      description: 'A beginner-friendly walkthrough on turning prompts into polished AI artwork with Museit.art.',
      thumbnail: 'https://img.youtube.com/vi/hGeW2slgRcY/maxresdefault.jpg'
    },
    {
      id: 'jOMD55PrX-Y',
      title: 'The AI Job Boom Nobody’s Shhh!',
      description: 'A $200B AI hiring wave is here. Learn which roles are exploding and how to land one fast.',
      thumbnail: 'https://img.youtube.com/vi/jOMD55PrX-Y/maxresdefault.jpg'
    },
    {
      id: 'cz1UN93IBzU',
      title: 'Capsule CRM Review',
      description: 'What is Capsule CRM? The platform that gets it right. Capsule CRM was built on a simple but revolutionary premise: CRM software should make your life easier, not harder. While competitors added layers of complexity, Capsule focused on an intuitive platform that small to medium businesses can use effectively. Link: https://capsulecrm.com/signup/?ref=betteraibots',
      thumbnail: 'https://img.youtube.com/vi/cz1UN93IBzU/hqdefault.jpg'
    },
    {
      id: '5XFaLaiiVnc',
      title: 'How ThorData Solves the AI Data Collection Wall',
      description: 'AI model training data collection, market research and competitive intelligence, price monitoring and comparison, lead generation and data enrichment, academic research. Link: https://www.thordata.com/',
      thumbnail: 'https://img.youtube.com/vi/5XFaLaiiVnc/hqdefault.jpg'
    },
    {
      id: 'VEbHf-jICZc',
      title: "AI's Impact on Creativity in General",
      description: 'A deeper look into the impacts of AI and art in general, and how new technology is propelling the art industry in ways never imagined before. Link: https://museit.art',
      thumbnail: 'https://img.youtube.com/vi/VEbHf-jICZc/hqdefault.jpg'
    },
    {
      id: 'O9xN3anQKbM',
      title: 'AI Companions - Why 20 Million People Are Choosing Digital Love',
      description: 'In this episode, we dive into the uncomfortable reality of AI companions: why millions are choosing digital intimacy over human connection, what this reveals about our loneliness epidemic, and the psychological truths we\'re being forced to confront.',
      thumbnail: 'https://img.youtube.com/vi/O9xN3anQKbM/maxresdefault.jpg'
    },
    {
      id: 'PbanVBegAlk',
      title: '10 AI Tools to give YOU leverage to run EVERYTHING ALONE!',
      description: 'In this episode, we break down 10 game-changing AI tools that transform how solo entrepreneurs operate. From customer service to sales, operations to marketing—learn how to build your own AI productivity stack and become a true one-person powerhouse.',
      thumbnail: 'https://img.youtube.com/vi/PbanVBegAlk/maxresdefault.jpg'
    },
    {
      id: 'ytCyZ3LeXJ4',
      title: 'How to Fix Email Deliverability',
      description: 'In this episode, we dive deep into the invisible infrastructure of email trust and explore Warmy.io—an AI-powered tool that\'s fighting what they call "the spam folder rebellion." Meet Adeline, the AI assistant that systematically builds your domain\'s reputation by answering the five critical questions every email algorithm asks before letting you into the inbox.',
      thumbnail: 'https://img.youtube.com/vi/ytCyZ3LeXJ4/maxresdefault.jpg'
    },
    {
      id: 'Kv-JFSjQsRs',
      title: 'Why Small Businesses Are Beating Enterprise',
      description: 'For 30 years, big corporations held all the cards — massive budgets, huge IT teams, custom tech fortresses. Small businesses were always playing catch-up.\n\nBut with generative AI, that pattern is being blown apart.\n\nIn this episode, we explore why small businesses are implementing AI at speeds their massive enterprise rivals simply can\'t match. We break down the structural reasons — speed, flexibility, clean data, and focus — and reveal why the biggest risk today isn\'t picking the wrong tool. It\'s waiting.',
      thumbnail: 'https://img.youtube.com/vi/Kv-JFSjQsRs/hqdefault.jpg'
    },
    {
      id: 'tvU6VpFxl0c',
      title: 'The AI Home Office GOLD RUSH: 10 Income Streams For You!',
      description: 'The AI Home Office Gold Rush is happening RIGHT NOW. While most people are still wondering if AI will replace their jobs, smart entrepreneurs are already using it to multiply their output by 10x—sometimes 100x.',
      thumbnail: 'https://img.youtube.com/vi/tvU6VpFxl0c/maxresdefault.jpg'
    },
    {
      id: 'bou2k-TXtvs',
      title: 'AI Chip WARS! The battle for control in tech',
      description: 'The AI Chip Wars Heat Up: NVIDIA\'s New Challenger from an Unexpected Source\n\n→ https://betteraibots.com/news/ai-chip-wars-heat-up-nvidia-challenger-unexpected-source',
      thumbnail: 'https://img.youtube.com/vi/bou2k-TXtvs/maxresdefault.jpg'
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
  ], []);

  // Bottom video removed - no longer needed

  // Helper function to generate slug from video title
  const getVideoSlug = (video) => {
    const slugMap = {
      'gxiFa0KiXrA': 'the-death-of-the-resume-why-companies-are-using-ai-to-hire-without-ever-reading-your-cv',
      'jOMD55PrX-Y': 'ai-job-boom-how-to-get-hired-in-the-ai-revolution',
      'O9xN3anQKbM': 'ai-companions-why-20-million-people-are-choosing-digital-love',
      'PbanVBegAlk': '10-ai-tools-to-give-you-leverage-to-run-everything-alone',
      'ytCyZ3LeXJ4': 'how-to-fix-email-deliverability',
      'Kv-JFSjQsRs': 'why-small-businesses-are-beating-enterprise',
      'tvU6VpFxl0c': 'the-ai-home-office-gold-rush-10-income-streams-for-you',
      'bou2k-TXtvs': 'ai-chip-wars-the-battle-for-control-in-tech'
    };
    return slugMap[video.id] || null;
  };

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

  const selectedVideoLinks = selectedVideo ? getVideoLinks(selectedVideo) : null;


  // Initialize YouTube API players for embedded iframes to enable getCurrentTime for expand functionality
  useEffect(() => {
    if (playingVideoIndex !== null && playingVideoIndex !== undefined && playingVideoIndex < youtubeVideos.length) {
      const video = youtubeVideos[playingVideoIndex];
      if (!video) return;
      
      const videoId = getVideoId(video);
      if (!videoId) return;
      
      const playerId = `youtube-player-${playingVideoIndex}`;
      const currentIndex = playingVideoIndex;
      const refsObject = playerRefs.current;
      
      let timeoutId;
      let checkInterval;
      
      const initPlayer = () => {
        if (window.YT && window.YT.Player) {
          timeoutId = setTimeout(() => {
            const iframe = document.getElementById(playerId);
            if (iframe && iframe.tagName === 'IFRAME' && !refsObject[currentIndex]) {
              try {
                // Create YouTube API player from existing iframe
                refsObject[currentIndex] = new window.YT.Player(iframe, {
                  events: {
                    onReady: (event) => {
                      // Player is ready
                    },
                  },
                });
              } catch (e) {
                console.error('Error creating YouTube player from iframe:', e);
              }
            }
          }, 1000); // Give iframe time to load
        }
      };

      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        // Wait for YouTube API to load
        checkInterval = setInterval(() => {
          if (window.YT && window.YT.Player) {
            clearInterval(checkInterval);
            initPlayer();
          }
        }, 100);
      }

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (checkInterval) clearInterval(checkInterval);
        // Clean up player
        if (refsObject[currentIndex]) {
          try {
            const player = refsObject[currentIndex];
            if (typeof player.destroy === 'function') {
              player.destroy();
            }
          } catch (e) {
            // Ignore cleanup errors
          }
          refsObject[currentIndex] = null;
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
    // Try to get current time from YouTube API player if available
    const player = playerRefs.current[index];
    let currentTime = 0;
    
    if (player && typeof player.getCurrentTime === 'function') {
      try {
        currentTime = player.getCurrentTime();
        if (typeof player.pauseVideo === 'function') {
          player.pauseVideo();
        }
      } catch (e) {
        // Fallback to stored time
        currentTime = videoCurrentTime || 0;
      }
    } else {
      currentTime = videoCurrentTime || 0;
    }
    
    setVideoCurrentTime(currentTime);
    setSelectedVideo({ ...video, startTime: currentTime, originalIndex: index });
    // Reset modal dropdowns when opening
    setShowModalLinksDropdown(false);
    setShowModalInfoDropdown(false);
  };

  // Handle welcome image click - toggle play/pause for Video 2 (Latest Episode: AI Tools Discussion, index 1, middle)
  const handleWelcomeImageClick = () => {
    // Toggle Video 2 (Latest Episode: AI Tools Discussion, index 1, middle) play/pause
    if (playingVideoIndex === 1) {
      // Video 2 is playing, hide it
      setPlayingVideoIndex(null);
    } else {
      // Video 2 is not playing, start it
      setTimeout(() => {
        setPlayingVideoIndex(1);
        
        // Scroll behavior differs for mobile vs desktop
        if (isMobile) {
          // On mobile: scroll to the specific video card (Video 2, index 1)
          const videoCard = document.getElementById(`video-card-1`);
          if (videoCard) {
            videoCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          // On desktop: scroll to video section with 15px padding at top
          const videoSection = document.getElementById('video-section');
          if (videoSection) {
            const elementPosition = videoSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 15;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 300); // Small delay to ensure state update
    }
  };

  // Handle video click - all videos are playable
  const handleVideoClick = (index) => {
    setPlayingVideoIndex(index);
  };

  // Handle bottom static image click - play welcome video in place
  const handleBottomImageClick = () => {
    setIsBottomVideoPlaying(true);
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
        <meta property="og:image" content="https://betteraibots.com/podcastimage.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="BetterAiBots Podcast - AI Tools, News &amp; Educational Content" />
        <meta property="og:site_name" content="BetterAiBots" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://betteraibots.com/Podcast" />
        <meta name="twitter:title" content="BetterAiBots Podcast - AI Tools, News &amp; Educational Content" />
        <meta name="twitter:description" content="Watch BetterAiBots Podcast for the latest AI tools, breaking AI news, expert interviews, and educational content. Join our live studio sessions." />
        <meta name="twitter:image" content="https://betteraibots.com/podcastimage.png" />
        <meta name="twitter:image:alt" content="BetterAiBots Podcast - AI Tools, News &amp; Educational Content" />
        
        {/* Structured Data for VideoObjects - Individual videos for watch page indexing */}
        {youtubeVideos.slice(0, 9).map((video, index) => {
          const thumbnailUrl = video.thumbnail 
            ? (typeof video.thumbnail === 'string' 
                ? (video.thumbnail.startsWith('http') 
                    ? video.thumbnail 
                    : `https://betteraibots.com${video.thumbnail}`)
                : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`)
            : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
          
          return (
            <script key={index} type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": video.title,
                "description": video.description,
                "thumbnailUrl": thumbnailUrl,
                "uploadDate": "2025-11-20",
                "contentUrl": `https://www.youtube.com/watch?v=${video.id}`,
                "embedUrl": `https://www.youtube.com/embed/${video.id}`,
                "duration": "PT10M",
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
          );
        })}
        
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
              transform: translateX(calc(-50%));
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
            position: relative;
            background: linear-gradient(135deg, rgba(16, 28, 38, 0.9) 0%, rgba(23, 45, 62, 0.9) 100%);
            border-radius: 16px;
            overflow: visible;
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
            border-radius: 12px;
          }
          .video-thumbnail img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
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
            position: relative;
            z-index: 2;
          }
          .video-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #fff;
            margin-bottom: 10px;
            line-height: 1.4;
          }
          .video-description-wrapper {
            line-height: 1.5;
            font-size: 0.95rem;
            color: #b0b0b0;
            margin-bottom: 0;
          }
          .video-description {
            display: inline;
          }
          .video-description.collapsed {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: '';
            word-break: break-word;
          }
          .read-more-link {
            color: #36ff95;
            cursor: pointer;
            font-size: 0.75rem;
            text-decoration: none;
            transition: color 0.2s;
            margin-left: 4px;
            display: inline;
            white-space: nowrap;
            background: none;
            border: none;
            padding: 0;
            font-family: inherit;
          }
          .read-more-link:hover {
            color: #0bbfdb;
            text-decoration: underline;
          }
          .video-expand-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60px;
            position: relative;
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
            z-index: 1;
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
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%);
            color: #000;
            padding: 20px 40px;
            border-radius: 12px;
            font-size: 1.5rem;
            font-weight: 700;
            z-index: 1000;
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
          @keyframes kenBurnsZoom {
            0% {
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              transform: translate(-50%, -50%) scale(1.1);
            }
          }
          .studio-image-container img {
            will-change: transform;
          }
        `}</style>
      </Helmet>
      
      {/* Coming Soon Flash */}
      
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
            const videoLinks = getVideoLinks(video);
            // Only the video at the playing index should be playing
            // Video 2 (index 1, middle) and Video 1 (index 2, right, welcome podcast) are playable
            const isPlaying = playingVideoIndex === index;
            
            return (
              <div
                key={index}
                id={`video-card-${index}`}
                className="video-card"
              >
                {isPlaying ? (
                  <div className="video-embed-inline">
                    <iframe
                      id={`youtube-player-${index}`}
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1${video.startTime ? `&start=${Math.floor(video.startTime)}` : ''}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }}
                    ></iframe>
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
                  <div className="video-title" style={{
                    textAlign: isPlaying ? 'center' : 'left'
                  }}>{video.title}</div>
                  {!isPlaying && (
                    <div className={`video-description-wrapper ${expandedDescriptions[index] ? 'expanded' : ''}`}>
                      <div className={`video-description ${!expandedDescriptions[index] ? 'collapsed' : ''}`}>
                        {video.description}
                      </div>
                      {video.description && video.description.length > 100 && !expandedDescriptions[index] && (
                        <button
                          className="read-more-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescriptions(prev => ({
                              ...prev,
                              [index]: !prev[index]
                            }));
                          }}
                        >
                          Read more
                        </button>
                      )}
                      {video.description && video.description.length > 100 && expandedDescriptions[index] && (
                        <button
                          className="read-more-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescriptions(prev => ({
                              ...prev,
                              [index]: !prev[index]
                            }));
                          }}
                        >
                          Read less
                        </button>
                      )}
                    </div>
                  )}
                  {isPlaying && (
                    <div className="video-expand-container" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '15px',
                      flexWrap: 'wrap'
                    }}>
                      {videoLinks && (
                        <>
                          <button
                            className="video-link-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLinksDropdown(prev => ({
                                ...prev,
                                [index]: !prev[index]
                              }));
                              if (showInfoDropdown[index]) {
                                setShowInfoDropdown(prev => ({
                                  ...prev,
                                  [index]: false
                                }));
                              }
                            }}
                            style={{
                              background: 'transparent',
                              border: '1px solid rgba(54, 255, 149, 0.5)',
                              color: '#36ff95',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontFamily: 'inherit',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                              e.target.style.borderColor = '#36ff95';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                            }}
                          >
                            Links
                          </button>
                          {showLinksDropdown[index] && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              marginTop: '10px',
                              background: 'rgba(16, 28, 38, 0.95)',
                              border: '1px solid rgba(54, 255, 149, 0.5)',
                              borderRadius: '8px',
                              padding: '15px',
                              minWidth: '200px',
                              maxWidth: '300px',
                              maxHeight: '400px',
                              overflowY: 'auto',
                              zIndex: 1000,
                              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                            }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px',
                                paddingBottom: '10px',
                                borderBottom: '1px solid rgba(54, 255, 149, 0.2)'
                              }}>
                                <h3 style={{ margin: 0, color: '#36ff95', fontSize: '16px' }}>Tools Mentioned</h3>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowLinksDropdown(prev => ({
                                      ...prev,
                                      [index]: false
                                    }));
                                  }}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#36ff95',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    padding: '0',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {videoLinks.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      color: '#d1efe7',
                                      textDecoration: 'none',
                                      padding: '8px 12px',
                                      borderRadius: '6px',
                                      transition: 'all 0.2s ease',
                                      display: 'block'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                                      e.target.style.color = '#36ff95';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = 'transparent';
                                      e.target.style.color = '#d1efe7';
                                    }}
                                  >
                                    {link.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      <button
                        className="video-expand-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpand(video, index);
                        }}
                      >
                        <span>⛶</span> Expand
                      </button>
                      {!hideWatchPageIds.has(video.id) && getVideoSlug(video) && (
                        <Link
                          to={`/watch/${getVideoSlug(video)}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            background: 'transparent',
                            color: '#36ff95',
                            border: '1px solid rgba(54, 255, 149, 0.5)',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            boxShadow: '0 4px 15px rgba(54, 255, 149, 0.2)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                            e.target.style.borderColor = '#36ff95';
                            e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                            e.target.style.boxShadow = '0 4px 15px rgba(54, 255, 149, 0.2)';
                          }}
                        >
                          Watch Page
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Three Video Section - Side by Side */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          margin: '50px auto',
          padding: '0 20px',
          flexWrap: 'wrap',
          maxWidth: '1400px'
        }}>
          {[3, 4, 5].map((videoIndex) => {
            const video = youtubeVideos[videoIndex];
            const videoId = getVideoId(video);
            const thumbnail = getThumbnail(video);
            const videoLinks = getVideoLinks(video);
            const isPlaying = playingVideoIndex === videoIndex;
            
            return (
              <div key={videoIndex} className="video-card" style={{
                width: '100%',
                maxWidth: '446px',
                minWidth: '320px',
                flex: '1 1 320px'
              }}>
                {isPlaying ? (
                  <div className="video-embed-inline">
                    <iframe
                      id={`youtube-player-${videoIndex}`}
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1${video.startTime ? `&start=${Math.floor(video.startTime)}` : ''}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }}
                    ></iframe>
                  </div>
                ) : (
                  <div 
                    className="video-thumbnail"
                    onClick={() => handleVideoClick(videoIndex)}
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
                  <div className="video-title" style={{
                    textAlign: isPlaying ? 'center' : 'left'
                  }}>{video.title}</div>
                  {!isPlaying && (
                    <div className={`video-description-wrapper ${expandedDescriptions[videoIndex] ? 'expanded' : ''}`}>
                      <div className={`video-description ${!expandedDescriptions[videoIndex] ? 'collapsed' : ''}`}>
                        {video.description}
                      </div>
                      {video.description && video.description.length > 100 && !expandedDescriptions[videoIndex] && (
                        <button
                          className="read-more-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescriptions(prev => ({
                              ...prev,
                              [videoIndex]: !prev[videoIndex]
                            }));
                          }}
                        >
                          Read more
                        </button>
                      )}
                      {video.description && video.description.length > 100 && expandedDescriptions[videoIndex] && (
                        <button
                          className="read-more-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescriptions(prev => ({
                              ...prev,
                              [videoIndex]: !prev[videoIndex]
                            }));
                          }}
                        >
                          Read less
                        </button>
                      )}
                    </div>
                  )}
                  {isPlaying && (
                    <div className="video-expand-container" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '15px',
                      flexWrap: 'wrap'
                    }}>
                      {videoLinks && (
                        <>
                          <button
                            className="video-link-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLinksDropdown(prev => ({
                                ...prev,
                                [videoIndex]: !prev[videoIndex]
                              }));
                              if (showInfoDropdown[videoIndex]) {
                                setShowInfoDropdown(prev => ({
                                  ...prev,
                                  [videoIndex]: false
                                }));
                              }
                            }}
                            style={{
                              background: 'transparent',
                              border: '1px solid rgba(54, 255, 149, 0.5)',
                              color: '#36ff95',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontFamily: 'inherit',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                              e.target.style.borderColor = '#36ff95';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                            }}
                          >
                            Links
                          </button>
                          {showLinksDropdown[videoIndex] && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              marginTop: '10px',
                              background: 'rgba(16, 28, 38, 0.95)',
                              border: '1px solid rgba(54, 255, 149, 0.5)',
                              borderRadius: '8px',
                              padding: '15px',
                              minWidth: '200px',
                              maxWidth: '300px',
                              maxHeight: '400px',
                              overflowY: 'auto',
                              zIndex: 1000,
                              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                            }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px',
                                paddingBottom: '10px',
                                borderBottom: '1px solid rgba(54, 255, 149, 0.2)'
                              }}>
                                <h3 style={{ margin: 0, color: '#36ff95', fontSize: '16px' }}>Tools Mentioned</h3>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowLinksDropdown(prev => ({
                                      ...prev,
                                      [videoIndex]: false
                                    }));
                                  }}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#36ff95',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    padding: '0',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  A-
                                </button>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {videoLinks.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      color: '#d1efe7',
                                      textDecoration: 'none',
                                      padding: '8px 12px',
                                      borderRadius: '6px',
                                      transition: 'all 0.2s ease',
                                      display: 'block'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                                      e.target.style.color = '#36ff95';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = 'transparent';
                                      e.target.style.color = '#d1efe7';
                                    }}
                                  >
                                    {link.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      <button
                        className="video-expand-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpand(video, videoIndex);
                        }}
                      >
                        <span>⛶</span> Expand
                      </button>
                      {!hideWatchPageIds.has(video.id) && getVideoSlug(video) && (
                        <Link
                          to={`/watch/${getVideoSlug(video)}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            background: 'transparent',
                            color: '#36ff95',
                            border: '1px solid rgba(54, 255, 149, 0.5)',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            boxShadow: '0 4px 15px rgba(54, 255, 149, 0.2)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                            e.target.style.borderColor = '#36ff95';
                            e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                            e.target.style.boxShadow = '0 4px 15px rgba(54, 255, 149, 0.2)';
                          }}
                        >
                          Watch Page
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Three Video Section - Additional Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          margin: '50px auto',
          padding: '0 20px',
          flexWrap: 'wrap',
          maxWidth: '1400px'
        }}>
          {[6, 7, 8].map((videoIndex) => {
            const video = youtubeVideos[videoIndex];
            const videoId = getVideoId(video);
            const thumbnail = getThumbnail(video);
            const videoLinks = getVideoLinks(video);
            const isPlaying = playingVideoIndex === videoIndex;
            
            return (
              <div key={videoIndex} className="video-card" style={{
                width: '100%',
                maxWidth: '446px',
                minWidth: '320px',
                flex: '1 1 320px'
              }}>
                {isPlaying ? (
                  <div className="video-embed-inline">
                    <iframe
                      id={`youtube-player-${videoIndex}`}
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1${video.startTime ? `&start=${Math.floor(video.startTime)}` : ''}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }}
                    ></iframe>
                  </div>
                ) : (
                  <div 
                    className="video-thumbnail"
                    onClick={() => handleVideoClick(videoIndex)}
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
                  <div className="video-title" style={{
                    textAlign: isPlaying ? 'center' : 'left'
                  }}>{video.title}</div>
                  {!isPlaying && (
                    <div className={`video-description-wrapper ${expandedDescriptions[videoIndex] ? 'expanded' : ''}`}>
                      <div className={`video-description ${!expandedDescriptions[videoIndex] ? 'collapsed' : ''}`}>
                        {video.description}
                      </div>
                      {video.description && video.description.length > 100 && !expandedDescriptions[videoIndex] && (
                        <button
                          className="read-more-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescriptions(prev => ({
                              ...prev,
                              [videoIndex]: !prev[videoIndex]
                            }));
                          }}
                        >
                          Read more
                        </button>
                      )}
                      {video.description && video.description.length > 100 && expandedDescriptions[videoIndex] && (
                        <button
                          className="read-more-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescriptions(prev => ({
                              ...prev,
                              [videoIndex]: !prev[videoIndex]
                            }));
                          }}
                        >
                          Read less
                        </button>
                      )}
                    </div>
                  )}
                  {isPlaying && (
                    <div className="video-expand-container" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '15px',
                      flexWrap: 'wrap'
                    }}>
                      {videoLinks && (
                        <>
                          <button
                            className="video-link-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLinksDropdown(prev => ({
                                ...prev,
                                [videoIndex]: !prev[videoIndex]
                              }));
                              if (showInfoDropdown[videoIndex]) {
                                setShowInfoDropdown(prev => ({
                                  ...prev,
                                  [videoIndex]: false
                                }));
                              }
                            }}
                            style={{
                              background: 'transparent',
                              border: '1px solid rgba(54, 255, 149, 0.5)',
                              color: '#36ff95',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontFamily: 'inherit',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                              e.target.style.borderColor = '#36ff95';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                            }}
                          >
                            Links
                          </button>
                          {showLinksDropdown[videoIndex] && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              marginTop: '10px',
                              background: 'rgba(16, 28, 38, 0.95)',
                              border: '1px solid rgba(54, 255, 149, 0.5)',
                              borderRadius: '8px',
                              padding: '15px',
                              minWidth: '200px',
                              maxWidth: '300px',
                              maxHeight: '400px',
                              overflowY: 'auto',
                              zIndex: 1000,
                              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                            }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px',
                                paddingBottom: '10px',
                                borderBottom: '1px solid rgba(54, 255, 149, 0.2)'
                              }}>
                                <h3 style={{ margin: 0, color: '#36ff95', fontSize: '16px' }}>Tools Mentioned</h3>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowLinksDropdown(prev => ({
                                      ...prev,
                                      [videoIndex]: false
                                    }));
                                  }}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#36ff95',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    padding: '0',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  A-
                                </button>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {videoLinks.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      color: '#d1efe7',
                                      textDecoration: 'none',
                                      padding: '8px 12px',
                                      borderRadius: '6px',
                                      transition: 'all 0.2s ease',
                                      display: 'block'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                                      e.target.style.color = '#36ff95';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = 'transparent';
                                      e.target.style.color = '#d1efe7';
                                    }}
                                  >
                                    {link.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      <button
                        className="video-expand-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpand(video, videoIndex);
                        }}
                      >
                        <span>ƒ></span> Expand
                      </button>
                      {!hideWatchPageIds.has(video.id) && getVideoSlug(video) && (
                        <Link
                          to={`/watch/${getVideoSlug(video)}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            background: 'transparent',
                            color: '#36ff95',
                            border: '1px solid rgba(54, 255, 149, 0.5)',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            boxShadow: '0 4px 15px rgba(54, 255, 149, 0.2)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                            e.target.style.borderColor = '#36ff95';
                            e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                            e.target.style.boxShadow = '0 4px 15px rgba(54, 255, 149, 0.2)';
                          }}
                        >
                          Watch Page
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Three Video Section - Fourth Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          margin: '50px auto',
          padding: '0 20px',
          flexWrap: 'wrap',
          maxWidth: '1400px'
        }}>
          {[9, 10, 11].map((videoIndex) => {
            const video = youtubeVideos[videoIndex];
            const videoId = getVideoId(video);
            const thumbnail = getThumbnail(video);
            const videoLinks = getVideoLinks(video);
            const isPlaying = playingVideoIndex === videoIndex;
            
            return (
              <div key={videoIndex} className="video-card" style={{
                width: '100%',
                maxWidth: '446px',
                minWidth: '320px',
                flex: '1 1 320px'
              }}>
                {isPlaying ? (
                  <div className="video-embed-inline">
                    <iframe
                      id={`youtube-player-${videoIndex}`}
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1${video.startTime ? `&start=${Math.floor(video.startTime)}` : ''}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }}
                    ></iframe>
                  </div>
                ) : (
                  <div 
                    className="video-thumbnail"
                    onClick={() => handleVideoClick(videoIndex)}
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
                  <div className="video-title" style={{
                    textAlign: isPlaying ? 'center' : 'left'
                  }}>{video.title}</div>
                  {!isPlaying && (
                    <div className={`video-description-wrapper ${expandedDescriptions[videoIndex] ? 'expanded' : ''}`}>
                      <div className={`video-description ${!expandedDescriptions[videoIndex] ? 'collapsed' : ''}`}>
                        {video.description}
                      </div>
                      {video.description && video.description.length > 100 && !expandedDescriptions[videoIndex] && (
                        <button
                          className="read-more-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescriptions(prev => ({
                              ...prev,
                              [videoIndex]: !prev[videoIndex]
                            }));
                          }}
                        >
                          Read more
                        </button>
                      )}
                      {video.description && video.description.length > 100 && expandedDescriptions[videoIndex] && (
                        <button
                          className="read-more-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescriptions(prev => ({
                              ...prev,
                              [videoIndex]: !prev[videoIndex]
                            }));
                          }}
                        >
                          Read less
                        </button>
                      )}
                    </div>
                  )}
                  {isPlaying && (
                    <div className="video-expand-container" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '15px',
                      flexWrap: 'wrap'
                    }}>
                      {videoLinks && (
                        <>
                          <button
                            className="video-link-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLinksDropdown(prev => ({
                                ...prev,
                                [videoIndex]: !prev[videoIndex]
                              }));
                              if (showInfoDropdown[videoIndex]) {
                                setShowInfoDropdown(prev => ({
                                  ...prev,
                                  [videoIndex]: false
                                }));
                              }
                            }}
                            style={{
                              background: 'transparent',
                              border: '1px solid rgba(54, 255, 149, 0.5)',
                              color: '#36ff95',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontFamily: 'inherit',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                              e.target.style.borderColor = '#36ff95';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                            }}
                          >
                            Links
                          </button>
                          {showLinksDropdown[videoIndex] && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              marginTop: '10px',
                              background: 'rgba(16, 28, 38, 0.95)',
                              border: '1px solid rgba(54, 255, 149, 0.5)',
                              borderRadius: '8px',
                              padding: '15px',
                              minWidth: '200px',
                              maxWidth: '300px',
                              maxHeight: '400px',
                              overflowY: 'auto',
                              zIndex: 1000,
                              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                            }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px',
                                paddingBottom: '10px',
                                borderBottom: '1px solid rgba(54, 255, 149, 0.2)'
                              }}>
                                <h3 style={{ margin: 0, color: '#36ff95', fontSize: '16px' }}>Tools Mentioned</h3>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowLinksDropdown(prev => ({
                                      ...prev,
                                      [videoIndex]: false
                                    }));
                                  }}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#36ff95',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    padding: '0',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  A-
                                </button>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {videoLinks.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      color: '#d1efe7',
                                      textDecoration: 'none',
                                      padding: '8px 12px',
                                      borderRadius: '6px',
                                      transition: 'all 0.2s ease',
                                      display: 'block'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                                      e.target.style.color = '#36ff95';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = 'transparent';
                                      e.target.style.color = '#d1efe7';
                                    }}
                                  >
                                    {link.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      <button
                        className="video-expand-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpand(video, videoIndex);
                        }}
                      >
                        <span>’'></span> Expand
                      </button>
                      {!hideWatchPageIds.has(video.id) && getVideoSlug(video) && (
                        <Link
                          to={`/watch/${getVideoSlug(video)}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            background: 'transparent',
                            color: '#36ff95',
                            border: '1px solid rgba(54, 255, 149, 0.5)',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            boxShadow: '0 4px 15px rgba(54, 255, 149, 0.2)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                            e.target.style.borderColor = '#36ff95';
                            e.target.style.boxShadow = '0 6px 20px rgba(54, 255, 149, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                            e.target.style.boxShadow = '0 4px 15px rgba(54, 255, 149, 0.2)';
                          }}
                        >
                          Watch Page
                        </Link>
                      )}
                    </div>
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
              width: '100%',
              aspectRatio: '16 / 9',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              borderRadius: '16px',
              padding: '8px',
              background: 'linear-gradient(135deg, rgba(16, 28, 38, 0.9) 0%, rgba(23, 45, 62, 0.9) 100%)',
              border: '1px solid rgba(54, 255, 149, 0.5)',
              boxShadow: '0 10px 40px rgba(54, 255, 149, 0.3), 0 0 60px rgba(11, 191, 219, 0.2)',
              overflow: 'hidden'
            }}
          >
            {bottomSliderImages.map((media, index) => {
              const mediaSrc = typeof media === 'string' ? media : (media?.default || media);
              const isVideo = media === baibview || (typeof mediaSrc === 'string' && (mediaSrc.includes('.mp4') || mediaSrc.includes('.webm') || mediaSrc.includes('.mov')));
              
              return isVideo ? (
                <video
                  key={index}
                  ref={(el) => {
                    if (el) {
                      if (index === leftImageIndex) {
                        // Play video when it becomes active
                        el.currentTime = 0;
                        el.play().catch(() => {}); // Ignore autoplay errors
                      } else {
                        // Reset video when it's not active
                        el.pause();
                        el.currentTime = 0;
                      }
                    }
                  }}
                  src={mediaSrc}
                  alt={`BAIB Live ${index + 1}`}
                  muted
                  playsInline
                  onEnded={() => {
                    // Advance to next slide when video ends
                    setLeftImageIndex((prevIndex) => (prevIndex + 1) % bottomSliderImages.length);
                  }}
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
              ) : (
                <img
                  key={`img-${index}`}
                  src={mediaSrc}
                  alt={`BAIB Live ${index + 1}`}
                  ref={(el) => {
                    if (el && index === leftImageIndex) {
                      // Reset and start animation for active image only
                      el.style.animation = 'none';
                      el.style.transform = 'translate(-50%, -50%) scale(1)';
                      void el.offsetHeight; // Trigger reflow
                      el.style.animation = 'kenBurnsZoom 30s linear forwards';
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(1)',
                    transformOrigin: 'center center',
                    opacity: index === leftImageIndex ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    pointerEvents: 'none',
                    borderRadius: '8px'
                  }}
                />
              );
            })}
          </div>
          <div 
            className="studio-image-container"
            style={{
              flex: '1 1 50%',
              maxWidth: '420px',
              width: '100%',
              aspectRatio: '16 / 9',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              borderRadius: '0',
              padding: '0',
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              overflow: 'hidden'
            }}
          >
            {isBottomVideoPlaying ? (
              <iframe
                src="https://www.youtube.com/embed/StFLNRmH7XQ?autoplay=1&rel=0&enablejsapi=1"
                title="Welcome to BetterAiBots Podcast"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: 'none', 
                  position: 'absolute', 
                  top: 0, 
                  left: 0,
                  borderRadius: '16px'
                }}
              ></iframe>
            ) : (
              <div 
                className="video-thumbnail"
                onClick={handleBottomImageClick}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={baiblive3} 
                  alt="BAIB" 
                  style={{ 
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    borderRadius: '16px'
                  }} 
                />
                <div className="video-play-overlay"></div>
              </div>
            )}
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
          onClick={() => {
            setSelectedVideo(null);
            setVideoCurrentTime(null);
            setShowModalLinksDropdown(false);
            setShowModalInfoDropdown(false);
          }}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal-close"
              onClick={() => {
                setSelectedVideo(null);
                setVideoCurrentTime(null);
                setShowModalLinksDropdown(false);
                setShowModalInfoDropdown(false);
              }}
              aria-label="Close video"
            >
              ×
            </button>
            <div className="video-embed">
              <iframe
                src={`https://www.youtube.com/embed/${getVideoId(selectedVideo) || ''}?autoplay=1&rel=0${selectedVideo.startTime ? `&start=${Math.floor(selectedVideo.startTime)}` : videoCurrentTime ? `&start=${Math.floor(videoCurrentTime)}` : ''}`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none' }}
              ></iframe>
            </div>
            {selectedVideoLinks && (
              <div style={{
                position: 'absolute',
                bottom: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                zIndex: 1002
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModalLinksDropdown(!showModalLinksDropdown);
                    if (showModalInfoDropdown) {
                      setShowModalInfoDropdown(false);
                    }
                  }}
                  style={{
                    background: 'rgba(16, 28, 38, 0.9)',
                    border: '1px solid rgba(54, 255, 149, 0.5)',
                    color: '#36ff95',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(54, 255, 149, 0.2)';
                    e.target.style.borderColor = '#36ff95';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(16, 28, 38, 0.9)';
                    e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                  }}
                >
                  Links
                </button>
                {showModalLinksDropdown && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '10px',
                    background: 'rgba(16, 28, 38, 0.95)',
                    border: '1px solid rgba(54, 255, 149, 0.5)',
                    borderRadius: '8px',
                    padding: '15px',
                    minWidth: '200px',
                    maxWidth: '300px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    zIndex: 1003,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(54, 255, 149, 0.2)'
                    }}>
                      <h3 style={{ margin: 0, color: '#36ff95', fontSize: '16px' }}>Tools Mentioned</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowModalLinksDropdown(false);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#36ff95',
                          cursor: 'pointer',
                          fontSize: '18px',
                          padding: '0',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedVideoLinks.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: '#d1efe7',
                            textDecoration: 'none',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease',
                            display: 'block'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(54, 255, 149, 0.1)';
                            e.target.style.color = '#36ff95';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#d1efe7';
                          }}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModalInfoDropdown(!showModalInfoDropdown);
                    if (showModalLinksDropdown) {
                      setShowModalLinksDropdown(false);
                    }
                  }}
                  style={{
                    background: 'rgba(16, 28, 38, 0.9)',
                    border: '1px solid rgba(54, 255, 149, 0.5)',
                    color: '#36ff95',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(54, 255, 149, 0.2)';
                    e.target.style.borderColor = '#36ff95';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(16, 28, 38, 0.9)';
                    e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                  }}
                >
                  Info
                </button>
                {showModalInfoDropdown && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '10px',
                    background: 'rgba(16, 28, 38, 0.95)',
                    border: '1px solid rgba(54, 255, 149, 0.5)',
                    borderRadius: '8px',
                    padding: '15px',
                    minWidth: '250px',
                    maxWidth: '400px',
                    zIndex: 1003,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(54, 255, 149, 0.2)'
                    }}>
                      <h3 style={{ margin: 0, color: '#36ff95', fontSize: '16px' }}>About This Episode</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowModalInfoDropdown(false);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#36ff95',
                          cursor: 'pointer',
                          fontSize: '18px',
                          padding: '0',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <p style={{
                      margin: 0,
                      color: '#d1efe7',
                      lineHeight: '1.6',
                      fontSize: '14px'
                    }}>
                      {selectedVideo.description}
                    </p>
                  </div>
                )}
                <Link
                  to="/news/ai-productivity-stack-solo-founders-10-tools-run-business-alone-2025"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVideo(null);
                    setVideoCurrentTime(null);
                    setShowModalLinksDropdown(false);
                    setShowModalInfoDropdown(false);
                  }}
                  style={{
                    background: 'rgba(16, 28, 38, 0.9)',
                    border: '1px solid rgba(54, 255, 149, 0.5)',
                    color: '#36ff95',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(54, 255, 149, 0.2)';
                    e.target.style.borderColor = '#36ff95';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(16, 28, 38, 0.9)';
                    e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                  }}
                >
                  Full Article
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Podcast;
