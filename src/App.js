import React from 'react';
import Home from './pages/Home/Home';
import Country from './pages/Country/Country';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:name" element={<Country />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
