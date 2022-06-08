/**
 *
 * UserForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form as ExForm, FormGroup, Label } from 'components/ExForm';
import ExField from 'components/ExForm/ExField';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import WithLoading from 'components/WithLoading';
import RadioGroup from 'components/ExForm/RadioGroup';

const SyncMessage = WithLoading();

function Form({ selector, onHide, onSubmit }) {
  const { loading, user = {}, query = {}, ...restSelector } = selector;
  let qRoles = query.roles || [];
  if (!Array.isArray(qRoles)) qRoles = [qRoles];
  const roles = (selector.roles || []).reduce((acc, role) => {
    if (qRoles.length < 1 || qRoles.some(qr => role.Name === qr))
      acc.push(role);
    return acc;
  }, []);
  const initialValues = {
    Name: user.Name || '',
    LastNames: user.LastNames || '',
    Rut: user.Rut || '',
    Email: user.Email || '',
    Roles: user.Roles || [],
    RoleID: (user.Roles && user.Roles.length) ? user.Roles[0].RoleID: '',
  };

  return (
    <Modal isOpen={selector.screen === 'form'} size="xl" scrollable>
      {user && user.UserID && !user.Rut && (
        <SyncMessage {...restSelector} loading={loading} />
      )}
      {!(user && user.UserID && !user.Rut) && (
        <ExForm
          initialValues={initialValues}
          onSubmit={values => {
            onSubmit({
              ...values,
              Roles: [{ RoleID: values.RoleID }],
            });
          }}
        >
          {() => (
            <>
              <ModalHeader>
                {user.UserID ? 'Editar usuario' : 'Agregar usuario'}
              </ModalHeader>
              <ModalBody>
                <div className="p-3">
                  <SyncMessage {...restSelector} />
                  <div className="row justify-content-between m-0 p-0">
                    <FormGroup className="col-md-6 mt-3">
                      <Label style={{ width: '10em' }}>Nombres</Label>
                      <ExField
                        className="flex-fill"
                        name="Name"
                        maxlen={40}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6 mt-3">
                      <Label style={{ width: '10em' }}>Apellidos</Label>
                      <ExField
                        className="flex-fill"
                        name="LastNames"
                        maxlen={40}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6 mt-3">
                      <Label style={{ width: '10em' }}>RUT</Label>
                      <ExField className="flex-fill" name="Rut" required />
                    </FormGroup>
                    <FormGroup className="col-md-6 mt-3">
                      <Label style={{ width: '10em' }}>Email</Label>
                      <ExField
                        className="flex-fill"
                        type="email"
                        name="Email"
                        maxlen={60}
                        required
                      />
                    </FormGroup>
                  </div>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="border-bottom pb-2">
                          <span className="font-14-rem  color-regular">
                            <b>ROLES</b>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="background-color-tab pt-3 pb-2 mt-3 m-0 p-0 row">
                      <RadioGroup
                        itemClassName="col-md-3 mb-2"
                        name="RoleID"
                        required
                        options={roles || []}
                        map={{ label: 'Name', value: 'RoleID' }}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button loading={loading} type="submit">
                  Guardar
                </Button>
                <Button
                  disabled={loading}
                  className="ml-2"
                  color="white"
                  onClick={onHide}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ExForm>
      )}
    </Modal>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
};

export default Form;
