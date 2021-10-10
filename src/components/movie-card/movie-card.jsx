/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

// const config = require('../../config');

export default class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: null,
    };
  }

  componentDidMount() {
    const { movie, user } = this.props;
    this.checkIfFavorite(movie, user.FavoriteMovies);
  }

  checkIfFavorite(movie, userFavs) {
    const movieID = movie._id;
    const isFavorite = (userFavs.find((m) => movieID === m._id) !== undefined);
    this.setState({
      isFavorite,
    });
  }

  render() {
    const { isFavorite } = this.state;
    const { movie, removeFromFavorites, addToFavorites } = this.props;
    return (
      <Card className="movie-card">
        <Card.Body>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img
              className="card-movie-image"
              onClick={() => movie}
              draggable="false"
              variant="top"
              src={movie.ImagePath}
              alt={movie.Title}
            />
          </Link>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            variant="outline-light shadow-none"
            onClick={() => {
              if (isFavorite) {
                removeFromFavorites(movie);
                this.setState({
                  isFavorite: false,
                });
              } else {
                addToFavorites(movie);
                this.setState({
                  isFavorite: true,
                });
              }
            }}
          >
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            {/* {isFavorite ? 'Remove from favorites' : 'Add to favorites'} */}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  // user: PropTypes.shape({}).isRequired,
  // user: PropTypes.string.isRequired,
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};
