import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://nikosardas-myflixdb.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <div className="login-view">
      <h1>MyFlix</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Username.."
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password.."
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="login-view-buttons">
          <Button variant="outline-light" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Link to={`/register`}>
            <Button variant="outline-warning" className="register-button">
              Register
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
