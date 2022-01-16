import { Wrap, Box, Text } from "@chakra-ui/react";
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
  providers: Provider;
}

const MovieDetailsChipList = ({ movie, providers }: Props) => {
    return (
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
          <Box>
            <Text fontWeight="bold">Available on:</Text>
            providers.map((provider) => (<MovieDetailChip key={providers.provider_id} icon={"genre"} value={provider.provider_name} />));
          </Box>
      </Wrap>
    )
}

export default MovieDetailsChipList
