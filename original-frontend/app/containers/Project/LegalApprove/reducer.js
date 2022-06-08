/*
 *
 * LegalApprove reducer
 *
 */
import produce from 'immer';
import {
  LEGAL_APPROVE,
  LEGAL_APPROVE_ERROR,
  LEGAL_APPROVE_SUCCESS,
  RESET_CONTAINER,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const legalApproveReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case LEGAL_APPROVE:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case LEGAL_APPROVE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case LEGAL_APPROVE_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        break;
    }
  });

export default legalApproveReducer;
