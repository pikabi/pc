import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  setUserEmail: (value:string) => {}
});

// const LoginContext = createContext();

export const LoginContextProvider: React.FC<{ children: ReactNode }> = ({ children })=> {
  const [isLogged, setIsLogged] = useState(false);
  const [id, setId] = useState(0);
  const [loginTime, setLoginTime] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const savedLogData = localStorage.getItem('loginData');
  const currentTime = new Date().toLocaleTimeString();
  if (savedLogData) {
    const jsonParse = JSON.parse(savedLogData);
    if (jsonParse.isLogged) {
      setIsLogged(jsonParse.isLogged);
      setId(jsonParse.id);
      setLoginTime(jsonParse.loginTime);
      setUserName(jsonParse.userName);
      setUserEmail(jsonParse.userEmail);
    }
  }

  return (
    <LoginContext.Provider value={{
      isLogged, setIsLogged, 
      id, setId, 
      loginTime, setLoginTime, 
      userName, setUserName, 
      userEmail, setUserEmail,
    }}>
      {children}
    </LoginContext.Provider>
  )
}

export function useLoginContext() {
  return useContext(LoginContext);
}