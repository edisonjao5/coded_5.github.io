import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_RESERVATIONS } from './constants';
import { fetchReservationsError, fetchReservationsSuccess } from './actions';

export function* sagaFetchReservations(action) {
  const requestURL = `${API_ROOT}/ventas/reservas/?q=${action.projectId}`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchReservationsSuccess(response));
  } catch (error) {
    yield put(fetchReservationsError(error));
  }
}

export default function* reservationSaga() {
  yield takeLatest(FETCH_RESERVATIONS, sagaFetchReservations);
}
