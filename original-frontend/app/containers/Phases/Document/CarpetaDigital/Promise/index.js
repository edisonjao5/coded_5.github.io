/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { List, Item } from 'components/List';
import { getFileName } from 'containers/App/helpers';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { getPromesa } from 'containers/Project/helper';

export function Promise({ entity }) {
  const { maquetaWord, maquetaPdf, docPromesa } = getPromesa(entity);
  
  return (
    <List>
      {/* <Item>
        <div className="color-regular order-1" style={{ width: '22em' }}>
          <b>Maqueta Promesa Word</b>
        </div>
        <span className="font-14-rem order-3 mr-3">
          <em>{getFileName(maquetaWord.url)}</em>
        </span>
        <UncontrolledDropdown className="order-3">
          <DropdownToggle
            tag="a"
            className="icon icon-dots color-main font-21"
          />
          <DropdownMenu right positionFixed>
            <DropdownItem tag="a" target="_blank" href={maquetaWord.url}>
              Ver documento
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Item>
      <Item className="border-top">
        <div className="color-regular order-1" style={{ width: '22em' }}>
          <b>Maqueta Promesa Pdf</b>
        </div>
        <span className="order-1 italic-gray">Firmado</span>
        <span className="font-14-rem order-3 mr-3">
          <em>{getFileName(maquetaPdf.url)}</em>
        </span>
        <UncontrolledDropdown className="order-3">
          <DropdownToggle
            tag="a"
            className="icon icon-dots color-main font-21"
          />
          <DropdownMenu right positionFixed>
            <DropdownItem tag="a" target="_blank" href={maquetaPdf.url}>
              Ver documento
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Item> */}
      {docPromesa && 
        <Item className="border-top">
          <div className="color-regular order-1" style={{ width: '22em' }}>
            <b>Promesa</b>
          </div>
          <span className="order-1 italic-gray">Firmado</span>
          <span className="font-14-rem order-3 mr-3">
            <em>{getFileName(docPromesa)}</em>
          </span>
          <UncontrolledDropdown className="order-3">
            <DropdownToggle
              tag="a"
              className="icon icon-dots color-main font-21"
            />
            <DropdownMenu right positionFixed>
              <DropdownItem tag="a" target="_blank" href={docPromesa}>
                Ver documento
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Item>
      }
    </List>
  );
}

Promise.propTypes = {
  entity: PropTypes.object,
};

export default Promise;
