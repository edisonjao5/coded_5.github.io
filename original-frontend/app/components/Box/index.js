/**
 *
 * Box
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'reactstrap/es/Collapse';

const Box = ({ children, className = '', collapse = false, isOpen = true }) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  if (Array.isArray(children) && collapse) {
    const toggle = () => {
      setOpen(!open);
    };
    return (
      <section
        className={`accordion-01 shadow-sm bg-white rounded-lg overflow-hidden mt-3 ${className}`}
      >
        {React.cloneElement(children[0], {
          collapse,
          toggle,
          isOpen: open,
        })}
        <Collapse isOpen={open}>{children.slice(1)}</Collapse>
      </section>
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
Box.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  collapse: PropTypes.bool,
  children: PropTypes.node,
};

const BoxHeader = ({ children, collapse, toggle, isOpen, className = '' }) => {
  if (collapse) {
    return (
      <div
        className={`${className} w-100 background-color-tab  p-3 d-flex align-items-center after-expands-2 collapsed font-14-rem`}
        aria-expanded={isOpen}
      >
        <span
          role="presentation"
          className={`icon icon-color icon-circle ${
            isOpen ? 'icon-less ' : 'icon-plus icon-color'
          }`}
          onClick={toggle}
          style={{
            fontSize: '0.45rem',
            marginRight: '1em',
            backgroundColor: isOpen ? '#575d6d' : '#067ab8',
          }}
        />
        {children}
      </div>
    );
  }
  return (
    <div className="p-3 background-color-tab border-bottom">
      <span className="font-14-rem">{children}</span>
    </div>
  );
};
BoxHeader.propTypes = {
  isOpen: PropTypes.bool,
  collapse: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  toggle: PropTypes.func,
};

const BoxContent = ({ children, className = 'p-3', style = {} }) => (
  <div className={`${className} background-color-white`} style={style}>
    {children}
  </div>
);
BoxContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

const BoxFooter = ({ children, inside = false, className = '' }) => (
  <div
    className={`p-3 background-color-white text-right border-top ${className} ${
      inside ? 'box-inside' : ''
    }`}
  >
    {children}
  </div>
);
BoxFooter.propTypes = {
  className: PropTypes.string,
  inside: PropTypes.bool,
  children: PropTypes.node,
};

export { Box, BoxHeader, BoxContent, BoxFooter };
