/*
 *
 * Project actions
 *
 */

import {
  APPROVE_DOCUMENTS,
  APPROVE_DOCUMENTS_ERROR,
  APPROVE_DOCUMENTS_SUCCESS,
  SAVE_ENTITY,
  SAVE_ENTITY_ERROR,
  SAVE_ENTITY_SUCCESS,
  TOGGLE_SCREEN,
  REVIEW_ENTITY,
  REVIEW_ENTITY_ERROR,
  REVIEW_ENTITY_SUCCESS,
  RESET_CONTAINER,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function saveEntity(ProyectoID, values, entregaInmediata) {
  return {
    type: SAVE_ENTITY,
    values,
    entregaInmediata,
    ProyectoID,
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

export function reviewEntity(ProyectoID, values) {
  return {
    type: REVIEW_ENTITY,
    values,
    ProyectoID,
  };
}

export function reviewEntityError(error) {
  return {
    type: REVIEW_ENTITY_ERROR,
    error,
  };
}

export function reviewEntitySuccess(response) {
  return {
    type: REVIEW_ENTITY_SUCCESS,
    response,
  };
}

export function approveDocuments(ProyectoID, isArrpove) {
  return {
    type: APPROVE_DOCUMENTS,
    Resolution: isArrpove,
    ProyectoID,
  };
}

export function approveDocumentsError(error) {
  return {
    type: APPROVE_DOCUMENTS_ERROR,
    error,
  };
}

export function approveDocumentsSuccess(response) {
  return {
    type: APPROVE_DOCUMENTS_SUCCESS,
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
