/*
 *
 * Project actions
 *
 */

import {
  RESET_CONTAINER,
  SAVE_PROJECT,
  SAVE_PROJECT_ERROR,
  SAVE_PROJECT_SUCCESS,
  TOGGLE_SCREEN,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function saveProject(newValues) {
  const values = { ...newValues };
  if (values.UsersProyecto)
    values.UsersProyecto = values.UsersProyecto.map(user => ({
      ...user,
      UserProyectoType: user.UserProyectoType || user.UserProyectoTypeID,
    }));
  return {
    type: SAVE_PROJECT,
    values,
  };
}

export function saveProjectError(error) {
  return {
    type: SAVE_PROJECT_ERROR,
    error,
  };
}

export function saveProjectSuccess(response) {
  return {
    type: SAVE_PROJECT_SUCCESS,
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
