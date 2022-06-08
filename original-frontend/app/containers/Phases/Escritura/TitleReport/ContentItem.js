/**
 *
 * Project
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import moment from 'components/moment';
import Button from 'components/Button';
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';

function ContentItem({ initialValues, name, onSubmit }) {
  const [observacion, setObservacion] = useState("");
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        const data = new FormData();
        data.append(`${name}State`, (values[`${name}State`] == null) ? "Pendiente":"Aprobado");
        if(values[`${name}ReportDate`] !== "")
          data.append(`${name}ReportDate`, moment(values[`${name}ReportDate`]).format('YYYY-MM-DD'));
        if(values[`${name}Observations`].length)
          data.append(`${name}Observations`, JSON.stringify(values[`${name}Observations`]));
        if(values[`${name}ReportFile`].name)
          data.append(`${name}ReportFile`, values[`${name}ReportFile`]);
        onSubmit(data);
      }}
    >
      {(form) => (
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex justify-content-start align-items-center pt-3 border-top">
                <Label className="m-0 pr-3">Fecha envío Informe de Títulos</Label>
                {initialValues[`${name}ReportDate`]
                  ? <span className="font-14-rem ml-3">
                    {moment(initialValues[`${name}ReportDate`]).format("DD MMM YYYY")}
                  </span>
                  : <ExField type="datePicker" name={`${name}ReportDate`} required />
                }
              </div>
            </div>
          </div>
          {initialValues[`${name}State`] !== null && <>
            <div className="mt-3 table-responsive-xl">
              <span className="font-14-rem">
                <b>OBSERVACIONES</b>
              </span>
              <Table size="sm" className="table-borderless mt-0">
                <tbody>
                  {(form.values[`${name}Observations`] || []).map((value, index) => {
                    return (
                      <tr className="align-middle-group no-whitespace" key={index}>
                        <td width="1">
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
                    )
                  })}
                </tbody>
              </Table>
            </div>
            {initialValues[`${name}State`] !== "Aprobado" &&
              <div className="mt-3">
                <Label>Nueva Observación</Label>
                <div className="pt-2">
                  <textarea className="w-100 d-block rounded-lg shadow-sm" 
                    rows="5" onChange={(e)=>setObservacion(e.target.value)}
                    value={observacion}
                  />
                </div>
                <div className="mt-3 text-right">
                  <Button
                    disabled={observacion===""}
                    onClick={()=>{
                      form.setFieldValue(`${name}Observations`,
                        [...form.values[`${name}Observations`], 
                          {"date": new Date, "comment": observacion}
                        ]);
                      setObservacion("");
                    }}
                  >
                    Guardar Observación
                  </Button>
                </div>
              </div>
            }
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex justify-content-start align-items-center py-3 border-bottom">
                  <Label>APROBACIÓN INFORME DE TÍTULOS</Label>
                </div>
              </div>
            </div>
            <div className="mt-3 table-responsive-xl background-color-white rounded py-3">
              <Table size="sm" className="m-0 border-right border-left p-0">
                <tbody>
                  <tr className="align-middle-group border-bottom no-whitespace">
                    <td className="pl-3">
                      <Label>Informe Aprobado por Institución Financiera</Label>
                    </td>
                    <td className="text-right">
                      <div className="d-flex align-items-center justify-content-end">
                        <span className="font-14-rem mr-2">Aprobación Banco Estado.pdf</span>
                        <ExField
                          type="file"
                          name={`${name}ReportFile`}
                          placeholder="Examinar..."
                          style={{ width: "9em", height: "2.2em" }}
                          required
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </>}
          {initialValues[`${name}State`] !== "Aprobado" &&
            <div className="row mt-4">
              <div className="col-md-6 offset-md-6">
                <div className="d-flex justify-content-end py-3 border-top">
                  <Button type="submit">
                    {initialValues[`${name}State`] == null ? "Guardar" : "Guardar aprovación"}
                  </Button>
                  <Button type="reset" className="m-btn-white">Cancelar</Button>
                </div>
              </div>
            </div>
          }
        </>
      )}
    </ExForm>
  );
}

ContentItem.propTypes = {
  canEdit: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ContentItem;
