const fs = require('fs');
const path = require('path');
const {
  extractLearnArticlesFromSource,
  markdownToHtml,
  buildStaticPageHtml
} = require('./seo-utils');

const affiliateLinks = {
  "bebop-ai": "https://try.bebop.ai/o004cood3aod",
  "pipes-ai": "https://try.pipes.ai/hmqj0m3am6un",
  "runpod": "https://get.runpod.io/w3na2cm4xdjp",
  "seosparkplug": "https://seosparkplug.com",
  "brevo-complete-guide": "https://get.brevo.com/um9xszmf3nfd",
  "aisdr-complete-guide": "https://partner.aisdr.com/5fxea2u5m85d",
  "adcreative-ai": "https://free-trial.adcreative.ai/BAIB",
  "alli-ai": "https://try.alliai.com/0guepbqpqhsf",
  "apollo-io": "https://get.apollo.io/BAIB",
  "atria": "https://affiliates.tryatria.com/BAIB",
  "recomaze": "https://affiliate.recomaze.ai/BAIB",
  "vida-ai-agent-os": "https://try.vida.io/BAIB",
  "vista-social": "https://join.vistasocial.com/BAIB",
  "plesk": "https://try.plesk.com/BAIB",
  "surecam": "https://join.surecam.com/BAIB",
  "diginius": "https://get.diginius.com/rvao67pwqqux",
  "smartli": "https://smartli.partnerlinks.io/BAIB",
  "consensus": "https://get.consensus.app/BAIB",
  "browse-ai": "https://partners.browse.ai/BAIB",
  "blackbox-ai": "https://blackboxai.partnerlinks.io/BAIB",
  "capsule-crm-complete-guide": "https://get.capsulenow.io/BAIB",
  "flowith-io": "https://aff.flowith.io/52dtlja1b580",
  "hume-ai": "https://try.hume.ai/BAIB",
  "practice-ignition": "https://get.practiceignition.com/BAIB",
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
  "veed-complete-guide": "https://veed.cello.so/rwFO6zwGZh9",
  "webydo": "https://partners.webydo.com/BAIB",
  "wispr-flow-complete-guide": "https://wisprflow.ai/downloads?referral=KING16",
  "catalister": "https://join.catalister.com/BAIB",
  "castmagic": "https://get.castmagic.io/qdu0jfhfcurv",
  "viral-launch": "https://affiliate.viral-launch.com/BAIB",
  "anybiz": "https://anybiz.io/?fpr=ai4n56",
  "megahr": "https://try.megahr.com/BAIB",
  "airia": "https://try.airia.com/BAIB",
  "museit-art-complete-guide": "https://museit.art/?ref=BAIB",
  "nanoz-complete-guide": "https://nanoz.fun",
  "pinecone-vector-database": "https://www.skowers.com/api/go/d8",
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
  "bidx": "https://try.bidx.io/BAIB",
  "laxis": "https://get.laxis.com/BAIB",
  "krispcall": "https://try.krispcall.com/BAIB",
  "getresponse": "https://try.getresponsetoday.com/BAIB",
  "creativescore": "https://affiliate.creativescore.ai/BAIB",
  "seamless-ai-complete-guide": "https://get.seamless.ai/BAIB",
  "databox": "https://join.databox.com/BAIB",
  "instaglamor": "https://www.InstaGlamor.com",
  "adwisely": "https://get.adwisely.com/BAIB",
  "turbotic": "https://try.turbotic.com/BAIB",
  "gohighlevel": "https://www.gohighlevel.com/?fp_ref=baib",
  "weave": "https://partnerstack.getweave.com/BAIB"
};

const ogImageMap = {
  "pinecone-vector-database": "https://betteraibots.com/pineconeai.jpg",
  "practice-ignition": "https://betteraibots.com/ignitionlogo.jpg",
  "instaglamor": "https://betteraibots.com/assets/instaglamorlogo.png",
  "apollo-io": "https://betteraibots.com/apollo.png",
  "databox": "https://betteraibots.com/assets/databoxai.jpg",
  "hume-ai": "https://betteraibots.com/hume2.jpg?v=2",
  "invideo-ai": "https://betteraibots.com/assets/InVideoFreeTrial.png"
};

const keywordMap = {
  "pinecone-vector-database": "Pinecone, vector database, RAG, semantic search, AI search infrastructure, BetterAiBots",
  "practice-ignition": "Ignition, proposals, client onboarding, accounting firms, recurring billing, BetterAiBots"
};

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

try {
  const articles = extractLearnArticlesFromSource();
  const unique = new Map();
  articles.forEach((a) => {
    if (!unique.has(a.id)) unique.set(a.id, a);
  });

  let count = 0;
  unique.forEach((article) => {
    const articleUrl = `https://betteraibots.com/learn/${article.id}`;
    const bodyHtml = markdownToHtml(article.content);
    if (!bodyHtml || bodyHtml.length < 200) {
      console.warn(`⚠️  Short content for ${article.id} (${bodyHtml.length} chars) — check extraction`);
    }
    const html = buildStaticPageHtml({
      title: article.title,
      description: article.preview || article.title,
      canonicalUrl: articleUrl,
      ogImage: getOGImage(article.id),
      keywords: keywordMap[article.id] || "AI tools, artificial intelligence, BetterAiBots",
      dateISO: parseDateISO(article.date),
      bodyHtml,
      ctaHref: affiliateLinks[article.id] || null,
      ctaLabel: affiliateLinks[article.id] ? "Get Started" : null,
      sectionLabel: "AI Tools Guide"
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
