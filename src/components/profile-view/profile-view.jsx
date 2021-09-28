import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

export function ProfileView(props) {
    console.log(props)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  handleUpdate = () => {
    axios
      .put("https://dashboard.heroku.com/apps/nikosardas-myflixdb/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("error updating user info");
      });
  };

  handleDeregister = () => {
    axios
      .delete("https://dashboard.heroku.com/apps/nikosardas-myflixdb/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("error Deregistering the user");
      });
  };

  return (
    <div className="profile-view">
      <h2>User Profile</h2>
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
        <div className="profile-view-buttons">
          <Button
            variant="outline-light"
            className="update-submit"
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            variant="outline-warning"
            className="update-submit"
            type="submit"
            onClick={handleDeregister}
          >
            Delete User
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

// RegistrationView.propTypes = {
//   onRegistration: PropTypes.func.isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };
