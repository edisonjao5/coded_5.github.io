/**
 *
 * Offer Form
 *
 */
import React from 'react';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import {
  RECEPCION_GARANTIA_STATE,
  OFERTA_STATE,
} from 'containers/App/constants';
import ProjectPhases from 'containers/Common/ProjectPhases';
import Button from 'components/Button';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WithLoading from 'components/WithLoading';
import FiSteps from './Steps';
import { recepcionGarantia } from './Garantia/actions';
import makeSelectOfferGarantia from './Garantia/selectors';
import { isPendienteContacto } from '../../helper';
import OfferGarantia from './Garantia';

const SyncMessage = WithLoading();

export function OfferFiForm({ selector, selectorGarantia, dispatch }) {
  const { project = {} } = window;
  const entity = selector.offer;
  const onGarantia =
    entity.OfertaState !== OFERTA_STATE[4] &&
    entity.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[0]
      ? () => dispatch(recepcionGarantia(entity.OfertaID))
      : false;

  const onRefund =
    entity.OfertaState === OFERTA_STATE[4] &&
    entity.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1]
      ? () => dispatch(recepcionGarantia(entity.OfertaID, true))
      : false;

  const onCancel = () =>
    dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`));

  if (selectorGarantia.success[entity.OfertaID]) {
    return <Redirect to={window.location} />;
  }

  return (
    <>
      <OfferGarantia />
      <ProjectPhases project={project} active="offer" />
      <FiSteps offer={selector.offer} />
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {isPendienteContacto(entity) ? 'Pendiente Contacto' : 'Oferta'}
        </span>

        <div className="d-flex align-items-center justify-content-end mr-3 order-3">
          {onGarantia &&
            (!isPendienteContacto(entity) && (
              <Button
                disabled={isPendienteContacto(entity)}
                loading={selectorGarantia.loading[entity.OfertaID]}
                onClick={onGarantia}
              >
                Recibí Garantía
              </Button>
            ))}

          {onRefund && (
            <Button
              disabled={isPendienteContacto(entity)}
              loading={selectorGarantia.loading[entity.OfertaID]}
              onClick={onRefund}
            >
              Devolución Garantía
            </Button>
          )}
          <Button
            loading={selectorGarantia.loading[entity.OfertaID]}
            color="white"
            onClick={onCancel}
          >
            Volver
          </Button>
        </div>
      </h5>
      <SyncMessage
        error={selectorGarantia.error[entity.OfertaID]}
        success={selectorGarantia.success[entity.OfertaID]}
      />
      <PhaseGeneral initialValues={entity} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={entity} />
      <PhaseFormaDePago initialValues={entity} />
      <PhasePreCredito initialValues={entity} />
      <PhaseDocument
        entity={entity}
        isCollapse
        onGarantia={isPendienteContacto(entity) ? false : onGarantia}
      />
    </>
  );
}

OfferFiForm.propTypes = {
  selector: PropTypes.object,
  selectorGarantia: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectorGarantia: makeSelectOfferGarantia(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OfferFiForm);
