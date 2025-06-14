import {createContext, useContext, useState} from "react";
import {searchMovies} from "../services/api.js";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        if (!query.trim()) return;
        setLoading(true)
        setError(null)

        try {
            const searchResults = await searchMovies(query);
            setMovies(searchResults)
        } catch (err) {
            console.error("Error fetching search:", err);
        } finally {
            setLoading(false)
        }
    }

const resetMovies = async() => {
    setLoading(true)
    try {
        setMovies([])
        setError(null)
    } catch (err) {
        console.error(err)
    } finally {
        setLoading(false)
    }
}

    const value = {
        searchQuery,
        setSearchQuery,
        movies,
        loading,
        error,
        handleSearch,
        resetMovies,
    }
  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}
