import type { Movie } from "../types";
import { useContext } from "react";
import MovieContext from "../context/movie.context";

const MoviePage = () => {
  const { movie, dispatch } = useContext(MovieContext) || {
    movies: [],
    dispatch: null,
  };

  const removeMovie = (id: string) =>
    dispatch?.({ type: "REMOVE_MOVIE", payload: id });

  return (
    <div>
      <h1>Movies</h1>

      {movie &&
        movie.map((movie: Movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>

            <p>Genre: {movie.genre}</p>
            <button
              onClick={() => {
                removeMovie(movie.id);
              }}
            >
              X
            </button>
          </div>
        ))}
    </div>
  );
};

export default MoviePage;
