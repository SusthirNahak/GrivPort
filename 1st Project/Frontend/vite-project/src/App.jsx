import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import UserApp from "./Components/User/UserApp.jsx";
import AdminApp from "./Components/Admin/AdminApp.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<UserApp />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
