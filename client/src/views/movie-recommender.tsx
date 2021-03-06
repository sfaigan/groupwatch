import { useContext, useEffect } from "react";
import {
  theme,
  Box,
  Grid,
  VStack,
  Image,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";

import { ColorModeSwitcher } from "../ColorModeSwitcher";
import MovieDetailsChipList from "../components/movie-details-chip-list";
import MovieVoteButtons from "../components/movie-vote-buttons";
import { MainContext } from "../context/main";
import { SocketContext } from "../context/socket";
import { useMovie } from "../hooks/useMovie";
import { View } from "../constants";
import { ResultContext } from "../context/result";
import { formatImageURL } from "../helpers";

export const MovieRecommender = ({
  setView,
}: {
  setView: (view: View) => void;
}) => {
  const socket = useContext<any>(SocketContext);
  const { userId, isHost, groupCode } = useContext(MainContext);
  const { movie, loading, error, setVote } = useMovie();
  const { result, setResult, setProviders } = useContext(ResultContext);

  useEffect(() => {
    socket.on("matchFound", (movie: any, providers: any): void => {
      console.log("Users updated.");
      console.log(movie);
      setResult(movie);
      setProviders(providers);
    });
    if (result?.id) {
      setView(View.RESULT_SUCCESS);
    }
  }, [result]);

  const handleMovieVote = (vote: "yes" | "no" | "maybe") => {
    if (movie) {
      console.log("Voting...");
      socket.emit("movieVote", groupCode, movie.id, vote, (error: string) => {
        console.log(`Voting ${vote} for ${movie.title}.`);
        if (error) {
          console.log(error);
          return;
        }
        setVote(true);
        console.log(`Successfully voted ${vote} for ${movie.title}.`);
        return;
      });
    }
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid p={4}>
        {isHost && (
          <Button
            backgroundColor={theme.colors.red[400]}
            justifySelf="flex-start"
            position="absolute"
          >
            Stop
          </Button>
        )}
        <ColorModeSwitcher justifySelf="flex-end" />
        {!loading && !error && movie && (
          <VStack spacing={3} padding={4}>
            <Image src={formatImageURL(movie.poster_path)} />
            <Text fontWeight={"bold"} fontSize="xl">
              {movie.title}
            </Text>
            <Text fontSize="sm">{movie.overview}</Text>
            <MovieDetailsChipList movie={movie} />
            <MovieVoteButtons handleMovieVote={handleMovieVote} />
          </VStack>
        )}
        {loading && <Spinner />}
      </Grid>
    </Box>
  );
};

export default MovieRecommender;
