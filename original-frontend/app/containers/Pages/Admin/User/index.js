/*
 * UserPage
 *
 *
 */

import React from 'react';
import User from 'containers/Common/User/Loadable';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import InitData from 'containers/Common/InitData';
import { Auth } from 'containers/App/helpers';
import Ban from 'components/Ban';

export default function UserPage() {
  return (
    <div>
      <InitData User />
      <Helmet title="Usuarios" />
      <PageHeader header={['Configuración', 'Usuarios']} />
      {!Auth.isAdmin() && <Ban />}
      {Auth.isAdmin() && <User query={false} />}
    </div>
  );
}
