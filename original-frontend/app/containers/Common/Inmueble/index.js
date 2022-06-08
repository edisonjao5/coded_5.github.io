/**
 *
 * Inmueble
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import { resetSelected, selectEntity } from './actions';
import InmuebleList from './InmuebleList';
import makeSelectInmuebleInit from './selectors';
import Summary from './Summary';

import ReviewInmuebleList from '../../Project/Inmueble/Inmuebles/InmuebleList';
import ReplaceConfirm from './ReplaceConfirm';
const SyncMessage = WithLoading();

export function Inmueble({
  defaultShowType = 'list',
  selected = [], // default selected
  showSummary = false, // show the summary
  isOpen = true,
  multiple = true,
  focusChange = false,
  canEdit = false,
  drafSelector,
  onImportFile,
  onSave,
  selector,
  onHide,
  onSelect,
  dispatch,
}) {
  const { entities, loading } = selector;

  useEffect(() => {
    dispatch(
      resetSelected(
        Array.isArray(selected) ? selected : [selected],
        focusChange,
      ),
    );
    return () => dispatch(resetSelected([], focusChange));
  }, [isOpen]);

  const fileUploader = useRef(null);
  const [initLoading, setInitLoading] = useState(true);
  const [drafLoading, setDrafLoading] = useState(false);

  const [isReplaceOpen, setReplaceOpen] = useState(false);
  const [replaceData, setReplaceData] = useState(null);
  const usedEntities = (entities || []).filter(
    entity => entity.InmuebleState !== 'Disponible',
  );

  let reviewInmuebles;
  if (drafSelector) reviewInmuebles = drafSelector.reviewInmuebles;

  useEffect(() => {
    if (initLoading) return;

    setDrafLoading(drafSelector.loading);
  }, [reviewInmuebles]);

  useEffect(() => {
    setInitLoading(true);
    setDrafLoading(false);
  }, [selector]);

  const onSelectItem = (entity, IsSelected) => {
    if (onSelect && !multiple) {
      if (IsSelected) {
        onSelect(entity);
        onHide();
      }
    } else {
      dispatch(selectEntity(entity, IsSelected, focusChange));
    }
  };

  const onConfirm = () => {
    setReplaceOpen(false);

    setDrafLoading(true);
    setInitLoading(false);

    if (usedEntities.length) {
      console.log(usedEntities);
    }

    onImportFile(replaceData);
  };

  const onCancel = () => {
    setReplaceData(null);
    setReplaceOpen(false);
  };

  return (
    <Modal isOpen={isOpen} size="xl" scrollable id="seleccion_inmuebles_modal">
      <ModalHeader>Inmuebles</ModalHeader>
      <ModalBody>
        {loading && <SyncMessage {...selector} />}
        {!loading && initLoading && entities && (
          <InmuebleList
            dispatch={dispatch}
            focusChange={focusChange}
            defaultShowType={defaultShowType}
            selector={selector}
            onSelectItem={onSelect ? onSelectItem : null}
          />
        )}
        {!loading && entities && showSummary && <Summary selector={selector} />}

        {/* for updating */}
        {drafLoading && <SyncMessage {...drafSelector} />}
        {!loading && !drafLoading && !initLoading && reviewInmuebles && (
          <ReviewInmuebleList entities={reviewInmuebles} />
        )}

        <ReplaceConfirm
          isOpen={isReplaceOpen}
          onHide={onCancel}
          onConfirm={onConfirm}
        />
      </ModalBody>
      <ModalFooter>
        {canEdit && (
          <>
            <Button
              loading={drafLoading}
              disabled={loading || drafLoading}
              onClick={() => {
                fileUploader.current.click();
              }}
            >
              Nueva carga
            </Button>
            <input
              name="File"
              accept=".csv,.xls,.xlsx"
              style={{ display: 'none' }}
              type="file"
              ref={fileUploader}
              onChange={event => {
                const data = new FormData();
                data.append('File', event.currentTarget.files[0]);
                event.currentTarget.value = '';
                setReplaceData(data);

                if (usedEntities.length) setReplaceOpen(true);
                else onConfirm();
              }}
            />
            <Button
              loading={drafLoading}
              disabled={initLoading ? true : drafLoading}
              onClick={() => {
                setDrafLoading(true);
                onSave();
                setInitLoading(false);
              }}
            >
              Guardar
            </Button>
          </>
        )}
        {onSelect && (
          <Button
            disabled={loading}
            onClick={() => {
              onSelect(selector.selected);
              onHide();
            }}
          >
            Seleccionados
          </Button>
        )}
        <Button disabled={loading} onClick={onHide} type="reset" color="white">
          Volver
        </Button>
      </ModalFooter>
    </Modal>
  );
}

Inmueble.propTypes = {
  defaultShowType: PropTypes.string,
  showSummary: PropTypes.bool,
  multiple: PropTypes.bool,
  focusChange: PropTypes.bool,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isOpen: PropTypes.bool,
  canEdit: PropTypes.bool,
  selector: PropTypes.object,
  onHide: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func,
  onSelect: PropTypes.func,
  onImportFile: PropTypes.func,
  onSaveInmuebles: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectInmuebleInit(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Inmueble);
