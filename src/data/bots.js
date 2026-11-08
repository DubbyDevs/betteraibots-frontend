import InVideoFreeTrialImg from '../assets/InVideoFreeTrial.webp';
import InVideoFreeTrial2Img from '../assets/InVideoFreeTrial2.webp';

export const rawBots = [
  {
    title: "n8n - AI Workflow Automation",
    desc: "Build AI agents and automate workflows with the world's most popular open-source automation platform.",
    image: "/n8nai.webp",
    free: false,
    openaiLink: "https://n8n.partnerlinks.io/BAIB",
    isAffiliate: true,
    categories: ["Productivity", "AI"],
    freeLabel: "Free Trial"
  },
  {
    title: "AdCreative.ai",
    desc: "Generate conversion-focused ad creatives, texts, photoshoots, and videos that outperform competitors.",
    image: "/SQUAREad.mp4",
    isVideo: true,
    free: false,
    openaiLink: "https://free-trial.adcreative.ai/BAIB",
    isAffiliate: true,
    categories: ["Creative Tools", "Productivity"],
    freeLabel: "Free Trial"
  },
  {
    title: "InVideo AI",
    desc: "The Future of Video Creation Is Here!",
    image: InVideoFreeTrialImg,
    rotatingImages: [InVideoFreeTrialImg, InVideoFreeTrial2Img],
    free: false,
    openaiLink: "https://invideo.sjv.io/c/6368097/2210623/12258",
    isAffiliate: true,
    affiliateHtml: `<a rel="sponsored" href="https://invideo.sjv.io/c/6368097/2210623/12258" target="_top" id="2210623"><img src="//a.impactradius-go.com/display-ad/12258-2210623" border="0" alt="" width="500" height="500"/></a><img height="0" width="0" src="https://imp.pxf.io/i/6368097/2210623/12258" style="position:absolute;visibility:hidden;" border="0" />`,
    categories: ["Creative Tools"],
    freeLabel: "Free Trial"
  }
];

export const placeholderImgs = [];

export function shuffle(arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function assignBotImages(rawBots) {
  return rawBots.map(bot => ({ ...bot }));
}

export const bots = assignBotImages(rawBots);
