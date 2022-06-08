/**
 *
 * Box
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactCollapse from 'reactstrap/es/Collapse';

const Collapse = ({
  children,
  className = '',
  collapse = true,
  isOpen = false,
  onCollapsed,
}) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  if (Array.isArray(children) && collapse) {
    const toggle = () => {
      setOpen(!open);
      if(onCollapsed) onCollapsed(open);
    };
    return (
      <div className={`accordion-01 border-top ${className}`}>
        {React.cloneElement(children[0], {
          collapse,
          toggle,
          isOpen: open,
        })}
        <ReactCollapse isOpen={open}>{children.slice(1)}</ReactCollapse>
      </div>
    );
  }
  return (
    <section
      className={`shadow-sm bg-white rounded-lg overflow-hidden mt-3 ${className}`}
    >
      {children}
    </section>
  );
};
Collapse.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  collapse: PropTypes.bool,
  children: PropTypes.node,
  onCollapsed: PropTypes.func
};

const CollapseHeader = ({ children, toggle, isOpen = true, className = '' }) => (
  /* eslint-disable-next-line */
  <div
    className={`${className} button-toggler-plus w-100 pointer p-3 d-flex align-items-center after-expands-2 collapsed`}
    aria-expanded={isOpen}
    onClick={(evt)=>{ if(evt.target.tagName === "A") return; toggle(evt);}}
  >
    <span className="order-1 font-14-rem no-whitespace text-uppercase w-100">
      <b>{children}</b>
    </span>
  </div>
);
CollapseHeader.propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  toggle: PropTypes.func,
};

const CollapseContent = ({ children }) => (
  <div className="p-3 background-color-white">{children}</div>
);
CollapseContent.propTypes = {
  children: PropTypes.node,
};

const CollapseFooter = ({ children, inside = false, className = '' }) => (
  <div
    className={`p-3 background-color-white text-right border-top ${className} ${
      inside ? 'box-inside' : ''
    }`}
  >
    {children}
  </div>
);
CollapseFooter.propTypes = {
  className: PropTypes.string,
  inside: PropTypes.bool,
  children: PropTypes.node,
};

export { Collapse, CollapseHeader, CollapseContent, CollapseFooter };
