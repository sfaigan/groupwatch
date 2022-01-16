import dotenv from "dotenv";
import path from "path";
import { MovieDb } from "moviedb-promise";
import { MovieResponse } from "moviedb-promise/dist/request-types";
import { Request, Response } from "express";
import { getGroupUserInfo } from "../cache";
import { getTopVotedMovies } from "../cache";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
const moviedb = new MovieDb(process.env.TMDB_API_KEY_V3 || "none_in_env");

export async function GetMovies(req: Request, res: Response): Promise<void> {
  let { groupId, userId } = req.query;
  // get room genres, providers, and user's page
  console.log({groupId, userId});

  const { genres, streamingServices, page } = getGroupUserInfo(groupId as string, userId as string);
  console.log({genres, streamingServices, page});
  res.json(
    await GetMoviesByGenresAndProvider(
      genres.join(","),
      streamingServices.join(","),
      page
    )
  );
}

export async function GetMoviesByGenresAndProvider(
  genreIds?: string,
  providers?: string,
  page = 1
): Promise<MovieResponse[]> {
  try {
    if (!genreIds || !providers) {
      throw new Error("Missing genreIds or providers");
    }
    // convert GenreId[] to string with comma separated values
    // const with_genres = genreIds.join(",");
    // const with_watch_providers = providers.join(",");

    // call the discover endpoint
    const res = await moviedb.discoverMovie({
      with_genres: genreIds,
      with_watch_providers: providers,
      page,
      include_adult: false,
    });

    if (!res || !res.results) {
      throw new Error("No results");
    }

    // gets the details of the movies
    const movies = await Promise.all(
      res.results.map(async (movie) => {
        const details = await moviedb.movieInfo({
          id: `${movie.id}`,
          append_to_response: "credits",
        });
        return details;
      })
    );

    // filter out movie data that we don't need
    const filteredMovies = movies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genres: movie.genres,
        duration: movie.runtime,
      };
    });

    return filteredMovies;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// gets the top voted movies of the cached group and queries for their details
export async function GetTopMovies(req: Request, res: Response) {
  let { groupId } = req.query;
  
  try {
    if (!groupId) {
      throw new Error("Missing groupId");
    }

    const topMovieIds = getTopVotedMovies(groupId as string);

    const movies = await Promise.all(
      topMovieIds.map(async (movieId) => {
        const details = await moviedb.movieInfo({
          id: `${movieId}`,
        });
        const { id, title, poster_path, overview, release_date, vote_average, genres } = details;
        return {id, title, poster_path, release_date };
      })
    );

    res.json(movies);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  GetMovies,
  GetMoviesByGenresAndProvider,
  GetTopMovies,
};
