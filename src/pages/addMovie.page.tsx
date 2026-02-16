// [NY] AddMoviePage.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddMoviePage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    Title: "",
    AgeRate: "",
    Genre: "",
    Description: "",
    ImageURL: "",
    Runtime: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!eventId) return <p>Invalid event</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) return setError("You must be logged in");

    if (!movie.Title || !movie.AgeRate || !movie.Genre || !movie.Runtime) {
      return setError("Title, AgeRate, Genre, and Runtime are required");
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:4000/api/movies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...movie,
          EventId: eventId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create movie");
        setLoading(false);
        return;
      }

      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input
          name="Title"
          placeholder="Title"
          value={movie.Title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="AgeRate"
          placeholder="Age Rate"
          value={movie.AgeRate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="Genre"
          placeholder="Genre"
          value={movie.Genre}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="Description"
          placeholder="Description"
          value={movie.Description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="ImageURL"
          placeholder="Image URL"
          value={movie.ImageURL}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="Runtime"
          placeholder="Runtime"
          value={movie.Runtime}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMoviePage;
