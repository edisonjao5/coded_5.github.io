/**
 *
 * Reservation Inmueble Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { Form as ExForm } from 'components/ExForm';

import Button from 'components/Button';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { inmuebleLabel } from 'containers/Common/Inmueble/helper';

import { Auth } from 'containers/App/helpers';
import { UserProject } from 'containers/Project/helper';
import PhaseInmuebleForm from './Form';

export function PhaseInmueble({
  isCollapse = false,
  canEdit,
  canConfirm,
  onConfirm,
  onUpdate,
  initialValues,
  canVNEdit,
}) {
  const [isOpen, setOpen] = useState(false);
  const { total, discount } = calculates(initialValues);
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => onUpdate({ Inmuebles: values.Inmuebles })}
    >
      {({ values, setFieldValue, submitForm }) => (
        <Box collapse isOpen={isCollapse}>
          <BoxHeader>
            <b>DATOS INMUEBLE</b>
            {canConfirm && (
              <div className="d-flex align-items-center mr-3 order-3">
                <div className="checkbox-01 checkbox-medium">
                  <span>
                    <input
                      type="checkbox"
                      onChange={evt => {
                        onConfirm('inmueble', evt.currentTarget.checked);
                      }}
                    />
                    <label />
                  </span>
                </div>
                <span>
                  <b>Confirmar</b>
                </span>
              </div>
            )}
            {!canVNEdit &&
              ((canEdit || (UserProject.in(window.project) && Auth.isVendor())) && (
                <Button
                  color="white"
                  className="m-btn-pen order-3"
                  onClick={() => setOpen(true)}
                >
                  Editar
                </Button>
              ))}
          </BoxHeader>
          <BoxContent>
            <table className="table table-responsive-sm table-summary">
              <tbody>
                {initialValues.Inmuebles &&
                  initialValues.Inmuebles.map(inmueble => (
                    <tr key={inmueble.InmuebleID}>
                      <td className="expand">{inmuebleLabel(inmueble)}</td>
                      <td className="sub-table">
                        <dl>
                          <dt>
                            <b>Valor UF</b>
                          </dt>
                          <dd>
                            <b>
                              <FormattedNumber value={inmueble.Price} />
                            </b>
                          </dd>

                          <dt>Descuentos UF</dt>
                          <dd>
                            <b>
                              <FormattedNumber
                                value={
                                  0 -
                                  ((inmueble.Discount || 0) / 100) *
                                    inmueble.Price
                                }
                              />
                            </b>
                          </dd>
                        </dl>
                      </td>
                    </tr>
                  ))}

                <tr className="resume">
                  <td className="expand" />
                  <td className="sub-table">
                    <dl>
                      <dt>Valor Total UF</dt>
                      <dd>
                        <b>
                          <FormattedNumber value={total} />
                        </b>
                      </dd>
                      <dt>Total Descuentos UF</dt>
                      <dd>
                        <b>
                          {discount > 0 && `-`}
                          <FormattedNumber value={discount} />
                          <br />
                          <i className="small">
                            (
                            <FormattedNumber value={(discount / total) * 100} />
                            %)
                          </i>
                        </b>
                      </dd>
                      <dt>
                        <b>Valor Final UF</b>
                      </dt>
                      <dd>
                        <b>
                          <FormattedNumber value={total - discount} />
                        </b>
                      </dd>
                    </dl>
                  </td>
                </tr>
              </tbody>
            </table>
          </BoxContent>
          {canEdit && (
            <PhaseInmuebleForm
              onSelectInmuebles={inmuebles =>
                setFieldValue('Inmuebles', inmuebles)
              }
              values={values}
              onHide={() => {setFieldValue('Inmuebles', initialValues.Inmuebles); setOpen(false)}}
              onUpdate={() => {
                setOpen(false);
                submitForm();
              }}
              isOpen={isOpen}
            />
          )}
        </Box>
      )}
    </ExForm>
  );
}

PhaseInmueble.propTypes = {
  isCollapse: PropTypes.bool,
  canEdit: PropTypes.bool,
  canConfirm: PropTypes.bool,
  initialValues: PropTypes.object,
  onConfirm: PropTypes.func,
  onUpdate: PropTypes.func,
  canVNEdit: PropTypes.bool,
};

export default PhaseInmueble;
