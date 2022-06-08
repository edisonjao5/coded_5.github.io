/*
 *
 * Reservation actions
 *
 */
import { isObject } from 'lodash';

import moment from 'components/moment';
import {
  GET_RESERVATION,
  GET_RESERVATION_ERROR,
  GET_RESERVATION_SUCCESS,
  SAVE_RESERVATION,
  SAVE_RESERVATION_ERROR,
  SAVE_RESERVATION_SUCCESS,
  GET_QUOTATION,
  GET_QUOTATION_ERROR,
  GET_QUOTATION_SUCCESS,
  UPDATE_RESERVATION,
  RESET_CONTAINER,
  SEND_TO_CONTROL,
  SEND_TO_CONTROL_ERROR,
  SEND_TO_CONTROL_SUCCESS,
  CANCEL_RESERVATION,
  CANCEL_RESERVATION_ERROR,
  CANCEL_RESERVATION_SUCCESS,
  CONTROL_REVIEW,
  CONTROL_REVIEW_ERROR,
  CONTROL_REVIEW_SUCCESS,
  PRINT_DOCUMENTS,
  PRINT_DOCUMENTS_ERROR,
  PRINT_DOCUMENTS_SUCCESS,
  APROVE_MODIFICATION,
  APROVE_MODIFICATION_ERROR,
  APROVE_MODIFICATION_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

const prepareBeforeSave = newValues => {
  const values = { ...newValues };

  if (values.Cliente.IsCompany) {
    delete values.Empleador;
    delete values.CoEmpleador;
    delete values.Codeudor;
  } else {
    delete values.EmpresaCompradora;
  }

  if (!values.CodeudorID) {
    delete values.Codeudor;
    delete values.CoEmpleador;
  }

  values.PayType = (
    (window.preload.paymentUtils || []).find(
      payment =>
        payment.PayTypeID === values.PayType || payment.Name === values.PayType,
    ) || {}
  ).Name;
  values.DateFirmaPromesa = values.DateFirmaPromesa
    ? moment(values.DateFirmaPromesa).format()
    : '';

  if (values.PayType === 'Contado') {
    delete values.Empleador;
    delete values.CoEmpleador;
    delete values.Codeudor;
    delete values.EmpresaCompradora;
    delete values.CodeudorID;
  }

  if (values.ReservaID) {
    delete values.CotizacionID;
  }

  if (!values.ContactMethodTypeID) delete values.ContactMethodTypeID;
  values.Cliente = {
    ...values.Cliente,
    ComunaID: values.Cliente.ComunaID || '',
    BirthDate: values.Cliente.BirthDate || null,
  };
  if (values.Patrimony) {
    Object.keys(values.Patrimony).forEach(item => {
      const Patrimony = values.Patrimony[item];
      if (isObject(Patrimony)) {
        if (Patrimony.PagosMensuales === '')
          values.Patrimony[item] = {
            PagosMensuales: 0,
            Pasivos: 0,
          };
        values.Patrimony[item].Saldo =
          values.Patrimony[item].Pasivos -
          values.Patrimony[item].PagosMensuales;
      } else if (Patrimony === '') {
        values.Patrimony[item] = 0;
      }
    });
  }
  if (values.CoPatrimony) {
    Object.keys(values.CoPatrimony).forEach(item => {
      const CoPatrimony = values.CoPatrimony[item];
      if (isObject(CoPatrimony)) {
        if (CoPatrimony.PagosMensuales === '')
          values.CoPatrimony[item] = {
            PagosMensuales: 0,
            Pasivos: 0,
          };
        values.CoPatrimony[item].Saldo =
          values.CoPatrimony[item].Pasivos -
          values.CoPatrimony[item].PagosMensuales;
      } else if (CoPatrimony === '') {
        values.CoPatrimony[item] = 0;
      }
    });
  }
  values.Condition = (values.Condition || []).filter(
    condition => condition.Description.trim() !== '',
  );
  return values;
};

export function saveReservation(newValues, documents = false) {
  newValues['Condition'] = documents['Condition'];
  if(documents['Comment']) newValues['Comment']=documents['Comment'];
  const values = prepareBeforeSave(newValues);
  
  if (values.InstitucionFinancieraID === "") values.InstitucionFinancieraID=null;
  return {
    type: SAVE_RESERVATION,
    values,
    documents,
  };
}

export function saveReservationError(error) {
  return {
    type: SAVE_RESERVATION_ERROR,
    error,
  };
}

export function saveReservationSuccess(response) {
  return {
    type: SAVE_RESERVATION_SUCCESS,
    response,
  };
}

export function sendToControl(newValues, documents = false) {
  newValues['Condition'] = documents['Condition'];
  if(documents['Comment']) newValues['Comment']=documents['Comment'];
  const values = prepareBeforeSave(newValues);
  if (values.InstitucionFinancieraID === "") values.InstitucionFinancieraID=null;
  return {
    type: SEND_TO_CONTROL,
    values,
    documents,
  };
}

export function sendToControlError(error) {
  return {
    type: SEND_TO_CONTROL_ERROR,
    error,
  };
}

export function sendToControlSuccess(response) {
  return {
    type: SEND_TO_CONTROL_SUCCESS,
    response,
  };
}

export function controlReview(values) {
  return {
    type: CONTROL_REVIEW,
    values,
  };
}

export function controlReviewError(error) {
  return {
    type: CONTROL_REVIEW_ERROR,
    error,
  };
}

export function controlReviewSuccess(response) {
  return {
    type: CONTROL_REVIEW_SUCCESS,
    response,
  };
}

export function getReservation(ReservaID) {
  return {
    type: GET_RESERVATION,
    ReservaID,
  };
}

export function getReservationError(error) {
  return {
    type: GET_RESERVATION_ERROR,
    error,
  };
}

export function getReservationSuccess(response) {
  return {
    type: GET_RESERVATION_SUCCESS,
    response,
  };
}

export function getQuotation(CotizacionID) {
  return {
    type: GET_QUOTATION,
    CotizacionID,
  };
}

export function getQuotationError(error) {
  return {
    type: GET_QUOTATION_ERROR,
    error,
  };
}

export function getQuotationSuccess(response) {
  return {
    type: GET_QUOTATION_SUCCESS,
    response,
  };
}

export function updateReservation(data) {
  return {
    type: UPDATE_RESERVATION,
    data,
  };
}

export function cancelReservation(values) {
  return {
    type: CANCEL_RESERVATION,
    values,
  };
}

export function cancelReservationError(error) {
  return {
    type: CANCEL_RESERVATION_ERROR,
    error,
  };
}

export function cancelReservationSuccess(response) {
  return {
    type: CANCEL_RESERVATION_SUCCESS,
    response,
  };
}

export function printDocuments(newValues) {
  const values = prepareBeforeSave(newValues);
  return {
    type: PRINT_DOCUMENTS,
    values,
  };
}

export function printDocumentsError(error) {
  return {
    type: PRINT_DOCUMENTS_ERROR,
    error,
  };
}

export function printDocumentsSuccess(response) {
  return {
    type: PRINT_DOCUMENTS_SUCCESS,
    response,
  };
}

export function aproveModification(ReservaID) {
  return {
    type: APROVE_MODIFICATION,
    ReservaID,
  };
}

export function aproveModificationError(error) {
  return {
    type: APROVE_MODIFICATION_ERROR,
    error,
  };
}

export function aproveModificationSuccess(response) {
  return {
    type: APROVE_MODIFICATION_SUCCESS,
    response,
  };
}