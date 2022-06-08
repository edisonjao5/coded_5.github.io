/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Field, Form, FormGroup, Label } from 'components/ExForm';
import moment from 'components/moment';
import { PROMESA_STATE } from 'containers/App/constants';

export function PhaseTimelineSendToIn({
  canEdit,
  isPending,
  selector,
  entity,
  onSubmit,
}) {
  return (
    <Form
      initialValues={{ DateEnvioPromesa: entity.DateEnvioPromesa || '' }}
      onSubmit={onSubmit}
    >
      {() => (
        <div className="mt-4">
          <div className="row m-0 p-0 mb-3">
            <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
              <span className="font-16-rem">
                <strong>Enviar a Inmobiliaria (JP)</strong>
              </span>
            </div>
          </div>
          {!canEdit && isPending && PROMESA_STATE[2]}
          {(canEdit || !isPending) && (
            <FormGroup>
              <Label style={{ width: '15em' }} className="pt-1">
                Fecha Envio Promesa
              </Label>
              {canEdit && (
                <>
                  <Field type="datepicker" required name="DateEnvioPromesa" />
                  <div className="ml-3">
                    <Button disabled={selector.loading} type="submit">
                      Enviar
                    </Button>
                  </div>
                </>
              )}
              {!canEdit &&
                moment(entity.DateEnvioPromesa).format('DD MMM YYYY')}
            </FormGroup>
          )}
        </div>
      )}
    </Form>
  );
}

PhaseTimelineSendToIn.propTypes = {
  canEdit: PropTypes.bool,
  isPending: PropTypes.bool,
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default PhaseTimelineSendToIn;
