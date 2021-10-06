import React from "react";
import axios from "axios";

import { Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

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

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.open("/", "_self");
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
        const userName = this.state.username;
        localStorage.setItem("username", userName);
        window.open(`/users/${userName}`, "_self");
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
        this.onLoggedOut();
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
        <Link to="/">
          <Button
            className="back-to-main"
            variant="outline-light shadow-none"
          >
            Back to main page
          </Button>
        </Link>
        <h2>User Profile</h2>
        <Form ref={this.form}>
          <Form.Group controlId="formUsername">
            {/* <Form.Label>Username:</Form.Label> */}
            <Form.Control
              type="text"
              required
              pattern="[A-Za-z0-9_]{3,42}"
              placeholder="Should only contain Only letters, numbers, and underscore"
              title="Username should only contain Only letters, numbers, and underscore"
              value={username}
              onChange={(e) => this.setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            {/* <Form.Label>Password:</Form.Label> */}
            <Form.Control
              type="password"
              required
              placeholder="Update requires a password"
              value={password}
              onChange={(e) => this.setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            {/* <Form.Label>Email:</Form.Label> */}
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => this.setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            {/* <Form.Label>Birthday:</Form.Label> */}
            <Form.Control
              type="date"
              required
              value={birthday}
              onChange={(e) => this.setBirthday(e.target.value)}
            />
            <div className="profile-buttons">
              <Button
                type="submit"
                variant="outline-warning shadow-none"
                className="update-submit"
                onClick={(e) => {
                  e.preventDefault();
                  this.validate() && this.handleUpdate();
                }}
              >
                Update
              </Button>
              <Button
                className="delete-user"
                variant="danger shadow-none"
                onClick={() => {
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
          </Form.Group>
        </Form>
        <ListGroup className="favs-row">
          <h3 className="text-center">Favorite Movies</h3>
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
                    variant="outline-danger shadow-none"
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
      </div>
    );
  }
}
