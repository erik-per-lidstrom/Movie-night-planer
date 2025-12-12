import { useContext } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../context/movie.context";

const MoviePage = () => {
  const { state } = useContext(MovieContext) || {
    state: [],
    dispatch: null,
  };
  const { movieId } = useParams();

  const movie = state.find((movie) => movie.id === movieId);

  return (
    <div>
      <h1>Movie Details Page </h1>
      {movie ? (
        <div>
          {movie.imgUrl && <img src={movie.imgUrl} alt={movie.title} />}
          <h2>{movie.title}</h2>
          <p>Age Rate: {movie.ageRate}</p>
          <p>Genre: {movie.genre}</p>
          <p>Description: {movie.description}</p>
        </div>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
};

export default MoviePage;
