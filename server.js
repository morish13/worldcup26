import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(cors());
app.use(express.json());

const FOOTBALL_API = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_API_KEY || "";

// proxy to football-data.org — add your key in .env
app.use("/api/live", createProxyMiddleware({
  target: FOOTBALL_API,
  changeOrigin: true,
  pathRewrite: { "^/api/live": "" },
  headers: { "X-Auth-Token": API_KEY },
}));

// fallback: static fixtures
app.get("/api/fixtures", (req, res) => {
  const { group, date } = req.query;
  let data = require("./src/data/worldcup.js").fixtures;
  if (group) data = data.filter(f => f.group === group.toUpperCase());
  if (date) data = data.filter(f => f.date === date);
  res.json({ fixtures: data, total: data.length });
});

app.get("/api/groups", (req, res) => {
  const { groups, flags } = require("./src/data/worldcup.js");
  res.json({ groups });
});

app.get("/api/teams", (req, res) => {
  const { teams } = require("./src/data/worldcup.js");
  res.json({ teams });
});

app.get("/api/players", (req, res) => {
  const { topPlayers } = require("./src/data/worldcup.js");
  res.json({ players: topPlayers });
});

app.get("/api/venues", (req, res) => {
  const { hostCities } = require("./src/data/worldcup.js");
  res.json({ venues: hostCities });
});

app.get("/health", (req, res) => res.json({ ok: true, ts: Date.now() }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
