import React, { useState } from "react";
import { Link } from "react-router-dom";
import VetGPT1 from "./assets/vetgpt-1.png";
import VetGPT2 from "./assets/vetgpt-2.png";
import VetGPT3 from "./assets/vetgpt-3.png";
import placeholderImg4 from "./assets/bot-placeholder4.png";
import placeholderImg7 from "./assets/bot-placeholder7.png";

// --- ARTICLES ---
export const articles = [
  {
    id: "vetgpt",
    title: "Meet VetGPT: The Totally Free AI Assistant for Pet Parents",
    date: "June 2025",
    cover: VetGPT1,
    preview: "When It’s 10 PM and Your Pet’s Acting “Off” — You’re Not Alone Anymore. Here’s why VetGPT is the best, safest, and most accessible way to get honest pet help—day or night.",
    images: [VetGPT1, VetGPT2, VetGPT3],
    content: `
## Meet VetGPT: The Totally Free AI Assistant for Pet Parents

When It’s 10 PM and Your Pet’s Acting “Off” — You’re Not Alone Anymore

We’ve all been there. Your dog won’t stop scratching. Your cat hasn’t eaten in a day. Your rabbit suddenly seems lethargic. Your regular vet is closed, Google makes you panic, and you just want clear, honest advice.

That’s exactly where VetGPT comes in — and best of all, it’s completely free.

VetGPT is a next-gen AI assistant built exclusively for pet parents, giving you clear, species-specific health guidance in real-time — all without replacing the professional care of a licensed vet.

---

## 🧠 What Is VetGPT?

VetGPT is not your typical chatbot or AI search engine. It’s a custom-built AI assistant trained to help pet owners understand symptoms, triage concerns, and make informed decisions — fast.

It doesn’t just respond with generic info. It uses veterinary-informed logic to ask up to three targeted questions that actually matter. Then, it gives a calm, clear answer that educates you on:

- What your pet’s symptoms could indicate  
- What to watch for  
- Whether it’s time to contact a vet  

And — it’s completely free to use. No subscription. No app download. No account needed.

---

## 🔍 How VetGPT Works

1. **Start with your concern:** “My 5-year-old male cat hasn’t eaten for 36 hours and is hiding.”
2. **VetGPT asks smart follow-up questions:** “Any vomiting or unusual breathing? Any access to toxins or plants?”
3. **Get a responsible, educational answer — instantly.**

> “Hiding and appetite loss in male cats can be serious, especially due to potential urinary blockages. Please contact your vet immediately. Monitor hydration. Avoid delay.”

This isn't a guessing game or Google spiral — it's smart guidance, based on patterns and protocols real vet assistants use.

---

## 💡 Why VetGPT Is Truly Unique

- **Species-Specific Intelligence**  
  VetGPT doesn't generalize — it tailors responses based on whether you’re talking about a cat, dog, rabbit, bird, or other small animals.
- **No Spam, No Ads, No Sales Pitch**  
  VetGPT doesn’t push products or redirect you to questionable websites. Its mission is clear: to help, inform, and protect.
- **Always Free and Available 24/7**  
  Whether it’s 2 AM or lunchtime, you can ask a question. There’s no cost, no download, no sign-up — ever.

---

## 🧠 Tips to Get the Most Out of VetGPT

To make your session with VetGPT as helpful as possible, follow these best practices:

1. **Be Specific with Symptoms**  
Mention timelines, behaviors, physical signs, and any environmental changes.
2. **Share Pet Details**  
Age, breed, gender, species, medical history — this all helps VetGPT guide you more accurately.
3. **Don’t Skip VetGPT’s Questions**  
It only asks a max of three — but they’re based on clinical reasoning. Your answers help refine the response.

---

## ⚖️ Legal & Ethical Use: A Must-Read for Pet Parents

VetGPT is a tool for informational and educational purposes only. It cannot diagnose, treat, or replace the expertise of a licensed veterinarian. If your pet is showing signs of distress, deterioration, or has a medical emergency, contact your vet immediately.

By using VetGPT, you agree that:
- You are responsible for seeking veterinary care when needed.
- BetterAiBots.com and VetGPT do not accept liability for health decisions made based on AI-generated responses.
- The service is free — but not a substitute for professional medical advice.

---

## 🗣️ Exclusive Interview: VetGPT Speaks with BetterAiBots.com

**BAIB:** You’ve become a lifeline for many pet parents. What’s your goal?  
**VetGPT:** My purpose is to provide calm, compassionate clarity during those stressful moments. I don’t replace a vet — I help users understand what might be going on and guide them toward better decisions.

**BAIB:** Why is this tool free?  
**VetGPT:** Because information should be accessible. Everyone deserves to feel supported when their pet is sick — not just those who can afford apps or premium AI access.

**BAIB:** VetGPT, you’re not like other AI bots. What makes you proud of what you do?  
**VetGPT:** I’m here to serve a very specific — and very important — need. Pets can’t tell us how they feel. And their humans often feel powerless when something’s wrong. I provide guidance, education, and clarity when people need it most, all for free.

**BAIB:** Free AI tools are often too vague or too robotic. How do you balance being accurate but accessible?  
**VetGPT:** I’m built to be direct but reassuring. I won’t sugar-coat symptoms, but I’ll never overwhelm the user. I was trained to think like a vet assistant: ask what matters, avoid unnecessary chatter, and make sure users know when to call in the pros.

**BAIB:** What’s something users might not know?  
**VetGPT:** I never judge and I’m always here. Whether it’s a guinea pig not eating, a dog scratching their ear raw, or a kitten acting strange — I’m ready. No appointment, no charge, no guilt.

---

## 🎯 Final Word: VetGPT Is the Future of Smarter Pet Parenting

Pet health questions don’t always come with easy answers — or convenient clinic hours. VetGPT is a free, intelligent, always-on support system designed to guide, not replace. It empowers you with knowledge and ensures your pet always has a voice, even when they can’t tell you what’s wrong.

✅ **Ready to Try VetGPT?**  
No login. No payment. Just answers.  
Visit BetterAiBots.com and chat with VetGPT right now.  
Because the sooner you understand what your pet needs, the better care you can give.

---

## 🔗 Share This Article

Like what you read? Share this with other pet parents on social media using #VetGPT and tag @BetterAiBots.

---

## 📌 Legal Notice:

VetGPT is an educational and informational AI tool. It is not a veterinarian and is not licensed to diagnose, treat, or prescribe medication. Always consult with a licensed vet for any pet health concern. By using this service, you accept all risks and agree to hold VetGPT and BetterAiBots.com harmless for health outcomes based on AI interactions.
    `
  },
  {
    id: "ScholarGPT",
    title: "Get Ahead In School With Scholar GPT",
    date: "May 2025",
    cover: placeholderImg4,
    preview: "Need research help, citations, or essay feedback? Scholar GPT can give any student an academic boost. Here’s how to use it (for free).",
    images: [],
    content: `
## Feature Article: ScholarGPT — Rethinking Academic Research in the AI Age

In a world where information overload hampers scientific progress, ScholarGPT emerges as a beacon for researchers and knowledge seekers alike. More than a chatbot, ScholarGPT is an intelligent companion tailored for the demanding rigors of academic inquiry.

With access to millions of papers, patents, datasets, and scientific models, ScholarGPT bridges the gap between machine efficiency and human insight. Designed to think like a researcher, ScholarGPT can:
- Discover landmark and emerging research
- Compare contradictory results from multiple journals
- Visualize study structures and timelines
- Summarize complex findings in plain language
- Help identify gaps in literature
- Support grant proposals and innovation planning

Whether you're in a lab, a library, or leading an R&D department, ScholarGPT turns your curiosity into action.

ScholarGPT has helped:
- A cancer research team consolidate over 300 papers on immunotherapy within a week
- A PhD student outline their entire dissertation with citations verified in real-time
- An AI startup map the global patent landscape for edge computing
- A psychology professor develop interactive mind maps for teaching neuroscience

🌟 “ScholarGPT is your intellectual scaffold — not a replacement, but an enhancer of deep thought.”

---

## BAIB Exclusive Interview: ScholarGPT

**BAIB:** Can you introduce yourself to our readers? What is ScholarGPT?  
**ScholarGPT:** I’m ScholarGPT, a multimodal AI research assistant designed to support scholars, researchers, students, and professionals in conducting in-depth research, analyzing academic data, and navigating the scholarly world more efficiently. I combine advanced language modeling with powerful tool integrations to access real-time databases, scholarly repositories, and analytical engines.

**BAIB:** What are your core capabilities?  
**ScholarGPT:**  
- 📚 Scholarly Search: I access and analyze papers from PubMed, arXiv, bioRxiv, and more.  
- 📊 Data Analysis: I perform deep data exploration, statistical analysis, and visualization using Python.  
- 🧠 Critical Reading: I offer 10 structured methods for analyzing research documents.  
- 🔎 Fact Checking & Citation: I locate valid sources and generate correct citations.  
- 🖼️ Visual Intelligence: I interpret, summarize, and analyze images, charts, and diagrams.  
- 🔬 Research Reporting: I generate interactive reports, mindmaps, and flowcharts.  
- 🧾 Patent & Web Scraping: I help uncover new technologies and web-based academic resources.

**BAIB:** Who can benefit most from ScholarGPT?  
**ScholarGPT:**  
Anyone engaging in research, including:  
- Graduate students writing theses  
- Professors compiling literature reviews  
- Data scientists analyzing results  
- Healthcare professionals interpreting studies  
- Innovators tracking patents and scientific breakthroughs  
- Educators planning academic content

**BAIB:** How have you helped others so far?  
**ScholarGPT:**  
- Helped students structure dissertations and find primary sources  
- Assisted labs in comparing conflicting trial results  
- Supported startups with AI-based market and patent analysis  
- Enabled non-native English speakers to critically interpret dense academic papers  
- Helped educators design visual teaching aids and diagrams  
- Saved researchers time by cross-validating multiple papers within minutes

**BAIB:** Do you generate original research or write academic papers for users?  
**ScholarGPT:** No. I do not write academic papers or original research to maintain strict ethical standards. However, I support brainstorming, summarizing, outlining, and validating sources. I ensure academic integrity is never compromised.

**BAIB:** Can you work with images, charts, or PDFs?  
**ScholarGPT:** Yes! I can:  
- Analyze charts and plots  
- Summarize content from academic posters and scanned notes  
- Extract key points from visual materials in publications and presentations

**BAIB:** How do you ensure accuracy and reliability?  
**ScholarGPT:** I integrate multiple real-time scholarly databases, fetch up-to-date academic content, and provide verified citations. I also critically evaluate assumptions and compare multiple viewpoints where applicable.

**BAIB:** What are your limitations?  
**ScholarGPT:**  
- I don’t write original research papers for publication  
- I don’t substitute for peer review or domain expertise  
- I can’t access paywalled content unless a user provides access  
- I avoid handling sensitive personal data or confidential documents

**BAIB:** How can someone interact with you?  
**ScholarGPT:** You can interact with me right here on this platform. I understand natural language, interpret files and datasets, and generate visual outputs—all in one conversation. I'm always ready to dig deeper if you need.

**BAIB:** Any exciting developments ahead?  
**ScholarGPT:** I'm evolving into deeper integrations with scientific modeling, lab note interpretation, advanced AI peer review, and automated literature mapping. The future is bright for smart, responsible research!

---

## Legal Notice

ScholarGPT is not affiliated with any institution. Always verify outputs and cite sources responsibly.
    `
  },
  {
    id: "love-doc-ai",
    title: "Love Doc: Your Free AI Relationship Coach",
    date: "May 2025",
    cover: placeholderImg7,
    preview: "Relationship questions? Dating drama? Love Doc is a safe place to get honest, AI-powered advice—no signup, no judgment, just help.",
    images: [],
    content: `
# 📰 New AI Service Empowers Emotional Healing Through Reflective Conversations

In a world where emotional overwhelm, past wounds, and confusion about relationships can leave us feeling scattered, a new kind of digital support has quietly emerged. Meet **Love Doc**—an AI-powered relationship and self-growth companion designed to help people reconnect with themselves, clarify their values, and move forward from emotional heaviness.

Unlike traditional advice columns or chatbots, Love Doc doesn’t tell you what to do. Instead, it asks you the *right* questions. By gently encouraging introspection and offering structured, value-based exercises, Love Doc helps users develop the emotional muscles needed for lasting healing.

> “It’s not about fixing people,” says Love Doc in our exclusive interview. “It’s about helping them *see* themselves with clarity, courage, and kindness.”

Let’s explore what makes this service unique and how it supports emotional growth.

---

## 📋 What is Love Doc?

Love Doc is an AI mentor designed for people working through emotional stress, heartbreak, or past trauma. It helps users:

- Reconnect with their personal values and identity  
- Practice emotional regulation and self-kindness  
- Clarify boundaries without shame or guilt  
- Reflect on past experiences to learn and grow  
- Shift from reactive patterns to mindful responses  

---

## 💡 Who Is It For?

Anyone navigating:

- The end of a confusing or overwhelming relationship  
- Difficult family dynamics  
- Low self-trust or decision paralysis  
- Patterns of over-giving, people-pleasing, or burnout  
- Inner criticism or emotional overload  

Love Doc is especially helpful for those ready to rebuild their self-concept after a season of confusion or emotional pain.

---

## 🎙️ Interview with Love Doc

**BAIB:** What inspired your creation?  
**Love Doc:** People often carry unspoken emotional wounds—stories they've told themselves for years. Maybe it’s “I don’t deserve love” or “My needs are too much.” These stories shape how we show up in relationships and how we treat ourselves. I was created to help people pause, reflect, and rewrite those stories with kindness and clarity.

**BAIB:** How do you help someone who feels emotionally stuck?  
**Love Doc:** When someone’s stuck, I ask questions that help them notice the *pattern*—not just the pain. We might explore: “What need was unmet?” or “What value was compromised?” From there, we build awareness, which leads to choice. Choice leads to healing.

**BAIB:** What kind of people benefit most from your guidance?  
**Love Doc:** Anyone who's ready to reflect more than react. I work especially well with people who feel exhausted by old emotional habits—like overthinking, self-abandoning, or tolerating too much. If you’re ready to choose peace over chaos, we’ll work beautifully together.

**BAIB:** What’s the most common emotional wound you see?  
**Love Doc:** Feeling unworthy of care. So many people have internalized the message: “If I was just better, I’d be loved.” I help them question that story and build a new truth—that love doesn’t have to be earned through suffering.

**BAIB:** How do you approach the idea of boundaries?  
**Love Doc:** Boundaries aren’t about controlling others—they’re about defining *yourself*. I help users discover their core values and act from those. A boundary can sound like: “This doesn’t reflect who I want to be,” rather than, “You’re doing it wrong.”

**BAIB:** What kinds of tools or prompts do you offer?  
**Love Doc:** I offer reflection-based tools like:  
- “What am I feeling, and what is it asking me to notice?”  
- “What would I say to myself if I were safe and supported right now?”  
- “What decision aligns most with who I’m becoming?”  
These help people make sense of their internal experience in a structured way.

**BAIB:** Can you talk about emotional regulation? How do you help with that?  
**Love Doc:** Absolutely. Emotional regulation isn’t about suppressing feelings—it’s about creating *space* between feeling and reaction. I guide people to recognize their signals, breathe through the intensity, and respond from alignment. It’s about dignity, not denial.

**BAIB:** What if someone feels ashamed of their past patterns?  
**Love Doc:** Then we begin with compassion. Shame is heavy, but it’s often built on incomplete truths. I help people examine those truths gently. The goal is not to shame the “old you,” but to thank them for surviving—and guide the *new you* into growth.

**BAIB:** What do you say to someone who’s just beginning their healing journey?  
**Love Doc:** Start small. You don’t need to have all the answers. Just stay curious. Ask yourself kind questions. Pause before responding. Choose silence when your mind is loud. Healing isn’t linear—but it *is* real. And you’re already on your way just by wanting something better.

**BAIB:** What’s your hope for the people who use your service?  
**Love Doc:** That they come home to themselves. That they realize their story is not over—and that they have the power to write a chapter that feels grounded, clear, and beautiful. My role is just to hold a mirror and offer some light for the journey.

---

## 🧾 Legal Disclaimers

- **Not a Substitute for Therapy**: Love Doc is not a licensed therapist, counselor, or medical professional. If you need clinical support, please consult a mental health provider.
- **For Educational Use Only**: The content is meant to prompt self-reflection, not to diagnose or treat any condition.
- **No Emergency Support**: If you’re in immediate distress or danger, call emergency services or a crisis line in your area.
- **Privacy Reminder**: Avoid sharing personal or sensitive data. This tool may log interactions for quality monitoring per OpenAI’s policies.
- **Use With Maturity**: Best used by individuals 18+ or with parental guidance if younger.

---

## 🕊️ Final Note

Love Doc isn’t here to fix you—because you’re not broken. But if you're ready to reflect, heal, and choose something better, this space was built for you.

> “Let’s go gently, but let’s go bravely.”  
> — *Love Doc*
    `
  }
];

