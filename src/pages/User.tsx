/**
 * @fileoverview User page
 * @file src/pages/User.tsx
 */

import React from 'react';
import UserCss from './css/user.module.css';
import { Link } from 'react-router-dom';
import UserMain from './user/userMain.tsx';
import UserSidebar from './user/userSidebar.tsx';

const User: React.FC = () => {
  return <div>
    <UserSidebar />
    <UserMain />
  </div>
};

export default User;
