import { Link } from 'react-router-dom';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <div className="card h-100 shadow-sm">
      {/* Immagine del poster */}
      <img 
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
        className="card-img-top" 
        alt={movie.Title} 
      />
      
      <div className="card-body d-flex flex-column">
        {/* Titolo e Anno */}
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text text-muted">{movie.Year}</p>
        
        <div className="mt-auto d-flex flex-column gap-2">
          {/* Link alla pagina di dettaglio utilizzando l'ID del film */}
          <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary w-100">
            Dettagli
          </Link>
          
          {/* Bottone dinamico per i preferiti */}
          <button 
            onClick={() => onToggleFavorite(movie)} 
            className={`btn w-100 ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
          >
            {isFavorite ? '💔 Rimuovi' : '❤️ Preferiti'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;