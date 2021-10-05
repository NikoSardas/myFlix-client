//TODO link to movies

import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, movies, onBackClick, gotoMovie } = this.props;
    return (
      <div className="director-view-wrapper">
        <Card border="light" bg="dark" text="white">
          <Card.Body>
            <Card.Title className="text-center">{director.Name}</Card.Title>
            <Card.Text>{director.Bio}</Card.Text>
            {movies.length === 0 ? (
              <div>No Other Movies</div>
            ) : (
              movies.map((movie) => {
                if (movie.Director.Name === director.Name)
                  return (
                    <Button
                      onClick={() => {
                        gotoMovie(movie._id);
                      }}
                      className="director-movie-item"
                      variant="outline-light shadow-none"
                      key={movie._id}
                    >
                      {movie.Title}
                    </Button>
                  );
              })
            )}
            <Button
              className="directors-back"
              variant="outline-warning shadow-none"
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
  gotoMovie: PropTypes.func.isRequired,
};
