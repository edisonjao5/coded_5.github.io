/*
 *
 * global actions
 *
 */

import {
  FETCH_PRELOAD_DATA,
  FETCH_PRELOAD_DATA_ERROR,
  FETCH_PRELOAD_DATA_SUCCESS,
  LOGOUT,
} from './constants';

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function fetchPreloadData() {
  return {
    type: FETCH_PRELOAD_DATA,
  };
}

export function fetchPreloadDataError(error) {
  return {
    type: FETCH_PRELOAD_DATA_ERROR,
    error,
  };
}

export function fetchPreloadDataSuccess(preload) {
  return {
    type: FETCH_PRELOAD_DATA_SUCCESS,
    preload,
  };
}
