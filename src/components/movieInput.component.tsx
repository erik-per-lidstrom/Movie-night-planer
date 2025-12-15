import { useContext, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import MovieContext from "../context/movie.context";
import type { movieDraft } from "../types";

const MovieInput = () => {
  const { dispatch } = useContext(MovieContext) || {
    dispatch: null,
  };
  const [movie, setMovie] = useState<movieDraft>({
    ageRate: "",
    title: "",
    genre: "",
    description: "",
    imgUrl: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const field = name as "title" | "description";
    setMovie((prevMovie) => ({
      ...prevMovie,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!movie.title.trim()) {
      return;
    }
    dispatch?.({
      type: "ADD_MOVIE",
      payload: {
        ...movie,
        id: "",
        ageRate: movie.ageRate.trim(),
        title: movie.title.trim(),
        genre: movie.genre.trim(),
      },
    });
    setMovie({
      ageRate: "",
      title: "",
      genre: "",
      description: "",
      imgUrl: "",
    });
  };
  return (
    <div className="movie-input mb-4 flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            className="border rounded bg-accent "
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
            className="border rounded bg-accent "
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
            className="border rounded bg-accent "
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            placeholder="Genre"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            className="border rounded bg-accent "
            type="text"
            name="description"
            value={movie.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
        <div>
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            className="border rounded bg-accent "
            type="text"
            name="imgUrl"
            value={movie.imgUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieInput;
