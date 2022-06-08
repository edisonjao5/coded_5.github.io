/*
 *
 * Cheque reducer
 *
 */
import produce from 'immer';
import {
  GENERATE_CHEQUE,
  GENERATE_CHEQUE_ERROR,
  GENERATE_CHEQUE_SUCCESS,
  RESET_CONTAINER,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  files: false,
};

/* eslint-disable default-case, no-param-reassign */
const chequeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GENERATE_CHEQUE:
        draft.loading = true;
        draft.error = false;
        draft.file = false;
        break;
      case GENERATE_CHEQUE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case GENERATE_CHEQUE_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.files = action.response;
        break;
      case RESET_CONTAINER:
        return initialState;
    }
  });

export default chequeReducer;
