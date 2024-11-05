/**
 * @fileoverview Footer component
 * @file src/footer/Footer.tsx
 */
import React from 'react';
import FooterCSS from './css/footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={FooterCSS.footer}>
        <p>© 2021 Erute Shopping</p>
      </div>
    </footer>
  );
};

export default Footer;