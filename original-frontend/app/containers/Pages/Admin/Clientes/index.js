/*
 * UserPage
 *
 *
 */

import React from 'react';
import Client from 'containers/Common/Client/Loadable';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import InitData from 'containers/Common/InitData';
import { Auth } from 'containers/App/helpers';
// import Ban from 'components/Ban';

export default function ClientesPage() {
  return (
    <div>
      <InitData Client />
      <Helmet title="Clientes" />
      {Auth.isAdmin() && (
        <>
          <PageHeader header={['Configuración', 'Clientes']} />
          <Client query={false} />
        </>
      )}
      {!Auth.isAdmin() && ( // <Ban />
        <>
          <PageHeader header={['Clientes']} />
          <Client query={false} />
        </>
      )}
    </div>
  );
}
