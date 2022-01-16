import {
  ChakraProvider,
  theme,
  Box,
  Grid,
  VStack,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import MovieDetailsChipList from "../components/movie-details-chip-list";
import MovieVoteButtons from "../components/movie-vote-buttons";
import { MainContext } from "../context/main";
import { SocketContext } from "../context/socket";
import { useMovie } from "../hooks/useMovieList";


const USER = {
  id: 1,
  name: "John Doe",
  isHost: true,
  isReady: true,
};

function formatImageURL(path: string) {
  return `https://image.tmdb.org/t/p/w500${path}`;
}
interface Props {
  setView: any;
}

export const MovieRecommender = ({ setView }: Props) => {
  const socket = useContext<any>(SocketContext);
  const { userId, groupCode } = useContext(MainContext);
  const { movie, loading, error, setVote } = useMovie();

  const handleMovieVote = (vote: "yes" | "no" | "maybe") => {
    socket.connect();
    socket.emit(
      "movieVote",
      userId,
      groupCode,
      movie.id,
      vote,
      (error: string) => {
        console.log(`Voting ${vote} for ${movie.title}.`);
        if (error) {
          console.log(error);
          return;
        }
        setVote(true);
        console.log(`Successfully voted ${vote} for ${movie.title}.`);
        return;
      }
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={4}>
          {USER.isHost && (
            <Button
              backgroundColor={theme.colors.red[400]}
              justifySelf="flex-start"
              position="absolute"
            >
              Stop
            </Button>
          )}
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={3} padding={4}>
            <Image src={formatImageURL(movie.poster_path)} />
            <Text fontWeight={"bold"} fontSize="xl">
              {movie.title}
            </Text>
            <Text fontSize="sm">{movie.overview}</Text>
            <MovieDetailsChipList movie={movie} />
            <MovieVoteButtons handleMovieVote={handleMovieVote} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default MovieRecommender;
