import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import baiblive6 from './assets/liveslider/baiblive6.jpg';
import betteraibotsliveEp155Copy55 from './assets/betteraibotslive ep155 copy55.jpg';
import warmyio2 from './assets/warmyio2.jpg';
import smallBusinessTools from './assets/BetterAiBots Small Business Tools.jpg';

// Affiliate links for videos
const aiToolsLinks = [
  { name: 'Tidio AI', url: 'https://affiliate.tidio.com/BAIB' },
  { name: 'Lusha', url: 'https://partnerstack.lusha.com/w61xn76pa3sr' },
  { name: 'Apollo AI', url: 'https://get.apollo.io/BAIB' },
  { name: 'Brevo', url: 'https://get.brevo.com/um9xszmf3nfd' },
  { name: 'Capsule CRM', url: 'https://get.capsulenow.io/BAIB' },
  { name: 'Flowith.io', url: 'https://aff.flowith.io/52dtlja1b580' },
  { name: 'Lindy', url: 'https://try.lindy.ai/lhgvxfidor04' },
  { name: 'Miro', url: 'https://ps.miro-affiliate.com/gwnvu4zj3r8r' },
  { name: 'Reply.io', url: 'https://get.reply.io/ub7edypmq2gj' },
  { name: 'AdCreative', url: 'https://free-trial.adcreative.ai/BAIB' }
];

const emailDeliverabilityLinks = [
  { name: 'Warmy.io', url: 'https://warmyio.partnerlinks.io/ffy5y6ll9374' }
];

// Video data - matches the videos from Podcast.js
const videoData = {
  'ai-companions-why-20-million-people-are-choosing-digital-love': {
    id: 'O9xN3anQKbM',
    title: 'AI Companions - Why 20 Million People Are Choosing Digital Love',
    description: `In this episode, we dive into the uncomfortable reality of AI companions: why millions are choosing digital intimacy over human connection, what this reveals about our loneliness epidemic, and the psychological truths we're being forced to confront.`,
    thumbnail: baiblive6,
    slug: 'ai-companions-why-20-million-people-are-choosing-digital-love',
    links: null
  },
  '10-ai-tools-to-give-you-leverage-to-run-everything-alone': {
    id: 'PbanVBegAlk',
    title: '10 AI Tools to give YOU leverage to run EVERYTHING ALONE!',
    description: `In this episode, we break down 10 game-changing AI tools that transform how solo entrepreneurs operate. From customer service to sales, operations to marketing - learn how to build your own AI productivity stack and become a true one-person powerhouse.`,
    thumbnail: betteraibotsliveEp155Copy55,
    slug: '10-ai-tools-to-give-you-leverage-to-run-everything-alone',
    links: aiToolsLinks
  },
  'how-to-fix-email-deliverability': {
    id: 'ytCyZ3LeXJ4',
    title: 'How to Fix Email Deliverability',
    description: `In this episode, we dive deep into the invisible infrastructure of email trust and explore Warmy.io—an AI-powered tool that's fighting what they call "the spam folder rebellion." Meet Adeline, the AI assistant that systematically builds your domain's reputation by answering the five critical questions every email algorithm asks before letting you into the inbox.`,
    thumbnail: warmyio2,
    slug: 'how-to-fix-email-deliverability',
    links: emailDeliverabilityLinks
  },
  'why-small-businesses-are-beating-enterprise': {
    id: 'Kv-JFSjQsRs',
    title: 'Why Small Businesses Are Beating Enterprise',
    description: `For 30 years, big corporations held all the cards — massive budgets, huge IT teams, custom tech fortresses. Small businesses were always playing catch-up.

But with generative AI, that pattern is being blown apart.

In this episode, we explore why small businesses are implementing AI at speeds their massive enterprise rivals simply can't match. We break down the structural reasons — speed, flexibility, clean data, and focus — and reveal why the biggest risk today isn't picking the wrong tool. It's waiting.`,
    thumbnail: smallBusinessTools,
    slug: 'why-small-businesses-are-beating-enterprise',
    links: null
  },
  'the-ai-home-office-gold-rush-10-income-streams-for-you': {
    id: 'tvU6VpFxl0c',
    title: 'The AI Home Office GOLD RUSH: 10 Income Streams For You!',
    description: `The AI Home Office Gold Rush is happening RIGHT NOW. While most people are still wondering if AI will replace their jobs, smart entrepreneurs are already using it to multiply their output by 10x—sometimes 100x.`,
    thumbnail: '/airemotejobs.jpg',
    slug: 'the-ai-home-office-gold-rush-10-income-streams-for-you',
    links: null
  }
};

function VideoWatchPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    if (slug && videoData[slug]) {
      setVideo(videoData[slug]);
    } else {
      // Redirect to podcast page if video not found
      navigate('/Podcast');
    }
  }, [slug, navigate]);

  if (!video) {
    return null;
  }

  const thumbnailUrl = video.thumbnail
    ? (typeof video.thumbnail === 'string'
        ? (video.thumbnail.startsWith('http')
            ? video.thumbnail
            : `https://betteraibots.com${video.thumbnail}`)
        : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`)
    : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <>
      <Helmet>
        <title>{video.title} | BetterAiBots Podcast</title>
        <meta name="description" content={video.description.substring(0, 160)} />
        <meta name="keywords" content={`${video.title}, AI podcast, BetterAiBots, AI tools, artificial intelligence, video podcast`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={`https://betteraibots.com/watch/${video.slug}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={`https://betteraibots.com/watch/${video.slug}`} />
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={video.description.substring(0, 160)} />
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:video" content={`https://www.youtube.com/embed/${video.id}`} />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta property="og:site_name" content="BetterAiBots" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:url" content={`https://betteraibots.com/watch/${video.slug}`} />
        <meta name="twitter:title" content={video.title} />
        <meta name="twitter:description" content={video.description.substring(0, 160)} />
        <meta name="twitter:image" content={thumbnailUrl} />
        <meta name="twitter:player" content={`https://www.youtube.com/embed/${video.id}`} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />

        {/* VideoObject Structured Data for Watch Page */}
        <script type="application/ld+json">
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
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": video.title,
                "item": `https://betteraibots.com/watch/${video.slug}`
              }
            ]
          })}
        </script>
      </Helmet>

<div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        color: '#e0e0e0'
      }}>
        {/* Back to Podcast Link */}
        <Link 
          to="/Podcast"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#36ff95',
            textDecoration: 'none',
            marginBottom: '30px',
            fontSize: '1rem',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#0bbfdb';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#36ff95';
          }}
        >
          ← Back to Podcast
        </Link>

        {/* Video Title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '20px',
          color: '#fff',
          lineHeight: '1.3'
        }}>
          {video.title}
        </h1>

        {/* Video Embed */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%',
          background: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '30px',
          boxShadow: '0 10px 40px rgba(54, 255, 149, 0.3)'
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=0&rel=0&enablejsapi=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
          ></iframe>
        </div>

        {/* Video Description */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 28, 38, 0.9) 0%, rgba(23, 45, 62, 0.9) 100%)',
          padding: '30px',
          borderRadius: '12px',
          border: '1px solid rgba(54, 255, 149, 0.2)',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '15px',
            color: '#36ff95'
          }}>
            About This Episode
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#e0e0e0',
            whiteSpace: 'pre-line'
          }}>
            {video.description}
          </p>
        </div>

        {/* Tools Mentioned / Affiliate Links */}
        {video.links && video.links.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 28, 38, 0.9) 0%, rgba(23, 45, 62, 0.9) 100%)',
            padding: '30px',
            borderRadius: '12px',
            border: '1px solid rgba(54, 255, 149, 0.2)',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '20px',
              color: '#36ff95'
            }}>
              Tools Mentioned
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              {video.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#d1efe7',
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    display: 'block',
                    background: 'rgba(54, 255, 149, 0.05)',
                    border: '1px solid rgba(54, 255, 149, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(54, 255, 149, 0.15)';
                    e.target.style.color = '#36ff95';
                    e.target.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(54, 255, 149, 0.05)';
                    e.target.style.color = '#d1efe7';
                    e.target.style.borderColor = 'rgba(54, 255, 149, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Watch on YouTube Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              background: 'linear-gradient(135deg, #36ff95 0%, #0bbfdb 100%)',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(54, 255, 149, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 30px rgba(54, 255, 149, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(54, 255, 149, 0.3)';
            }}
          >
            Watch on YouTube
          </a>
        </div>

        {/* Related Videos Section */}
        <div style={{
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(54, 255, 149, 0.2)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 600,
            marginBottom: '30px',
            color: '#36ff95'
          }}>
            More Episodes
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {Object.values(videoData)
              .filter(v => v.slug !== video.slug)
              .slice(0, 3)
              .map((relatedVideo) => {
                const relatedThumbnail = relatedVideo.thumbnail 
                  ? (typeof relatedVideo.thumbnail === 'string' 
                      ? (relatedVideo.thumbnail.startsWith('http') 
                          ? relatedVideo.thumbnail 
                          : `https://betteraibots.com${relatedVideo.thumbnail}`)
                      : `https://img.youtube.com/vi/${relatedVideo.id}/maxresdefault.jpg`)
                  : `https://img.youtube.com/vi/${relatedVideo.id}/maxresdefault.jpg`;
                
                return (
                  <Link
                    key={relatedVideo.slug}
                    to={`/watch/${relatedVideo.slug}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(16, 28, 38, 0.9) 0%, rgba(23, 45, 62, 0.9) 100%)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(54, 255, 149, 0.2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(54, 255, 149, 0.5)';
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(54, 255, 149, 0.3)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(54, 255, 149, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '56.25%',
                        background: '#000'
                      }}>
                        <img
                          src={relatedThumbnail}
                          alt={relatedVideo.title}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.src = `https://img.youtube.com/vi/${relatedVideo.id}/maxresdefault.jpg`;
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '60px',
                          height: '60px',
                          background: 'rgba(54, 255, 149, 0.9)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 30px rgba(54, 255, 149, 0.6)'
                        }}>
                          <div style={{
                            width: 0,
                            height: 0,
                            borderLeft: '20px solid #000',
                            borderTop: '12px solid transparent',
                            borderBottom: '12px solid transparent',
                            marginLeft: '5px'
                          }}></div>
                        </div>
                      </div>
                      <div style={{ padding: '20px' }}>
                        <h3 style={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          marginBottom: '10px',
                          color: '#fff',
                          lineHeight: '1.4'
                        }}>
                          {relatedVideo.title}
                        </h3>
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#b0b0b0',
                          lineHeight: '1.5',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {relatedVideo.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoWatchPage;





