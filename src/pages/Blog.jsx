import { useState } from "react";
import { articles } from "../data/articles";

const CATEGORY_COLORS = {
  Predictions: { bg: "rgba(255,215,0,0.1)", color: "#ffd700", border: "rgba(255,215,0,0.3)" },
  Analysis: { bg: "rgba(50,150,255,0.1)", color: "#5baaff", border: "rgba(50,150,255,0.3)" },
  Guide: { bg: "rgba(80,220,120,0.1)", color: "#4ade80", border: "rgba(80,220,120,0.3)" },
  Players: { bg: "rgba(255,100,50,0.1)", color: "#ff6b35", border: "rgba(255,100,50,0.3)" },
};

function ArticleCard({ article, onClick }) {
  const cc = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.Analysis;
  return (
    <div onClick={() => onClick(article)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "1.25rem", cursor: "pointer", transition: "border-color 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,215,0,0.25)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ background: cc.bg, border: `1px solid ${cc.border}`, color: cc.color, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>
          {article.category}
        </span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{article.readTime}</span>
      </div>
      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: "#f0f0f0", lineHeight: 1.4 }}>{article.title}</h2>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 12px", lineHeight: 1.6 }}>{article.excerpt}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{article.date}</span>
        <span style={{ fontSize: 12, color: "rgba(255,215,0,0.7)", fontWeight: 600 }}>Read more →</span>
      </div>
    </div>
  );
}

function ArticleDetail({ article, onBack }) {
  const cc = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.Analysis;

  const rendered = article.content.split("\n\n").map((para, i) => {
    if (para.startsWith("**") && para.endsWith("**")) {
      return <h3 key={i} style={{ fontSize: 16, fontWeight: 700, color: "#ffd700", margin: "1.5rem 0 0.5rem" }}>{para.replace(/\*\*/g, "")}</h3>;
    }
    const parts = para.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: "0 0 1rem" }}>
        {parts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: "#f0f0f0", fontWeight: 700 }}>{part}</strong> : part)}
      </p>
    );
  });

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "6px 14px", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: "inherit", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>
        ← Back to Articles
      </button>

      <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ background: cc.bg, border: `1px solid ${cc.border}`, color: cc.color, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>
          {article.category}
        </span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{article.date}</span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>·</span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{article.readTime}</span>
      </div>

      <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, color: "#f0f0f0", margin: "0 0 0.5rem", lineHeight: 1.2, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}>
        {article.title}
      </h1>

      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: "0 0 2rem" }}>By {article.author}</p>

      <div style={{ borderTop: "1px solid rgba(255,215,0,0.15)", paddingTop: "1.5rem" }}>
        {rendered}
      </div>

      <div style={{ marginTop: "2.5rem", padding: "1.25rem", background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,215,0,0.7)", marginBottom: 6, letterSpacing: "0.06em" }}>MORE ARTICLES</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {articles.filter(a => a.id !== article.id).slice(0, 3).map(a => (
            <button key={a.id} onClick={() => onBack(a)} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", textAlign: "left", fontSize: 13, padding: "4px 0", fontFamily: "inherit" }}>
              → {a.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [selected, setSelected] = useState(null);

  const handleBack = (article) => {
    if (article && article.id) {
      setSelected(article);
    } else {
      setSelected(null);
    }
    window.scrollTo(0, 0);
  };

  if (selected) return <ArticleDetail article={selected} onBack={handleBack} />;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.06em", color: "#ffd700", margin: "0 0 4px", fontFamily: "'Barlow Condensed', sans-serif" }}>ARTICLES</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>Analysis, predictions and guides for World Cup 2026</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {articles.map(a => (
          <ArticleCard key={a.id} article={a} onClick={setSelected} />
        ))}
      </div>
    </div>
  );
}
