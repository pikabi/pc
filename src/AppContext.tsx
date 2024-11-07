import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

const LoginContext = createContext({
  isLogged: false,
  setIsLogged: (value: boolean) => {},
  id: 0,
  setId: (value:number) => {},
  loginTime: '',
  setLoginTime: (value:string) => {},
  userName: '',
  setUserName: (value:string) => {},
  userEmail: '',
  setUserEmail: (value:string) => {},
  userPhone: '',
  setUserPhone: (value:string) => {},
  userCountry: '',
  setUserCountry: (value:string) => {},
  userAddress: '',
  setUserAddress: (value:string) => {},
});

function getInitialLoginState() {
  const savedLogData = localStorage.getItem('loginData');
  if (savedLogData) {
    return JSON.parse(savedLogData);
  } else {
    return {
      isLogged: false,
      id: 0,
      loginTime: '',
      userName: '',
      userEmail: '',
      userPhone: '',
      userCountry: '',
      userAddress: '',
    };
  }
}

export const LoginContextProvider: React.FC<{ children: ReactNode }> = ({ children })=> {
  const [isLogged, setIsLogged] = useState(() => getInitialLoginState().isLogged);
  const [id, setId] = useState(() => getInitialLoginState().id);
  const [loginTime, setLoginTime] = useState(() => getInitialLoginState().loginTime);
  const [userName, setUserName] = useState(() => getInitialLoginState().userName);
  const [userEmail, setUserEmail] = useState(() => getInitialLoginState().userEmail);
  const [userPhone, setUserPhone] = useState(() => getInitialLoginState().userPhone);
  const [userCountry, setUserCountry] = useState(() => getInitialLoginState().userCountry);
  const [userAddress, setUserAddress] = useState(() => getInitialLoginState().userAddress);

  const state = {
    isLogged,
    id,
    loginTime,
    userName,
    userEmail,
    userPhone,
    userCountry,
    userAddress
  };

  useEffect(() => {
    localStorage.setItem('loginData', JSON.stringify(state));
  }, [state]);

  return (
    <LoginContext.Provider value={{
      isLogged, setIsLogged, 
      id, setId, 
      loginTime, setLoginTime, 
      userName, setUserName, 
      userEmail, setUserEmail,
      userPhone, setUserPhone,
      userCountry, setUserCountry,
      userAddress, setUserAddress,
    }}>
      {children}
    </LoginContext.Provider>
  )
}

export function useLoginContext() {
  return useContext(LoginContext);
}