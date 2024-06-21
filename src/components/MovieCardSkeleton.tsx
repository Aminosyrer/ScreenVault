import { Card, CardBody, Center, Skeleton, SkeletonText } from "@chakra-ui/react";

const MovieCardSkeleton = () => {
    return (
        <Center>
            <Card>
                <Skeleton height="200px" />
                <CardBody>
                    <SkeletonText />
                </CardBody>
            </Card>
        </Center>
    );
};

export default MovieCardSkeleton;