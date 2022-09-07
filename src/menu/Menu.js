import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './menu.css';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/#story">
        Story
      </a>
      <a className="menu-item" target="_blank" href="https://vagranttea.gitbook.io/ChibiPunks/">
        Documentation
      </a>
      <a className="menu-item" target="_blank" href="#">
        Instagram
      </a>
    </Menu>
  );
};