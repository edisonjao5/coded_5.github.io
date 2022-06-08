/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { FieldArray } from 'formik';
import { ESCRITURA_STATE } from 'containers/App/constants';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Form as ExForm, Field as ExField, Label, FormGroup } from 'components/ExForm';
import CheckAprova from './CheckAprova';

function AprobaHipotecarios({initialValues, onSubmit}) {
  const { EscrituraState } = initialValues;

  if(EscrituraState < ESCRITURA_STATE.Apr_Creditos_I)
    return null;

  if(EscrituraState > ESCRITURA_STATE.Apr_Creditos_I){
    return <CheckAprova initialValues={initialValues} onSubmit={onSubmit}/>
  }
  const isCollapsed = EscrituraState > ESCRITURA_STATE.Apr_Creditos_I;

  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        const data = new FormData();
        values.AprobacionCreditos.forEach((credito, index) => {
          if(credito.FormalCredit == 1){
            if(credito.AcFinancialInstitution.name)
              data.append(`AprobacionCreditos.${index}.AcFinancialInstitution`,
                          credito.AcFinancialInstitution);
          }
          else{
            if(credito.ClientPersonalHealthStatement.name)
              data.append(`AprobacionCreditos.${index}.ClientPersonalHealthStatement`,
                          credito.ClientPersonalHealthStatement);
          }
          data.append(`AprobacionCreditos.${index}.FormalCredit`, credito.FormalCredit);
          data.append(`AprobacionCreditos.${index}.BankName`, credito.BankName);
          data.append(`AprobacionCreditos.${index}.ExecutiveEmail`, credito.ExecutiveEmail);
          data.append(`AprobacionCreditos.${index}.ExecutiveName`, credito.ExecutiveName);
        });

        data.append("CreditosNumber", values.AprobacionCreditos.length);
        data.append("EscrituraState", ESCRITURA_STATE.Apr_Creditos_II);

        onSubmit(data, 0);
      }}
    >
    {form => (
      <Box collapse={isCollapsed} isOpen={!isCollapsed}>
        <BoxHeader>
          <b>APROBACIÓN CRÉDITOS HIPOTECARIOS</b>
        </BoxHeader>
        <BoxContent className="p-3">
          <Alert type="warning">
            Debes gestionar las aprobaciones formales de los créditos.
          </Alert>
          <div className="mt-3">
            <Label>
              ¿QUIÉN OBTIENE EL CRÉDITO?
            </Label>
            
            <FieldArray
              name="AprobacionCreditos"
              render={({ remove, push, replace }) => (
              <>
                {(form.values.AprobacionCreditos || []).map((value, index) =>
                <>
                  <div className="d-flex align-items-center p-0 mt-3">
                    <ExField
                      type="radioGroup"
                      required
                      name={`AprobacionCreditos.${index}.FormalCredit`}
                      options={[
                        { label: 'Asistente Comercial', value: '1' },
                        { label: 'Comprador', value: '0' },
                      ]}
                      itemClassName="pr-4"
                    />
                  </div>
                  
                  { form.values.AprobacionCreditos[index].FormalCredit == 0 && 
                    <Table size="sm" className="mt-3 border-right border-left p-0">
                      <tbody>
                        <tr className="align-middle-group border-bottom no-whitespace">
                          <td className="pl-3">
                            <Label>
                              Declaración Personal de Salud
                            </Label>
                          </td>
                          <td className="text-right">
                            <div className="d-flex align-items-center justify-content-end">
                              <ExField
                                type="file"
                                name={`AprobacionCreditos.${index}.ClientPersonalHealthStatement`}
                                placeholder = "Examinar..."
                                style={{width:"12em", height:"2.2em"}}
                                required
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  }
                  <div className="row justify-content-between mt-3" key={index}>
                    <div className="col-md-6 mt-3">
                      <FormGroup className="align-items-center">
                        <Label className="pr-4 no-whitespace">Banco</Label>
                        <ExField
                          type="select"
                          className="w-100"
                          name={`AprobacionCreditos.${index}.BankName`}
                          // required
                        >
                          <option >Banco Estado</option>
                          <option>Banco de Chile</option>
                        </ExField>
                      </FormGroup>
                    </div>  
                    <div className="col-md-6 mt-3">
                      <FormGroup className="align-items-center">
                        <Label className="pr-4 no-whitespace">Nombre Ejecutivo</Label>
                        <ExField                
                          className="w-100"
                          name={`AprobacionCreditos.${index}.ExecutiveName`}
                          // required
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-6 mt-3">
                      <FormGroup className="align-items-center">
                        <Label className="pr-4 no-whitespace">Email Ejecutivo</Label>
                        <ExField                
                          className="w-100"
                          name={`AprobacionCreditos.${index}.ExecutiveEmail`}
                          // required
                        />
                      </FormGroup>
                    </div>
                    { form.values.AprobacionCreditos[index].FormalCredit == 1 && 
                      <div className="col-md-6 mt-3">
                        <FormGroup className="align-items-center">
                          <Label className="pr-4 no-whitespace">                    
                            {/* Carta de Aprobación */}
                            Comprobante Institución Financiera
                          </Label>                  
                          <ExField
                            type="file"
                            name={`AprobacionCreditos.${index}.AcFinancialInstitution`}
                            placeholder = "Examinar..."
                            required
                          /> 
                        </FormGroup>
                      </div>
                    }
                  </div>
                  </>
                )}
                <div className="row mt-4">
                  <div className="col-md-6 offset-md-6">
                    <div className="d-flex border-top justify-content-end">
                      <Button 
                        className="mt-3 m-btn-plus m-btn-white order-3"
                        onClick={() => {push({"FormalCredit":'1', "BankName": 'Banco Estado'})}}
                      >
                        Agregar Institución Financiera
                      </Button>
                    </div>
                  </div>
                </div>
              </>
              )}
            />
          </div>
        </BoxContent>
        <BoxFooter>
          <Button type="submit">
            Guardar
          </Button>
          <Button color="white" type="reset">
            Cancelar
          </Button>
        </BoxFooter>
      </Box>
    )}
    </ExForm>
  );
}

AprobaHipotecarios.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func
};

export default AprobaHipotecarios;
