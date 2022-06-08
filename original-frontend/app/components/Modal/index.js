/**
 *
 * Modal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal as ReactModal,
  ModalHeader as ReactModalHeader,
  ModalBody as ReactModalBody,
  ModalFooter as ReactModalFooter,
} from 'reactstrap';

const Modal = ReactModal;

const ModalHeader = ReactModalHeader;

const ModalBody = ({ children, className = '', ...props }) => (
  <ReactModalBody {...props} className={`p-0 ${className}`}>
    {children}
  </ReactModalBody>
);
ModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const ModalFooter = ReactModalFooter;

export { Modal, ModalHeader, ModalBody, ModalFooter };
