import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Detail() {
  const { id } = useParams(); // Estrae l'ID dall'URL
  const navigate = useNavigate(); // Hook per tornare alla pagina precedente
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chiamata all'API per ottenere i dati completi del film
    axios.get(`https://www.omdbapi.com/?apikey=2010fdc8&i=${id}`)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Errore nel recupero dei dettagli:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  if (!movie) return <div className="text-center">Film non trovato.</div>;

  return (
    <div className="container my-5">
      {/* Bottone Torna Indietro */}
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        ← Torna indietro
      </button>

      <div className="row">
        <div className="col-md-4">
          {/* Poster grande */}
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600"} 
            alt={movie.Title} 
            className="img-fluid rounded shadow" 
          />
        </div>
        <div className="col-md-8">
          {/* Dettagli richiesti dalle fonti */}
          <h1 className="display-4">{movie.Title}</h1>
          <p className="lead text-muted">{movie.Year} • {movie.Genre}</p>
          <hr />
          <p><strong>Trama:</strong> {movie.Plot}</p>
          <p><strong>Regista:</strong> {movie.Director}</p>
          <p><strong>Attori:</strong> {movie.Actors}</p>
          <div className="mt-4">
            <span className="badge bg-warning text-dark fs-6">
              IMDb Rating: {movie.imdbRating} / 10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;