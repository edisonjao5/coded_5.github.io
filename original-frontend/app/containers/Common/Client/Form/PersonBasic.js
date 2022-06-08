/**
 *
 * ClientForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field as ExField, FormGroup, Label } from 'components/ExForm';
import ContactsElement from './ContactsElement';
import { shouldShowField, professions } from '../helper';
function PersonBasic({ form, focusHide }) {
  const { values } = form;

  return (
    <>
      <div className="row justify-content-between">
        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>RUT</Label>
            <ExField className="flex-fill" name="Rut" required />
          </FormGroup>
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Nombre</Label>
            <ExField className="flex-fill" name="Name" required />
          </FormGroup>
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Apellidos</Label>
            <ExField className="flex-fill" name="LastNames" required />
          </FormGroup>
          {shouldShowField('Ocupation', focusHide) && (
            <FormGroup className="mt-3">
              <Label style={{ width: '11em' }}>Profesión</Label>
              {/*<ExField name="Ocupation" className="flex-fill" required/>*/}
              <ExField
                className="flex-fill"
                name="Ocupation"
                required
                type="select"
              >
                <option value="">Selecciona...</option>
                {professions.map(({ label, values }) => (
                  <optgroup label={label}>
                    {values.map(value => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </ExField>
            </FormGroup>
          )}
        </div>

        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Fecha de Nacimiento</Label>
            <div className="flex-fill">
              <ExField
                style={{ width: '100%' }}
                type="datePicker"
                name="BirthDate"
              />
            </div>
          </FormGroup>
          {shouldShowField('ComunaID', focusHide) && (
            <>

            <FormGroup className="mt-3">
                <Label style={{ width: '11em' }}>Dirección</Label>
                <ExField className="flex-fill" name="Address" required />
              </FormGroup>

             {/* <FormGroup className="mt-3">
                <Label style={{ width: '11em' }}>Región</Label>
                <ExField
                  type="regiones"
                  className="flex-fill"
                  name="RegionID"
                  required
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Label style={{ width: '11em' }}>Comuna</Label>
                <ExField
                  type="comunas"
                  className="flex-fill"
                  name="ComunaID"
                  required
                />
          </FormGroup>*/}
          </>
          )}
          <div className="row justify-content-between" />
        </div>
      </div>
      <ContactsElement values={values} required />
    </>
  );
}

PersonBasic.propTypes = {
  focusHide: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  form: PropTypes.object,
};

export default PersonBasic;
