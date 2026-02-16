import { useParams } from "react-router-dom";
import MovieInput from "@/components/movieInput.component";
import { useContext, useEffect, useState } from "react";
import MovieContext from "../context/movie.context";
import type { Movie } from "../types/movie.types";

const AddMoviePage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { state: movies, dispatch } = useContext(MovieContext) || {
    state: [],
    dispatch: null,
  };

  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Hämta redan skapade filmer för detta event
  useEffect(() => {
    if (!eventId) return; // visa ett meddelande om event saknas

    const fetchMovies = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You must be logged in");

        const res = await fetch(
          `http://localhost:4000/api/movies/event/${eventId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) {
          if (res.status === 404) {
            // Om eventet är nytt och inga filmer finns
            return setLoading(false);
          }
          throw new Error("Failed to fetch movies");
        }

        const data = await res.json();
        const moviesMapped = data.map((m: any) => ({
          _id: m._id,
          title: m.Title,
          ageRate: m.AgeRate,
          genre: m.Genre,
          description: m.Description,
          imgUrl: m.ImageURL,
          runtime: m.Runtime,
        }));

        moviesMapped.forEach((movie: Movie) => {
          dispatch?.({ type: "ADD_MOVIE", payload: movie });
        });
      } catch (err: any) {
        console.error(err);
        setFetchError(err.message || "Could not load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [eventId, dispatch]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Movie</h2>

      {loading && <p>Loading movies...</p>}
      {fetchError && <p className="text-red-600">{fetchError}</p>}

      <MovieInput eventId={eventId!} />

      {/* Lista redan tillagda filmer */}
      {movies.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Current Movies</h3>
          <ul className="space-y-2">
            {movies.map((movie: Movie) => (
              <li
                key={movie._id}
                className="border p-2 rounded bg-gray-100 flex justify-between items-center"
              >
                <p className="font-medium">{movie.title}</p>
                <p className="text-sm">Age: {movie.ageRate}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddMoviePage;
