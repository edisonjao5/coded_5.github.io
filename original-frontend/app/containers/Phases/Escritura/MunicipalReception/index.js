/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import moment from 'components/moment';
import { Box, BoxContent, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';
import { Auth } from 'containers/App/helpers';
import { ESCRITURA_STATE } from 'containers/App/constants';

function MunicipalReception({ state, initialValues, onSubmit }) {
  const canEdit = (state == ESCRITURA_STATE.Recep_Mun);
  return (
    <Box>
      <ExForm
        initialValues={initialValues}
        onSubmit={(values) => {
          const data = new FormData();
          data.append("SubmissionDate",moment(values.SubmissionDate).format('YYYY-MM-DD'));
          data.append("EscrituraProyectoState", ESCRITURA_STATE.Fechas_Avisos_I);
          onSubmit(data);
        }}
      >
        {form => (
          <>
            <BoxContent className="p-3">
              {canEdit &&
                <Alert type="warning">
                  Debes indicar la fecha de presentación de solicitud de recepción final Municipal.
                </Alert>
              }
              <div className="d-flex align-items-center my-2">
                <Label className="mr-5">Fecha de presentación de solicitud de recepción final Municipal</Label>
                {canEdit ?
                  <ExField
                    type="datePicker"
                    name="SubmissionDate"
                    required
                    disabled={!Auth.isGerenteComercial()}
                  /> :
                  <span className="font-14-rem color-regular">
                    {moment(form.values.SubmissionDate).format('DD MMM YYYY')}
                  </span>
                }
              </div>
            </BoxContent>
            {canEdit &&
              <BoxFooter>
                <Button type="submit" disabled={!Auth.isGerenteComercial()}>
                  Aceptar
                </Button>
                <Button type="reset" color="white">
                  Cancelar
                </Button>
              </BoxFooter>
            }
          </>
        )}
      </ExForm>
    </Box>
  );
}

MunicipalReception.propTypes = {
  state: PropTypes.number,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default MunicipalReception;
