/**
 *
 * Dashboard Control User Item
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ControlUItem from './ControlUserItem';
import { Box } from 'components/Box';
import Thead from 'components/Table/Thead';
import Button from 'components/Button';
import Empty from 'components/Empty';
import ControlUserModal from './ControlUserModal';

export function ControlUsers({ ControlUserItems = {}, originControlUser = {}, query, onQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h3 className="font-21 color-regular">Control de Usuarios</h3>
      <Box>
        <table className="table table-responsive-sm table-fixed table-sm m-0 border-bottom">
          <Thead
            ths={[
              { field: 'UserName', label: 'Nombre', sortable: true },
              { field: 'Role', label: 'Rol', className: "pl-3", sortable: true },
              { field: 'Pendientes', label: 'Pendientes', sortable: true },
              { field: 'Dias', label: 'Días atraso', sortable: true },
              { field: 'Average', label: 'Atraso promedio', className: "text-center", sortable: true },
              { field: '', label: '' },
            ]}
            onQuery={onQuery}
            query={query}
          />
          <tbody>
          {(ControlUserItems && (ControlUserItems.length < 1)) && (<Empty tag="h2" />)}
            {ControlUserItems && (
              ControlUserItems.slice(0, 2).map((useraction, index) => (
                <ControlUItem key={index} userAction={useraction} />
              ))
            )}
          </tbody>
        </table>
        <div className="p-3 d-flex justify-content-end">
          <Button
            disabled={(ControlUserItems && (ControlUserItems.length < 1))}
            color="white"
            className="font-14-rem m-btn m-btn-white d-block"
            onClick={() => {
              setIsOpen(true)
              query.modal = true;
            }}
          >
            Ver Todo
          </Button>
        </div>
      </Box>
      <ControlUserModal
        ControlUserItems={originControlUser}
        isOpen={isOpen}
        onHide={() => {
          setIsOpen(false);
          query.modal = false;
        }}
        query={query}
        onQuery={onQuery}
      />
    </div>
  );
}

ControlUsers.propTypes = {
  ControlUserItems: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  originControlUser: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default ControlUsers;
