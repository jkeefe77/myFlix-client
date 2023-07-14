import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  console.log("movie ", movie);
  return (
    <Link className="text-decoration-none" to={"/movies/$(movieId)}"}>
      <h1>{movie.Title}</h1>
      <Card className="h-100" border="light">
        <Card.Img variant="top" src={movie.imagePath} className="border" />
        <Card.Body className="text-center">
          <Card.Title className="fw-bold">{movie.title}</Card.Title>
          <Card.Text className="fs-6">{movie.Genres}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
