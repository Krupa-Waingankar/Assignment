import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const [name, setName] = useState('');
  const [type, setType] = useState('micro');
  const navigate = useNavigate();
 
  const handleSubmit = () => {
     navigate(`/brewery-info?name=${name}&type=${type}`);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className='search-box'>
        <form className="Home" onSubmit={handleSubmit}>
        
      <h1>Search Brewery Information</h1>
      <label htmlFor="type">Enter city:</label>
      <input
      required
        type="text"
        placeholder="Enter brewery city"
        value={name}
        onChange={(e) => setName(e.target.value)}
        
      />
      <label htmlFor="type">Select Type:</label>
      <select id="type" value={type} onChange={handleTypeChange} required>
        <option value="">Select a type</option>
        <option value="micro">Micro</option>
        <option value="nano">Nano</option>
        <option value="regional">Regional</option>
        <option value="brewpub">Brewpub</option>
        <option value="large">Large</option>
        <option value="planning">Planning</option>
        <option value="bar">Bar</option>
        <option value="contract">Contract</option>
        <option value="proprietor">Proprietor</option>
        <option value="closed">Closed</option>
        {/* Add more types as needed */}
      </select>  <br></br>
      <input className='search-button' type='submit'/>    
    {/* <button className='search-button' onClick={handleSubmit}>Search</button> */}
        </form>
        <div>
        {/* <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Sign Up</button> */}
      </div>
    </div>
  );
}

export default Home;
