const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';


export const nowPlayingMovies = async() => {
    const response = await fetch (`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch Playing Movies')
    }

    return data.results;
};

export const getPopularMovies = async() => {
    const response = await fetch (`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch Popular Movies')
    }

    return data.results;
}

export const getUpcomingMovies = async() => {
    const response = await fetch (`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch Upcoming Movies')
    }

    return data.results;
}

export const getMovieDetails = async (movieId) => {
    const response = await fetch (`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch Movie Details')
    }
    return data
}

export const getMovieCrew = async (movieId) => {
    const response = await fetch (`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch movie crew')
    }

    return data.crew
}

export const getMovieCast = async (movieId) => {
    const response = await fetch (`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch movie cast')
    }

    return data.cast
}

export const getMovieVideos = async (movieId) => {
    const response = await fetch (`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch movie videos')
    }

    return data.results
}

export const getMovieImages = async (movieId) => {
    const response = await fetch (`${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch movie images')
    }

    return data.backdrops;
}

