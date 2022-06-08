/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, CollapseContent, CollapseHeader } from 'components/Collapse';
import { clientFullname } from 'containers/Common/Client/helper';
import Renta from './Renta';
import Labor from './Labor';

const Codeudor = ({ values }) => (
  <Collapse>
    <CollapseHeader>Co-Deudor</CollapseHeader>
    <CollapseContent>
      <div className="add-client my-4 row">
        <div className="col-12 add-box d-flex align-items-center font-14">
          <b>Cliente:</b> {clientFullname(values.Cliente)}
        </div>
      </div>
      <article className="person-record pt-3">
        <Labor values={values} group="Codeudor" />
        <Renta group="Codeudor" values={values} />
      </article>
    </CollapseContent>
  </Collapse>
);

Codeudor.propTypes = {
  values: PropTypes.object,
};
export default Codeudor;
