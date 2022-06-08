/*
 *
 * Project actions
 *
 */

import {
  GET_ENTITY,
  GET_ENTITY_ERROR,
  GET_ENTITY_SUCCESS,
  SAVE_ENTITY,
  SAVE_ENTITY_ERROR,
  SAVE_ENTITY_SUCCESS,
  TOGGLE_SCREEN,
  REVIEW_FINANZA,
  REVIEW_FINANZA_ERROR,
  REVIEW_FINANZA_SUCCESS,
  RESET_CONTAINER,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function getEntity(ProyectoID) {
  return {
    type: GET_ENTITY,
    ProyectoID,
  };
}

export function getEntityError(error) {
  return {
    type: GET_ENTITY_ERROR,
    error,
  };
}

export function getEntitySuccess(response) {
  return {
    type: GET_ENTITY_SUCCESS,
    response,
  };
}

export function saveEntity(ProyectoID, values) {
  return {
    type: SAVE_ENTITY,
    ProyectoID,
    values,
  };
}

export function saveEntityError(error) {
  return {
    type: SAVE_ENTITY_ERROR,
    error,
  };
}

export function saveEntitySuccess(response) {
  return {
    type: SAVE_ENTITY_SUCCESS,
    response,
  };
}

export function reviewFinanza(ProyectoID, State) {
  return {
    type: REVIEW_FINANZA,
    State,
    ProyectoID,
  };
}

export function reviewFinanzaError(error) {
  return {
    type: REVIEW_FINANZA_ERROR,
    error,
  };
}

export function reviewFinanzaSuccess(response) {
  return {
    type: REVIEW_FINANZA_SUCCESS,
    response,
  };
}

export function toggleScreen(screen, refresh = false) {
  return {
    type: TOGGLE_SCREEN,
    screen,
    refresh,
  };
}
