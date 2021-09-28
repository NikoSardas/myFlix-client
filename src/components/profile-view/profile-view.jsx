import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

export function ProfileView() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  axios
    .get(`https:nikosardas-myflixdb.herokuapp.com/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      response.data.map((user) => {
        if (user.Username === localStorage.getItem("username")) {
          setUsername(user.Username);
          setEmail(user.Email);
          //password needs to be unhashed
          //date requests another format
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  handleUpdate = () => {
    console.log("handleUpdate");
    axios
      .put(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          data: {
            Username: username,
            Email: email,
          },
        }
      )
      .then((response) => {
        alert("Saved Changes");
        setEmail(response.data.Email);
        setUsername(response.data.Username);
        window.open(`/users/${localStorage.getItem("username")}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleDeregister = () => {
    console.log("handleDeregister");
    axios
      .delete(
        `https://nikosardas-myflixdb.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response);
        //how to use onloggedout from mainview.jsx?
        onLoggedOut();
        window.open("/", "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onLoggedOut = () => {
    console.log("mainview onLoggedOut");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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
        {/* <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <div className="profile-view-buttons">
          <Button
            variant="outline-light"
            className="update-submit"
            onClick={() => {
              handleUpdate();
            }}
          >
            Update
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeregister();
            }}
          >
            Delete User
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

// RegistrationView.propTypes = {
//   onRegistration: PropTypes.func.isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };
