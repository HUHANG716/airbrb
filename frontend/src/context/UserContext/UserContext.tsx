/** @format */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserInfo } from '../../types/user';
import { lsGet, lsRm, lsSave } from '../../utils/utils';
import { STORAGE_KEY_USER } from '../../constant/constant';

interface UserContextType {
  userInfo: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  userInfo: null,
  login: () => {
    // not initialized
  },
  logout: () => {
    // not initialized
  },
});

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    const user = lsGet(STORAGE_KEY_USER);
    user && setUserInfo(user);
  }, []);

  const login = (user: UserInfo) => {
    setUserInfo(user);
    lsSave(STORAGE_KEY_USER, user);
  };
  const logout = () => {
    setUserInfo(null);
    lsRm(STORAGE_KEY_USER);
  };

  const ctx = {
    userInfo,
    login,
    logout,
  };

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
};
export { UserProvider, useUser };
