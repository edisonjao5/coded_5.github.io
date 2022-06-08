import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import moment from 'components/moment';

import { API_ROOT } from 'containers/App/constants';
import {
  GET_PROMESA,
  UPLOAD_CONFECCION_PROMESA,
  REJECT_CONFECCION_PROMESA,
  APPROVE_UPLOAD_CONFECCION_PROMESA,
  CONTROL_PROMESA,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA,
  SEND_PROMESA_TO_IN,
  SIGN_IN,
  LEGALIZE,
  SEND_COPY,
  SEND_TO_REVIEW_NEGOCIACION,
  REVIEW_NEGOCIACION,
  CONTROL_NEGOCIACION,
  GENERATE_FACTURA,
  SEND_PROMESA_TO_CLIENTE,
} from './constants';
import {
  getPromesaError,
  getPromesaSuccess,
  uploadConfeccionPromesaError,
  uploadConfeccionPromesaSuccess,
  rejectConfeccionPromesaError,
  rejectConfeccionPromesaSuccess,
  approveUploadConfeccionPromesaSuccess,
  approveUploadConfeccionPromesaError,
  controlPromesaSuccess,
  controlPromesaError,
  uploadFirmaDocumentsPromesaSuccess,
  uploadFirmaDocumentsPromesaError,
  sendPromesaToInSuccess,
  sendPromesaToInError,
  signInError,
  signInSuccess,
  legalizeSuccess,
  legalizeError,
  sendCopySuccess,
  sendCopyError,
  sendToReviewNegociacionSuccess,
  sendToReviewNegociacionError,
  reviewNegociacionSuccess,
  reviewNegociacionError,
  controlNegociacionSuccess,
  controlNegociacionError,
  generateFacturaSuccess,
  generateFacturaError,
  sendPromesaToClienteSuccess,
  sendPromesaToClienteError,
} from './actions';

function* sagaGetPromesa(action) {
  const requestURL = `${API_ROOT}/ventas/promesas/${action.PromesaID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getPromesaSuccess(response));
  } catch (error) {
    yield put(getPromesaError(error));
  }
}

function* sagaUploadConfeccionPromesa(action) {
  const data = new FormData();
  Object.keys(action.values).forEach(name => {
    if (name === "DocumentPromesa"){
      if (action.values[name].name) data.append(name, action.values[name]);
    } else if (name === "PaymentInstructions"){
      let num = 0;
      action.values[name].forEach((payment, index) =>{
        if((payment.Date !== "") && (payment.Date !== null)){
          num++;
          data.append(`PaymentInstructions.${index}.Date`, moment(payment.Date).format('YYYY-MM-DD'));
          data.append(`PaymentInstructions.${index}.Document`, payment.Document);
        }
      });
      data.append("PaymentNumber", num);
    } else if (action.values[name] !== null)
      data.append(name, action.values[name]);
  });

  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/promesas-upload-confeccion-promesa/${
        action.PromesaID
      }/`,
      {
        method: 'PATCH',
        body: data,
        headers: {
          'content-type': null,
        },
      },
    );

    yield put(uploadConfeccionPromesaSuccess(response));
  } catch (error) {
    yield put(uploadConfeccionPromesaError(error));
  }
}

function* sagaRejectConfeccionPromesa(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/promesas/${action.PromesaID}/`,
      {
        method: 'PATCH',
        body: JSON.stringify({'Comment': action.Comment}),
      },
    );

    yield put(rejectConfeccionPromesaSuccess(response));
  } catch (error) {
    yield put(rejectConfeccionPromesaError(error));
  }
}

function* sagaApproveUploadConfeccionPromesa(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-approve-maqueta/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(approveUploadConfeccionPromesaSuccess(response));
  } catch (error) {
    yield put(approveUploadConfeccionPromesaError(error));
  }
}

function* sagaUploadFirmaDocumentsPromesa(action) {
  const data = new FormData();
  Object.keys(action.values).forEach(name => {
    if (action.values[name].name) data.append(name, action.values[name]);
  });
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/promesas-upload-firma-document/${action.PromesaID}/`,
      {
        method: 'PATCH',
        body: data,
        headers: {
          'content-type': null,
        },
      },
    );

    yield put(uploadFirmaDocumentsPromesaSuccess(response));
  } catch (error) {
    yield put(uploadFirmaDocumentsPromesaError(error));
  }
}

