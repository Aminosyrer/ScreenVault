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
                console.log(response.data); // TODO: Remove
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
            <SimpleGrid columns={[1, 2, 3]} spacing={10}>
                {movies.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Home;