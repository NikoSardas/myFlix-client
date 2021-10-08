import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Form, Button, ListGroup, ListGroupItem,
} from 'react-bootstrap';

import {
  setMovies,
  setUsername,
  setUserPassword,
  setUserEmail,
  setUserBirthday,
  setUserFavorites,
} from '../../actions/actions';

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
    this.setState({
      username: this.props.userName,
      email: this.props.userEmail,
      birthday: this.props.userBirthday.substr(0, 10),
      favorites: this.props.userFavorites,
    });
  }

  setStoredUserDetails(userData) {
    this.props.setUserBirthday(userData.Birthday);
    this.props.setUserEmail(userData.Email);
    this.props.setUserPassword(userData.Password);
    this.props.setUsername(userData.Username);
  }

  handleUpdate() {
    const details = {
      Username: this.state.username,
      Password: this.state.password,
      Email: this.state.email,
      Birthday: this.state.birthday,
    };
    axios
      .put(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          'username',
        )}`,
        details,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        this.setStoredUserDetails(details);
        localStorage.setItem('username', this.props.userName);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDeregister() {
    axios
      .delete(
        `https://nikosardas-myflixdb.herokuapp.com/users/${this.props.userName}`,
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

  removeFromFavorites(id, username) {
    axios
      .delete(
        `https://nikosardas-myflixdb.herokuapp.com/users/${username}/FavoriteMovies/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then(() => {
        this.setState({
          favorites: this.props.userFavorites,
        });
      })
      .catch((error) => {
        console.log(error);
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

  validate() {
    return this.form.current.reportValidity();
  }

  render() {
    const {
      username, password, email, birthday, favorites,
    } = this.state;
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
              placeholder="Password Required"
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
                  if (this.validate()) this.handleUpdate();
                }}
              >
                Update
              </Button>
              <Button onClick={onBackClick} variant="outline-light shadow-none">
                Back to main page
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
    );
  }
}

ProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    movies, userName, userPassword, userEmail, userBirthday, userFavorites,
  } = state;
  return {
    movies, userName, userPassword, userEmail, userBirthday, userFavorites,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUsername,
  setUserPassword,
  setUserEmail,
  setUserBirthday,
  setUserFavorites,
})(ProfileView);
