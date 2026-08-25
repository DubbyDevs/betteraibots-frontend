const fs = require('fs');
const path = require('path');
const { escapeHtml } = require('./seo-utils');
const { WATCH_VIDEOS } = require('./watch-videos');

const watchDir = path.join(__dirname, '..', 'public', 'watch');
if (!fs.existsSync(watchDir)) {
  fs.mkdirSync(watchDir, { recursive: true });
}

const BASE = 'https://betteraibots.com';
const publishedDate = '2025-11-20';

function videoStructuredData(video) {
  const watchUrl = `${BASE}/watch/${video.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    uploadDate: publishedDate,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    publisher: {
      '@type': 'Organization',
      name: 'BetterAiBots',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/betteraibotsglowlogo8.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': watchUrl
    }
  };
}

function breadcrumbStructuredData(video) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Podcast', item: `${BASE}/Podcast` },
      { '@type': 'ListItem', position: 3, name: video.title, item: `${BASE}/watch/${video.slug}` }
    ]
  };
}

function buildWatchHtml(video) {
  const watchUrl = `${BASE}/watch/${video.slug}`;
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0`;
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const safeTitle = escapeHtml(video.title);
  const safeDesc = escapeHtml(video.description);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle} - BetterAiBots Podcast</title>
  <meta name="description" content="${safeDesc}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${watchUrl}">
  <meta property="og:type" content="video.other">
  <meta property="og:url" content="${watchUrl}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:image" content="${thumbnailUrl}">
  <meta property="og:video" content="${embedUrl}">
  <meta property="og:video:type" content="text/html">
  <meta name="twitter:card" content="player">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${thumbnailUrl}">
  <meta name="twitter:player" content="${embedUrl}">
  <script type="application/ld+json">
${JSON.stringify(videoStructuredData(video), null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(breadcrumbStructuredData(video), null, 2)}
  </script>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: #101c26; color: #e9f7ee; line-height: 1.7; }
    .site-header { background: #172d3e; padding: 16px 20px; border-bottom: 1px solid rgba(54,255,149,0.2); }
    .site-header a { color: #36ff95; text-decoration: none; margin-right: 20px; font-weight: 700; }
    main { max-width: 980px; margin: 0 auto; padding: 32px 20px 56px; }
    h1 { color: #fff; font-size: 2.25rem; line-height: 1.2; margin: 0 0 20px; }
    .video-frame { position: relative; width: 100%; padding-top: 56.25%; background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
    .video-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
    .summary { background: #172d3e; border: 1px solid rgba(54,255,149,0.16); border-radius: 12px; padding: 22px; }
    .watch-link { display: inline-block; color: #101c26; background: #36ff95; padding: 12px 18px; border-radius: 8px; font-weight: 700; text-decoration: none; margin-top: 16px; }
  </style>
</head>
<body>
  <header class="site-header">
    <a href="${BASE}/">Home</a>
    <a href="${BASE}/Podcast">Podcast</a>
  </header>
  <main>
    <h1>${safeTitle}</h1>
    <div class="video-frame">
      <iframe src="${embedUrl}" title="${safeTitle}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <section class="summary">
      <h2>About this episode</h2>
      <p>${safeDesc}</p>
      <a class="watch-link" href="https://www.youtube.com/watch?v=${video.youtubeId}" rel="noopener noreferrer">Watch on YouTube</a>
    </section>
  </main>
</body>
</html>`;
}

WATCH_VIDEOS.forEach((video) => {
  fs.writeFileSync(path.join(watchDir, `${video.slug}.html`), buildWatchHtml(video), 'utf8');
  console.log(`✅ watch/${video.slug}.html`);
});

console.log(`\n🎉 Prerendered ${WATCH_VIDEOS.length} watch pages with video markup.`);
