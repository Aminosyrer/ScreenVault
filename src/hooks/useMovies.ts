import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Movie } from '../entities/Movie';

interface PaginatedResponse {
    page: number;
    limit: number;
    results: Movie[];
}

const fetchMovies = async ({ pageParam = 1, queryKey }: { pageParam?: number, queryKey: any }) => {
    const [_key, genre] = queryKey;
    const response = await axios.get<PaginatedResponse>(`${import.meta.env.VITE_API_URL}/Movie`, {
        params: { page: pageParam, limit: 10, genre },
    });
    return response.data;
};

const useMovies = (genre: string) => {
    return useInfiniteQuery(['movies', genre], fetchMovies, {
        getNextPageParam: (lastPage) => {
            if (lastPage.results.length === 0) {
                return undefined;
            }
            return lastPage.page + 1;
        },
        staleTime: 300000,
        cacheTime: 600000,
    });
};

export default useMovies;