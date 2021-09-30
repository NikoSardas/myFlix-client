//TODO onChange doesn't read auto-fill

import React from "react";
import axios from "axios";

import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./registration-view.scss";

export class RegistrationView extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
    };
  }
  setUsername(username) {
    console.log(this.state.username);
    this.setState({
      username,
    });
  }
  setPassword(password) {
    console.log(this.state.password);
    this.setState({
      password,
    });
  }
  setEmail(email) {
    console.log(this.state.email);
    this.setState({
      email,
    });
  }
  setBirthday(birthday) {
    console.log(this.state.birthday);
    this.setState({
      birthday,
    });
  }
  handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("https://nikosardas-myflixdb.herokuapp.com/users", {
        Username: this.state.username,
        Password: this.state.password,
        Email: this.state.email,
        Birthday: this.state.birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("error registering the user", e);
      });
  };
  validate() {
    return this.form.current.reportValidity();
  }
  render() {
    const { username, password, email, birthday } = this.state;
    return (
      <div className="registration-view">
        <h2>User Registration</h2>
        <Form ref={this.form}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              required
              pattern="[A-Za-z0-9_]{3,42}"
              placeholder="Only letters, numbers, and underscore"
              type="text"
              onChange={(e) => this.setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              required
              placeholder="Password required"
              type="password"
              onChange={(e) => this.setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              required
              placeholder="Email required"
              type="email"
              onChange={(e) => this.setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              required
              type="date"
              onChange={(e) => this.setBirthday(e.target.value)}
            />
          </Form.Group>
          <div className="registration-view-buttons">
            <Button
              variant="outline-light"
              className="register-submit"
              type="submit"
              onClick={(e) => {
                this.validate();
                this.handleRegister(e);
              }}
            >
              Submit
            </Button>
            <Link to={`/`}>
              <Button
                variant="outline-light"
                onClick={() => {
                  history.back();
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
}
