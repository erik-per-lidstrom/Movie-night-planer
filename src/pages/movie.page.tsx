import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../types/movie.types";

const MoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { eventId } = useParams();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/movies/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch movie");
        }

        const data = await res.json();
        setMovie(data);
        document.title = `${data.title} | Movie Details`;
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <p>Loading movie...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="movie-page p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image */}
        {movie.imgUrl ? (
          <img
            src={movie.imgUrl}
            alt={movie.title}
            className="w-64 h-auto rounded"
          />
        ) : (
          <div className="w-64 h-96 bg-gray-300 flex items-center justify-center rounded">
            <span className="text-gray-600">No Image Available</span>
          </div>
        )}

        {/* Details */}
        <div className="flex flex-col gap-3">
          {movie.thilleriframeUrl && (
            <iframe
              src={movie.thilleriframeUrl}
              title={`${movie.title} Trailer`}
              className="w-full h-64 md:h-96 rounded"
              allowFullScreen
              loading="lazy"
            />
          )}

          <p>
            <strong>Age Rate:</strong> {movie.ageRate}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          {movie.runtime && (
            <p>
              <strong>Runtime:</strong> {movie.runtime}
            </p>
          )}
          <p>
            <strong>Description:</strong>
            <br />
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
