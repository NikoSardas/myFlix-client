import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USER_NAME } from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function loggedUsername(state = "", action) {
  switch (action.type) {
    case SET_USER_NAME:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  loggedUsername,
});

export default moviesApp;
