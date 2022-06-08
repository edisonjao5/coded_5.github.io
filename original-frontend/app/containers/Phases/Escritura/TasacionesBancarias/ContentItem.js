/**
 *
 * Project
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Button from 'components/Button';
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';

function ContentItem({ initialValues, name, onSubmit }) {
  const title={
    'TasacionStateBank': 'Banco Estado',
    'TasacionSantander': 'Santander',
    'TasacionChileBank': 'Banco de Chile'
  }
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        const data = new FormData();
        console.log(name, values[name].name);
        if(values[name].name){
          data.append(name, values[name]);
          onSubmit(data);
        }
      }}
    >
      {(form) => (
        <>
          <div className="table-responsive-xl background-color-white rounded py-3">
            <Table size="sm" className="m-0 border-right border-left p-0">
              <tbody>
                <tr className="align-middle-group border-bottom no-whitespace">
                  <td className="pl-3">
                    <Label>Informe de Tasaciónes Bancarias</Label>
                  </td>
                  <td className="text-right">
                    <div className="d-flex align-items-center justify-content-end">
                      <span className="font-14-rem mr-2">Tasaciónes {title[name]}.pdf</span>
                      <ExField
                        type="file"
                        name={name}
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
          {!initialValues[name] &&
            <div className="row mt-4">
              <div className="col-md-6 offset-md-6">
                <div className="d-flex justify-content-end py-3 border-top">
                  <Button type="submit">Guardar</Button>
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
  name: PropTypes.string,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ContentItem;
