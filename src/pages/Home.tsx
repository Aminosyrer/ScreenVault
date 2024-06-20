import React, { useEffect, useState, useCallback } from 'react';
import { SimpleGrid, Box, Heading, Spinner, Center } from '@chakra-ui/react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { useInView } from 'react-intersection-observer';
import { Movie } from '../entities/Movie';

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMovies = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get<Movie[]>(`${import.meta.env.VITE_API_URL}/Movie`, {
                params: { page, limit: 5 },
            });

            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setMovies(prevMovies => {
                    const newMovies = response.data.filter(movie => !prevMovies.some(m => m.id === movie.id));
                    return [...prevMovies, ...newMovies];
                });
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movies', error);
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const { ref, inView } = useInView({
        threshold: 1,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    }, [inView, hasMore, loading]);

    return (
        <Box p={4}>
            <Heading mb={6}>Movies</Heading>
            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={10}
            >
                {movies.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </SimpleGrid>
            {loading && (
                <Center mt={4}>
                    <Spinner />
                </Center>
            )}
            <div ref={ref} />
        </Box>
    );
};

export default Home;