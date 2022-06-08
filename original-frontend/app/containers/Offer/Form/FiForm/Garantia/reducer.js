/*
 *
 * Offer reducer
 *
 */
import produce from 'immer';
import {
  RESET_CONTAINER,
  RECEPCION_GRANTIA,
  RECEPCION_GRANTIA_ERROR,
  RECEPCION_GRANTIA_SUCCESS,
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
      case RECEPCION_GRANTIA:
        draft.loading[action.OfertaID] = true;
        draft.error[action.OfertaID] = false;
        draft.success[action.OfertaID] = false;
        break;
      case RECEPCION_GRANTIA_ERROR:
        draft.loading[action.OfertaID] = false;
        draft.error[action.OfertaID] = action.error;
        break;
      case RECEPCION_GRANTIA_SUCCESS:
        draft.loading[action.OfertaID] = false;
        draft.error[action.OfertaID] = false;
        draft.success[action.OfertaID] = action.response.detail;
        break;
    }
  });

export default offerGarantiaReducer;
