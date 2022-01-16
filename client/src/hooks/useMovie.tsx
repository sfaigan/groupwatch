import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/main";

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

export function useMovie() {
  const { userId, groupCode } = useContext(MainContext);

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>({} as Movie);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [vote, setVote] = useState(false);

  console.log({userId, groupCode});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/movies/?groupId=${groupCode}&userId=${userId}`
        );
        setMovieList((prevState) => prevState.concat(response.data));
        setLoading(false);
      } catch (error) {
        setError(error as any);
      }
    };

    if (movieList.length <= 10 && movieList.length < 100) {
      fetchData();
    }
  }, [groupCode, userId, movieList.length]);

  // updates movie to first item in movieList and removes the previous movie if vote is changed
  // has to be called after vote is changed
  // TODO: make this more efficient
  useEffect(() => {
    if (vote) {
      setMovieList(movieList.slice(1));
      setMovie(movieList[0]);
      setVote(false);
      // will cause re-rendering once
    }
  }, [vote, movieList, movie]);

  return { movie, loading, error, setVote };
}
