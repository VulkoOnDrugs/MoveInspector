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

export const getRecommendations = async (movieId) => {
    const response = await fetch (`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch movie images')
    }

    return data.results;
}

export const getPeopleDetails = async (personId) => {
    const response = await fetch (`${BASE_URL}/person/${personId}?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch people')
    }

    return data;
}

export const getPeopleSocialDetails = async (personId) => {
    const response = await fetch (`${BASE_URL}/person/${personId}/external_ids?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch Social')
    }

    return data;
}

export const getPeopleImages = async (personId) => {
    const response = await fetch (`${BASE_URL}/person/${personId}/images?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch people images')
    }

    return data.profiles;
}

export const getPeopleCredits = async (personId) => {
    const response = await fetch (`${BASE_URL}/person/${personId}/combined_credits?api_key=${API_KEY}`);
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch people credits')
    }

    return data;
}

export const searchMovies = async (query) => {

    try{
        const response = await fetch (`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        if(!response.ok) {
            throw new Error(`http error! status ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    }catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }

}