import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main.layout";
import HomePage from "./pages/home.page";
import MoviePage from "./pages/movie.page";
import MovieContext from "./context/movie.context";
import { useEffect, useReducer } from "react";
import { movieReducer } from "./context/movie.reducer";
import { movies as mock } from "./data/movies";
import "./index.css";
import AddMoviepage from "./pages/addMovie.page";
function App() {
  const storedMovies = localStorage.getItem("movies");
  const initialMovies = storedMovies ? JSON.parse(storedMovies) : mock;
  const [movies, dispatch] = useReducer(movieReducer, initialMovies);
  console.log(movies);

  useEffect(() => {
    // set to local storage or an API
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <>
      <MovieContext.Provider value={{ state: movies, dispatch }}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path=":movieId" element={<MoviePage />} />
            <Route path="/add" element={<AddMoviepage />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </MovieContext.Provider>
    </>
  );
}

export default App;
