import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface MovieProps {
    movie: {
        id: number;
        title: string;
        description: string;
        posterUrl: string;
    };
}

const MovieCard: React.FC<MovieProps> = ({ movie }) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Link to={`/movies/${movie.id}`}>
                <Image src={movie.posterUrl} alt={movie.title} />
                <Box p={4}>
                    <Heading size="md">{movie.title}</Heading>
                    <Text mt={2}>{movie.description}</Text>
                </Box>
            </Link>
        </Box>
    );
};

export default MovieCard;