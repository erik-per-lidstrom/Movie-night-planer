import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main.layout";
import HomePage from "./pages/home.page";
import AdminPage from "./pages/admin.page";
import MoviePage from "./pages/movie.page";
import MovieContext from "./context/movie.context";
import { useReducer } from "react";
import { movieReducer } from "./context/movie.reducer";
import { movies as mock } from "./data/movies";
function App() {
  const [movies, dispatch] = useReducer(movieReducer, mock);
  console.log(movies);

  return (
    <>
      <MovieContext.Provider value={{ state: movies, dispatch }}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path=":id" element={<MoviePage />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </MovieContext.Provider>
    </>
  );
}

export default App;
