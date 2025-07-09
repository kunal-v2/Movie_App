import "../css/Favorites.css";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MoviesContext";
function Favourites() {
  const { favorites } = useMovieContext(); // ✅ correct variable name

  if (favorites.length > 0) {
    return (
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="favourite-empty">
      <h2>No Favourite Movie Added</h2>
      <p>Start Adding Movies To Favourite</p>
    </div>
  );
}

export default Favourites;
