/**
 * @fileoverview Message page
 * @file src/pages/Home.tsx
 */

import React from 'react';
import MessageCss from './css/message.module.css';

const Message: React.FC = () => {
  return <h1 className={MessageCss.home}>欢迎来到首页</h1>;
};

export default Message;
