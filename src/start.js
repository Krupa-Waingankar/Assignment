import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Start() {
    const navigate = useNavigate();
  return (        
        <div>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Sign Up</button>
      </div>
  );
}

export default Start;
