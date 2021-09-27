import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";

import { Button, Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Navbar } from "react-bootstrap";

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
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        loggedUsername: localStorage.getItem("username"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  getMovies(token) {
    axios
      .get("https://nikosardas-myflixdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      loggedUsername: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("username", authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.setState({
      loggedUsername: null,
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
      <Router>
        <Navbar className="nav-bar" variant="dark">
          <Navbar.Brand>myFlix</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="">
            <Navbar.Text>
              <span className="signed-in-name">
                Signed in as: {localStorage.getItem("username")}
              </span>
            </Navbar.Text>
            <Navbar.Text className="logout-button">
              <Button
                variant="outline-light"
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
                Sign Out
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Row className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              return movies.map((m) => (
                <Col md={4} key={m._id} className="card-wrapper">
                  <MovieCard movie={m}  />
                </Col>
              ));
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <Col md={8} className="movie-view-wrapper">
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.back()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} className="director-view-wrapper">
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.back()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} className="genre-view-wrapper">
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.back()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
