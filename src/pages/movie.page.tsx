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

            <p>Age Rate: {movie.ageRate}</p>

            <p>Genre: {movie.genre}</p>

            <p>Runtime: {movie.runtime}</p>

            <p>
              Description: <br /> {movie.description}
            </p>

            {movie.thilleriframeUrl && (
              <iframe
                src={movie.thilleriframeUrl}
                title={`${movie.title} Trailer`}
                className="w-full h-64 md:h-96 rounded"
                allowFullScreen
              ></iframe>
            )}
          </div>
        ) : (
          <p>Movie not found</p>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
