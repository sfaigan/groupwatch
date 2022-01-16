import { GENRE_MAP } from "./constants";

export type GenreId = keyof typeof GENRE_MAP;
export type GenreName = typeof GENRE_MAP[GenreId];