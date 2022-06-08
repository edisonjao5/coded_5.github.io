import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_HISTORIES } from './constants';
import { fetchHistoriesError, fetchHistoriesSuccess } from './actions';

function* fetchHistories(action) {
  try {
    const histories = yield call(
      request,
      `${API_ROOT}/ventas/logs-vendedores/?q=${action.UserID}`,
    );
    yield put(fetchHistoriesSuccess(histories));
  } catch (error) {
    yield put(fetchHistoriesError(error));
  }
}

export default function* historySellerSaga() {
  yield takeLatest(FETCH_HISTORIES, fetchHistories);
}
