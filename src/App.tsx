import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main.layout";
import HomePage from "./pages/home.page";
import MoviePage from "./pages/movie.page";
import MovieContext from "./context/movie.context";
import { useReducer } from "react";
import { movieReducer } from "./context/movie.reducer";
import "./index.css";
import AddMoviepage from "./pages/addMovie.page";
import type { Movie } from "./types/movie.types";
import AddEventPage from "./pages/addevent.page";
import EventDetailsPage from "./pages/eventdetails.page";

function App() {
  const initialMovies: Movie[] = [];
  const [movies, dispatch] = useReducer(movieReducer, initialMovies);
  console.log(movies);

  return (
    <MovieContext.Provider value={{ state: movies, dispatch }}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddMoviepage />} />
          <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/event/:eventId" element={<EventDetailsPage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </MovieContext.Provider>
  );
}

export default App;
