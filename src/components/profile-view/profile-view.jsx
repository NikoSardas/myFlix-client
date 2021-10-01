//TODO hide navbar
//TODO fix update

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
// import { Link } from "react-router-dom";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favorites: [],
    };
  }

  componentDidMount() {
    this.getInitialStates();
  }

  validate() {
    return this.form.current.reportValidity();
  }

  getInitialStates() {
    axios
      .get(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday.substr(0, 10),
          favorites: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate() {
    axios
      .put(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const username = this.state.username;
        localStorage.setItem("username", username);
        window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDeregister() {
    axios
      .delete(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        this.props.onLoggedOut;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeFromFavorites = (id, username) => {
    axios
      .delete(
        `https://nikosardas-myflixdb.herokuapp.com/users/${username}/FavoriteMovies/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        console.log(res);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  setEmail(email) {
    this.setState({
      email,
    });
  }

  setBirthday(birthday) {
    this.setState({
      birthday,
    });
  }

  render() {
    const { username, password, email, birthday, favorites } = this.state;
    const { onBackClick } = this.props;
    return (
      <div className="profile-view">
        <h2>User Profile</h2>
        <Form ref={this.form}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              required
              pattern="[A-Za-z0-9_]{3,42}"
              placeholder="Only letters, numbers, and underscore"
              value={username}
              onChange={(e) => this.setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => this.setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => this.setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              required
              value={birthday}
              onChange={(e) => this.setBirthday(e.target.value)}
            />
          </Form.Group>
          <div className="profile-view-buttons">
            <Button
              type="submit"
              variant="outline-warning"
              className="update-submit"
              onClick={(e) => {
                e.preventDefault();
                this.validate();
                this.handleUpdate();
              }}
            >
              Update
            </Button>
          </div>
        </Form>
        <ListGroup className="favs-row">
          <h5 className="text-center">{localStorage.username}'s Favorite Movies</h5>
          {favorites.length === 0 ? (
            <div>No Favorite Movies</div>
          ) : (
            favorites.map((favMovie) => {
              return (
                <ListGroupItem
                  className="fav-item"
                  variant="Success"
                  key={favMovie._id}
                >
                  {favMovie.Title}
                  <Button
                    variant="outline-danger"
                    className="remove-fav"
                    onClick={() => {
                      this.removeFromFavorites(favMovie._id, username);
                    }}
                  >
                    X
                  </Button>
                </ListGroupItem>
              );
            })
          )}
        </ListGroup>
        <div className="footer">
          <Button
            className="delete-user"
            variant="danger"
            onClick={() => {
              if (confirm("Confirm?")) {
                this.handleDeregister(username);
              } else {
                console.log("Cancelled.");
              }
            }}
          >
            Delete User
          </Button>
          <Button onClick={onBackClick} variant="outline-light">
            Back to main page
          </Button>
        </div>
      </div>
    );
  }
}
ProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
