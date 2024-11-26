import React, { useEffect, useState } from 'react';
import './EstateCard.css'; 

function EstateCard() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const propertiesPerPage = 4;

  useEffect(() => {
    fetch('http://localhost/backend/get-image.php')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProperties(data);
      })
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(properties.length / propertiesPerPage));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(properties.length / propertiesPerPage)) % Math.ceil(properties.length / propertiesPerPage));
  };

  const startIndex = currentPage * propertiesPerPage;
  const displayedProperties = properties.slice(startIndex, startIndex + propertiesPerPage);

  return (
    <div className="estate-card-container">
      {displayedProperties.length > 0 ? (
        <div className="estate-card-wrapper">
          {displayedProperties.map((property, index) => {
            // Format the price with commas
            const formattedPrice = new Intl.NumberFormat('en-US').format(property.PRICE);

            return (
              <div
                key={index}
                className="estate-card"
                onClick={() => window.location.href = `/property/${property.PR_ID}`} 
              >
                <img src={`data:image/jpeg;base64,${property.IMAGE}`} alt={`Property ${index}`} className="estate-card-image" />
                <div className="estate-card-info">
                  <p className="estate-card-price">ราคาตั้งขาย {formattedPrice} บาท</p>
                  <h2 className="estate-card-name">{property.NAME}</h2>
                  <p className="estate-card-location">
                    <span className="estate-card-location-border">{property.DISTRICT}, {property.SUB_DISTRICT}</span>
                  </p>
                  <p className="estate-card-size">ขนาด: {property.SIZE} </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No properties found.</p>
      )}

      <div className="espagination">
        <button onClick={prevPage}>&lt;</button>
        {Array.from({ length: Math.ceil(properties.length / propertiesPerPage) }, (_, idx) => (
          <div
            key={idx}
            className={`espagination-dot ${idx === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(idx)}
          />
        ))}
        <button onClick={nextPage}>&gt;</button>
      </div>
    </div>
  );
}

export default EstateCard;
