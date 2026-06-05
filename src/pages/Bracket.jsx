import { useState } from "react";
import { flags } from "../data/worldcup";

const R32 = [
  { id: "r32_1", home: "1A", away: "2B", round: "R32", match: 1 },
  { id: "r32_2", home: "1B", away: "2A", round: "R32", match: 2 },
  { id: "r32_3", home: "1C", away: "2D", round: "R32", match: 3 },
  { id: "r32_4", home: "1D", away: "2C", round: "R32", match: 4 },
  { id: "r32_5", home: "1E", away: "2F", round: "R32", match: 5 },
  { id: "r32_6", home: "1F", away: "2E", round: "R32", match: 6 },
  { id: "r32_7", home: "1G", away: "2H", round: "R32", match: 7 },
  { id: "r32_8", home: "1H", away: "2G", round: "R32", match: 8 },
  { id: "r32_9", home: "1I", away: "2J", round: "R32", match: 9 },
  { id: "r32_10", home: "1J", away: "2I", round: "R32", match: 10 },
  { id: "r32_11", home: "1K", away: "2L", round: "R32", match: 11 },
  { id: "r32_12", home: "1L", away: "2K", round: "R32", match: 12 },
  { id: "r32_13", home: "3rd Best", away: "3rd Best", round: "R32", match: 13 },
  { id: "r32_14", home: "3rd Best", away: "3rd Best", round: "R32", match: 14 },
  { id: "r32_15", home: "3rd Best", away: "3rd Best", round: "R32", match: 15 },
  { id: "r32_16", home: "3rd Best", away: "3rd Best", round: "R32", match: 16 },
];

const TEAMS_LIST = ["Brazil", "France", "England", "Argentina", "Spain", "Portugal", "Germany", "Netherlands", "Belgium", "Croatia", "Uruguay", "Denmark", "Italy", "USA", "Mexico", "Morocco", "Japan", "South Korea"];

function MatchBox({ match, picks, onPick, label }) {
  const home = picks[match.id + "_h"] || match.home;
  const away = picks[match.id + "_a"] || match.away;
  const winner = picks[match.id];
  const isResolved = !match.home.match(/[0-9]/) && !match.away.match(/[0-9]/);

  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, overflow: "hidden", minWidth: 170 }}>
      {label && <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,215,0,0.5)", padding: "5px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}>{label}</div>}
      {[home, away].map((team, i) => (
        <div key={i} onClick={() => team && !team.match(/[0-9A-Z]{2}/) && onPick(match.id, team)}
          style={{
            padding: "8px 10px", display: "flex", alignItems: "center", gap: 7, cursor: isResolved ? "pointer" : "default",
            background: winner === team ? "rgba(255,215,0,0.1)" : "transparent",
            borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
            transition: "background 0.1s"
          }}>
          <span style={{ fontSize: 15 }}>{flags[team] || (team.match(/[A-Z0-9]/) ? "?" : "🏳")}</span>
          <span style={{ fontSize: 12, fontWeight: winner === team ? 700 : 400, color: winner === team ? "#ffd700" : "rgba(255,255,255,0.7)", flex: 1 }}>{team}</span>
          {winner === team && <span style={{ fontSize: 10, color: "#ffd700" }}>✓</span>}
        </div>
      ))}
    </div>
  );
}

export default function Bracket() {
  const [picks, setPicks] = useState({});
  const [champion, setChampion] = useState(null);

  const handlePick = (matchId, team) => {
    setPicks(prev => ({ ...prev, [matchId]: team }));
  };

  const r32winners = R32.map(m => picks[m.id]).filter(Boolean);
  const r16 = [];
  for (let i = 0; i < 16; i += 2) {
    r16.push({ id: `r16_${i / 2}`, home: r32winners[i] || "TBD", away: r32winners[i + 1] || "TBD" });
  }
  const qfwinners = [];
  const qf = [];
  for (let i = 0; i < 8; i += 2) {
    const h = picks[`r16_${i}`] || "TBD";
    const a = picks[`r16_${i + 1}`] || "TBD";
    qf.push({ id: `qf_${i / 2}`, home: h, away: a });
  }
  const sf = [];
  for (let i = 0; i < 4; i += 2) {
    sf.push({ id: `sf_${i / 2}`, home: picks[`qf_${i}`] || "TBD", away: picks[`qf_${i + 1}`] || "TBD" });
  }
  const final = { id: "final", home: picks["sf_0"] || "TBD", away: picks["sf_1"] || "TBD" };

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.06em", color: "#ffd700", margin: "0 0 4px", fontFamily: "'Barlow Condensed', sans-serif" }}>BRACKET PREDICTOR</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>Pick your winners — click a team to advance them</p>
      </div>

      {/* round of 32 */}
      <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,215,0,0.6)", margin: "0 0 10px" }}>ROUND OF 32</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 8, marginBottom: "2rem" }}>
        {R32.slice(0, 8).map(m => (
          <MatchBox key={m.id} match={m} picks={picks} onPick={handlePick} label={`Match ${m.match}`} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 8, marginBottom: "2rem" }}>
        {R32.slice(8).map(m => (
          <MatchBox key={m.id} match={m} picks={picks} onPick={handlePick} label={`Match ${m.match}`} />
        ))}
      </div>

      {/* round of 16 */}
      {r32winners.length >= 2 && (
        <>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,215,0,0.6)", margin: "0 0 10px" }}>ROUND OF 16</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 8, marginBottom: "2rem" }}>
            {r16.map(m => (
              <MatchBox key={m.id} match={m} picks={picks} onPick={handlePick} />
            ))}
          </div>
        </>
      )}

      {/* QF */}
      {qf.some(m => m.home !== "TBD" && m.away !== "TBD") && (
        <>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,215,0,0.6)", margin: "0 0 10px" }}>QUARTER-FINALS</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 8, marginBottom: "2rem" }}>
            {qf.map(m => <MatchBox key={m.id} match={m} picks={picks} onPick={handlePick} />)}
          </div>
        </>
      )}

      {/* SF */}
      {sf.some(m => m.home !== "TBD") && (
        <>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,215,0,0.6)", margin: "0 0 10px" }}>SEMI-FINALS</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 8, marginBottom: "2rem" }}>
            {sf.map(m => <MatchBox key={m.id} match={m} picks={picks} onPick={handlePick} />)}
          </div>
        </>
      )}

      {/* Final */}
      {(final.home !== "TBD" || final.away !== "TBD") && (
        <div style={{ maxWidth: 280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,215,0,0.6)", margin: "0 0 10px", textAlign: "center" }}>THE FINAL · JUL 19</h2>
          <MatchBox match={final} picks={picks} onPick={(id, team) => { handlePick(id, team); setChampion(team); }} />
          {picks.final && (
            <div style={{ textAlign: "center", marginTop: 16, padding: "14px", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 8 }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{flags[picks.final] || "🏆"}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#ffd700", letterSpacing: "0.06em" }}>{picks.final}</div>
              <div style={{ fontSize: 11, color: "rgba(255,215,0,0.5)", marginTop: 2, letterSpacing: "0.1em" }}>YOUR PREDICTED CHAMPION</div>
            </div>
          )}
        </div>
      )}

      {/* reset */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button onClick={() => { setPicks({}); setChampion(null); }}
          style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)", padding: "8px 20px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "inherit", letterSpacing: "0.06em" }}>
          RESET BRACKET
        </button>
      </div>
    </div>
  );
}
