import React from "react";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <Button variant="outline-light"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    // ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};