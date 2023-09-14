import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "af7c1d34";

function App() {
  const [searchTerm, setSearchTerme] = useState([]);
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${title}`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      console.log(data);
      setMovies(data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchMovies("");
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
