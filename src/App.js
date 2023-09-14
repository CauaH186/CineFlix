import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=af7c1d34";

function App() {
  const [searchTerm, setSearchTerme] = useState([]);
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("spiderman");
  }, []);

  return (
    <div className="app">
      <h1>CineFlix</h1>

      <div className="search">
        <input
          placeholder="Porcure filmes"
          value={searchTerm}
          onChange={(e) => setSearchTerme(e.target.value)}
          onKeyUp={() => searchMovies(searchTerm)}
        />
        <img
          src={SearchIcon}
          alt="Buscar"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nenhum filme foi encontrado</h2>
        </div>
      )}
    </div>
  );
}

export default App;
