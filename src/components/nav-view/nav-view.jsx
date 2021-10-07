import React from "react";
import PropTypes from "prop-types";

import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./nav-view.scss";

export class NavView extends React.Component {
  render() {
    const { onLoggedOut } = this.props;
    const username = localStorage.getItem("username");

    if (!username) return null;

    return (
      <Navbar variant="dark" expand="lg">
        <Navbar.Brand>myFlix</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse variant="shadow-none" className="nav-bar">
          <Navbar.Text>
            Signed in as: <Link to={`/users/${username}`}>{username}</Link>
          </Navbar.Text>
          <Nav>
            <Nav.Link className="sign-out" onClick={onLoggedOut}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavView.propTypes = {
  onLoggedOut: PropTypes.func.isRequired,
};
