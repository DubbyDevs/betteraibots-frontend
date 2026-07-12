const CATEGORY_GUIDANCE = [
  {
    match: ['sales', 'crm', 'lead', 'outreach', 'prospecting'],
    bestFor: [
      'Sales teams that need a more consistent way to find, qualify, and follow up with prospects.',
      'Founders or operators who want clearer pipeline activity without adding another manual reporting step.',
      'Teams that already have a sales process and need software to make the repetitive parts easier to manage.'
    ],
    notFor: 'It may be too much if you only need a simple contact list or send a few one-off emails each month.',
    compare: 'Compare it against your current CRM, prospecting database, email sequencer, and any manual research process your team already uses.'
  },
  {
    match: ['marketing', 'advertising', 'seo', 'content', 'social', 'email'],
    bestFor: [
      'Marketers who need to plan, create, test, or report on campaigns without jumping between too many tools.',
      'Small teams that want a repeatable workflow for content, ads, email, SEO, or social publishing.',
      'Agencies and business owners who care about speed but still need enough control to keep work on brand.'
    ],
    notFor: 'It is probably not the right fit if you only need an occasional one-off asset and do not plan to measure performance.',
    compare: 'Compare it with the tools you already use for planning, publishing, analytics, creative production, and reporting.'
  },
  {
    match: ['e-commerce', 'ecommerce', 'amazon', 'shopify', 'marketplace', 'dropshipping', 'print'],
    bestFor: [
      'Online sellers who need better product, listing, fulfillment, or marketplace data in one place.',
      'Stores that have outgrown manual spreadsheets and need a clearer operating system for daily work.',
      'Owners who want to test products, campaigns, or listings faster while keeping margin and operations visible.'
    ],
    notFor: 'It may be premature if you have not validated a product, sales channel, or repeatable fulfillment process yet.',
    compare: 'Compare it with your storefront, marketplace tools, inventory workflow, analytics stack, and fulfillment process.'
  },
  {
    match: ['development', 'coding', 'hosting', 'infrastructure', 'database', 'server'],
    bestFor: [
      'Builders and technical teams that want to move faster without giving up control over the workflow.',
      'Projects where setup time, deployment, infrastructure, or code quality is slowing down useful work.',
      'Teams that need practical tooling around development, hosting, data, or AI application delivery.'
    ],
    notFor: 'It can be more than you need if your project is small, static, and already easy to maintain.',
    compare: 'Compare it with your current development workflow, hosting setup, internal tooling, and maintenance requirements.'
  },
  {
    match: ['productivity', 'meeting', 'calendar', 'voice', 'assistant', 'workflow', 'automation'],
    bestFor: [
      'Busy professionals who want fewer repetitive tasks and a cleaner daily workflow.',
      'Teams that need meetings, notes, follow-ups, scheduling, or routine processes to be easier to track.',
      'People who already know where time is being wasted and want a tool that helps remove that friction.'
    ],
    notFor: 'It may not help much if your workflow changes every day and there is no repeatable process to improve.',
    compare: 'Compare it with your calendar, notes, task manager, automation tools, and the manual steps you repeat every week.'
  },
  {
    match: ['design', 'creative', 'video', 'audio', 'presentation', 'brand', 'photography', 'writing'],
    bestFor: [
      'Creators and teams that need polished assets faster while still keeping final creative judgment in human hands.',
      'Businesses that publish often and need a steadier process for visuals, audio, video, writing, or presentations.',
      'Non-designers who want better output without learning a full professional production stack.'
    ],
    notFor: 'It is not a substitute for strong creative direction, brand taste, or final human review.',
    compare: 'Compare it with your current creative tools, templates, freelancer workflow, and approval process.'
  },
  {
    match: ['business', 'management', 'hr', 'recruitment', 'training', 'compliance', 'verification'],
    bestFor: [
      'Teams that need a clearer system for operations, documentation, onboarding, compliance, or internal handoffs.',
      'Owners and managers who want fewer loose ends across repeatable business processes.',
      'Organizations that need better visibility into work that is currently scattered across documents, inboxes, or spreadsheets.'
    ],
    notFor: 'It may feel heavy if the process you want to improve is still undefined or changes too often to document.',
    compare: 'Compare it with the spreadsheets, documents, point tools, and manual review steps your team depends on today.'
  }
];

const DEFAULT_GUIDANCE = {
  bestFor: [
    'People who already understand the problem they want to solve and need a focused tool to make the work faster.',
    'Small teams that want practical software guidance before committing to another subscription.',
    'Users comparing several options and trying to understand where this tool fits in a real workflow.'
  ],
  notFor: 'It is probably not the best choice if you are still unsure what outcome you need or only want to browse tools casually.',
  compare: 'Compare it with your current workflow, the tools you already pay for, and the amount of setup time you can realistically give it.'
};

