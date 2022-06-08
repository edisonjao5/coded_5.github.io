/**
 *
 * Reservation Doc Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';

const SyncMessage = WithLoading();

export function OfferApproveEditActions({ selector, onControl }) {
  const [isSendToIN, setIsSendToIN] = useState(false);
  return (
    <>
      <div className="py-3 d-flex justify-content-end">
        <div className="d-flex mr-2">
          <div className="checkbox-01">
            <span>
              <input
                type="checkbox"
                checked={isSendToIN}
                onChange={evt => setIsSendToIN(evt.target.checked)}
              />
              <label />
            </span>
          </div>
          <span className="font-14-rem mt-1">Enviar a inmobiliario</span>
        </div>
        <Button
          disabled={selector.loading}
          onClick={() =>
            onControl({
              OfertaID: selector.offer.OfertaID,
              Resolution: true,
              isSendToIN,
            })
          }
        >
          Aprobar
        </Button>
        <Button
          onClick={() =>
            onControl({
              OfertaID: selector.offer.OfertaID,
              Resolution: false,
              isSendToIN,
            })
          }
          color="white"
        >
          Rechazar
        </Button>
      </div>
      <div className="mt-3">
        <SyncMessage {...selector} />
      </div>
    </>
  );
}

OfferApproveEditActions.propTypes = {
  selector: PropTypes.object,
  onControl: PropTypes.func,
};

export default OfferApproveEditActions;
