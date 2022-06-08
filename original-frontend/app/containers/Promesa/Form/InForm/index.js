/**
 *
 * Promesa Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';
import InitData from 'containers/Common/InitData';
import { PROMESA_STATE } from 'containers/App/constants';
import PhaseFirmaDocumentsPromesa from 'containers/Phases/Promesa/FirmaDocuments';
import PromesaObservation from 'containers/Phases/Promesa/Observation/index';
import PhaseControlNegociacionPromesa from 'containers/Phases/Promesa/ControlNegociacionPromesa';
import Desistimiento from 'containers/Phases/Promesa/Desistimiento';
import { controlNegociacion } from '../actions';

export function InForm({ selector, dispatch }) {
  const { project = {} } = window;
  const entity = selector.promesa;

  const onCancel = () =>
    dispatch(push(`/proyectos/${project.ProyectoID}/promesas`));

  if (selector.success) {
    return <Redirect to={`/proyectos/${project.ProyectoID}/promesas`} />;
  }

  const blockPromesa = () => {
    if (entity.PromesaState === PROMESA_STATE[14]) {
      return (
        <PhaseControlNegociacionPromesa
          entity={entity}
          selector={selector}
          onSubmit={values =>
            dispatch(
              controlNegociacion({
                PromesaID: entity.PromesaID,
                Comment: values.Comment || '',
                Resolution: values.Resolution,
                Condition: entity.Condition.map(condition => ({
                  ...condition,
                  IsApprove: true,
                })),
              }),
            )
          }
        />
      );
    }

    return (
      <PhaseFirmaDocumentsPromesa
        entity={entity}
        selector={selector}
        onCancel={onCancel}
      />
    );
  };

  return (
    <>
      <InitData User Client />
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}
        <span className="general-phase"> - Promesa
          <i className="icon icon-z-info" title="This is Promesa."/>
        </span>     
      </h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1">
          {entity.PromesaState === PROMESA_STATE[14]
            ? 'Negociación Promesa'
            : ''}
        </span>
      </h5>
      {/* {entity.PromesaState === PROMESA_STATE[14] && (
        <PromesaObservation entity={entity} selector={selector} />
      )} */}
      {blockPromesa()}
      <Desistimiento promesa={entity} />
    </>
  );
}

InForm.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default InForm;
