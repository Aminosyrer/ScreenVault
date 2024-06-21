import React from 'react';
import { Box, Center } from '@chakra-ui/react';

interface Props {
    children: React.ReactNode;
}

const MovieCardContainer: React.FC<Props> = ({ children }) => {
    return (
        <Center>
            <Box
                _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                overflow="hidden"
                borderRadius="lg"
                boxShadow="lg"
                maxW="sm"
                h="520px"
            >
                {children}
            </Box>
        </Center>
    );
};

export default MovieCardContainer;