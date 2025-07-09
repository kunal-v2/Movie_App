import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const searchedMovies = await searchMovies(searchQuery);
      setMovies(searchedMovies);
    } catch (err) {
      console.log(err);
      setError("Search failed.");
    } finally {
      setLoading(false);
      setSearchQuery(""); 
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
