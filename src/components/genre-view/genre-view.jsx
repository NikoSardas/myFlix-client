/* eslint-disable no-underscore-dangle */

import React from 'react';

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './genre-view.scss';

export default function GenreView(props) {
  const { genre, movies, onBackClick } = props;
  return (
    <div className="genre-view-wrapper">
      <Card>
        <Card.Body>
          <Button
            className="genre-exit"
            onClick={onBackClick}
            variant="outline-light shadow-none"
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
                if (movie.Genre.Name === genre.Name) {
                  return (
                    <Link
                      key={movie._id}
                      className="genre-link"
                      to={`/movies/${movie._id}`}
                    >
                      <Button
                        className="genre-movie-item"
                        variant="outline-warning shadow-none"
                      >
                        {movie.Title}
                      </Button>
                    </Link>
                  );
                }
                return true;
              })
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
