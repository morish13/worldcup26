import { useState, useEffect } from 'react';
import { getScorers, getTournamentStats } from '../api';
import './Stats.css';

export default function Stats() {
  const [scorers, setScorers] = useState([]);
  const [tourney, setTourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getScorers(), getTournamentStats()])
      .then(([sc, tn]) => {
        setScorers(sc.scorers || []);
        setTourney(tn);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="stats-page container">
      <h1 className="page-title">Tournament Stats</h1>

      <div className="ad-slot">Advertisement</div>

      {loading && <div className="loading">Loading stats...</div>}
      {error && <div className="error-msg">Stats not available yet. Loads once matches start.</div>}

      {!loading && !error && tourney && (
        <div className="tourney-summary">
          <div className="stat-tile card">
            <div className="stat-val">{tourney.totalMatches}</div>
            <div className="stat-label">Matches Played</div>
          </div>
          <div className="stat-tile card">
            <div className="stat-val">{tourney.totalGoals}</div>
            <div className="stat-label">Goals Scored</div>
          </div>
          <div className="stat-tile card">
            <div className="stat-val">{tourney.avgGoalsPerMatch}</div>
            <div className="stat-label">Goals / Match</div>
          </div>
        </div>
      )}

      {!loading && !error && scorers.length > 0 && (
        <div className="scorers-section">
          <h2 className="section-title">Top Scorers</h2>
          <div className="scorers-table-wrap card">
            <table className="scorers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Goals</th>
                  <th>Assists</th>
                  <th>Pens</th>
                  <th>Matches</th>
                </tr>
              </thead>
              <tbody>
                {scorers.map((s, i) => (
                  <tr key={i}>
                    <td className="rank-col">{i + 1}</td>
                    <td className="player-col">
                      <span className="player-name">{s.player}</span>
                      <span className="player-nat">{s.nationality}</span>
                    </td>
                    <td>{s.team}</td>
                    <td className="goals-col">{s.goals}</td>
                    <td className="assist-col">{s.assists}</td>
                    <td>{s.penalties}</td>
                    <td>{s.playedMatches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && tourney?.topScoringTeams?.length > 0 && (
        <div className="team-goals-section">
          <h2 className="section-title">Team Goals</h2>
          <div className="team-goals-list">
            {tourney.topScoringTeams.map((t, i) => (
              <div key={t.team} className="team-goal-row card">
                <span className="tgr-rank">{i + 1}</span>
                <span className="tgr-name">{t.team}</span>
                <div className="tgr-bar-wrap">
                  <div
                    className="tgr-bar"
                    style={{ width: `${(t.goals / (tourney.topScoringTeams[0]?.goals || 1)) * 100}%` }}
                  />
                </div>
                <span className="tgr-goals">{t.goals}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && scorers.length === 0 && (
        <div className="loading">No stats yet — check back once matches begin!</div>
      )}
    </div>
  );
}
