import { createContext, useReducer } from "react";
import moveReducer, { initialState } from "./move.reduser";
import type { Movie } from "../types";

type MovieContextType = {
  movies: Movie[];
  dispatch: React.Dispatch<any>;
};

const MovieContext = createContext<MovieContextType>({
  movies: initialState.movies,
  dispatch: () => null,
});

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(moveReducer, initialState);

  return (
    <MovieContext.Provider value={{ movies: state.movies, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
