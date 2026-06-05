import { useState, useEffect } from 'react';
import { getFixtures } from '../api';
import './Bracket.css';

const KNOCKOUT_STAGES = [
  'ROUND_OF_16',
  'QUARTER_FINALS',
  'SEMI_FINALS',
  'THIRD_PLACE',
  'FINAL',
];

const STAGE_LABELS = {
  ROUND_OF_16: 'Round of 16',
  QUARTER_FINALS: 'Quarter-Finals',
  SEMI_FINALS: 'Semi-Finals',
  THIRD_PLACE: '3rd Place',
  FINAL: 'Final',
};

function MatchSlot({ match }) {
  if (!match) {
    return (
      <div className="bracket-match bracket-match--tbd">
        <div className="bm-team">TBD</div>
        <div className="bm-vs">vs</div>
        <div className="bm-team">TBD</div>
      </div>
    );
  }

  const hs = match.score?.fullTime?.home;
  const as = match.score?.fullTime?.away;
  const isLive = match.status === 'IN_PLAY' || match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';

  const homeWin = isFinished && hs > as;
  const awayWin = isFinished && as > hs;

  return (
    <div className={`bracket-match ${isLive ? 'bracket-match--live' : ''}`}>
      <div className={`bm-team ${homeWin ? 'winner' : ''}`}>
        {match.homeTeam.crest && <img src={match.homeTeam.crest} alt="" className="bm-crest" />}
        <span>{match.homeTeam.shortName || match.homeTeam.name}</span>
        {(hs !== null && hs !== undefined) && <span className="bm-score">{hs}</span>}
      </div>
      <div className="bm-team bm-team--away">
        {match.awayTeam.crest && <img src={match.awayTeam.crest} alt="" className="bm-crest" />}
        <span>{match.awayTeam.shortName || match.awayTeam.name}</span>
        {(as !== null && as !== undefined) && <span className="bm-score">{as}</span>}
      </div>
      {isLive && <div className="bm-live-dot">● LIVE</div>}
    </div>
  );
}

export default function Bracket() {
  const [matchesByStage, setMatchesByStage] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFixtures()
      .then(d => {
        const byStage = {};
        (d.matches || []).forEach(m => {
          if (!byStage[m.stage]) byStage[m.stage] = [];
          byStage[m.stage].push(m);
        });
        setMatchesByStage(byStage);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const knockoutStages = KNOCKOUT_STAGES.filter(
    s => matchesByStage[s] && matchesByStage[s].length > 0
  );

  return (
    <div className="bracket-page container">
      <h1 className="page-title">Knockout Bracket</h1>

      <div className="ad-slot">Advertisement</div>

      {loading && <div className="loading">Loading bracket...</div>}
      {error && <div className="error-msg">Bracket data not available yet.</div>}

      {!loading && knockoutStages.length === 0 && (
        <div className="bracket-placeholder card">
          <div className="bracket-placeholder-inner">
            <span className="trophy-big">🏆</span>
            <p>Knockout stage hasn't started yet.</p>
            <p className="sub">Check back after the group stage!</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="bracket-scroll">
          <div className="bracket-columns">
            {KNOCKOUT_STAGES.filter(s => s !== 'THIRD_PLACE').map(stage => {
              const matches = matchesByStage[stage] || [];
              return (
                <div key={stage} className="bracket-col">
                  <div className="bracket-col-title">{STAGE_LABELS[stage]}</div>
                  <div className="bracket-col-matches">
                    {matches.length > 0
                      ? matches.map(m => <MatchSlot key={m.id} match={m} />)
                      : <MatchSlot match={null} />
                    }
                  </div>
                </div>
              );
            })}
          </div>
          {matchesByStage['THIRD_PLACE'] && (
            <div className="third-place">
              <div className="bracket-col-title">3rd Place Playoff</div>
              {matchesByStage['THIRD_PLACE'].map(m => (
                <MatchSlot key={m.id} match={m} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
