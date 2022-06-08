/*
 *
 * Client actions
 *
 */

import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_ERROR,
  FETCH_CLIENTS_SUCCESS,
  GET_CLIENT,
  GET_CLIENT_ERROR,
  GET_CLIENT_SUCCESS,
  DELETE_CLIENT,
  DELETE_CLIENT_ERROR,
  DELETE_CLIENT_SUCCESS,
  QUERY_CLIENTS,
  SAVE_CLIENT,
  SAVE_CLIENT_ERROR,
  SAVE_CLIENT_SUCCESS,
  SELECT_CLIENT,
  TOGGLE_FORM,
} from './constants';

export function queryClients(query) {
  return {
    type: QUERY_CLIENTS,
    query,
  };
}

export function fetchClients() {
  return {
    type: FETCH_CLIENTS,
  };
}

export function fetchClientsError(error) {
  return {
    type: FETCH_CLIENTS_ERROR,
    error,
  };
}

export function fetchClientsSuccess(response) {
  return {
    type: FETCH_CLIENTS_SUCCESS,
    ...response,
  };
}

export function getClient(UserID) {
  return {
    type: GET_CLIENT,
    UserID,
  };
}

export function getClientError(error) {
  return {
    type: GET_CLIENT_ERROR,
    error,
  };
}

export function getClientSuccess(client) {
  return {
    type: GET_CLIENT_SUCCESS,
    client,
  };
}

export function deleteClient(UserID) {
  return {
    type: DELETE_CLIENT,
    UserID,
  };
}

export function deleteClientError(error) {
  return {
    type: DELETE_CLIENT_ERROR,
    error,
  };
}

export function deleteClientSuccess(response) {
  return {
    type: DELETE_CLIENT_SUCCESS,
    response,
  };
}

export function saveClient(values) {
  return {
    type: SAVE_CLIENT,
    values,
  };
}

export function saveClientError(error) {
  return {
    type: SAVE_CLIENT_ERROR,
    error,
  };
}

export function saveClientSuccess(response) {
  return {
    type: SAVE_CLIENT_SUCCESS,
    response,
  };
}

export function selectClient(client = false) {
  return {
    type: SELECT_CLIENT,
    client,
  };
}

export function toggleScreen(screen, client = false) {
  return {
    type: TOGGLE_FORM,
    screen,
    client,
  };
}
