/*
 *
 * Project reducer
 *
 */
import produce from 'immer';
import {
  REVIEW_MARKETING,
  REVIEW_MARKETING_ERROR,
  REVIEW_MARKETING_SUCCESS,
  SAVE_MARKETING,
  SAVE_MARKETING_ERROR,
  SAVE_MARKETING_SUCCESS,
  TOGGLE_SCREEN,
  RESET_CONTAINER,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  screen: 'view',
};

/* eslint-disable default-case, no-param-reassign */
const marketingReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case SAVE_MARKETING:
      case REVIEW_MARKETING:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case SAVE_MARKETING_ERROR:
      case REVIEW_MARKETING_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_MARKETING_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        break;
      case REVIEW_MARKETING_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = 'Exitosa';
        break;
      case TOGGLE_SCREEN:
        if (action.refresh) {
          return {
            ...initialState,
            screen: action.screen,
          };
        }
        draft.screen = action.screen;
        break;
    }
  });

export default marketingReducer;
