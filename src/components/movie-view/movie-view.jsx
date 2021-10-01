//TODO errors when refreshing page

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import "./movie-view.scss";

export class MovieView extends React.Component {
  addToFavorites = (movie) => {
    axios
      .post(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}/FavoriteMovies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        alert(`${movie.Title} Added to Favorites List!`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Card border="light" bg="dark" text="white">
        <Card.Img draggable="false" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            variant="outline-light"
            onClick={() => {
              this.addToFavorites(movie);
            }}
          >
            Add to favorites
          </Button>
          <Button variant="outline-light" onClick={onBackClick}>
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
