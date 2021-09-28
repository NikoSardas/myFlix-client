import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export function MovieCard(props) {
  showMovieDetails = () => {
    console.log(props);
    window.open(`/movies/${movie._id}`, `_self`);
  };

  const { movie } = props;
  return (
    <Card onClick={() => {
      showMovieDetails();
    }}className="movie-card" border="light" bg="dark">
      <Card.Img draggable="false" variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <div className="card-links">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="outline-light">{movie.Director.Name}</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="outline-light">{movie.Genre.Name}</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
