import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import UserImg from "../img/user-img.jpg";
import UserDefaultImg from "../img/user-default-img.png";
import NavBarCss from './css/navbar.module.css';
import { useLoginContext } from '../AppContext.tsx';
import { useNavigate } from 'react-router-dom';
import {LogOut, Home, User, ShoppingCart} from 'lucide-react'


export default function UserIconButton(){
  const {isLogged} = useLoginContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavToHome = () => {
    setAnchorEl(null);
    navigate('/');
  }

  const handleNavToUser = () => {
    setAnchorEl(null);
    navigate('/user');
  }

  const handleNavToCart = () => {
    setAnchorEl(null);
    navigate('/shoppingcart');
  }

  const handleLogOut = () => {
    setAnchorEl(null);

  }


  return (
    <div className={NavBarCss.imgAll}>
      { isLogged ? (
      <div>
        <IconButton onClick={handleClick} className={NavBarCss.userImgBox}>
          <img src={UserImg} className={NavBarCss.userImg} alt="User Icon" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          disableScrollLock={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={handleNavToHome} className={NavBarCss.NormalButton}>
            <Home className={NavBarCss.NormalIcon} />
              <div className={NavBarCss.menuText}>
                登录
              </div>
          </MenuItem>
          <MenuItem onClick={handleNavToUser} className={NavBarCss.NormalButton}>
            <User className={NavBarCss.NormalIcon} />
              <div className={NavBarCss.menuText}>
                用户
              </div>
          </MenuItem>
          <MenuItem onClick={handleNavToCart} className={NavBarCss.NormalButton}>
            <ShoppingCart className={NavBarCss.NormalIcon} />
              <div className={NavBarCss.menuText}>
                购物车
              </div>
          </MenuItem>
          <MenuItem onClick={handleLogOut} className={NavBarCss.signOutButton}>
            <LogOut className={NavBarCss.signOutIcon} />
              <div className={NavBarCss.menuText}>
                退出登录
              </div>
          </MenuItem>
        </Menu>
      </div>
      ) : (
        <img src={UserDefaultImg} className={NavBarCss.userDefaultImg} alt="User Icon" />
      )}
    </div>
  );
};
