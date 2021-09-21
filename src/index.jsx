import React from "react";
import ReactDOM from "react-dom";
import MainView from "./components/main-view/main-view";
import "./index.scss";

class myFlixApplication extends React.Component {
  render() {
    return <MainView />;
  }
}
const container = document.querySelector(".app-container");
ReactDOM.render(React.createElement(myFlixApplication), container);
