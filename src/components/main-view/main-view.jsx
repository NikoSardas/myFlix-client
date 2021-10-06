//TODO errors when refreshing director/genre/movie pages

import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import  MoviesList  from "../movies-list/movies-list";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { NavView } from "../nav-view/nav-view";
import { ProfileView } from "../profile-view/profile-view";

import { connect } from "react-redux";
import { setMovies } from "../../actions/actions";

import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedUsername: null,
    };
  }

  //gets movies from server and sets them as a prop
  getMovies(token) {
    axios
      .get("https://nikosardas-myflixdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // set logged state and localstorage, then send token to getMovies
  onLoggedIn(authData) {
    this.setState({
      loggedUsername: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("username", authData.user.Username);
    this.getMovies(authData.token);
  }

  //clear localstorage and user state then reopen root window
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.setState({
      loggedUsername: null,
    });
    window.open("/", "_self");
  }

  // set user params from localstorage then send token to getMovies
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        loggedUsername: localStorage.getItem("username"),
      });
      this.getMovies(accessToken);
    }
  }

  render() {
    const { loggedUsername } = this.state;
    const { movies } = this.props;

    return (
      <Router>
        <Row className="main-view">
          <Route
            path="/"
            exact
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
              return (
                <>
                  <NavView
                    className="navigation"
                    onLoggedOut={() => {
                      this.onLoggedOut();
                    }}
                  />
                  <MoviesList movies={movies} />
                </>
              );
            }}
          />
          <Route
            exact
            path="/register"
            render={({ history }) => {
              if (loggedUsername) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView
                    onBackClick={() => {
                      history.goBack();
                    }}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
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
                  <ProfileView onLoggedOut={this.onLoggedOut} />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match, history }) => {
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
                    onBackClick={() => {
                      history.goBack();
                    }}
                    movie={movies.find((m) => m._id === match.params.movieId)}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/directors/:name"
            render={({ match, history }) => {
              if (!loggedUsername)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              return (
                <Col className="director-view-wrapper">
                  <DirectorView
                    onBackClick={() => {
                      history.goBack();
                    }}
                    movies={movies}
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
            exact
            path="/genres/:name"
            render={({ match, history }) => {
              if (!loggedUsername)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              return (
                <Col className="genre-view-wrapper">
                  <GenreView
                    onBackClick={() => {
                      history.goBack();
                    }}
                    movies={movies}
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

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
