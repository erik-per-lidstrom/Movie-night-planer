import React from "react";
import type { MovieProps } from "../types";
import { Link } from "react-router-dom";

const MovieItem: React.FC<MovieProps> = ({ movie }) => {
  return (
    <div key={movie.id}>
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <Link to={`/${movie.id}`}>View Details</Link>
      <p>Age Rate: {movie.ageRate}</p>
      <p>Genre: {movie.genre}</p>
    </div>
  );
};

export default MovieItem;
