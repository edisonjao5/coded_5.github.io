/*
 *
 * Promesa actions
 *
 */

import {
  RESUME_FACTURA,
  RESUME_FACTURA_ERROR,
  RESUME_FACTURA_SUCCESS,
  RESET_CONTAINER,
  PAID_FACTURA,
  PAID_FACTURA_ERROR,
  PAID_FACTURA_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}
export function resumeFactura(factura, noteCredit = false) {
  return {
    type: RESUME_FACTURA,
    factura,
    noteCredit,
  };
}

export function resumeFacturaError(factura, error) {
  return {
    type: RESUME_FACTURA_ERROR,
    error,
    factura,
  };
}

export function resumeFacturaSuccess(factura, response) {
  return {
    type: RESUME_FACTURA_SUCCESS,
    response,
    factura,
  };
}

export function paidFactura(factura, noteCredit = false) {
  return {
    type: PAID_FACTURA,
    factura,
    noteCredit,
  };
}

export function paidFacturaError(factura, error) {
  return {
    type: PAID_FACTURA_ERROR,
    error,
    factura,
  };
}

export function paidFacturaSuccess(factura, response) {
  return {
    type: PAID_FACTURA_SUCCESS,
    response,
    factura,
  };
}
