import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, FormControl, FormLabel, Heading } from "@chakra-ui/react";
import axios from "axios";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={8}>
            <Heading mb={6}>Login</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full">
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Login;