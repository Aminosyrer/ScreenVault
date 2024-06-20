import { Box, SimpleGrid, Spinner, Text, Button } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCardContainer from "./MovieCardContainer";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";

const MovieGrid = () => {
    const {
        error,
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useMovies();
    const skeletons = [...Array(10).keys()];

    const fetchedMoviesCount =
        data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

    if (error) return <Text>There was an error</Text>;

    return (
        <InfiniteScroll
            dataLength={fetchedMoviesCount}
            next={() => fetchNextPage()}
            hasMore={hasNextPage || false}
            loader={<Spinner />}
        >
            <Box padding={2}>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
                    {isLoading &&
                        skeletons.map((skeleton) => (
                            <MovieCardContainer key={skeleton}>
                                <MovieCardSkeleton />
                            </MovieCardContainer>
                        ))}
                    {data?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page.results.map((movie) => (
                                <MovieCardContainer key={movie.id}>
                                    <MovieCard movie={movie} />
                                </MovieCardContainer>
                            ))}
                        </React.Fragment>
                    ))}
                </SimpleGrid>
                {hasNextPage && (
                    <Button onClick={() => fetchNextPage()} marginY={5}>
                        {isFetchingNextPage ? "Loading..." : "Load more"}
                    </Button>
                )}
            </Box>
        </InfiniteScroll>
    );
};

export default MovieGrid;