import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT, PROYECTO_DOCUMENT_STATE } from 'containers/App/constants';
import { updateProject, updateDocumentProject } from '../../Init/actions';
import { APPROVE_DOCUMENTS, SAVE_ENTITY, REVIEW_ENTITY } from './constants';
import {
  approveDocumentsError,
  approveDocumentsSuccess,
  saveEntityError,
  saveEntitySuccess,
  reviewEntityError,
  reviewEntitySuccess,
} from './actions';

function* sagaSaveProject(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos/${
    action.ProyectoID
  }/legal/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'put',
      body: action.values,
      headers: {
        'content-type': null,
      },
    });
    yield put(saveEntitySuccess(response));
    const { documentos } = response;
    const noNull = Object.keys(documentos).find(docType => !documentos[docType]);
    const flag = !noNull ? true: (noNull === "title_folder") ? !action.entregaInmediata : false;
  
    if ( flag && Object.keys(documentos).find(
          docType => (documentos[docType] && documentos[docType].no_existed) || 
                     (!action.entregaInmediata && docType==="title_folder")
          )
    ) {
      yield call(
        request,
        `${API_ROOT}/empresas-proyectos/proyectos-add-borrador/${
          action.ProyectoID
        }/`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            Resolution: true,
          }),
        },
      );
    }
    yield put(
      updateProject({
        Documentos: documentos,
        BorradorPromesaState: PROYECTO_DOCUMENT_STATE[1],
      }),
    );
  } catch (error) {
    yield put(saveEntityError(error));
  }
}

function* sagaApproveDocuments(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos-add-borrador/${
    action.ProyectoID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify({
        Resolution: action.Resolution,
      }),
    });
    yield put(approveDocumentsSuccess(response));
    yield put(updateProject(response.proyecto));
  } catch (error) {
    yield put(approveDocumentsError(error));
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
    yield put(reviewEntitySuccess(response));
    yield put(updateDocumentProject(response));
  } catch (error) {
    yield put(reviewEntityError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(SAVE_ENTITY, sagaSaveProject);
  yield takeLatest(APPROVE_DOCUMENTS, sagaApproveDocuments);
  yield takeLatest(REVIEW_ENTITY, sagaReview);
}
