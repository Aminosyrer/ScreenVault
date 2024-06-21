import React, { useState } from 'react';
import { Box, Button, SimpleGrid, Spinner, Text, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import useAllMovies from '../hooks/useAllMovies';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
    const { data, error, isLoading, refetch } = useAllMovies();
    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        posterUrl: '',
    });
    const toast = useToast();

    const handleCreate = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/Movie`, newMovie, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            toast({
                title: 'Movie created.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setNewMovie({ title: '', description: '', posterUrl: '' });
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
            <Box mb={4}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        value={newMovie.title}
                        onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Input
                        value={newMovie.description}
                        onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Poster URL</FormLabel>
                    <Input
                        value={newMovie.posterUrl}
                        onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
                    />
                </FormControl>
                <Button mt={4} onClick={handleCreate}>
                    Create Movie
                </Button>
            </Box>

            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
                {data?.pages.map((page) =>
                    page.results.map((movie) => (
                        <Box key={movie.id} p={4} borderWidth={1} borderRadius="lg">
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    defaultValue={movie.title}
                                    onBlur={(e) => handleUpdate(movie.id, { title: e.target.value })}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    defaultValue={movie.description}
                                    onBlur={(e) => handleUpdate(movie.id, { description: e.target.value })}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Poster URL</FormLabel>
                                <Input
                                    defaultValue={movie.posterUrl}
                                    onBlur={(e) => handleUpdate(movie.id, { posterUrl: e.target.value })}
                                />
                            </FormControl>
                            <Button mt={4} colorScheme="red" onClick={() => handleDelete(movie.id)}>
                                Delete
                            </Button>
                        </Box>
                    ))
                )}
            </SimpleGrid>
        </Box>
    );
};

export default AdminDashboard;