function cleanText(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sentenceCase(value) {
  const text = cleanText(value);
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getToolName(article, app) {
  if (app?.name) return cleanText(app.name);
  const title = cleanText(article?.title || '');
  return title.split(':')[0].replace(/\bComplete Guide\b/gi, '').trim() || 'this tool';
}

function getGuidance(category, description) {
  const haystack = `${category || ''} ${description || ''}`.toLowerCase();
  return CATEGORY_GUIDANCE.find((item) => item.match.some((term) => haystack.includes(term))) || DEFAULT_GUIDANCE;
}

function hasSection(content, terms) {
  const text = String(content || '').toLowerCase();
  return terms.some((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|\\n)#{2,3}\\s+.*${escaped}`, 'i').test(text);
  });
}

function getFeatureBullets(app, max = 5) {
  if (!Array.isArray(app?.features)) return [];
  return app.features
    .map(cleanText)
    .filter(Boolean)
    .slice(0, max);
}

export function buildReadMoreEnhancement(article, app) {
  if (!article) return { markdown: '', faq: [] };

  const sourceContent = String(article.content || '');
  const name = getToolName(article, app);
  const category = cleanText(app?.category || 'AI tools');
  const description = cleanText(app?.description || article.preview || article.title || '');
  const guidance = getGuidance(category, description);
  const features = getFeatureBullets(app);

  const faq = [
    {
      question: `What is ${name} best used for?`,
      answer: description
        ? `${name} is best used when you need ${description.charAt(0).toLowerCase()}${description.slice(1)}. The strongest fit is a workflow where the tool saves time, improves consistency, or makes a repeated task easier to manage.`
        : `${name} is best used when you have a specific workflow to improve and want a tool that helps you move faster with less manual effort.`
    },
    {
      question: `Who is ${name} best for?`,
      answer: `${name} is best for ${guidance.bestFor[0].replace(/\.$/, '').toLowerCase()}. It is also worth testing if your team already has the process in place and needs better execution, tracking, or output quality.`
    },
    {
      question: `Who should skip ${name}?`,
      answer: guidance.notFor
    },
    {
      question: `How should you test ${name} before committing?`,
      answer: `Pick one real project, run it through ${name}, and compare the result against your normal process. Look at setup time, output quality, integrations, reporting, and whether the tool still feels useful after the first test.`
    },
    {
      question: `What should you compare ${name} with?`,
      answer: guidance.compare
    }
  ];

  const sections = [];

  if (!hasSection(sourceContent, ['best for', 'who should use'])) {
    sections.push(`## Best for ${name}

- ${guidance.bestFor[0]}
- ${guidance.bestFor[1]}
- ${guidance.bestFor[2]}
- Users comparing ${category.toLowerCase()} tools who want a practical read on fit, tradeoffs, and next steps.`);
  }

  if (!hasSection(sourceContent, ['real workflow', 'workflow fit', 'where it fits'])) {
    const featureSentence = features.length
      ? `The features worth paying closest attention to are ${features.join(', ')}.`
      : `The main thing to look for is whether ${name} removes a real bottleneck instead of adding another dashboard to check.`;
    sections.push(`## Where ${name} fits in a real workflow

The easiest way to judge ${name} is to place it inside the work you already do. Start with one repeatable task, one owner, and one clear result you want to improve. If the tool helps that task happen faster or with fewer missed steps, it has a stronger case for staying in your stack.

${featureSentence} Those details matter more than a long feature list because they show whether ${name} can support the daily work behind the promise.`);
  }

  if (!hasSection(sourceContent, ['what to check', 'before you choose', 'buying checklist'])) {
    sections.push(`## What to check before you choose ${name}

- Does ${name} connect with the tools you already use?
- Can you test it on one real project before rolling it out broadly?
- Will the person using it every week understand the workflow without constant help?
- Are the reporting, exports, permissions, or collaboration features strong enough for your team?
- Does the pricing still make sense after the trial, add-ons, usage limits, or seat costs are included?`);
  }

  if (!hasSection(sourceContent, ['get more value', 'implementation tips', 'how to get started'])) {
    sections.push(`## How to get more value from ${name}

Treat the first week as a focused test, not a full migration. Choose one use case, gather the inputs the tool needs, and compare the output against your current baseline. Keep the parts that save time or improve quality, and ignore features that do not support the outcome you actually care about.

For teams, write down when ${name} should be used, who reviews the output, and what a good result looks like. That small amount of process keeps the tool from becoming another experiment that never turns into a habit.`);
  }

  if (!hasSection(sourceContent, ['faq', 'frequently asked questions'])) {
    sections.push(`## ${name} FAQ

### ${faq[0].question}

${faq[0].answer}

### ${faq[1].question}

${faq[1].answer}

### ${faq[2].question}

${faq[2].answer}

### ${faq[3].question}

${faq[3].answer}

### ${faq[4].question}

${faq[4].answer}`);
  }

  if (sections.length === 0) return { markdown: '', faq: [] };

  return {
    markdown: `\n\n---\n\n${sections.join('\n\n')}`,
    faq: hasSection(sourceContent, ['faq', 'frequently asked questions']) ? [] : faq
  };
}

export function buildReadMoreEnhancementMarkdown(article, app) {
  return buildReadMoreEnhancement(article, app).markdown;
}

export function buildReadMoreFaqSchema(article, app) {
  const { faq } = buildReadMoreEnhancement(article, app);
  if (!faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: sentenceCase(item.answer)
      }
    }))
  };
}
