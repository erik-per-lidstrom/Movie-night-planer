import { movies } from "../data/movies";

const MoviePage = () => {
  return (
    <div>
      <h1>Movies </h1>

      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>

          <p>Genre: {movie.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviePage;
