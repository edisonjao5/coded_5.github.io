/**
 *
 * Inmueble Form
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import Button from 'components/Button';
import Inmueble from 'containers/Common/Inmueble';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import InmueblesElement from './InmueblesElement';

function PhaseInmuebleForm({
  values,
  onHide,
  onSelectInmuebles,
  onUpdate,
  isOpen,
}) {
  const [openInmueble, setOpenInmueble] = useState(false);
  const { total, discount } = calculates(values);

  return (
    <>
      <Modal isOpen={isOpen} size="xl" scrollable>
        <ModalHeader>Editar Inmueble</ModalHeader>
        <ModalBody className="p-3">
          <div className="row m-1 align-middle-group">
            <table className="table table-responsive-sm table-summary col-12 mt-0">
              <tbody>
                <tr className="align-middle-group">
                  <td className="col-md-8">
                    <div className="py-2 border-bottom">
                      <span className="d-block">
                        <b>Inmuebles por Cotizar</b>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="nav-btn add d-flex">
                      <Button
                        color="white"
                        className="m-btn-plus"
                        onClick={evt => {
                          evt.preventDefault();
                          setOpenInmueble(true);
                        }}
                      >
                        Ver Disponibles
                      </Button>
                    </div>
                  </td>
                </tr>

                <InmueblesElement
                  values={values}
                  onSelect={onSelectInmuebles}
                  required
                />

                <tr className="resume">
                  <td />
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
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="ml-2" disabled={values.Inmuebles.length == 0} onClick={onUpdate}>
            Guardar
          </Button>
          <Button className="ml-2" color="white" onClick={onHide}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Inmueble
        isOpen={openInmueble}
        showSummary
        onHide={() => setOpenInmueble(false)}
        selected={values.Inmuebles}
        onSelect={inmuebles => {
          setOpenInmueble(false);
          onSelectInmuebles(
            inmuebles.map(inmueble => ({
              ...inmueble,
              Discount: (
                values.Inmuebles.find(
                  item => item.InmuebleID === inmueble.InmuebleID,
                ) || { Discount: 0 }
              ).Discount,
            })),
          );
        }}
      />
    </>
  );
}

PhaseInmuebleForm.propTypes = {
  isOpen: PropTypes.bool,
  values: PropTypes.object,
  onHide: PropTypes.func,
  onSelectInmuebles: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default PhaseInmuebleForm;
