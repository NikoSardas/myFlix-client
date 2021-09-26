import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Card className="movie-card" border="light" bg="dark" text="white">
        {/* <Card.Img variant="top" src={movie.ImagePath} /> */}
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="outline-light">
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    // ImagePath: PropTypes.string.isRequired
    ImagePath: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
