import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
  agerate: string;
  genre: string;
  description: string;
}

interface Movie {
  _id: string;
  title: string;
  description: string;
  ageRate: string;
  genre: string;
  imgUrl: string;
  runtime: string;
}

const EventDetailsPage = () => {
  const { eventId } = useParams(); // kommer från route
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const [event, setEvent] = useState<Event | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return; // kolla att vi har eventId
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchEventAndMovies = async () => {
      setLoading(true);
      setError("");

      try {
        // Fetch event
        const eventRes = await fetch(
          `http://localhost:4000/api/events/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!eventRes.ok) throw new Error("Failed to fetch event");
        const eventData = await eventRes.json();
        setEvent(eventData);

        // Fetch movies
        const movieRes = await fetch(
          `http://localhost:4000/api/movies/event/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!movieRes.ok) {
          if (movieRes.status === 404) {
            setMovies([]); // inga filmer än
          } else {
            throw new Error("Failed to fetch movies");
          }
        } else {
          const movieData = await movieRes.json();
          const mappedMovies = movieData.map((m: any) => ({
            _id: m._id,
            title: m.Title,
            description: m.Description,
            ageRate: m.AgeRate,
            genre: m.Genre,
            imgUrl: m.ImageURL,
            runtime: m.Runtime,
          }));
          setMovies(mappedMovies);
        }
      } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndMovies();
  }, [eventId]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {loading && <p>Loading event...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {event && (
        <div>
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

          <h2 className="text-xl mt-4 mb-2">Movies</h2>
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
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
