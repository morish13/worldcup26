import { hostCities } from "../data/worldcup";

const countryColor = {
  USA: { bg: "rgba(50,100,255,0.1)", color: "#5baaff", border: "rgba(50,100,255,0.25)" },
  Mexico: { bg: "rgba(50,200,80,0.1)", color: "#4ade80", border: "rgba(50,200,80,0.25)" },
  Canada: { bg: "rgba(255,50,50,0.1)", color: "#ff6b6b", border: "rgba(255,50,50,0.25)" },
};

export default function Venues() {
  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.06em", color: "#ffd700", margin: "0 0 4px", fontFamily: "'Barlow Condensed', sans-serif" }}>HOST VENUES</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>16 stadiums across the USA, Canada & Mexico</p>
      </div>

      {/* country breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: "2rem" }}>
        {[["🇺🇸", "USA", "11 cities"], ["🇨🇦", "Canada", "2 cities"], ["🇲🇽", "Mexico", "3 cities"]].map(([flag, country, sub]) => (
          <div key={country} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "1rem", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{flag}</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{country}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* venue cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
        {hostCities.map(v => {
          const cc = countryColor[v.country] || countryColor.USA;
          return (
            <div key={v.city} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "1rem 1.1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{v.city}</div>
                  <span style={{ background: cc.bg, border: `1px solid ${cc.border}`, color: cc.color, padding: "2px 7px", borderRadius: 3, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>
                    {v.country}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#ffd700", fontFamily: "'Barlow Condensed', sans-serif" }}>{v.matches}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>MATCHES</div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 10 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>{v.stadium}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                  Cap. {v.capacity.toLocaleString()}
                </div>
              </div>

              {/* capacity bar */}
              <div style={{ marginTop: 10 }}>
                <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.round((v.capacity / 90000) * 100)}%`, background: "linear-gradient(90deg, rgba(255,215,0,0.6), rgba(255,215,0,0.3))", borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 3 }}>capacity vs largest venue</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", gap: 8, padding: "10px 18px", background: "rgba(255,215,0,0.07)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 8 }}>
          <span style={{ fontSize: 13, color: "rgba(255,215,0,0.7)" }}>🏆</span>
          <span style={{ fontSize: 13, color: "rgba(255,215,0,0.7)" }}>FINAL: MetLife Stadium, New York/NJ · July 19, 2026</span>
        </div>
      </div>
    </div>
  );
}
