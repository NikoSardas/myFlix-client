import React from "react";
import ReactDOM from "react-dom";
import { devToolsEnhancer } from 'redux-devtools-extension'

import { createStore } from "redux";
import { Provider } from "react-redux";

import Container from "react-bootstrap/Container";

import moviesApp from "./reducers/reducers";
import MainView from "./components/main-view/main-view";

// Import statement to indicate that we need to bundle `./index.scss`
import "./index.scss";

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class myFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Find the root of our app
const container = document.querySelector(".app-container");

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);
