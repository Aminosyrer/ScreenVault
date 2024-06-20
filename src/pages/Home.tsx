import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box, Heading } from '@chakra-ui/react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const Home: React.FC = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/Movie`);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Box p={4}>
            <Heading mb={6}>Movies</Heading>
            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
                spacing={10}
            >
                {movies.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Home;