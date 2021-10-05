//TODO link to movies

import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, movies, onBackClick, gotoMovie } = this.props;
    return (
      <div className="genre-view-wrapper">
        <Card border="light" bg="dark" text="white">
          <Card.Body>
            <Card.Title className="text-center">{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
            {movies.length === 0 ? (
              <div>No Other Movies</div>
            ) : (
              movies.map((movie) => {
                if (movie.Genre.Name === genre.Name)
                  return (
                    <Button
                      onClick={() => {
                        gotoMovie(movie._id);
                      }}
                      className="genre-movie-item"
                      variant="outline-light shadow-none"
                      key={movie._id}
                    >
                      {movie.Title}
                    </Button>
                  );
              })
            )}
            <Button
              className="genres-back shadow-none"
              variant="outline-warning"
              onClick={onBackClick}
            >
              Back
            </Button>
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
  gotoMovie: PropTypes.func.isRequired,
};
