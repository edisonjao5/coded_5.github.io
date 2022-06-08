/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';
import { ESCRITURA_STATE } from 'containers/App/constants';
import { getCheckPromesaModel } from '../models';
import DocumentItem from '../DocumentItem';
import { stringToBoolean } from 'containers/App/helpers';

function RevisionPromesa({
  proyectoState,
  canEdit=false, 
  initialValues,
  onDownloadPromesa,
  onSubmit
}) {
  if(proyectoState === null)
    return null;
 
  const model = getCheckPromesaModel(initialValues);
  const isCollapse = (initialValues.EscrituraState > ESCRITURA_STATE.Fechas_Avisos_I);
  const isOpen = (initialValues.EscrituraState == ESCRITURA_STATE.Fechas_Avisos_I);

  return (
    <Box collapse={isCollapse} isOpen={isOpen}>
      <BoxHeader>
        <b>REVISIÓN PROMESA A ESCRITURAR</b>
      </BoxHeader>
      <ExForm
        initialValues={initialValues}
        onSubmit={(values)=>{
          const data = new FormData();
          model.forEach(({name,type}) => {
            if(type==='file' && values[name].name)
              data.append(name, values[name]);
            else if(values[name] !== null)
              data.append(name, values[name]);
          });
          data.append("CarepetaFisicaState", values['CarepetaFisicaState']);
          data.append("EscrituraState", ESCRITURA_STATE.Fechas_Avisos_II);
          onSubmit(data);
        }}
      >
        {() => (
          <>
            <BoxContent className="p-3">
              <Alert type="warning">
                Debes revisar si la promesa tiene condiciones especiales, y verificar que sea igual que las condiciones que puso Legal.
              </Alert>
              <div className="d-flex align-items-center mr-4">
                <ExField
                  type="checkbox"
                  name="CarepetaFisicaState"
                  className="m-0"
                  readOnly={!(canEdit && isOpen)}
                />                
                <Label className="pr-3">Recibí Carpeta Física</Label>
                <Button
                  className="m-btn-download m-btn-white order-3"
                  onClick={onDownloadPromesa}
                >
                  Descargar promesa
                </Button>                
              </div>
              <div className="mt-3 table-responsive-xl background-color-white rounded py-3">
                <Table size="sm" className="m-0 border-right border-left p-0">
                  <tbody>
                    {model.map( ({label, name, type}) => (
                      <tr className="align-middle-group border-bottom no-whitespace" key={name}>
                        {type === "label" ? (
                          <td className="pl-3 no-whitespace" colSpan="3">
                            <span className="font-14-rem color-regular color-gray">
                              <b>{label}</b>
                            </span>
                          </td>): ( <>
                          <td className="pl-3">
                            <span className="font-14-rem color-regular">
                              <b>{label}</b>
                            </span>
                          </td>
                          <td className="w-100"></td>
                          <td className="pr-3">
                            <div className="d-flex align-items-center justify-content-end pr-2">
                              {type == "radios" && 
                                <ExField
                                  type="radios"
                                  required
                                  name={name}
                                  options={[
                                    { label: 'Si', value: '1' },
                                    { label: 'No', value: '0' },
                                  ]}
                                  itemClassName="col-auto px-1"
                                  readOnly={!(canEdit && isOpen)}
                                />
                              }
                              {type == "file" &&
                                <DocumentItem name={name} canUpload={(canEdit && isOpen)} isCompany={stringToBoolean(initialValues.Cliente.IsCompany)}/>
                              }
                            </div>
                          </td> </>)
                        }
                      </tr>
                    ))}                    
                  </tbody> 
                </Table>
              </div>
            </BoxContent>
            {canEdit && isOpen && (
            <BoxFooter>
              <Button type="submit">
                Guardar
              </Button>
              <Button type="reset" color="white">
                Cancelar
              </Button>
              <Alert type="danger" className="mt-4">
                El resulrado de la revisión es distinto a la versión de Legal. Gerencia será notificada del caso.
              </Alert>
            </BoxFooter>
            )}
          </>
        )}
      </ExForm>
    </Box>
  );
}

RevisionPromesa.propTypes = {
  proyectoState: PropTypes.number,
  canEdit: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  onDownloadPromesa: PropTypes.func
};

export default RevisionPromesa;
