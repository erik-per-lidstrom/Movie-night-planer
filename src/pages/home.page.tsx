import { useState } from "react";
import type { Movie } from "../types";
import { useContext } from "react";
import MovieContext from "../context/movie.context";
import MovieInput from "../components/movieInput.component";
import ScrollToTop from "../components/scrollToTop.component";
import MovieItem from "../components/movieItem.component";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedAgeRate, setSelectedAgeRate] = useState<string>("");
  const [searchMovie, setSearchMovie] = useState<string>("");
  const { state, dispatch } = useContext(MovieContext) || {
    state: [],
    dispatch: null,
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredmovies = state.filter((movie) => {
    const matchinggenre = selectedGenre === "" || movie.genre === selectedGenre;
    const matchingAgeRate =
      selectedAgeRate === "" || movie.ageRate === selectedAgeRate;
    const finall = matchinggenre && matchingAgeRate;
    return finall;
  });

  const handlemovieSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMovie(event.target.value);
  };

  const removeMovie = (id: string) =>
    dispatch?.({ type: "REMOVE_MOVIE", payload: id });

  return (
    <div>
      <ScrollToTop />

      <input
        type="text"
        value={searchMovie}
        onChange={(event) => handlemovieSearch(event)}
        placeholder="Search Movie"
      />

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
        <option value="PG-18">PG-18</option>
      </select>
      <h1>Movies</h1>
      <p>
        {filteredmovies.length} movies found of {state.length}
      </p>
      {filteredmovies.length === 0 && <p>No movies found</p>}
      {filteredmovies.map((movie: Movie) => (
        <div key={movie.id}>
          <MovieItem movie={movie} />
          <button
            onClick={() => {
              removeMovie(movie.id);
            }}
          >
            X
          </button>
        </div>
      ))}
      <MovieInput />
      <button onClick={scrollToTop}>Back To Top</button>
    </div>
  );
};

export default HomePage;
