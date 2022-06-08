import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { DO_LOGIN } from './constants';
import { doLoginError, doLoginSuccess } from './actions';

export function* getUser(auth) {
  const requestURL = `${API_ROOT}/user-profiles/${auth.user_id}/`;
  try {
    const user = yield call(request, requestURL, {
      headers: {
        Authorization: `Token ${auth.token}`,
      },
    });
    return user;
  } catch (error) {
    yield put(doLoginError(error));
    return false;
  }
}

export function* login(action) {
  const { credentials } = action;
  const requestURL = `${API_ROOT}/login/`;
  try {
    const auth = yield call(request, requestURL, {
      method: 'post',
      body: JSON.stringify({
        rut: credentials.username.replace(/\s/g, ''),
        password: credentials.password,
      }),
    });
    const user = yield call(getUser, auth);
    if (user) {
      yield put(doLoginSuccess({ ...auth, user }, credentials.remember));
    }
  } catch (error) {
    yield put(doLoginError(error));
  }
}

// Individual exports for testing
export default function* authSaga() {
  yield takeLatest(DO_LOGIN, login);
}
