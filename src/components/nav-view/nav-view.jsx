import React from "react";

import { Navbar, Button} from "react-bootstrap";

import "./nav-view.scss";

export function NavView(props) {
  if (!props.username) return null;

  return (
    <Navbar variant="dark">
      <Navbar.Brand>myFlix</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="">
        <Navbar.Text>
          <span className="signed-in-name">Signed in as: {props.username}</span>
        </Navbar.Text>
        <Navbar.Text className="logout-button">
          <Button variant="outline-light" onClick={() => {}}>
            User Profile
          </Button>{" "}
        </Navbar.Text>
        <Navbar.Text>
          <Button
            variant="outline-light"
            onClick={() => {
              this.onLoggedOut();
            }}
          >
            Sign Out
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
