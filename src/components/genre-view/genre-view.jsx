//TODO link to movies
//TODO errors when refreshing page

import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import "./genre-view.scss";
export class GenreView extends React.Component {
  render() {
    const { genre, movies, onBackClick } = this.props;
    return (
      <div className="genre-view-wrapper">
        <Card border="light" bg="dark" text="white">
          <Card.Body>
            <Card.Title className="text-center">{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
            <Card.Title className="text-center text-warning movies-header ">
              Movie List
            </Card.Title>
            {movies.length === 0 ? (
              <div>No Movies</div>
            ) : (
              movies.map((movie) => {
                if (movie.Genre.Name === genre.Name)
                  return (
                    <Button
                      className="genre-movie-item"
                      variant="outline-light"
                      key={movie._id}
                    >
                      {movie.Title}
                    </Button>
                  );
              })
            )}
            <Button
              onClick={onBackClick}
              className="genres-back text-warning"
              variant="outline-light"
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
};
