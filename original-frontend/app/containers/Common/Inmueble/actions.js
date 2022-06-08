/*
 *
 * Inmueble actions
 *
 */

import {
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  UPDATE_ENTITIES,
  UPDATE_ENTITIES_ERROR,
  UPDATE_ENTITIES_SUCCESS,
  MATCH_RESTRICTION,
  RESET_SELECT,
  SELECT_ENTITY,
  UPLOAD_BLUEPRINT,
  SUCESS_UPLOAD,
  ERROR_UPLOAD,
} from './constants';

export function selectEntity(entity, IsSelected, focusChange = false) {
  return {
    type: SELECT_ENTITY,
    entity,
    IsSelected,
    focusChange,
  };
}

export function resetSelected(selected = [], focusChange = false) {
  return {
    type: RESET_SELECT,
    selected,
    focusChange,
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

export function matchRestriction(restrictions) {
  return {
    type: MATCH_RESTRICTION,
    restrictions,
  };
}

export function uploadblueFiles(values, entities) {  
  return {
    type: UPLOAD_BLUEPRINT,
    values,
    entities,
  };
}

export function sucessUpload(response) {
  return {
    type: SUCESS_UPLOAD,
    response,
  };
}

export function errorUpload(response) {
  return {
    type: ERROR_UPLOAD,
    response,
  };
}

export function updateEntities(values) {
  return {
    type: UPDATE_ENTITIES,
    values,
  };
}

export function updateEntitiesError(error) {
  return {
    type: UPDATE_ENTITIES_ERROR,
    error,
  };
}

export function updateEntitiesSuccess(response) {
  return {
    type: UPDATE_ENTITIES_SUCCESS,
    response,
  };
}
