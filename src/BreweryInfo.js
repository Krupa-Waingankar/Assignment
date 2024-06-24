import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function BreweryInfo() {
  const [breweries, setBreweries] = useState([]);
  const query = useQuery();
  const name = query.get('name');
  const type = query.get('type');
  

  useEffect(() => {
    async function fetchBreweriesData() {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${name}&by_type=${type}`);
        //const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${name}`);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const breweries = await response.json();
        setBreweries(breweries);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }

    fetchBreweriesData();
  }, [name]);

  return (
    <div className="BreweryInfo">
      <h1>Search Results for: {name}</h1>
      {breweries.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Type</th>
              <th>Phone</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {breweries.map(brewery => (
              <tr key={brewery.id}>
                <td>
                  <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
                </td>
                <td>{brewery.city}</td>
                <td>{brewery.brewery_type}</td>
                <td>{brewery.phone}</td>
                <td>{brewery.website_url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No breweries found.</p>
      )}
    </div>
  );
}

export default BreweryInfo;
