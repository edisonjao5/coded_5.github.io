/**
 *
 * Project
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getFileName } from 'containers/App/helpers';
import { ESCRITURA_STATE } from 'containers/App/constants';
import moment from 'components/moment';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';

import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';

function CheckAprova({ initialValues, onSubmit }) 
{
  const { project } = window;

  const { AprobacionCreditos, EscrituraState } = initialValues;  
  const canEdit = (EscrituraState < ESCRITURA_STATE.ETitulo_Tasacion);
  const isCollapsed = !canEdit;// && project.EscrituraProyectoState > ESCRITURA_STATE.ETitulo_Tasacion_I;

  const [observacion, setObservacion] = useState("");

  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        const data = new FormData();
        values.AprobacionCreditos.forEach((credito, index) => {
          if(credito.FormalCredit == 1){
            data.append(`AprobacionCreditos.${index}.AcObservations`, JSON.stringify(credito.AcObservations));
          }
          data.append(`AprobacionCreditos.${index}.AprobacionCreditoState`, credito.AprobacionCreditoState);
          data.append(`AprobacionCreditos.${index}.AprobacionCreditoID`, credito.AprobacionCreditoID);
        });

        data.append("CreditosNumber", values.AprobacionCreditos.length);
        data.append("DeclarePhysicalFolderState", values.DeclarePhysicalFolderState);
        data.append("EscrituraState", ESCRITURA_STATE.ETitulo_Tasacion);

        onSubmit(data, 1);
      }}
    >
      {form => (
        <Box collapse={isCollapsed} isOpen={!isCollapsed}>
          <BoxHeader>
            <b>APROBACIÓN CRÉDITOS HIPOTECARIOS</b>
          </BoxHeader>
          <BoxContent>
            <div>
              <Alert type="warning">
                Debes gestionar las aprobaciones formales de los créditos.
              </Alert>
              {AprobacionCreditos.map((credito, index) => (
                <div className="mt-3">
                  {credito.FormalCredit == true ?
                    <span className="font-14-rem regular-color-font color-main">
                      <b>DATOS EJECUTIVO INSTITUCIÓN FINANCIERA</b>
                    </span> :
                    <div>
                      <Label>DECLARACIÓN PERSONAL DE SALUD</Label>
                      <div className="font-14-rem mt-3">
                        <span>Archivo</span>
                        <a href={credito.ClientPersonalHealthStatement} className="color-main ml-3">
                          {getFileName(credito.ClientPersonalHealthStatement)}
                        </a>
                      </div>
                      <Label className="regular-color-font d-block mt-3">
                        DATOS EJECUTIVO
                      </Label>
                    </div>
                  }
                  <div className="mt-2">
                    <div className="row justify-content-between">
                      <div className="col-md-6 d-flex align-items-center mt-3">
                        <Label style={{ width: "12.25em" }}>Banco</Label>
                        <span className="font-14-rem">{credito.BankName}</span>
                      </div>
                      <div className="col-md-6 d-flex align-items-center mt-3">
                        <Label style={{ width: "16.5em" }}>Nombre Ejecutivo</Label>
                        <span className="font-14-rem">{credito.ExecutiveName}</span>
                      </div>
                      <div className="col-md-6 d-flex align-items-center mt-3">
                        <Label style={{ width: "12.25em" }}>Email Ejecutivo</Label>
                        <span className="font-14-rem">{credito.ExecutiveEmail}</span>
                      </div>
                      {credito.FormalCredit == true &&
                        <div className="col-md-6 d-flex align-items-center mt-3">
                          <Label className="no-whitespace mr-2">Comprobante Institución Financiera</Label>
                          <span className="font-14-rem">{getFileName(credito.AcFinancialInstitution)}</span>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <div className="py-3 border-top border-bottom">
                        <Label className="d-block">
                          APROBACIÓN CRÉDITO
                        </Label>
                        <div className="d-flex mt-4">
                          <ExField
                            type="radioGroup"
                            name={`AprobacionCreditos.${index}.AprobacionCreditoState`}
                            options={[
                              { label: 'Aprobado', value: '1' },
                              { label: 'Rechazado', value: '0' },
                            ]}
                            itemClassName="pr-4"
                            required
                            readOnly={!canEdit}
                          />

                          { form.values.AprobacionCreditos[index].AprobacionCreditoState == 1 &&
                            <ExField
                              label="Check"
                              type="checkbox"
                              name="Check"
                            />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {credito.FormalCredit == true &&
                    <>
                      <div className="mt-3 table-responsive-xl">
                        <Label>HISTORIAL</Label>
                        <table className="table table-sm table-borderless mt-2">
                          <tbody>
                          {(credito.AcObservations || []).map((value, idx) => (
                              <tr className="align-middle-group no-whitespace" key={idx}>
                                <td style={{width:'10em'}}>
                                  <span className="font-14-rem color-regular">
                                    <em className="color-gray">{moment(value.date).format("DD MMM YYYY")}</em>
                                  </span>
                                </td>
                                <td>
                                  <span className="font-14-rem ">
                                    {value.comment}
                                  </span>
                                </td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                      {canEdit && 
                      <div className="mt-3">
                        <Label>Nueva Observación</Label>
                        <div className="pt-2">
                          <textarea className="w-100 d-block rounded-lg shadow-sm" 
                            rows="5" onChange={(e)=>setObservacion(e.target.value)}
                            value={observacion}
                          >
                          </textarea>
                        </div>
                        <div className="mt-3 text-right">
                          <Button
                            disabled={observacion===""}
                            onClick={()=>{
                              credito.AcObservations.push( {date: new Date, comment: observacion} );
                              setObservacion("");
                            }}
                          >
                            Guardar Observación
                          </Button>
                        </div>
                      </div>
                      }
                    </>
                  }
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Alert type="warning">
                Se enviarán los datos a Escrituración.
              </Alert>
              <Alert type="warning">
                Debes Entregar la carpeta física a Escrituración.
              </Alert>
            </div>
            <div className="d-flex align-items-center justify-content-end mt-3">
              <ExField
                label="Declaro haber entregado la carpeta física a Escrituración"
                type="checkbox"
                name="DeclarePhysicalFolderState"
                readOnly={!canEdit}
              />
              <Button type="submit" disabled={!canEdit}>
                Guardar
              </Button>
              <Button color="white" type="reset">
                Cancelar
            </Button>
            </div>
          </BoxContent>
        </Box>
      )}
    </ExForm>
  );
}

CheckAprova.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func
};

export default CheckAprova;
