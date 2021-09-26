import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const handleRegister = () => {
    props.goToRegistration(true);
  };

  return (
    <div className="login-view">
      <h1>MyFlix</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="login-view-buttons">
          <Button variant="outline-light" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            variant="outline-warning"
            className="register-button"
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
