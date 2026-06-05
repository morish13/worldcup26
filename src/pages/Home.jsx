import { fixtures, teams, flags } from "../data/worldcup";

const TOURNAMENT_START = new Date("2026-06-11");

function Countdown() {
  const now = new Date();
  const diff = TOURNAMENT_START - now;
  if (diff <= 0) return <span style={{ color: "#4ade80" }}>TOURNAMENT IN PROGRESS</span>;
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return (
    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
      {[["DAYS", days], ["HRS", hrs], ["MIN", mins]].map(([label, val]) => (
        <div key={label} style={{ textAlign: "center", minWidth: 70 }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#ffd700", lineHeight: 1, fontFamily: "'Barlow Condensed', sans-serif" }}>{String(val).padStart(2, "0")}</div>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,215,0,0.5)", marginTop: 4 }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,215,0,0.12)", borderRadius: 10, padding: "1.25rem", textAlign: "center" }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#ffd700", fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#f0f0f0", marginTop: 4, letterSpacing: "0.04em" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function Home({ onNavigate }) {
  const upcoming = fixtures.filter(f => f.status === "upcoming").slice(0, 4);
  const topTeams = teams.slice(0, 6);

  return (
    <div>
      {/* hero */}
      <div style={{ textAlign: "center", padding: "3rem 0 2.5rem", borderBottom: "1px solid rgba(255,215,0,0.1)", marginBottom: "2.5rem" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "rgba(255,215,0,0.5)", marginBottom: 12 }}>THE WORLD'S GREATEST EVENT</div>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, margin: "0 0 8px", color: "#ffd700", letterSpacing: "0.04em", lineHeight: 1.05, fontFamily: "'Barlow Condensed', sans-serif" }}>
          FIFA WORLD CUP 2026™
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, margin: "12px 0 2rem" }}>
          48 teams · 3 nations · 1 champion
        </p>
        <Countdown />
      </div>

      {/* stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: "2.5rem" }}>
        <StatCard label="Teams" value="48" sub="record-breaking" />
        <StatCard label="Matches" value="104" sub="group + knockout" />
        <StatCard label="Host Cities" value="16" sub="across 3 countries" />
        <StatCard label="Kickoff" value="JUN 11" sub="2026" />
        <StatCard label="Final" value="JUL 19" sub="MetLife Stadium" />
      </div>

      {/* upcoming fixtures */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,215,0,0.8)", margin: 0 }}>UPCOMING FIXTURES</h2>
          <button onClick={() => onNavigate("fixtures")} style={{ background: "transparent", border: "1px solid rgba(255,215,0,0.25)", color: "rgba(255,215,0,0.7)", padding: "4px 12px", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: "inherit", letterSpacing: "0.05em" }}>
            VIEW ALL →
          </button>
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {upcoming.map(f => (
            <div key={f.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", minWidth: 80 }}>
                <div>{f.date.slice(5).replace("-", "/")}</div>
                <div>{f.time}</div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{flags[f.home] || "🏳"} {f.home}</span>
                <span style={{ color: "#ffd700", fontWeight: 800, fontSize: 13, letterSpacing: "0.1em" }}>VS</span>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{flags[f.away] || "🏳"} {f.away}</span>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "right", minWidth: 80 }}>
                <div style={{ background: "rgba(255,215,0,0.1)", color: "rgba(255,215,0,0.7)", padding: "2px 6px", borderRadius: 4, display: "inline-block", marginBottom: 2 }}>GRP {f.group}</div>
                <div style={{ fontSize: 10 }}>{f.venue.split(",")[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* top teams */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,215,0,0.8)", margin: 0 }}>TOP CONTENDERS</h2>
          <button onClick={() => onNavigate("groups")} style={{ background: "transparent", border: "1px solid rgba(255,215,0,0.25)", color: "rgba(255,215,0,0.7)", padding: "4px 12px", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: "inherit", letterSpacing: "0.05em" }}>
            ALL GROUPS →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
          {topTeams.map((t, i) => (
            <div key={t.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,215,0,0.5)", minWidth: 18 }}>#{i + 1}</span>
              <span style={{ fontSize: 22 }}>{flags[t.name] || "🏳"}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>GROUP {t.group}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
