import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export function MovieView(props) {
  const { movie, onBackClick } = props;
  return (
    <div className="movie-view-wrapper">
      <Card border="light" bg="dark" text="white">
        <Button
          className="movie-view-exit"
          onClick={onBackClick}
          variant="warning shadow-none"
        >
          Back
        </Button>
        <Link to="/" className="movie-view-back">
          <Button variant="outline-light">Exit</Button>
        </Link>
        <Card.Img draggable="false" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="text-center">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <div className="card-links">
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="outline-light shadow-none">
                {movie.Director.Name}
              </Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="outline-light shadow-none">
                {movie.Genre.Name}
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
