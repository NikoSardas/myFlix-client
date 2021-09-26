import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import MainView from "./components/main-view/main-view";
import "./index.scss";

class myFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid>
        <MainView />
      </Container>
    );
  }
}
const container = document.querySelector(".app-container");
ReactDOM.render(React.createElement(myFlixApplication), container);
