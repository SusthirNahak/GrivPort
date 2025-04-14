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
                to="/grievanceform"
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
