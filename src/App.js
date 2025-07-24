import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import AuthPage from './AuthPage';

 const App = () => {
  const isLoggedIn = localStorage.getItem("user");

  return (
   
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <AuthPage />} />
        <Route path="/Home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    
  );
};

export default App;
