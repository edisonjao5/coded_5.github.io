/*
 *
 * Project reducer
 *
 */
import produce from 'immer';
import {
  FETCH_PROJECT,
  FETCH_PROJECT_ERROR,
  FETCH_PROJECT_SUCCESS,
  RESET_PROJECT,
  UPDATE_DOCUMENT_PROJECT,
  UPDATE_PROJECT,
  GENERAL_REVIEW,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  project: false,
  reviews: {},
};

/* eslint-disable default-case, no-param-reassign */
const projectReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROJECT:
        draft.loading = true;
        draft.error = false;
        window.project = false;
        break;
      case FETCH_PROJECT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        window.project = false;
        break;
      case FETCH_PROJECT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.project = action.project;
        window.project = action.project;
        break;
      case UPDATE_PROJECT:
        draft.project = {
          ...draft.project,
          ...action.values,
          Documentos: {
            ...(draft.project.Documentos || {}),
            ...(action.values.Documentos || {}),
          },
        };
        window.project = {
          ...state.project,
          ...action.values,
          Documentos: {
            ...(draft.project.Documentos || {}),
            ...(action.values.Documentos || {}),
          },
        };
        break;
      case UPDATE_DOCUMENT_PROJECT:
        draft.project = {
          ...draft.project,
          ...action.values,
          Documentos: Object.keys(draft.project.Documentos).reduce(
            (acc, doc) => {
              if (action.documents[doc])
                acc[doc] = {
                  ...draft.project.Documentos[doc],
                  state: action.documents[doc],
                };
              else acc[doc] = { ...draft.project.Documentos[doc] };
              return acc;
            },
            {},
          ),
        };
        window.project = {
          ...state.project,
          ...action.values,
          Documentos: Object.keys(state.project.Documentos).reduce(
            (acc, doc) => {
              if (action.documents[doc])
                acc[doc] = {
                  ...state.project.Documentos[doc],
                  state: action.documents[doc],
                };
              else acc[doc] = { ...state.project.Documentos[doc] };
              return acc;
            },
            {},
          ),
        };
        break;
      case GENERAL_REVIEW:
        draft.reviews = { ...draft.reviews, ...action.reviews };
        break;
      case RESET_PROJECT:
        return initialState;
    }
  });

export default projectReducer;
