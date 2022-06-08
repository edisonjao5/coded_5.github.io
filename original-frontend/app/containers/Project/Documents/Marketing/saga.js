import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT, PROYECTO_DOCUMENT_STATE } from 'containers/App/constants';
import { updateProject, updateDocumentProject } from '../../Init/actions';
import { REVIEW_MARKETING, SAVE_MARKETING } from './constants';
import {
  reviewMarketingError,
  reviewMarketingSuccess,
  saveMarketingError,
  saveMarketingSuccess,
} from './actions';

function* sagaSaveProject(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos/${
    action.ProyectoID
  }/marketing/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'put',
      body: action.values,
      headers: {
        'content-type': null,
      },
    });
    yield put(saveMarketingSuccess(response));
    const { documentos } = response;
    yield put(
      updateProject({
        Documentos: documentos,
        PlanMediosState: PROYECTO_DOCUMENT_STATE[1],
      }),
    );
  } catch (error) {
    yield put(saveMarketingError(error));
  }
}

function* sagaReview(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos/${
    action.ProyectoID
  }/review_document/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(reviewMarketingSuccess(response));
    yield put(updateDocumentProject(response));
  } catch (error) {
    yield put(reviewMarketingError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(SAVE_MARKETING, sagaSaveProject);
  yield takeLatest(REVIEW_MARKETING, sagaReview);
}
