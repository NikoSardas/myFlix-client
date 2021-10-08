// TODO errors/reset when refreshing director/genre/movie pages
// TODO search bar centers on empty query
// TODO eslint warnings
// TODO movie card fav is toggling after page load
// TODO refresh goes to login
// TODO props don't pass on pages refresh

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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

import { setMovies, setUser } from '../../actions/actions';

import './main-view.scss';

class MainView extends React.Component {
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (localStorage.getItem('username') === null) { setUser(''); }
    if (accessToken !== null) {
      console.log(this.props.user);
      this.props.setUser(this.props.user);
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', authData.user.Username);
    // const { setUser } = this.props;
    this.props.setUser(authData.user);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.open('/', '_self');
  }

  getMovies(token) {
    axios
      .get('https://nikosardas-myflixdb.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.props;
    return (
      <Router>
        <Row className="main-view">
          <Route
            path="/"
            exact
            render={() => {
              console.log(!user);
              if (!user) {
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
              if (!user) {
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
                    onLoggedOut={this.onLoggedOut}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              }
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
              if (!user) {
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              }
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
              if (!user) {
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              }
              return (
                <Col className="genre-view-wrapper">
                  <GenreView
                    movies={movies}
                    onBackClick={() => {
                      history.goBack();
                    }}
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

const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
});

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

MainView.propTypes = {
  setUser: PropTypes.func.isRequired,
  // movies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
};
