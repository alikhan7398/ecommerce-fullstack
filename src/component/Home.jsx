import React, { useEffect, useState } from 'react';
import Banner from '../assets/Banner.jpg';
import Products from './Products';

export default function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  console.log('Home rendering');
  return (
    <div className="hero">
      <div className="card text-bg-dark text-white border-0">
        <img
          src={Banner}
          className="card-img"
          alt="Background"
          height="550px"
        />
        <div className="card-img-overlay d-flex flex-column justify-content-center">
          <div className="container">
            <h5 className="card-title display-2 fw-bolder mb-0">
              NEW SEASON ARRIVALS!
            </h5>
            <p className="card-text fs-2">CHECK OUT ALL THE TRENDS</p>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
}