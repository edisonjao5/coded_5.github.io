/*
 *
 * LegalApprove actions
 *
 */

import {
  LEGAL_APPROVE,
  LEGAL_APPROVE_ERROR,
  LEGAL_APPROVE_SUCCESS,
  RESET_CONTAINER,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function legalApprove(values) {
  return {
    type: LEGAL_APPROVE,
    values,
  };
}

export function legalApproveError(error) {
  return {
    type: LEGAL_APPROVE_ERROR,
    error,
  };
}

export function legalApproveSuccess(response) {
  return {
    type: LEGAL_APPROVE_SUCCESS,
    response,
  };
}
