/*
 *
 * GeneralApprove actions
 *
 */

import {
  GENERAL_APPROVE,
  GENERAL_APPROVE_ERROR,
  GENERAL_APPROVE_SUCCESS,
  RESET_CONTAINER,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function generalApprove(values) {
  return {
    type: GENERAL_APPROVE,
    values,
  };
}

export function generalApproveError(error) {
  return {
    type: GENERAL_APPROVE_ERROR,
    error,
  };
}

export function generalApproveSuccess(response) {
  return {
    type: GENERAL_APPROVE_SUCCESS,
    response,
  };
}
