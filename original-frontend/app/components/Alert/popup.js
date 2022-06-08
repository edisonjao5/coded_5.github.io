/**
 *
 * AlertPopup
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../Modal';
import Button from '../Button';
import Alert from './index';

const AlertPopup = ({
  children,
  onHide,
  type = 'regular',
  timeout = 0,
  title,
  size = 'md',
  isOpen = true,
}) => {
  let showTitle;
  switch (type) {
    case 'success':
      showTitle = 'Éxito';
      break;
    case 'warning':
      showTitle = 'Advertencia';
      break;
    case 'error':
      showTitle = 'Error';
      break;
    default:
      showTitle = title;
  }
  const hide = () => {
    if (onHide) onHide();
  };
  useEffect(() => {
    if (timeout) setTimeout(() => hide(), timeout);
  }, [isOpen]);

  return (
    <Modal size={size} isOpen={isOpen}>
      {showTitle && <ModalHeader>{showTitle}</ModalHeader>}
      <ModalBody className="p-3">
        <Alert type={type}>{children}</Alert>
      </ModalBody>
      <ModalFooter>
        <Button
          className="font-14-rem shadow-sm m-btn m-btn-white"
          onClick={hide}
        >
          Cerca
        </Button>
      </ModalFooter>
    </Modal>
  );
};

AlertPopup.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  timeout: PropTypes.number,
  size: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  isOpen: PropTypes.bool,
  onHide: PropTypes.func,
};

export default AlertPopup;
