import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        key: import.meta.env.TMDB_API_KEY,
    }
});

export default apiClient;