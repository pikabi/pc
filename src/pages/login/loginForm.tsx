/**
 * @fileoverview login form component
 * @file src/pages/login/loginForm.tsx
 */
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import LoginFormCss from './css/login-form.module.css';


export default function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (usernameOrEmail.length < 6 || password.length < 6) {
      setSnackbarMessage('用户名/邮箱和密码必须至少6个字符长。');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password })
      });

      if (response.ok) {
        setSnackbarMessage('登录成功！');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        // TODO
      } else {
        const data = await response.json();
        setSnackbarMessage(data.message || '登录失败。');
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
        id="usernameOrEmail"
        label="用户名或电子邮件"
        name="usernameOrEmail"
        autoComplete="username email"
        autoFocus
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
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