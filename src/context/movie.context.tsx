import type { ReactNode } from "react";
import { createContext, useReducer } from "react";
import { moveReducer } from "./move.reduser";
import type { MovieState, MovieContextType } from "../types";

const initialMovies: MovieState = [];

const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movie, dispatch] = useReducer(moveReducer, initialMovies);

  return (
    <MovieContext.Provider value={{ movie, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
