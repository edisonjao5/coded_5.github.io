/**
 *
 * EntityElement
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from 'components/Button';
import makeSelectEntity from './selectors';
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
  const defaultComponent = () => {
    let text = 'Selecciona...';
    if (!selector.origin_entities && selector.loading)
      text = <i>Cargando ...</i>;
    if (value) {
      const entity = (selector.origin_entities || []).find(
        u =>
          u.AseguradoraID === value.AseguradoraID || u.AseguradoraID === value,
      );
      if (entity) text = entity.Name;
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
        <ModalHeader>Seleccionar aseguradoras</ModalHeader>
        <ModalBody>
          <div className="px-3">
            <MainContainer
              query={query}
              onSelect={entity => {
                setIsOpen(false);
                onSelect(entity);
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
      {component && component({ openEntityElement: setIsOpen })}
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
  selector: makeSelectEntity(),
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
