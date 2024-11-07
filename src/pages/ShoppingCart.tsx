/**
 * @fileoverview ShoppingCart page
 * @file src/pages/ShoppingCart.tsx
 */

import React from 'react';
import ShoppingCartCss from './css/shopping-cart.module.css';

const Shoppingcart: React.FC = () => {
  return <h1 className={ShoppingCartCss.shoppingCart}>欢迎来到购物车</h1>;
};

export default Shoppingcart;
