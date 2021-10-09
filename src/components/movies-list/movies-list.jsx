/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { Col } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import MovieCard from '../movie-card/movie-card';

import {
  setMovies,
  setUsername,
  setUserPassword,
  setUserEmail,
  setUserBirthday,
  setUserFavorites,
} from '../../actions/actions';

import './movies-list.scss';

const API_ADDRESS = 'https://nikosardas-myflixdb.herokuapp.com';

function MoviesList(props) {
  const {
    movies, visibilityFilter, userName, userFavorites, getUser,
  } = props;
  let filteredMovies = movies;

  const removeFromFavorites = (movie) => {
    axios
      .delete(
        `${API_ADDRESS}/users/${userName}/FavoriteMovies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then(() => {
        const updatedFavsList = [];
        // updatedFavsList = props.userFavorites.filter(
        //   (favId) => favId !== id,
        // );
        // console.log(updatedFavsList);
        // props.setUserFavorites(updatedFavsList);
        // console.log(props.userFavorites);
        getUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToFavorites = (movie) => {
    axios
      .post(
        `${API_ADDRESS}/users/${userName}/FavoriteMovies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then(() => {
        // let updatedFavsList = props.userFavorites;
        // updatedFavsList.push(id);
        // console.log(updatedFavsList);
        // props.setUserFavorites(updatedFavsList);
        // console.log(props.userFavorites);
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
  setUserFavorites: PropTypes.func.isRequired,
  // userFavorites: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  // movies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  movies: PropTypes.array.isRequired,

};

const mapStateToProps = (state) => {
  const {
    movies, userName, userPassword, userEmail, userBirthday, userFavorites, visibilityFilter,
  } = state;
  return {
    movies, userName, userPassword, userEmail, userBirthday, userFavorites, visibilityFilter,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUsername,
  setUserPassword,
  setUserEmail,
  setUserBirthday,
  setUserFavorites,
})(MoviesList);
