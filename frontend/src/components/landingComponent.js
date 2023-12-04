import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles.js';

function Landing() {
  return (
    <div style={styles.centerStyle}>
      <h1 style={styles.h1Style}>Welcome to our Company and Employment Lineage Data and Visualization App</h1>
      <img
        src="../Employees_icon-01.png" // Replace with the actual path to your image
        alt="Company Logo" // Provide a descriptive alt text for accessibility
        style={styles.imageStyle}
      />
      <div>
        {/* Link to the Login component */}
        <Link to="/login" style={styles.linkStyle}>Log in</Link>
        <Link to="/signup" style={styles.linkStyle}>Register</Link>
      </div>
    </div>
  );
}

export default Landing;