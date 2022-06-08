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
import { UserProject } from 'containers/Project/helper';
import { Auth } from 'containers/App/helpers';

import Alert from 'components/Alert';
import Button from 'components/Button';
import { Box, BoxContent, BoxHeader,BoxFooter } from 'components/Box';
import { Collapse, CollapseHeader, CollapseContent } from 'components/Collapse';
import { Label } from 'components/ExForm';
import ContentItem from './ContentItem';

function TasacionesBancarias({ initialValues, onSubmit }) 
{
  const { TasacionStateBank, TasacionSantander, TasacionChileBank,
    EscrituraState } = initialValues;

  if (EscrituraState < ESCRITURA_STATE.ETitulo_Tasacion)
    return null;

  const canEdit=(EscrituraState == ESCRITURA_STATE.ETitulo_Tasacion);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState([true, true, true]);
  return (
    <Box collapse={!canEdit} isOpen={canEdit}>
      <BoxHeader>
        <b>TASACIÓNES BANCARIAS</b>
      </BoxHeader>
      <BoxContent className="p-3">
        <Alert type="warning">
          Debes ingresar las Tasaciónes Bancarias.
        </Alert>
        
        <Collapse isOpen={!collapsed[0]} onCollapsed={() => setCollapsed([false, true, true])}>
          <CollapseHeader>
            <div className="d-flex align-items-center">
              <Label className="order-1 color-main">Banco Estado</Label>
              <div className="order-2 d-flex align-items-center justify-content-end flex-grow-1">
                <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
                  {TasacionStateBank
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
              name="TasacionStateBank"
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
                  {TasacionSantander
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
              name="TasacionSantander"
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
                  {TasacionChileBank
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
              name="TasacionChileBank"
              onSubmit={onSubmit}
            />
          </CollapseContent>
        </Collapse>
      </BoxContent>
      { EscrituraState < ESCRITURA_STATE.Matrices_Escrit_I && Auth.isES() &&
        <BoxFooter>
          <div className="d-flex justify-content-end mr-5">
            <Button 
              disabled={EscrituraState === ESCRITURA_STATE.Matrices_Escrit_I}
              onClick={()=>{
                const data = new FormData();
                data.append("EscrituraState", ESCRITURA_STATE.Matrices_Escrit_I);
                onSubmit(data);
              }}
            >
              Aprobado
            </Button>
          </div>
        </BoxFooter>
      }
    </Box>
  );
}

TasacionesBancarias.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default TasacionesBancarias;
