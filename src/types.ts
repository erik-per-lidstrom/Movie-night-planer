import type { Dispatch } from "react";

export type Movie = {
  id: string;
  ageRate: string;
  title: string;
  genre: string;
};

export type movieDraft = Omit<Movie, "id">;

export type MovieState = Movie[];

export type MovieContextType = {
  state: MovieState;
  dispatch: Dispatch<Action>;
};

export type Action =
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "REMOVE_MOVIE"; payload: string };
