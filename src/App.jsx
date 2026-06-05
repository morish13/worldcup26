import { useState } from "react";
import Home from "./pages/Home";
import Fixtures from "./pages/Fixtures";
import Groups from "./pages/Groups";
import Bracket from "./pages/Bracket";
import Players from "./pages/Players";
import Venues from "./pages/Venues";
import Blog from "./pages/Blog";

const NAV = [
  { id: "home", label: "Home" },
  { id: "fixtures", label: "Fixtures" },
  { id: "groups", label: "Groups" },
  { id: "bracket", label: "Bracket" },
  { id: "players", label: "Players" },
  { id: "venues", label: "Venues" },
  { id: "blog", label: "Articles" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = { home: Home, fixtures: Fixtures, groups: Groups, bracket: Bracket, players: Players, venues: Venues, blog: Blog };
  const Page = pages[page] || Home;

  const navigate = (id) => { setPage(id); setMenuOpen(false); window.scrollTo(0, 0); };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", color: "#f0f0f0", fontFamily: "'Barlow Condensed', 'Barlow', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        @media (min-width: 700px) { .mob-menu { display: none !important; } .hamburger { display: none !important; } .desk-nav { display: flex !important; } }
        @media (max-width: 699px) { .desk-nav { display: none !important; } }
      `}</style>
      <header style={{ borderBottom: "1px solid rgba(255,200,0,0.2)", position: "sticky", top: 0, zIndex: 100, background: "rgba(10,15,30,0.97)", backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, gap: 12 }}>
          <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 22 }}>🏆</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.06em", color: "#ffd700", lineHeight: 1 }}>FIFA WORLD CUP</div>
              <div style={{ fontSize: 9, letterSpacing: "0.18em", color: "rgba(255,215,0,0.55)", lineHeight: 1 }}>2026 • USA · CANADA · MEXICO</div>
            </div>
          </div>
          <nav className="desk-nav" style={{ gap: 2 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)}
                style={{ background: page === n.id ? "rgba(255,215,0,0.12)" : "transparent", border: page === n.id ? "1px solid rgba(255,215,0,0.3)" : "1px solid transparent", color: page === n.id ? "#ffd700" : "rgba(255,255,255,0.65)", padding: "6px 11px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", fontFamily: "inherit", transition: "all 0.15s" }}>
                {n.label}
              </button>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span style={{ background: "rgba(255,50,50,0.15)", border: "1px solid rgba(255,50,50,0.3)", color: "#ff6b6b", padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>LIVE IN 6 DAYS</span>
            <button className="hamburger" onClick={() => setMenuOpen(o => !o)}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: "#f0f0f0", fontSize: 18, lineHeight: 1, fontFamily: "inherit" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mob-menu" style={{ background: "rgba(10,15,30,0.98)", borderTop: "1px solid rgba(255,215,0,0.1)", padding: "0.5rem 1.25rem 1rem" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)}
                style={{ display: "block", width: "100%", textAlign: "left", background: page === n.id ? "rgba(255,215,0,0.08)" : "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", color: page === n.id ? "#ffd700" : "rgba(255,255,255,0.7)", padding: "12px 8px", cursor: "pointer", fontSize: 15, fontWeight: page === n.id ? 700 : 500, letterSpacing: "0.06em", fontFamily: "inherit" }}>
                {n.label}{page === n.id && <span style={{ float: "right" }}>✓</span>}
              </button>
            ))}
          </div>
        )}
      </header>
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "1.5rem 1.25rem" }}>
        <Page onNavigate={navigate} />
      </main>
      <footer style={{ borderTop: "1px solid rgba(255,215,0,0.1)", marginTop: "4rem", padding: "1.5rem", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.04em" }}>
        FIFA WORLD CUP 2026 TRACKER — FAN MADE · NOT AFFILIATED WITH FIFA
      </footer>
    </div>
  );
}
