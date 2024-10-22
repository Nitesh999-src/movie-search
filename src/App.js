import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '57a315cd'; 

  const searchMovie = async () => {
    setError('');
    setMovie(null);

    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovie(data);
      } else {
        setError('Movie not found. Please try another search.');
      }
    } catch (error) {
      setError('Error fetching movie data. Please try again later.');
    }
  };

  return (
    <div className="app">
      <h1 className="title">Movie Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="search-input"
        />
        <button onClick={searchMovie} className="search-button">
          Search
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {movie && (
        <div className="movie-details">
          <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
          <div className="movie-info">
            <h2>{movie.Title}</h2>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

