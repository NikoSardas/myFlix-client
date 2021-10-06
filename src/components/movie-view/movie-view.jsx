import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
    };
  }
  async checkIfFavorite() {
    const favs = await axios.get(
      `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
        "username"
      )}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (favs) {
      console.log(favs);
      favs.data.FavoriteMovies.map((favMovie) => {
        if (favMovie.Title === this.props.movie.Title) {
          this.setState({
            isFavorite: true,
          });
        }
      });
    } else {
      console.log("error retrieving favorites");
    }
  }
  addToFavorites(movie) {
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
        this.setState({
          isFavorite: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  removeFromFavorites(movie) {
    axios
      .delete(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}/FavoriteMovies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        this.setState({
          isFavorite: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    this.checkIfFavorite();
  }
  render() {
    const { movie, onBackClick } = this.props;
    const { isFavorite } = this.state;
    return (
      <Card border="light" bg="dark" text="white">
        <Card.Img draggable="false" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="text-center">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            variant="outline-light shadow-none"
            onClick={() => {
              isFavorite
                ? this.removeFromFavorites(movie)
                : this.addToFavorites(movie);
            }}
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </Button>
          <Button
            className="movie-view-back"
            variant="outline-warning shadow-none"
            onClick={onBackClick}
          >
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
