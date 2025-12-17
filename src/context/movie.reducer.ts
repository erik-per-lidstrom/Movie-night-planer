import type { Action, Movie, MovieState } from "../types";

export const movieReducer = (state: MovieState, action: Action): MovieState => {
  switch (action.type) {
    case "ADD_MOVIE": {
      const newMovie: Movie = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        title: action.payload.title,
        ageRate: action.payload.ageRate,
        genre: action.payload.genre,
        description: action.payload.description,
        imgUrl: action.payload.imgUrl,
        runtime: action.payload.runtime,
      };

      return [...state, newMovie];
    }

    case "REMOVE_MOVIE": {
      return state.filter((movie) => movie.id !== action.payload);
    }
    default: {
      return state;
    }
  }
};
