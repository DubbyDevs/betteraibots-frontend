import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trialAppsData } from '../data/appsData';
import './AiPlanOnboarding.css';

const STORAGE_KEY = 'baib_ai_plan_interests';

const INTERESTS = [
  {
    id: 'business',
    title: 'Growing a business',
    blurb: 'Marketing, sales, customers, automation',
    keywords: ['marketing', 'sales', 'crm', 'advertising', 'lead', 'automation', 'business', 'customer'],
    projects: [
      'Set up an AI SDR campaign for your ideal customer profile',
      'Automate follow-ups across email and LinkedIn',
      'Build a simple lead-qualifying quiz for your site',
    ],
    tutorials: [
      { label: 'Sales outreach tools', to: '/apps?section=trial' },
      { label: 'Marketing & ads guides', to: '/learn' },
    ],
  },
  {
    id: 'creative',
    title: 'Creative projects',
    blurb: 'Art, photography, design, music',
    keywords: ['creative', 'design', 'art', 'photo', 'image', 'music', 'brand'],
    projects: [
      'Generate brand visuals and product mockups',
      'Create a logo and brand kit in one session',
      'Produce social-ready creative assets for a launch',
    ],
    tutorials: [
      { label: 'Creative & design apps', to: '/apps?section=trial' },
      { label: 'Browse learn guides', to: '/learn' },
    ],
  },
  {
    id: 'websites',
    title: 'Websites & apps',
    blurb: 'Coding, building, launching products',
    keywords: ['web', 'hosting', 'development', 'deploy', 'code', 'app builder', 'jamstack', 'agent'],
    projects: [
      'Ship a landing page and connect analytics',
      'Deploy a site with preview URLs for every change',
      'Prototype an AI-assisted app workflow',
    ],
    tutorials: [
      { label: 'Web & hosting tools', to: '/apps?section=trial' },
      { label: 'Beginner AI path', to: '/learn/beginner' },
    ],
  },
  {
    id: 'content',
    title: 'Content creation',
    blurb: 'Video, writing, social media',
    keywords: ['video', 'content', 'writing', 'social', 'seo', 'podcast', 'voice', 'blog'],
    projects: [
      'Turn one idea into a week of social posts',
      'Edit a podcast or video with AI transcription',
      'Publish SEO-ready articles on autopilot',
    ],
    tutorials: [
      { label: 'Content & video apps', to: '/apps?section=trial' },
      { label: 'Latest AI news', to: '/news' },
    ],
  },
  {
    id: 'smarter',
    title: 'Working smarter',
    blurb: 'Research, organization, productivity',
    keywords: ['productivity', 'collaboration', 'calendar', 'research', 'meeting', 'project', 'workspace'],
    projects: [
      'Auto-summarize meetings and extract action items',
      'Block focus time and clean up your calendar',
      'Centralize projects, pipelines, and team chat',
    ],
    tutorials: [
      { label: 'Productivity apps', to: '/apps?section=trial' },
      { label: 'Intermediate guides', to: '/learn/intermediate' },
    ],
  },
  {
    id: 'learning',
    title: 'Learning AI',
    blurb: 'Discovering tools and developing skills',
    keywords: ['ai', 'learn', 'education', 'training'],
    projects: [
      'Complete a beginner AI path and quiz yourself',
      'Compare three tools in the same category',
      'Track trials in My AI so nothing renews by accident',
    ],
    tutorials: [
      { label: 'Beginner learning path', to: '/learn/beginner' },
      { label: 'All learn guides', to: '/learn' },
    ],
  },
  {
    id: 'career',
    title: 'Career & income',
    blurb: 'Freelancing, jobs, side businesses',
    keywords: ['sales', 'freelance', 'job', 'income', 'crm', 'billing', 'invoice', 'outreach'],
    projects: [
      'Send polished invoices and chase overdue payments',
      'Build a portfolio site and outreach sequence',
      'Find and book meetings with ideal clients',
    ],
    tutorials: [
      { label: 'Business & finance tools', to: '/apps?section=trial' },
      { label: 'Career-focused news', to: '/news' },
    ],
  },
  {
    id: 'everyday',
    title: 'Everyday life',
    blurb: 'Planning, travel, hobbies, daily tasks',
    keywords: ['productivity', 'calendar', 'assistant', 'personal', 'planning'],
    projects: [
      'Use AI to plan a week of tasks and reminders',
      'Dictate notes faster than typing',
      'Organize personal projects in one workspace',
    ],
    tutorials: [
      { label: 'Everyday productivity apps', to: '/apps?section=trial' },
      { label: 'Watch our channel', to: '/Podcast' },
    ],
  },
];

function scoreApp(app, selectedIds) {
  const haystack = `${app.name} ${app.description} ${app.category || ''} ${(app.features || []).join(' ')}`.toLowerCase();
  let score = 0;
  selectedIds.forEach((id) => {
    const interest = INTERESTS.find((item) => item.id === id);
    if (!interest) return;
    interest.keywords.forEach((keyword) => {
      if (haystack.includes(keyword.toLowerCase())) score += 1;
    });
  });
  return score;
}

