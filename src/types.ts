export type Movie = {
  id: number;
  ageRate: string;
  title: string;
  genre: string;
};

export type Action =
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "REMOVE_MOVIE"; payload: string };
