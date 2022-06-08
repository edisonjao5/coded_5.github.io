import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_PROMESAS } from './constants';
import { fetchPromesasError, fetchPromesasSuccess } from './actions';

export function* sagaFetchPromesas(action) {
  const requestURL = `${API_ROOT}/ventas/promesas/?q=${action.projectId}`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchPromesasSuccess(response));
  } catch (error) {
    yield put(fetchPromesasError(error));
  }
}

export default function* promesaSaga() {
  yield takeLatest(FETCH_PROMESAS, sagaFetchPromesas);
}