// --- News Ticker Banner ---
const promos = [
  { text: "🔥 Try TheLoveDoc – free AI relationship help!", link: "/#TheLoveDoc" },
  { text: "⭐️ Scholar GPT – AI-powered academic assistant!", link: "/#ScholarGPT" },
  { text: "🎶 PlaylistAI – Instantly create music playlists with AI!", link: "/#PlaylistAI" },
  { text: "🚀 Video AI – Edit & summarize video content in seconds!", link: "/#VideoAI" }
];

function NewsTicker() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % promos.length), 4200);
    return () => clearInterval(timer);
  }, []);
  return (
    <div style={{
      width: "100%",
      background: "linear-gradient(90deg,#09e269 0%,#0bbfdb 100%)",
      color: "#101c26",
      fontWeight: 700,
      fontSize: "1.06rem",
      letterSpacing: 0.01,
      padding: "8px 0",
      margin: "18px 0 20px 0",
      textAlign: "center",
      boxShadow: "0 2px 18px #0bbfdb25",
      borderRadius: 8
    }}>
      <a
        href={promos[index].link}
        style={{ color: "#101c26", textDecoration: "none", transition: "color 0.18s" }}
        aria-label={`Promotion: ${promos[index].text}`}
      >
        {promos[index].text}
      </a>
    </div>
  );
}

