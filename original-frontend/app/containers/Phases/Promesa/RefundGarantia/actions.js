import {
  RESET_CONTAINER,
  REFUND_GRANTIA,
  REFUND_GRANTIA_ERROR,
  REFUND_GRANTIA_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}
export function refundGarantia(PromesaID, refund = false) {
  return {
    type: REFUND_GRANTIA,
    PromesaID,
    refund,
  };
}

export function refundGarantiaError(PromesaID, error) {
  return {
    type: REFUND_GRANTIA_ERROR,
    PromesaID,
    error,
  };
}

export function refundGarantiaSuccess(PromesaID, response) {
  return {
    type: REFUND_GRANTIA_SUCCESS,
    PromesaID,
    response,
  };
}
