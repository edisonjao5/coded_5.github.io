/**
 *
 * View
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from '../Modal';
import { Box, BoxContent, BoxHeader } from '../Box';
import moment from '../moment';
import { userFullname } from 'containers/Common/User/helper';
const logLabel = logType => {
  switch (logType) {
    case 'AC Aprobacion maqueta':
      return 'Aprobacion maqueta';
    default:
      return logType;
  }
};

const isMadeBySystem = (type,user) => {
  return type ? "Acciones que hizo en el Sistema" : `${user.Name} ${user.LastNames} escribió`
}

function Histroy({ logs, onHide, isOpen=false, title='' }) {
  const showIndex = 
    (logs&&logs.length) ? 
    logs.findIndex(log=> log.VentaLogType=="Creacion reserva"): 0;
  const showLogs = logs? logs.slice(0, (showIndex+1)): [];
  return (
    <Modal isOpen={isOpen} size="xl" scrollable>
      <ModalHeader> HISTORIAL </ModalHeader>
      <ModalBody className="p-3 bg-light">
        {showLogs && (
          <Box>
            <BoxHeader>
              <b>{title}</b>
            </BoxHeader>
            <BoxContent className="p-3">
              {showLogs.map(log => (
                <div key={log.VentaLogID} className="p-3 border-bottom">
                  <div className="font-14-rem pb-2">
                    <div>
                      <span className="badge badge-info">
                        {log.User.Roles[0].Name}
                      </span>{' '}
                      <b>{logLabel(log.VentaLogType)} - {isMadeBySystem(log.CommentBySystem, log.User)}</b>
                    </div>
                    <span className="font-12-rem">Realizado por </span>{' '}
                    <span className="badge badge-light">
                      {userFullname(log.User)}
                    </span>{' '}
                    <span className="font-12-rem">en </span>
                    <span className="badge badge-light">
                      {moment(log.Date).format('DD MMM YYYY HH:mm:ss')}
                    </span>
                  </div>
                  <div style={{ whiteSpace: 'pre-line' }}>{log.Comment}</div>
                </div>
              ))}
            </BoxContent>
          </Box>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          className="ml-2"
          color="white"
          onClick={onHide}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

Histroy.propTypes = {
  selector: PropTypes.object,
  onHide: PropTypes.func,
};

export default Histroy;
