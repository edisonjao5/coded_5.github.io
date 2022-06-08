/**
 *
 * Offer Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import { push } from 'connected-react-router';
import { Auth } from 'containers/App/helpers';
import { APROBACION_INMOBILIARIA_STATE } from 'containers/App/constants';
import model from '../../model';
import { approveIn } from '../actions';
import OfferInFormObservation from './Observation';
import OfferInFormActions from './Actions';
import InSteps from './Steps';

export function OfferInForm({ selector, dispatch }) {
  const { project } = window;
  const initialValues = model({
    project, entity: selector.offer,
  });

  const getCanApprove = () => {
    const userId = Auth.get('user_id');
    if([APROBACION_INMOBILIARIA_STATE[1],APROBACION_INMOBILIARIA_STATE[4]].includes(selector.offer.AprobacionInmobiliariaState)){
      if(selector.offer.AprobacionInmobiliaria["Autorizador"]){
        return {Role: "Autorizador", State: selector.offer.AprobacionInmobiliaria["Autorizador"][userId] === null};
      }
      else if(selector.offer.AprobacionInmobiliaria["Aprobador"]){
        return {Role: "Aprobador", State: selector.offer.AprobacionInmobiliaria["Aprobador"][userId] === null}
      }
      else return {State: false};
    }
    else if(selector.offer.AprobacionInmobiliariaState == APROBACION_INMOBILIARIA_STATE[6]) {
      const ap = selector.offer.AprobacionInmobiliaria["Aprobador"];
      if(ap && Object.keys(ap).includes(userId)){
        if(ap[userId] === null) return {Role: "Aprobador", State: true};;
      }
    }
    
    return {State: false};
  }

  const canApprove = getCanApprove();

  return (
    <>
      <InSteps offer={selector.offer} />
      <h4 className="font-21 mt-3">{`${project.Name} / ${
        selector.offer.Folio
      }`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {selector.offer.AprobacionInmobiliariaState}
        </span>
      </h5>
      <OfferInFormObservation entity={selector.offer} />
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient
        payType={selector.offer.PayType}
        client={selector.offer.Cliente}
      />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito initialValues={initialValues} />
      <PhaseDocument entity={initialValues} isCollapse />
      { canApprove.State && (
        <OfferInFormActions
          selector={selector}
          onCancel={() =>
            dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`))
          }
          onApprove={values => {
            dispatch(
              approveIn({
                OfertaID: selector.offer.OfertaID,
                ...values,
                Comment: values.Comment || '',
                Role: canApprove.Role,
                Conditions: selector.offer.Condition.map(condition => ({
                  ...condition,
                  IsApprove: true,
                })),
              }),
            );
          }}
        />
      )}
    </>
  );
}

OfferInForm.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default OfferInForm;
