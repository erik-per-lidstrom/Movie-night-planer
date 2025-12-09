import type { Action, Movie } from "../types";

export const initialState = {
  movies: [] as Movie[],
};

const moveReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "REMOVE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.title !== action.payload),
      };
    default:
      throw new Error("case duse not mach reduser");
  }
};

export default moveReducer;
