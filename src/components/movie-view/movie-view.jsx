import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Modal, Button, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { SimilarMovies } from "./similar-movies";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);
  const [isShaking] = useState(false);
  const [isFavoriteMovie, setAsFavorite] = useState(
    user.FavoriteMovies.includes(movieId)
  );

  useEffect(() => {
    setAsFavorite(user.FavoriteMovies.includes(movieId));
    window.scrollTo(0, 0);
  }, [movieId]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };
  const toggleRemoveModal = () => {
    setShowRemoveModal(!showRemoveModal);
  };

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
          toggleAddModal();
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
          toggleRemoveModal();
          setAsFavorite(false);
          updateUser(user);
          isShaking(true);
        }
      })
      .catch((e) => {
        console.error(e);
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

      <Modal
        show={showAddModal}
        onHide={toggleAddModal}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <div className="heart-animation">❤️</div>
          <p className="text-center custom-message">
            "{movie.Title}" was successfully added to favorites
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleAddModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRemoveModal}
        onHide={toggleRemoveModal}
        dialogClassName="custom-modal2"
      >
        <Modal.Body>
          <div className="trash-can-animation">🗑️</div>
          <p className="text-center-custom-message2">
            "{movie.Title}" was successfully deleted from favorites
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleRemoveModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
