/*
 *
 * Project actions
 *
 */

import {
  RESET_CONTAINER,
  REVIEW_MARKETING,
  REVIEW_MARKETING_ERROR,
  REVIEW_MARKETING_SUCCESS,
  SAVE_MARKETING,
  SAVE_MARKETING_ERROR,
  SAVE_MARKETING_SUCCESS,
  TOGGLE_SCREEN,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function saveMarketing(ProyectoID, values) {
  return {
    type: SAVE_MARKETING,
    values,
    ProyectoID,
  };
}

export function saveMarketingError(error) {
  return {
    type: SAVE_MARKETING_ERROR,
    error,
  };
}

export function saveMarketingSuccess(response) {
  return {
    type: SAVE_MARKETING_SUCCESS,
    response,
  };
}

export function reviewMarketing(ProyectoID, values) {
  return {
    type: REVIEW_MARKETING,
    values,
    ProyectoID,
  };
}

export function reviewMarketingError(error) {
  return {
    type: REVIEW_MARKETING_ERROR,
    error,
  };
}

export function reviewMarketingSuccess(response) {
  return {
    type: REVIEW_MARKETING_SUCCESS,
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
