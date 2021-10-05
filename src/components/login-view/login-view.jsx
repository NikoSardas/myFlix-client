//TODO form validation

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./login-view.scss";

export class LoginView extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.state = {
      username: null,
      password: null,
    };
  }

  validate() {
    return this.form.current.reportValidity();
  }

  handleSubmit(e) {
    axios
      .post("https://nikosardas-myflixdb.herokuapp.com/login", {
        Username: this.state.username,
        Password: this.state.password,
      })
      .then((response) => {
        console.log(response.data);
        this.props.onLoggedIn(response.data);
      })
      .catch((e) => {
        console.log("no such user", e);
      });
  }

  setUsername(username) {
    this.setState({
      username,
    });
  }

  setPassword(password) {
    this.setState({
      password,
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-view">
        <h1>MyFlix</h1>
        <Form ref={this.form}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Your Username.."
              onChange={(e) => this.setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Your password.."
              onChange={(e) => this.setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="login-view-buttons">
            <Button
              variant="outline-light shadow-none"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.validate();
                this.handleSubmit(e);
              }}
            >
              Submit
            </Button>
            <Link to={`/register`}>
              <Button  variant="outline-warning shadow-none" className="register-button">
                Register
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
