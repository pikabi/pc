/**
 * @fileoverview main app component
 * @file App.js
 */

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Register from './pages/Register.tsx';
import NavBar from './navbar/NavBar.tsx';
import Footer from './footer/Footer.tsx';
import '@fontsource/noto-sans-sc';

import AppCss from './App.module.css';

function App() {

  return (
    <div className={AppCss.body}>
      {/* 固定的导航栏 */}
      {/* <div className={AppCss.navbar}> */}
        <NavBar />
      {/* </div> */}
      <div className={AppCss.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <div className={AppCss.footer}>
        <Footer />
      </div>
      
    </div>
  );
}

export default App;
