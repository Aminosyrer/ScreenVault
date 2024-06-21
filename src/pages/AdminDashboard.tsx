import React, { useState } from 'react';
import { Box, Button, SimpleGrid, Spinner, Text, Input, FormControl, FormLabel, useToast, VStack, Heading, Divider } from '@chakra-ui/react';
import useAllMovies from '../hooks/useAllMovies';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
    const { data, error, isLoading, refetch } = useAllMovies();
    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        posterUrl: '',
        releaseYear: 0,
        genres: [] as string[],
        trailerUrl: '',
    });
    const toast = useToast();

    const handleCreate = async () => {
        try {
            const movieData = {
                ...newMovie,
                releaseYear: newMovie.releaseYear || 0,
                genres: newMovie.genres || [],
                trailerUrl: newMovie.trailerUrl || ''
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/Movie`, movieData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            toast({
                title: 'Movie created.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setNewMovie({ title: '', description: '', posterUrl: '', releaseYear: 0, genres: [], trailerUrl: '' });
            refetch();
        } catch (error) {
            toast({
                title: 'Error creating movie.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.error('Error creating movie', error);
        }
    };

    const handleUpdate = async (id: number, updatedFields: any) => {
        try {
            const existingMovie = data?.pages.flatMap(page => page.results).find(movie => movie.id === id);
            if (!existingMovie) {
                throw new Error('Movie not found');
            }
            const updatedMovie = { ...existingMovie, ...updatedFields };
            await axios.put(`${import.meta.env.VITE_API_URL}/Movie/${id}`, updatedMovie, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            toast({
                title: 'Movie updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            refetch();
        } catch (error) {
            toast({
                title: 'Error updating movie.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.error('Error updating movie', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/Movie/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            toast({
                title: 'Movie deleted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            refetch();
        } catch (error) {
            toast({
                title: 'Error deleting movie.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.error('Error deleting movie', error);
        }
    };

    if (isLoading) return <Spinner />;
    if (error) return <Text>Error loading movies</Text>;

    return (
        <Box p={4}>
            <Box mb={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white">
                <Heading size="lg" mb={4}>Create New Movie</Heading>
                <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={newMovie.title}
                            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input
                            value={newMovie.description}
                            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Poster URL</FormLabel>
                        <Input
                            value={newMovie.posterUrl}
                            onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Release Year</FormLabel>
                        <Input
                            type="number"
                            value={newMovie.releaseYear}
                            onChange={(e) => setNewMovie({ ...newMovie, releaseYear: Number(e.target.value) })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Genres (comma-separated)</FormLabel>
                        <Input
                            value={newMovie.genres.join(', ')}
                            onChange={(e) => setNewMovie({ ...newMovie, genres: e.target.value.split(',').map(genre => genre.trim()) })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Trailer URL</FormLabel>
                        <Input
                            value={newMovie.trailerUrl}
                            onChange={(e) => setNewMovie({ ...newMovie, trailerUrl: e.target.value })}
                        />
                    </FormControl>
                </SimpleGrid>
                <Button mt={4} onClick={handleCreate} colorScheme="blue">
                    Create Movie
                </Button>
            </Box>

            <Divider my={8} />

            <Heading size="lg" mb={4}>Manage Existing Movies</Heading>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
                {data?.pages.map((page) =>
                    page.results.map((movie) => (
                        <Box key={movie.id} p={4} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white">
                            <VStack spacing={4} align="start">
                                <FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        defaultValue={movie.title}
                                        onBlur={(e) => handleUpdate(movie.id, { title: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Input
                                        defaultValue={movie.description}
                                        onBlur={(e) => handleUpdate(movie.id, { description: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Poster URL</FormLabel>
                                    <Input
                                        defaultValue={movie.posterUrl}
                                        onBlur={(e) => handleUpdate(movie.id, { posterUrl: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Release Year</FormLabel>
                                    <Input
                                        type="number"
                                        defaultValue={movie.releaseYear}
                                        onBlur={(e) => handleUpdate(movie.id, { releaseYear: Number(e.target.value) })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Genres (comma-separated)</FormLabel>
                                    <Input
                                        defaultValue={movie.genres.join(', ')}
                                        onBlur={(e) => handleUpdate(movie.id, { genres: e.target.value.split(',').map(genre => genre.trim()) })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Trailer URL</FormLabel>
                                    <Input
                                        defaultValue={movie.trailerUrl}
                                        onBlur={(e) => handleUpdate(movie.id, { trailerUrl: e.target.value })}
                                    />
                                </FormControl>
                                <Button colorScheme="red" onClick={() => handleDelete(movie.id)}>
                                    Delete
                                </Button>
                            </VStack>
                        </Box>
                    ))
                )}
            </SimpleGrid>
        </Box>
    );
};

export default AdminDashboard;