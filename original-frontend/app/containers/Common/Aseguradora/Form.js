/**
 *
 * EntityForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form as ExForm, FormGroup, Label } from 'components/ExForm';
import ExField from 'components/ExForm/ExField';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import WithLoading from 'components/WithLoading';

const SyncMessage = WithLoading();

function Form({ selector, onHide, onSubmit }) {
  const { loading, entity = {}, ...restSelector } = selector;
  const initialValues = {
    Name: '',
    ...entity,
  };
  return (
    <Modal isOpen={selector.screen === 'form'} size="xl" scrollable>
      <ExForm
        initialValues={initialValues}
        onSubmit={values => onSubmit(values)}
      >
        {() => (
          <>
            <ModalHeader>
              {entity.AseguradoraID
                ? 'Editar aseguradora'
                : 'Agregar aseguradora'}
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
    </Modal>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
};

export default Form;
