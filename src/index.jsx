import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

class myFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  }
}
const container = document.querySelector(".app-container");
ReactDOM.render(React.createElement(myFlixApplication), container);
