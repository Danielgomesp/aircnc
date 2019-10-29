import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    const userID = localStorage.getItem('user');
    const data = new FormData();
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, { headers: { userID } });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }}>
        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Select IMG" />
      </label>

      <label htmlFor="company">Company *</label>
      <input
        id="company"
        placeholder="Type your company name here"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <label htmlFor="techs">Technologies <span>Separated by commas</span></label>
      <input
        id="techs"
        placeholder="Which technologies they use?"
        value={techs}
        onChange={(e) => setTechs(e.target.value)}
      />

      <label htmlFor="price">Price <span>If it's free, leave it blank</span></label>
      <input
        id="price"
        placeholder="Daily price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit" className="btn">Register</button>
    </form>
  );
}
