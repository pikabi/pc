/**
 * @fileoverview navigation bar component
 * @file src/navbar/NavBar.tsx
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBarCss from './css/navbar.module.css';
import LogButton from './LogButton.tsx';
import EruteShoppingIcon from '../img/erute-shopping-icon.png';
import SearchIcon from '../img/search.svg';

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
      </div>
      <div className={NavBarCss.middleSection}>
        <form onSubmit={handleSearch} className={NavBarCss.search}>
          <input
            type="text"
            placeholder="此处搜索商品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={NavBarCss.searchBar}
          />
          <button type="submit" className={NavBarCss.searchButton}>
            <img className={NavBarCss.searchIcon} src={SearchIcon} alt="Search Icon"/>
            <div className={NavBarCss.searchIconToolTip}>Search</div>
          </button>
        </form>
      </div>
      <div className={NavBarCss.rightSection}>
        <LogButton />
      </div>

      {/* <LogData /> */}


    </div>
  );
};

export default NavBar;