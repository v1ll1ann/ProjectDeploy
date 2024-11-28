import React, { useState, useEffect } from 'react';
import './ShowAllResult.css';

function ShowAllResult() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const propertiesPerPage = 10; // จำนวนรายการต่อหน้า
  const [loading, setLoading] = useState(true);

  const fetchProperties = (page) => {
    setLoading(true);
    fetch(`https://successful-victory-production-587d.up.railway.app/get-all-properties.php?page=${page + 1}&limit=${propertiesPerPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProperties(data.properties || []);
        setTotalPages(Math.ceil(data.total_count / propertiesPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToPage = (index) => {
    setCurrentPage(index);
  };

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
        <button onClick={prevPage} disabled={currentPage === 0}>&lt;</button>
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
        <button onClick={nextPage} disabled={currentPage === totalPages - 1}>&gt;</button>
      </div>

    );
  };

  return (
    <div className="Demographic">
    <div className="show-all-result-container">
      {loading ? (
        <p>Loading...</p>
      ) : properties.length > 0 ? (
        <>
          <div className="property-list">
            {properties.map((property, index) => {
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
          {renderPagination()}
        </>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
    </div>
  );
}

export default ShowAllResult;
