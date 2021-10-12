/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import MoviesList from "../movies-list/movies-list";
import ProfileView from "../profile-view/profile-view";
import LoginView from "../login-view/login-view";
import MovieView from "../movie-view/movie-view";
import RegistrationView from "../registration-view/registration-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import NavView from "../nav-view/nav-view";

import { setMovies, setUser } from "../../actions/actions";

import "./main-view.scss";

const config = require("../../config");

class MainView extends React.Component {
  componentDidMount() {
    const username = localStorage.getItem("username");
    if (!username) {
      this.emptyUser();
    } else {
      const token = localStorage.getItem("token");
      this.getMovies(token);
      this.getUser(username, token);
    }
  }

  // store user details, save user details to prop store, get movies from API
  onLoggedIn(authData) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("username", authData.user.Username);
    this.props.setUser(authData.user);
    this.getMovies(authData.token);
  }

  // remove user details from storage, empty user details from prop store, open new window
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.emptyUser();
  }

  // get movies from API and save to prop store
  getMovies(token) {
    axios
      .get(`${config.API_ADDRESS}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          this.props.setMovies(response.data);
        } else {
          console.log("Error retrieving movies");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // get user details from API and save to prop store
  getUser(username, token) {
    axios
      .get(`${config.API_ADDRESS}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
        // return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // send empty user details to prop store
  emptyUser() {
    this.props.setUser({
      Birthday: "",
      Email: "",
      Username: "",
      Password: "",
      FavoriteMovies: [],
    });
  }

  render() {
    const { movies } = this.props;
    if (localStorage.getItem("username") && movies.length === 0)
      return (
        <img
          className="loading-spinner"
          src="/loading-buffering.gif"
          alt="Loading.."
        ></img>
      );
    return (
      <Router>
        <Row className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!localStorage.getItem("username")) {
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              }
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <>
                  <NavView
                    className="navigation"
                    onLoggedOut={() => {
                      this.onLoggedOut();
                    }}
                  />
                  <MoviesList
                    getUser={() => {
                      this.getUser(
                        localStorage.getItem("username"),
                        localStorage.getItem("token")
                      );
                    }}
                  />
                </>
              );
            }}
          />
          <Route
            exact
            path="/register"
            render={({ history }) => (
              <Col>
                <RegistrationView
                  goToMainView={() => {
                    history.push("/");
                  }}
                />
              </Col>
            )}
          />
          <Route
            exact
            path="/users/:username"
            render={({history}) => {
              if (!localStorage.getItem("username")) {
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              }
              return (
                <Col>
                  <ProfileView
                    getUser={() => {
                      this.getUser(
                        localStorage.getItem("username"),
                        localStorage.getItem("token")
                      );
                    }}
                    reloadScreen={() => {
                      history.push(`/users/${localStorage.getItem('username')}`);
                    }}
                    onLoggedOut={() => {
                      this.onLoggedOut();
                    }}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match, history }) => (
              <Col md={8} className="movie-view-wrapper">
                <MovieView
                  onBackClick={() => {
                    history.goBack();
                  }}
                  // eslint-disable-next-line no-underscore-dangle
                  movie={movies.find((m) => m._id === match.params.movieId)}
                />
              </Col>
            )}
          />
          <Route
            exact
            path="/directors/:name"
            render={({ match, history }) => (
              <Col className="director-view-wrapper">
                <DirectorView
                  onBackClick={() => {
                    history.goBack();
                  }}
                  movies={movies.filter(
                    (m) => m.Director.Name === match.params.name
                  )}
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              </Col>
            )}
          />
          <Route
            exact
            path="/genres/:name"
            render={({ match, history }) => (
              <Col className="genre-view-wrapper">
                <GenreView
                  onBackClick={() => {
                    history.goBack();
                  }}
                  movies={movies.filter(
                    (m) => m.Genre.Name === match.params.name
                  )}
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                />
              </Col>
            )}
          />
        </Row>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { movies, user } = state;
  return {
    movies,
    user,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUser,
})(MainView);
