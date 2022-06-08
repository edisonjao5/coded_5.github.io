import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_LOGS } from './constants';
import { fetchLogsError, fetchLogsSuccess } from './actions';

export function* fetchProjectLogs(action) {
  try {
    const logs = yield call(
      request,
      `${API_ROOT}/empresas-proyectos/proyectos-logs/?q=${action.ProyectoID}`,
    );
    yield put(fetchLogsSuccess(logs));
  } catch (error) {
    yield put(fetchLogsError(error));
  }
}

export default function* projectLogSaga() {
  yield takeLatest(FETCH_LOGS, fetchProjectLogs);
}
