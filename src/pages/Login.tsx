import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { username, password });
            login(response.data.token);
            toast({
                title: 'Login successful.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            toast({
                title: 'Login failed.',
                description: 'Invalid username or password.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Login failed', error);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" mt={4}>
                Login
            </Button>
        </Box>
    );
};

export default Login;