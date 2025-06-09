import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articles } from "./Articles";
import ReactMarkdown from "react-markdown";

function ShareButtons({ url, title }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title + ' ' + url)}`}
        target="_blank" rel="noopener noreferrer" title="Share on Twitter"
        style={{ color: "#1da1f2", fontSize: 20, padding: 2 }}>
        <svg height="16" viewBox="0 0 24 24" width="16"><path fill="currentColor" d="M22.46 5.93c-.8.36-1.66.62-2.56.73a4.5 4.5 0 0 0 1.97-2.49 9.1 9.1 0 0 1-2.86 1.1A4.52 4.52 0 0 0 16.16 4a4.52 4.52 0 0 0-4.5 4.5c0 .35.04.7.1 1.02A12.82 12.82 0 0 1 3.13 4.67a4.51 4.51 0 0 0-.61 2.28c0 1.57.8 2.96 2.03 3.77a4.5 4.5 0 0 1-2.04-.56v.05c0 2.19 1.56 4.03 3.64 4.45a4.53 4.53 0 0 1-2.03.08c.57 1.78 2.23 3.09 4.2 3.12A9.06 9.06 0 0 1 2 19.54a12.79 12.79 0 0 0 6.94 2.03c8.33 0 12.89-6.89 12.89-12.89 0-.2 0-.41-.01-.61.88-.64 1.65-1.44 2.26-2.35z"/></svg>
      </a>
    </div>
  );
}

export default function ArticlePage() {
  const { id } = useParams();
  const paraCount = useRef(0);

  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Article not found.</h2>
        <Link to="/articles" style={{ color: "#0bbfdb" }}>Back to Articles</Link>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/articles/${article.id}`;
  const images = article.images || [];

  // Utility to highlight speakers in any strong/bold text
  const highlightSpeakers = (children) => {
    if (!children) return children;
    return React.Children.map(children, child => {
      if (typeof child === "string" && (child.startsWith("BAIB:") || child.startsWith("ScholarGPT:"))) {
        return <span style={{ color: "#36ff95", fontWeight: 700 }}>{child}</span>;
      }
      return child;
    });
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: "0 auto",
      padding: "0 12px",
      fontSize: "1.08rem",
      color: "#e9f7ee",
      lineHeight: 1.8,
      fontFamily: "inherit"
    }}>
      <Helmet>
        <title>{article.title} – BetterAiBots.com</title>
        <meta name="description" content={article.preview} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.preview} />
        <meta property="og:image" content={images[0] || article.cover} />
        <meta property="og:url" content={shareUrl} />
      </Helmet>
      <div style={{ marginBottom: 15 }}>
        <Link to="/articles" style={{ color: "#0bbfdb", textDecoration: "underline" }}>&larr; Back to Articles</Link>
      </div>
      <ShareButtons url={shareUrl} title={article.title} />
      {/* Top Image */}
      {images[0] && (
        <img src={images[0]} alt="" style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 16,
          margin: "0 0 24px 0",
          display: "block"
        }} />
      )}
      <h1 style={{
        fontSize: "2.0rem",
        fontWeight: 800,
        color: "#36ff95",
        marginBottom: 4,
        lineHeight: 1.1
      }}>{article.title}</h1>
      <div style={{ color: "#b2ffe0", fontWeight: 400, marginBottom: 14, fontSize: "1.03rem" }}>
        {article.date}
      </div>
      <div style={{ fontSize: "1.13rem", color: "#e9f7ee", marginBottom: 8, fontWeight: 500 }}>
        {article.preview}
      </div>
      <ReactMarkdown
        components={{
          p: ({ node, children, ...props }) => {
            paraCount.current += 1;
            // Inject mid image after the first paragraph, only once!
            if (paraCount.current === 2 && images[1]) {
              return (
                <div style={{ position: "relative", minHeight: 120 }}>
                  <p {...props}>{children}</p>
                  <img src={images[1]} alt=""
                    style={{
                      float: "right",
                      margin: "0 0 10px 32px",
                      width: "250px",
                      maxWidth: "45%",
                      borderRadius: 14,
                      boxShadow: "0 0 12px #36ff9577"
                    }}
                  />
                </div>
              );
            }
            return <p {...props}>{children}</p>;
          },
          strong: ({ children, ...props }) => {
            // Neon highlight for speaker names
            return highlightSpeakers(children);
          },
          li: ({ children, ...props }) => (
            <li style={{ marginBottom: 4 }}>{children}</li>
          ),
          img: () => null, // Prevent user-submitted inline images
        }}
      >
        {article.content}
      </ReactMarkdown>
      {/* Lower image at very bottom */}
      {images[2] && (
        <div style={{ textAlign: "center", margin: "38px 0 14px 0" }}>
          <img src={images[2]} alt="" style={{
            width: "70%",
            maxWidth: 370,
            borderRadius: 18,
            boxShadow: "0 0 16px #36ff9577"
          }} />
        </div>
      )}
    </div>
  );
}
