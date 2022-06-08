import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'components/ExForm';
import ExField from 'components/ExForm/ExField';
import { FieldArray } from 'formik';
import UserElement from 'containers/Common/User/Element';

const UsersElement = ({ userInmobiliariaTypes, values }) => {
  const [userType, setUserType] = useState('');

  const getUserInName = userInmobiliariaType => {
    switch (userInmobiliariaType.Name) {
      case 'Aprobador':
        return `${userInmobiliariaType.Name}(es)`;
      case 'Representante':
        return `${userInmobiliariaType.Name}(s)`;
      default:
        return userInmobiliariaType.Name;
    }
  };

  return (
    <FieldArray
      name="UsersInmobiliaria"
      render={({ remove, push }) => {
        const UsersInmobiliaria = values.UsersInmobiliaria.map(
          (user, index) => ({
            ...user,
            index,
          }),
        );
        return (
          <>
            {userInmobiliariaTypes.map(userInmobiliariaType => {
              const users = UsersInmobiliaria.filter(
                user =>
                  user.UserInmobiliariaTypeName === userInmobiliariaType.Name ||
                  user.UserInmobiliariaType === userInmobiliariaType.Name,
              );
              if (users.length < 1)
                users.push({
                  index: -1,
                  Rut: '',
                  Name: '',
                });

              return (
                <div
                  className="mt-5"
                  key={userInmobiliariaType.UserInmobiliariaTypeID}
                >
                  <div className="col-md-6 border-bottom p-0 pb-3 d-flex justify-content-between align-items-center">
                    <span className="font-14-rem">
                      <b>{getUserInName(userInmobiliariaType)}</b>
                    </span>
                    {userInmobiliariaType.Name /* !== 'Autorizador' */ && (
                      <UserElement
                        query={{
                          roles: 'Inmobiliario',
                          selected: users.map(user => user.UserID),
                        }}
                        onSelect={user => {
                          push({
                            ...user,
                            UserInmobiliariaTypeName: userType,
                          });
                        }}
                        component={({ openUserElement }) => (
                          <div
                            role="presentation"
                            onClick={() => {
                              setUserType(userInmobiliariaType.Name);
                              openUserElement(true);
                            }}
                            className="font-14-rem color-main btn-plus"
                          >
                            <b>Agregar {userInmobiliariaType.Name}</b>
                          </div>
                        )}
                      />
                    )}
                  </div>
                  {users.map(user => (
                    <div
                      key={
                        user.UserID ||
                        `${userInmobiliariaType.UserInmobiliariaTypeID}-1`
                      }
                      className="row justify-content-between"
                    >
                      <FormGroup className="col-md-5 mt-3">
                        <Label style={{ width: '10em' }}>Nombre</Label>
                        <ExField
                          readOnly
                          className="flex-fill"
                          name={`UsersInmobiliaria.${user.index}.Name`}
                        />
                        <div className="font-21 color-main opacity-0 ml-2">
                          <strong>+</strong>
                        </div>
                      </FormGroup>
                      <FormGroup className="col-md-5 mt-3">
                        <Label style={{ width: '10em' }}>Rut</Label>
                        <ExField
                          readOnly
                          className="flex-fill"
                          name={`UsersInmobiliaria.${user.index}.Rut`}
                        />
                        {user.UserID && (
                          <div
                            role="presentation"
                            onClick={() => remove(user.index)}
                            className="font-21 color-main background-color-transparent ml-2 pl-1 pointer"
                          >
                            <strong> - </strong>
                          </div>
                        )}
                        {!user.UserID && (
                          <div className="font-21 color-main opacity-0 ml-2">
                            <strong>+</strong>
                          </div>
                        )}
                      </FormGroup>
                    </div>
                  ))}
                </div>
              );
            })}
          </>
        );
      }}
    />
  );
};

UsersElement.propTypes = {
  values: PropTypes.object,
  userInmobiliariaTypes: PropTypes.array,
};
export default UsersElement;
