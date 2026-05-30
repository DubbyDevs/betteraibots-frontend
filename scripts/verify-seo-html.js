/**
 * One command: verify all prerendered learn/news HTML is index-ready.
 * Optionally spot-check live URLs (Googlebot UA) after deploy.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const root = path.join(__dirname, '..');
const MIN_BODY_CHARS = 500;

function extractArticleBodyText(html) {
  const bodyMatch = html.match(
    /<div class="article-body">\s*([\s\S]*?)\s*<\/div>\s*(?:<p><a href=|<p class="footer-note")/
  );
  const raw = bodyMatch ? bodyMatch[1] : html;
  return raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function checkHtmlDir(dir, label) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  ${label}: directory missing (${dir})`);
    return { total: 0, ok: 0, bad: [] };
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
  const bad = [];
  let ok = 0;
  for (const f of files) {
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    const bodyLen = extractArticleBodyText(html).length;
    const hasNoindex = /noindex/i.test(html);
    const hasCanonical = html.includes('rel="canonical"');
    if (bodyLen < MIN_BODY_CHARS || hasNoindex || !hasCanonical) {
      bad.push({ file: f, bodyLen, hasNoindex, hasCanonical });
    } else {
      ok++;
    }
  }
  console.log(`${label}: ${ok}/${files.length} files OK (≥${MIN_BODY_CHARS} chars, indexable)`);
  if (bad.length) {
    console.log(`  ⚠️  ${bad.length} problem(s):`);
    bad.slice(0, 10).forEach((b) =>
      console.log(`     ${b.file} — ${b.bodyLen} chars, noindex=${b.hasNoindex}`)
    );
  }
  return { total: files.length, ok, bad };
}

function fetchLive(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () =>
          resolve({
            status: res.statusCode,
            len: data.length,
            hasArticleBody: data.includes('article-body'),
            hasRootDiv: data.includes('id="root"') && !data.includes('article-body'),
            snippet: data.slice(0, 120).replace(/\s+/g, ' ')
          })
        );
      }
    );
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

async function main() {
  console.log('=== SEO HTML verification (local files) ===\n');
  const learn = checkHtmlDir(path.join(root, 'public', 'learn'), 'Learn articles');
  const news = checkHtmlDir(path.join(root, 'public', 'news'), 'News articles');

  const localOk = learn.bad.length === 0 && news.bad.length === 0;
  console.log(localOk ? '\n✅ All local HTML files are ready for Google.\n' : '\n❌ Fix local prerender issues above.\n');

  const samples = [
    'https://betteraibots.com/learn/close-complete-guide',
    'https://betteraibots.com/learn/beautiful-ai-complete-guide',
    'https://betteraibots.com/news/ai-job-boom-how-to-get-hired-in-the-ai-revolution'
  ];

  console.log('=== Live spot-check (3 URLs, Googlebot UA) ===');
  console.log('(If deploy not done yet, live may still show old empty shell.)\n');

  for (const url of samples) {
    try {
      const r = await fetchLive(url);
      const status =
        r.hasArticleBody && r.len > 3000
          ? '✅ FULL HTML (fix is live or will be after deploy)'
          : r.hasRootDiv
          ? '❌ EMPTY SPA SHELL (deploy the _redirects fix)'
          : `⚠️  unclear (${r.len} bytes)`;
      console.log(`${url}`);
      console.log(`  HTTP ${r.status} | ${r.len} bytes | ${status}\n`);
    } catch (e) {
      console.log(`${url}\n  ⚠️  fetch failed: ${e.message}\n`);
    }
  }

  console.log('=== What YOU do after deploy (2 minutes, not 2 weeks) ===');
  console.log('1. Push/deploy to Netlify (one time).');
  console.log('2. GSC → Sitemaps → open sitemap.xml → click "Resubmit" (one click).');
  console.log('3. Done. Google re-crawls from the sitemap automatically.');
  console.log('   You do NOT need to inspect 91 URLs one by one.\n');
}

main();
