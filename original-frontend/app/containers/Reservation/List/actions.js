/*
 *
 * Reservation actions
 *
 */

import {
  QUERY_RESERVATIONS,
  FETCH_RESERVATIONS,
  FETCH_RESERVATIONS_ERROR,
  FETCH_RESERVATIONS_SUCCESS,
  SEARCH_RESERVATIONS,
} from './constants';

export function searchReservations(filter) {
  return {
    type: SEARCH_RESERVATIONS,
    filter,
  };
}

export function queryReservations(query) {
  return {
    type: QUERY_RESERVATIONS,
    query,
  };
}

export function fetchReservations(projectId) {
  return {
    type: FETCH_RESERVATIONS,
    projectId,
  };
}

export function fetchReservationsError(error) {
  return {
    type: FETCH_RESERVATIONS_ERROR,
    error,
  };
}

export function fetchReservationsSuccess(reservations) {
  return {
    type: FETCH_RESERVATIONS_SUCCESS,
    reservations,
  };
}
