import dotenv from "dotenv";
import { MovieDb } from "moviedb-promise";
import { DiscoverMovieResponse } from "moviedb-promise/dist/request-types";
import { Request, Response } from "express";

dotenv.config();
const moviedb = new MovieDb(process.env.TMDB_API_KEY_V3 || "none_in_env");

export async function GetMovies(req: Request, res: Response): Promise<void> {
  let { genres, provider, page } = req.query;
  // convert page from string to number
  const pageNum = Number(page);
  console.log({ genres, provider, page });
  res.json(
    await GetMoviesByGenresAndProvider(
      genres as string,
      provider as string,
      pageNum
    )
  );
}

export async function GetMoviesByGenresAndProvider(
  genreIds?: string,
  providers?: string,
  page = 1
): Promise<DiscoverMovieResponse> {
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
    });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  GetMovies,
  GetMoviesByGenresAndProvider,
};
