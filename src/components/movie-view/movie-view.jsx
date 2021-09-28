import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import "./movie-view.scss";

export function MovieView(props) {
  console.log("movieview props", props);
  const { movie, onBackClick } = props;

  removeFromFavorites = () => {
    axios
      .delete(
        `https:nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}/FavoriteMovies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        alert(`${movie.Title} Removed from Favorites List!`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addToFavorites = () => {
    axios
      .post(
        `https:nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}/FavoriteMovies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        alert(`${movie.Title} Added to Favorites List!`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Card border="light" bg="dark" text="white">
      <Card.Img draggable="false" variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        {/* how to create an interactive button? */}
        <Button
          variant="outline-light"
          onClick={() => {
            addToFavorites();
          }}
        >
          Add to favorites
        </Button>
        <Button
          variant="outline-light"
          onClick={() => {
            removeFromFavorites();
          }}
        >
          Remove from favorites
        </Button>
        <Button variant="outline-light" onClick={onBackClick}>
          Back
        </Button>
      </Card.Body>
    </Card>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
