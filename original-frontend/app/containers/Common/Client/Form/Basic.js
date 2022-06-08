/**
 *
 * ClientForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormGroup, Label } from 'components/ExForm';
import ExField from 'components/ExForm/ExField';
import { stringToBoolean } from 'containers/App/helpers';
import ContactsElement from './ContactsElement';
import { shouldShowField } from '../helper';
function ClientBasic({ form, focusHide }) {
  const { values } = form;
  const isCompany = stringToBoolean(values.IsCompany);
  return (
    <>
      <div className="row justify-content-between">
        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>
              {isCompany ? 'Razón Social' : 'Nombre'}
            </Label>
            <ExField className="flex-fill" name="Name" required />
          </FormGroup>
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>RUT</Label>
            <ExField
              className="flex-fill"
              name="Rut"
              required
              disabled={values.UserID}
            />
          </FormGroup>
        </div>

        <div className="col-md-6">
          {!isCompany && (
            <FormGroup className="mt-3">
              <Label style={{ width: '11em' }}>Apellidos</Label>
              <ExField className="flex-fill" name="LastNames" required />
            </FormGroup>
          )}
          {isCompany && (
            <FormGroup className="mt-3">
              <Label style={{ width: '11em' }}>Representante Legal</Label>
              <ExField
                className="flex-fill"
                name="ReprenetanteLegal"
                required
              />
            </FormGroup>
          )}
          {shouldShowField('ComunaID', focusHide) && !isCompany && (
            <FormGroup className="mt-3">
              <Label style={{ width: '11em' }}>Comunas</Label>
              <Field
                type="comunas"
                className="flex-fill"
                name="ComunaID"
                required
              />
            </FormGroup>
          )}
          {isCompany && (
            <FormGroup className="mt-3">
              <Label style={{ width: '11em' }}>Giro Empresa</Label>
              <Field className="flex-fill" name="GiroEmpresa" required />
            </FormGroup>
          )}
        </div>
      </div>
      <ContactsElement values={values} required />
    </>
  );
}

ClientBasic.propTypes = {
  focusHide: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  form: PropTypes.object,
};

export default ClientBasic;
