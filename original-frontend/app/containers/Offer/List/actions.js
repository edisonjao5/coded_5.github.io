/*
 *
 * Offer actions
 *
 */

import {
  FETCH_OFFERS,
  FETCH_OFFERS_ERROR,
  FETCH_OFFERS_SUCCESS,
  SEARCH_OFFERS,
  QUERY_OFFERS,
} from './constants';

export function searchOffers(filter) {
  return {
    type: SEARCH_OFFERS,
    filter,
  };
}

export function queryOffers(query) {
  return {
    type: QUERY_OFFERS,
    query,
  };
}

export function fetchOffers(projectId) {
  return {
    type: FETCH_OFFERS,
    projectId,
  };
}

export function fetchOffersError(error) {
  return {
    type: FETCH_OFFERS_ERROR,
    error,
  };
}

export function fetchOffersSuccess(offers) {
  return {
    type: FETCH_OFFERS_SUCCESS,
    offers,
  };
}
