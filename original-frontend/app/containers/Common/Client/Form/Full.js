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

function ClienteFormFull({ form }) {
  const { clientUtils } = window.preload;
  const { values } = form;
  const Carags = [];
  for(let i=0;i<11; i++)
    Carags.push(`
      <option key="key_${i}" value="${i}" >
        ${i}
      </option>`);

  return (
    <div className="p-3 px-4 border-top">
      <div className="row justify-content-between">
        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>
              {values.IsCompany ? 'Razón Social' : 'Nombre'}
            </Label>
            <ExField className="flex-fill" name="Name" required />
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Apellidos</Label>
            <ExField className="flex-fill" name="LastNames" required />
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>RUT</Label>
            <ExField
              className="flex-fill"
              name="Rut"
              required
              disabled={values.UserID}
            />
          </FormGroup>
        </div>

        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Comunas</Label>
            <Field
              type="comunas"
              className="flex-fill"
              name="ComunaID"
              required
            />
          </FormGroup>
          {/* <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Edad</Label>
            <ExField
              type="select"
              name="Extra.AgeRank"
              className="flex-fill"
              required
            >
              <option value="">Selecciona...</option>
              {clientUtils.Ages.map(age => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </ExField>
            <div className="font-21 color-main opacity-0 ml-2">
              <strong>+</strong>
            </div>
          </FormGroup>
          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Dirección</Label>
            <ExField className="flex-fill" name="Address" required />
          </FormGroup> */}
        </div>
      </div>
      <ContactsElement values={values} required />

      <div className="font-14-rem color-main mt-4">
        <b>OTROS</b>
      </div>

      <div className="row justify-content-between">
        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Estado civil</Label>
            <ExField
              type="select"
              name="CivilStatus"
              className="flex-fill"
              required
            >
              <option value="">Selecciona...</option>
              {clientUtils.CivilStatus.map(civilStatus => (
                <option key={civilStatus} value={civilStatus}>
                  {civilStatus}
                </option>
              ))}
            </ExField>
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Tipo de matrimonio</Label>
            <ExField
              type="select"
              name="ContractMarriageType"
              className="flex-fill"
              required
            >
              <option value="">Selecciona...</option>
              {clientUtils.ContractMarriageTypes.map(contractMarriageTypes => (
                <option
                  key={contractMarriageTypes}
                  value={contractMarriageTypes}
                >
                  {contractMarriageTypes}
                </option>
              ))}
            </ExField>
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Género</Label>
            <ExField type="select" name="Genre" className="flex-fill" required>
              <option value="">Selecciona...</option>
              {clientUtils.Genres.map(genres => (
                <option key={genres} value={genres}>
                  {genres}
                </option>
              ))}
            </ExField>
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Nacionalidad</Label>
            <ExField
              type="select"
              name="Nationality"
              className="flex-fill"
              required
            >
              <option value="">Selecciona...</option>
              {clientUtils.Nationalities.map(nationalities => (
                <option key={nationalities} value={nationalities}>
                  {nationalities}
                </option>
              ))}
            </ExField>
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>País de origen</Label>
            <ExField
              type="select"
              name="IsDefinitiveResidence"
              className="flex-fill"
              required
            >
              <option value="">Selecciona...</option>
              {clientUtils.Nationality_type.map(nationalityType => (
                <option
                  key={nationalityType}
                  value={nationalityType === 'Chilena'}
                >
                  {nationalityType}
                </option>
              ))}
            </ExField>
          </FormGroup>
        </div>

        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Cargas</Label>
            <ExField
              className="flex-fill"
              name="Carga"
              required
              type="select"
            >
              {Carags}
            </ExField>
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Cargo</Label>
            <ExField className="flex-fill" name="Position" required />
            <div className="font-21 color-main opacity-0 ml-2">
              <strong>+</strong>
            </div>
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Rango salarial</Label>
            <ExField
              type="select"
              name="Extra.SalaryRank"
              className="flex-fill"
              required
            >
              <option value="">Selecciona...</option>
              {clientUtils.Salaries.map(salaries => (
                <option key={salaries} value={salaries}>
                  {salaries}
                </option>
              ))}
            </ExField>
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Antigüedad laboral</Label>
            <ExField
              type="select"
              name="Antiquity"
              className="flex-fill"
              required
            >
              <option value="">Selecciona...</option>
              {clientUtils.Antiquities.map(antiquities => (
                <option key={antiquities} value={antiquities}>
                  {antiquities}
                </option>
              ))}
            </ExField>
          </FormGroup>

          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Patrimonio</Label>
            <ExField
              type="number"
              className="flex-fill"
              name="TotalPatrimony"
              required
              max={2147483647}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

ClienteFormFull.propTypes = {
  form: PropTypes.object,
};

export default ClienteFormFull;
