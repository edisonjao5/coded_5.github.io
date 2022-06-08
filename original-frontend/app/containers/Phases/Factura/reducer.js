/*
 *
 * Offer reducer
 *
 */
import produce from 'immer';
import {
  PAID_FACTURA,
  PAID_FACTURA_ERROR,
  PAID_FACTURA_SUCCESS,
  RESET_CONTAINER,
  RESUME_FACTURA,
  RESUME_FACTURA_ERROR,
  RESUME_FACTURA_SUCCESS,
} from './constants';

export const initialState = {
  loading: {},
  error: {},
  success: {},
};
/* eslint-disable default-case, no-param-reassign */
const offerGarantiaReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case RESUME_FACTURA:
      case PAID_FACTURA:
        draft.loading[action.factura.FacturaID] = true;
        draft.error[action.factura.FacturaID] = false;
        draft.success[action.factura.FacturaID] = false;
        break;
      case RESUME_FACTURA_ERROR:
      case PAID_FACTURA_ERROR:
        draft.loading[action.factura.FacturaID] = false;
        draft.error[action.factura.FacturaID] = action.error;
        break;
      case RESUME_FACTURA_SUCCESS:
        draft.loading[action.factura.FacturaID] = false;
        draft.error[action.factura.FacturaID] = false;
        draft.success[action.factura.FacturaID] = false;
        break;
      case PAID_FACTURA_SUCCESS:
        draft.loading[action.factura.FacturaID] = false;
        draft.error[action.factura.FacturaID] = false;
        draft.success[action.factura.FacturaID] =
          action.response.factura.FacturaState;
        break;
    }
  });

export default offerGarantiaReducer;
