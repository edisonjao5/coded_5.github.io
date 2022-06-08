/*
 *
 * ProjectList actions
 *
 */

import {
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  FILTER_ENTITIES,
} from './constants';

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

export function filterEntites(query) {
  return {
    type: FILTER_ENTITIES,
    query,
  };
}
