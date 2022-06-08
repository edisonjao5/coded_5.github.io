/*
 *
 * Project actions
 *
 */

import {
  FETCH_PROJECT,
  FETCH_PROJECT_ERROR,
  FETCH_PROJECT_SUCCESS,
  RESET_PROJECT,
  UPDATE_DOCUMENT_PROJECT,
  UPDATE_PROJECT,
  GENERAL_REVIEW,
} from './constants';

export function resetProject() {
  return {
    type: RESET_PROJECT,
  };
}

export function fetchProject(id) {
  return {
    type: FETCH_PROJECT,
    id,
  };
}

export function fetchProjectError(error) {
  return {
    type: FETCH_PROJECT_ERROR,
    error,
  };
}

export function fetchProjectSuccess(project) {
  return {
    type: FETCH_PROJECT_SUCCESS,
    project,
  };
}

export function updateProject(values) {
  return {
    type: UPDATE_PROJECT,
    values,
  };
}

export function updateDocumentProject(documents) {
  return {
    type: UPDATE_DOCUMENT_PROJECT,
    documents,
  };
}

export function generalReview(reviews) {
  return {
    type: GENERAL_REVIEW,
    reviews,
  };
}
