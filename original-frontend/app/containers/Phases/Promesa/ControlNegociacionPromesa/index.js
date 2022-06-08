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
import { Auth, getFileName } from 'containers/App/helpers';

const SyncMassage = WithLoading();

export function PhaseControlNegociacionPromesa({ selector, entity, onSubmit }) {
  const [withText, setWithText] = useState({ text: '', open: false });

  const userId = Auth.get('user_id');
  let stateIn = {State: false};;
  if(Object.keys(entity.AprobacionInmobiliaria["Aprobador"]).includes(userId)){
    stateIn = {Role: "Aprobador", State: entity.AprobacionInmobiliaria["Aprobador"][userId] === true};
  }
  if(Object.keys(entity.AprobacionInmobiliaria["Autorizador"]).includes(userId) && !stateIn.Role){
    stateIn = {Role: "Autorizador", State: entity.AprobacionInmobiliaria["Autorizador"][userId] === true}
  }
  
  return (
    <>
      <Box>
        <BoxHeader>
          <b>Control de Negociacion Promesa</b>
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
            disabled={selector.loading || stateIn.State}
            onClick={() =>
              onSubmit({
                Resolution: true,
                Role: stateIn.Role,
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
                    Role: stateIn.Role,
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

PhaseControlNegociacionPromesa.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default PhaseControlNegociacionPromesa;
