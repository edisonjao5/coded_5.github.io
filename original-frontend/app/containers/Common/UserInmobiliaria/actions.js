/*
 *
 * Users actions
 *
 */

import {
  FETCH_USER_INMOBILIARIAS,
  FETCH_USER_INMOBILIARIAS_ERROR,
  FETCH_USER_INMOBILIARIAS_SUCCESS,
} from './constants';

export function fetchUsers(InmobiliariaID) {
  return {
    type: FETCH_USER_INMOBILIARIAS,
    InmobiliariaID,
  };
}

export function fetchUsersError(error) {
  return {
    type: FETCH_USER_INMOBILIARIAS_ERROR,
    error,
  };
}

export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USER_INMOBILIARIAS_SUCCESS,
    users,
  };
}
