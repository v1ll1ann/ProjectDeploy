import React, { useState, useEffect } from 'react';
import './ShowAllResult.css';

function ShowAllResult() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const propertiesPerPage = 10;

  useEffect(() => {
    // Fetch all properties from backend
    fetch('http://localhost/backend/get-all-properties.php')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setProperties(data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error.message);
      });
  }, []);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const goToPage = (index) => {
    setCurrentPage(index);
  };

  // Calculate the range of properties to display on the current page
  const startIndex = currentPage * propertiesPerPage;
  const displayedProperties = properties.slice(startIndex, startIndex + propertiesPerPage);

  // Pagination rendering with ellipses
  const renderPagination = () => {
    const maxPagesToShow = 5;
    const pageNumbers = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(0); // First page

      const leftLimit = Math.max(1, currentPage - 1);
      const rightLimit = Math.min(totalPages - 2, currentPage + 1);

      if (leftLimit > 1) {
        pageNumbers.push('...');
      }

      for (let i = leftLimit; i <= rightLimit; i++) {
        pageNumbers.push(i);
      }

      if (rightLimit < totalPages - 2) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages - 1); // Last page
    }

    return (
      <div className="pagination">
        <button onClick={prevPage}>&lt;</button>
        {pageNumbers.map((page, idx) =>
          page === '...' ? (
            <span key={idx} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={idx}
              className={`pagination-number ${page === currentPage ? 'active' : ''}`}
              onClick={() => goToPage(page)}
            >
              {page + 1}
            </button>
          )
        )}
        <button onClick={nextPage}>&gt;</button>
      </div>
    );
  };

  return (
    <div className="show-all-result-container">
      {displayedProperties.length > 0 ? (
        <div className="property-list">
          {displayedProperties.map((property, index) => {
            const formattedPrice = new Intl.NumberFormat('en-US').format(property.PRICE);
            return (
              <div
                key={index}
                className="property-card"
                onClick={() => window.location.href = `/property/${property.PR_ID}`}
              >
                <img src={`data:image/jpeg;base64,${property.IMAGE}`} alt={`Property ${index}`} className="property-card-image" />
                <div className="property-card-info">
                  <p className="property-card-price">ราคา: {formattedPrice} บาท</p>
                  <h2 className="property-card-name">{property.NAME}</h2>
                  <p className="estate-card-location-border">{property.DISTRICT}, {property.SUB_DISTRICT}</p>
                  <p className="property-card-size">ขนาด: {property.SIZE} </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading.</p>
      )}

      {renderPagination()}
    </div>
  );
}

export default ShowAllResult;