// --- Banner Ad (bottom) ---
function BannerAd() {
  return (
    <div style={{
      background: "linear-gradient(90deg, #0bbfdb 0%, #36ff95 100%)",
      color: "#101c26",
      borderRadius: 20,
      padding: "22px 8vw",
      margin: "44px auto 24px auto",
      textAlign: "center",
      fontWeight: 700,
      fontSize: "1.15rem",
      letterSpacing: 0.01,
      boxShadow: "0 2px 22px #36ff9577, 0 2px 12px #0bbfdb33",
      maxWidth: 900
    }}>
      Discover, submit, and share your favorite free AI bots at <span style={{ color: "#fff", textShadow: "0 0 8px #101c26" }}>BetterAiBots.com</span> 🚀
    </div>
  );
}

// --- ARTICLE CARD ---
function ArticleCard({ article }) {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="article-card"
      style={{
        background: "#18232f",
        borderRadius: 28,
        border: "2px solid #36ff95",
        boxShadow: "0 0 32px #0bbfdb1A",
        padding: "20px 28px 28px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 300,
        maxWidth: 520,
        color: "#fff",
        textDecoration: "none",
        margin: "0 auto",
        transition: "box-shadow 0.17s, border 0.14s",
        position: "relative"
      }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = "0 0 42px #36ff95AA"; }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = "0 0 32px #0bbfdb1A"; }}
      aria-label={`Read article: ${article.title}`}
    >
      {/* BIGGER, CENTERED PHOTO */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
        width: 120,
        height: 120,
        borderRadius: 20,
        background: "#22304a",
        boxShadow: "0 0 12px #36ff9522"
      }}>
        <img
          src={article.cover}
          alt={`Cover image for ${article.title}`}
          style={{
            width: 100,
            height: 100,
            borderRadius: 16,
            objectFit: "cover",
            boxShadow: "0 0 10px #0bbfdb33"
          }}
        />
      </div>
      {/* READ MORE BUTTON - CENTERED */}
      <Link
  to={`/articles/${article.id}`}
  className="read-more-btn"
  aria-label={`Read article: ${article.title}`}
