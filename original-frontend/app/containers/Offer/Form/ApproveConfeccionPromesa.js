/**
 *
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

export function ApproveConfeccionPromesa({ selector, onControl, onEdit }) {
  const [withText, setWithText] = useState({ text: '', open: false });
  const { loading } = selector;

  return (
    <>
      <div className="d-flex after-expands-2 align-items-center">
        {!withText.open && (
          <Button
            disabled={loading}
            className="order-3 m-btn m-btn-white"
            onClick={() => setWithText({ text: '', open: true })}
          >
            Rechazar
          </Button>
        )}
        <Button
          className="order-3 m-btn"
          type="submit"
          disabled={loading}
          onClick={() =>
            onControl({
              Comment: '',
              Resolution: true,
            })
          }
        >
          Confección de Promesa
        </Button>
      </div>
      {withText.open && (
        <div className="py-3 text-right">
          <span className="d-block text-left font-14-rem">
            <b>Comentarios (En caso de Rechazo)</b>
          </span>
          <div className="py-3 text-left">
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
              onControl({
                Comment: withText.text.trim(),
                Resolution: false,
              })
            }
          >
            Rechazar
          </Button>
        </div>
      )}
    </>
  );
}

ApproveConfeccionPromesa.propTypes = {
  selector: PropTypes.object,
  onControl: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ApproveConfeccionPromesa;
