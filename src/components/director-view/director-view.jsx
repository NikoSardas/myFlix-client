/* eslint-disable no-underscore-dangle */

import React from 'react';

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './director-view.scss';

export default function DirectorView(props) {
  const { director, movies, onBackClick } = props;
  return (
    <div className="director-view-wrapper">
      <Card>
        <Card.Body>
          <Button
            className="director-exit"
            onClick={onBackClick}
            variant="outline-light shadow-none"
          >
            Back
          </Button>
          <Link to="/" className="director-back">
            <Button variant="outline-light">Exit</Button>
          </Link>
          <Card.Title className="text-center">{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <div className="director-movie-list">
            {movies.length === 0 ? (
              <div>No Other Movies</div>
            ) : (
              movies.map((movie) => (
                <Link
                  key={movie._id}
                  className="director-link"
                  to={`/movies/${movie._id}`}
                >
                  <Button
                    className="director-movie-item"
                    variant="outline-warning shadow-none"
                  >
                    {movie.Title}
                  </Button>
                </Link>
              ))
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
