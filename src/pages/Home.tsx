/**
 * @fileoverview Home page
 * @file src/pages/Home.tsx
 */

import React from 'react';
import HomeCss from './home/css/home.module.css';

const Home: React.FC = () => {
  return <h1 className={HomeCss.home}>欢迎来到首页</h1>;
};

export default Home;
