/*
 *
 * Credit actions
 *
 */

import {
  RESET_CONTAINER,
  FETCH_IF,
  FETCH_IF_ERROR,
  FETCH_IF_SUCCESS,
  REGISTER_IF,
  REGISTER_IF_ERROR,
  REGISTER_IF_SUCCESS,
  REGISTER_SELECT_IF_ERROR,
  REGISTER_SELECT_IF_SUCCESS,
  REGISTER_SELECT_IF,
  DOWNLOAD_PRE_APPROBATION
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}
export function fetchIF(EntityID) {
  return {
    type: FETCH_IF,
    EntityID,
  };
}

export function fetchIFError(error) {
  return {
    type: FETCH_IF_ERROR,
    error,
  };
}

export function fetchIFSuccess(response) {
  return {
    type: FETCH_IF_SUCCESS,
    response,
  };
}

export function registerIF(values) {
  return {
    type: REGISTER_IF,
    values,
  };
}

export function registerIFError(error) {
  return {
    type: REGISTER_IF_ERROR,
    error,
  };
}

export function registerIFSuccess(response) {
  return {
    type: REGISTER_IF_SUCCESS,
    response,
  };
}

export function registerSelectIF(values) {
  return {
    type: REGISTER_SELECT_IF,
    values,
  };
}

export function registerSelectIFError(error) {
  return {
    type: REGISTER_SELECT_IF_ERROR,
    error,
  };
}

export function registerSelectIFSuccess(response) {
  return {
    type: REGISTER_SELECT_IF_SUCCESS,
    response,
  };
}

export function downloadPreApprobation(values) {
  return {
    type: DOWNLOAD_PRE_APPROBATION,
    values,
  };
}
