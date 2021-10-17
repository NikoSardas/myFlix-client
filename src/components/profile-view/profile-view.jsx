/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
import React from "react";
import axios from "axios";

import { Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

const config = require("../../config");

export default class ProfileView extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favorites: [],
    };
  }

  componentDidMount() {
    const { getUser } = this.props;
    axios
      .get(`${config.API_ADDRESS}/users/${localStorage.getItem("username")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday.substr(0, 10),
          favorites: response.data.FavoriteMovies,
        });
        getUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleDeregister() {
    axios
      .delete(
        `${config.API_ADDRESS}/users/${localStorage.getItem("username")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        const { onLoggedOut } = this.props;
        onLoggedOut();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleUpdate() {
    const { username, password, email, birthday } = this.state;
    axios
      .put(
        `${config.API_ADDRESS}/users/${localStorage.getItem("username")}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        const { reloadScreen } = this.props;
        localStorage.setItem("username", username);
        reloadScreen();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeFromFavorites(id, username) {
    axios
      .delete(`${config.API_ADDRESS}/users/${username}/FavoriteMovies/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  validate = () => {
    return this.form.current.reportValidity();
  };

  render() {
    const { username, email, birthday, favorites } = this.state;
    return (
      <div className="profile-view">
        <h2>User Profile</h2>
        <Form ref={this.form}>
          <Form.Group controlId="formUsername">
            {/* <Form.Label>Username:</Form.Label> */}
            <Form.Control
              type="text"
              required
              pattern="[A-Za-z0-9_]{3,42}"
              placeholder="Only letters, numbers, and underscore"
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            {/* <Form.Label>Password:</Form.Label> */}
            <Form.Control
              type="password"
              required
              placeholder="Password Required"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            {/* <Form.Label>Email:</Form.Label> */}
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            {/* <Form.Label>Birthday:</Form.Label> */}
            <Form.Control
              type="date"
              required
              value={birthday}
              onChange={(e) => this.setState({ birthday: e.target.value })}
            />
            <div className="profile-buttons">
              <Button
                type="submit"
                variant="outline-warning shadow-none"
                className="update-submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (this.validate()) this.handleUpdate();
                }}
              >
                Update
              </Button>
              <Link to="/">
                <Button variant="outline-secondary text-light shadow-none">
                  Back to main page
                </Button>
              </Link>
            </div>
          </Form.Group>
        </Form>
        <ListGroup className="favs-row">
          <h3 className="text-center">Favorite Movies</h3>
          {favorites.length === 0 ? (
            <div>No Favorite Movies</div>
          ) : (
            favorites.map((favMovie) => (
              <ListGroupItem
                className="fav-item"
                variant="Success"
                key={favMovie._id}
              >
                {favMovie.Title}
                <Button
                  variant="outline-danger shadow-none"
                  className="remove-fav"
                  onClick={() => {
                    this.removeFromFavorites(favMovie._id, username);
                  }}
                >
                  X
                </Button>
              </ListGroupItem>
            ))
          )}
        </ListGroup>
        <Button
          className="delete-user"
          variant="danger shadow-none"
          onClick={() => {
            // eslint-disable-next-line no-alert
            if (confirm("Confirm user delete?")) {
              this.handleDeregister();
            } else {
              console.log("Cancelled.");
            }
          }}
        >
          Delete User
        </Button>
      </div>
    );
  }
}
