import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logout from './Logout';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { path: '/goals', label: 'Home', icon: '🏠' },
    { path: '/workout', label: 'Workout', icon: '🏋️' },
    { path: '/tracking', label: 'BMI', icon: '🎯' },
    { path: '/bio-optimizer', label: 'Bio', icon: '🧬' },
    { path: '/onboarding', label: 'Plan', icon: '✨' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <nav className="navbar-desktop glass-panel">
        <div className="nav-logo" onClick={() => navigate('/goals')}>
          <span className="logo-spark">⚡</span>
          <span className="logo-text">FITNESS PRO</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-actions">
          <Logout />
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="navbar-mobile glass-panel">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}
          >
            <span className="mobile-icon">{item.icon}</span>
            <span className="mobile-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
