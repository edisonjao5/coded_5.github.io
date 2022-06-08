/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Auth } from 'containers/App/helpers';
import DocumentCondition from '../Conditions';
import { RESERVA_STATE } from 'containers/App/constants';

export function CarpetaDigitalUploadActions({
  entity,
  selector,
  form,
  onSave,
  onCancel,
  onSendControl,
}) {
  const { loading } = selector;
  const [withText, setWithText] = useState({ text: '', open: false });
  const { values } = form;
  const [canUpload, setCanUpload] = useState(false);
 
  const canStC = entity.ReservaState === RESERVA_STATE['0'];

  const checkComment = () => {
    if (withText.open){
      const with_text = withText.text.trim();
      if(with_text == "") {
        alert("Por favor agregue su comentario");
        return false;
      } else {
        form.values.Comment = with_text;
      }
    }
    return true;
  }
  useEffect(() => {
    setCanUpload(true);
  }, [values]);

  useEffect(() => {
    setCanUpload(false);
  }, []);

  return (
    <>
      <div className="d-flex py-3 after-expands-2 align-items-center">
        <span className="order-1 font-14-rem">
          <b>RESERVA |</b> Paso 3 de 3
        </span>
        <Button
          disabled={!canUpload ? true : loading}
          className="order-3 m-btn mr-2"
          onClick={() => {
            if (checkComment() == false) return;
            onSave(form.values);
          }}
        >
          { entity.ReservaID ? 'Guardar': 'Crear Reserva' }
        </Button>
        {(Auth.isPM() || Auth.isVendor()) && (
          <Button
            onClick={() => {
              if (checkComment() == false) return;
              onSendControl(form.values);
            }}
            className="order-3 m-btn mr-2"
            disabled={!canStC ? true : loading}
          >
            Enviar a Control
          </Button>
        )}
        <Button
          disabled={loading || withText.open}
          className="order-3 m-btn m-btn-white m-btn-plus mr-2"
          onClick={() => {            
            setWithText({ text: "", open: true });
          }}
        >
          Agregar Comentario
        </Button>
        {!entity.ReservaID && (
          <Button
            disabled={loading}
            className="order-3 m-btn m-btn-white"
            onClick={evt => {
              evt.preventDefault();
              onCancel();
            }}
          >
            Cancelar
          </Button>
        )}
        {entity.ReservaID && Auth.isPM() && (
          <Button
            disabled={loading}
            className="order-3 m-btn m-btn-white"
            onClick={() => onCancel(withText.open ? withText.text:"")}
          >
            Cancelar Reserva
          </Button>
        )}
      </div>
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
              disabled={loading}
              className="m-btn"
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

CarpetaDigitalUploadActions.propTypes = {
  form: PropTypes.object,
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onSendControl: PropTypes.func,
};

export default CarpetaDigitalUploadActions;
