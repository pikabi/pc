// src/pages/Register.tsx
import React from 'react';
import RegisterForm from './Register/RegisterForm.tsx'; 
import registerFormCss from './Register/css/registerForm.module.css';

const Register: React.FC = () => {
   return <>
    <div className={registerFormCss.form}>
      <RegisterForm />
    </div>
  </>
};

export default Register;
