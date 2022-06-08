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
import ProjectPhases from 'containers/Common/ProjectPhases';
import Alert from 'components/Alert';
import PhasesDocumentGarantia from 'containers/Phases/Document/Garantia';
import { Form as ExForm } from 'components/ExForm';
import { getDocuments } from 'containers/Phases/Document/documents';
import { push } from 'connected-react-router';
import model from '../../model';
import Steps from './Steps';
import CarpetaDigital from './CarpetaDigital';
import { canApproveModifyOffer, canEditOffer } from '../../helper';
import OfferApproveEditActions from './Actions';
import { approveModifyOffer } from '../actions';
import FormActions from '../FormActions';

export function OfferApproveEditForm({ selector, dispatch }) {
  const entity = selector.offer;
  const { project } = window;
  const initialValues = model({ project, entity });
  const documents = getDocuments(entity);
  const onEdit = () =>
    dispatch(
      push(
        `/proyectos/${project.ProyectoID}/oferta/editar?OfertaID=${
          initialValues.OfertaID
        }`,
      ),
    );

  const onCancel = () =>
    dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`));

  return (
    <>
      <ProjectPhases project={project} active="offer" />
      <Steps offer={selector.offer} />
      <Alert type="danger">
        La información modificada está en rojo.
      </Alert>
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="line-height-1 color-caution-03">
          {canApproveModifyOffer(entity)
            ? 'Aprobar Modificaciones'
            : 'Modificaciones Oferta'}
        </span>
      </h5>
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito isCollapse={false} initialValues={initialValues} />
      <ExForm
        initialValues={documents.reduce(
          (acc, document) => {
            acc[document.documentoType] = null;
            return acc;
          },
          { Folio: entity.Folio, Condition: [] },
        )}
        onSubmit={() => {}}
      >
        {() => (
          <>
            <PhasesDocumentGarantia isCollapse={false} entity={entity} />
            <CarpetaDigital
              isCollapse
              selector={selector}
              entity={initialValues}
              dispatch={dispatch}
            />
          </>
        )}
      </ExForm>
      {canApproveModifyOffer(entity) && (
        <OfferApproveEditActions
          selector={selector}
          onControl={values => dispatch(approveModifyOffer(values))}
        />
      )}
      {!canApproveModifyOffer(entity) && (
        <div className="py-3">
          <FormActions
            canEdit={canEditOffer(entity)}
            onCancel={onCancel}
            onEdit={onEdit}
          />
        </div>
      )}
    </>
  );
}

OfferApproveEditForm.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default OfferApproveEditForm;
