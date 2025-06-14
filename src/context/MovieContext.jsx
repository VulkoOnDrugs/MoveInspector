import {createContext, useContext} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
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