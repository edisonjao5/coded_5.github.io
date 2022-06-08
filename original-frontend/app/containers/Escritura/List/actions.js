/*
 *
 * Promesa actions
 *
 */

import {
  FETCH_ESCRITURAS,
  FETCH_ESCRITURAS_ERROR,
  FETCH_ESCRITURAS_SUCCESS,
  SEARCH_ESCRITURAS,
  QUERY_ESCRITURAS,
  CONFIRM_ESCRITURA,
  CONFIRM_ESCRITURA_ERROR,
  CONFIRM_ESCRITURA_SUCCESS,
} from './constants';

export function searchEscrituras(filter) {
  return {
    type: SEARCH_ESCRITURAS,
    filter,
  };
}

export function queryEscrituras(query) {
  return {
    type: QUERY_ESCRITURAS,
    query,
  };
}

export function fetchEscrituras(projectId) {
  return {
    type: FETCH_ESCRITURAS,
    projectId,
  };
}

export function fetchEscriturasError(error) {
  return {
    type: FETCH_ESCRITURAS_ERROR,
    error,
  };
}

export function fetchEscriturasSuccess(escrituras) {
  return {
    type: FETCH_ESCRITURAS_SUCCESS,
    escrituras,
  };
}

export function confirmEscritura(ProyectoID) {
  return {
    type: CONFIRM_ESCRITURA,
    ProyectoID,
  };
}
export function confirmEscrituraError(error) {
  return {
    type: CONFIRM_ESCRITURA_ERROR,
    error,
  };
}
export function confirmEscrituraSuccess(response) {
  return {
    type:CONFIRM_ESCRITURA_SUCCESS,
    response,
  };
}