import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const MovieContext = createContext();

// Custom hook to use the MovieContext
export const useMovieContext = () => useContext(MovieContext);

// Context Provider component
export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a movie to favorites if not already added
  const addToFavorites = (movie) => {
    if (!isFavorite(movie.id)) {
      setFavorites((prev) => [...prev, movie]);
    }
  };

  // Remove a movie by its ID
  const removeFromFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Check if movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorite,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

