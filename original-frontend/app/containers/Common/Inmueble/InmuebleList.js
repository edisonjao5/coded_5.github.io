/**
 *
 * InmuebleList
 *
 */
import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import InmuebleFilter from './InmuebleFilter';
import BluePrint from './BluePrint';
import Grid from './Grid/index';
import List from './List/index';
import {uploadblueFiles, updateEntities} from './actions'
import {
  Form as ExForm,
  FormGroup,
  Label,
  Field as ExField,
} from 'components/ExForm';
import ModifyModal from './ModifyModal';

const InmuebleList = ({
  defaultShowType = 'list',
  selector,
  children,
  focusChange,
  onSelectItem,
  dispatch,
}) => {
  const { entities, selected } = selector;
  const [showEntities, setState] = useState(entities);
  const [isModify, setModify] = useState(false);
  const [modifySelector, setModifySelector] = useState(false);

  useEffect(() => {
    setState(
      showEntities.map(entity => ({
        ...entity,
        IsSelected: !!selected.find(
          item => item.InmuebleID === entity.InmuebleID,
          ),
        })),
        );
  }, [selector.selected]);
      
  const [showType, setShowType] = useState(defaultShowType);
  const handleChangeQuery = query => {
    setState(
      entities.filter(entity => {
        const {
          TerraceSquareMeters = 0,
          UtilSquareMeters = 0,
          LodgeSquareMeters = 0,
          Price,
          Orientation = [],
          Floor,
          TipologiaID,
          InmuebleTypeID,
        } = entity;

        const totalSquare =
          TerraceSquareMeters + UtilSquareMeters + LodgeSquareMeters;
        return (
          query.rangeSquare[0] <= totalSquare &&
          query.rangeSquare[1] >= totalSquare &&
          query.rangePrice[0] <= Price &&
          query.rangePrice[1] >= Price &&
          Orientation.find(
            item =>
              !query.orientation || item.OrientationID === query.orientation,
          ) &&
          (!query.floor || Floor === parseInt(query.floor, 10)) &&
          (!query.subtype || TipologiaID === query.subtype) &&
          (!query.type || InmuebleTypeID === query.type)
        );
      }),
    );
  };
  const onModifyItem = entity => {
    setModifySelector(entity);
    setModify(true);
  }

  let Child = List;
  if (showType === 'grid') Child = Grid;

  return (
    <>
      <InmuebleFilter entities={entities} onQuery={handleChangeQuery} />
      {children}
      <div className="d-flex p-3 justify-content-end">
        <Button
          color="white"
          disabled={showType === 'list'}
          onClick={() => setShowType('list')}
        >
          list
        </Button>
        <Button
          color="white"
          disabled={showType === 'grid'}
          onClick={() => setShowType('grid')}
        >
          grid
        </Button>
        <ExForm method="POST" enctype="multipart/form-data">
          <FormGroup className="align-items-center">
            <BluePrint
              required
              onSubmit={ values=>dispatch(uploadblueFiles(values, entities)) }
              name="BlueUP"
            />
          </FormGroup>
        </ExForm>
      </div>
      <Child
        focusChange={focusChange}
        entities={showEntities}
        selected={selected}
        onSelectItem={onSelectItem}
        onModifyItem={onModifyItem}
      />
      {isModify &&
        <ModifyModal
          initialValues={modifySelector}
          onSave={(values)=>{
            dispatch(updateEntities(values));
            setModify(false);
          }}
          onHide={()=>setModify(false)}
        />
      }
    </>
  );
};

InmuebleList.propTypes = {
  defaultShowType: PropTypes.string,
  focusChange: PropTypes.bool,
  selector: PropTypes.object,
  children: PropTypes.node,
  onSelectItem: PropTypes.func,
  dispatch: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapDispatchToProps,
);

export default compose(withConnect)(InmuebleList);