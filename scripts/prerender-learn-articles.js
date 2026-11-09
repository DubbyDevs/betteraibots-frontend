const fs = require('fs');
const path = require('path');
const {
  extractLearnArticlesFromSource,
  markdownToHtml,
  buildStaticPageHtml
} = require('./seo-utils');
const {
  buildReadMoreEnhancementMarkdown,
  buildReadMoreFaqSchema
} = require('./read-more-enhancements');
const articleIndexingRules = require('../src/data/articleIndexingRules.json');

const affiliateLinks = {  "runpod": "https://get.runpod.io/w3na2cm4xdjp",
  "netlify-complete-guide": "https://join.netlify.com/BAIB2",
  "seosparkplug": "https://seosparkplug.com",
  "brevo-complete-guide": "https://get.brevo.com/um9xszmf3nfd",
  "aisdr-complete-guide": "https://partner.aisdr.com/5fxea2u5m85d",
  "adcreative-ai": "https://free-trial.adcreative.ai/BAIB",  "apollo-io": "https://get.apollo.io/BAIB",
  "atria": "https://affiliates.tryatria.com/BAIB",  "vida-ai-agent-os": "https://try.vida.io/BAIB",
  "vista-social": "https://join.vistasocial.com/BAIB",
  "plesk": "https://try.plesk.com/BAIB",
  "surecam": "https://join.surecam.com/BAIB",
  "diginius": "https://get.diginius.com/rvao67pwqqux",
  "smartli": "https://smartli.partnerlinks.io/BAIB",
  "consensus": "https://get.consensus.app/BAIB",
  "browse-ai": "https://partners.browse.ai/BAIB",  "capsule-crm-complete-guide": "https://get.capsulenow.io/BAIB",  "practice-ignition": "https://get.practiceignition.com/BAIB",
  "omniseo": "https://get.omniseo.com/BAIB",
  "compliancely": "https://get.compliancely.com/gwmdzyd8i95g",
  "teikametrics": "https://join.teikametrics.com/BAIB",
  "spiky-ai": "https://get.spiky.ai/BAIB",
  "emergent": "https://get.emergent.sh/BAIB",
  "sleekflow": "https://sleekflow.partnerlinks.io/BAIB",
  "invideo-ai": "https://invideo.sjv.io/c/6368097/2210623/12258",
  "lindy-ai": "https://try.lindy.ai/lhgvxfidor04",
  "lusha": "https://partnerstack.lusha.com/w61xn76pa3sr",
  "miro-complete-guide": "https://ps.miro-affiliate.com/gwnvu4zj3r8r",
  "mrpeasy-complete-guide": "https://try.mrpeasy.com/m72w6bztymwh",
  "murf-ai-complete-guide": "https://get.murf.ai/i5n7gfvz5cbw",
  "reply-io-complete-guide": "https://get.reply.io/ub7edypmq2gj",
  "thordata": "https://affiliate.thordata.com/BAIB",
  "tidio-ai": "https://affiliate.tidio.com/BAIB",
  "veed-complete-guide": "https://www.veed.io/referral-sign-up?productId=www.veed.io&ucc=2KWVFnsJmFA&celloN=c2hheW5l",  "wispr-flow-complete-guide": "https://wisprflow.ai/downloads?referral=KING16",  "castmagic": "https://get.castmagic.io/qdu0jfhfcurv",
  "viral-launch": "https://affiliate.viral-launch.com/BAIB",
  "anybiz": "https://anybiz.io/?fpr=ai4n56",
  "megahr": "https://try.megahr.com/BAIB",
  "airia": "https://try.airia.com/BAIB",
  "museit-art-complete-guide": "https://museit.art/?ref=BAIB",  "pinecone-vector-database": "https://www.skowers.com/api/go/d8",
  "prezi-complete-guide": "https://prezi.sjv.io/BAIB",
  "quillbot-complete-guide": "https://try.quillbot.com/BAIB",
  "landingi-complete-guide": "https://try.landingi.com/lwfc597yjm25",
  "tradify-complete-guide": "https://tradify.sjv.io/BAIB",
  "logome-complete-guide": "https://logomeai.partnerlinks.io/BAIB",
  "datahawk": "https://get.datahawk.co/eoe07kko8pol",
  "descript": "https://get.descript.com/BAIB",
  "unbounce": "https://unbounce.partnerlinks.io/BAIB",
  "landbot": "https://get.landbotlab.com/BAIB",
  "reclaim-ai": "https://go.reclaim.ai/BAIB",
  "amplemarket": "https://grow.amplemarket.com/BAIB",
  "mindstudio": "https://get.mindstudio.ai/BAIB",
  "elevenlabs": "https://try.elevenlabs.io/BAIB",
  "gamma": "https://try.gamma.app/BAIB",
  "rankprompt": "https://join.rankprompt.com/BAIB",
  "snowfire-ai": "https://snowfire.com/?ref=BAIB",
  "volza": "https://partner.volza.com/BAIB",
  "bidx": "https://try.bidx.io/BAIB",  "krispcall": "https://try.krispcall.com/BAIB",
  "getresponse": "https://try.getresponsetoday.com/BAIB",  "seamless-ai-complete-guide": "https://get.seamless.ai/BAIB",
  "databox": "https://join.databox.com/BAIB",
  "adwisely": "https://get.adwisely.com/BAIB",
  "turbotic": "https://try.turbotic.com/BAIB",
  "typewise": "https://partner.typewise.app/BAIB",
  "dry-ground-ai": "https://partners.dryground.ai/BAIB",
  "sentaro": "https://join.sentaro.com/BAIB",
  "inworld-ai": "https://get.platform.inworld.ai/rnxb5vvp6xi7",
  "fireflies": "https://get.fireflies.ai/evv55a4ve7wd",
  "ngram": "https://partner.ngram.com/BAIB",
  "aisq": "https://try.aisq.com/BAIB",
  "alli-ai": "https://www.alliai.com/?red=betterf2ec0b",
  "socialdesk": "https://socialdesk.ai/?red=betterf2ec0b",
  "marblism": "https://marblism.com?via=BAIB",
  "runable": "https://runable.link/BAIB",
  "clico": "https://tryclico.link/BAIB",
  "firecrawl": "https://firecrawl.link/BAIB",
  "team-pulse": "https://goteampulse.io/?red=betterf2ec0b",
  "billingnow": "https://billingnow.com/?red=betterf2ec0b",
  "rankbolt": "https://rankbolt.ai/?red=betterf2ec0b",
  "mera-work": "https://mera.work/?red=betterf2ec0b",
  "parallel": "https://parallellabs.app/?red=betterf2ec0b",
  "buzz": "https://buzz.ai/?red=betterf2ec0b",
  "algomo": "https://algomo.com/?red=betterf2ec0b",
  "edesk": "https://www.edesk.com/?red=betterf2ec0b",
  "alttext": "https://alttext.ai/?red=betterf2ec0b",
  "involveme": "https://www.involve.me/?red=betterf2ec0b",
  "gixo": "https://gixo.ai/?red=betterf2ec0b",
  "gohighlevel": "https://www.gohighlevel.com/?fp_ref=baib",
  "weave": "https://partnerstack.getweave.com/BAIB"
};

