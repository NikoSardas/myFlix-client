/* eslint-disable no-console */

import React from "react";
import axios from "axios";

import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./login-view.scss";

const config = require("../../config");

export default class LoginView extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
  }

  handleSubmit(username, password) {
    const { onLoggedIn } = this.props;
    axios
      .post(`${config.API_ADDRESS}/login`, {
        Username: username,
        Password: password,
      })
      .then((response) => {
        onLoggedIn(response.data);
      })
      .catch((e) => {
        console.error("no such user", e);
      });
  }

  validateForm = () => {
    return this.form.current.reportValidity();
  };

  render() {
    let username = "";
    let password = "";
    return (
      <div className="login-view">
        <h1>MyFlix</h1>
        <Form ref={this.form}>
          <Form.Group controlId="formUsername">
            {/* <Form.Label>Username:</Form.Label> */}
            <Form.Control
              type="text"
              required
              placeholder="Your Username.."
              pattern="[A-Za-z0-9_]{3,42}"
              onChange={(e) => {
                username = e.target.value;
              }}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            {/* <Form.Label>Password:</Form.Label> */}
            <Form.Control
              type="password"
              required
              placeholder="Your password.."
              onChange={(e) => {
                password = e.target.value;
              }}
            />
          </Form.Group>
          <div className="login-view-buttons">
            <Button
              variant="outline-light shadow-none"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.validateForm();
                this.handleSubmit(username, password);
              }}
            >
              Submit
            </Button>
            <Link to="/register">
              <Button
                variant="outline-warning shadow-none"
                className="register-button"
              >
                Register
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}
