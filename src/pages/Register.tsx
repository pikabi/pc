// src/pages/Register.tsx
import React from 'react';
import RegisterForm from './register/RegisterForm.tsx'; 
import RegisterFormCss from './register/css/register-form.module.css';

const Register: React.FC = () => {
   return <>
    <div className={RegisterFormCss.form}>
      <RegisterForm />
    </div>
  </>
};

export default Register;
