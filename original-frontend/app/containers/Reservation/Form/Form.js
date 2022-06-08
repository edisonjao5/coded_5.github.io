/**
 *
 * Reservation Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import { isContadoPayment } from 'containers/App/helpers';
import model from '../model';
import {
  canConfirmReservation,
  canEditReservation,
  canReviewReservation,
  canUploadReservation,
  canApproveModification,
  isValidData
} from './helper';
import {
  cancelReservation,
  controlReview,
  saveReservation,
  sendToControl,
  updateReservation,
  printDocuments,
  aproveModification,
} from './actions';
import AlertPopup from 'components/Alert/popup';
import { getInvalidLabor } from 'containers/Phases/PreCredito/helper';
import Log from 'components/Log';

export function Form({ project, selector, dispatch }) {
  const entity = selector.reservation;
  const isContado = isContadoPayment(entity.PayType);
  /* eslint-disable-next-line */
  const [step, setStep] = useState(entity.ReservaID ? 3 : isContado ? 2 : 1);
  const [openAlert, setOpenAlert] = useState(false);

  const [confirmes, setConfirmes] = useState({
    general: false,
    client: false,
    inmueble: false,
    forma: false,
  });
  
  const isValid = isValidData(entity);
  const canEdit = canEditReservation(entity);
  const canConfirm = canConfirmReservation(entity);
  const canUpload = canUploadReservation(entity);
  const canReview = canReviewReservation(entity);
  const canApprove = canApproveModification(entity);

  const initialValues = model({ project, entity });

  const handleConfirm = (data, confirm) => {
    setConfirmes({
      ...confirmes,
      [data]: confirm,
    });
  };

  return (
    <>
      {!isValid && (
        <AlertPopup
          title="Faltan Datos"
          isOpen={openAlert}
          onHide={() => setOpenAlert(false)}
        >
          Por favor complete los datos faltantes
          <br/>
          {getInvalidLabor(entity).map((value)=>
            <>- {value} <br/></>
          )}
        </AlertPopup>
      )}
      <PhaseGeneral
        onConfirm={handleConfirm}
        initialValues={initialValues}
        canEdit={canEdit}
        canConfirm={canConfirm}
        onUpdate={values => dispatch(updateReservation(values))}
      />
      <PhaseClient
        payType={entity.PayType}
        canEdit={canEdit}
        canConfirm={canConfirm}
        onConfirm={handleConfirm}
        onUpdate={Cliente => dispatch(updateReservation({ Cliente }))}
        client={entity.Cliente}
        codeudor={entity.Codeudor}
      />
      <PhaseInmueble
        canEdit={canEdit}
        canConfirm={canConfirm}
        onConfirm={handleConfirm}
        onUpdate={values => dispatch(updateReservation(values))}
        initialValues={initialValues}
      />
      <PhaseFormaDePago
        canEdit={canEdit}
        canConfirm={canConfirm}
        onConfirm={handleConfirm}
        initialValues={initialValues}
        onUpdate={values => {
          dispatch(updateReservation(values))
        }}
      />
      <PhasePreCredito
        canEdit={canEdit}
        showScreen={!initialValues.ReservaID ? 'form' : 'view'}
        isConfirmed={
          !Object.keys(confirmes).find(confirm => !confirmes[confirm])
        }
        initialValues={initialValues}
        step={step}
        dispatch={dispatch}
        onContinue={values => {
          setStep(step + 1);
          dispatch(updateReservation(values));
        }}
      />
      {(step === 3 || entity.ReservaID) && (
        <>
        <PhaseDocument
          isCollapse
          entity={initialValues}
          canUpload={canUpload}
          canReview={canReview}
          canApprove={canApprove}
          selector={selector}
          onCancel={Comment => {
            if (entity.ReservaID)
              dispatch(
                cancelReservation({ ReservaID: entity.ReservaID, Comment }),
              );
            else dispatch(push(`/proyectos/${project.ProyectoID}/reservas`));
          }}
          onSave={(documents) => {            
            if (!isValid) return setOpenAlert(true);
            if (initialValues.sendControl){
              return dispatch(
                sendToControl({ ...initialValues, ...entity }, documents),
              );
            }
            else{
              return dispatch(
                saveReservation({ ...initialValues, ...entity }, documents),
              );
            }
          }}
          onControlReview={values =>
            dispatch(controlReview({ ...values, ReservaID: entity.ReservaID }))
          }
          onAproveModification={() => 
            dispatch(aproveModification( entity.ReservaID ))
          }
          onCancelAprove={() => 
            dispatch(push(`/proyectos/${project.ProyectoID}/reservas`))
          }
          onPrint={() => {
              return dispatch(printDocuments({ ...initialValues, ...entity }))
          }}
        />
        </>
      )}
      {entity.Logs && (
        <Log logs={entity.Logs} limit={10} />
      )}
    </>
  );
}

Form.propTypes = {
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Form;
