import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "The Thing",
      Description:
        "A group of research scientists stationed in Antarctica face off against a shape-shifting terror. ",
      Genre: "Horror",
      Director: "John Carpenter",
      ImageURL:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tzGY49kseSE9QAKk47uuDGwnSCu.jpg",
      Year: "1982",
    },
    {
      id: 2,
      Title: "Aliens",
      Description:
        "Ellen Ripley returns to the same planet after fifty years of cryo-sleep to investigate another distress call.",
      Genre: "Science-Fiction",
      Director: "James Cameron",
      ImageURL:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg",
      Year: "1986",
    },
    {
      id: 3,
      Title: "Ghostbusters",
      Description:
        "A team of scientists opens an inter-dimensional portal that unleashes the undead onto New York City",
      Genre: "Adventure",
      Director: "Ivan Reitman",
      ImageURL:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7E8nLijS9AwwUEPu2oFYOVKhdFA.jpg",
      Year: "1984",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
