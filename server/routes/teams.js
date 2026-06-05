const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const staticData = require('../data/teams.json');

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 });

const FD_BASE = 'https://api.football-data.org/v4';
const WC_ID = 2000;

router.get('/', async (req, res) => {
  const cached = cache.get('teams_all');
  if (cached) return res.json(cached);

  try {
    const { data } = await axios.get(`${FD_BASE}/competitions/${WC_ID}/teams`, {
      headers: { 'X-Auth-Token': process.env.FD_API_KEY || '' },
    });

    const enriched = data.teams.map(t => {
      const extra = staticData.teams[t.name] || {};
      return {
        id: t.id,
        name: t.name,
        shortName: t.shortName,
        crest: t.crest,
        flag: extra.flag || '',
        confederation: extra.confederation || t.area?.name || '',
        ranking: extra.ranking || null,
        founded: t.founded,
        venue: t.venue,
        coach: t.coach?.name || null,
      };
    });

    const result = { count: enriched.length, teams: enriched };
    cache.set('teams_all', result);
    return res.json(result);
  } catch (err) {
    // fallback to static
    const teams = Object.entries(staticData.teams).map(([name, info]) => ({
      name,
      ...info,
    }));
    return res.json({ count: teams.length, teams, source: 'static' });
  }
});

router.get('/groups', (req, res) => {
  return res.json(staticData.groups);
});

module.exports = router;
