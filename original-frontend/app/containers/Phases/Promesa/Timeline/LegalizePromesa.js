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
import LegalizadaItem from './LegalizadaItem';

export function PhaseTimelineLegalizePromesa({
  canEdit,
  isPending,
  selector,
  entity,
  onSubmit,
}) {
  return (
    <Form
      initialValues={{
        DateLegalizacionPromesa: entity.DateLegalizacionPromesa || '',
        FileLegalizacionPromesa: entity.FileLegalizacionPromesa || null,
      }}
      onSubmit={onSubmit}
    >
      {() => (
        <div className="mt-4">
          <div className="row m-0 p-0 mb-3">
            <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
              <span className="font-16-rem">
                <strong>Legalizar Promesa (AC)</strong>
              </span>
            </div>
          </div>
          {!canEdit && isPending && PROMESA_STATE[5]}
          {(canEdit || !isPending) && (
            <div className="d-flex align-items-center">
              <div style={{ width: '25em' }}>
                <FormGroup className="align-items-center mt-3">
                  <Label style={{ width: '15em' }} className="pt-1">
                    Legalización de Promesa
                  </Label>
                  {canEdit ? (
                    <Field
                      type="datepicker"
                      // required
                      name="DateLegalizacionPromesa"
                    />
                  ) : (
                      moment(entity.DateLegalizacionPromesa).format('DD MMM YYYY')
                    )
                  }
                </FormGroup>
                <FormGroup className="align-items-center mt-3">
                  <Label style={{ width: '23em' }} className="pt-1">
                    Promesa Legalizada
                  </Label>
                  <LegalizadaItem canUpload={canEdit} name="FileLegalizacionPromesa" />
                </FormGroup>
              </div>
              {canEdit && (
                <div className="ml-3">
                  <Button disabled={selector.loading} type="submit">
                    Aceptar
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Form>
  );
}

PhaseTimelineLegalizePromesa.propTypes = {
  canEdit: PropTypes.bool,
  isPending: PropTypes.bool,
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default PhaseTimelineLegalizePromesa;
