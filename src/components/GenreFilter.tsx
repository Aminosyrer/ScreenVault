import React from 'react';
import { Box, Checkbox, CheckboxGroup, Wrap } from '@chakra-ui/react';

interface Props {
    genres: string[];
    selectedGenres: string[];
    onChange: (selectedGenres: string[]) => void;
}

const GenreFilter: React.FC<Props> = ({ genres, selectedGenres, onChange }) => {
    return (
        <Box p={4} bg="white" borderRadius="lg" boxShadow="md" mb={4} width="100%">
            <CheckboxGroup value={selectedGenres} onChange={(values) => onChange(values as string[])}>
                <Wrap spacing={4} justify="space-between">
                    {genres.map((genre) => (
                        <Checkbox key={genre} value={genre} borderColor="darkgray">
                            {genre}
                        </Checkbox>
                    ))}
                </Wrap>
            </CheckboxGroup>
        </Box>
    );
};

export default GenreFilter;