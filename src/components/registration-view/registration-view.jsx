/* eslint-disable no-console */

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./registration-view.scss";

const config = require("../../config");

export default class RegistrationView extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
    };
  }

  handleRegister() {
    const { username, password, email, birthday } = this.state;
    axios
      .post(`${config.API_ADDRESS}/users`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        console.log(response);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.error("error registering the user", e);
      });
  }

  validateForm = () => {
    return this.form.current.reportValidity();
  };

  render() {
    const { onBackClick } = this.props;
    return (
      <div className="registration-view">
        <h2>User Registration</h2>
        <Form ref={this.form}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              required
              pattern="[A-Za-z0-9_]{3,42}"
              placeholder="Should only contain Only letters, numbers, and underscore"
              title="Username should only contain Only letters, numbers, and underscore"
              type="text"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              required
              placeholder="Please set your password.."
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              required
              placeholder="Please set your email address.."
              type="email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              required
              type="date"
              onChange={(e) => this.setState({ birthday: e.target.value })}
            />
          </Form.Group>
          <div className="registration-view-buttons">
            <Button
              variant="outline-light"
              className="register-submit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (this.validateForm()) this.handleRegister(e);
              }}
            >
              Submit
            </Button>
            <Link to="/">
              <Button variant="outline-warning" onClick={onBackClick}>
                Cancel
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}
