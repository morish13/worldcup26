export const groups = {
  A: { teams: ["Qatar", "Ecuador", "Senegal", "Netherlands"] },
  B: { teams: ["England", "Iran", "USA", "Wales"] },
  C: { teams: ["Argentina", "Saudi Arabia", "Mexico", "Poland"] },
  D: { teams: ["France", "Australia", "Denmark", "Tunisia"] },
  E: { teams: ["Spain", "Costa Rica", "Germany", "Japan"] },
  F: { teams: ["Belgium", "Canada", "Morocco", "Croatia"] },
  G: { teams: ["Brazil", "Serbia", "Switzerland", "Cameroon"] },
  H: { teams: ["Portugal", "Ghana", "Uruguay", "South Korea"] },
  I: { teams: ["Italy", "Albania", "Slovenia", "Israel"] },
  J: { teams: ["Colombia", "Bolivia", "New Zealand", "Saudi Arabia"] },
  K: { teams: ["Mexico", "Jamaica", "Venezuela", "Malaysia"] },
  L: { teams: ["South Africa", "Egypt", "Nigeria", "Algeria"] },
};

export const flags = {
  Qatar: "🇶🇦", Ecuador: "🇪🇨", Senegal: "🇸🇳", Netherlands: "🇳🇱",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", Iran: "🇮🇷", USA: "🇺🇸", Wales: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  Argentina: "🇦🇷", "Saudi Arabia": "🇸🇦", Mexico: "🇲🇽", Poland: "🇵🇱",
  France: "🇫🇷", Australia: "🇦🇺", Denmark: "🇩🇰", Tunisia: "🇹🇳",
  Spain: "🇪🇸", "Costa Rica": "🇨🇷", Germany: "🇩🇪", Japan: "🇯🇵",
  Belgium: "🇧🇪", Canada: "🇨🇦", Morocco: "🇲🇦", Croatia: "🇭🇷",
  Brazil: "🇧🇷", Serbia: "🇷🇸", Switzerland: "🇨🇭", Cameroon: "🇨🇲",
  Portugal: "🇵🇹", Ghana: "🇬🇭", Uruguay: "🇺🇾", "South Korea": "🇰🇷",
  Italy: "🇮🇹", Albania: "🇦🇱", Slovenia: "🇸🇮", Israel: "🇮🇱",
  Colombia: "🇨🇴", Bolivia: "🇧🇴", "New Zealand": "🇳🇿",
  Jamaica: "🇯🇲", Venezuela: "🇻🇪", Malaysia: "🇲🇾",
  "South Africa": "🇿🇦", Egypt: "🇪🇬", Nigeria: "🇳🇬", Algeria: "🇩🇿",
};

export const fixtures = [
  { id: 1, date: "2026-06-11", time: "18:00", home: "Mexico", away: "TBD", venue: "Estadio Azteca, Mexico City", group: "K", status: "upcoming" },
  { id: 2, date: "2026-06-12", time: "15:00", home: "USA", away: "Bolivia", venue: "Rose Bowl, LA", group: "J", status: "upcoming" },
  { id: 3, date: "2026-06-12", time: "18:00", home: "Canada", away: "Croatia", venue: "BMO Field, Toronto", group: "F", status: "upcoming" },
  { id: 4, date: "2026-06-13", time: "15:00", home: "Argentina", away: "Poland", venue: "MetLife, New Jersey", group: "C", status: "upcoming" },
  { id: 5, date: "2026-06-13", time: "18:00", home: "Brazil", away: "Serbia", venue: "SoFi Stadium, LA", group: "G", status: "upcoming" },
  { id: 6, date: "2026-06-14", time: "15:00", home: "France", away: "Australia", venue: "AT&T Stadium, Dallas", group: "D", status: "upcoming" },
  { id: 7, date: "2026-06-14", time: "18:00", home: "England", away: "Iran", venue: "Lumen Field, Seattle", group: "B", status: "upcoming" },
  { id: 8, date: "2026-06-15", time: "15:00", home: "Spain", away: "Germany", venue: "Estadio BBVA, Monterrey", group: "E", status: "upcoming" },
  { id: 9, date: "2026-06-15", time: "18:00", home: "Portugal", away: "Ghana", venue: "Gillette Stadium, Boston", group: "H", status: "upcoming" },
  { id: 10, date: "2026-06-16", time: "15:00", home: "Belgium", away: "Morocco", venue: "Lincoln Financial, Philadelphia", group: "F", status: "upcoming" },
  { id: 11, date: "2026-06-16", time: "18:00", home: "Germany", away: "Japan", venue: "Estadio Azteca, Mexico City", group: "E", status: "upcoming" },
  { id: 12, date: "2026-06-17", time: "15:00", home: "Netherlands", away: "Senegal", venue: "Arrowhead, Kansas City", group: "A", status: "upcoming" },
];

