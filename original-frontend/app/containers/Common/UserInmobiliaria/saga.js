import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_USER_INMOBILIARIAS } from './constants';
import { fetchUsersError, fetchUsersSuccess } from './actions';

export function* fetchUserInmobiliarias(action) {
  try {
    const [aprobadores, representantes] = yield all([
      call(
        request,
        `${API_ROOT}/inmobiliarias-aprobadores/?q=${action.InmobiliariaID}`,
      ),
      call(
        request,
        `${API_ROOT}/inmobiliarias-representantes/?q=${action.InmobiliariaID}`,
      ),
    ]);
    yield put(
      fetchUsersSuccess({
        [action.InmobiliariaID]: { aprobadores, representantes },
      }),
    );
  } catch (error) {
    yield put(fetchUsersError(error));
  }
}

export default function* userInmobiliariasSaga() {
  yield takeLatest(FETCH_USER_INMOBILIARIAS, fetchUserInmobiliarias);
}
