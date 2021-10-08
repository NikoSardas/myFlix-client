export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER_BIRTHDAY = 'SET_USER_BIRTHDAY';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const SET_USER_FAVORITES = 'SET_USER_FAVORITES';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUserPassword(value) {
  return { type: SET_USER_PASSWORD, value };
}

export function setUserEmail(value) {
  return { type: SET_USER_EMAIL, value };
}

export function setUserBirthday(value) {
  return { type: SET_USER_BIRTHDAY, value };
}

export function setUsername(value) {
  return { type: SET_USER_NAME, value };
}

export function setUserFavorites(value) {
  return { type: SET_USER_FAVORITES, value };
}
