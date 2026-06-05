require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fixturesRouter = require('./routes/fixtures');
const teamsRouter = require('./routes/teams');
const statsRouter = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/fixtures', fixturesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/stats', statsRouter);

app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));

app.listen(PORT, () => console.log(`server up on ${PORT}`));
