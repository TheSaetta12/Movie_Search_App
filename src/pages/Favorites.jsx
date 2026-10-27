import MovieCard from '../components/MovieCard';

function Favorites({ favorites, onToggleFavorite }) {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">I Tuoi Film Preferiti</h2>

      {/* Requisito: Messaggio se la lista è vuota */}
      {favorites.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <p className="mb-0">Non hai ancora aggiunto alcun film ai tuoi preferiti.</p>
        </div>
      ) : (
        /* Requisito: Mostra tutti i film aggiunti */
        <div className="row g-4">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3">
              {/* Riutilizziamo MovieCard per mostrare il film */}
              <MovieCard 
                movie={movie} 
                isFavorite={true} // In questa pagina sono tutti preferiti
                onToggleFavorite={onToggleFavorite} // Funzione per rimuoverli
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;