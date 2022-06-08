/*
 *
 * PageHeader reducer
 *
 */
import produce from 'immer';
import { SET_PAGE_HEADER } from './constants';

export const initialState = {
  header: false,
  actions: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageHeaderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PAGE_HEADER:
        draft.header = action.header;
        draft.actions = action.actions;
        break;
    }
  });

export default pageHeaderReducer;
