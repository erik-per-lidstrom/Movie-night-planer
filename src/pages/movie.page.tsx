import { useState } from "react";
import type { Movie } from "../types";
import { useContext } from "react";
import MovieContext from "../context/movie.context";
import { movies } from "../data/movies";

const MoviePage = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedAgeRate, setSelectedAgeRate] = useState<string>("");

  const filteredmovies = movies.filter((movie) => {
    const matchinggenre = selectedGenre === "" || movie.genre === selectedGenre;
    const matchingAgeRate =
      selectedAgeRate === "" || movie.ageRate === selectedAgeRate;
    return matchinggenre && matchingAgeRate;
  });
  const { movie, dispatch } = useContext(MovieContext) || {
    movies: [],
    dispatch: null,
  };

  return (
    <div>
      <select
        name="genre"
        id="genre"
        onChange={(event) => setSelectedGenre(event.target.value)}
      >
        <option value="">All genres</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Crime">Crime</option>
        <option value="Horror">Horror</option>
      </select>

      <select
        name="ageRate"
        id="ageRate"
        onChange={(event) => setSelectedAgeRate(event.target.value)}
      >
        <option value="">All age rates</option>
        <option value="PG-13">PG-13</option>
        <option value="">PG-18</option>
      </select>
      <h1>Movies</h1>

      {filteredmovies.map((movie: Movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>Age Rate: {movie.ageRate}</p>
          <p>Genre: {movie.genre}</p>
        </div>
      ))}
      {movie &&
        movie.map((movie: Movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>

            <p>Genre: {movie.genre}</p>
            <button
              onClick={() =>
                dispatch?.({ type: "REMOVE_MOVIE", payload: movie.id })
              }
            >
              X
            </button>
          </div>
        ))}
    </div>
  );
};

export default MoviePage;
