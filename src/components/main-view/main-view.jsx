import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      authenticatedUser: null,
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

  onLoggedIn(authenticatedUser) {
    this.setState({
      authenticatedUser,
    });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { movies, selectedMovie, authenticatedUser, register } = this.state;
    if (!authenticatedUser) {
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
            onLoggedIn={(authenticatedUser) =>
              this.onLoggedIn(authenticatedUser)
            }
          />
        );
      }
    }
    if (movies.length === 0) return <div className="main-view" />;
    return (
      <Row className="main-view">
        {selectedMovie ? (
          <Col md={8}>
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
