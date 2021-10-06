import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card className="movie-card" border="light" bg="dark">
        <Card.Img draggable="false" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <div className="card-links">
            <Link to={`/movies/${movie._id}`}>
              <Button onClick={() => movie} variant="outline-light shadow-none">
                Open
              </Button>
            </Link>
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
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
