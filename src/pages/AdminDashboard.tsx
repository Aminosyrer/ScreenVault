import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const AdminDashboard: React.FC = () => {
    return (
        <Box p={4}>
            <Heading>Admin Dashboard</Heading>
            <Text>Manage movies and users here.</Text>
        </Box>
    );
};

export default AdminDashboard;