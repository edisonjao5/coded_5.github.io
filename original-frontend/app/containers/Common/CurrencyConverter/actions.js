/*
 *
 * CurrencyConverter actions
 *
 */

import {
  CONVERT_ACTION,
  CONVERT_ACTION_ERROR,
  CONVERT_ACTION_SUCCESS,
  UPDATE_CONVERTS,
} from './constants';

export function convertAction(values) {
  return {
    type: CONVERT_ACTION,
    values,
  };
}

export function convertActionError(error) {
  return {
    type: CONVERT_ACTION_ERROR,
    error,
  };
}

export function convertActionSuccess(response) {
  return {
    type: CONVERT_ACTION_SUCCESS,
    response,
  };
}

export function updateConverts(converts) {
  return {
    type: UPDATE_CONVERTS,
    converts,
  };
}
