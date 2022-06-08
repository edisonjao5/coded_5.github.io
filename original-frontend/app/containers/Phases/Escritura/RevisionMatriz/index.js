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
import Button from 'components/Button';
import { Box, BoxContent, BoxHeader,BoxFooter } from 'components/Box';
import { Collapse, CollapseHeader, CollapseContent } from 'components/Collapse';
import { Label } from 'components/ExForm';
import { UserProject } from 'containers/Project/helper';
import ContentItem from './ContentItem';

function RevisionMatriz({ initialValues, onSubmit }) 
{
  const { 
    RevisionConfirmoStateBank,
    RevisionConfirmoSantander,
    RevisionConfirmoChileBank,    
    EscrituraState } = initialValues;

  if (EscrituraState < ESCRITURA_STATE.Matrices_Escrit_I)
    return null;

  const canEdit=(EscrituraState == ESCRITURA_STATE.Matrices_Escrit_I);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState([true, true, true]);

  const canAprove = UserProject.isLegal();

  return (
    <Box collapse={!canEdit} isOpen={canEdit}>
      <BoxHeader>
        <b>REVISIÓN DE MATRIZ</b>
      </BoxHeader>
      <BoxContent className="p-3">
        <Alert type="warning">
          Debes revisar las Matrices y cargar los documentos.
        </Alert>
        
        <Collapse isOpen={!collapsed[0]} onCollapsed={() => setCollapsed([false, true, true])}>
          <CollapseHeader>
            <div className="d-flex align-items-center">
              <Label className="order-1 color-main">Banco Estado</Label>
              <div className="order-2 d-flex align-items-center justify-content-end flex-grow-1">
                <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
                  {RevisionConfirmoStateBank == true
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
              canEdit = {canAprove}
            />
          </CollapseContent>
        </Collapse>

        <Collapse isOpen={!collapsed[1]} onCollapsed={() => setCollapsed([true, false, true])}>
          <CollapseHeader>
            <div className="d-flex align-items-center">
              <Label className="order-1 color-main">Santander</Label>
              <div className="order-2 d-flex align-items-center justify-content-end flex-grow-1">
                <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
                  {RevisionConfirmoSantander
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
              canEdit = {canAprove}
            />
          </CollapseContent>
        </Collapse>

        <Collapse isOpen={!collapsed[2]} onCollapsed={() => setCollapsed([true, true, false])}>
          <CollapseHeader>
            <div className="d-flex align-items-center">
              <Label className="order-1 color-main">Banco de Chile</Label>
              <div className="order-2 d-flex align-items-center justify-content-end flex-grow-1">
                <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
                  {RevisionConfirmoChileBank
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
              canEdit = {canAprove}
            />
          </CollapseContent>
        </Collapse>
      </BoxContent>
      { EscrituraState < ESCRITURA_STATE.Matrices_Escrit_II &&
        <BoxFooter>
          <div className="d-flex justify-content-end mr-5">
            <Button
              onClick={()=>{
                const data = new FormData();
                data.append("EscrituraState", ESCRITURA_STATE.Matrices_Escrit_II);
                onSubmit(data);
              }}
              disabled={!canAprove}
            >Guardar</Button>
          </div>
        </BoxFooter>
      }
    </Box>
  );
}

RevisionMatriz.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default RevisionMatriz;
