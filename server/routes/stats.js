const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const router = express.Router();
const cache = new NodeCache({ stdTTL: 300 });

const FD_BASE = 'https://api.football-data.org/v4';
const WC_ID = 2000;

router.get('/scorers', async (req, res) => {
  const cached = cache.get('scorers');
  if (cached) return res.json(cached);

  try {
    const { data } = await axios.get(`${FD_BASE}/competitions/${WC_ID}/scorers`, {
      headers: { 'X-Auth-Token': process.env.FD_API_KEY || '' },
      params: { limit: 20 },
    });

    const scorers = data.scorers.map(s => ({
      player: s.player.name,
      nationality: s.player.nationality,
      team: s.team.name,
      goals: s.goals,
      assists: s.assists || 0,
      penalties: s.penalties || 0,
      playedMatches: s.playedMatches,
    }));

    const result = { count: scorers.length, scorers };
    cache.set('scorers', result);
    return res.json(result);
  } catch (err) {
    return res.status(502).json({ error: 'upstream failed', detail: err.message });
  }
});

// aggregate tournament stats from finished matches
router.get('/tournament', async (req, res) => {
  const cached = cache.get('tournament_stats');
  if (cached) return res.json(cached);

  try {
    const { data } = await axios.get(`${FD_BASE}/competitions/${WC_ID}/matches`, {
      headers: { 'X-Auth-Token': process.env.FD_API_KEY || '' },
      params: { status: 'FINISHED' },
    });

    const matches = data.matches;
    let totalGoals = 0;
    let totalMatches = matches.length;
    const teamGoals = {};

    matches.forEach(m => {
      const hg = m.score?.fullTime?.home || 0;
      const ag = m.score?.fullTime?.away || 0;
      totalGoals += hg + ag;

      const hn = m.homeTeam.name;
      const an = m.awayTeam.name;
      teamGoals[hn] = (teamGoals[hn] || 0) + hg;
      teamGoals[an] = (teamGoals[an] || 0) + ag;
    });

    const topTeams = Object.entries(teamGoals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([team, goals]) => ({ team, goals }));

    const result = {
      totalMatches,
      totalGoals,
      avgGoalsPerMatch: totalMatches ? (totalGoals / totalMatches).toFixed(2) : 0,
      topScoringTeams: topTeams,
    };

    cache.set('tournament_stats', result, 300);
    return res.json(result);
  } catch (err) {
    return res.status(502).json({ error: 'upstream failed' });
  }
});

module.exports = router;
