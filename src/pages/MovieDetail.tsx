import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, List, ListItem, Spinner, Center } from '@chakra-ui/react';
import axios from 'axios';

interface Movie {
    id: number;
    title: string;
    description: string;
    releaseYear: number;
    genres: string[];
    cast: { actorName: string; characterName: string }[];
    posterUrl: string;
    trailerUrl?: string;
}

const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/Movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie', error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <Center><Spinner p={4} size="xl"/></Center>;
    }

    return (
        <Box p={4}>
            <Heading>{movie.title}</Heading>
            <Text>{movie.description}</Text>
            <Image src={movie.posterUrl} alt={movie.title} />
            <Text>Release Year: {movie.releaseYear}</Text>
            <Text>Genres: {movie.genres.join(', ')}</Text>
            <Heading size="md" mt={4}>Cast</Heading>
            <List spacing={3}>
                {movie.cast.map((member, index) => (
                    <ListItem key={index}>
                        {member.actorName} as {member.characterName}
                    </ListItem>
                ))}
            </List>
            {movie.trailerUrl && (
                <Box mt={4}>
                    <Heading size="md">Trailer</Heading>
                    <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
                </Box>
            )}
        </Box>
    );
};

export default MovieDetail;