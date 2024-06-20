import React from 'react';
import { Card, CardBody, Heading, Image, Text } from '@chakra-ui/react';
import { Movie } from '../entities/Movie';
import { Link } from 'react-router-dom';

interface Props {
    movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
    return (
        <Link to={`/movies/${movie.id}`}>
            <Card maxW="sm" borderRadius="lg" overflow="hidden" boxShadow="lg">
                <Image
                    src={movie.posterUrl || 'https://placehold.co/100x300?text=Placeholder'}
                    alt={movie.title}
                    objectFit="cover"
                    h="400px"
                    w="100%"
                />
                <CardBody>
                    <Heading fontSize="xl" noOfLines={1}>{movie.title}</Heading>
                    <Text mt={2} noOfLines={2}>{movie.description}</Text>
                </CardBody>
            </Card>
        </Link>
    );
};

export default MovieCard;