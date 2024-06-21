import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, HStack, Heading } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const NavBar: React.FC = () => {
    const { isAuthenticated, role, logout } = useAuth();

    return (
        <Box bg="blue.500" p={4} color="white">
            <Flex justify="space-between" align="center">
                <Heading size="md">
                <Link to="/">
                    Screen Vault
                </Link>
                </Heading>
                <Flex>
                    {isAuthenticated && role === "admin" && (
                        <Button as={Link} to="/admin" mr={4}>
                            Dashboard
                        </Button>
                    )}
                    <HStack spacing={4}>
                        {!isAuthenticated ? (
                            <>
                                <Button
                                    as={Link}
                                    to="/login"
                                    colorScheme="blue.500"
                                    variant="solid"
                                    color="white"
                                    _hover={{ bg: "blue" }}
                                >
                                    Login
                                </Button>
                                <Button
                                    as={Link}
                                    to="/register"
                                    colorScheme="blue.500"
                                    variant="ghost"
                                    color="white"
                                    _hover={{ bg: "blue" }}
                                >
                                    Register
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => {
                                    logout();
                                }}
                                colorScheme="blue.500"
                                variant="solid"
                                color="white"
                                _hover={{ bg: "blue" }}
                            >
                                Logout
                            </Button>
                        )}
                    </HStack>
                </Flex>
            </Flex>
        </Box>
    );
};

export default NavBar;