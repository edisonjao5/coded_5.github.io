import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import Alert from 'components/Alert';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';

export function Confirm({ project, onConfirm }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="search-bar-02 d-flex align-items-center justify-content-end after-expands-1">
        <Button
          className="m-btn-white icon icon-zz-deed d-flex align-items-center"
          disabled={ project.EscrituraProyectoState !== null }
          onClick={() => setModalOpen(true)}
        >
          Próximo a Escriturar
        </Button>
        <Button
          className="mr-3"
          onClick={()=>dispatch(
            push(`/proyectos/${project.ProyectoID}/escritura-proyecto`)
          )}
        >
          Ver proceso
        </Button>
      </nav>
      <Modal isOpen={modalOpen} size="xl">
        <ModalHeader>
          <div className="d-flex">{project.Name}</div>
          <span className="font-18 color-warning">Escriturar</span>
        </ModalHeader>
        <ModalBody className="p-3 bg-light">
          <Alert type="danger">
            Vas a comenzar el proceso de Escrituraciòn. ¿Quieres continuar?
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>{
              setModalOpen(false);
              onConfirm();
            }}
          >
            Confirmar
          </Button>
          <Button
            className="ml-2"
            color="white"
            onClick={() => setModalOpen(false)}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
Confirm.propTypes = {
  selector: PropTypes.object,
  onConfirm: PropTypes.func,
};

export default Confirm;