// API Read Access Token - eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTU2YmY1ZmZiNDEyNDZlYzkwMWZkMDJjN2IxNjhmOCIsIm5iZiI6MTc0MjQ0OTg2OC40ODMsInN1YiI6IjY3ZGJhY2NjMDg3NDllZmUzNGU3OTVmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IsLpoptbAEciWqvlWh07y8TpfbYCQK91fuAMGpVYMQU
const API_KEY = "7e56bf5ffb41246ec901fd02c7b168f8";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
};