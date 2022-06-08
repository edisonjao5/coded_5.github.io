/**
 *
 * Offer Form
 *
 */
import React, { useState } from 'react';
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
import AlertPopup from 'components/Alert/popup';
import InitData from 'containers/Common/InitData';
import model from '../../model';
import Steps from './Steps';
import CarpetaDigital from './CarpetaDigital';
import OfferEditActions from './Actions';
import { deleteOffer, saveOffer, updateOffer } from '../actions';
import { canEditOffer, isValidData } from '../../helper';

export function OfferEditForm({ selector, dispatch }) {
  const entity = selector.offer;
  const { project } = window;
  const initialValues = model({ project, entity });
  const documents = getDocuments(entity);
  const canEdit = !!canEditOffer(entity);
  const isValid = isValidData(entity);
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <>
      {!isValid && (
        <AlertPopup
          title="Faltan Datos"
          isOpen={openAlert}
          onHide={() => setOpenAlert(false)}
        >
          Por favor complete los datos faltantes
        </AlertPopup>
      )}
      <InitData User Client />
      <ProjectPhases project={project} active="offer" />
      <Steps offer={selector.offer} />
      <Alert type="danger">
        El modificar algunos datos implicará cambios importantes en el proceso.
      </Alert>
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          Modificaciones Oferta
        </span>
      </h5>
      <PhaseGeneral
        initialValues={initialValues}
        canEdit
        onUpdate={values => dispatch(updateOffer(values))}
      />
      <PhaseClient
        canEdit
        payType={entity.PayType}
        client={entity.Cliente}
        onUpdate={Cliente => dispatch(updateOffer({ Cliente }))}
      />
      <PhaseInmueble
        initialValues={initialValues}
        canEdit
        onUpdate={values => dispatch(updateOffer(values))}
      />
      <PhaseFormaDePago
        initialValues={initialValues}
        canEdit
        onUpdate={values => dispatch(updateOffer(values))}
      />
      <PhasePreCredito
        isCollapse={false}
        initialValues={initialValues}
        canEdit
        dispatch={dispatch}
        onContinue={values => dispatch(updateOffer(values))}
      />
      <ExForm
        initialValues={documents.reduce(
          (acc, document) => {
            acc[document.documentoType] = null;
            return acc;
          },
          { Folio: entity.Folio, Condition: [] },
        )}
        onSubmit={values => {
          if (!isValid) return setOpenAlert(true);
          return dispatch(saveOffer(entity, values));
        }}
      >
        {form => (
          <>
            <PhasesDocumentGarantia 
              isCollapse={false}
              entity={entity}
              canUpload={canEdit}
              // onCancel
              // onGarantia
            />
            <CarpetaDigital
              isCollapse
              canEdit={canEdit}
              selector={selector}
              entity={initialValues}
              dispatch={dispatch}
              modifyOffer={true}
            />
            <OfferEditActions
              onCancel={() =>
                dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`))
              }
              onDelete={() => dispatch(deleteOffer(entity))}
              onSave={(comment) => {
                form.setFieldValue("Comment", comment);
                form.submitForm()
              }}
              dispatch={dispatch}
              selector={selector}
            />
          </>
        )}
      </ExForm>
    </>
  );
}

OfferEditForm.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default OfferEditForm;
