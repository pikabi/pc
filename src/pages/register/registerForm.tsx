/**
 * @fileoverview register form component
 * @file src/pages/Register/registerForm.tsx
 */
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import RegisterFormCss from '../css/register-form.module.css';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [captcha, setCaptcha] = useState("");
  const [isCaptchaSent, setIsCaptchaSent] = useState(false);
  const [captchaCountdown, setCaptchaCountdown] = useState(0); // 60s
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  React.useEffect(() => {
    const savedCountdown = localStorage.getItem('captchaCountdown');
    const timestamp = localStorage.getItem('captchaTimestamp');
    
    if (savedCountdown && timestamp) {
      const savedCountdownNumber = Number(savedCountdown);
      const timePassed = Math.floor((Date.now() - parseInt(timestamp)) / 1000);
      const newCountdown = Math.max(savedCountdownNumber - timePassed, 0);

      if (newCountdown > 0) {
        setCaptchaCountdown(newCountdown);
        setIsCaptchaSent(true);
      } else {
        localStorage.removeItem('captchaCountdown');
        localStorage.removeItem('captchaTimestamp');
      }
    }
  }, []);

  React.useEffect(() => {
    if (isCaptchaSent && captchaCountdown > 0) {
      const interval = setInterval(() => {
        setCaptchaCountdown((prev) => {
          const newCountdown = prev - 1;
          if (newCountdown <= 0) {
            clearInterval(interval);
            setIsCaptchaSent(false);
            localStorage.removeItem('captchaCountdown');
            localStorage.removeItem('captchaTimestamp');
          } else {
            localStorage.setItem('captchaCountdown', newCountdown.toString());
            localStorage.setItem('captchaTimestamp', Date.now().toString());
          }
          return newCountdown;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCaptchaSent, captchaCountdown]);

  const handleSendCaptcha = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/email", { 
        method: "POST", 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }) }
      );
      if(response.ok) {
        const data = await response.json();
        setIsCaptchaSent(true);
        setSnackbarMessage("验证码已发送到您的邮箱");
        setCaptchaCountdown(60);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage("发送验证码失败");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("发送验证码时出错");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }

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

    // make a POST request to the server
    try {
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, captcha }),
      });

      if (response.ok) {
        const data = await response.json();
        setSnackbarMessage(data.message || '注册成功。请登录。');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        const data = await response.json();
        setSnackbarMessage(data.message || '注册失败。');
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
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="captcha"
            label="验证码"
            type="text"
            id="captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            type="button"
            fullWidth
            variant="outlined"
            disabled={isCaptchaSent}
            className={RegisterFormCss.captchaButton}
            onClick={handleSendCaptcha}
          >
            {isCaptchaSent ? `重发验证(${captchaCountdown}s)` : '发送验证码'}
          </Button>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={RegisterFormCss.submitButton}
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