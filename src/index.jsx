import React from 'react';
import ReactDOM from 'react-dom';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Container from 'react-bootstrap/Container';

import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// eslint-disable-next-line react/prefer-stateless-function
class myFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid>
          <MainView/>
        </Container>
      </Provider>
    );
  }
}

const container = document.querySelector('.app-container');

ReactDOM.render(React.createElement(myFlixApplication), container);
