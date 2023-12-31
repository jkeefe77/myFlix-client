import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";

export const FavoriteMovies = ({ movies, user }) => {
  let favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  return (
    <>
      <h3 className="mt-4 pt-4 mb-3 text-light">Your favorite movies:</h3>
      <Row className="favorite-movies-row">
        {favoriteMovies.map((movie) => (
          <Col
            className="mb-4 mx-auto"
            key={movie.id}
            xxl={3}
            xl={4}
            lg={4}
            md={6}
            xs={12}
          >
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};
