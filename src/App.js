import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import BreweryInfo from './BreweryInfo';
import BreweryDetail from './BreweryDetail';
import Login from './Login';
import Register from './Register';
import Start from './start';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/brewery-info" element={<BreweryInfo />} />
        <Route path="/brewery/:id" element={<BreweryDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
