// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* Root path */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
      />

      {/* Dashboard path */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* Fallback for any unknown route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
