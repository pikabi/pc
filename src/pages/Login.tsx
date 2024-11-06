/**
 * @fileoverview Login page
 * @file src/pages/Login.tsx
 */

import React from 'react';
import LoginForm from './login/loginForm.tsx'; 
import LoginFormCss from './login/css/login-form.module.css';

const Login: React.FC = () => {
   return <>
    <div className={LoginFormCss.form}>
      <LoginForm />
    </div>
  </>
};

export default Login;
