import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

function Home({ favorites, onToggleFavorite }) {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Testo digitato dall'utente
  const [page, setPage] = useState(1);             // Bonus: Paginazione
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);        // Bonus: Gestione Errori

  // Bonus: Logica di Debounce per la ricerca automatica
  useEffect(() => {
    // Se il campo è vuoto, non fare nulla o resetta i risultati
    if (!searchTerm.trim()) {
      setMovies([]);
      return;
    }

    // Imposta un ritardo di 500ms prima di far partire la chiamata
    const delayDebounceFn = setTimeout(() => {
      fetchMovies(searchTerm, 1); // Quando cerchi un nuovo termine, resetta alla pagina 1
      setPage(1);
    }, 500);

    return () => clearTimeout(delayDebounceFn); // Pulisce il timer se l'utente scrive ancora
  }, [searchTerm]);

  // Effetto per cambiare pagina
  useEffect(() => {
    if (searchTerm.trim()) {
      fetchMovies(searchTerm, page);
    }
  }, [page]);

  const fetchMovies = async (query, pageNum) => {
    setLoading(true);
    setError(null);
    try {
      // Bonus: L'API supporta &page= per la paginazione
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=2010fdc8&s=${query}&page=${pageNum}`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        // Bonus: Gestione dell'errore "Movie not found" dall'API
        setMovies([]);
        setError(response.data.Error || "Nessun risultato trovato.");
      }
    } catch (err) {
      // Bonus: Gestione errori di rete
      setError("Errore di connessione al server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Esplora Film</h1>

      {/* Input con Bonus Debounce (senza bisogno di pulsante) */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Inizia a scrivere per cercare..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bonus: Messaggio visivo per gli errori */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Spinner Bootstrap durante il caricamento */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <MovieCard 
                  movie={movie} 
                  isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))}
          </div>

          {/* Bonus: Paginazione */}
          {movies.length > 0 && (
            <div className="d-flex justify-content-center mt-5 gap-3">
              <button 
                className="btn btn-outline-primary" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Precedente
              </button>
              <span className="align-self-center font-weight-bold">Pagina {page}</span>
              <button 
                className="btn btn-outline-primary" 
                onClick={() => setPage(p => p + 1)}
              >
                Successiva
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;