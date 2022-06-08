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

export function PhaseTimelineSendCopy({
  canEdit,
  isPending,
  selector,
  entity,
  onSubmit,
}) {
  return (
    <Form
      initialValues={{ DateEnvioCopias: entity.DateEnvioCopias || '' }}
      onSubmit={onSubmit}
    >
      {() => (
        <div className="mt-4">
          <div className="row m-0 p-0 mb-3">
            <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
              <span className="font-16-rem">
                <strong>Envio Copias (AC)</strong>
              </span>
            </div>
          </div>
          <FormGroup>
            {!canEdit && isPending && 'Pendiente'}
            {(canEdit || !isPending) && (
              <>
                <Label style={{ width: '15em' }} className="pt-1">
                  Fecha Envio de Copias
                </Label>
                {canEdit && (
                  <>
                    <Field type="datepicker" required name="DateEnvioCopias" />
                    <div className="ml-3">
                      <Button disabled={selector.loading} type="submit">
                        Aceptar
                      </Button>
                    </div>
                  </>
                )}
                {!canEdit &&
                  moment(entity.DateEnvioCopias).format('DD MMM YYYY')}
              </>
            )}
          </FormGroup>
        </div>
      )}
    </Form>
  );
}

PhaseTimelineSendCopy.propTypes = {
  canEdit: PropTypes.bool,
  isPending: PropTypes.bool,
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default PhaseTimelineSendCopy;