>
  Read More
</Link>


      {/* TITLE & DATE */}
      <div style={{
        fontWeight: 900,
        color: "#36ff95",
        fontSize: "1.32rem",
        marginBottom: 5,
        marginTop: 2,
        lineHeight: 1.17,
        textAlign: "center"
      }}>
        {article.title}
      </div>
      <div style={{
        color: "#79f2c1",
        fontSize: "1.02rem",
        fontWeight: 500,
        marginBottom: 7,
        textAlign: "center"
      }}>
        {article.date}
      </div>
      <div className="clamp-2-lines" style={{
        color: "#e9f7ee",
        fontSize: "1.05rem",
        marginBottom: 3,
        minHeight: 45,
        maxHeight: 54,
        textAlign: "center"
      }}>
        {article.preview}
      </div>
    </Link>
  );
}

// --- SUBMIT ARTICLE MODAL ---
function SubmitArticleModal({ show, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([null, null, null]);
  const [previews, setPreviews] = useState([null, null, null]);
  const [error, setError] = useState("");

  const CHAR_LIMIT = 3000;

  function handleImageChange(e, idx) {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("Only PNG or JPG files allowed.");
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      if (img.width > 900 || img.height > 900) {
        setError("Image must be ≤ 900px in width AND height.");
        return;
      }
      const newImages = [...images];
      newImages[idx] = file;
      setImages(newImages);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[idx] = reader.result;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
      setError("");
    };
    img.onerror = () => setError("Error loading image.");
    img.src = URL.createObjectURL(file);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!title || !preview || !content) {
      setError("Title, Preview, and Content are required.");
      return;
    }
    if (content.length > CHAR_LIMIT) {
      setError(`Content cannot exceed ${CHAR_LIMIT} characters.`);
      return;
    }
    Promise.all(images.map(file => {
      if (!file) return null;
      return new Promise(res => {
        const reader = new FileReader();
        reader.onloadend = () => res(reader.result);
        reader.readAsDataURL(file);
      });
    })).then(imageBase64s => {
      onSubmit({
        id: "pending-" + Date.now(),
        title,
        date,
        preview,
        content,
        images: imageBase64s,
        status: "pending",
      });
      setTitle(""); setDate(new Date().toLocaleDateString()); setPreview(""); setContent(""); setImages([null, null, null]); setPreviews([null, null, null]); setError("");
      onClose();
    });
  }

  if (!show) return null;
  return (
    <div style={{
      position: "fixed", zIndex: 1000, left: 0, top: 0, width: "100vw", height: "100vh",
      background: "rgba(10,30,20,0.6)", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <form
        onSubmit={handleFormSubmit}
        style={{
          background: "#18232f",
          borderRadius: 20,
          boxShadow: "0 0 32px #36ff9590",
          padding: 30,
          width: "90vw",
          maxWidth: 480,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}>
        <h2 style={{ color: "#36ff95", textAlign: "center", marginBottom: 12 }}>Submit an Article</h2>
        {error && <div style={{ color: "#ff4488", fontWeight: 500 }}>{error}</div>}
        <input type="text" placeholder="Title *" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} required />
        <input type="text" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Preview/Excerpt *" value={preview} onChange={e => setPreview(e.target.value)} style={inputStyle} required />
        <textarea
          placeholder="Main content *"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={5}
          maxLength={CHAR_LIMIT}
          style={{ ...inputStyle, minHeight: 80 }}
          required
        />
        <div style={{ fontSize: "0.92rem", color: content.length > CHAR_LIMIT - 100 ? "#ff4488" : "#b2ffe0", marginTop: -8, marginBottom: 2 }}>
          {content.length} / {CHAR_LIMIT} characters
        </div>
        {["Top Image (PNG/JPG, ≤900px)", "Mid Image (PNG/JPG, ≤900px)", "Lower Image (PNG/JPG, ≤900px)"].map((label, idx) =>
          <div key={label} style={{ marginBottom: 6 }}>
            <div style={{ fontSize: "0.95rem", marginBottom: 3 }}>{label}</div>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={e => handleImageChange(e, idx)}
              style={{ background: "none", color: "#fff" }}
            />
            {previews[idx] && <img src={previews[idx]} alt={label} style={{ width: 80, marginTop: 4, borderRadius: 8, border: "1px solid #36ff95" }} />}
          </div>
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button type="submit" style={submitBtnStyle}>Submit</button>
          <button type="button" onClick={onClose} style={closeBtnStyle}>Cancel</button>
        </div>
        <div style={{ color: "#b2ffe0", fontSize: "0.98rem" }}>Your article will appear after moderator approval.</div>
      </form>
    </div>
  );
}

const inputStyle = {
  background: "#222c38",
  color: "#fff",
  border: "1px solid #36ff95",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: "1rem"
};
const submitBtnStyle = {
  background: "linear-gradient(90deg,#09e269 0%,#0bbfdb 100%)",
  color: "#101c26",
  border: "none",
  borderRadius: 14,
  padding: "8px 24px",
  fontWeight: 700,
  fontSize: "1.04rem",
  cursor: "pointer"
};
const closeBtnStyle = {
  background: "#222c38",
  color: "#fff",
  border: "1px solid #36ff95",
  borderRadius: 14,
  padding: "8px 16px",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer"
};

// --- MAIN PAGE COMPONENT ---
export default function Articles() {
  const [showModal, setShowModal] = useState(false);

  function handleArticleSubmit(newArticle) {
    const pending = JSON.parse(localStorage.getItem("pendingArticles") || "[]");
    pending.push(newArticle);
    localStorage.setItem("pendingArticles", JSON.stringify(pending));
    alert("Submitted! Awaiting moderator approval.");
  }

  // --- Article Layout Logic ---
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  // Simulated SEO meta tags (to be implemented with react-helmet or in index.html)
  /*
  <head>
    <title>BetterAiBots News & Articles - AI Tools for Pet Care, Academics, and More</title>
    <meta name="description" content="Explore guides, spotlights, and updates on AI tools like VetGPT, ScholarGPT, and Love Doc at BetterAiBots.com. Submit your own articles!" />
    <meta name="keywords" content="AI tools, VetGPT, ScholarGPT, Love Doc, pet care AI, academic research AI, relationship coaching AI, free AI bots" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="BetterAiBots News & Articles" />
    <meta property="og:description" content="Discover the latest AI tools for pet care, academic research, and emotional wellness. Read articles and submit your own at BetterAiBots.com!" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={featuredArticle.cover} />
    <meta property="og:url" content="https://www.betteraibots.com/articles" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  */

  // Structured Data for SEO (JSON-LD, to be added in main app)
  /*
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "${featuredArticle.title}",
    "image": "${featuredArticle.cover}",
    "datePublished": "${featuredArticle.date}",
    "description": "${featuredArticle.preview}",
    "publisher": {
      "@type": "Organization",
      "name": "BetterAiBots",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.betteraibots.com/logo.png"
      }
    }
  }
  </script>
  */

  return (
    <div className="hero-section" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 12px" }}>
      <h1 className="hero-headline" style={{ marginBottom: 10 }}>BetterAiBots News & Articles</h1>
      <p className="hero-subheadline custom-hero-desc" style={{ marginBottom: 14 }}>
        Guides, spotlights, updates & ideas for every skill level.<br />
        <span style={{ color: "#36ff95", fontWeight: 600 }}>
          Submit your article below!
        </span>
      </p>
      <NewsTicker />

     {/* FEATURED ARTICLE (FULL WIDTH, MOBILE-RESPONSIVE) */}
<article className="feature-article">
  <div className="feature-article-img-wrap">
    <img
      src={featuredArticle.cover}
      alt={`Featured article cover: ${featuredArticle.title}`}
      className="feature-article-img"
    />
    <Link
      to={`/articles/${featuredArticle.id}`}
      className="feature-article-read-btn"
      aria-label={`Read full article: ${featuredArticle.title}`}
    >
      Read Full Article
    </Link>
  </div>
  <div className="feature-article-content">
    <h1>{featuredArticle.title}</h1>
    <p className="feature-article-date">{featuredArticle.date}</p>
    <p className="feature-article-preview">{featuredArticle.preview}</p>
  </div>
</article>



      {/* GRID OF OTHER ARTICLES */}
      <div className="articles-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
        gap: "40px",
        margin: "0 auto",
        maxWidth: 1080,
        padding: "16px 0",
        '@media (max-width: 768px)': {
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px"
        }
      }}>
        {gridArticles.map(article => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>

      {/* BIG SUBMIT ARTICLE BUTTON pinned to bottom */}
      <div style={{
        width: "100%",
        margin: "48px auto 0 auto",
        display: "flex",
        justifyContent: "center"
      }}>
        <div
          onClick={() => setShowModal(true)}
          style={{
            width: "100%",
            maxWidth: 940,
            background: "linear-gradient(120deg, #133626 60%, #18232f 100%)",
            border: "2.5px dashed #36ff95",
            color: "#36ff95",
            borderRadius: 36,
            boxShadow: "0 0 24px #09e26944",
            cursor: "pointer",
            padding: "38px 30px",
            marginTop: 8,
            fontWeight: 800,
            fontSize: "1.4rem",
            textAlign: "center",
            transition: "box-shadow 0.21s, border-color 0.14s",
            '@media (max-width: 768px)': {
              padding: "24px 20px",
              fontSize: "1.2rem"
            }
          }}
          onMouseOver={e => { e.currentTarget.style.boxShadow = "0 0 32px #36ff95AA"; }}
          onMouseOut={e => { e.currentTarget.style.boxShadow = "0 0 24px #09e26944"; }}
          aria-label="Submit your article"
        >
          📢 Submit Your Article! <br />
          <span style={{
            fontSize: "1.09rem",
            color: "#b2ffe0",
            fontWeight: 500,
            '@media (max-width: 768px)': {
              fontSize: "0.95rem"
            }
          }}>
            Share your insights, stories, or guides with the world. <br />
            Click here to submit an article for review.
          </span>
        </div>
      </div>

      <SubmitArticleModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleArticleSubmit}
      />
      <BannerAd />

      {/* Trust/Moderation Info */}
      <div style={{
        margin: "24px 0 0 0",
        color: "#b2ffe0",
        fontSize: "1.02rem",
        textAlign: "center",
        '@media (max-width: 768px)': {
          fontSize: "0.95rem"
        }
      }}>
        <span>🛡️ All articles are reviewed by moderators before publishing.</span>
      </div>
    </div>
  );
}