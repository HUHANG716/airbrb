import { MessageInstance } from 'antd/es/message/interface';
import useMessage from 'antd/es/message/useMessage';

import React, { createContext, useContext } from 'react';

export interface GlobalComponentsContextType {
  notify: MessageInstance;
  err: (err: string) => void;
}
const GlobalComponentsContext = createContext<GlobalComponentsContextType>({
  notify: {} as MessageInstance,
  err: () => {
    // init
  },
});

const useGlobalComponents = () => useContext(GlobalComponentsContext);

const GlobalComponentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notify, contextHolder] = useMessage();
  const ctx: GlobalComponentsContextType = {
    notify,
    err: (err: string) => {
      notify.error(err);
    },
  };
  return (
    <GlobalComponentsContext.Provider value={ctx}>
      {contextHolder}
      {children}
    </GlobalComponentsContext.Provider>
  );
};

export { GlobalComponentsProvider, useGlobalComponents };
