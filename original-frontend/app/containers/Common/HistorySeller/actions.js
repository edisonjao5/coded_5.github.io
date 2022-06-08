/*
 *
 * Histories actions
 *
 */

import {
  FETCH_HISTORIES,
  FETCH_HISTORIES_ERROR,
  FETCH_HISTORIES_SUCCESS,
  QUERY_HISTORIES,
} from './constants';

export function queryHistories(query) {
  return {
    type: QUERY_HISTORIES,
    query,
  };
}

export function fetchHistories(UserID) {
  return {
    type: FETCH_HISTORIES,
    UserID,
  };
}

export function fetchHistoriesError(error) {
  return {
    type: FETCH_HISTORIES_ERROR,
    error,
  };
}

export function fetchHistoriesSuccess(histories) {
  return {
    type: FETCH_HISTORIES_SUCCESS,
    histories,
  };
}
