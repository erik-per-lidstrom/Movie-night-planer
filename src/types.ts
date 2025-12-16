import type { Dispatch } from "react";

export type Movie = {
  id: string;
  ageRate: string;
  title: string;
  genre: string;
  description: string;
<<<<<<< HEAD
  imgUrl?: string;
  runtime?: string | number;
  thilleriframeUrl?: string;
>>>>>>> a247b3d7b414a4e1f75f03d074dd298dcc4524ab
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

export type MovieProps = {
  movie: Movie;
};
