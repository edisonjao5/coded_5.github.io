/*
 *
 * Cheque actions
 *
 */

import {
  GENERATE_CHEQUE,
  GENERATE_CHEQUE_ERROR,
  GENERATE_CHEQUE_SUCCESS,
  RESET_CONTAINER,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function generateCheque(cheques) {
  return {
    type: GENERATE_CHEQUE,
    cheques,
  };
}

export function generateChequeError(error) {
  return {
    type: GENERATE_CHEQUE_ERROR,
    error,
  };
}

export function generateChequeSuccess(response) {
  return {
    type: GENERATE_CHEQUE_SUCCESS,
    response,
  };
}
