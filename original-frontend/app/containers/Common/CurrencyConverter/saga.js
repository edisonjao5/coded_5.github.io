import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { CONVERT_ACTION } from './constants';
import { convertActionError, convertActionSuccess } from './actions';

function* convertAction(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/uf-de/`,
      {
        method: 'POST',
        body: JSON.stringify(action.values),
      }
    );
    yield put(convertActionSuccess(response));
  } catch (error) {
    yield put(convertActionError(error));
  }
}

export default function* historySellerSaga() {
  yield takeLatest(CONVERT_ACTION, convertAction);
}
