/*
 *
 * Restriction actions
 *
 */

import {
  SET_RESTRICTION,
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  SAVE_RESTRICTION,
  SAVE_RESTRICTION_ERROR,
  SAVE_RESTRICTION_SUCCESS,
  RESET_CONTAINER,
  DELETE_RESTRICTION,
  DELETE_RESTRICTION_ERROR,
  DELETE_RESTRICTION_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function fetchEntities(ProyectoID) {
  return {
    type: FETCH_ENTITIES,
    ProyectoID,
  };
}

export function fetchEntitiesError(error) {
  return {
    type: FETCH_ENTITIES_ERROR,
    error,
  };
}

export function fetchEntitiesSuccess(response) {
  return {
    type: FETCH_ENTITIES_SUCCESS,
    response,
  };
}

export function setRestriction(data) {
  return {
    type: SET_RESTRICTION,
    data,
  };
}

export function saveRestriction() {
  return {
    type: SAVE_RESTRICTION,
  };
}

export function saveRestrictionError(error) {
  return {
    type: SAVE_RESTRICTION_ERROR,
    error,
  };
}

export function saveRestrictionSuccess(response) {
  return {
    type: SAVE_RESTRICTION_SUCCESS,
    response,
  };
}

export function deleteRestriction(entity) {
  return {
    type: DELETE_RESTRICTION,
    entity,
  };
}

export function deleteRestrictionError(error) {
  return {
    type: DELETE_RESTRICTION_ERROR,
    error,
  };
}

export function deleteRestrictionSuccess(response) {
  return {
    type: DELETE_RESTRICTION_SUCCESS,
    response,
  };
}
