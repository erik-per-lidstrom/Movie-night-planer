import type { Movie } from "../types";

export const movies: Movie[] = [
  {
    id: "1",
    ageRate: "PG-13",
    title: "Inception",
    genre: "Science Fiction",
    description: "A mind-bending thriller about dream invasion.",
  },

  {
    id: "2",
    title: "Non Stop",
    ageRate: "PG-13",
    genre: "Crime",
    description: "An action-packed thriller set on a transatlantic flight.",
  },
  {
    id: "3",
    title: "Pulp Fiction",
    ageRate: "PG-18",
    genre: "Crime",
    description: "A dark comedy crime film with intertwining stories.",
  },
  {
    id: "4",
    title: "Five nights at Freddy's Movie",
    ageRate: "PG-18",
    genre: "Horror",
    description: "A horror film based on the popular video game series.",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-a1gxxE4wYH8e38X6pbh6BUiWBHbDqFmy_VkVWXM2S69Gl2kJZPSXuYcbTUq1tCIU-TSabg&s",
  },

  {
    id: "5",
    title: "IT",
    ageRate: "PG-18",
    genre: "Horror",
    description:
      "A horror film about a shape-shifting clown terrorizing a town.",
  },

  {
    id: "6",
    title: "Interstellar",
    ageRate: "PG-13",
    genre: "Science Fiction",
    description: "A sci-fi epic about space exploration and time dilation.",
  },
];
