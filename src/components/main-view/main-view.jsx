import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  //fetch for movies data from backend API
  fetch("https://filmsonthefly-app-ca635d09fe99.herokuapp.com/movies");
};

const moviesFromApi = data.map((movie) => {
  return {
    _id: movie._id,
    Title: movie.Title,
    ImagePath: movie.ImagePath,
    Description: movie.Description,
    MovieEmbed: movie.Movie_Embed,
    Actors: movie.Actors,
    ReleaseDate: movie.Release_Date,
    MovieLength: movie.Movie_Length,
    MovieWatch: movie.Movie_Watch,
    Rating: movie.Rating,
    Writers: movie.Writers,
    Genres: movie.Genres,

    Genre: {
      Name: movie.Genre.Name,
    },
    Director: {
      Name: movie.Director.Name,
    },
    Featured: movie.Featured,
  };
});
setMovies(moviesFromApi);

// {
//   id: 1,
//   Title: "The Thing",
//   Description:
//     "A group of research scientists stationed in Antarctica face off against a shape-shifting terror. ",
//   Genre: "Horror",
//   Director: "John Carpenter",
//   ImageURL:
//     "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tzGY49kseSE9QAKk47uuDGwnSCu.jpg",
//   Year: "1982",
// },
// {
//   id: 2,
//   Title: "Aliens",
//   Description:
//     "Ellen Ripley returns to the same planet after fifty years of cryo-sleep to investigate another distress call.",
//   Genre: "Science-Fiction",
//   Director: "James Cameron",
//   ImageURL:
//     "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg",
//   Year: "1986",
// },
// {
//   id: 3,
//   Title: "Ghostbusters",
//   Description:
//     "A team of scientists opens an inter-dimensional portal that unleashes the undead onto New York City",
//   Genre: "Adventure",
//   Director: "Ivan Reitman",
//   ImageURL:
//     "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7E8nLijS9AwwUEPu2oFYOVKhdFA.jpg",
//   Year: "1984",
// },

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
