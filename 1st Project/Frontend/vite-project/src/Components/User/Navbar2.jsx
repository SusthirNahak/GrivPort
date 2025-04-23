import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Navbar() {

  const [isSticky, setIsSticky] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sticky logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  const handleLogout = () => {
    Cookies.remove('setPhoneNumber');
    navigate('/landingpage');
  };

  return (
    <div className={`w-full z-50 ${isSticky ? "fixed top-0 shadow-md bg-white" : "relative"
      }`}>
      <nav className="bg-white shadow-md h-[12vh] flex items-center px-10">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link className="text-2xl font-semibold" to="/Home">
            Grievance
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4">
            <li className="flex justify-center items-center">
              <Link
                to="/home"
                className="text-gray-800 hover:text-blue-600"
              >
                Home
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <Link
                to="/mygrievance"
                className="text-gray-800 hover:text-blue-600"
              >
                My Grievance
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <Link
                to="/about-us"
                className="text-gray-800 hover:text-blue-600"
              >
                About Us
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <button onClick={handleLogout} className="p-2 w-full hover:cursor-pointer bg-blue-400 text-white hover:bg-blue-600">Log Out</button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </nav>

      {/* Sidebar (Mobile Only) */}
      <div
        className={`fixed inset-y-0 right-0 shadow-md w-64 bg-white transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >

        {/* <div className=" relative flex items-center justify-center py-10">
          <button
            className="absolute top-[8%] left-[85%] text-black cursor-pointer font-medium text-lg hover:scale-120 hover:text-red-500"
            onClick={toggleSidebar}
          >
            X
          </button>

          <div className="flex justify-center items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt=""
              className="h-16 w-16 rounded-full mr-4 object-cover"
            />
            <Link to="#" className="text-blue-600 hover:text-blue-800">
            Hello, {Cookies.get('setPhoneNumber')}
            </Link>
          </div> 
        </div>*/}

        <hr className="mx-7 mt-20" />

        <ul className="flex flex-col pt-5 space-y-3">
          <li className="ms-5">
            <Link
              to="/grievanceform"
              className="text-gray-800 hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li className="ms-5">
            <Link
              to="/mygrievance"
              className="text-gray-800 hover:text-blue-600"
            >
              My Grievance
            </Link>
          </li>
          <li className="mx-auto w-3/4 mt-10">
            <button onClick={handleLogout} className="p-3 w-full hover:cursor-pointer bg-blue-400 text-white hover:bg-blue-600">Log Out</button>
          </li>

        </ul>
      </div>
      <style jsx>{`
        /* Default styles for mobile */
        .navbar {
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 2px solid #ef4444;
          height: 12vh;
          display: flex;
          align-items: center;
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0 1rem;
        }

        .desktop-menu {
          display: none; /* Hidden on mobile */
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 16rem;
          height: 100%;
          background-color: #fff;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        /* Desktop styles */
        @media (min-width: 768px) {
          .navbar-toggle {
            display: none; /* Hide toggle button on desktop */
          }

          .desktop-menu {
            display: flex; /* Show menu on desktop */
          }

          .sidebar {
            display: none; /* Hide sidebar on desktop */
          }
        }
      `}</style>
    </div>
  );
}



import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('en'); // Default language is English

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogOut = () => {
        Cookies.remove('setPhoneNumber');
        navigate('/home');
    };

    const handleLogIn = () => {
        Cookies.set('currentLocation', location.pathname);
        navigate('/landingpage');
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileMenuRef = useRef(null);
    const toggleButtonRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                toggleButtonRef.current &&
                !toggleButtonRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleClickOutsideDropdown = (event) => {
            if (
                isDropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutsideDropdown);
        return () => document.removeEventListener('mousedown', handleClickOutsideDropdown);
    }, [isDropdownOpen]);

    const phoneNumberFromCookie = Cookies.get('setPhoneNumber');
    const isAboutUs = location.pathname === '/about-us';

    // Function to change the language
    const changeLanguage = (language) => {
        setCurrentLanguage(language);
        // Here, you would ideally update your app's language context or state.
        Cookies.set('language', language); // Save the language in cookies (optional)
    };

    return (
        <nav className={`fixed top-0 left-0 w-full h-[12vh] z-50 transition-all duration-300 ease-in-out flex items-center ${isScrolled || isAboutUs ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <span className="text-white font-bold text-xl">G</span>
                    </div>
                    <div>
                        <h1 className="text-blue-900 font-bold text-xl transition-colors duration-300">GrievEase</h1>
                        <p className="text-xs text-blue-700">Government Grievance Portal</p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium relative group">
                        Home
                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${location.pathname === '/home' || location.pathname === '/' ? 'w-full' : ''}`}></span>
                    </Link>
                    <Link to="/about-us" className="text-blue-900 hover:text-blue-700 font-medium relative group">
                        About Us
                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${location.pathname === '/about-us' ? 'w-full' : ''}`}></span>
                    </Link>

                    {/* Dropdown for language change */}
                    <div className=" group" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className="text-blue-900 hover:text-blue-700 font-medium relative group"
                        >
                           <i class='bx bx-globe bx-sm'></i>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <div className={`absolute top-full mt-2 right-0 w-48 bg-white rounded shadow-md transition-all duration-300 z-40 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                            <button
                                onClick={() => changeLanguage('en')}
                                className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                            >
                                English
                            </button>
                            <button
                                onClick={() => changeLanguage('es')}
                                className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                            >
                                Español
                            </button>
                            {/* Add more languages here */}
                        </div>
                    </div>

                    <select name="" id=""><i class='bx bx-globe bx-sm'></i>
                        <option value="en">en</option>
                        <option value="or">or</option>

                    </select>

                    {phoneNumberFromCookie && (
                        <Link to="/mygrievance" className="text-blue-900 hover:text-blue-700 pb-0.5 font-medium relative group">
                            My Grievance
                            <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${location.pathname === '/mygrievance' ? 'w-full' : ''}`}></span>
                        </Link>
                    )}

                    <button onClick={!phoneNumberFromCookie ? handleLogIn : handleLogOut} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-5 py-2 rounded-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                        {!phoneNumberFromCookie ? 'Log In' : 'Log Out'}
                    </button>
                </div>

                {/* Mobile Navigation Toggle */}
                <div className='flex justify-between md:hidden'>
                    {/* Dropdown for language change */}
                    <div className="relative group mr-2" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className="text-blue-900 hover:text-blue-700 font-medium relative group"
                        >
                            <i class='bx bx-globe bx-md'></i>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <div className={`absolute top-full mt-2 right-0 w-48 bg-white rounded shadow-md transition-all duration-300 z-40 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                            <button
                                onClick={() => changeLanguage('en')}
                                className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                            >
                                English
                            </button>
                            <button
                                onClick={() => changeLanguage('es')}
                                className="block px-4 py-2 text-blue-900 hover:bg-blue-50"
                            >
                                Español
                            </button>
                            {/* Add more languages here */}
                        </div>
                    </div>

                    <button
                        className=" text-blue-900"
                        ref={toggleButtonRef}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className={`md:hidden bg-white absolute w-full top-[10vh] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
            >
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                    <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/about-us" className="text-blue-900 hover:text-blue-700 font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>

                    {/* Dropdown section in mobile for language */}
                    {/* <div className="flex flex-col space-y-2">
                        <span className="text-blue-900 font-semibold">Language</span>
                        <button onClick={() => changeLanguage('en')} className="text-blue-800 hover:text-blue-600 ml-4">English</button>
                        <button onClick={() => changeLanguage('es')} className="text-blue-800 hover:text-blue-600 ml-4">Español</button>
                    </div> */}

                    {phoneNumberFromCookie && (
                        <Link to="/mygrievance" className="text-blue-900 hover:text-blue-700 font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>My Grievance</Link>
                    )}

                    <button onClick={!phoneNumberFromCookie ? handleLogIn : handleLogOut} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-5 py-2 rounded-full hover:shadow-lg transition-all duration-300">
                        {!phoneNumberFromCookie ? 'Log In' : 'Log Out'}
                    </button>
                </div>
            </div>
        </nav>
    );
};



