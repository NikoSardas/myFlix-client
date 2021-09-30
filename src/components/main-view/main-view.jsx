//TODO Unchecked runtime.lastError: The message port closed before a response was received

import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { NavView } from "../nav-view/nav-view";
import { ProfileView } from "../profile-view/profile-view";

import "./main-view.scss";
import { ProfileView } from "../profile-view/profile-view";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      loggedUsername: null,
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
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    this.setState({
      loggedUsername: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("username", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.setState({
      loggedUsername: null,
    });
  }

  render() {
    const { movies, loggedUsername } = this.state;
    return (
      <Router>
        <NavView
          onLoggedOut={() => {
            this.onLoggedOut();
          }}
        />

        <Row className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!loggedUsername)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map((m) => (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  key={m._id}
                  className="card-wrapper"
                >
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/register"
            exact
            render={() => {
              if (loggedUsername) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path="/users/:username"
            render={() => {
              if (!loggedUsername)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              return (
                <Col>
                  <ProfileView />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            exact
            render={({ match }) => {
              if (!loggedUsername)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              return (
                <Col md={8} className="movie-view-wrapper">
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            exact
            render={({ match }) => {
              if (!loggedUsername)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              return (
                <Col md={8} className="director-view-wrapper">
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            exact
            render={({ match }) => {
              if (!loggedUsername)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              return (
                <Col md={8} className="genre-view-wrapper">
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
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
