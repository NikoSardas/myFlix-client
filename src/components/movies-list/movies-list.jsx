/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import MovieCard from '../movie-card/movie-card';

import './movies-list.scss';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

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
          <MovieCard movie={m} />
        </Col>
      ))}
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  visibilityFilter: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
};
