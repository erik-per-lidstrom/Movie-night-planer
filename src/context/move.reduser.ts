import type { Action, Movie, MovieState } from "../types";

export const moveReducer = (state: Movie[], action: Action): MovieState => {
  switch (action.type) {
    case "ADD_MOVIE": {
      const newMovie: Movie = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        title: action.payload.title,
        ageRate: action.payload.ageRate,
        genre: action.payload.genre,
      };
      return [...state, newMovie];
    }

    case "REMOVE_MOVIE": {
      console.log("hi");

      console.log(action.payload);

      return state.filter((movie) => movie.id !== action.payload);
    }
    default: {
      console.log("hi");

      return state;
    }
  }
};
