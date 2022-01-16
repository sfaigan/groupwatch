import { Wrap, Box, Text, VStack } from "@chakra-ui/react";
import { Provider } from "../context/result";
import { Movie } from "../hooks/useMovie";
import MovieDetailChip from "./movie-detail-chip";

function formatDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
}

interface Props {
  movie: Movie;
  providers?: Provider[];
}

const getProvidersList = (providers: Provider[]) => {
  return (
    <Box>
      <Text fontWeight="bold">Available on:</Text>
      {providers.map((provider) => {
        return <MovieDetailChip key={provider.provider_id} icon={"genre"} value={provider.provider_name} />
      })}
    </Box>
  )
}

const MovieDetailsChipList = ({ movie, providers }: Props) => {
    return (
      <VStack>
        <Wrap>
          <MovieDetailChip
            key={movie.release_date}
            icon={"release_date"}
            value={movie.release_date}
          />
          <MovieDetailChip
            key={movie.duration}
            icon={"duration"}
            value={formatDuration(movie.duration)}
          />
          <MovieDetailChip
            key={movie.vote_average}
            icon={"vote_average"}
            value={`${movie.vote_average}/10`}
          />
          {movie.genres.map((genre) => (
            <MovieDetailChip key={genre.id} icon={"genre"} value={genre.name} />
          ))}
        </Wrap>
        {providers && getProvidersList(providers)}
      </VStack>
      
    )
}

export default MovieDetailsChipList