const ogImageMap = {
  "pinecone-vector-database": "https://betteraibots.com/pineconeai.jpg",
  "practice-ignition": "https://betteraibots.com/ignitionlogo.jpg",
  "apollo-io": "https://betteraibots.com/apollo.png",
  "parallel": "https://betteraibots.com/parallelai.jpg",
  "buzz": "https://betteraibots.com/buzz-ai.jpg",
  "algomo": "https://betteraibots.com/algomoai.jpg",
  "edesk": "https://betteraibots.com/edesklogo.jpg",
  "alttext": "https://betteraibots.com/alttext_ai_logo.jpg",
  "involveme": "https://betteraibots.com/involveme-logo.jpg",
  "gixo": "https://betteraibots.com/gixoai.png",
  "databox": "https://betteraibots.com/assets/databoxai.jpg",  "invideo-ai": "https://betteraibots.com/assets/InVideoFreeTrial.png"
};

function loadArticleSeoData() {
  const seoPath = path.join(__dirname, '..', 'src', 'data', 'articleSeo.js');
  const content = fs.readFileSync(seoPath, 'utf8');
  const kwMatch = content.match(/export const ARTICLE_KEYWORDS = (\{[\s\S]*?\n\});/);
  const descMatch = content.match(/export const ARTICLE_SEO_DESCRIPTIONS = (\{[\s\S]*?\n\});/);
  if (!kwMatch || !descMatch) {
    throw new Error('Could not parse articleSeo.js — run: node scripts/build-article-seo-data.js');
  }
  // eslint-disable-next-line no-eval
  return {
    keywords: eval(`(${kwMatch[1]})`),
    descriptions: eval(`(${descMatch[1]})`)
  };
}

