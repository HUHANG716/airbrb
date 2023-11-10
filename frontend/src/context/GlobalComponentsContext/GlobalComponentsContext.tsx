import { MessageInstance } from 'antd/es/message/interface';
import useMessage from 'antd/es/message/useMessage';

import React, { createContext, useContext } from 'react';

export interface GlobalComponentsContextType {
  notify: MessageInstance;
}
const GlobalComponentsContext = createContext<GlobalComponentsContextType>({
  notify: {} as MessageInstance,
});

const useGlobalComponents = () => useContext(GlobalComponentsContext);

const GlobalComponentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notify, contextHolder] = useMessage();
  const ctx: GlobalComponentsContextType = {
    notify,
  };
  return (
    <GlobalComponentsContext.Provider value={ctx}>
      {contextHolder}
      {children}
    </GlobalComponentsContext.Provider>
  );
};

export { GlobalComponentsProvider, useGlobalComponents };
