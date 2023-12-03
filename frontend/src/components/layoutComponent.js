import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      {/* You can add any common layout components here */}
      <header>
        <h1>My App</h1>
      </header>
      <main>{children}</main>
      <footer>Footer content here</footer>
    </div>
  );
};

export default Layout;