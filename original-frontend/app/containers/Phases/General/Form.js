/**
 *
 * Forma Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import {
  FormGroup,
  Label,
  Field as ExField,
  Form as ExForm,
} from 'components/ExForm';

import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import RadioGroup from 'components/ExForm/RadioGroup';
import { userFullname } from 'containers/Common/User/helper';
import ExClients from 'components/ExForm/ExClients';

// eslint-disable-next-line no-unused-vars
function PhaseGeneralForm({ initialValues, onHide, onUpdate, isOpen }) {
  const cotizacionTypeIDs = window.preload.quotationUtils.CotizacionTypes.map(
    ({ Name }) => ({
      label: Name,
      value: Name,
    }),
  );
  return (
    <Modal isOpen={isOpen} size="xl" scrollable>
      <ModalHeader>Editar Generals</ModalHeader>
      <ExForm initialValues={initialValues} onSubmit={onUpdate}>
        {({ values, submitForm, setValues }) => (
          <>
            <ModalBody className="p-3">
              {!initialValues.CotizacionType && (
                <div className="p-2 d-flex align-items-center pl-3">
                  <RadioGroup
                    name="CotizacionType"
                    options={cotizacionTypeIDs}
                  />
                </div>
              )}
              <ul className="row m-0 p-0">
                <FormGroup className="col-md-6 my-2">
                  <Label style={{ width: '10em' }}>Vendedor</Label>
                  <b>{userFullname(values.Vendedor)}</b>
                </FormGroup>
                <FormGroup className="col-md-6 my-2">
                  <Label style={{ width: '10em' }}>Cliente</Label>
                  <ExClients
                    name="Cliente.UserID"
                    autoSelect
                    style={{ width: '21em' }}
                    info="basic"
                    onSelect={client =>
                      setValues({
                        ...values,
                        ClienteID: client.UserID,
                        Cliente: client,
                        Empleador: client.Empleador,
                        DocumentNew: true
                      })
                    }
                    focusHide={
                      values.CotizacionType ===
                      window.preload.quotationUtils.CotizacionTypes[1].Name
                        ? ['ComunaID']
                        : false
                    }
                    required
                  />
                </FormGroup>
                <FormGroup className="col-md-6 my-2">
                  <Label style={{ width: '10em' }}>Fecha</Label>
                  <ExField
                    name="DateFirmaPromesa"
                    style={{ width: '21em' }}
                    type="datepicker"
                  />
                </FormGroup>

                {values.CotizacionType ===
                  window.preload.quotationUtils.CotizacionTypes[0].Name && (
                  <>
                    {/*
                    <FormGroup className="col-md-6 my-2">
                      <Label style={{ width: '10em' }}>Medio de Llegada</Label>
                      <ExField
                        type="select"
                        name="Cliente.FindingTypeID"
                        style={{ width: '21em' }}
                        required
                      >
                        <option value="">Selecciona...</option>
                        {window.preload.quotationUtils.FindingTypes.map(
                          findingtype => (
                            <option
                              key={findingtype.FindingTypeID}
                              value={findingtype.FindingTypeID}
                            >
                              {findingtype.Name}
                            </option>
                          ),
                        )}
                      </ExField>
                    </FormGroup>
                    */}
                  </>
                )}
                {values.CotizacionType ===
                  window.preload.quotationUtils.CotizacionTypes[1].Name && (
                  <>
                    <FormGroup className="col-md-6 my-2">
                      <Label style={{ width: '10em' }}>
                        Destino de la Compra
                      </Label>
                      <ExField
                        type="select"
                        name="IsNotInvestment"
                        style={{ width: '21em' }}
                        required
                      >
                        <option value="">Selecciona...</option>
                        <option value="1">Vivienda</option>
                        <option value="0">Inversión</option>
                      </ExField>
                    </FormGroup>
                    <FormGroup className="col-md-6 my-2">
                      <Label style={{ width: '10em' }}>Medio de Llegada</Label>
                      <ExField
                        type="select"
                        name="ContactMethodTypeID"
                        style={{ width: '21em' }}
                        required
                      >
                        <option value="">Selecciona...</option>
                        {window.preload.quotationUtils.ContactMethodTypes.map(
                          contacttype => (
                            <option
                              key={contacttype.ContactMethodTypeID}
                              value={contacttype.ContactMethodTypeID}
                            >
                              {contacttype.Name}
                            </option>
                          ),
                        )}
                      </ExField>
                    </FormGroup>
                  </>
                )}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button className="ml-2" onClick={submitForm}>
                Guardar
              </Button>
              <Button className="ml-2" color="white" onClick={onHide}>
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ExForm>
    </Modal>
  );
}

PhaseGeneralForm.propTypes = {
  isOpen: PropTypes.bool,
  initialValues: PropTypes.object,
  onHide: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default PhaseGeneralForm;
