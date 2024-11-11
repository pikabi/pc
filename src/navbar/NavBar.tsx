/**
 * @fileoverview navigation bar component
 * @file src/navbar/NavBar.tsx
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import NavBarCss from './css/navbar.module.css';
import LogButton from './LogButton.tsx';
import EruteShoppingIcon from '../img/erute-shopping-icon.png';
import SearchIcon from '../img/search.svg';

const NavBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // 这里可以处理搜索逻辑
      // alert(`搜索内容: ${searchQuery}`);
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };
  return (
    <div className={NavBarCss.navbar}>
      <div className={`${(currentPath !== '/' && currentPath !== '/search')? NavBarCss.leftSection: NavBarCss.leftSectionNoSearch}`}>
        <Link to="/" className={NavBarCss.eruteShopping}>
          <img src={EruteShoppingIcon} className={NavBarCss.eruteShoppingIcon} alt="Erute Shopping Icon" />
          <div className={`${(currentPath !== '/' && currentPath !== '/search')? NavBarCss.eruteShoppingFont: NavBarCss.eruteShoppingFontNoSearch}`}>
            Erute Shopping
          </div>
        </Link>
      </div>
      {
      currentPath !== '/' && currentPath !== '/search' && 
      <div className={NavBarCss.middleSection}>
        <form onSubmit={handleSearch} className={NavBarCss.search}>
          <input
            type="text"
            placeholder="搜索心仪的宝贝~"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={NavBarCss.searchBar}
          />
          <button type="submit" className={NavBarCss.searchButton}>
            <img className={NavBarCss.searchIcon} src={SearchIcon} alt="Search Icon"/>
            <div className={NavBarCss.searchIconToolTip}>搜索</div>
          </button>
        </form>
      </div>
      }
      <div className={NavBarCss.rightSection}>
        <LogButton />
      </div>

    </div>
  );
};

export default NavBar;