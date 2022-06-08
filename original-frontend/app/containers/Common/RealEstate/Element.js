/**
 *
 * Element
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from 'components/Button';
import makeSelectUser from './selectors';
import MainContainer from './index';

const Element = ({
  query = {},
  component,
  selector,
  value,
  style = {},
  className = '',
  isInvalid = false,
  onSelect,
  openModal = false,
}) => {
  const [isOpen, setIsOpen] = useState(openModal);
  const { type = 'constructora' } = query;
  const entitiesName = `${type}s`;
  const IdName = type === 'constructora' ? 'ConstructoraID' : 'InmobiliariaID';

  const defaultComponent = () => {
    let text = 'Selecciona...';
    if (!selector[entitiesName] && selector.loading) text = <i>Cargando ...</i>;
    if (value) {
      const entity = (selector[entitiesName] || []).find(
        u => u[IdName] === value[IdName] || u[IdName] === value,
      );
      if (entity) text = entity.RazonSocial;
    }

    return (
      <div
        role="presentation"
        style={{ height: 31, ...style }}
        className={`btype shadow-sm icon icon-select-arrows right-icon ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <div
          className={`form-control form-control-sm ${
            isInvalid ? 'is-invalid' : ''
          }`}
        >
          {text}
        </div>
      </div>
    );
  };
  return (
    <>
      <Modal isOpen={isOpen} size="xl" scrollable>
        <ModalHeader>
          Seleccionar{' '}
          {type === 'constructora' ? 'constructora' : 'inmobiliaria'}
        </ModalHeader>
        <ModalBody>
          <div className="px-3">
            <MainContainer
              query={query}
              onSelect={entity => {
                setIsOpen(false);
                onSelect(entity.ConstructoraID || entity.InmobiliariaID);
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="white" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {component && component({ openMainContainer: setIsOpen })}
      {!component && defaultComponent(selector)}
    </>
  );
};

Element.propTypes = {
  query: PropTypes.object,
  openModal: PropTypes.bool,
  selector: PropTypes.object,
  value: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  isInvalid: PropTypes.bool,
  component: PropTypes.func,
  onSelect: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selector: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Element);