function* sagaApproveControlPromesa(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-approve-control/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(controlPromesaSuccess(response));
  } catch (error) {
    yield put(controlPromesaError(error));
  }
}

function* sagaSendPromesaToIn(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-register-send/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(sendPromesaToInSuccess(response));
  } catch (error) {
    yield put(sendPromesaToInError(error));
  }
}

function* sagaSendPromesaToCliente(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-send-to-cliente/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(sendPromesaToClienteSuccess(response));
  } catch (error) {
    yield put(sendPromesaToClienteError(error));
  }
}

function* sagaSignIn(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-register-signature/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(signInSuccess(response));
  } catch (error) {
    yield put(signInError(error));
  }
}

function* sagaLegalize(action) {
  try {
    const { values } = action;
    const data = new FormData();
    if(values['FileLegalizacionPromesa'].name)
      data.append("FileLegalizacionPromesa", values['FileLegalizacionPromesa']);
    data.append("DateLegalizacionPromesa", values['DateLegalizacionPromesa']);

    const requestURL = `${API_ROOT}/ventas/promesas-legalize/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: data,
      headers: {
        'content-type': null,
      },
    });
    yield put(legalizeSuccess(response));
  } catch (error) {
    yield put(legalizeError(error));
  }
}

function* sagaSendCopy(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-send-copies/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(sendCopySuccess(response));
  } catch (error) {
    yield put(sendCopyError(error));
  }
}

function* sagaSendToReviewNegociacion(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-send-negociacion-to-jp/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(sendToReviewNegociacionSuccess(response));
  } catch (error) {
    yield put(sendToReviewNegociacionError(error));
  }
}

function* sagaReviewNegociacion(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-send-negociacion-to-in/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(reviewNegociacionSuccess(response));
  } catch (error) {
    yield put(reviewNegociacionError(error));
  }
}

function* sagaControlNegociacion(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-control-negociacion/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(controlNegociacionSuccess(response));
  } catch (error) {
    yield put(controlNegociacionError(error));
  }
}

function* sagaGenerateFactura(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-generate-factura/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(generateFacturaSuccess(response));
  } catch (error) {
    yield put(generateFacturaError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(GET_PROMESA, sagaGetPromesa);
  yield takeLatest(UPLOAD_CONFECCION_PROMESA, sagaUploadConfeccionPromesa);
  yield takeLatest(REJECT_CONFECCION_PROMESA, sagaRejectConfeccionPromesa);
  yield takeLatest(
    APPROVE_UPLOAD_CONFECCION_PROMESA,
    sagaApproveUploadConfeccionPromesa,
  );
  yield takeLatest(
    UPLOAD_FIRMA_DOCUMENTS_PROMESA,
    sagaUploadFirmaDocumentsPromesa,
  );
  yield takeLatest(CONTROL_PROMESA, sagaApproveControlPromesa);
  yield takeLatest(SEND_PROMESA_TO_IN, sagaSendPromesaToIn);
  yield takeLatest(SEND_PROMESA_TO_CLIENTE, sagaSendPromesaToCliente);
  yield takeLatest(SIGN_IN, sagaSignIn);
  yield takeLatest(LEGALIZE, sagaLegalize);
  yield takeLatest(SEND_COPY, sagaSendCopy);
  yield takeLatest(SEND_TO_REVIEW_NEGOCIACION, sagaSendToReviewNegociacion);
  yield takeLatest(REVIEW_NEGOCIACION, sagaReviewNegociacion);
  yield takeLatest(CONTROL_NEGOCIACION, sagaControlNegociacion);
  yield takeLatest(GENERATE_FACTURA, sagaGenerateFactura);
}
