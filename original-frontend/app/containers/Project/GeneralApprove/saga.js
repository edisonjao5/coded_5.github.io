import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { fetchProjectLogs } from 'containers/Common/ProjectLog/saga';
import { updateProject } from '../Init/actions';
import { GENERAL_APPROVE } from './constants';
import { generalApproveError, generalApproveSuccess } from './actions';

function* sagaGeneralApprove(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos-approve-gerencia/${
    action.values.ProyectoID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield call(fetchProjectLogs, { ProyectoID: action.values.ProyectoID });
    const project = yield call(
      request,
      `${API_ROOT}/empresas-proyectos/proyectos/${action.values.ProyectoID}/`,
    );
    yield put(generalApproveSuccess(response));
    yield put(updateProject(project));
  } catch (error) {
    yield put(generalApproveError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(GENERAL_APPROVE, sagaGeneralApprove);
}
