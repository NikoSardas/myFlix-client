import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import "./main-view.scss";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      loggedUsername: null,
      register: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://nikosardas-myflixdb.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(loggedUsername) {
    this.setState({
      loggedUsername,
    });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { movies, selectedMovie, loggedUsername, register } = this.state;
    if (!loggedUsername) {
      if (register) {
        return (
          <RegistrationView
            onBackClick={(registrationState) => {
              this.onRegistration(registrationState);
            }}
            onRegistration={(register) => this.onRegistration(register)}
          />
        );
      } else {
        return (
          <LoginView
            goToRegistration={(register) => this.onRegistration(register)}
            onLoggedIn={(loggedUsername) => this.onLoggedIn(loggedUsername)}
          />
        );
      }
    }
    if (movies.length === 0) return <div className="main-view" />;
    return (
      <Row className="main-view">
        {selectedMovie ? (
          <Col className="movie-view-wrapper" md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col className="card-wrapper" md={3} key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              ></MovieCard>
            </Col>
          ))
        )}
      </Row>
    );
  }
}
