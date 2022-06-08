/**
 *
 * EntityForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import WithLoading from 'components/WithLoading';
import { Field, Form as ExForm, FormGroup, Label } from 'components/ExForm';
import ExField from 'components/ExForm/ExField';

import Checkbox from 'components/ExForm/Checkbox';
import { getContactType } from 'containers/App/helpers';
import PhonesElement from './PhonesElement';
import UsersElement from './UsersElement';
const SyncMessage = WithLoading();

function Form({ selector, onHide, onSubmit }) {
  const { loading, query = {}, entity, entities, ...restSelector } = selector;
  const { type = '' } = query;
  const IdName = type === 'constructora' ? 'ConstructoraID' : 'InmobiliariaID';
  const { contactTypes, userInmobiliariaTypes } = window.preload;
  const phoneContactType = getContactType('phone');
  const emailContactType = getContactType('email');
  const ContactEmail = (entity.Contact || []).find(
    contact => contact.ContactInfoTypeName === 'Email',
  ) || {
    ...emailContactType,
    Value: '',
  };
  const ContactPhones = (entity.Contact || []).filter(
    contact => contact.ContactInfoTypeName === 'Phone',
  );
  if (ContactPhones.length < 1)
    ContactPhones.push({ ...phoneContactType, Value: '' });

  const initialValues = {
    RazonSocial: entity.RazonSocial || '',
    /* eslint-disable */
    IsInmobiliaria:
        type === 'inmobiliaria' ? 1 : entity.IsInmobiliaria ? 1 : 0,
    IsConstructora:
        type === 'constructora' ? 1 : entity.IsConstructora ? 1 : 0,
    /* eslint-enable */
    Rut: entity.Rut || '',
    ComunaID: entity.ComunaID || null,
    Direccion: entity.Direccion || '',
    Contact: [ContactEmail, ...ContactPhones],
    UsersInmobiliaria: entity.UsersInmobiliaria || [],
  };
  return (
    <ExForm initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, submitForm }) => {
        const { IsInmobiliaria } = values;
        return (
          <Modal isOpen={selector.screen === 'form'} size="xl" scrollable>
            <ModalHeader>
              {entity[IdName] ? 'EDITAR' : 'CREAR'} {type.toUpperCase()}
            </ModalHeader>
            <ModalBody>
              <div className="p-3 px-4 border-top">
                <SyncMessage {...restSelector} />
                <div className="row justify-content-between">
                  <div className="col-md-5">
                    <FormGroup className="mt-3">
                      <Label style={{ width: '10em' }}>Razón Social</Label>
                      <ExField
                        className="flex-fill"
                        name="RazonSocial"
                        required
                        validate={value => {
                          if (
                            entities.find(
                              item =>
                                item.RazonSocial === value &&
                                ((IsInmobiliaria &&
                                  item.InmobiliariaID ===
                                    values.InmobiliariaID) ||
                                  (!IsInmobiliaria &&
                                    item.ConstructoraID ===
                                      values.ConstructoraID)),
                            )
                          )
                            return 'Razón Social ya existe';
                          return null;
                        }}
                      />
                      <div className="font-21 color-main opacity-0 ml-2">
                        <strong>+</strong>
                      </div>
                    </FormGroup>
                    {!!IsInmobiliaria && (
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Dirección</Label>
                        <ExField
                          className="flex-fill"
                          name="Direccion"
                          required
                        />
                        <div className="font-21 color-main opacity-0 ml-2">
                          <strong>+</strong>
                        </div>
                      </FormGroup>
                    )}
                    {!!IsInmobiliaria && (
                      <>
                        <FormGroup className="mt-3">
                          <Label style={{ width: '10em' }}>Comuna</Label>
                          <Field
                            type="comunas"
                            className="flex-fill"
                            name="ComunaID"
                            required
                          />
                          <div className="font-21 color-main opacity-0 ml-2">
                            <strong>+</strong>
                          </div>
                        </FormGroup>
                        <FormGroup className="mt-3">
                          <Checkbox
                            label="¿Es una Constructora también?"
                            name="IsConstructora"
                          />
                        </FormGroup>
                      </>
                    )}
                  </div>
                  {!!IsInmobiliaria && (
                    <div className="col-md-5">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>RUT</Label>
                        <ExField className="flex-fill" name="Rut" required />
                        <div className="font-21 color-main opacity-0 ml-2">
                          <strong>+</strong>
                        </div>
                      </FormGroup>
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Email</Label>
                        <ExField
                          className="flex-fill"
                          name="Contact.0.Value"
                          type="email"
                          required
                        />
                        <div className="font-21 color-main opacity-0 ml-2">
                          <strong>+</strong>
                        </div>
                      </FormGroup>
                      <PhonesElement
                        contactTypes={contactTypes}
                        values={values}
                        required
                      />
                    </div>
                  )}
                </div>
                {!!IsInmobiliaria &&
                  (userInmobiliariaTypes && (
                    <UsersElement
                      userInmobiliariaTypes={userInmobiliariaTypes}
                      values={values}
                      required
                    />
                  ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                loading={loading}
                type="submit"
                onClick={evt => {
                  evt.preventDefault();
                  submitForm();
                }}
              >
                Guardar
              </Button>
              <Button
                disabled={loading}
                type="reset"
                className="ml-2"
                color="white"
                onClick={onHide}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        );
      }}
    </ExForm>
  );
}

Form.propTypes = {
  query: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
};

export default Form;
