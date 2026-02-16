import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Event } from "../types/event.types";
import type { Movie } from "../types/movie.types";
const EventDetails = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState<Event | null>(null);

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !eventId) return;

    // Fetch event
    fetch(`http://localhost:4000/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch(console.error);

    // Fetch movies
    fetch(`http://localhost:4000/api/movies/event/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const moviesMapped: Movie[] = data.map((m: any) => ({
          id: m._id,
          title: m.Title,
          genre: m.Genre,
          ageRate: m.AgeRate,
          description: m.Description,
          imgUrl: m.ImageURL,
          runtime: m.Runtime,
        }));
        setMovies(moviesMapped);
      })
      .catch(console.error);
  }, [eventId]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {event ? (
        <div>
          <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Age: {event.agerate}</p>
          <p>Genre: {event.genre}</p>
          <p>Description: {event.description}</p>

          <h2 className="text-xl mt-4 mb-2">Movies</h2>
          {movies.length === 0 ? (
            <p>No movies for this event yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {movies.map((movie: Movie) => (
                <div key={movie._id} className="border p-3 rounded">
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p>Genre: {movie.genre}</p>
                  <p>Age: {movie.ageRate}</p>
                  <p>{movie.description}</p>
                  {movie.imgUrl && (
                    <img
                      src={movie.imgUrl}
                      alt={movie.title}
                      className="mt-2 w-full h-48 object-cover rounded"
                    />
                  )}
                  <Link
                    to={`/movie/${movie._id}`}
                    className="inline-block mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View Movie Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
};

export default EventDetails;
