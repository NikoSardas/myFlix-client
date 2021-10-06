import React from "react";
import PropTypes from "prop-types";

import { Button, Card, Link } from "react-bootstrap";

import "./director-view.scss";
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { director, movies, onBackClick } = this.props;
    return (
      <div className="director-view-wrapper">
        <Card border="light" bg="dark" text="white">
          <Card.Body>
            <Button
              className="directors-back"
              variant="warning shadow-none"
              onClick={onBackClick}
            >
              Back
            </Button>
            <Card.Title className="text-center">{director.Name}</Card.Title>
            <Card.Text>{director.Bio}</Card.Text>
            <div className="directors-movie-list">
              {movies.length === 0 ? (
                <div>No Other Movies</div>
              ) : (
                movies.map((movie) => {
                  if (movie.Director.Name === director.Name)
                    return (
                      <Link
                        key={movie._id}
                        className="director-link"
                        to={`/movies/${movie._id}`}
                      >
                        <Button
                          className="director-movie-item"
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
