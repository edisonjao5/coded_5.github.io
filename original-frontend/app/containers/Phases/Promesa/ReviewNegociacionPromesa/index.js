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

const SyncMassage = WithLoading();

export function PhaseReviewNegociacionPromesa({
  selector,
  entity,
  onSubmit,
  onCancel,
  onContinue,
}) {
  const [withText, setWithText] = useState({ text: '', open: false, state: -1 });

  return (
    <>
      <Box>
        <BoxHeader>
          <b>Negociación de la Promesa</b>
        </BoxHeader>
        <BoxContent>
          <div className="d-flex align-items-center">
            <span className="font-14-rem mr-3">Promesa</span>
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
        </BoxContent>
        <BoxFooter>
          <Button
            color="white"
            disabled={selector.loading}
            onClick={() => setWithText({ text: '', open: true, state:0 })}
          >
            Devolver
          </Button>
          <Button disabled={selector.loading} 
            onClick={() => setWithText({ text: '', open: true, state:1 })}
          >
            Enviar Observaciones a Inmobiliaria
          </Button>
          <Button disabled={selector.loading} color="white" onClick={onCancel}>
            Cancelar
          </Button>
          {withText.open && (
            <div className="py-3 ">
              <span className="d-block text-left font-14-rem">
                <b>Comentarios</b>
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
                onClick={() => {
                  if (withText.state == 0) onContinue(withText.text.trim());
                  else if (withText.state == 1) onSubmit(withText.text.trim());
                  else return;
                }}
              >
                Continuar
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

PhaseReviewNegociacionPromesa.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
};

export default PhaseReviewNegociacionPromesa;
