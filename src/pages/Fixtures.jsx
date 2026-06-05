import { useState } from "react";
import { fixtures, flags } from "../data/worldcup";

const allGroups = [...new Set(fixtures.map(f => f.group))].sort();

export default function Fixtures() {
  const [filterGroup, setFilterGroup] = useState("ALL");

  const shown = filterGroup === "ALL" ? fixtures : fixtures.filter(f => f.group === filterGroup);

  const grouped = shown.reduce((acc, f) => {
    if (!acc[f.date]) acc[f.date] = [];
    acc[f.date].push(f);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.06em", color: "#ffd700", margin: "0 0 4px", fontFamily: "'Barlow Condensed', sans-serif" }}>MATCH FIXTURES</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>All 104 matches — Group Stage through Final</p>
      </div>

      {/* group filter */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {["ALL", ...allGroups].map(g => (
          <button key={g} onClick={() => setFilterGroup(g)}
            style={{
              background: filterGroup === g ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${filterGroup === g ? "rgba(255,215,0,0.5)" : "rgba(255,255,255,0.1)"}`,
              color: filterGroup === g ? "#ffd700" : "rgba(255,255,255,0.5)",
              padding: "5px 12px", borderRadius: 5, cursor: "pointer",
              fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", fontFamily: "inherit"
            }}>
            {g === "ALL" ? "ALL GROUPS" : `GRP ${g}`}
          </button>
        ))}
      </div>

      {/* matches by date */}
      {Object.entries(grouped).sort().map(([date, matches]) => {
        const d = new Date(date + "T00:00:00");
        const label = d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });
        return (
          <div key={date} style={{ marginBottom: "1.75rem" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,215,0,0.55)", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid rgba(255,215,0,0.1)" }}>
              {label.toUpperCase()}
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {matches.map(f => (
                <MatchRow key={f.id} match={f} />
              ))}
            </div>
          </div>
        );
      })}

      {shown.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
          No fixtures found for this filter.
        </div>
      )}
    </div>
  );
}

function MatchRow({ match: f }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "14px 18px", display: "grid", gridTemplateColumns: "70px 1fr 70px", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
        <div style={{ fontWeight: 600 }}>{f.time}</div>
        <div style={{ background: "rgba(255,215,0,0.1)", color: "rgba(255,215,0,0.7)", padding: "2px 6px", borderRadius: 3, fontSize: 10, fontWeight: 700, display: "inline-block", marginTop: 3, letterSpacing: "0.05em" }}>
          GRP {f.group}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "flex-end" }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{f.home}</span>
          <span style={{ fontSize: 22 }}>{flags[f.home] || "🏳"}</span>
        </div>
        {f.status === "live" ? (
          <span style={{ background: "rgba(255,50,50,0.2)", border: "1px solid rgba(255,50,50,0.4)", color: "#ff6b6b", padding: "4px 10px", borderRadius: 4, fontWeight: 800, fontSize: 13, letterSpacing: "0.04em" }}>
            LIVE
          </span>
        ) : f.homeScore !== undefined ? (
          <span style={{ fontWeight: 800, fontSize: 18, color: "#ffd700", letterSpacing: "0.1em" }}>
            {f.homeScore} - {f.awayScore}
          </span>
        ) : (
          <span style={{ fontWeight: 800, fontSize: 13, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>VS</span>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
          <span style={{ fontSize: 22 }}>{flags[f.away] || "🏳"}</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{f.away}</span>
        </div>
      </div>

      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "right", lineHeight: 1.4 }}>
        {f.venue.split(",")[0]}
      </div>
    </div>
  );
}
