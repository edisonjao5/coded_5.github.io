/*
 *
 * Quotation actions
 *
 */

import {
  QUERY_QUOTATIONS,
  FETCH_QUOTATIONS,
  FETCH_QUOTATIONS_ERROR,
  FETCH_QUOTATIONS_SUCCESS,
  RESET_CONTAINER,
  SEARCH_QUOTATIONS,
  TOGGLE_QUOTATION_FORM,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function toggleQuotationForm(toggle) {
  return {
    type: TOGGLE_QUOTATION_FORM,
    toggle,
  };
}

export function queryQuotations(query) {
  return {
    type: QUERY_QUOTATIONS,
    query,
  };
}

export function searchQuotations(filter) {
  return {
    type: SEARCH_QUOTATIONS,
    filter,
  };
}

export function fetchQuotations(projectId) {
  return {
    type: FETCH_QUOTATIONS,
    projectId,
  };
}

export function fetchQuotationsError(error) {
  return {
    type: FETCH_QUOTATIONS_ERROR,
    error,
  };
}

export function fetchQuotationsSuccess(quotations) {
  return {
    type: FETCH_QUOTATIONS_SUCCESS,
    quotations,
  };
}
