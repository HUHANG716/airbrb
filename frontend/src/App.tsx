/** @format */

import React from 'react';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import GlobalStyle from './styles/GlobalStyle';
import { UserProvider } from './context/UserContext/UserContext';
import { GlobalComponentsProvider } from './context/GlobalComponentsContext/GlobalComponentsContext';

const { darkAlgorithm } = theme;

const App = () => {
  return (
    <GlobalComponentsProvider>
      <ConfigProvider
        theme={{
          components: {
            Typography: {
              titleMarginBottom: 0,
            },
          },
          token: {
            colorPrimary: '#13c2c2',
            colorInfo: '#13c2c2',
            borderRadius: 8,
            wireframe: false,
          },
          algorithm: darkAlgorithm,
        }}>
        <GlobalStyle />
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ConfigProvider>
    </GlobalComponentsProvider>
  );
};

export default App;