function loadSavedPlan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function AiPlanOnboarding({ isMobile }) {
  const saved = typeof window !== 'undefined' ? loadSavedPlan() : null;
  const [step, setStep] = useState(saved?.selected?.length ? 2 : 1);
  const [selected, setSelected] = useState(saved?.selected || []);
  const [goal, setGoal] = useState(saved?.goal || '');

  useEffect(() => {
    if (selected.length === 0 && !goal) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected, goal, updatedAt: Date.now() }));
  }, [selected, goal]);

  const toggleInterest = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const recommendedApps = useMemo(() => {
    if (selected.length === 0) return [];
    return [...trialAppsData]
      .map((app) => ({ app, score: scoreApp(app, selected) }))
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score || a.app.name.localeCompare(b.app.name))
      .slice(0, 6)
      .map((row) => row.app);
  }, [selected]);

  const projects = useMemo(() => {
    const list = [];
    selected.forEach((id) => {
      const interest = INTERESTS.find((item) => item.id === id);
      if (interest) list.push(...interest.projects.slice(0, 2));
    });
    return [...new Set(list)].slice(0, 6);
  }, [selected]);

  const tutorials = useMemo(() => {
    const map = new Map();
    selected.forEach((id) => {
      const interest = INTERESTS.find((item) => item.id === id);
      interest?.tutorials.forEach((item) => {
        if (!map.has(item.to)) map.set(item.to, item);
      });
    });
    return [...map.values()].slice(0, 4);
  }, [selected]);

  const selectedTitles = selected
    .map((id) => INTERESTS.find((item) => item.id === id)?.title)
    .filter(Boolean);

  return (
    <section className="ai-plan" aria-labelledby="ai-plan-heading">
      <div className="ai-plan__inner">
        <p className="ai-plan__eyebrow">Personalized for you</p>
        <h2 id="ai-plan-heading" className="ai-plan__title">
          What are you working on?
        </h2>
        <p className="ai-plan__subtitle">
          Choose one or more interests to see what your personalized BetterAiBots experience could look like.
        </p>

        <div className="ai-plan__step-row">
          <span className="ai-plan__step">STEP {step} OF 2</span>
          {step === 1 ? (
            <span className="ai-plan__count">{selected.length} selected</span>
          ) : (
            <button type="button" className="ai-plan__edit" onClick={() => setStep(1)}>
              Update interests
            </button>
          )}
        </div>

        {step === 1 ? (
          <>
            <div className="ai-plan__grid">
              {INTERESTS.map((interest) => {
                const active = selected.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    type="button"
                    className={`ai-plan__card${active ? ' is-active' : ''}`}
                    onClick={() => toggleInterest(interest.id)}
                    aria-pressed={active}
                  >
                    <span className="ai-plan__card-title">{interest.title}</span>
                    <span className="ai-plan__card-blurb">{interest.blurb}</span>
                  </button>
                );
              })}
            </div>

            <label className="ai-plan__goal-label" htmlFor="ai-plan-goal">
              Anything specific you&apos;re trying to accomplish? (Optional)
            </label>
            <textarea
              id="ai-plan-goal"
              className="ai-plan__goal"
              rows={isMobile ? 3 : 2}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Example: launch a newsletter, automate client follow-ups, learn AI for my job..."
            />

            <button
              type="button"
              className="ai-plan__cta"
              disabled={selected.length === 0}
              onClick={() => setStep(2)}
            >
              Build My AI Plan
            </button>
            <p className="ai-plan__footnote">Concept demo. No signup or account required to explore.</p>
          </>
        ) : (
          <div className="ai-plan__dashboard">
            <div className="ai-plan__dash-intro">
              <h3>Your AI Opportunity Dashboard</h3>
              <p>
                Based on {selectedTitles.join(', ')}
                {goal.trim() ? `, and your goal: "${goal.trim()}"` : ''}.
              </p>
            </div>

            <div className="ai-plan__dash-grid">
              <div className="ai-plan__panel">
                <h4>Recommended tools</h4>
                {recommendedApps.length > 0 ? (
                  <ul>
                    {recommendedApps.map((app) => (
                      <li key={app.name}>
                        <Link to={app.readMoreLink || '/apps'}>{app.name}</Link>
                        <span>{app.category}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ai-plan__empty">Browse the full apps directory to explore matching tools.</p>
                )}
                <Link className="ai-plan__panel-link" to="/apps?section=trial">
                  See more free trials →
                </Link>
              </div>

              <div className="ai-plan__panel">
                <h4>Useful projects & tutorials</h4>
                <ul>
                  {tutorials.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ai-plan__panel ai-plan__panel--wide">
                <h4>Things you could accomplish today</h4>
                <ul className="ai-plan__checklist">
                  {projects.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="ai-plan__save">
              <p>
                Save your personalized AI plan and discover new opportunities every week.
              </p>
              <div className="ai-plan__save-actions">
                <Link to="/my-ai" className="ai-plan__cta ai-plan__cta--link">
                  Open My AI Workspace
                </Link>
                <button type="button" className="ai-plan__secondary" onClick={() => setStep(1)}>
                  Update interests
                </button>
              </div>
              <p className="ai-plan__footnote">
                Your selections stay on this device so BetterAiBots can evolve with your projects.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
