export interface Movie {
    id: number;
    title: string;
    description: string;
    releaseYear: number;
    genres: string[];
    cast: {
        actorName: string;
        characterName: string;
    }[];
    posterUrl: string;
    trailerUrl?: string;
}