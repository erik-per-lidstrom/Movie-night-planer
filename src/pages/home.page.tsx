import { useState } from "react";
import type { Movie } from "../types";
import { useContext } from "react";
import MovieContext from "../context/movie.context";
import MovieInput from "../components/movieInput.component";
import ScrollToTop from "../components/scrollToTop.component";
import MovieItem from "../components/movieItem.component";
import { HiArchiveBoxXMark } from "react-icons/hi2";

const HomePage = () => {
  const [searchmovietitle, setSearchmovietitle] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedAgeRate, setSelectedAgeRate] = useState<string>("");
  const { state, dispatch } = useContext(MovieContext) || {
    state: [],
    dispatch: null,
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredmovies = state.filter((movie) => {
    const matchingTitle = movie.title
      .toLowerCase()
      .includes(searchmovietitle.toLowerCase());
    if (!matchingTitle) return false;
    const matchinggenre = selectedGenre === "" || movie.genre === selectedGenre;
    const matchingAgeRate =
      selectedAgeRate === "" || movie.ageRate === selectedAgeRate;
    const finall = matchinggenre && matchingAgeRate;
    return finall;
  });

  const removeMovie = (id: string) =>
    dispatch?.({ type: "REMOVE_MOVIE", payload: id });

  return (
    <div>
      <ScrollToTop />

      <input
        type="text"
        placeholder="Search by title"
        value={searchmovietitle}
        onChange={(event) => setSearchmovietitle(event.target.value)}
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
      <p className="movie-count">
        {filteredmovies.length} movies found of {state.length}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  my-4">
        {filteredmovies.length === 0 && <p>No movies found</p>}
        {filteredmovies.map((movie: Movie) => (
          <div
            key={movie.id}
            className="flex flex-col items-center gap-4 border p-4 rounded bg-accent"
          >
            <MovieItem movie={movie} />
            <button
              onClick={() => {
                removeMovie(movie.id);
              }}
            >
              <HiArchiveBoxXMark className="text-red-600 w-6 h-auto " />
            </button>
          </div>
        ))}
      </div>

      <button onClick={scrollToTop}>Back To Top</button>
      <MovieInput />
    </div>
  );
};

export default HomePage;
