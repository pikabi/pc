import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import UserImg from "../img/user-img.jpg";
import UserDefaultImg from "../img/user-default-img.png";
import NavBarCss from './css/navbar.module.css';
import { useLoginContext } from '../AppContext.tsx';
import { useNavigate } from 'react-router-dom';
import {LogOut, Home, User, Scale, Bell, Heart} from 'lucide-react'


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

  const handleNavToMessage = () => {
    setAnchorEl(null);
    navigate('/message');
  }

  const handleNavToFavourite = () => {
    setAnchorEl(null);
    navigate('/favourite');
  }

  const handleNavToScale = () => {
    setAnchorEl(null);
    navigate('/scale');
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
                主页
              </div>
          </MenuItem>
          <MenuItem onClick={handleNavToUser} className={NavBarCss.NormalButton}>
            <User className={NavBarCss.NormalIcon} />
              <div className={NavBarCss.menuText}>
                用户
              </div>
          </MenuItem>
          <MenuItem onClick={handleNavToMessage} className={NavBarCss.NormalButton}>
            <Bell className={NavBarCss.NormalIcon} />
              <div className={NavBarCss.menuText}>
                消息
              </div>
          </MenuItem>
          <MenuItem onClick={handleNavToFavourite} className={NavBarCss.NormalButton}>
            <Heart className={NavBarCss.NormalIcon} />
              <div className={NavBarCss.menuText}>
                关注
              </div>
          </MenuItem>
          <MenuItem onClick={handleNavToScale} className={NavBarCss.NormalButton}>
            <Scale className={NavBarCss.NormalIcon} />
              <div className={NavBarCss.menuText}>
                商品比较
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
