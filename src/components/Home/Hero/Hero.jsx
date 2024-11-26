import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Hero.css";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/result?query=${searchTerm}`);
  };

  return (
    <section className="hero">
      <div className="container">
        <form onSubmit={handleSearch} className="hero-form flex" style={{ width: '500px' }}>
          <div className="box">
            <input
              type="text"
              placeholder='ค้นหา'
              className='hero-input'
              style={{ color: 'white', backgroundColor: 'grey' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className='btn' size='md' type="submit">ค้นหา</button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
