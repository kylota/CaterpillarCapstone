import React from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css';

const Layout = ({ children }) => {
  return (
    <div>
      {/* You can add any common layout components here */}
      <header className="primary">
        <h1><Link to="/">Caterpillar Capstone - CELDV</Link></h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;