import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER_NAME,
  SET_USER_EMAIL,
  SET_USER_BIRTHDAY,
  SET_USER_FAVORITES,
  SET_USER_PASSWORD,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
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

function userName(state = '', action) {
  switch (action.type) {
    case SET_USER_NAME:
      return action.value;
    default:
      return state;
  }
}

function userPassword(state = '', action) {
  switch (action.type) {
    case SET_USER_PASSWORD:
      return action.value;
    default:
      return state;
  }
}

function userFavorites(state = [], action) {
  switch (action.type) {
    case SET_USER_FAVORITES:
      return action.value;
    default:
      return state;
  }
}

function userEmail(state = '', action) {
  switch (action.type) {
    case SET_USER_EMAIL:
      return action.value;
    default:
      return state;
  }
}

function userBirthday(state = '', action) {
  switch (action.type) {
    case SET_USER_BIRTHDAY:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userFavorites,
  userBirthday,
  userEmail,
  userName,
  userPassword,
});

export default moviesApp;
