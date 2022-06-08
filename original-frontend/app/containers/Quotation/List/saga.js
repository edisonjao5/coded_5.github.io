import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_QUOTATIONS } from './constants';
import { fetchQuotationsError, fetchQuotationsSuccess } from './actions';

export function* sagaFetchQuotations(action) {
  const requestURL = `${API_ROOT}/ventas/cotizaciones-proyectos/?q=${
    action.projectId
  }`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchQuotationsSuccess(response));
  } catch (error) {
    yield put(fetchQuotationsError(error));
  }
}

export default function* quotationSaga() {
  yield takeLatest(FETCH_QUOTATIONS, sagaFetchQuotations);
}
