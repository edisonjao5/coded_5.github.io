/**
 *
 * FinanceData
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { BoxFooter } from 'components/Box';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import { FormGroup, Label } from 'components/ExForm';
import { canConfirmDocument, canUploadDocument } from '../../helper';

const SyncMessage = WithLoading();

function FinanceView({ action, selector, selectorProject, onEdit, onConfirm }) {
  const { entity = {} } = selector;
  const canConfirm = canConfirmDocument(selectorProject.project);
  const canEdit =
    canUploadDocument('finanza', selectorProject.project) && action !== 'view';
  return (
    <>
      <SyncMessage {...selector} />
      {entity && (
        <div className="p-0 mt-3 font-14 row">
          <FormGroup className="col-md-6 my-2">
            <Label style={{ width: '13.5em' }} className="pt-0">
              Contra Firma de Promesa
            </Label>
            <span className="font-14-rem ml-2">
              {entity && entity.PromesaFirmada} %
            </span>
          </FormGroup>
          <FormGroup className="col-md-6 my-2">
            <Label style={{ width: '13.5em' }} className="pt-0">
              Firma de Escritura
            </Label>
            <span className="font-14-rem ml-2">
              {entity && entity.EscrituraFirmada} %
            </span>
          </FormGroup>
          <FormGroup className="col-md-6 my-2">
            <Label style={{ width: '13.5em' }} className="pt-0">
              Cierre de Operación
            </Label>
            <span className="font-14-rem ml-2">
              {entity && entity.CierreGestion} %
            </span>
          </FormGroup>
          {canConfirm && (
            <FormGroup className="col-md-6 my-2">
              <div className="d-flex align-items-center mr-3 order-3">
                <div className="radio d-flex align-items-center font-14-rem mr-2">
                  <div className="m-radio">
                    <input
                      type="radio"
                      name="State"
                      defaultChecked={entity.State === 'confirmed'}
                      onChange={() => onConfirm('confirmed')}
                    />
                    <label />
                  </div>
                  <span className="ml-1 color-regular">
                    <b>Visto</b>
                  </span>
                </div>
                <div className="radio d-flex align-items-center font-14-rem">
                  <div className="m-radio">
                    <input
                      type="radio"
                      name="State"
                      defaultChecked={entity.State === 'rejected'}
                      onChange={() => onConfirm('rejected')}
                    />
                    <label />
                  </div>
                  <span
                    className={`ml-1 ${
                      entity.State === 'rejected'
                        ? 'color-warning'
                        : 'color-regular'
                    }`}
                  >
                    <b>Rechazar</b>
                  </span>
                </div>
              </div>
            </FormGroup>
          )}
        </div>
      )}
      {canEdit && (
        <BoxFooter inside>
          <div className="d-flex justify-content-end">
            <Button className="order-3 m-btn-pen" onClick={onEdit}>
              Editar
            </Button>
          </div>
        </BoxFooter>
      )}
    </>
  );
}

FinanceView.propTypes = {
  action: PropTypes.string,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  onEdit: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default FinanceView;
