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
                <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fallbackSrc="https://placehold.co/600x400?text=Hello+World"
                    boxSize="200px"
                    objectFit="cover"
                    width="100%"
                />
                <Box p={4} maxH="200px" overflow="hidden">
                    <Heading size="md" noOfLines={1}>{movie.title}</Heading>
                    <Text mt={2} noOfLines={2}>{movie.description}</Text>
                </Box>
            </Link>
        </Box>
    );
};

export default MovieCard;