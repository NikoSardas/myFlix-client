import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  handleRegister = () => {
    axios
      .post("https://dashboard.heroku.com/apps/nikosardas-myflixdb/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  return (
    <div className="registration-view">
      <h2>User Registration</h2>
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <div className="registration-view-buttons">
          <Button
            variant="outline-light"
            className="register-submit"
            type="submit"
            onClick={handleRegister}
          >
            Submit
          </Button>
          <Link to={`/`}>
            <Button
              variant="outline-light"
              onClick={() => {
                props.onBackClick(false);
              }}
            >
              Cancel
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
