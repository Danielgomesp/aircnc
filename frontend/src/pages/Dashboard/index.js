import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const userId = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { userId },
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map((spot) => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.Thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `$${spot.price}/day` : 'Free'}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button type="button" className="btn"> Add new spot </button>
      </Link>
    </>
  );
}
