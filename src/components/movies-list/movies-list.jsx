/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Col } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import MovieCard from '../movie-card/movie-card';

import './movies-list.scss';

const config = require('../../config');

function MoviesList(props) {
  const {
    movies, visibilityFilter, getUser, user,
  } = props;
  let filteredMovies = movies;

  const removeFromFavorites = (movie) => {
    axios
      .delete(
        `${config.API_ADDRESS}/users/${localStorage.getItem('username')}/FavoriteMovies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then(() => {
        getUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToFavorites = (movie) => {
    axios
      .post(
        `${config.API_ADDRESS}/users/${localStorage.getItem('username')}/FavoriteMovies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then(() => {
        getUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (visibilityFilter !== '') {
    filteredMovies = movies
      .filter((m) => m.Title.toLowerCase()
        .includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} className="movies-search-bar">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          className="movie-list-col"
          key={m._id}
        >
          <MovieCard
            user={user}
            movie={m}
            addToFavorites={() => {
              addToFavorites(m);
            }}
            removeFromFavorites={() => { removeFromFavorites(m); }}
          />
        </Col>
      ))}
    </>
  );
}

MoviesList.propTypes = {
  getUser: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  // user: PropTypes.shape({
  //   Username: PropTypes.string.isRequired,
  //   Email: PropTypes.string.isRequired,
  //   Password: PropTypes.string.isRequired,
  //   Birthday: PropTypes.string.isRequired,
  //   FavoriteMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  // }).isRequired,
  // user: PropTypes.arrayOf(PropTypes.string).isRequired,
  // user: PropTypes.shape({}).isRequired,
  // user: PropTypes.arrayOf(PropTypes.string).isRequired,
  // user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const {
    visibilityFilter,
  } = state;
  return {
    visibilityFilter,
  };
};

export default connect(mapStateToProps)(MoviesList);
