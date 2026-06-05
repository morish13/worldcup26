import { useState, useEffect } from 'react';
import { getTeams } from '../api';
import './Teams.css';

const CONFS = ['All', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conf, setConf] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getTeams()
      .then(d => setTeams(d.teams || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = teams.filter(t => {
    const matchConf = conf === 'All' || t.confederation === conf;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
    return matchConf && matchSearch;
  });

  return (
    <div className="teams-page container">
      <h1 className="page-title">Teams</h1>

      <div className="ad-slot">Advertisement</div>

      <div className="teams-controls">
        <input
          className="teams-search"
          placeholder="Search team..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="conf-tabs">
          {CONFS.map(c => (
            <button
              key={c}
              className={`filter-tab ${conf === c ? 'active' : ''}`}
              onClick={() => setConf(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="loading">Loading teams...</div>}
      {error && <div className="error-msg">Could not load teams.</div>}

      {!loading && !error && (
        <div className="teams-grid">
          {filtered.map((t, i) => (
            <div key={t.id || i} className="team-tile card">
              {t.crest
                ? <img src={t.crest} alt={t.name} className="team-tile-crest" />
                : <span className="team-tile-flag">{t.flag || '🏳️'}</span>
              }
              <div className="team-tile-info">
                <div className="team-tile-name">{t.name}</div>
                <div className="team-tile-meta">
                  <span>{t.confederation}</span>
                  {t.ranking && <span>#{t.ranking} FIFA</span>}
                </div>
                {t.coach && <div className="team-tile-coach">Coach: {t.coach}</div>}
                {t.venue && <div className="team-tile-venue">{t.venue}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
