/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  setUserFavorites,
} from '../../actions/actions';

import './movie-card.scss';

const API_ADDRESS = 'https://nikosardas-myflixdb.herokuapp.com';
class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.checkIfFavorite();
  }

  removeFromFavorites(movie) {
    const { userName } = this.props;
    axios
      .delete(
        `${API_ADDRESS}/users/${userName}/FavoriteMovies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then(() => {
        this.setState({
          isFavorite: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToFavorites(movie) {
    const { userName } = this.props;

    axios
      .post(
        `${API_ADDRESS}/users/${userName}/FavoriteMovies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then(() => {
        this.setState({
          isFavorite: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkIfFavorite() {
    const { userFavorites } = this.props;
    const { movie } = this.props;
    const { _id } = movie;

    if (userFavorites.length > 0) {
      this.setState({
        isFavorite: userFavorites.map((favMovie) => favMovie._id === _id),
      });
    } else {
      console.log('User has no favorite movies');
    }
  }

  render() {
    const { isFavorite } = this.state;
    const { movie } = this.props;
    return (
      <Card className="movie-card" border="light" bg="dark">
        <Link to={`/movies/${movie._id}`}>
          <Card.Img
            className="card-movie-image"
            onClick={() => movie}
            draggable="false"
            variant="top"
            src={movie.ImagePath}
          />
        </Link>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Body>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            variant="outline-light shadow-none"
            onClick={() => {
              if (isFavorite) {
                this.removeFromFavorites(movie);
              } else {
                this.addToFavorites(movie);
              }
            }}
          >
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  userFavorites: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { userFavorites, userName } = state;
  return { userFavorites, userName };
};

export default connect(mapStateToProps, {
  setUserFavorites,
})(MovieCard);
