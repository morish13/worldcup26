# worldcup26

FIFA World Cup 2026 tracker — fixtures, groups, bracket predictor, player stats, venues.

## stack
- React 18 + Vite (frontend)
- Node/Express (backend, optional — frontend works standalone with static data)
- football-data.org API for live data (free tier, 10 req/min)

## setup

```bash
npm install
npm run dev          # frontend on :5173
```

backend (optional):
```bash
cp .env.example .env
# add FOOTBALL_API_KEY from football-data.org (free)
node server.js       # runs on :3001
```

## deploy

**frontend → Vercel**
```bash
npm run build
# push to GitHub, connect to Vercel, zero config
```

**backend → Render (free tier)**
- connect GitHub repo
- build command: `npm install`
- start command: `node server.js`
- env var: `FOOTBALL_API_KEY`

## live data
Get free key at https://www.football-data.org/
Set in `.env` as `FOOTBALL_API_KEY=your_key`
Without it, app uses static data — fully functional.

## monetization
1. Google AdSense — apply after deploy, add script tag to index.html
2. Bracket sharing — localStorage + URL params
3. Telegram bot companion for score alerts
