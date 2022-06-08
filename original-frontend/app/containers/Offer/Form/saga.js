import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { sagaUploadVentasDocument } from 'containers/Reservation/Form/saga';
import {
  GET_OFFER,
  CONFIRM,
  APPROVE_IN,
  APPROVE_CONFECCION_PROMESA,
  DELETE_OFFER,
  SAVE_OFFER,
  APPROVE_MODIFY,
  WITHDRAW_OFFER,
} from './constants';
import {
  approveInError,
  approveInSuccess,
  approveConfeccionPromesaError,
  approveConfeccionPromesaSuccess,
  confirmError,
  confirmSuccess,
  getOfferError,
  getOfferSuccess,
  deleteOfferSuccess,
  deleteOfferError,
  saveOfferSuccess,
  saveOfferError,
  withdrawOfferSuccess,
  withdrawOfferError,
} from './actions';

function* getOffer(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas/${action.OfertaID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getOfferSuccess(response));
  } catch (error) {
    yield put(getOfferError(error));
  }
}

function* sagaConfirm(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas-send-control/${
    action.values.OfertaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(confirmSuccess(response));
  } catch (error) {
    yield put(confirmError(error));
  }
}

function* sagaApproveIn(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas-inmobiliarias-approve-control/${
    action.values.OfertaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(approveInSuccess(response));
  } catch (error) {
    yield put(approveInError(error));
  }
}

function* sagaApproveLegal(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas-approve-confeccion-promesa/${
    action.values.OfertaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(approveConfeccionPromesaSuccess(response));
  } catch (error) {
    yield put(approveConfeccionPromesaError(error));
  }
}

function* sagaDeleteOffer(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas-cancel/${
    action.values.OfertaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify({Comment: action.values.Comment}),
    });
    yield put(deleteOfferSuccess(response));
  } catch (error) {
    yield put(deleteOfferError(error));
  }
}

function* sagaSaveOffer(action) {
  try {
    const { values, documents = false } = action;

    const requestURL = `${API_ROOT}/ventas/ofertas/${values.OfertaID}/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify({...values, Comment:documents.Comment}),
    });
    if (documents) {
      const resDocuments = yield call(sagaUploadVentasDocument, documents);
      response.oferta.Documents = resDocuments.documentos;
    }
    yield put(saveOfferSuccess(response));
  } catch (error) {
    yield put(saveOfferError(error));
  }
}

function* sagaApproveModifyOffer(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/ofertas-approve-modificar/${
      values.OfertaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    if (values.isSendToIN) {
      yield call(
        request,
        `${API_ROOT}/ventas/ofertas-send-control/${action.values.OfertaID}/`,
        {
          method: 'PATCH',
          body: JSON.stringify({ Conditions: [] }),
        },
      );
    }
    yield put(saveOfferSuccess(response));
  } catch (error) {
    yield put(saveOfferError(error));
  }
}

function* sagaWithdrawOffer(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/ofertas-withdraw/${
      values.OfertaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    
    yield put(withdrawOfferSuccess(response));
  } catch (error) {
    yield put(withdrawOfferError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(CONFIRM, sagaConfirm);
  yield takeLatest(APPROVE_IN, sagaApproveIn);
  yield takeLatest(APPROVE_CONFECCION_PROMESA, sagaApproveLegal);
  yield takeLatest(GET_OFFER, getOffer);
  yield takeLatest(DELETE_OFFER, sagaDeleteOffer);
  yield takeLatest(SAVE_OFFER, sagaSaveOffer);
  yield takeLatest(APPROVE_MODIFY, sagaApproveModifyOffer);
  yield takeLatest(WITHDRAW_OFFER, sagaWithdrawOffer);
}
