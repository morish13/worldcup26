import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Fixtures from './pages/Fixtures';
import Groups from './pages/Groups';
import Bracket from './pages/Bracket';
import Stats from './pages/Stats';
import Teams from './pages/Teams';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Fixtures />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/bracket" element={<Bracket />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
