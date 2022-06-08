/**
 *
 * Offer Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { OFERTA_STATE } from 'containers/App/constants';
import Condition from './Condition';

const SyncMessage = WithLoading();
export function OfferConfirmActions({
  entity,
  selector,
  onCancel,
  onConfirm,
  onEdit,
  onDelete,
  onWithdraw,
}) {
  const { loading } = selector;
  // entity.Condition = [{ Description: 'Observation 1' }, { Description: 'Observation 2' }];
  const [condition, setCondition] = useState([]);
  const [withText, setWithText] = useState({ text: '', open: false, type: null, });

  const onChangeCondition =(index, value)=> {
    condition[index] = {Description: value};
    setCondition([...condition]);
  }
  const onRemoveCondition =(index) => {
    condition.splice(index, 1);
    setCondition([...condition]); 
  }
  const onCheckCondition =()=> {
    if(condition.length){
      for(let i of condition){
        if(i.Description.trim() == ""){
          alert("Por favor agregue observación");
          return false;
        }
      }
    }
    return true;
  }

  return (
    <>
      <div className="d-flex after-expands-2 align-items-center">
        {entity.OfertaState !== OFERTA_STATE[2] && (
          <div className="d-flex align-items-center after-expands-2 font-14-rem order-3">
            <div className="d-flex align-items-center mr-3 ">
              <div className="checkbox-01 checkbox-medium">
                <span>
                  <input
                    type="checkbox"
                    // onChange={evt => {
                    //   // onConfirm('client', evt.currentTarget.checked);
                    // }}
                  />
                  {/* eslint-disable-next-line */}
                  <label />
                </span>
              </div>
              <span>
                <b>Revisé y confirmo Oferta</b>
              </span>
            </div>
            <div className="d-flex align-items-center mr-3 order-3">
              <div className="checkbox-01 checkbox-medium">
                <span>
                  <input
                    type="checkbox"
                    // onChange={evt => {
                    //   // onConfirm('client', evt.currentTarget.checked);
                    // }}
                  />
                  {/* eslint-disable-next-line */}
                  <label />
                </span>
              </div>
              <span>
                <b>Contacté al cliente</b>
              </span>
            </div>
            <Button
              disabled={loading}
              className="order-3 m-btn mr-2"
              onClick={()=>{
                if(onCheckCondition() == false) return;
                onConfirm(condition);
              }}
            >
              Continuar
            </Button>
          </div>
        )}
        {entity.OfertaState === OFERTA_STATE[2] && (
          <Button
            className="order-3 m-btn mr-2 m-btn-pen"
            onClick={onEdit}
          >
            Modificación
          </Button>
        )}
        <Button
          disabled={loading}
          className="order-3 m-btn mr-2"
          color="white"
          onClick={onCancel}
        >
          Cancerlar
        </Button>
        <Button
          disabled={loading}
          className="order-3 m-btn m-btn-white m-btn-plus mr-2"
          onClick={() => {
            if(onCheckCondition() == false) return;
            setCondition([...condition, {Description: ""}]);
          }}
        >
          Agregar Observación
        </Button>
        {withText.type !== "Rechazar" && (
          <Button
            disabled={loading}
            className="order-3 m-btn mr-2"
            color="white"
            onClick={()=>setWithText({ text: "", open: true, type: "Rechazar" })}
          >
            Rechazar
          </Button>
        )}
        {withText.type !== "Desistimiento" && (
          <Button
            disabled={loading}
            className="order-3 m-btn-warning-02 d-inline"
            onClick={()=>setWithText({ text: "", open: true, type: "Desistimiento" })}
          >
            Desistimiento
          </Button>
        )}
      </div>
      {withText.open && (
        <>
          <div className="mt-3">
            <span className="d-block font-14-rem">
              <b>Comentario</b>
            </span>
            <div className="pt-2">
              <textarea
                className="w-100 d-block rounded-lg shadow-sm"
                rows="5"
                onChange={evt =>
                  setWithText({ ...withText, text: evt.target.value })
                }
              />
            </div>
          </div>
          <div className="py-3 text-right">
            <Button
              disabled={loading || withText.text.trim() == ""}
              className="order-3 m-btn-warning-02 d-inline"
              onClick={()=>{
                const comment = withText.text.trim();
                return (withText.type==="Desistimiento") ? onWithdraw(comment) : onDelete(comment);
              }}
            >
              {withText.type}
            </Button>
            <Button
              disabled={loading}
              className="m-btn"
              onClick={() => setWithText({ text: "", open: false, type: null })}
            >
              Cancelar
            </Button>
          </div>
        </>
      )}
      {condition.length > 0 &&
      <>
        <div className="d-block text-left m font-14-rem mb-3">
          <b>Nueva Observación</b>
        </div>
        { condition.map((item, index) => (
          <Condition
            key={String(index)}
            className="w-100 d-block mb-3"
            condition={item}
            onChange={(value)=> onChangeCondition(index,value)}
            onRemove={()=>onRemoveCondition(index)}
          />
        ))}
       </>
      }
      <SyncMessage {...selector} />
    </>
  );
}

OfferConfirmActions.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onWithdraw: PropTypes.func,
};

export default OfferConfirmActions;
