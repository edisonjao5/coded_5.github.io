/**
 *
 * ClientForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormGroup, Label } from 'components/ExForm';
import ExField from 'components/ExForm/ExField';
import ContactsElement from './ContactsElement';
function ClientBasic({ form }) {
  const { values } = form;
  return (
    <>
      <div className="row justify-content-between">
        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Razón Social</Label>
            <ExField className="flex-fill" name="Name" required />
          </FormGroup>
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Representante Legal</Label>
            <ExField className="flex-fill" name="ReprenetanteLegal" required />
          </FormGroup>
        </div>

        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>RUT</Label>
            <ExField
              className="flex-fill"
              name="Rut"
              required
              disabled={values.UserID}
            />
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Giro Empresa</Label>
            <Field className="flex-fill" name="GiroEmpresa" required />
          </FormGroup>
        </div>
      </div>
      <ContactsElement values={values} required />
    </>
  );
}

ClientBasic.propTypes = {
  form: PropTypes.object,
};

export default ClientBasic;
