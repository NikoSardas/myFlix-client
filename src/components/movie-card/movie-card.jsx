import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  setUserFavorites,
} from '../../actions/actions';

import './movie-card.scss';

class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: null,
    };
  }

  componentDidMount() {
    this.checkIfFavorite();
  }

  checkIfFavorite() {
    if (this.props.userFavorites.length > 0) {
      this.props.userFavorites.map((favMovieId) => {
        if (favMovieId === this.props.movie._id) {
          this.setState({
            isFavorite: true,
          });
        }
      });
    }
  }

  render() {
    const { isFavorite } = this.state;
    const { movie, removeFromFavorites, addToFavorites } = this.props;
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
  // userFavorites: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  // userFavorites: PropTypes.array.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { userFavorites, userName } = state;
  return { userFavorites, userName };
};

export default connect(mapStateToProps, {
  setUserFavorites,
})(MovieCard);
