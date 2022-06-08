/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';

import LoginPage from 'containers/Pages/Login/Loadable';
/* admin */
import UserPage from 'containers/Pages/Admin/User/Loadable';
import ClientesPage from 'containers/Pages/Admin/Clientes/Loadable';
import InmobiliariasPage from 'containers/Pages/Admin/Inmobiliarias/Loadable';
import ConstructorasPage from 'containers/Pages/Admin/Constructoras/Loadable';
import AseguradorasPage from 'containers/Pages/Admin/Aseguradoras/Loadable';
import InstitucionFinancieraPage from 'containers/Pages/Admin/InstitucionFinanciera/Loadable';

import NotFoundPage from 'containers/Pages/NotFound/Loadable';
/* project pages */
import ProjectListPage from 'containers/Pages/Project/List/Loadable';
import CreateProjectPage from 'containers/Pages/Project/Create/Loadable';
import DetailProjectPage from 'containers/Pages/Project/Detail/Loadable';
import QuotationsPage from 'containers/Pages/Quotation/List/Loadable';
import ReservationForm from 'containers/Reservation/Form/Loadable';
import CreateQuotationPage from 'containers/Pages/Quotation/Create/Loadable';
import QuotationPage from 'containers/Pages/Quotation/Detail/Loadable';
import ReservationsPage from 'containers/Pages/Reservation/List/Loadable';
import CreateReservationPage from 'containers/Pages/Reservation/Create/Loadable';
import EditReservationPage from 'containers/Pages/Reservation/Edit/Loadable';
import OfferPage from 'containers/Pages/Offer/View/Loadable';
import CarpetaPage from 'containers/Pages/Carpeta/Loadable';
import OffersPage from 'containers/Pages/Offer/List/Loadable';
import EditOfferPage from 'containers/Pages/Offer/Edit/Loadable';
import EditProjectPage from 'containers/Pages/Project/Edit/Loadable';
import InmueblesPage from 'containers/Pages/Project/Inmuebles/Loadable';
import PromesasPage from 'containers/Pages/Promesa/List';
import PromesaPage from 'containers/Pages/Promesa/View/Loadable';
import EscriturasPage from 'containers/Pages/Escritura/List/Loadable';
import EscrituraPage from 'containers/Pages/Escritura/View/Loadable';
import EscrituraProyectoPage from 'containers/Pages/Escritura/Project/Loadable';
import DashboardPage from 'containers/Pages/Dashboard/Loadable';

import { Auth } from './helpers';
import AppRoute from './AppRoute';
import saga from './saga';

function App() {
  useInjectSaga({ key: 'global', saga });
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s - SSilva Administración"
        defaultTitle="SSilva Administración"
      >
        <meta name="description" content="" />
      </Helmet>
      <Switch>
        <AppRoute
          exact
          path="/"
          component={ProjectListPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          path="/login"
          component={LoginPage}
          layout="login"
          redirect={() => (Auth.isLoggedIn() ? '/' : '')}
        />
        {/* admin pages */}
        <AppRoute
          exact
          path="/admin/usuarios"
          component={UserPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/admin/clientes"
          component={ClientesPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/admin/inmobiliarias"
          component={InmobiliariasPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/admin/constructoras"
          component={ConstructorasPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/admin/aseguradoras"
          component={AseguradorasPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/admin/InstitucionFinanciera"
          component={InstitucionFinancieraPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />

        {/* project pages */}
        <AppRoute
          exact
          path="/proyectos"
          component={ProjectListPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/crear"
          component={CreateProjectPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/editar"
          component={EditProjectPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/inmuebles"
          component={InmueblesPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/cotizacion/crear"
          component={CreateQuotationPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/cotizacion/:cid"
          component={QuotationPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/cotizaciones"
          component={QuotationsPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/reserva/crear"
          component={CreateReservationPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/reserva/edit"
          component={EditReservationPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/reserva"
          component={ReservationForm}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/reservas"
          component={ReservationsPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/oferta/editar"
          component={EditOfferPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/oferta"
          component={OfferPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/carpeta"
          component={CarpetaPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/ofertas"
          component={OffersPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />

        <AppRoute
          exact
          path="/proyectos/:id/promesas"
          component={PromesasPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/promesa"
          component={PromesaPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />       
        <AppRoute
          exact
          path="/proyectos/:id/escrituras"
          component={EscriturasPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/escritura"
          component={EscrituraPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/proyectos/:id/escritura-proyecto"
          component={EscrituraProyectoPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />

        <AppRoute
          path="/proyectos/:id"
          component={DetailProjectPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/clientes"
          component={ClientesPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          exact
          path="/dashboard"
          component={DashboardPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
        <AppRoute
          component={NotFoundPage}
          redirect={() => (!Auth.isLoggedIn() ? '/login' : '')}
        />
      </Switch>
    </React.Fragment>
  );
}
export default App;
