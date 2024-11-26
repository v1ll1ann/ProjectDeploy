import React from 'react';

function PropertyImage({ image, name }) {
  return (
    <div className="property-image">
      {image ? (
        <img src={`data:image/jpeg;base64,${image}`} alt={name} />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}

export default PropertyImage;
