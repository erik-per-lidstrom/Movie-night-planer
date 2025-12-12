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
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Movie Title"
        />
        <label htmlFor="ageRate">Age Rate</label>
        <input
          type="text"
          name="ageRate"
          value={movie.ageRate}
          onChange={handleChange}
          placeholder="Age Rate"
        />
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          placeholder="Genre"
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieInput;
