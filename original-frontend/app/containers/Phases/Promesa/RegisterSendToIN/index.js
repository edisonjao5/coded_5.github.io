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

export function PhaseRegisterSendToIN({ selector, entity, onSubmit }) {
  const [withText, setWithText] = useState({ text: '', open: false });

  return (
    <>
      <Box>
        <BoxHeader>
          <b>Registro de fase Enviar a IN</b>
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

PhaseRegisterSendToIN.propTypes = {
  entity: PropTypes.object,
  canUpload: PropTypes.bool,
  selector: PropTypes.object,
  form: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseRegisterSendToIN;
