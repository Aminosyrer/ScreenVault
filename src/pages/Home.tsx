import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import MovieGrid from '../components/MovieGrid';
import GenreFilter from '../components/GenreFilter';

const genres = ["Action", "Adventure", "Animation", "Crime", "Drama", "Sci-Fi", "Thriller", "Fantasy", "Comedy", "Family", "Placeholder"];

const Home: React.FC = () => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    return (
        <Box p={4}>
            <GenreFilter
                genres={genres}
                selectedGenres={selectedGenres}
                onChange={setSelectedGenres}
            />
            <MovieGrid selectedGenres={selectedGenres} />
        </Box>
    );
};

export default Home;