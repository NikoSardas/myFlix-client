import React from "react";

import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./nav-view.scss";

export function NavView(props) {

  const { username, onLoggedOut } = props;

  if (!username) return null;

  return (
    <Navbar variant="dark">
      <Navbar.Brand>myFlix</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="">
        <Navbar.Text>
          <span className="signed-in-name">Signed in as: {username}</span>
        </Navbar.Text>
        <Navbar.Text className="logout-button">
          <Link to={`/users/${username}`}>
            <Button variant="outline-light" onClick={() => {}}>
              User Profile
            </Button>
          </Link>
          <Button
            variant="outline-light"
            onClick={() => {
              onLoggedOut();
            }}
          >
            Sign Out
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
