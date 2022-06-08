/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, CollapseContent, CollapseHeader } from 'components/Collapse';
import {
  Form as ExForm,
  FormGroup,
  Label,
  Field as ExField,
} from 'components/ExForm';
import PureRadioGroup from 'components/ExForm/PureRadioGroup';
import ExInstitucionFinancieras from 'components/ExForm/ExInstitucionFinancieras';
import { FieldArray } from 'formik';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import CreditList from './List';
import Alert from 'components/Alert';

const SyncMessage = WithLoading();

const CreditForm = ({ selector,isPendienteAprobacion, onSubmit, onCancel, onSelect }) => {
  const initCredit = {
    Type: 'ac',
    InstitucionFinanciera: '',
    Date: new Date(),
    Observacion: '',
    DocumentCredit: '',
    Result: 'Aprobada',
  };
  const initialValues = {
    Credits: [initCredit],
  };
  const { project } = window;  
  const aprobaState = project.EntregaInmediata ? 
                  !isPendienteAprobacion
                  :true;
  return (
    <ExForm initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, submitForm }) => (
        <>
          <Collapse isOpen>
            <CollapseHeader>CRÉDITOS PRE APROBADOS</CollapseHeader>
            <CollapseContent>
              {!aprobaState && (
                <Alert type="warning">
                  Todas las ofertas requieren aprobación. 
                </Alert>
              )}
              {selector.entities && (
                <CreditList selector={selector} onSelect={onSelect} />
              )}
              <FieldArray
                name="Credits"
                render={({ remove, push, replace }) => (
                  <>
                    {values.Credits.map((credit, index) => (
                      <React.Fragment key={String(index)}>
                        <div className="row m-0 p-0">
                          <div className="col-lg-6 border-top border-bottom p-3 d-flex align-items-center justify-content-between">
                            <PureRadioGroup
                              options={[
                                { label: 'Asistente Comercial', value: 'ac' },
                                { label: 'Comprador', value: 'comprador' },
                              ]}
                              value={credit.Type}
                              onChange={evt =>
                                setFieldValue(
                                  `Credits.${index}.Type`,
                                  evt.currentTarget.value,
                                )
                              }
                            />
                            {values.Credits.length > 1 && (
                              <Button
                                color="white"
                                onClick={evt => {
                                  evt.preventDefault();
                                  remove(index);
                                }}
                              >
                                Borrar
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="row">
                            <FormGroup className="col-12 col-md-6 mt-3">
                              <Label style={{ minWidth: '12em' }}>
                                Institución Financiera
                              </Label>
                              <ExInstitucionFinancieras
                                name={`Credits.${index}.InstitucionFinanciera`}
                                required
                                style={{ width: '13em' }}
                                applyPropertyName="Name"
                              />
                            </FormGroup>
                            <FormGroup className="col-12 col-md-6  mt-3">
                              <Label style={{ minWidth: '12em' }}>
                                Fecha de Envío
                              </Label>
                              <ExField
                                name={`Credits.${index}.Date`}
                                type="datepicker"
                                required
                                style={{ width: '13em' }}
                              />
                            </FormGroup>
                            {credit.Type === 'ac' && (
                              <FormGroup className="col-12 col-md-6  mt-3">
                                <Label style={{ minWidth: '12em' }}>
                                  Resultado
                                </Label>
                                <ExField
                                  name={`Credits.${index}.Result`}
                                  type="select"
                                  style={{ width: '13em' }}
                                >
                                  <option value="Aprobada">Aprobada</option>
                                  <option value="Rechazada">Rechazada</option>
                                  <option value="Pendiente">Pendiente</option>
                                </ExField>
                              </FormGroup>
                            )}
                            {credit.Type !== 'ac' && (
                              <FormGroup className="col-12 col-md-6  mt-3">
                                <Label style={{ minWidth: '12em' }}>
                                  Carga de Documentos
                                </Label>
                                <ExField
                                  name={`Credits.${index}.DocumentCredit`}
                                  type="file"
                                  required
                                  placeholder="Examinar ..."
                                />
                              </FormGroup>
                            )}
                            <FormGroup className="col-12 col-md-6  mt-3">
                              <Label style={{ minWidth: '12em' }}>
                                Pre Aprobación
                              </Label>
                              <ExField
                                name={`Credits.${index}.DocumentPreApprobal`}
                                type="file"
                                required
                                placeholder="Examinar ..."
                              />
                            </FormGroup>
                          </div>
                          <div className="mt-4 mb-3">
                            <Label className="d-flex pb-2">Observaciones</Label>
                            <ExField
                              name={`Credits.${index}.Observacion`}
                              type="textarea"
                              rows={5}
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                    <div className="px-3">
                      <div className="row m-0 p-0 justify-content-end">
                        <div className="col-lg-6 border-top p-0 py-3 d-flex align-items-center justify-content-end">
                          <Button
                            className="m-btn-white m-btn-plus"
                            onClick={() => push(initCredit)}
                          >
                            Agregar Institución Financiera
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              />
            </CollapseContent>
          </Collapse>
          <div className="p-3 text-right border-top">
            <SyncMessage {...selector} />
            {aprobaState && (
              <Button disabled={selector.loading} onClick={submitForm}>
                Aceptar
              </Button>
            )}
            <Button
              disabled={selector.loading}
              onClick={onCancel}
              color="white"
            >
              Cancelar
            </Button>
          </div>
        </>
      )}
    </ExForm>
  );
};

CreditForm.propTypes = {
  selector: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onSelect: PropTypes.func,
};
export default CreditForm;
