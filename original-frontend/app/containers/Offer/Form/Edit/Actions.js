/**
 *
 * Reservation Doc Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import DeleteConfirm from './DeleteConfirm';
import { isValidData } from '../../helper';

const SyncMessage = WithLoading();

export function OfferEditActions({ selector, onSave, onCancel, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [withText, setWithText] = useState({ text: '', open: false });
  return (
    <>
      <div className="py-3 d-flex justify-content-end">
        <Button
          disabled={selector.loading}
          className="m-btn-warning-02 m-btn-alert"
          onClick={() => setIsOpen(true)}
        >
          Dar de Baja la Oferta
        </Button>
        <Button
          disabled={selector.loading || withText.open}
          color="white"
          onClick={() => {            
            setWithText({ text: "", open: true });
          }}
        >Modificado</Button>
        <Button onClick={onCancel} color="white">
          Cancelar
        </Button>
      </div>
      <div className="mt-3">
        <SyncMessage {...selector} />
      </div>
      <DeleteConfirm
        isOpen={isOpen}
        onHide={() => setIsOpen(false)}
        onConfirm={() => {
          setIsOpen(false);
          onDelete();
        }}
        selector={selector}
      />
      {withText.open && (
        <>
          <div className="mt-3">
            <span className="d-block font-14-rem">
              <b>Comentarios</b>
            </span>
            <div className="pt-2">
              <textarea
                className="w-100 d-block rounded-lg shadow-sm"
                rows="5"
                onChange={evt =>
                  setWithText({ ...withText, text: evt.target.value })
                }
              />
            </div>
          </div>
          <div className="py-3 text-right">
            <Button
              disabled={selector.loading || withText.text.trim()===""}
              onClick={() => onSave(withText.text)}
            >
              Guardar Cambios
            </Button>
            <Button              
              disabled={selector.loading}
              color="white"
              onClick={() => setWithText({ text: "", open: false })}
            >
              Cancelar Comentario
            </Button>
          </div>
        </>
      )}
    </>
  );
}

OfferEditActions.propTypes = {
  selector: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

export default OfferEditActions;
