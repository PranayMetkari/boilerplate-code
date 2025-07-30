import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the App 🚀</h1>
      <Link to="/login">
        <button style={{ margin: '10px' }}>Login</button>
      </Link>
      <Link to="/register">
        <button style={{ margin: '10px' }}>Register</button>
      </Link>
    </div>
  );
};

export default LandingPage;
