import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT, PROYECTO_APPROVAL_STATE } from 'containers/App/constants';
import { fetchProjectLogs } from 'containers/Common/ProjectLog/saga';
import { updateProject } from '../Init/actions';
import { LEGAL_APPROVE } from './constants';
import { legalApproveError, legalApproveSuccess } from './actions';

function* sagaLegalApprove(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos-approve-legal/${
    action.values.ProyectoID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    const project = yield call(
      request,
      `${API_ROOT}/empresas-proyectos/proyectos/${action.values.ProyectoID}/`,
    );
    yield call(fetchProjectLogs, { ProyectoID: action.values.ProyectoID });

    yield put(legalApproveSuccess(response));
    yield put(updateProject(project));
  } catch (error) {
    yield put(legalApproveError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(LEGAL_APPROVE, sagaLegalApprove);
}
