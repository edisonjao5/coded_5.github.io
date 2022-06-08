/*
 *
 * ProjectList reducer
 *
 */
import produce from 'immer';
import {
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  FILTER_ENTITIES,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  originEntities: false,
  entities: false,
};

/* eslint-disable default-case, no-param-reassign */
const projectListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_ENTITIES:
        draft.loading = true;
        draft.error = false;
        draft.entities = false;
        break;
      case FETCH_ENTITIES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_ENTITIES_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.entities = action.entities;
        draft.originEntities = action.entities;
        break;
      case FILTER_ENTITIES:
        draft.entities = (state.originEntities || [])
          .filter(
            project =>
              !(
                action.query.txtSearch &&
                !project.Name.toLowerCase().includes(
                  action.query.txtSearch.toLowerCase(),
                )
              ),
          )
          .sort((a, b) => {
            switch (action.query.sort) {
              case 'name asc':
                if (a.Name > b.Name) return -1;
                if (a.Name < b.Name) return 1;
                return 0;
              case 'name desc':
                if (a.Name > b.Name) return 1;
                if (a.Name < b.Name) return -1;
                return 0;
              default:
                return 0;
            }
          });
        break;
    }
  });

export default projectListReducer;
