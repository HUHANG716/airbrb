import React from 'react';

import { Outlet } from 'react-router-dom';
import { HostedProvider } from './context/HostedContext';

const Hosted = () => {
  return (
    <HostedProvider>
      <Outlet />
    </HostedProvider>
  );
};

export default Hosted;
