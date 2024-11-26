// PropertyCard.js
import React from 'react';
import '../Demographic.css';

function PropertyCard({ property }) {
  const handleCardClick = () => {
    window.location.href = `/property/${property.PR_ID}`;
  };

  // Format the price with commas
  const formattedPrice = new Intl.NumberFormat('en-US').format(property.PRICE);

  return (
    <div className="estate-card" onClick={handleCardClick}>
      {property.IMAGE ? (
        <img src={`data:image/jpeg;base64,${property.IMAGE}`} alt={`Property ${property.NAME}`} className="estate-card-image" />
      ) : (
        <div className="estate-card-placeholder">No Image Available</div>
      )}
      <div className="estate-card-info">
        <p className="estate-card-price">ราคาตั้งขาย {formattedPrice} บาท</p>
        <h2 className="estate-card-name">{property.NAME}</h2>
        <p className="estate-card-location">
          <span className="estate-card-location-border">
            {property.DISTRICT}, {property.SUB_DISTRICT}
          </span>
        </p>
        <p className="estate-card-size">Size: {property.SIZE} ตร.ม.</p>
      </div>
    </div>
  );
}

export default PropertyCard;
