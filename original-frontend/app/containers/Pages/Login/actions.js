/*
 *
 * LoginPage actions
 *
 */

import { DO_LOGIN, DO_LOGIN_ERROR, DO_LOGIN_SUCCESS } from './constants';

export function doLogin(credentials) {
  return {
    type: DO_LOGIN,
    credentials,
  };
}

export function doLoginSuccess(auth, remember = false) {
  return {
    type: DO_LOGIN_SUCCESS,
    auth,
    remember,
  };
}

export function doLoginError(error) {
  return {
    type: DO_LOGIN_ERROR,
    error,
  };
}
