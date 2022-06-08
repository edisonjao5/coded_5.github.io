/*
 *
 * Dashboard saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_ENTITIES, FETCH_LOGS } from './constants';
import { 
  fetchEntitiesError, 
  fetchEntitiesSuccess, 
  fetchLogsSuccess, 
  fetchLogsError 
} from './actions';

function* fetchEntities() {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos/`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchEntitiesSuccess(response));
  } catch (error) {
    yield put(fetchEntitiesError(error));
  }
}

function* fetchLogs() {
  try {
    const pendingActions = yield call(request, `${API_ROOT}/ventas/dashboard-pending-actions/`);
    const allUsers = yield call(request, `${API_ROOT}/ventas/all-users/`);
    const logs = yield call(request, `${API_ROOT}/ventas/all-logs-dashboard/`);

    yield put(fetchLogsSuccess(pendingActions, allUsers, logs));
  } catch (error) {
    yield put(fetchLogsError(error));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(FETCH_ENTITIES, fetchEntities);
  yield takeLatest(FETCH_LOGS, fetchLogs);
}
