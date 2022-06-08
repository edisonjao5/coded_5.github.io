/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Form as ExForm } from 'components/ExForm';

export function PhaseControlPromesaForm({ selector, onControl }) {
  const [withText, setWithText] = useState({ text: '', open: false });

  return (
    <ExForm onSubmit={() => {}}>
      {() => (
        <>
          <Button
            disabled={selector.loading}
            onClick={() =>
              onControl({
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
      )}
    </ExForm>
  );
}

PhaseControlPromesaForm.propTypes = {
  selector: PropTypes.object,
  onControl: PropTypes.func,
};

export default PhaseControlPromesaForm;
