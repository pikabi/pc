/**
 * @fileoverview Register page
 * @file src/pages/Register.tsx
 */

import React from 'react';
import RegisterForm from './register/registerForm.tsx'; 
import RegisterFormCss from './css/register-form.module.css';

const Register: React.FC = () => {
   return <>
    <div className={RegisterFormCss.form}>
      <RegisterForm />
    </div>
  </>
};

export default Register;
