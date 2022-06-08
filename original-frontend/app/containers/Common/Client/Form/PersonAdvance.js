/**
 *
 * Client Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field as ExField, FormGroup, Label } from 'components/ExForm';
import RadioGroup from 'components/ExForm/RadioGroup';
import PersonBasic from './PersonBasic';

function PersonAdvance({ form, focusHide = [] }) {
  const { clientUtils } = window.preload;
  const { values } = form;
  const Cargas = [];
  for(let i=0;i<11; i++)
    Cargas.push(i);

  return (
    <>
      <PersonBasic form={form} />
      <hr className="mt-4 mb-4" />
      <div className="row justify-content-between">
        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Género</Label>
            <ExField type="select" name="Genre" className="flex-fill" required>
              <option value="">Selecciona...</option>
              {clientUtils.Genres.map(genres => (
                <option key={genres} value={genres}>
                  {genres}
                </option>
              ))}
            </ExField>
          </FormGroup>
        </div>
      </div>
      <div className="row justify-content-between">
        <span className="col-lg-12 mt-3 font-14-rem color-main">
          <b>¿CUÁL ES SU ESTADO CIVIL?</b>
        </span>
        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Estado civil</Label>
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
        </div>
        <div className="col-md-6">
          {values.CivilStatus === 'Casado(a)' && (
            <FormGroup className="mt-3">
              <Label style={{ width: '11em' }}>Tipo de matrimonio</Label>
              <ExField
                type="select"
                name="ContractMarriageType"
                className="flex-fill"
                required
              >
                <option value="">Selecciona...</option>
                {clientUtils.ContractMarriageTypes.filter(
                  item => item !== 'Mujer Art. 150',
                ).map(contractMarriageType => (
                  <option
                    key={contractMarriageType}
                    value={contractMarriageType}
                  >
                    {contractMarriageType}
                  </option>
                ))}
              </ExField>
            </FormGroup>
          )}

          {values.CivilStatus === 'Casado(a)' &&
            (values.Genre === 'Femenino' &&
              (values.ContractMarriageType === 'Sociedad Conyugal' && (
                <FormGroup className="mt-3 ">
                  <Label style={{ width: '11em' }} className="pt-0">
                    ¿Compra con? Art 150
                  </Label>
                  <ExField type="checkbox" name="CheckArt150" required />
                </FormGroup>
              )))}
        </div>
        <span className="col-lg-12 mt-3 font-14-rem color-main">
          <b>¿TIENE HIJOS?</b>
        </span>
        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Cargas</Label>
            <ExField
              className="flex-fill"
              name="Carga"
              required
              type="select"
            >
              <option value="">Selecciona...</option>
              {Cargas.map(carga =>
                <option key={`key_${carga}`} value={carga}>
                  {carga}
                </option>
              )}
            </ExField>
          </FormGroup>
        </div>
        <div className="col-md-6" />
        <span className="col-lg-12 mt-3 font-14-rem color-main">
          <b>¿CUÁL ES SU NACIONALIDAD?</b>
        </span>
        <div className="col-md-6">
          <FormGroup className="mt-3">
            <Label style={{ width: '11em' }}>Nacionalidad</Label>
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
        </div>
        <div className="col-md-6" />
        {form.values.Nationality !== 'Chile' && (
          <>
            <span className="col-lg-12 mt-3 font-14-rem color-main">
              <b>¿TIENE RESIDENCIA DEFINITIVA?</b>
            </span>
            <div className="col-md-6">
              <FormGroup className="  mt-3 align-items-center">
                <Label style={{ width: '11em' }} className="pt-0">
                  Residencia Definitiva
                </Label>
                <RadioGroup
                  required
                  name="IsDefinitiveResidence"
                  options={[
                    { label: 'Si', value: '1' },
                    { label: 'No', value: '0' },
                  ]}
                />
              </FormGroup>
            </div>
          </>
        )}
        <div className="col-md-6" />
        { focusHide && !focusHide.includes('Cargo') && (
          <>
            <span className="col-lg-12 mt-3 font-14-rem color-main">
              <b>¿EN QUÉ TRABAJA?</b>
            </span>
            <div className="col-md-6">
              <FormGroup className="mt-3">
                <Label style={{ width: '11em' }}>Cargo</Label>
                <ExField className="flex-fill" name="Position" required />
              </FormGroup>
            </div>
          </>
        )}
        { focusHide && !focusHide.includes('Other') && (
          <>
            <span className="col-lg-12 mt-3 font-14-rem color-main">
              <b>OTROS</b>
            </span>
            <div className="col-md-6">
              <FormGroup className="mt-3">
                <Label style={{ width: '11em' }}>Rango salarial</Label>
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
            </div>
            <div className="col-md-6">
              <FormGroup className="mt-3">
                <Label style={{ width: '11em' }}>Antigüedad Laboral</Label>
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
            </div>
            {/* <div className="col-md-6">
              <FormGroup className="mt-3">
                <Label style={{ width: '11em' }}>Patrimonio</Label>
                <ExField
                  type="number"
                  className="flex-fill"
                  name="TotalPatrimony"
                  required
                  max={2147483647}
                />
              </FormGroup>
            </div> */}
          </>
        )}
      </div>
    </>
  );
}

PersonAdvance.propTypes = {
  focusHide: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  form: PropTypes.object,
};

export default PersonAdvance;
