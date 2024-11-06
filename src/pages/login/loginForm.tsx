/**
 * @fileoverview login form component
 * @file src/pages/login/loginForm.tsx
 */
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import LoginFormCss from './css/login-form.module.css';
import {useLoginContext} from '../../AppContext.tsx';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [nameOrEmail, setNameOrEmail] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const {isLogged, setIsLogged, 
    id, setId, 
    loginTime, setLoginTime, 
    userName, setUserName,
    userEmail, setUserEmail, 
   } = useLoginContext();

  function loginDidUpdate() {
    const state = {
      isLogged,
      id,
      loginTime,
      userName,
      userEmail,
    }
    localStorage.setItem('loginData', JSON.stringify(state));
  }    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // if (nameOrEmail.length < 6 || password.length < 6) {
    //   setSnackbarMessage('用户名/邮箱和密码必须至少6个字符长。');
    //   setSnackbarSeverity('error');
    //   setOpenSnackbar(true);
    //   return;
    // }

    // // 判断 nameOrEmail 是用户名还是邮箱
    // // 如果是用户名，设置 name
    // // 如果是邮箱，设置 email
    // if (nameOrEmail.includes('@')) {
    //   setEmail(nameOrEmail);
    // } else {
    //   setName(nameOrEmail);
    // }

    try {
      // const response = await fetch('http://localhost:3001/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // });

      if(1){
      // if (response.ok) {
      //   const data = await response.json();
        setSnackbarMessage('登录成功！');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setIsLogged(true);
        const currentTime = new Date().toLocaleTimeString();
        setLoginTime(currentTime);
        setId(1);
        setUserName('user1');
        setUserEmail('user1@zju.edu.cn');
        loginDidUpdate();
        // setId(data.id);
        // setUserName(data.name);
        // setUserEmail(data.email);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        // const data = await response.json();
        // setSnackbarMessage(data.message || '登录失败。');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('发生意外错误。请重试。');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={LoginFormCss.form}>
      <Typography component="h1" variant="h4" align="center" className={LoginFormCss.title}>
        登录
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="nameOrEmail"
        label="用户名或电子邮件"
        name="nameOrEmail"
        autoComplete="username email"
        autoFocus
        value={nameOrEmail}
        onChange={(e) => setNameOrEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="密码"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={LoginFormCss.button} 
      >
        登录
      </Button>
      <Typography align="center" className={LoginFormCss.registerLink}>
        还没有账号？<a href="/register">注册</a>
      </Typography>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}