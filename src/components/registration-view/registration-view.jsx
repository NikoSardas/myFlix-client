import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = () => {
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="outline-light"
        className="register-submit"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button
        variant="outline-light"
        onClick={() => {
          props.onBackClick(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
