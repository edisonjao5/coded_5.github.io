/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { getFileName } from 'containers/App/helpers';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { ESCRITURA_STATE } from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import { Auth } from 'containers/App/helpers';
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';

function Matriz({ initialValues, promesaDoc, onSubmit }) {
  const { EscrituraState } = initialValues;

  if (EscrituraState < ESCRITURA_STATE.Matrices_Escrit_II)
    return null;

  const isCollapsed = (EscrituraState > ESCRITURA_STATE.Rev_Escrit_II);
  const isStepOne = (EscrituraState == ESCRITURA_STATE.Matrices_Escrit_II);

  return (
    <Box collapse={isCollapsed} isOpen={!isCollapsed}>
      <BoxHeader>
        <b>BORRADOR DE ESCRITURA</b>
      </BoxHeader>
      <BoxContent className="p-3">
        <Alert type="warning">
          {isStepOne
            ? "Debes confirmar el envío de la Matriz de Escritura al banco."
            : "Debes revisar que la Matriz tenga los mismos datos que la promesa."
          }
        </Alert>
        {isStepOne && 
          <div className="mt-4">
            <Button onClick={() => {
              const data = new FormData();
              data.append("EscrituraState", ESCRITURA_STATE.Rev_Escrit_I);
              onSubmit(data);
            }} disabled={!Auth.isES()}>
              Matriz de Escritura Enviada
            </Button>
          </div>
        }
        {EscrituraState > ESCRITURA_STATE.Matrices_Escrit_II &&
          <ExForm
            initialValues={initialValues}
            onSubmit={values => {
              const data = new FormData();
              if (EscrituraState == ESCRITURA_STATE.Rev_Escrit_I) {
                if (values['MatrixDeed'].name)
                  data.append('MatrixDeed', values['MatrixDeed']);
                if (values['MatrixInstructions'].name)
                  data.append('MatrixInstructions', values['MatrixInstructions']);
                if (values['PromocionDeed'].name)
                  data.append('PromocionDeed', values['PromocionDeed']);
                data.append('EscrituraState', ESCRITURA_STATE.Rev_Escrit_II);
              }
              else {
                if (values['ModificaPromesa'] && values['ModificaPromesa'].name)
                  data.append('ModificaPromesa', values['ModificaPromesa']);

                data.append('PromesaCoinciden', values['PromesaCoinciden']);
                data.append('EscrituraState', ESCRITURA_STATE.Notaria_I);
              }

              onSubmit(data);
            }}
          >
          {(form) => (
            <>
              <div className="my-3 font-18 rounded-lg d-flex align-items-center">
                <i className="icon icon-check color-success-icon"></i>
                <span className="font-14-rem color-regular">Matriz de Escritura Enviada</span>
              </div>
              <Table size="sm" className="border">
                <tbody>
                  <tr className="align-middle-group border-bottom no-whitespace">
                    <td className="pl-3">
                      <Label>Borrador de Escritura Aprobada por Escrituración</Label>
                    </td>
                    <td className="text-right">
                      <div className="d-flex align-items-center justify-content-end">
                        <ExField
                          type="file"
                          name="MatrixDeed"
                          placeholder="Examinar..."
                          style={{ width: "12em", height: "2.2em" }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="align-middle-group border-bottom no-whitespace">
                    <td className="pl-3">
                      <Label>Borrador de Instrucciones</Label>
                      <span className="font-14-rem color-white-gray ml-2">
                        <em>En caso de que aplique.</em>
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="d-flex align-items-center justify-content-end">
                        <ExField
                          type="file"
                          name="MatrixInstructions"
                          placeholder="Examinar..."
                          style={{ width: "12em", height: "2.2em" }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="align-middle-group border-bottom no-whitespace">
                    <td className="pl-3">
                      <Label>Escritura de Promoción</Label>
                      <span className="font-14-rem color-white-gray ml-2">
                        <em>En caso de que aplique.</em>
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="d-flex align-items-center justify-content-end">
                        <ExField
                          type="file"
                          name="PromocionDeed"
                          placeholder="Examinar..."
                          style={{ width: "12em", height: "2.2em" }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
              {EscrituraState > ESCRITURA_STATE.Rev_Escrit_I &&
                <>
                  <div className="mt-3">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className="p-2 border-bottom">
                          <Label className="color-warning"> Promesa </Label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="font-14-rem">{getFileName(promesaDoc)}</span>
                          <a href={promesaDoc} target="_blank" className="font-14-rem main_color btn-arrow mr-3">
                            <b>Ver Promesa</b>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>¿LOS DATOS DE LA ESCRITURACIÓN Y LA PROMESA COINCIDEN?</Label  >
                    <div className="d-flex align-items-center mt-3">
                      {(EscrituraState == ESCRITURA_STATE.Rev_Escrit_II) ?
                        <ExField
                          type="radioGroup"
                          required
                          name="PromesaCoinciden"
                          options={[
                            { label: 'SI', value: '1' },
                            { label: 'NO', value: '0' },
                          ]}
                          itemClassName="pr-4"
                        /> :
                        <Label>{initialValues.PromesaCoinciden == 1 ? "SI" : "NO"}</Label>
                      }
                    </div>
                  </div>
                  {EscrituraState == ESCRITURA_STATE.Rev_Escrit_II && form.values.PromesaCoinciden == 0 && <>
                    <div className="mt-4">
                      <Alert type="warning">
                        Debes revisar que la Matriz tenga los mismos datos que la promesa.
                      </Alert>
                    </div>
                    <div className="mt-3 d-flex align-items-center">
                      <Label >Modificación de Promesa</Label>
                      <ExField
                        type="file"
                        name="ModificaPromesa"
                        placeholder="Examinar..."
                        style={{ width: "9em", height: "2.2em" }}
                        className="ml-4 mt-2"
                      />
                    </div>
                  </>}

                  {EscrituraState > ESCRITURA_STATE.Rev_Escrit_II && <>
                    <Alert type="success" className="background-color-success-original" icon={false}>
                      <i className="icon icon-check color-white mr-4"></i>
                      <Label className="color-white">
                        La Modificación de Promesa está lista. Ya puedes descargar la Escritura.
                      </Label>
                    </Alert>
                    <div className="mt-3 d-flex align-items-center">
                      <Label >Modificación de Promesa</Label>
                      <span className="font-14-rem ml-4">{getFileName(promesaDoc)}</span>
                    </div>                    
                    <div className="col-md-6 offset-md-6">
                      <div className="d-flex justify-content-end border-top">
                        <div className="d-flex mt-4">
                          <Button
                            className="m-btn-download"
                            onClick={() => {
                              
                            }}
                          >
                            Descargar Escritura
                          </Button>
                          <Button className="m-btn-white" type="reset">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>}
                </>}
                { EscrituraState < ESCRITURA_STATE.Notaria_I &&
                  <div className="row mt-4">
                    <div className="col-md-6 offset-md-6">
                      <div className="d-flex justify-content-end border-top">
                        <div className="d-flex mt-4">
                          {((form.values.PromesaCoinciden == 0) ||
                            (EscrituraState == ESCRITURA_STATE.Rev_Escrit_I)) ?
                            <Button type="submit">
                              Guardar
                            </Button> :
                            <Button
                              className="m-btn-download"
                              onClick={() => {
                                form.submitForm();

                              }}
                            >
                              Guardar y Descargar Escritura
                            </Button>
                          }
                          <Button className="m-btn-white" type="reset">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
            </>
          )}
          </ExForm>
        }
      </BoxContent>
    </Box>
  );
}

Matriz.propTypes = {
  initialValues: PropTypes.object,
  promesaDoc: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Matriz;
