/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { getFileName } from 'containers/App/helpers';
import moment from 'components/moment';

const SyncMassage = WithLoading();

export function PhaseApproveConfeccionPromesa({ selector, entity, onSubmit }) {
  const [withText, setWithText] = useState({ text: '', open: false });

  return (
    <>
      <Box>
        <BoxHeader>
          <b>Aprobacion Confeccion Promesa</b>
        </BoxHeader>
        <BoxContent>
          <div className="d-flex align-items-center mt-3">
            <span className="font-14-rem mr-3">
              <b>Promesa</b>
            </span>
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
          <div className="d-flex align-items-center mt-3">
            <span className="font-14-rem mr-3">
              <b>Fecha o plazo para firma de escritura</b>
            </span>
            <span className="font-14-rem mx-2">
              {entity.FechaFirmaDeEscritura && moment(entity.FechaFirmaDeEscritura).format('DD MMM YYYY')}
            </span>
          </div>
          <div className="d-flex align-items-center mt-3">
            <span className="font-14-rem mr-3">
              <b>echa entrega de inmueble</b>
            </span>
            <span className="font-14-rem mx-2">
              {entity.FechaEntregaDeInmueble && moment(entity.FechaEntregaDeInmueble).format('DD MMM YYYY')}
            </span>
          </div>
          <div className="d-flex align-items-center mt-3">
            <span className="font-14-rem mr-3">
              <b>Otras clausulas especiales</b>
            </span>
            <span className="font-14-rem mx-2">
              {entity.DesistimientoEspecial}
            </span>
          </div>
          <div className="d-flex align-items-center mt-3">
            <span className="font-14-rem mr-3">
              <b>Modificación en la cláusula de multas (% de multas)</b>
            </span>
            <span className="font-14-rem mx-2">
              {entity.ModificacionEnLaClausula}
            </span>
          </div>
          <div className="d-flex align-items-center mt-3">
            <span className="font-14-rem mr-3">
              <b>
                Método oficial de comunicación para comienzo de escrituración
              </b>
            </span>
            <span className="font-14-rem mx-2">
              {entity.MetodoComunicacionEscrituracion}
            </span>
          </div>
          <div className="d-flex mt-3">
            <span className="d-flex font-14-rem mr-3">
              <b>Pago por instrucciones</b>
            </span>
            <div >
            {(entity.PaymentInstructions || []).map((payment, index) => (
              <div className="d-flex align-items-center" key={index}>
                <span className="font-14-rem mx-2">
                  Fecha: {moment(payment.Date).format('DD MMM YYYY')}
                </span>
                <span className="font-14-rem mx-2">
                  {getFileName(payment.Document)}
                </span>
                <a
                  href={payment.Document}
                  target="_blank"
                  download
                  className="font-14-rem mx-2 btn-arrow"
                >
                  <b>Ver</b>
                </a>
              </div>
            ))}
            </div>
          </div>
        </BoxContent>
        <BoxFooter>
          <Button
            disabled={selector.loading}
            onClick={() =>
              onSubmit({
                Comment: '',
                Resolution: true,
              })
            }
          >
            Aprobar
          </Button>
          <Button
            disabled={selector.loading}
            color="white"
            onClick={() => setWithText({ text: '', open: true })}
          >
            Rechazar
          </Button>
          {withText.open && (
            <div className="py-3 ">
              <span className="d-block text-left font-14-rem">
                <b>Comentarios (En caso de Rechazo)</b>
              </span>
              <div className="py-3 ">
                <textarea
                  className="w-100 d-block rounded-lg shadow-sm"
                  rows="5"
                  onChange={evt =>
                    setWithText({ ...withText, text: evt.currentTarget.value })
                  }
                />
              </div>
              <Button
                disabled={selector.loading}
                onClick={() =>
                  onSubmit({
                    Comment: withText.text.trim(),
                    Resolution: false,
                  })
                }
              >
                Rechazar
              </Button>
            </div>
          )}
        </BoxFooter>
      </Box>
      <div className="py-3">
        <SyncMassage {...selector} />
      </div>
    </>
  );
}

PhaseApproveConfeccionPromesa.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default PhaseApproveConfeccionPromesa;
