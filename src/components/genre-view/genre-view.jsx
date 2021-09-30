import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, movies } = this.props;
    return (
      <div className="genre-view-wrapper">
        <Card border="light" bg="dark" text="white">
          <Card.Body>
            <Card.Title className="text-center">{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
            <h5 className="text-center text-warning movies-header ">
              Movie List
            </h5>
            {movies.length === 0 ? (
              <div>No Other Movies</div>
            ) : (
              movies.map((movie) => {
                if (movie.Genre.Name === genre.Name)
                  return (
                    <Button
                      className="genre-movie-item"
                      variant="outline-light"
                      key={movie._id}
                      onClick={() => {
                        // how to send movie param to :
                        // window.open(`/movies/${movie._id}`, '_self');
                      }}
                    >
                      {movie.Title}
                    </Button>
                  );
              })
            )}
            <Button
              className="genres-back text-warning"
              variant="outline-light"
              onClick={() => {
                history.back();
              }}
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
};
