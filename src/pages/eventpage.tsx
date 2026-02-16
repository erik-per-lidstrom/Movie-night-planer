import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Event } from "../types/event.types";
import type { Movie } from "../types/movie.types";

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
      
        setEvent(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Event not found</p>;

  
  const movies: Movie[] = Array.isArray(event.movies) ? event.movies : [];

  return (
    <div className="event-page p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
      <p>{event.description}</p>
      <p>
        Date: {event.date} | {event.starttime} - {event.endtime}
      </p>
      <p>Location: {event.location}</p>
      <p>Age Rate: {event.agerate}</p>
      <p>Genre: {event.genre}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Movies in this event</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.length === 0 && <p>No movies in this event yet</p>}
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="border p-4 rounded shadow flex flex-col"
          >
            <h3 className="font-bold">{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Age Rate: {movie.ageRate}</p>
            <p>Genre: {movie.genre}</p>
            <Link
              to={`/movie/${movie._id}`}
              className="mt-auto bg-blue-500 text-white px-3 py-1 rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
