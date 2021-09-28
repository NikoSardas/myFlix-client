import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import "./director-view.scss";

export function DirectorView(props) {
  const { director, onBackClick } = props;
  return (
    <Card border="light" bg="dark" text="white">
      <Card.Body>
        <Card.Title>{director.Name}</Card.Title>
        <Card.Text>{director.Bio}</Card.Text>
        <Button variant="outline-light" onClick={onBackClick}>
          Back
        </Button>
      </Card.Body>
    </Card>
  );
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
