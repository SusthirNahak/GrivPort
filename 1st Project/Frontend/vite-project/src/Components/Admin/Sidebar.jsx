import React, { useState } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ hidden }) => {
  const navigate = useNavigate();
  const location = useLocation();


  const menuItems = [
    { name: 'Dashboard', icon: 'bxs-dashboard', link: "/admin/home" },
    { name: 'Analytics', icon: 'bxs-pie-chart-alt-2', link: "/admin/chart" },
    { name: 'Update', icon: 'bxs-message-dots', link: "/admin/update-location" },
    { name: 'Team', icon: 'bxs-group' },
  ];

  const bottomItems = [
    { name: 'Settings', icon: 'bxs-cog' },
    { name: 'Logout', icon: 'bx-power-off', className: 'logout', link: "/" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('name');
    navigate('/admin');
  }

  return (
    <section id="sidebar" className={!hidden ? 'hide' : ''}>
      <Link to="#" className="brand">
        <i className="bx bxs-smile bx-lg"></i>
        <span className="text">AdminHub</span>
      </Link>
      <ul className="side-menu top">
        {menuItems.map((item) => (
          <li key={item.name}  className={location.pathname === item.link ? 'active' : ''}>
            <Link to={item.link}>
              <i className={`bx ${item.icon} bx-sm`}></i>
              <span className="text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu bottom">
        {bottomItems.map((item) => (
          <li key={item.name}>
            <a href="#" className={item.className || ''} onClick={item.name === 'Logout' ? handleLogout : () => handleItemClick(item.name)}>
              <i className={`bx ${item.icon} bx-sm ${item.name === 'Settings' ? 'bx-spin-hover' : 'bx-burst-hover'}`}></i>
              <span className="text">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>

    </section>
  );
};

export default Sidebar;