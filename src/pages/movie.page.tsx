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
        {movie?.imgUrl !== "" && movie?.imgUrl ? (
          <img
            src={movie.imgUrl}
            alt={movie.title}
            className="w-64 h-auto rounded"
          />
        ) : (
          <div className="w-64 h-96 bg-gray-300 flex items-center justify-center rounded">
            <span className="text-gray-600">No Image Available</span>
          </div>
        )}
        {movie ? (
          <div className="movie-details flex flex-col ">
            <h2>{movie.title}</h2>

            {movie.thilleriframeUrl && (
              <iframe
                src={movie.thilleriframeUrl}
                title={`${movie.title} Trailer`}
                className="w-full h-64 md:h-96 rounded"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}

            <p id="ageRate-movies">
              <h4>Age Rate:</h4> {movie.ageRate}
            </p>

            <p id="genre-movies">
              <h4>Genre:</h4> {movie.genre}
            </p>

            <p id="runtime-movies">
              <h4>Runtime:</h4>
              {movie.runtime}
            </p>

            <p id="description-movies">
              <h4>Description:</h4> <br /> {movie.description}
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
