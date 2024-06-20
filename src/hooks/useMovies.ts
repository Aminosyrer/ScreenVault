import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Movie } from '../entities/Movie';

interface PaginatedResponse {
    page: number;
    limit: number;
    results: Movie[];
}

const fetchMovies = async ({ pageParam = 1 }) => {
    const response = await axios.get<PaginatedResponse>(`${import.meta.env.VITE_API_URL}/Movie`, {
        params: { page: pageParam, limit: 10 },
    });
    return response.data;
};

const useMovies = () => {
    return useInfiniteQuery('movies', fetchMovies, {
        getNextPageParam: (lastPage) => {
            if (lastPage.results.length === 0) {
                return undefined;
            }
            return lastPage.page + 1;
        },
    });
};

export default useMovies;
