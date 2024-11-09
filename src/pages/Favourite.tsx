/**
 * @fileoverview Favourite page
 * @file src/pages/Home.tsx
 */

import React from 'react';
import FavouriteCss from './css/favourite.module.css';

const Favourite: React.FC = () => {
  return <h1 className={FavouriteCss.favourite}>欢迎来到首页</h1>;
};

export default Favourite;
