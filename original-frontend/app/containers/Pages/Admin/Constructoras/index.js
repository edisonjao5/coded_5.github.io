/*
 * ConstructorasPage
 *
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import InitData from 'containers/Common/InitData';
import RealEstate from 'containers/Common/RealEstate/Loadable';
import { Auth } from 'containers/App/helpers';
import Ban from '../../../../components/Ban';

export default function ConstructorasPage() {
  return (
    <div>
      <InitData RealEstate User />
      <Helmet title="Constructoras" />
      <PageHeader header={['Configuración', 'Constructoras']} />
      {!Auth.isAdmin() && <Ban />}
      {Auth.isAdmin() && <RealEstate query={{ type: 'constructora' }} />}
    </div>
  );
}
