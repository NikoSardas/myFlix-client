import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Form, Button, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { setUser } from '../../actions/actions';

import './profile-view.scss';

class ProfileView extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.state = {
      username: '',
      password: '',
      email: '',
      birthday: '',
      favorites: [],
    };
  }

  componentDidMount() {
    this.getInitialStates();
  }

  handleUpdate() {
    axios
      .put(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          'username',
        )}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then(() => {
        const updatedUser = {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
        };
        this.props.setUser(updatedUser);
        localStorage.setItem('username', this.props.username);
        window.open(`/users/${this.props.username}`, '_self');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDeregister() {
    axios
      .delete(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          'username',
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then(() => {
        this.props.onLoggedOut();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getInitialStates() {
    const userData = this.props.user;
    this.setState({
      username: userData.Username,
      email: userData.Email,
      birthday: userData.Birthday.substr(0, 10),
      favorites: userData.FavoriteMovies,
    });
    console.log(this.props.user.FavoriteMovies);
    console.log(this.state.favorites);
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

  removeFromFavorites(id, username) {
    axios
      .delete(
        `https://nikosardas-myflixdb.herokuapp.com/users/${username}/FavoriteMovies/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then(() => {
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  validate() {
    return this.form.current.reportValidity();
  }

  render() {
    const {
      username, password, email, birthday, favorites,
    } = this.state;
    const { user, movies } = this.props;
    return (
      <div className="profile-view">
        <Link to="/">
          <Button className="back-to-main" variant="outline-light shadow-none">
            Back to main page
          </Button>
        </Link>
        <h2>User Profile</h2>
        <Form ref={this.form}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
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
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Update requires a password"
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
            <div className="profile-buttons">
              <Button
                type="submit"
                variant="outline-warning shadow-none"
                className="update-submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (this.validate()) { this.handleUpdate(); }
                }}
              >
                Update
              </Button>
              <Button
                className="delete-user"
                variant="danger shadow-none"
                onClick={() => {
                  if (confirm('Confirm user delete?')) {
                    this.handleDeregister();
                  } else {
                    console.log('Cancelled.');
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
      </div>
    );
  }
}

ProfileView.propTypes = {
  onLoggedOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { movies, user } = state;
  return { movies, user };
};

export default connect(mapStateToProps, { setUser })(ProfileView);