export const teams = [
  { name: "Brazil", group: "G", rank: 1, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","W","D","W","W"] },
  { name: "France", group: "D", rank: 2, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","D","W","W","W"] },
  { name: "England", group: "B", rank: 3, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","W","W","D","W"] },
  { name: "Argentina", group: "C", rank: 4, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","W","D","W","D"] },
  { name: "Spain", group: "E", rank: 5, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["D","W","W","W","W"] },
  { name: "Portugal", group: "H", rank: 6, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","W","W","W","D"] },
  { name: "Germany", group: "E", rank: 7, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","D","W","L","W"] },
  { name: "Netherlands", group: "A", rank: 8, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","W","D","W","L"] },
  { name: "Belgium", group: "F", rank: 9, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["D","W","W","D","W"] },
  { name: "Croatia", group: "F", rank: 10, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","D","D","W","W"] },
  { name: "Uruguay", group: "H", rank: 11, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","W","W","L","W"] },
  { name: "Denmark", group: "D", rank: 12, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, form: ["W","D","W","W","D"] },
];

export const topPlayers = [
  { name: "Erling Haaland", country: "Norway", goals: 0, assists: 0, rating: 9.1, pos: "FW" },
  { name: "Kylian Mbappé", country: "France", goals: 0, assists: 0, rating: 9.0, pos: "FW" },
  { name: "Vinicius Jr.", country: "Brazil", goals: 0, assists: 0, rating: 8.9, pos: "FW" },
  { name: "Lionel Messi", country: "Argentina", goals: 0, assists: 0, rating: 8.8, pos: "FW" },
  { name: "Jude Bellingham", country: "England", goals: 0, assists: 0, rating: 8.7, pos: "MF" },
  { name: "Pedri", country: "Spain", goals: 0, assists: 0, rating: 8.6, pos: "MF" },
  { name: "Rodri", country: "Spain", goals: 0, assists: 0, rating: 8.5, pos: "MF" },
  { name: "Bernardo Silva", country: "Portugal", goals: 0, assists: 0, rating: 8.4, pos: "MF" },
];

export const hostCities = [
  { city: "Los Angeles", country: "USA", stadium: "SoFi Stadium", capacity: 70240, matches: 10 },
  { city: "New York/NJ", country: "USA", stadium: "MetLife Stadium", capacity: 82500, matches: 10 },
  { city: "Dallas", country: "USA", stadium: "AT&T Stadium", capacity: 80000, matches: 9 },
  { city: "San Francisco", country: "USA", stadium: "Levi's Stadium", capacity: 68500, matches: 8 },
  { city: "Miami", country: "USA", stadium: "Hard Rock Stadium", capacity: 65000, matches: 8 },
  { city: "Mexico City", country: "Mexico", stadium: "Estadio Azteca", capacity: 87500, matches: 7 },
  { city: "Toronto", country: "Canada", stadium: "BMO Field", capacity: 45000, matches: 7 },
  { city: "Vancouver", country: "Canada", stadium: "BC Place", capacity: 54500, matches: 7 },
];
