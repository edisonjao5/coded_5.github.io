/*
 *
 * Users actions
 *
 */

import {
  ACTIVE_USER,
  ACTIVE_USER_ERROR,
  ACTIVE_USER_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  QUERY_USERS,
  RESET_PASSWORD_USER,
  RESET_PASSWORD_USER_ERROR,
  RESET_PASSWORD_USER_SUCCESS,
  RESET_QUERY_USERS,
  SAVE_USER,
  SAVE_USER_ERROR,
  SAVE_USER_SUCCESS,
  SELECT_USER,
  TOGGLE_FORM,
} from './constants';

export function resetQueryUsers() {
  return {
    type: RESET_QUERY_USERS,
  };
}
export function queryUsers(query) {
  return {
    type: QUERY_USERS,
    query,
  };
}

export function fetchUsers() {
  return {
    type: FETCH_USERS,
  };
}

export function fetchUsersError(error) {
  return {
    type: FETCH_USERS_ERROR,
    error,
  };
}

export function fetchUsersSuccess(response) {
  return {
    type: FETCH_USERS_SUCCESS,
    ...response,
  };
}

export function getUser(UserID) {
  return {
    type: GET_USER,
    UserID,
  };
}

export function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
}

export function saveUser(values) {
  return {
    type: SAVE_USER,
    values,
  };
}

export function saveUserError(error) {
  return {
    type: SAVE_USER_ERROR,
    error,
  };
}

export function saveUserSuccess(response) {
  return {
    type: SAVE_USER_SUCCESS,
    response,
  };
}

export function resetPasswordUser(UserID) {
  return {
    type: RESET_PASSWORD_USER,
    UserID,
    screen: 'resetPassword',
  };
}

export function resetPasswordUserError(error) {
  return {
    type: RESET_PASSWORD_USER_ERROR,
    error,
  };
}

export function resetPasswordUserSuccess(response) {
  return {
    type: RESET_PASSWORD_USER_SUCCESS,
    response,
  };
}

export function activeUser(UserID) {
  return {
    type: ACTIVE_USER,
    UserID,
    screen: 'activeUser',
  };
}

export function activeUserError(error) {
  return {
    type: ACTIVE_USER_ERROR,
    error,
  };
}

export function activeUserSuccess(response) {
  return {
    type: ACTIVE_USER_SUCCESS,
    response,
  };
}

export function selectUser(user = false) {
  return {
    type: SELECT_USER,
    user,
  };
}

export function toggleScreen(screen, user = false) {
  return {
    type: TOGGLE_FORM,
    screen,
    user,
  };
}
