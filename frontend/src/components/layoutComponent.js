import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles.js';

const Layout = ({ children }) => {
  return (
    <div>
      {/* You can add any common layout components here */}
      <header className="primary">
      <h1><Link to="/">Caterpillar Capstone</Link></h1>
      <h1><Link to="/">CELDV</Link></h1>
      </header>
      <main>{children}</main>
      <footer>Footer content here</footer>
    </div>
  );
};

export default Layout;