/*
 *
 * Project reducer
 *
 */
import produce from 'immer';
import {
  RESET_CONTAINER,
  SAVE_PROJECT,
  SAVE_PROJECT_ERROR,
  SAVE_PROJECT_SUCCESS,
  TOGGLE_SCREEN,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  screen: 'view',
};

/* eslint-disable default-case, no-param-reassign */
const polizaReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case SAVE_PROJECT:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case SAVE_PROJECT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_PROJECT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.screen = 'view';
        draft.success = action.response.detail;
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

export default polizaReducer;
