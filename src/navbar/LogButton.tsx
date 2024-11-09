/**
 * @fileoverview file for information about log data
 * @file src/data/LogButton.tsx
 */

import React, { useContext } from 'react';
import NavBarCss from './css/navbar.module.css';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../AppContext.tsx';
import { Scale, User, Bell, Heart} from 'lucide-react';
import UserIconButton from './UserIconButton.tsx';


export default function LogButton(){
  const {isLogged} = useLoginContext();
  return <div className={NavBarCss.rightSectionItems}>
    <div>
      {isLogged ? (
        <div className={NavBarCss.logged}>
          <Link to='/message'>
            <button className={NavBarCss.messageIconButton}>
              <Bell className={NavBarCss.messageIcon} />
              <div className={NavBarCss.messageIconToolTip}>消息</div>
            </button>
          </Link>
          <Link to='/favourite'>
            <button className={NavBarCss.favouriteIconButton}>
              <Heart className={NavBarCss.favouriteIcon} />
              <div className={NavBarCss.favouriteIconToolTip}>我的关注</div>
            </button>
          </Link>
          <Link to='/scale'>
            <button className={NavBarCss.scaleIconButton}>
              <Scale className={NavBarCss.scaleIcon} />
              <div className={NavBarCss.scaleIconToolTip}>商品比较</div>
            </button>
          </Link>
          <Link to="/user">
            <button className={NavBarCss.userIconButton}>
              <User className={NavBarCss.userIcon} />
              <div className={NavBarCss.userIconToolTip}>用户</div>
            </button>
          </Link>
        </div>
      ) : (
        <div className={NavBarCss.notLogged}>
          <div className={NavBarCss.login}>
          <Link to="/login" className={NavBarCss.text}> 登录 </Link>
          </div>
          <div className={NavBarCss.register}>
            <Link to="/register" className={NavBarCss.text}> 注册 </Link>
          </div>
        </div>
      )}
    </div>
    <div>
      <UserIconButton />
    </div>
  </div>;
};