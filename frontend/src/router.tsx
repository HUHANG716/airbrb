/** @format */

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Hosted from './pages/Hosted/Hosted';
import Hosting from './pages/Hosting/Hosting';
import ListingEdit from './pages/ListingEdit/ListingEdit';
import ListingHosted from './pages/ListingHosted/ListingHosted';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Registration />,
      },
      {
        path: '/hosted',
        element: <Hosted />,
        children: [
          {
            path: 'edit/:id',
            element: <ListingEdit />,
          },
          {
            path: '',
            element: <ListingHosted />,
          },
        ],
      },

      {
        path: '/hosting',
        element: <Hosting />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
]);

export default router;
