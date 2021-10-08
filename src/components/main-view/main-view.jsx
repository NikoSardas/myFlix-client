// TODO director/genre/movie view errors when refreshing pages (with or without propTypes)
// TODO search bar centers on empty query
// TODO eslint errors

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import PropTypes from 'prop-types';
import MoviesList from '../movies-list/movies-list';
import ProfileView from '../profile-view/profile-view';
import LoginView from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import NavView from '../nav-view/nav-view';

import {
  setMovies,
  setUsername,
  setUserPassword,
  setUserEmail,
  setUserBirthday,
  setUserFavorites,
} from '../../actions/actions';

import './main-view.scss';

const API_ADDRESS = 'https://nikosardas-myflixdb.herokuapp.com';

class MainView extends React.Component {
  componentDidMount() {
    const username = localStorage.getItem('username');
    if (username === null) {
      this.setStoredUserDetails({
        Birthday: '',
        Email: '',
        Username: '',
        Password: '',
        FavoriteMovies: [],
      });
    } else {
      const token = localStorage.getItem('token');
      this.getUser(username, token);
      this.getMovies(token);
    }
  }

  onLoggedIn(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', authData.user.Username);
    this.setStoredUserDetails(authData.user);
    this.getMovies(authData.token);
    console.log(this.props);
  }

  // eslint-disable-next-line class-methods-use-this
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.open('/', '_self');
  }

  setStoredUserDetails(userData) {
    this.props.setUserBirthday(userData.Birthday);
    this.props.setUserEmail(userData.Email);
    this.props.setUserPassword(userData.Password);
    this.props.setUsername(userData.Username);
    this.props.setUserFavorites(userData.FavoriteMovies);
  }

  getMovies(token) {
    axios
      .get(`${API_ADDRESS}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          this.props.setMovies(response.data);
        } else {
          console.log('Error retrieving movies');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUser(username, token) {
    axios
      .get(`${API_ADDRESS}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setStoredUserDetails(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { movies, userName } = this.props;
    return (
      <Router>
        <Row className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!userName) {
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
                  <MoviesList movies={movies} />
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
                  onBackClick={() => {
                    history.goBack();
                  }}
                />
              </Col>
            )}
          />
          <Route
            exact
            path="/users/:username"
            render={({ history }) => {
              if (!userName) {
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
                    onBackClick={() => {
                      history.goBack();
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
                    (m) => m.Director.Name === match.params.name,
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
                    (m) => m.Genre.Name === match.params.name,
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
  const {
    movies, userName, userPassword, userEmail, userBirthday, userFavorites,
  } = state;
  return {
    movies, userName, userPassword, userEmail, userBirthday, userFavorites,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUsername,
  setUserPassword,
  setUserEmail,
  setUserBirthday,
  setUserFavorites,
})(MainView);

MainView.propTypes = {
  movies: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  setUsername: PropTypes.func.isRequired,
  setUserPassword: PropTypes.func.isRequired,
  setUserEmail: PropTypes.func.isRequired,
  setUserBirthday: PropTypes.func.isRequired,
  setUserFavorites: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};
