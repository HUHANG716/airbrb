import React from 'react';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { UserProvider } from './context/UserContext/UserContext';
import { GlobalComponentsProvider } from './context/GlobalComponentsContext/GlobalComponentsContext';
import theme from './styles/AntdTheme';
import { BookingProvider } from './context/BookingContext/BookingContext';
import { HostedProvider } from './context/HostedContext/HostedContext';

const App = () => {
  return (
    <GlobalComponentsProvider>
      <ConfigProvider theme={theme}>
        <UserProvider>
          <BookingProvider>
            <HostedProvider>
              <RouterProvider router={router} />
            </HostedProvider>
          </BookingProvider>
        </UserProvider>
      </ConfigProvider>
    </GlobalComponentsProvider>
  );
};

export default App;
