import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export function GenreView(props) {
  const { genre, movies, onBackClick } = props;
  return (
    <div className="genre-view-wrapper">
      <Card border="light" bg="dark" text="white">
        <Card.Body>
          <Button
            className="genre-exit"
            onClick={onBackClick}
            variant="warning shadow-none"
          >
            Back
          </Button>
          <Link to="/" className="genre-back">
            <Button variant="outline-light">Exit</Button>
          </Link>
          <Card.Title className="text-center">{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
          <div className="genre-movie-list">
            {movies.length === 0 ? (
              <div>No Other Movies</div>
            ) : (
              movies.map((movie) => {
                if (movie.Genre.Name === genre.Name)
                  return (
                    <Link
                      key={movie._id}
                      className="genre-link"
                      to={`/movies/${movie._id}`}
                    >
                      <Button
                        className="genre-movie-item"
                        variant="outline-light shadow-none"
                      >
                        {movie.Title}
                      </Button>
                    </Link>
                  );
              })
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
