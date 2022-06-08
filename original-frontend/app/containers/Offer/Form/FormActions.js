/**
 *
 *
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';

const SyncMessage = WithLoading();

export function FormActions({
  selector,
  onCancel, 
  onWithdraw,
  canWithdraw=false
}) {
  const { loading } = selector;
  const [withText, setWithText] = useState('');

  return (<>
    {canWithdraw && (
      <div className="mt-3">
        <span className="d-block font-14-rem">
          <b>Comentario:</b>
        </span>
        <div className="pt-2">
          <textarea
            className="w-100 d-block rounded-lg shadow-sm"
            rows="3"
            onChange={evt => setWithText(evt.target.value)}
          />
        </div>
      </div>
    )}
    <div className="d-flex after-expands-2 align-items-center mt-2">
      {canWithdraw && (
        <Button
          disabled={loading}
          className="order-3 m-btn-warning-02 d-inline"
          onClick={()=>onWithdraw(withText)}
        >
          Desistimiento
        </Button>
      )}
      <Button
        className="order-3 m-btn m-btn-white"
        type="submit"
        onClick={onCancel}
      >
        Cancelar
      </Button>
    </div>
    <SyncMessage {...selector} />
  </>);
}

FormActions.propTypes = {
  selector: PropTypes.object,
  onCancel: PropTypes.func,
  canWithdraw: PropTypes.bool,
  onWithdraw: PropTypes.func,
};

export default FormActions;
