import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

import AdminLandingPage from "./AdminLandingPage.jsx";
import Home from "./Home.jsx";
import FileViewer from './FileViewer.jsx';
import DashboardCharts from './Chart.jsx';

function AdminApp() {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();
  console.log("Current Path:", location.pathname);

  const isLandingPage = location.pathname === '/admin';

  const toggleSidebar = () => setSidebarHidden(!sidebarHidden);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {!isLandingPage && <Sidebar hidden={sidebarHidden} />}
      <div id="content" className={sidebarHidden ? 'sidebar-hidden' : ''}>
        {!isLandingPage && (
          <Navbar
            toggleSidebar={toggleSidebar}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        )}

        <Routes>
          <Route path="/" element={<AdminLandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="fileviewer" element={<FileViewer />} />
          <Route path="chart" element={<DashboardCharts />} />
          {/* Catch-all fallback (optional) */}
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminApp;
