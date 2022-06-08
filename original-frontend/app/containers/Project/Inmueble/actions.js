/*
 *
 * Project actions
 *
 */

import {
  IMPORT_FILE,
  IMPORT_FILE_ERROR,
  IMPORT_FILE_SUCCESS,
  IMPORT_AUTH_FILE,
  IMPORT_AUTH_FILE_ERROR,
  IMPORT_AUTH_FILE_SUCCESS,
  RESET_CONTAINER,
  SAVE_ENTITIES,
  SAVE_ENTITIES_ERROR,
  SAVE_ENTITIES_SUCCESS,
  TOGGLE_SCREEN,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function importFile(project, data) {
  return {
    type: IMPORT_FILE,
    project,
    data,
  };
}

export function importFileError(error) {
  return {
    type: IMPORT_FILE_ERROR,
    error,
  };
}

export function importFileSuccess(response) {
  return {
    type: IMPORT_FILE_SUCCESS,
    response,
  };
}

export function importAuthFile(project, data) {
  return {
    type: IMPORT_AUTH_FILE,
    project,
    data,
  };
}

export function importAuthFileError(error) {
  return {
    type: IMPORT_AUTH_FILE_ERROR,
    error,
  };
}

export function importAuthFileSuccess(response) {
  return {
    type: IMPORT_AUTH_FILE_SUCCESS,
    response,
  };
}

export function saveEntities(project, data) {
  return {
    type: SAVE_ENTITIES,
    project,
    data,
  };
}

export function saveEntitiesError(error) {
  return {
    type: SAVE_ENTITIES_ERROR,
    error,
  };
}

export function saveEntitiesSuccess(response) {
  return {
    type: SAVE_ENTITIES_SUCCESS,
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
