/**
 * @fileoverview register form component
 * @file src/pages/Register/RegisterForm.tsx
 */
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import RegisterFormCss from './css/register-form.module.css';
import {useLoginContext} from '../../AppContext.tsx';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const {isLogged, setIsLogged, 
    id, setId, 
    loginTime, setLoginTime, 
    userName, setUserName,
    userEmail, setUserEmail, 
   } = useLoginContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.length < 6 || password.length < 6) {
      setSnackbarMessage('用户名和密码必须至少6个字符长。');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSnackbarMessage('请输入有效的电子邮件地址。');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (password !== passwordConfirm) {
      setSnackbarMessage('两次输入的密码不一致。');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      // const response = await fetch('http://localhost:3001/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // });

      if(1){
      // if (response.ok) {
        // const data = await response.json();
        setSnackbarMessage('注册成功。请登录。');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setIsLogged(false);
        const currentTime = new Date().toLocaleTimeString();
        setLoginTime(currentTime);
        setId(1);
        setUserName('user1');
        setUserEmail('user1@zju.edu.cn');
        // setId(data.id);
        // setUserName(data.name);
        // setUserEmail(data.email);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        // const data = await response.json();
        // setSnackbarMessage(data.message || '注册失败。');
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
    <div>
      <Box component="form" onSubmit={handleSubmit} className={RegisterFormCss.form}>
        <Typography component="h1" variant="h4" align="center" className={RegisterFormCss.title}>
          注册
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="用户名"
          name="name"
          autoComplete="username"
          autoFocus
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="电子邮件"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="passwordConfirm"
          label="确认密码"
          type="password"
          id="passwordConfirm"
          autoComplete="current-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={RegisterFormCss.button}
        >
          注册
        </Button>
        <Typography align="center" className={RegisterFormCss.loginLink}>
          已有账号？<a href="/login">登录</a>
        </Typography>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}