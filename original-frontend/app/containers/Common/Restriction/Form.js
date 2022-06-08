/**
 *
 * Project
 *
 */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Inmueble from 'containers/Common/Inmueble';
import Button from 'components/Button';
import { shortType } from 'containers/Common/Inmueble/helper';

function RestrictionsForm({ selector, setRestriction, saveRestriction }) {
  const { entity, loading } = selector;
  const { inmueblesRestrictionTypes } = window.preload;
  const [openInmueble, setOpenInmueble] = useState(false);
  const [InmuebleInmuebleTypeID, setInmuebleInmuebleTypeID] = useState(false);
  return (
    <div className="px-3 py-2 border-bottom border-left border-right d-flex align-items-center after-expands-2">
      <Link
        to="/"
        onClick={evt => {
          evt.preventDefault();
          setInmuebleInmuebleTypeID(false);
          setOpenInmueble(true);
        }}
        className={`font-14-rem order-1 color-main ${entity ? 'btn-pen' : ''}`}
      >
        <b>{entity ? shortType(entity.Inmueble) : 'Selecciona Inmueble...'}</b>
      </Link>
      {entity && (
        <>
          <div className="order-1 mx-3 align-items-center">
            {inmueblesRestrictionTypes.map(type => {
              const res = (entity.Restrictions || []).filter(
                item =>
                  item.InmuebleInmuebleTypeID === type.InmuebleInmuebleTypeID,
              );
              return (
                <div
                  key={type.InmuebleInmuebleTypeID}
                  className="d-flex  align-items-center"
                >
                  <span className="ml-1 color-regular" style={{ width: '5em' }}>
                    {shortType(type.Name)}
                  </span>
                  {res.length > 0 && (
                    <span className="ml-2 color-regular">
                      {shortType(res.map(item => item.Inmueble).join(', '))}
                    </span>
                  )}
                  <Link
                    to="/"
                    onClick={evt => {
                      evt.preventDefault();
                      setInmuebleInmuebleTypeID(type.InmuebleInmuebleTypeID);
                      setOpenInmueble(true);
                    }}
                    className={`font-14-rem color-main ml-3 ${
                      res.length > 0 ? 'btn-pen' : 'btn-plus'
                    }`}
                  >
                    <b>{res.length > 0 ? 'Editar' : 'Nueva Restricción'}</b>
                  </Link>
                </div>
              );
            })}
          </div>
          {entity.Restrictions && (
            <Button
              className="order-3"
              loading={loading}
              onClick={saveRestriction}
            >
              Aceptar
            </Button>
          )}
          <Button
            color="white"
            className="order-3"
            loading={loading}
            onClick={() => setRestriction(false)}
          >
            Cancelar
          </Button>
        </>
      )}
      <Inmueble
        isOpen={openInmueble}
        focusChange
        multiple={!!InmuebleInmuebleTypeID}
        onHide={() => setOpenInmueble(false)}
        selected={(entity && entity.Restrictions ? entity.Restrictions : [])
          .filter(
            item => item.InmuebleInmuebleTypeID === InmuebleInmuebleTypeID,
          )
          .map(item => ({ InmuebleID: item.InmuebleBID }))}
        onSelect={values => {
          if (!InmuebleInmuebleTypeID) {
            setRestriction({
              Inmueble: `${values.InmuebleType} ${values.Number}`,
              InmuebleAID: values.InmuebleID,
            });
          } else {
            setRestriction({
              ...entity,
              Restrictions: [
                ...(entity.Restrictions || []).filter(
                  item =>
                    item.InmuebleInmuebleTypeID !== InmuebleInmuebleTypeID,
                ),
                ...values.map(val => ({
                  InmuebleBID: val.InmuebleID,
                  Inmueble: `${val.InmuebleType} ${val.Number}`,
                  InmuebleInmuebleTypeID,
                })),
              ],
            });
          }
        }}
      />
    </div>
  );
}

RestrictionsForm.propTypes = {
  selector: PropTypes.object,
  setRestriction: PropTypes.func,
  saveRestriction: PropTypes.func,
};

export default RestrictionsForm;
