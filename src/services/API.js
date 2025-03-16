const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const NowPlayingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

export const getMovieCrew = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    const data = await response.json();
    return data.crew;
};

export const getMovieCast = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    const data = await response.json();
    return data.cast;
};

export const getUpcomingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};