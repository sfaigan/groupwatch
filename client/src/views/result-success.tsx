import { useContext, useEffect } from "react";
import { Box, Text, VStack, Grid, Button, Image } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { View } from "../constants";
import { MainContext } from "../context/main";
import { ResultContext } from "../context/result";
import { formatImageURL } from "../helpers";
import { Genre, Movie } from "../hooks/useMovie";

export const ResultSuccess = ({
  setView,
}: {
  setView: (view: View) => void;
}) => {
  const { isHost } = useContext(MainContext);
  const { result, setResult } = useContext(ResultContext);

  useEffect(() => {
    console.log(result);
  }, [result]);

  const handleNegative = () => {
    setResult({} as Movie);
    setView(View.MOVIE_RECOMMENDER);
  };

  const handlePositive = () => {
    setView(View.READY_TO_WATCH);
  };

  var footer = <Text fontWeight="bold">Shea is confirming the movie</Text>;
  if (isHost) {
    footer = (
      <>
        <Text textAlign="center" fontWeight="bold" fontSize="4xl">
          Choose this movie?
        </Text>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            colorScheme={"red"}
            size="md"
            width="20%"
            onClick={handleNegative}
          >
            No
          </Button>
          <Button
            colorScheme={"green"}
            size="md"
            width="20%"
            onClick={handlePositive}
          >
            Yes
          </Button>
        </Box>
      </>
    );
  }
  return (
    <Box fontSize="xl">
      <Grid p={5}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={1}>
          <Text fontWeight="bold" fontSize="4xl">
            Your group picked:
          </Text>
          <Box width="100%" maxHeight="50%" overflow="hidden">
            <Image
              src={formatImageURL(result.poster_path)}
              objectFit="cover"
              boxSize="400px"
            />
          </Box>
          <Box width="100%" textAlign="center">
            <Text fontSize="4xl" fontWeight="bold">
              result.title
            </Text>
            <Box display="flex" justifyContent="space-evenly">
              <Text>result.year</Text>
              <Text>result.duration</Text>
              <Text>
                {result.genres.map((genre: Genre) => genre.name).join(", ")}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Available on:</Text>
              <Text>{result.genres.map((genre: Genre) => genre.name).join(", ")}</Text>
            </Box>
          </Box>
          <Box width="100%" pt="1%">
            {footer}
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
};
