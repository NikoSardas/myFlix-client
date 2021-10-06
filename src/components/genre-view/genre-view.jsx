import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, movies, onBackClick } = this.props;
    return (
      <div className="genre-view-wrapper">
        <Card border="light" bg="dark" text="white">
          <Card.Body>
            <Button
              className="genres-back"
              variant="warning shadow-none"
              onClick={onBackClick}
            >
              Back
            </Button>
            <Card.Title className="text-center">{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
            <div className="genres-movie-list">
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
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
