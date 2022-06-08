import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_OFFERS } from './constants';
import { fetchOffersError, fetchOffersSuccess } from './actions';

export function* sagaFetchOffers(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas/?q=${action.projectId}`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchOffersSuccess(response));
  } catch (error) {
    yield put(fetchOffersError(error));
  }
}

export default function* offerSaga() {
  yield takeLatest(FETCH_OFFERS, sagaFetchOffers);
}
