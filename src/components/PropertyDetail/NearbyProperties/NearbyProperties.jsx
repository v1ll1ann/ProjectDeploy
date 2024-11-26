import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../NearbyProperties/NearbyProperties.css';

function NearbyProperties({ propertyType }) {
  const [nearbyProperties, setNearbyProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;
  const navigate = useNavigate();
  const { id: currentPropertyId } = useParams();

  useEffect(() => {
    fetch(`http://localhost/backend/get-nearby-properties.php?type=${propertyType}`)
      .then(response => response.json())
      .then(data => {
        const filteredProperties = data.filter(property => property.PR_ID !== parseInt(currentPropertyId));
        setNearbyProperties(filteredProperties);
      })
      .catch(error => console.error('Error fetching nearby properties:', error));
  }, [propertyType, currentPropertyId]);

  const totalPages = Math.ceil(nearbyProperties.length / propertiesPerPage);

  const currentProperties = nearbyProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const handleCardClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="nearby-properties">
      <div className="property-cards-container">
        {currentProperties.length > 0 ? (
          currentProperties.map((property) => {
            // Format the price with commas
            const formattedPrice = new Intl.NumberFormat('en-US').format(property.PRICE);

            return (
              <div
                className="property-card"
                key={property.PR_ID}
                onClick={() => handleCardClick(property.PR_ID)}
                style={{ cursor: 'pointer' }}
              >
                <img src={`data:image/jpeg;base64,${property.IMAGE}`} alt={property.NAME} />
                <p>{property.NAME}</p>
                <p>ราคาตั้งขาย: {formattedPrice} บาท</p>
                <p>{property.DISTRICT}, {property.SUB_DISTRICT}</p>
                <p>ขนาด: {property.SIZE} </p>
              </div>
            );
          })
        ) : (
          <p>No nearby properties found.</p>
        )}
      </div>

      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          &lt; {/* Left arrow */}
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i}
            className={`pagination-dot ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          ></span>
        ))}

        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          &gt; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
}

export default NearbyProperties;
