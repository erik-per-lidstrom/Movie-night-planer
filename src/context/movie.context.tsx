import { createContext } from "react";
import type { MovieState, MovieContextType } from "../types";

const initialMovies: MovieState = [];

const MovieContext = createContext<MovieContextType | null>({
  state: initialMovies,
  dispatch: () => null,
});

export default MovieContext;
