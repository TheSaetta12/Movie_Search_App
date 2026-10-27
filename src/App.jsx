import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  // Suggerimento Bonus: Inizializziamo lo stato leggendo dal localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('movie-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Suggerimento Bonus: Ogni volta che la lista cambia, salviamo nel localStorage
  useEffect(() => {
    localStorage.setItem('movie-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Funzione globale per aggiungere/rimuovere un film dai preferiti
  const toggleFavorite = (movie) => {
    const isAlreadyFav = favorites.some(fav => fav.imdbID === movie.imdbID);
    
    if (isAlreadyFav) {
      // Se c'è già, lo rimuoviamo
      setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
    } else {
      // Se non c'è, lo aggiungiamo
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <Router>
      {/* Passiamo la lunghezza per il Bonus del Badge nella Navbar */}
      <Navbar favoritesCount={favorites.length} />
      
      <Routes>
        <Route 
          path="/" 
          element={<Home favorites={favorites} onToggleFavorite={toggleFavorite} />} 
        />
        <Route 
          path="/favorites" 
          element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />} 
        />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;