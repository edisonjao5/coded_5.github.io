/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import RadioGroup from 'components/ExForm/RadioGroup';
import DocumentItem from '../DocumentItem';
import Button from 'components/Button';

export function Garantia({
  isCollapse,
  entity,
  canUpload,
  onCancel,
  onGarantia,
  promesa,
}) {
  return (
    <Box collapse isOpen={isCollapse}>
      <BoxHeader>
        <b>PAGO DE GARANTÍA</b>
        {onGarantia && (
          <div className="d-flex align-items-center justify-content-end mr-3 order-3">
            <Button onClick={onGarantia}>Recibí Garantía</Button>
            <Button color="white" onClick={onCancel}>
              cancelar
            </Button>
          </div>
        )}
      </BoxHeader>
      <BoxContent>
        <div className="row m-0 w-50 border-bottom pb-2 d-none">
          <RadioGroup
            className="d-flex align-items-center col-auto p-0"
            name="Pay"
            options={[
              { label: 'Transferencia', value: 0 },
              { label: 'Cheque', value: 1 },
            ]}
          />
        </div>
        {promesa ?
          <DocumentItem
            documentoName="Transferencia/Cheque"
            documentoType="DocumentPagoGarantia"
            required
            Documentos={entity.Documents || {}}
            canUpload={canUpload}
          />
          :
          <DocumentItem
            documentoName="Transferencia/Cheque"
            documentoType="DocumentPagoGarantia"
            required
            Documentos={entity.Documents || {}}
            canUpload={canUpload}
            description="Debes subir el comprobante de transferencia/cheque"
          />
        }
      </BoxContent>
    </Box>
  );
}

Garantia.propTypes = {
  isCollapse: PropTypes.bool,
  canUpload: PropTypes.bool,
  entity: PropTypes.object,
  onGarantia: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onCancel: PropTypes.func,
  promesa: PropTypes.bool,
};

export default Garantia;
