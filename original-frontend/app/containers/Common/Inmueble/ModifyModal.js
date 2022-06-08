/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import { Form as ExForm, FormGroup, Label, Field as ExField } from 'components/ExForm';
import { inmuebleSortDetail } from './helper';
import { Auth } from 'containers/App/helpers';

// const disContent = document.querySelector('ExField');
// const displayContent = () => {
//   disContent.setAttribute('readonly', '');
//   disContent.setAttribute('disabled', 'disabled');
// }

function ModifyModal({
  initialValues,
  onSave,
  onHide
}) {
  return (
    <Modal isOpen size="xl" scrollable>
      {Auth.isPM() || Auth.isAdmin()  ?
      <ExForm
        initialValues={initialValues}
        onSubmit={onSave}
      >
        {({values}) => (<>
          {/* <ModalHeader> */}
          <div className="row background-color-caution" style={{ height: '3rem' }}>
            <div className="col-md-6 font-14-rem  d-flex align-items-center">
              <span className="color-main mx-3"><b>{values.InmuebleType} {values.Number}</b></span>
              <span className="mx-2">{inmuebleSortDetail(values)}</span>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <span className="mx-2 font-14-rem" style={{ width: '8.3em' }}><b>Valor UF</b></span>
              <ExField name="Price" type="number" style={{ width: '13em' }} required className="read"/>
            </div>
          </div>
          {/* </ModalHeader> */}
          <ModalBody>
            <div className="background-color-white mb-0">
              <div className="p-3 background-color-white">
                <div className="row">
                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      Dormitorios
                    </Label>
                    <ExField name="BedroomsQuantity" type="select" style={{ width: '13em' }} required className="read">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </ExField>
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      Baños
                    </Label>
                    <ExField name="BathroomQuantity" type="select" style={{ width: '13em' }} required >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </ExField>
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      m² Útiles
                    </Label>
                    <ExField name="UtilSquareMeters" type="number" style={{ width: '13em' }} required />
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      m² Totales
                    </Label>
                    <ExField name="TotalSquareMeters" type="number" style={{ width: '13em' }} required />
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2" >
                    <Label style={{ width: '9.5em' }}>
                     Uso y Goce
                    </Label>
                    <ExField name="IsNotUsoyGoce" type="select" style={{ width: '13em' }} required >
                      <option value={true}>Sí</option>
                      <option value={false}>No</option>
                    </ExField>
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      Descuento Máximo
                    </Label>
                    <ExField
                      name="MaximumDiscount"
                      type="number"
                      maskOptions={{ prefix: '%' }}
                      style={{ width: '13em' }}
                      required

                    />
                  </FormGroup>

                  <div className="col-md-6 d-flex align-items-center my-2">
                    <span className="mr-2 font-14-rem" style={{ width: '9.5em' }}>
                      <b>Estado</b>
                    </span>
                    <span className="font-14-rem ml-2 color-success">
                      <b>Disponible</b>
                    </span>
                  </div>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      Actualizar Plano
                    </Label>
                    <ExField
                      name="Up_Print"
                      type="file"
                      // required
                      placeholder="Examinar..."
                      style={{ width: '13em' }}

                    />
                  </FormGroup>
                </div>
              </div>
              <div className="pt-3 px-3">
                <span className="font-14-rem">
                  <b>TAMBIÉN APLICAR MODIFICACIONES A:</b>
                </span>
                <div className="background-color-tab p-3 mt-3 d-flex flex-wrap">
                  <div className="d-flex mr-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Misma Tipología</span>
                  </div>
                  <div className="d-flex mx-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Mismo Valor</span>
                  </div>
                  <div className="d-flex mx-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Mismos m²</span>
                  </div>
                  <div className="d-flex mx-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Todo el Piso</span>
                  </div>
                  <div className="d-flex mx-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Toda el Ala</span>
                  </div>
                  <div className="d-flex ml-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Todo el Sector</span>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">
              Guardar
            </Button>
            <Button onClick={onHide} type="reset" color="white">
              Volver
            </Button>
          </ModalFooter>
        </>
        )}
      </ExForm>
      :
      // : displayContent()
      <ExForm
        initialValues={initialValues}
        onSubmit={onSave}
      >
        {({values}) => (<>
          {/* <ModalHeader> */}
          <div className="row background-color-caution" style={{ height: '3rem' }}>
            <div className="col-md-6 font-14-rem  d-flex align-items-center">
              <span className="color-main mx-3"><b>{values.InmuebleType} {values.Number}</b></span>
              <span className="mx-2">{inmuebleSortDetail(values)}</span>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <span className="mx-2 font-14-rem" style={{ width: '8.3em' }}><b>Valor UF</b></span>
              <ExField name="Price" type="number" style={{ width: '13em' }} required readOnly/>
            </div>
          </div>
          {/* </ModalHeader> */}
          <ModalBody>
            <div className="background-color-white mb-0">
              <div className="p-3 background-color-white">
                <div className="row">
                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      Dormitorios
                    </Label>
                    <ExField name="BedroomsQuantity" type="number" style={{ width: '13em' }} required readOnly />
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      Baños
                    </Label>
                    <ExField name="BathroomQuantity" type="number" style={{ width: '13em' }} required readOnly />
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      m² Útiles
                    </Label>
                    <ExField name="UtilSquareMeters" type="number" style={{ width: '13em' }} required readOnly/>
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      m² Totales
                    </Label>
                    <ExField name="TotalSquareMeters" type="number" style={{ width: '13em' }} required readOnly/>
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2" >
                    <Label style={{ width: '9.5em' }}>
                     Uso y Goce
                    </Label>
                    <ExField name="IsNotUsoyGoce" type="text" style={{ width: '13em' }} required readOnly />
                  </FormGroup>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      Descuento Máximo
                    </Label>
                    <ExField
                      name="MaximumDiscount"
                      type="number"
                      maskOptions={{ prefix: '% ' }}
                      style={{ width: '13em' }}
                      required
                      readOnly
                    />
                  </FormGroup>

                  <div className="col-md-6 d-flex align-items-center my-2">
                    <span className="mr-2 font-14-rem" style={{ width: '9.5em' }}>
                      <b>Estado</b>
                    </span>
                    <span className="font-14-rem ml-2 color-success">
                      <b>Disponible</b>
                    </span>
                  </div>

                  <FormGroup className="col-12 col-md-6 my-2">
                    <Label style={{ width: '9.5em' }}>
                      Actualizar Plano
                    </Label>
                    <ExField
                      name="Up_Print"
                      type="file"
                      // required
                      placeholder="Examinar..."
                      style={{ width: '13em' }}
                      disabled="disabled"
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="pt-3 px-3">
                <span className="font-14-rem">
                  <b>TAMBIÉN APLICAR MODIFICACIONES A:</b>
                </span>
                <div className="background-color-tab p-3 mt-3 d-flex flex-wrap">
                  <div className="d-flex mr-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Misma Tipología</span>
                  </div>
                  <div className="d-flex mx-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Mismo Valor</span>
                  </div>
                  <div className="d-flex mx-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Mismos m²</span>
                  </div>
                  <div className="d-flex mx-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Todo el Piso</span>
                  </div>
                  <div className="d-flex mx-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Toda el Ala</span>
                  </div>
                  <div className="d-flex ml-2">
                    <div className="checkbox-01">
                      <span>
                        <input type="checkbox" checked="" />
                        <label></label>
                      </span>
                    </div>
                    <span className="font-14-rem">Todo el Sector</span>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" disabled="true">
              Guardar
            </Button>
            <Button onClick={onHide} type="reset" color="white">
              Volver
            </Button>
          </ModalFooter>
        </>
        )}
      </ExForm>
      }
    </Modal>
  );
}

ModifyModal.propTypes = {
  initialValues: PropTypes.object,
  onHide: PropTypes.func,
  onSave: PropTypes.func,
};

export default ModifyModal;
