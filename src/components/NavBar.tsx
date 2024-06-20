import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link, Button } from "@chakra-ui/react";

const Navbar: React.FC = () => {
    return (
        <Box bg="darkslategray" p={4}>
            <Flex as="nav" justify="space-between" align="center">
                <Link as={RouterLink} to="/" fontSize="xl" color="white">
                    ScreenVault
                </Link>
                <Box>
                    <Link as={RouterLink} to="/login" mr={4} color="white">
                        Login
                    </Link>
                    <Link as={RouterLink} to="/register" mr={4} color="white">
                        Register
                    </Link>
                    <Link as={RouterLink} to="/admin">
                        <Button colorScheme="teal">Admin Dashboard</Button>
                    </Link>
                </Box>
            </Flex>
        </Box>
    );
};

export default Navbar;