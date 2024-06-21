import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, Image, List, ListItem, Center, Spinner, Link } from '@chakra-ui/react';
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
        return <Center><Spinner p={4} size="xl" /></Center>;
    }

    return (
        <Box p={4}>
            <Flex direction={{ base: 'column', md: 'row' }} align="flex-start">
                <Box flexShrink={0} mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
                    <Image
                        src={movie.posterUrl || 'https://placehold.co/100x300?text=Placeholder'}
                        alt={movie.title}
                        width="400px"
                        height="650px"
                        objectFit="cover"
                        borderRadius="lg"
                    />
                </Box>
                <Box>
                    <Heading>{movie.title}</Heading>
                    <Heading size="md" mt={4}>Description</Heading>
                    <Text mb={4}>{movie.description}</Text>
                    <Heading size="md" mt={4}>Released</Heading>
                    <Text>{movie.releaseYear}</Text>
                    <Heading size="md" mt={4}>Genres</Heading>
                    <Text>{movie.genres.join(', ')}</Text>
                    <Heading size="md" mt={4}>Cast</Heading>
                    <List spacing={3} mb={4}>
                        {movie.cast.map((member, index) => (
                            <ListItem key={index}>
                                {member.actorName} as {member.characterName}
                            </ListItem>
                        ))}
                    </List>
                    {movie.trailerUrl && (
                        <Box mt={4}>
                            <Heading size="md">
                                <Link href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" color="teal.500">
                                    Watch Trailer
                                </Link>
                            </Heading>
                        </Box>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default MovieDetail;