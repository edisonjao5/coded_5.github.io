/**
 *
 * CommercialData
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { FormGroup, Label } from 'components/ExForm';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import { getCommercialFields, getPaymentFields } from '../fields';
import GeneralReview from '../GeneralApprove/GeneralReview';
import model from '../model';

const SyncMessage = WithLoading();

function CommercialView({ canEdit, selectorProject, selector, onEdit }) {
  const { project = {} } = selectorProject;
  const values = { values: model(project) };
  const fields = getCommercialFields(values);

  return (
    <>
      <Box collapse>
        <BoxHeader>
          <b>DATOS COMERCIALES</b>
          {canEdit && (
            <Button className="order-3 m-btn-pen" onClick={onEdit}>
              Editar
            </Button>
          )}
        </BoxHeader>
        <BoxContent>
          <SyncMessage {...selector} />
          {project && (
            <div className="row p-0 m-0 color-regular">
              {fields.map(({ label, name, view }) => (
                <FormGroup key={name} className="col-md-6 my-2">
                  <Label className="pt-0" style={{ width: '13.5em' }}>
                    {name !== 'ComunaID' ? label : ''}
                  </Label>
                  <span className="font-14-rem ml-2">
                    {name == "IsSubsidy"
                      ? (<input type="checkbox" checked={project[name]} disabled />)
                      : (view || project[name])
                    }
                  </span>
                </FormGroup>
              ))}
            </div>
          )}
        </BoxContent>
      </Box>
      <Box collapse>
        <BoxHeader>
          <b>AJUSTES DE FORMA DE PAGO</b>
        </BoxHeader>
        <BoxContent>
          <SyncMessage {...selector} />
          {project && (
            <div className="row p-0 m-0 color-regular">
              <div className="col-md-6">
                <b className="d-flex mb-4"> Forma de pago Contado </b>
                {getPaymentFields(values, "Contado").map(({ label, name, view }) => (
                  <FormGroup key={name} className="col-md-12 my-2 p-0">
                    <Label className="pt-0" style={{ width: '17.5em' }}>
                      { label }
                    </Label>
                    <span className="font-14-rem ml-2">
                    { name == "ContadoAhorroPlusMaxDiscounts"? view : `% ${view}` }
                    </span>
                  </FormGroup>
                ))}
              </div>
              <div className="col-md-6">
                <b className="d-flex mb-4"> Forma de pago Crédito </b>
                {getPaymentFields(values, "Credito").map(({ label, name, view }) => (
                  <FormGroup key={name} className="col-md-12 my-2 p-0">
                    <Label className="pt-0" style={{ width: '17.5em' }}>
                      { label }
                    </Label>
                    <span className="font-14-rem ml-2">
                    { name == "CreditoAhorroPlusMaxDiscounts"? view : `% ${view}` }
                    </span>
                  </FormGroup>
                ))}
              </div>
            </div>
          )}
        </BoxContent>
        <GeneralReview dataType="commercial" />
      </Box>
    </>
  );
}

CommercialView.propTypes = {
  canEdit: PropTypes.bool,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  onEdit: PropTypes.func,
};

export default CommercialView;
