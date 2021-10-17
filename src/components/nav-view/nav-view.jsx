/* eslint-disable react/prop-types */
import React from 'react';

import { Navbar, Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './nav-view.scss';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

export default function NavView(props) {
  const { onLoggedOut, visibilityFilter } = props;
  const username = localStorage.getItem('username');

  if (!username) return null;

  return (
    <Navbar variant="dark justify-content-center" expand="lg">
      <Navbar.Brand>myFlix</Navbar.Brand>
      <Col className="movies-search-bar">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      <Navbar.Toggle />
      <Navbar.Collapse variant="shadow-none" className="nav-bar">
        <Navbar.Text>
          Signed in as:
          <Link to={`/users/${username}`}>{username}</Link>
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
