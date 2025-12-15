import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../context/movie.context";

const MoviePage = () => {
  const { state } = useContext(MovieContext) || {
    state: [],
    dispatch: null,
  };
  const { movieId } = useParams();

  useEffect(() => {
    document.title = `${movie?.title || "Unknown Movie"} Movie Details Page`;
  }, []);

  const movie = state.find((movie) => movie.id === movieId);

  return (
    <div className="movie-page p-4">
      <h1>Movie Details Page </h1>
      <div className="flex flex-col lg:flex-row p-4 gap-4 items-center md:items-start">
        {movie?.imgUrl && (
          <img
            className="max-w-2xl h-auto"
            src={movie.imgUrl}
            alt={movie.title}
          />
        )}
        {movie ? (
          <div className="movie-details flex flex-col ">
            <h2>{movie.title}</h2>

            <p>Age Rate: {movie.ageRate}</p>

            <p>Genre: {movie.genre}</p>

            <p>
              Description: <br /> {movie.description}
            </p>
          </div>
        ) : (
          <p>Movie not found</p>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
