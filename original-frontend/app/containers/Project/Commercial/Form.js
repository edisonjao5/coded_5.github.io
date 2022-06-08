/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import { Form as ExForm, Field, FormGroup, Label } from 'components/ExForm';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { USER_PROYECTO_TYPE } from 'containers/App/constants';
import Alert from 'components/Alert';
import { stringToBoolean } from 'containers/App/helpers';
import model from '../model';
import { getCommercialFields, getPaymentFields } from '../fields';

const SyncMessage = WithLoading();
export function CommercialForm({
  selector,
  selectorProject,
  selectorRealEstate,
  onSubmit,
  onReset,
}) {
  const { project = {} } = selectorProject;
  const { inmobiliarias, constructoras } = selectorRealEstate;
  const { UsersProyecto = [], InmobiliariaID } = project;
  const { loading, ...restSelector } = selector;
  const initialValues = model(project);
  const selectedInmobiliaria = (inmobiliarias || []).find(
    item => item.InmobiliariaID === InmobiliariaID,
  );
  const selectedConstructora = constructoras.find(
    item =>
      selectedInmobiliaria.IsConstructora &&
      item.IsInmobiliaria &&
      item.RazonSocial === selectedInmobiliaria.RazonSocial,
  );

  ['Representante', 'Aprobador', 'Autorizador'].forEach(userType => {
    const users = selectedInmobiliaria.UsersInmobiliaria.filter(
      item => item.UserInmobiliariaType === userType,
    );
    initialValues.tmp.UsersProyecto[userType] = users.map(user => ({
      UserID: user.UserID || user,
      UserProyectoType: userType,
    }));
  });

  if (!initialValues.ConstructoraID && selectedConstructora) {
    initialValues.ConstructoraID = selectedConstructora.ConstructoraID;
  }

  return (
    <ExForm initialValues={initialValues} onSubmit={values => onSubmit(values)}>
      {form => {
        const { submitForm, values } = form;
        const fields = getCommercialFields(form, {
          UsersInmobiliaria: selectedInmobiliaria.UsersInmobiliaria,
        });
        const EntregaInmediata = stringToBoolean(values.EntregaInmediata);
        const { Aseguradora } = values;
        return (
          <>
            <Box>
              <BoxHeader>
                <b>DATOS COMERCIALES</b>
              </BoxHeader>
              <BoxContent>
                <SyncMessage {...restSelector} />
                <div className="row p-0 m-0 color-regular">
                  {fields.map(
                    ({
                      label,
                      name,
                      view,
                      Component = Field,
                      ...attributes
                    }) => (
                      <FormGroup key={name} className="col-md-6 my-2">
                        <Label style={{ width: '13.5em' }}>{label}</Label>
                        <Component
                          name={name}
                          style={{ width: '13.5em' }}
                          {...attributes}
                        />
                      </FormGroup>
                    ),
                  )}
                </div>
                {EntregaInmediata && !Aseguradora.AseguradoraID && (
                  <Alert type="warning" className="mb-0">
                    {`Se le informará al asistente comercial para que complete los datos de la "Póliza"`}
                  </Alert>
                )}
                {!EntregaInmediata && Aseguradora.AseguradoraID && (
                  <Alert type="danger" className="mb-0">
                    {`La información de "Póliza" será eliminada`}
                  </Alert>
                )}
              </BoxContent>
              {/* <BoxFooter>
                <Button
                  loading={loading}
                  disabled={loading}
                  onClick={evt => {
                    evt.preventDefault();
                    submitForm();
                  }}
                >
                  Aceptar
                </Button>
                {UsersProyecto.find(
                  user =>
                    user.UserProyectoType === USER_PROYECTO_TYPE[3] &&
                    user.UserID,
                ) && (
                  <Button
                    disabled={loading}
                    type="reset"
                    onClick={onReset}
                    className="font-14-rem shadow-sm m-btn m-btn-white ml-2"
                  >
                    Cancelar
                  </Button>
                )}
              </BoxFooter> */}
            </Box>
            <Box>
              <BoxHeader>
                <b>AJUSTES DE FORMA DE PAGO</b>
              </BoxHeader>
              <BoxContent>
                <SyncMessage {...restSelector} />
                <div className="row p-0 m-0 color-regular">
                  <div className="col-md-6">
                    <b className="d-flex mb-4"> Forma de pago Contado </b>
                    {getPaymentFields(form, 'Contado').map(
                      ({ label, name }) => (
                        <FormGroup key={name} className="col-md-12 my-2 p-0">
                          <Label style={{ width: '17.5em' }}>{label}</Label>
                          {// eslint-disable-next-line no-nested-ternary
                            name === 'ContadoAhorroPlusMaxDiscounts' ? (
                              <Field
                                type="number"
                                name={name}
                                required="true"
                                style={{ width: '10em' }}
                              />
                            ) : name === 'ContadoAhorroPlus' ? (
                              <Field
                                type="select"
                                name={name}
                                required="true"
                                style={{ width: '10em' }}
                              >
                                <option value="" />
                                <option value="5">5 %</option>
                                <option value="10">10 %</option>
                              </Field>
                            ) : (
                              <Field
                                type="number"
                                name={name}
                                maskOptions={{ prefix: '%' }}
                                required="true"
                                max={10}
                                style={{ width: '10em' }}
                              />
                            )}
                        </FormGroup>
                      ),
                    )}
                  </div>
                  <div className="col-md-6">
                    <b className="d-flex mb-4"> Forma de pago Crédito </b>
                    {getPaymentFields(form, 'Credito').map(
                      ({ label, name }) => (
                        <FormGroup key={name} className="col-md-12 my-2 p-0">
                          <Label style={{ width: '17.5em' }}>{label}</Label>

                          {name === 'CreditoAhorroPlusMaxDiscounts' ? (
                            <Field
                              type="number"
                              name={name}
                              required="true"
                              style={{ width: '10em' }}
                            />
                          ) : name === 'CreditoAhorroPlus' ? (
                            <Field
                              type="select"
                              name={name}
                              required="true"
                              style={{ width: '10em' }}
                            >
                              <option value="" />
                              <option value="5">5 %</option>
                              <option value="10">10 %</option>
                            </Field>
                          ) : (
                            <Field
                              type="number"
                              name={name}
                              maskOptions={{ prefix: '%' }}
                              required="true"
                              max={10}
                              style={{ width: '10em' }}
                            />
                          )}
                        </FormGroup>
                      ),
                    )}
                  </div>
                </div>
              </BoxContent>
              <BoxFooter>
                <Button
                  loading={loading}
                  disabled={loading}
                  onClick={evt => {
                    evt.preventDefault();
                    submitForm();
                  }}
                >
                  Aceptar
                </Button>
                {UsersProyecto.find(
                  user =>
                    user.UserProyectoType === USER_PROYECTO_TYPE[3] &&
                    user.UserID,
                ) && (
                  <Button
                    disabled={loading}
                    type="reset"
                    onClick={onReset}
                    className="font-14-rem shadow-sm m-btn m-btn-white ml-2"
                  >
                    Cancelar
                  </Button>
                )}
              </BoxFooter>
            </Box>
          </>
        );
      }}
    </ExForm>
  );
}

CommercialForm.propTypes = {
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  selectorRealEstate: PropTypes.object,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};

export default CommercialForm;
