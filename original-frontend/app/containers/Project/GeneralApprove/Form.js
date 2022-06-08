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

export function GeneralApproveForm({ selector, reviews, onSubmit }) {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const { loading, ...restSelector } = selector;
  return (
    <>
      <div className="my-3 d-flex justify-content-end align-items-center">
        <Button
          disabled={
            !!Object.keys(reviews).find(
              key => !reviews[key] || reviews[key] === 'reject',
            )
          }
          onClick={() => onSubmit(true)}
          loading={loading}
        >
          Aprobar
        </Button>
        <Button
          disabled={
            !!Object.keys(reviews).find(key => !reviews[key]) ||
            !Object.keys(reviews).find(key => reviews[key] === 'reject')
          }
          loading={loading}
          onClick={() => setShowComment(!showComment)}
          color="white"
        >
          Rechazar
        </Button>
      </div>
      <SyncMessage {...restSelector} />
      {showComment && (
        <div className="p-3">
          <span className="font-14-rem">
            <b>Comentarios</b>
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
            <Button onClick={() => onSubmit(false, comment)} loading={loading}>
              Rechazar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

GeneralApproveForm.propTypes = {
  selector: PropTypes.object,
  reviews: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default GeneralApproveForm;
