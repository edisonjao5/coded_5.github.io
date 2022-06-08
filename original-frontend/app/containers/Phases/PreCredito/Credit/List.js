/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Field as ExField } from 'components/ExForm';
import moment from 'components/moment';
import Button from 'components/Button';

const CreditList = ({ selector, onSelect }) =>
  selector.entities.map(entity => (
    <React.Fragment key={entity.PreAprobacionCreditoID}>
      <div className="row m-0 p-0">
        <div className="col-lg-6 border-top border-bottom p-3 d-flex align-items-center justify-content-between">
          {entity.DocumentCredit ? 'Comprador' : 'Asistente Comercial'}
          {entity.Result === 'Aprobada' && (
            <Button
              disabled={selector.loading}
              onClick={evt => {
                evt.preventDefault();
                onSelect(entity);
              }}
            >
              Seleccionar
            </Button>
          )}
        </div>
      </div>
      <div className="p-3">
        <div className="row">
          <FormGroup className="col-12 col-md-6 mt-3">
            <Label style={{ minWidth: '12em' }} className="pt-0">
              Institución Financiera
            </Label>
            <span>{entity.InstitucionFinanciera}</span>
          </FormGroup>
          <FormGroup className="col-12 col-md-6  mt-3">
            <Label style={{ minWidth: '12em' }} className="pt-0">
              Fecha de Envío
            </Label>
            <span>{moment(entity.Date).format('DD MM YYYY')}</span>
          </FormGroup>
          <FormGroup className="col-12 col-md-6  mt-3">
            <Label style={{ minWidth: '12em' }} className="pt-0">
              Resultado
            </Label>
            <span>{entity.Result}</span>
          </FormGroup>
          {entity.DocumentCredit && (
            <FormGroup className="col-12 col-md-6  mt-3">
              <Label style={{ minWidth: '12em' }} className="pt-0">
                Carga de Documentos
              </Label>
              <a href={entity.DocumentCredit} target="_blank">
                Ver archivo
              </a>
            </FormGroup>
          )}
          <FormGroup className="col-12 col-md-6  mt-3">
            <Label style={{ minWidth: '12em' }} className="pt-0">
              Pre Aprobación
            </Label>
            {entity.DocumentPreApprobal &&
              <a href={entity.DocumentPreApprobal} target="_blank">
                Ver archivo
              </a>
            }
          </FormGroup>
        </div>
        <div className="mt-4 mb-3">
          <Label className="d-flex pb-2">Observaciones</Label>
          <span>{entity.Observacion}</span>
        </div>
      </div>
    </React.Fragment>
  ));

CreditList.propTypes = {
  selector: PropTypes.object,
  onSelect: PropTypes.func,
};
export default CreditList;
