/**
 *
 * Project
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { ESCRITURA_STATE } from 'containers/App/constants';
import Alert from 'components/Alert';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { Collapse, CollapseHeader, CollapseContent } from 'components/Collapse';
import { Label } from 'components/ExForm';
import ContentItem from './ContentItem';

function TitleReport({ state, initialValues, onSubmit }) 
{
  if (state < ESCRITURA_STATE.ETitulo_Tasacion)
    return null;
    
  const canEdit=(state == ESCRITURA_STATE.ETitulo_Tasacion);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState([true, true, true]);
  return (
    <Box collapse={!canEdit} isOpen={canEdit}>
      <BoxHeader>
        <b>INFORMES DE TÍTULO</b>
      </BoxHeader>
      <BoxContent className="p-3">
        <Alert type="warning">
          Debes ingresar las fechas en que enviaste el Informe de Títulos a cada Institución Financiera
        </Alert>
        <Collapse isOpen={!collapsed[0]} onCollapsed={() => setCollapsed([false, true, true])}>
          <CollapseHeader>
            <div className="d-flex align-items-center">
              <Label className="order-1 color-main">Banco Estado</Label>
              <div className="order-2 d-flex align-items-center justify-content-end flex-grow-1">
                <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
                  {initialValues.StateBankState === "Aprobado"
                    ? <span className="badge badge-success px-2">Aprobado</span>
                    : <span className="badge badge-caution px-2">Pendiente</span>
                  }
                </div>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={() => setDropdownOpen(!dropdownOpen)}
                >
                  <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
                  <DropdownMenu right positionFixed>
                    <DropdownItem tag="a"
                      onClick={() => { }}
                    >
                      Ver datos
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </CollapseHeader>
          <CollapseContent>
            <ContentItem
              initialValues={initialValues}
              name="StateBank"
              onSubmit={onSubmit}
            />
          </CollapseContent>
        </Collapse>

        <Collapse isOpen={!collapsed[1]} onCollapsed={() => setCollapsed([true, false, true])}>
          <CollapseHeader>
            <div className="d-flex align-items-center">
              <Label className="order-1 color-main">Santander</Label>
              <div className="order-2 d-flex align-items-center justify-content-end flex-grow-1">
                <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
                  {initialValues.SantanderState === "Aprobado"
                    ? <span className="badge badge-success px-2">Aprobado</span>
                    : <span className="badge badge-caution px-2">Pendiente</span>
                  }
                </div>
                <Dropdown
                  isOpen={false}
                  toggle={() => setDropdownOpen(!dropdownOpen)}
                >
                  <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
                  <DropdownMenu right positionFixed>
                    <DropdownItem
                      tag="a"
                      onClick={() => { }}
                    >
                      Ver datos
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </CollapseHeader>
          <CollapseContent>
            <ContentItem
              initialValues={initialValues}
              name="Santander"
              onSubmit={onSubmit}
            />
          </CollapseContent>
        </Collapse>

        <Collapse isOpen={!collapsed[2]} onCollapsed={() => setCollapsed([true, true, false])}>
          <CollapseHeader>
            <div className="d-flex align-items-center">
              <Label className="order-1 color-main">Banco de Chile</Label>
              <div className="order-2 d-flex align-items-center justify-content-end flex-grow-1">
                <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
                  {initialValues.ChileBankState === "Aprobado"
                    ? <span className="badge badge-success px-2">Aprobado</span>
                    : <span className="badge badge-caution px-2">Pendiente</span>
                  }
                </div>
                <Dropdown
                  isOpen={false}
                  toggle={() => setDropdownOpen(!dropdownOpen)}
                >
                  <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
                  <DropdownMenu right positionFixed>
                    <DropdownItem
                      tag="a"
                      onClick={() => { }}
                    >
                      Ver datos
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </CollapseHeader>
          <CollapseContent>
            <ContentItem
              initialValues={initialValues}
              name="ChileBank"
              onSubmit={onSubmit}
            />
          </CollapseContent>
        </Collapse>
      </BoxContent>
    </Box>
  );
}

TitleReport.propTypes = {  
  state: PropTypes.number,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default TitleReport;
