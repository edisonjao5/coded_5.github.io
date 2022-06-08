/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ESCRITURA_STATE } from 'containers/App/constants';
import { Auth } from 'containers/App/helpers';
import moment from 'components/moment';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';

function NotificacionComprado({ initialValues, proyectoState, onSubmit }) {
  const { EscrituraState } = initialValues;
  if(EscrituraState < ESCRITURA_STATE.Fechas_Avisos_II) return null;

  const isCollapsed = EscrituraState > ESCRITURA_STATE.A_Comercial && 
                      proyectoState > ESCRITURA_STATE.A_Comercial;

  const isNotifiStepOne = (EscrituraState < ESCRITURA_STATE.A_Comercial) || 
                          (proyectoState < ESCRITURA_STATE.Apr_Creditos_I);

  return (
    <Box collapse={isCollapsed} isOpen={!isCollapsed}>
      <BoxHeader>
        <b>NOTIFICACIÓN AL COMPRADOR</b>
      </BoxHeader>
      <BoxContent className="p-3">
        <Alert type="warning">
          { isNotifiStepOne
            ? "Debes Notificar al Comprador."
            : "Debes Notificar por segunda vez al Comprador."
          }
        </Alert>
        { !isNotifiStepOne && <>
          <div className="py-3">
            <i className="icon icon-check color-success-icon"></i>
            <Label className="ml-3">Primera Notificación Comfirmada.</Label>
          </div>
          <Label className="font-16-rem ml-3">SEGUNDA NOTIFICACIÓN</Label></>
        }
        <ExForm
          initialValues={initialValues}
          onSubmit={(values)=>{
            if(values.NoticeToClientDate){
              onSubmit({
                "NoticeToClientDate": moment(values.NoticeToClientDate).format('YYYY-MM-DD'),
                "EscrituraState": ESCRITURA_STATE.Apr_Creditos_I
              });
            }
            else onSubmit({"EscrituraState": ESCRITURA_STATE.A_Comercial});
          }}
        >
        {() => (
          <div className="d-flex align-items-center justify-content-between pr-2 mt-4">
            <Button type="submit"
              disabled={!Auth.isES() ||
                        (proyectoState <= ESCRITURA_STATE.A_Comercial && EscrituraState >= ESCRITURA_STATE.A_Comercial) || 
                        (proyectoState > ESCRITURA_STATE.A_Comercial && EscrituraState >= ESCRITURA_STATE.Apr_Creditos_I)}
            >
              { isNotifiStepOne
                ? "Confirmo Notificación"
                : "Confirmo Segunda Notificación"
              }
            </Button>
            { !isNotifiStepOne && 
              <div className="d-flex align-items-center">
                <span className="font-14-rem pr-3">
                  <b>Fecha Segunda Notificación</b>
                </span>
                {
                  initialValues.NoticeToClientDate
                  ? 
                  <span className="font-14-rem color-regular">
                    {moment(initialValues.NoticeToClientDate).format('DD MMM YYYY')}
                  </span>
                  :
                  <ExField
                    type="datePicker"
                    name="NoticeToClientDate"
                    style={{ width: "8em", height: "2.2em" }}
                    required
                    disabled={!Auth.isES()}
                  />
                }
              </div>
            }
          </div>
        )}
        </ExForm>
      </BoxContent>
    </Box>
  );
}

NotificacionComprado.propTypes = {
  initialValues: PropTypes.object,
  proyectoState: PropTypes.number,
  onSubmit: PropTypes.func,
};

export default NotificacionComprado;
