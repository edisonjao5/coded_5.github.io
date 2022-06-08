/*
 *
 * GeneralApprove reducer
 *
 */
import produce from 'immer';
import {
  GENERAL_APPROVE,
  GENERAL_APPROVE_ERROR,
  GENERAL_APPROVE_SUCCESS,
  RESET_CONTAINER,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const generalApproveReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GENERAL_APPROVE:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case GENERAL_APPROVE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case GENERAL_APPROVE_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        break;
      case RESET_CONTAINER:
        return initialState;
    }
  });

export default generalApproveReducer;
