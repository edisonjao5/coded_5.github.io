/**
 *
 * Project
 *
 */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
const SyncMessage = WithLoading();
export function LegalApproveForm({ selector, project, onSubmit }) {
  const { EntregaInmediata } = project;
  const [showButton, setShowButton] = useState(!EntregaInmediata);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const { loading, ...restSelector } = selector;
  return (
    <>
      <div className="my-3 p-3 d-flex justify-content-end align-items-center">
        {EntregaInmediata && (
          <div className="mx-2">
            <div className="checkbox-01">
              <span>
                <input
                  type="checkbox"
                  onChange={evt => setShowButton(evt.currentTarget.checked)}
                />
                <label />
              </span>
              <p className="font-14-rem m-0 color-regular">
                Tengo Carpeta de Título
              </p>
            </div>
          </div>
        )}
        <Button
          onClick={() => onSubmit(true)}
          disabled={!showButton}
          loading={loading}
        >
          Aprobar
        </Button>
        <Button
          loading={loading}
          disabled={!showButton}
          onClick={() => setShowComment(!showComment)}
          className="m-btn-plus"
          color="white"
        >
          Agregar Comentarios
        </Button>
        <Button
          onClick={() => onSubmit(false)}
          loading={loading}
          disabled={!showButton}
          color="white"
        >
          Rechazar
        </Button>
      </div>
      <SyncMessage {...restSelector} />
      {showComment && (
        <div className="p-3">
          <span className="font-14-rem">
            <b>Observaciones</b>
          </span>
          <div className="pt-2">
            <textarea
              className="w-100 d-block rounded-lg shadow-sm"
              rows="5"
              value={comment}
              onChange={evt => setComment(evt.currentTarget.value)}
            />
          </div>
          <div className="mt-3 text-right">
            <Button
              onClick={() => onSubmit(true, comment)}
              loading={loading}
              disabled={!showButton}
            >
              Aprobar con Observaciones
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

LegalApproveForm.propTypes = {
  selector: PropTypes.object,
  project: PropTypes.object,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};

export default LegalApproveForm;
