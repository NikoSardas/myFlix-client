import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    return (
      <Card border="light" bg="dark" text="white">
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
          <Button
            variant="outline-light"
            onClick={() => {
              history.back();
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
