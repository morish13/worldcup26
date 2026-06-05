import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand">
          <span className="trophy">🏆</span>
          <span className="brand-text">WC<span className="year">26</span></span>
        </div>
        <div className="navbar-links">
          <NavLink to="/" end>Fixtures</NavLink>
          <NavLink to="/groups">Groups</NavLink>
          <NavLink to="/bracket">Bracket</NavLink>
          <NavLink to="/stats">Stats</NavLink>
          <NavLink to="/teams">Teams</NavLink>
        </div>
      </div>
    </nav>
  );
}
