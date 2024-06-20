import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import MovieGrid from '../components/MovieGrid';

const Home: React.FC = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>Movies</Heading>
      <MovieGrid />
    </Box>
  );
};

export default Home;