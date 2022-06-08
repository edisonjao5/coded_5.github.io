/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import { UserProject } from 'containers/Project/helper';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { getFileName } from 'containers/App/helpers';
import { Form as ExForm, Field as ExField } from 'components/ExForm';
import PromesaObservationForm from '../Observation/Form';

const SyncMassage = WithLoading();

export function PhaseFirmaOrNegociacionPromesa({
  selector,
  entity,
  onSubmit,
  onFirma,
}) {
  const initialValues = {
    Condition: entity.Condition || [],
    currentAction: 'nego',
    Comment: '',
    Resolution: '',
    DateEnvioPromesaToCliente: entity.DateEnvioPromesaToCliente || '',
  };
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        if (values.currentAction === 'firma') return onFirma(values);
        if (
          values.currentAction === 'nego' ||
          values.currentAction === 'rechazar'
        )
          return onSubmit(values);
        return '';
      }}
    >
      {form => {
        const { Condition = [], NewCondition = '' } = form.values;
        return (
          <>
            <Box>
              <BoxHeader>
                <b>PROMESA</b>
              </BoxHeader>
              <BoxContent>
                <div className="d-flex align-items-center">
                  <span className="font-14-rem mr-3">Promesa</span>
                  <span className="font-14-rem mx-2">
                    {getFileName(entity.DocumentPromesa)}
                  </span>
                  <a
                    href={entity.DocumentPromesa}
                    target="_blank"
                    download
                    className="font-14-rem mx-2 btn-arrow"
                  >
                    <b>Ver Promesa</b>
                  </a>
                </div>
              </BoxContent>
            </Box>
            {UserProject.isVendor() && (
              <Box>
                <BoxHeader>
                  <b>Firma Promesa</b>
                </BoxHeader>
                <BoxContent>
                  <>
                    <div className="d-flex justify-content-end">
                      {form.values.currentAction === 'firma' && (
                        <div className="p-0">
                          <div className="d-flex text-right">
                            <ExField
                              type="datePicker"
                              name="DateEnvioPromesaToCliente"
                              required
                            />
                            <Button
                              className="m-btn"
                              type="submit"
                              onClick={() => {
                                form.setFieldValue('Resolution', true);
                                form.submitForm();
                              }}
                              disabled={selector.loading}
                            >
                              Envia a Cliente
                            </Button>
                          </div>
                        </div>
                      )}
                      {form.values.currentAction !== 'firma' && (
                        <Button
                          disabled={selector.loading}
                          onClick={() => {
                            form.setValues({
                              ...form.values,
                              currentAction: 'firma',
                            });
                          }}
                        >
                          Firmar
                        </Button>
                      )}
                      <Button
                        disabled={
                          form.values.currentAction === 'nego' 
                          ? NewCondition.trim() === '' 
                          : selector.loading
                        }
                        className="m-btn-white m-btn-plus"
                        onClick={() => {
                          if(form.values.currentAction === 'nego' ){
                            form.setFieldValue('Resolution', true);
                              const newValue = NewCondition.trim();
                              if (newValue !== '') {
                                Condition.push({ Description: newValue });
                              }
                              form.setValues({
                                Condition,
                                NewCondition: newValue,
                                currentAction: 'nego',
                                Comment: '',
                                DateEnvioPromesaToCliente: '',
                              });
                              form.submitForm();
                          }
                          else form.setValues({ currentAction: 'nego' })
                        }}
                      >
                        El cliente quiere negociar
                      </Button>
                      <Button
                        disabled={selector.loading}
                        color="white"
                        onClick={() =>
                          form.setValues({
                            ...form.values,
                            currentAction: 'rechazar',
                          })
                        }
                      >
                        Rechazar Promesa
                      </Button>
                    </div>
                    {(form.values.currentAction === 'nego') && (
                      <div className="p-0">
                        <PromesaObservationForm form={form} />
                        {/* <div className="py-3 text-right">
                          <Button
                            className="m-btn"
                            type="submit"
                            onClick={() => {
                              form.setFieldValue('Resolution', true);
                              const newValue = NewCondition.trim();
                              if (newValue !== '') {
                                Condition.push({ Description: newValue });
                              }
                              form.setValues({
                                Condition,
                                NewCondition: '',
                                currentAction: 'nego',
                                Comment: '',
                                DateEnvioPromesaToCliente: '',
                              });
                              form.submitForm();
                            }}
                            disabled={selector.loading}
                          >
                            Envia a JP
                          </Button>
                        </div> */}
                      </div>
                    )}
                    {(form.values.currentAction === 'rechazar') && (
                      <div className="py-3 ">
                        <span className="d-block text-left font-14-rem">
                          <b>Comentarios (En caso de Rechazo)</b>
                        </span>
                        <div className="py-3 ">
                          <textarea
                            className="w-100 d-block rounded-lg shadow-sm"
                            rows="5"
                            value={form.values.Comment}
                            onChange={evt =>
                              form.setFieldValue(
                                'Comment',
                                evt.currentTarget.value.trim(),
                              )
                            }
                          />
                        </div>
                        <Button
                          disabled={selector.loading}
                          onClick={() => {
                            form.setFieldValue('Resolution', false);
                            form.submitForm();
                          }}
                        >
                          Rechazar Promesa
                        </Button>
                      </div>
                    )}
                  </>
                </BoxContent>
              </Box>
            )}
            <div className="py-3">
              <SyncMassage {...selector} />
            </div>
          </>
        );
      }}
    </ExForm>
  );
}

PhaseFirmaOrNegociacionPromesa.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onFirma: PropTypes.func,
};

export default PhaseFirmaOrNegociacionPromesa;
