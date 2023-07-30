import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { SimilarMovies } from "./similar-movies";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  const [isFavoriteMovie, setAsFavorite] = useState(
    user.FavoriteMovies.includes(movieId)
  );

  useEffect(() => {
    setAsFavorite(user.FavoriteMovies.includes(movieId));
    window.scrollTo(0, 0);
  }, [movieId]);

  const addFavorite = () => {
    fetch(
      `https://filmsonthefly-app-ca635d09fe99.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert(`"${movie.Title}" was successfully added to favorites`);
          setAsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavorite = () => {
    fetch(
      `https://filmsonthefly-app-ca635d09fe99.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert(`"${movie.Title}" was successfully deleted from favorites`);
          setAsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Col className="mb-4">
        <div className="movie-card-data">
          <img className="w-75 border-secondary mb-3" src={movie.imagePath} />
        </div>
        <div>
          <span className="fw-bold">Title: </span>
          <span className="moviefont">{movie.Title}</span>
        </div>
        <div>
          <span className="fw-bold">Genre: </span>
          <span className="moviefont">{movie.Genres}</span>
        </div>
        <div>
          <span className="fw-bold">Director: </span>
          <span className="moviefont">{movie.director}</span>
        </div>
        <div className="moviefont">
          <span className="fw-bold">Description: </span>
          <span>{movie.Description}</span>
        </div>
        <br></br>
        <Link to={`/`}>
          <Button variant="dark">Back</Button>
        </Link>
        {isFavoriteMovie ? (
          <Button variant="danger" className="ms-2" onClick={removeFavorite}>
            Remove from favorites
          </Button>
        ) : (
          <Button variant="success" className="ms-2" onClick={addFavorite}>
            Add to favorites
          </Button>
        )}
      </Col>
      <Container>
        <SimilarMovies movies={movies} movie={movie} />
      </Container>
    </>
  );
};
