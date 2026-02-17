// [ERSÄTT] EventDetailsPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Event } from "../types/event.types";
import type { Movie } from "../types/movie.types";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const [event, setEvent] = useState<Event | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        // Event
        const eventRes = await fetch(
          `http://localhost:4000/api/events/${eventId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!eventRes.ok) throw new Error("Failed to fetch event");
        const eventData = await eventRes.json();
        setEvent(eventData);

        // Movies
        const movieRes = await fetch(
          `http://localhost:4000/api/movies/event/${eventId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!movieRes.ok) {
          if (movieRes.status === 404) setMovies([]);
          else throw new Error("Failed to fetch movies");
        } else {
          const movieData = await movieRes.json();
          const mappedMovies = movieData.map((m: any) => ({
            _id: m._id,
            title: m.Title || "No Title",
            ageRate: m.AgeRate || "N/A",
            genre: m.Genre || "N/A",
            description: m.Description || "",
            imgUrl: m.ImageURL || "",
            runtime: m.Runtime || "",
          }));
          setMovies(mappedMovies);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {event && (
        <>
          <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Age: {event.agerate}</p>
          <p>Genre: {event.genre}</p>
          <p>Description: {event.description}</p>

          {currentUser?.role === "admin" && (
            <Link to={`/events/${event._id}/add-movie`}>
              <button className="bg-white text-black px-4 py-2 rounded mt-4 border hover:bg-gray-200">
                Add Movie
              </button>
            </Link>
          )}

          <h2 className="text-xl mt-6 mb-2">Movies</h2>
          {movies.length === 0 ? (
            <p>No movies for this event yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {movies.map((movie) => (
                <div
                  key={movie._id}
                  className="border p-3 rounded flex flex-col"
                >
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p className="text-sm">Genre: {movie.genre}</p>
                  <p className="text-sm">Age: {movie.ageRate}</p>
                  <p className="text-sm">{movie.description}</p>
                  {movie.imgUrl && (
                    <img
                      src={movie.imgUrl}
                      alt={movie.title}
                      className="mt-2 w-full h-40 object-cover rounded"
                    />
                  )}
                  <p className="text-sm mt-1">Runtime: {movie.runtime}</p>
                  <Link
                    to={`/movie/${movie._id}`}
                    className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded text-center"
                  >
                    View Movie Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventDetailsPage;
