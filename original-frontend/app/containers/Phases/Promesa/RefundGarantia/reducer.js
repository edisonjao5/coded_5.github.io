/*
 *
 * Offer reducer
 *
 */
import produce from 'immer';
import {
  RESET_CONTAINER,
  REFUND_GRANTIA,
  REFUND_GRANTIA_ERROR,
  REFUND_GRANTIA_SUCCESS,
} from './constants';

export const initialState = {
  loading: {},
  error: {},
  success: {},
};
/* eslint-disable default-case, no-param-reassign */
const promesaRefundGarantiaReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case REFUND_GRANTIA:
        draft.loading[action.PromesaID] = true;
        draft.error[action.PromesaID] = false;
        draft.success[action.PromesaID] = false;
        break;
      case REFUND_GRANTIA_ERROR:
        draft.loading[action.PromesaID] = false;
        draft.error[action.PromesaID] = action.error;
        break;
      case REFUND_GRANTIA_SUCCESS:
        draft.loading[action.PromesaID] = false;
        draft.error[action.PromesaID] = false;
        draft.success[action.PromesaID] = action.response.detail;
        break;
    }
  });

export default promesaRefundGarantiaReducer;