const { keywords: articleKeywords, descriptions: articleDescriptions } = loadArticleSeoData();

function extractAppsByLearnPath() {
  const appsPath = path.join(__dirname, '..', 'src', 'data', 'appsData.js');
  const content = fs.readFileSync(appsPath, 'utf8');
  const apps = {};
  const blocks = content.split(/\r?\n  \},\r?\n/);

  for (const block of blocks) {
    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    const descMatch = block.match(/description:\s*"([^"]+)"/);
    const categoryMatch = block.match(/category:\s*"([^"]+)"/);
    const linkMatch = block.match(/readMoreLink:\s*"(\/learn\/[^"]+)"/);
    const featuresMatch = block.match(/features:\s*\[([\s\S]*?)\]/);
    if (!nameMatch || !linkMatch) continue;

    const id = linkMatch[1].replace('/learn/', '');
    const features = featuresMatch
      ? [...featuresMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
      : [];

    apps[id] = {
      name: nameMatch[1],
      description: descMatch ? descMatch[1] : '',
      category: categoryMatch ? categoryMatch[1] : '',
      features
    };
  }

  return apps;
}

const appsByLearnPath = extractAppsByLearnPath();

function getOGImage(articleId) {
  return ogImageMap[articleId] || "https://betteraibots.com/og-image.png?v=3";
}

function parseDateISO(dateStr) {
  if (!dateStr) return new Date().toISOString();
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

const learnDir = path.join(__dirname, '..', 'public', 'learn');
if (!fs.existsSync(learnDir)) {
  fs.mkdirSync(learnDir, { recursive: true });
}
for (const filename of fs.readdirSync(learnDir)) {
  if (filename.endsWith('.html')) {
    fs.unlinkSync(path.join(learnDir, filename));
  }
}

try {
  const articles = extractLearnArticlesFromSource();
  const unique = new Map();
  const redirectMap = articleIndexingRules.redirects || {};
  const noindexIds = new Set(articleIndexingRules.noindex || []);
  articles.forEach((a) => {
    if (!unique.has(a.id)) unique.set(a.id, a);
  });

  let count = 0;
  unique.forEach((article) => {
    if (redirectMap[article.id] || noindexIds.has(article.id)) {
      return;
    }
    const articleUrl = `https://betteraibots.com/learn/${article.id}`;
    const app = appsByLearnPath[article.id] || null;
    const enhancementMarkdown = buildReadMoreEnhancementMarkdown(article, app);
    const faqSchema = buildReadMoreFaqSchema(article, app);
    const bodyHtml = markdownToHtml(`${article.content || ''}${enhancementMarkdown || ''}`);
    if (!bodyHtml || bodyHtml.length < 200) {
      console.warn(`⚠️  Short content for ${article.id} (${bodyHtml.length} chars) — check extraction`);
    }
    const html = buildStaticPageHtml({
      title: article.title,
      description: articleDescriptions[article.id] || article.preview || article.title,
      canonicalUrl: articleUrl,
      ogImage: getOGImage(article.id),
      keywords: articleKeywords[article.id] || "AI tools, artificial intelligence, BetterAiBots",
      dateISO: parseDateISO(article.date),
      bodyHtml,
      ctaHref: affiliateLinks[article.id] || null,
      ctaLabel: affiliateLinks[article.id] ? "Get Started" : null,
      sectionLabel: "AI Tools Guide",
      extraStructuredData: faqSchema ? [faqSchema] : [],
      robotsContent: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    });
    fs.writeFileSync(path.join(learnDir, `${article.id}.html`), html);
    count++;
    console.log(`✅ ${article.id}.html (${bodyHtml.length} chars body)`);
  });

  console.log(`\n🎉 Prerendered ${count} learn articles with full content for search engines.`);
} catch (err) {
  console.error('Prerender learn failed:', err);
  console.log('⚠️  Continuing build despite prerender errors');
}
process.exit(0);
