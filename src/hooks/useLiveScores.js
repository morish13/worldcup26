import { useState, useEffect, useRef } from "react";

const API_BASE = "https://api.football-data.org/v4";
const WC_2026_ID = 2000;

export function useLiveScores() {
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);

  const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;

  const fetchMatches = async () => {
    if (!apiKey) return;
    try {
      const res = await fetch(`${API_BASE}/competitions/${WC_2026_ID}/matches`, {
        headers: { "X-Auth-Token": apiKey },
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setMatches(data.matches || []);
      setLastUpdated(new Date());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!apiKey) return;
    setLoading(true);
    fetchMatches();
    const poll = setInterval(fetchMatches, 60000);
    return () => clearInterval(poll);
  }, []);

  return { matches, loading, error, lastUpdated, refetch: fetchMatches };
}

export function mapApiMatch(m) {
  const statusMap = {
    SCHEDULED: "upcoming", TIMED: "upcoming",
    IN_PLAY: "live", PAUSED: "live",
    FINISHED: "finished", AWARDED: "finished",
  };
  return {
    id: m.id,
    date: m.utcDate?.slice(0, 10),
    time: m.utcDate ? new Date(m.utcDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/New_York" }) : "",
    home: m.homeTeam?.name || "TBD",
    away: m.awayTeam?.name || "TBD",
    homeScore: m.score?.fullTime?.home ?? undefined,
    awayScore: m.score?.fullTime?.away ?? undefined,
    minute: m.minute,
    status: statusMap[m.status] || "upcoming",
    group: m.group?.replace("GROUP_", "") || "?",
    venue: m.venue || "",
    stage: m.stage,
  };
}
