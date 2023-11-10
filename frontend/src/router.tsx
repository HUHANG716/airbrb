/** @format */

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Hosting from './pages/Hosting/Hosting';
import ListingEdit from './pages/ListingEdit/ListingEdit';
import ListingHosted from './pages/ListingHosted/ListingHosted';
import ListingDetail from './pages/ListingDetail/ListingDetail';
import ListingBookingDetail from './pages/ListingBookingDetail/ListingBookingDetail';

export const routerConfig = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },

      {
        path: 'listing',
        children: [
          {
            path: ':id',
            element: <ListingDetail />,
          },
          {
            path: 'hosted',
            children: [
              {
                index: true,
                element: <ListingHosted />,
              },
              {
                path: ':id/edit',
                element: <ListingEdit />,
              },
              {
                path: ':id/booking',
                element: <ListingBookingDetail />,
              },
            ],
          },

          {
            path: 'create',
            element: <Hosting />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Registration />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
];
const router = createBrowserRouter(routerConfig);

export default router;
