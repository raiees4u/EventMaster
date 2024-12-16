import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../NavBar.css';
import logo from '../assets/images/EventMaster Logo.jpg'; // Adjust based on the actual path
const NavBar = ({ onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage to determine if user is authenticated
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="EventMaster Logo" className="navbar-logo-img" />
        </a>
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          {isAuthenticated ? (
            <>
              <li><NavLink to="/users">Users</NavLink></li>
              <li><NavLink to="/profile">My Profile</NavLink></li>
              <li><button onClick={onSignOut}>Sign Out</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/signup">Sign Up</NavLink></li>
              <li><NavLink to="/signin">Sign In</NavLink></li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default NavBar;
