import { useContext, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import MovieContext from "../context/movie.context";
import type { movieDraft } from "../types/movie.types";

interface MovieInputProps {
  eventId: string;
}

const MovieInput = ({ eventId }: MovieInputProps) => {
  const { dispatch } = useContext(MovieContext) || { dispatch: null };

  const [movie, setMovie] = useState<movieDraft>({
    title: "",
    description: "",
    ageRate: "",
    genre: "",
    imgUrl: "",
    runtime: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!movie.title.trim()) return alert("Title is required");
    if (!eventId) return alert("Event ID missing");

    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in");

    try {
      const res = await fetch(
        `http://localhost:4000/api/movies/event/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movie),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        return alert(data.message || "Failed to create movie");
      }

      const savedMovie = await res.json();

      // Lägg till filmen i context om dispatch finns
      dispatch?.({ type: "ADD_MOVIE", payload: savedMovie });

      // Reset form
      setMovie({
        title: "",
        description: "",
        ageRate: "",
        genre: "",
        imgUrl: "",
        runtime: "",
      });

      alert(`${savedMovie.Title || "Movie"} added successfully!`);
    } catch (err) {
      console.error(err);
      alert("Error creating movie");
    }
  };

  return (
    <form className="grid gap-4 mb-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          className="border rounded bg-accent w-full p-2"
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Movie Title"
        />
      </div>

      <div>
        <label htmlFor="ageRate">Age Rate:</label>
        <input
          className="border rounded bg-accent w-full p-2"
          type="text"
          name="ageRate"
          value={movie.ageRate}
          onChange={handleChange}
          placeholder="Age Rate"
        />
      </div>

      <div>
        <label htmlFor="genre">Genre:</label>
        <input
          className="border rounded bg-accent w-full p-2"
          type="text"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          placeholder="Genre"
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          className="border rounded bg-accent w-full p-2"
          name="description"
          value={movie.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>

      <div>
        <label htmlFor="imgUrl">Image URL:</label>
        <input
          className="border rounded bg-accent w-full p-2"
          type="text"
          name="imgUrl"
          value={movie.imgUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
      </div>

      <div>
        <label htmlFor="runtime">Runtime:</label>
        <input
          className="border rounded bg-accent w-full p-2"
          type="text"
          name="runtime"
          value={movie.runtime}
          onChange={handleChange}
          placeholder="Runtime"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Movie
      </button>
    </form>
  );
};

export default MovieInput;
