import { useState, useEffect } from 'react';
import MatchCard from '../components/MatchCard';
import { getFixtures } from '../api';
import './Fixtures.css';

const STAGES = ['All', 'Live', 'Upcoming', 'Finished'];

export default function Fixtures() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = {};
    if (filter === 'Live') params.status = 'IN_PLAY,LIVE';
    if (filter === 'Upcoming') params.status = 'SCHEDULED,TIMED';
    if (filter === 'Finished') params.status = 'FINISHED';

    getFixtures(params)
      .then(d => setMatches(d.matches || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [filter]);

  const grouped = matches.reduce((acc, m) => {
    const key = `Matchday ${m.matchday}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  return (
    <div className="fixtures-page container">
      <h1 className="page-title">Fixtures</h1>

      {/* AdSense slot */}
      <div className="ad-slot">Advertisement</div>

      <div className="filter-tabs">
        {STAGES.map(s => (
          <button
            key={s}
            className={`filter-tab ${filter === s ? 'active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {loading && <div className="loading">Loading fixtures...</div>}
      {error && <div className="error-msg">Could not load fixtures. Check your API key.</div>}

      {!loading && !error && Object.keys(grouped).length === 0 && (
        <div className="loading">No matches found.</div>
      )}

      {!loading && !error && Object.entries(grouped).map(([day, dayMatches]) => (
        <div key={day} className="matchday-group">
          <h2 className="matchday-title">{day}</h2>
          <div className="match-list">
            {dayMatches.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
