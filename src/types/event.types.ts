import type { Movie } from "./movie.types";

export type Event = {
  _id: string;
  name: string;
  date: string;
  starttime: string;
  endtime: string;
  location: string;
  description: string;
  agerate: string;
  genre: string;
  movies?: Movie[];
};
