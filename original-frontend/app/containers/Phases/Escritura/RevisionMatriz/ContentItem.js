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

function ContentItem({ initialValues, name, canEdit, onSubmit }) {
  const title={
    'StateBank': 'Banco Estado',
    'Santander': 'Santander',
    'ChileBank': 'Banco de Chile'
  }

  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        const data = new FormData();
        if(values[`Revision${name}`].name){
          data.append(`Revision${name}`, values[`Revision${name}`]);
          onSubmit(data);
        }
      }}
    >
      {(form) => (
        <>
          <div className="row">
            <div className="col-md-6 pt-3 mt-0 border-top">
              { initialValues[`RevisionConfirmo${name}`] == false &&
                <Button 
                  onClick={()=>{
                    const data = new FormData();
                    data.append(`RevisionConfirmo${name}`, true);
                    onSubmit(data);
                  }}
                  disabled={!initialValues[`Revision${name}`]}
                >
                  Confirmo Revisión de Matriz
                </Button>
              }
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-end">
              <span className="font-14-rem mr-2">Matriz {title[name]}.pdf</span>
              <ExField
                type="file"
                name={`Revision${name}`}
                placeholder="Examinar..."
                style={{ width: "9em", height: "2.2em" }}
                required
              />
            </div>
          </div>
          { initialValues[`RevisionConfirmo${name}`] == false && canEdit && 
            <div className="row mt-4">
              <div className="col-md-6 offset-md-6">
                <div className="d-flex justify-content-end py-3">
                  <Button type="submit" disabled={initialValues[`Revision${name}`]}>Guardar Revisión</Button>
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
  canEdit: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default ContentItem;
