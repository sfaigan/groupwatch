import { useContext } from "react";
import { Box, Text, VStack, Grid, Button } from "@chakra-ui/react";
import { useState } from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { MovieEntry } from "../components/movie-entry";
import { View } from "../constants";
import { MainContext } from "../context/main";

export const ResultFailure = ({
  setView,
}: {
  setView: (view: View) => void;
}) => {
  const [isDisabled, setDisabled] = useState(true);
  const [selected, setSelected] = useState(-1);
  const movies = [
    { name: "Shrek 3", id: 1 },
    { name: "Shrek 1", id: 4 },
    { name: "Shrek 2", id: 55 },
    { name: "Shrek 4", id: 12 },
    { name: "Shrek 5", id: 68 },
  ];

  const { isHost } = useContext(MainContext);

  const handleConfirm = () => {
    // TODO pass on confirmed movie to context provider
    setView(View.READY_TO_WATCH);
  };

  const updateSelected = (movie: number) => {
    if (selected === movie) {
      setSelected(-1);
      setDisabled(true);
    } else {
      setSelected(movie);
      setDisabled(false);
    }
  };

  var footer = <Text fontWeight="bold">Shea is confirming the movie</Text>;
  if (isHost) {
    footer = (
      <Button
        colorScheme={"purple"}
        size="md"
        width="80%"
        isDisabled={isDisabled}
        onClick={handleConfirm}
      >
        Confirm movie
      </Button>
    );
  }

  return (
    <Box fontSize="xl">
      <Grid p={5}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={1}>
          <Text fontWeight="bold" fontSize="4xl" textAlign="center">
            Your group's top 5 picks:
          </Text>
          <Box
            width="100%"
            maxHeight="70%"
            overflow="auto"
            paddingBottom="20px"
          >
            {movies.map((movie) => {
              return (
                <MovieEntry
                  text={movie.name}
                  onSelect={() => updateSelected(movie.id)}
                  onOpen={() => setView(View.MOVIE_VOTE_RESULTS)}
                  selected={selected === movie.id}
                />
              );
            })}
          </Box>
          {footer}
        </VStack>
      </Grid>
    </Box>
  );
};
