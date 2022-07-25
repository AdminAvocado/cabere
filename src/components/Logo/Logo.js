import React from 'react';
import logo from './grupocabere.svg';
import logoSantander from './santander.svg';

import './Logo.scss';

const Logo = () => (
  <div className="Logo">
    <a href="/">
      <img src={logo} alt="logo cabere" />
      <div className="Logo__divider" />
      <img src={logoSantander} alt="logo_santander" />
    </a>
  </div>
);

export default Logo;
