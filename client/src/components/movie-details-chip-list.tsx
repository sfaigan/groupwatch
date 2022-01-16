import { Wrap } from "@chakra-ui/react";
import MovieDetailChip from "./movie-detail-chip";

function formatDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
}

interface Movie {
  id: number;
  title: string;
  duration: number;
  genres: {
    id: number;
    name: string;
  }[];
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface Props {
  movie: Movie;
}

const MovieDetailsChipList = ({movie}: Props) => {
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
      </Wrap>
    )
}

export default MovieDetailsChipList
