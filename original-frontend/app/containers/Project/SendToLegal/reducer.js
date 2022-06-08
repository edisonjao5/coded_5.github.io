/*
 *
 * SendToLegal reducer
 *
 */
import produce from 'immer';
import {
  RESET_CONTAINER,
  SEND_TO_LEGAL,
  SEND_TO_LEGAL_ERROR,
  SEND_TO_LEGAL_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const sendToLegalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case SEND_TO_LEGAL:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case SEND_TO_LEGAL_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SEND_TO_LEGAL_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        break;
    }
  });

export default sendToLegalReducer;
