import { useState } from "react";
import { fixtures as staticFixtures, flags } from "../data/worldcup";
import { useLiveScores, mapApiMatch } from "../hooks/useLiveScores";

const allGroups = [...new Set(staticFixtures.map(f => f.group))].sort();

export default function Fixtures() {
  const [filterGroup, setFilterGroup] = useState("ALL");
  const { matches: liveMatches, loading, error, lastUpdated } = useLiveScores();

  // use live data if available, fall back to static
  const raw = liveMatches ? liveMatches.map(mapApiMatch) : staticFixtures;
  const shown = filterGroup === "ALL" ? raw : raw.filter(f => f.group === filterGroup);

  const liveNow = shown.filter(f => f.status === "live");
  const rest = shown.filter(f => f.status !== "live");

  const grouped = rest.reduce((acc, f) => {
    if (!acc[f.date]) acc[f.date] = [];
    acc[f.date].push(f);
    return acc;
  }, {});

  const hasApiKey = !!import.meta.env.VITE_FOOTBALL_API_KEY;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.06em", color: "#ffd700", margin: "0 0 4px", fontFamily: "'Barlow Condensed', sans-serif" }}>MATCH FIXTURES</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>All 104 matches — Group Stage through Final</p>
        </div>
        <div style={{ textAlign: "right" }}>
          {loading && <div style={{ fontSize: 11, color: "rgba(255,215,0,0.5)", letterSpacing: "0.06em" }}>⟳ FETCHING LIVE DATA...</div>}
          {error && <div style={{ fontSize: 11, color: "rgba(255,100,100,0.7)" }}>Using cached data</div>}
          {lastUpdated && !loading && (
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
              Updated {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          {!hasApiKey && (
            <div style={{ fontSize: 11, color: "rgba(255,215,0,0.4)", marginTop: 2 }}>
              Static data · Live scores active Jun 11
            </div>
          )}
        </div>
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

      {/* live now section */}
      {liveNow.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#ff6b6b", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff6b6b", display: "inline-block", animation: "pulse 1.5s infinite" }} />
            LIVE NOW
          </div>
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
          <div style={{ display: "grid", gap: 8 }}>
            {liveNow.map(f => <MatchRow key={f.id} match={f} />)}
          </div>
        </div>
      )}

      {/* matches by date */}
      {Object.entries(grouped).sort().map(([date, matches]) => {
        if (!date) return null;
        const d = new Date(date + "T00:00:00");
        const label = d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });
        return (
          <div key={date} style={{ marginBottom: "1.75rem" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,215,0,0.55)", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid rgba(255,215,0,0.1)" }}>
              {label.toUpperCase()}
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {matches.map(f => <MatchRow key={f.id} match={f} />)}
            </div>
          </div>
        );
      })}

      {shown.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
          No fixtures found.
        </div>
      )}
    </div>
  );
}

function MatchRow({ match: f }) {
  return (
    <div style={{ background: f.status === "live" ? "rgba(255,50,50,0.06)" : "rgba(255,255,255,0.04)", border: `1px solid ${f.status === "live" ? "rgba(255,80,80,0.25)" : "rgba(255,255,255,0.08)"}`, borderRadius: 8, padding: "14px 18px", display: "grid", gridTemplateColumns: "70px 1fr 70px", alignItems: "center", gap: 12 }}>
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
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#ffd700", letterSpacing: "0.1em" }}>
              {f.homeScore ?? 0} - {f.awayScore ?? 0}
            </div>
            <div style={{ fontSize: 10, color: "#ff6b6b", fontWeight: 700, letterSpacing: "0.06em" }}>
              {f.minute ? `${f.minute}'` : "LIVE"}
            </div>
          </div>
        ) : f.homeScore !== undefined && f.homeScore !== null ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em" }}>
              {f.homeScore} - {f.awayScore}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>FT</div>
          </div>
        ) : (
          <span style={{ fontWeight: 800, fontSize: 13, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>VS</span>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
          <span style={{ fontSize: 22 }}>{flags[f.away] || "🏳"}</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{f.away}</span>
        </div>
      </div>

      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "right", lineHeight: 1.4 }}>
        {f.venue ? f.venue.split(",")[0] : ""}
      </div>
    </div>
  );
}
