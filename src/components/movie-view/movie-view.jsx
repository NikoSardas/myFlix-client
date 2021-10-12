import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export default function MovieView(props) {
  console.log(this.props);
  const { movie, onBackClick } = props;
  return (
    <div className="movie-view-wrapper">
      <Card>
        <Card.Body>
          <Card.Img
            draggable="false"
            variant="top"
            src={`/movie_img/${movie.Title}.jpg`}
          />
          <Button
            className="movie-view-exit"
            onClick={onBackClick}
            variant="outline-light shadow-none"
          >
            Back
          </Button>
          <Link to="/" className="movie-view-back">
            <Button variant="outline-light">Exit</Button>
          </Link>
          <Card.Title className="text-center">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <div className="card-links">
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="outline-warning shadow-none">
                {movie.Director.Name}
              </Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="outline-warning shadow-none">
                {movie.Genre.Name}
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
