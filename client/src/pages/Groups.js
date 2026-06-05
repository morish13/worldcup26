import { useState, useEffect } from 'react';
import { getStandings } from '../api';
import './Groups.css';

export default function Groups() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStandings()
      .then(d => setStandings(d.standings || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading groups...</div>;
  if (error) return <div className="error-msg">Could not load standings. API key required.</div>;

  return (
    <div className="groups-page container">
      <h1 className="page-title">Group Stage</h1>

      <div className="ad-slot">Advertisement</div>

      <div className="groups-grid">
        {standings.map(group => (
          <div key={group.group} className="group-card card">
            <h2 className="group-title">Group {group.group}</h2>
            <table className="standings-table">
              <thead>
                <tr>
                  <th className="col-pos">#</th>
                  <th className="col-team">Team</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th className="col-pts">Pts</th>
                </tr>
              </thead>
              <tbody>
                {group.table.map((row, i) => (
                  <tr key={row.team.id} className={i < 2 ? 'qualify-row' : ''}>
                    <td className="col-pos">{row.position}</td>
                    <td className="col-team">
                      {row.team.crest && (
                        <img src={row.team.crest} alt="" className="mini-crest" />
                      )}
                      <span>{row.team.shortName || row.team.name}</span>
                    </td>
                    <td>{row.playedGames}</td>
                    <td>{row.won}</td>
                    <td>{row.draw}</td>
                    <td>{row.lost}</td>
                    <td>{row.goalsFor}</td>
                    <td>{row.goalsAgainst}</td>
                    <td>{row.goalDifference > 0 ? '+' : ''}{row.goalDifference}</td>
                    <td className="col-pts">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
