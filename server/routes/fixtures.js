const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const router = express.Router();
const cache = new NodeCache({ stdTTL: 60 }); // 1 min cache

const FD_BASE = 'https://api.football-data.org/v4';
const WC_ID = 2000; // FIFA World Cup competition id on football-data.org

function headers() {
  return { 'X-Auth-Token': process.env.FD_API_KEY || '' };
}

// GET /api/fixtures  ?matchday=1
router.get('/', async (req, res) => {
  const { matchday, status } = req.query;
  const key = `fixtures_${matchday || 'all'}_${status || 'all'}`;

  const cached = cache.get(key);
  if (cached) return res.json(cached);

  try {
    const params = {};
    if (matchday) params.matchday = matchday;
    if (status) params.status = status; // SCHEDULED | LIVE | IN_PLAY | FINISHED

    const { data } = await axios.get(`${FD_BASE}/competitions/${WC_ID}/matches`, {
      headers: headers(),
      params,
    });

    const matches = data.matches.map(m => ({
      id: m.id,
      matchday: m.matchday,
      utcDate: m.utcDate,
      status: m.status,
      venue: m.venue,
      stage: m.stage,
      group: m.group,
      homeTeam: {
        id: m.homeTeam.id,
        name: m.homeTeam.name,
        shortName: m.homeTeam.shortName,
        crest: m.homeTeam.crest,
      },
      awayTeam: {
        id: m.awayTeam.id,
        name: m.awayTeam.name,
        shortName: m.awayTeam.shortName,
        crest: m.awayTeam.crest,
      },
      score: m.score,
    }));

    const result = { count: matches.length, matches };
    cache.set(key, result);
    return res.json(result);
  } catch (err) {
    console.error('fixtures fetch err:', err.message);
    return res.status(502).json({ error: 'upstream failed', detail: err.message });
  }
});

// GET /api/fixtures/live
router.get('/live', async (req, res) => {
  const key = 'fixtures_live';
  const cached = cache.get(key);
  if (cached) return res.json(cached);

  try {
    const { data } = await axios.get(`${FD_BASE}/competitions/${WC_ID}/matches`, {
      headers: headers(),
      params: { status: 'IN_PLAY,LIVE' },
    });

    const result = { count: data.matches.length, matches: data.matches };
    cache.set(key, result, 30); // shorter TTL for live
    return res.json(result);
  } catch (err) {
    return res.status(502).json({ error: 'upstream failed' });
  }
});

// GET /api/fixtures/standings
router.get('/standings', async (req, res) => {
  const key = 'standings';
  const cached = cache.get(key);
  if (cached) return res.json(cached);

  try {
    const { data } = await axios.get(`${FD_BASE}/competitions/${WC_ID}/standings`, {
      headers: headers(),
    });
    cache.set(key, data, 120);
    return res.json(data);
  } catch (err) {
    return res.status(502).json({ error: 'upstream failed' });
  }
});

module.exports = router;
