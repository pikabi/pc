import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

/**
 * @LoginContext
 */

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




/**
 * @NotificationContext
 */

const NotificationContext = createContext({

});

function getInitialNotificationState() {
  const savedNotaData = localStorage.getItem('notificationData');
  if (savedNotaData) {
    return JSON.parse(savedNotaData);
  } else {
    return {
      
    };
  }
}

export const NotificationContextProvider: React.FC<{ children: ReactNode }> = ({ children })=> {
  

  const state = {
    
  };

  useEffect(() => {
    localStorage.setItem('notificationData', JSON.stringify(state));
  }, [state]);

  return (
    <NotificationContext.Provider value={{
      
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  return useContext(NotificationContext);
}