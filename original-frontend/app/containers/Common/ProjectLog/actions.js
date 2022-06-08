/*
 *
 * Logs actions
 *
 */

import {
  FETCH_LOGS,
  FETCH_LOGS_ERROR,
  FETCH_LOGS_SUCCESS,
  QUERY_LOGS,
} from './constants';

export function queryLogs(query) {
  return {
    type: QUERY_LOGS,
    query,
  };
}

export function fetchLogs(ProyectoID) {
  return {
    type: FETCH_LOGS,
    ProyectoID,
  };
}

export function fetchLogsError(error) {
  return {
    type: FETCH_LOGS_ERROR,
    error,
  };
}

export function fetchLogsSuccess(logs) {
  return {
    type: FETCH_LOGS_SUCCESS,
    logs,
  };
}
