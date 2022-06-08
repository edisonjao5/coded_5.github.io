/*
 *
 * Entities actions
 *
 */

import {
  QUERY_ENTITIES,
  SAVE_ENTITY,
  SAVE_ENTITY_ERROR,
  SAVE_ENTITY_SUCCESS,
  TOGGLE_FORM,
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
} from './constants';

export function queryEntities(query) {
  return {
    type: QUERY_ENTITIES,
    query,
  };
}

export function fetchEntities() {
  return {
    type: FETCH_ENTITIES,
  };
}

export function fetchEntitiesError(error) {
  return {
    type: FETCH_ENTITIES_ERROR,
    error,
  };
}

export function fetchEntitiesSuccess(entities) {
  return {
    type: FETCH_ENTITIES_SUCCESS,
    entities,
  };
}
export function saveEntity(values) {
  return {
    type: SAVE_ENTITY,
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

export function toggleScreen(screen, entity = false) {
  return {
    type: TOGGLE_FORM,
    screen,
    entity,
  };
}
