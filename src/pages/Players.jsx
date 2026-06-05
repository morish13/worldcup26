import { topPlayers, flags } from "../data/worldcup";

const POS_COLOR = {
  FW: { bg: "rgba(255,100,50,0.12)", color: "#ff6b35", border: "rgba(255,100,50,0.3)" },
  MF: { bg: "rgba(50,150,255,0.12)", color: "#5baaff", border: "rgba(50,150,255,0.3)" },
  DF: { bg: "rgba(80,220,120,0.12)", color: "#4ade80", border: "rgba(80,220,120,0.3)" },
  GK: { bg: "rgba(200,150,50,0.12)", color: "#f5c518", border: "rgba(200,150,50,0.3)" },
};

export default function Players() {
  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.06em", color: "#ffd700", margin: "0 0 4px", fontFamily: "'Barlow Condensed', sans-serif" }}>PLAYER WATCH</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>Key players to watch at the tournament</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
        {topPlayers.map((p, i) => {
          const pc = POS_COLOR[p.pos] || POS_COLOR.MF;
          return (
            <div key={p.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "1rem 1.1rem", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 18 }}>{flags[p.country] || "🏳"}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{p.country}</span>
                  </div>
                </div>
                <span style={{ background: pc.bg, border: `1px solid ${pc.border}`, color: pc.color, padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
                  {p.pos}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[["Goals", p.goals], ["Assists", p.assists], ["Rating", p.rating]].map(([label, val]) => (
                  <div key={label} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 6, padding: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#ffd700", fontFamily: "'Barlow Condensed', sans-serif" }}>{val}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>{label.toUpperCase()}</div>
                  </div>
                ))}
              </div>

              <div style={{ position: "absolute", top: 10, right: 12, fontSize: 22, fontWeight: 800, color: "rgba(255,255,255,0.04)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                #{i + 1}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "2.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "1.25rem" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,215,0,0.7)", margin: "0 0 12px" }}>STATS LEADERS</h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, margin: 0 }}>
          Live stats will update here once the tournament begins on June 11, 2026. Check back for golden boot, golden ball, and best goalkeeper leaderboards.
        </p>
      </div>
    </div>
  );
}
