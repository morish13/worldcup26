import { useState } from "react";
import { groups, flags } from "../data/worldcup";

export default function Groups() {
  const [active, setActive] = useState("A");
  const groupKeys = Object.keys(groups).sort();

  const standing = groups[active].teams.map(t => ({
    name: t,
    played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0,
  }));

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.06em", color: "#ffd700", margin: "0 0 4px", fontFamily: "'Barlow Condensed', sans-serif" }}>GROUP STAGE</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>12 groups · 4 teams each · top 2 advance</p>
      </div>

      {/* group tabs */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {groupKeys.map(g => (
          <button key={g} onClick={() => setActive(g)}
            style={{
              background: active === g ? "#ffd700" : "rgba(255,255,255,0.04)",
              border: `1px solid ${active === g ? "#ffd700" : "rgba(255,255,255,0.1)"}`,
              color: active === g ? "#0a0f1e" : "rgba(255,255,255,0.5)",
              padding: "6px 14px", borderRadius: 5, cursor: "pointer",
              fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", fontFamily: "inherit",
              transition: "all 0.1s"
            }}>
            {g}
          </button>
        ))}
      </div>

      {/* overview grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10, marginBottom: "2rem" }}>
        {groupKeys.map(g => (
          <div key={g} onClick={() => setActive(g)}
            style={{ background: active === g ? "rgba(255,215,0,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${active === g ? "rgba(255,215,0,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 8, padding: "12px 14px", cursor: "pointer", transition: "all 0.1s" }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: active === g ? "#ffd700" : "rgba(255,215,0,0.4)", marginBottom: 8 }}>GROUP {g}</div>
            {groups[g].teams.map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 0" }}>
                <span style={{ fontSize: 16 }}>{flags[t] || "🏳"}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{t}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* active group standings */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,215,0,0.8)", margin: "0 0 12px" }}>GROUP {active} STANDINGS</h2>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,215,0,0.15)" }}>
                {["#", "Team", "MP", "W", "D", "L", "GF", "GA", "GD", "Pts"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: h === "Team" ? "left" : "center", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", color: "rgba(255,215,0,0.6)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standing.map((t, i) => (
                <tr key={t.name} style={{ borderBottom: i < standing.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i < 2 ? "rgba(255,215,0,0.03)" : "transparent" }}>
                  <td style={{ padding: "11px 12px", textAlign: "center", color: i < 2 ? "#ffd700" : "rgba(255,255,255,0.4)", fontWeight: 800, fontSize: 12 }}>
                    {i < 2 ? "✓" : i + 1}
                  </td>
                  <td style={{ padding: "11px 12px", fontWeight: 600 }}>
                    <span style={{ fontSize: 16, marginRight: 8 }}>{flags[t.name] || "🏳"}</span>
                    {t.name}
                    {i < 2 && <span style={{ marginLeft: 6, fontSize: 10, background: "rgba(255,215,0,0.12)", color: "rgba(255,215,0,0.7)", padding: "1px 5px", borderRadius: 3, fontWeight: 700 }}>ADVANCE</span>}
                  </td>
                  {[t.played, t.won, t.drawn, t.lost, t.gf, t.ga, t.gf - t.ga].map((v, j) => (
                    <td key={j} style={{ padding: "11px 12px", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>{v}</td>
                  ))}
                  <td style={{ padding: "11px 12px", textAlign: "center", fontWeight: 800, color: "#ffd700" }}>{t.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>✓ = Qualified for Round of 32</div>
      </div>
    </div>
  );
}
