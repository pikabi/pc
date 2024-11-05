/**
 * @fileoverview navigation bar component
 * @file src/navbar/NavBar.tsx
 */

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NavBarCss from './css/navbar.module.css';
import LogData from '../data/LogData.tsx';
import EruteShoppingIcon from '../img/erute-shopping-icon.png';

const NavBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // 这里可以处理搜索逻辑
      alert(`搜索内容: ${searchQuery}`);
  };
  return (
    <div className={NavBarCss.navbar}>
      <div className={NavBarCss.leftSection}>
        <Link to="/" className={NavBarCss.eruteShopping}>
          <img src={EruteShoppingIcon} className={NavBarCss.eruteShoppingIcon} alt="Erute Shopping Icon" />
          <div className={NavBarCss.eruteShoppingFont}>
            Erute Shopping
          </div>
        </Link>
        <Link to="/about" className={NavBarCss.aboutUs}>
          关于
        </Link>
      </div>
      <div className={NavBarCss.middleSection}>
        <form onSubmit={handleSearch} className={NavBarCss.search}>
          <input
            type="text"
            placeholder="搜索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={NavBarCss.searchBar}
          />
          <button type="submit">搜索</button>
        </form>
      </div>
      <div className={NavBarCss.rightSection}>
        <Link to="/register">注册</Link>
      </div>

      {/* <LogData /> */}


    </div>
  );
};

export default NavBar;