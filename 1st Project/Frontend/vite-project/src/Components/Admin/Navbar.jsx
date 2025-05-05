import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearch = (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setSearchVisible(!searchVisible);
    }
  };

  const notifications = [
    'New message from John',
    'Your order has been shipped',
    'New comment on your post',
    'Update available for your app',
    'Reminder: Meeting at 3PM',
  ];

  const profileOptions = [
    { name: 'My Profile', link: '/profile' },

  ];


  return (
    <nav>
      <i className="bx bx-menu bx-sm" onClick={toggleSidebar}></i>
      <a href="#" className="nav-link">Categories</a>
      <form action="#" className={searchVisible ? 'show' : ''}>
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn" onClick={toggleSearch}>
            <i className={`bx ${searchVisible ? 'bx-x' : 'bx-search'}`}></i>
          </button>
        </div>
      </form>
      <input type="checkbox" className="checkbox" id="switch-mode" hidden checked={darkMode} onChange={toggleDarkMode} />
      <label className="swith-lm" htmlFor="switch-mode">
        <i className="bx bxs-moon"></i>
        <i className="bx bx-sun"></i>
        <div className="ball"></div>
      </label>
      <a href="#" className="notification" ref={profileRef} onClick={() => { setNotificationOpen(!notificationOpen); if (!notificationOpen) setProfileOpen(false) }}>
        <i className="bx bxs-bell bx-tada-hover"></i>
        <span className="num">8</span>
      </a>
      <div ref={notificationRef} className={`notification-menu ${notificationOpen ? 'show' : ''}`}>
        <ul >
          {notifications.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <a href="#" className="profile" onClick={() => { setProfileOpen(!profileOpen); if (!profileOpen) setNotificationOpen(false) }}>
        <img src="https://placehold.co/600x400/png" alt="Profile" />
      </a>
      <div className={`profile-menu ${profileOpen ? 'show' : ''}`}>
        <ul>
          {profileOptions.map((option, index) => (
            <li key={index}>
              {option.name === 'Log Out' ? (
                <button onClick={handleLogout} className='cursor-pointer'>{option.name}</button>
              ) : (
                <Link to={option.link}>{option.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;


