import { GENRE_MAP } from "./constants";

export type GenreId = keyof typeof GENRE_MAP;
export type GenreName = typeof GENRE_MAP[GenreId];

export type ProviderId = number;

export type Vote = "yes" | "no" | "maybe";

export type MovieData = {
  id: string,
  title: string,
  poster_path: string,
  overview: string,
  release_date: string,
  vote_average: string,
  genres: string[],
  duration: string,
}
