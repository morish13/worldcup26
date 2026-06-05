import { format } from 'date-fns';
import './MatchCard.css';

function statusBadge(status) {
  if (status === 'IN_PLAY' || status === 'LIVE') return <span className="badge badge-live">● Live</span>;
  if (status === 'FINISHED') return <span className="badge badge-finished">FT</span>;
  return <span className="badge badge-scheduled">Upcoming</span>;
}

export default function MatchCard({ match }) {
  const { homeTeam, awayTeam, score, utcDate, status, venue, group } = match;

  const homeScore = score?.fullTime?.home ?? (status === 'IN_PLAY' ? score?.halfTime?.home ?? '-' : '-');
  const awayScore = score?.fullTime?.away ?? (status === 'IN_PLAY' ? score?.halfTime?.away ?? '-' : '-');

  let dateStr = '';
  try {
    dateStr = format(new Date(utcDate), 'dd MMM · HH:mm');
  } catch {
    dateStr = utcDate;
  }

  return (
    <div className={`match-card ${status === 'IN_PLAY' || status === 'LIVE' ? 'match-card--live' : ''}`}>
      <div className="match-meta">
        <span className="match-date">{dateStr} UTC</span>
        {group && <span className="match-group">{group.replace('GROUP_', 'Group ')}</span>}
        {statusBadge(status)}
      </div>
      <div className="match-teams">
        <div className="team home">
          {homeTeam.crest && <img src={homeTeam.crest} alt="" className="team-crest" />}
          <span className="team-name">{homeTeam.shortName || homeTeam.name}</span>
        </div>
        <div className="score-box">
          <span>{homeScore}</span>
          <span className="score-sep">:</span>
          <span>{awayScore}</span>
        </div>
        <div className="team away">
          <span className="team-name">{awayTeam.shortName || awayTeam.name}</span>
          {awayTeam.crest && <img src={awayTeam.crest} alt="" className="team-crest" />}
        </div>
      </div>
      {venue && <div className="match-venue">{venue}</div>}
    </div>
  );
}
