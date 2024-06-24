  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import './App.css';
  
  function BreweryDetail() {
    const { id } = useParams();
    const [brewery, setBrewery] = useState(null);
    const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [message, setMessage] = useState('');

  
    useEffect(() => {
      async function fetchBreweryDetail() {
        try {
          const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_ids=${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const breweries = await response.json();
          setBrewery(breweries[0]);
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      }
  
      fetchBreweryDetail();
      async function fetchReviews() {
        try {
          const response = await fetch(`http://127.0.0.1:5000/api/reviews/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const reviews = await response.json();
          setReviews(reviews);
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      }
  
      fetchBreweryDetail();
      fetchReviews();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        console.log('here')
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // Assuming you are using token-based auth
          },
          body: JSON.stringify({ brewery_id: id, content: newReview }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          setNewReview('');
          setReviews([...reviews, { id: reviews.length + 1, content: newReview }]);
        } else {
          setMessage(data.message);
        }
      };
  
    return (
      <div className="BreweryDetail">
        {brewery ? (
          <div className='home-temp'>
            <h1>{brewery.name}</h1>
            <p><strong>Location:</strong> {brewery.city}</p>
            <p><strong>Type:</strong> {brewery.brewery_type}</p>
            <p><strong>Country:</strong> {brewery.country}</p>
            <p><strong>Phone:</strong> {brewery.phone}</p>
            <p><strong>Website:</strong> {brewery.website_url}</p>
            <div>
            <h2>Reviews</h2>
            {reviews.map(review => (
              <p key={review.id}>{review.content}</p>
            ))}
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write a review"
              />
              <button type="submit">Submit Review</button>
            </form>
            {message && <p>{message}</p>}
          </div>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
  
  export default BreweryDetail;
  
