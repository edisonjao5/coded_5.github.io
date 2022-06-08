/**
 *
 * ClientElement
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from 'components/Button';
import makeSelectClient from './selectors';
import MainContainer from './index';
import { clientFullname } from './helper';

const Element = ({
  canEdit = true,
  focusHide,
  info,
  query = {},
  component,
  selector,
  value,
  style = {},
  className = '',
  isInvalid = false,
  onSelect,
  autoSelect = false,
  openModal = false,
  canAdd = false,
}) => {
  const [isOpen, setIsOpen] = useState(openModal);

  useEffect(() => {
    if (autoSelect && onSelect && selector.success) {
      setIsOpen(false);
      onSelect(selector.client);
    }
  }, [selector.success]);
  const defaultComponent = () => {
    let text = 'Selecciona...';
    if (!selector.origin_clients && selector.loading)
      text = <i>Cargando ...</i>;
    if (value) {
      const client = (selector.origin_clients || []).find(
        u => u.UserID === value.UserID || u.UserID === value,
      );
      if (client) text = clientFullname(client);
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
          title={text}
        >
          {text}
        </div>
      </div>
    );
  };
  return (
    <>
      <Modal isOpen={isOpen} size="xl" scrollable>
        <ModalHeader>Seleccionar cliente</ModalHeader>
        <ModalBody>
          <div className="px-3">
            <MainContainer
              canEdit={canEdit}
              info={info}
              focusHide={focusHide}
              query={query}
              onSelect={client => {
                setIsOpen(false);
                onSelect(client);
              }}
              canAdd={canAdd}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="white" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {component && component({ openClientElement: setIsOpen })}
      {!component && defaultComponent(selector)}
    </>
  );
};

/*
 * info: type of form
 * focusHide: focus hide the fields event it show in 'info' form
 */

Element.propTypes = {
  canEdit: PropTypes.bool,
  focusHide: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  info: PropTypes.string,
  query: PropTypes.object,
  openModal: PropTypes.bool,
  selector: PropTypes.object,
  value: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  isInvalid: PropTypes.bool,
  autoSelect: PropTypes.bool,
  component: PropTypes.func,
  onSelect: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selector: makeSelectClient(),
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
