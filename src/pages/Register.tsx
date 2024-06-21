import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, email, password });
            toast({
                title: 'Registration successful.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            navigate('/login');
        } catch (error) {
            toast({
                title: 'Registration failed.',
                description: 'There was an issue with your registration.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Registration failed', error);
        }
    };

    return (
        <VStack spacing={4} align="center" justify="center" minH="100vh" bg="gray.100">
            <Box bg="white" p={8} borderRadius="md" boxShadow="lg" width={{ base: '90%', md: '400px' }}>
                <Heading as="h2" size="xl" mb={6} textAlign="center">
                    Register
                </Heading>
                <Box as="form" onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Button type="submit" mt={4} colorScheme="blue" width="full">
                        Register
                    </Button>
                </Box>
            </Box>
        </VStack>
    );
};

export default Register;