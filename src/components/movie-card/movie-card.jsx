/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import React from "react";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export default class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: null,
    };
  }

  // getMovies(token) {
  //   axios
  //     .get(`${config.API_ADDRESS}/movies`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       if (response.data) {
  //         this.props.setMovies(response.data);
  //       } else {
  //         console.log('Error retrieving movies');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // // get user details from API and save to prop store
  // getUser(username, token) {
  //   axios
  //     .get(`${config.API_ADDRESS}/users/${username}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       this.props.setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  componentDidMount() {
    const { movie, user } = this.props;
    console.log(movie,user);
    user.FavoriteMovies.length > 0 &&
      this.checkIfFavorite(movie, user.FavoriteMovies);
  }

  checkIfFavorite(movie, userFavs) {
    if (userFavs) {
      const isFavorite =
        userFavs.find((m) => movie._id === m._id) !== undefined;
      this.setState({
        isFavorite,
      });
    }
  }

  render() {
    const { isFavorite } = this.state;
    const { movie, removeFromFavorites, addToFavorites } = this.props;
    return (
      <Card className="movie-card">
        <Card.Body>
          <div>
            <Link to={`/movies/${movie._id}`}>
              <Card.Img
                className="movie-card-image"
                onClick={() => movie}
                draggable="false"
                variant="top"
                src={`/movie_img/${movie.Title}.jpg`}
                alt={movie.Title}
              />
            </Link>
            <Card.Title>{movie.Title}</Card.Title>
          </div>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            className="favorite"
            variant="outline-secondary shadow-none"
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
            {isFavorite ? (
              <img
                className="favImage"
                src="favorite.svg"
                alt="Remove from favorites"
              />
            ) : (
              <img
                className="favImage"
                src="favorite_border.svg"
                alt="Add to favorites"
              />
            )}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
