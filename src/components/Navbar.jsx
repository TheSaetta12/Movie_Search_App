import { NavLink } from 'react-router-dom';

// Riceviamo come prop la lunghezza dell'array dei preferiti
function Navbar({ favoritesCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          🎬 Movie Search App
        </NavLink>

        <div className="navbar-nav">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          
          <NavLink className="nav-link d-flex align-items-center" to="/favorites">
            Preferiti
            {/* Suggerimento Bonus: Badge con il numero di preferiti */}
            {favoritesCount > 0 && (
              <span className="badge rounded-pill bg-danger ms-2">
                {favoritesCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;