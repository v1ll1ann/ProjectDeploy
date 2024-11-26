import React, { useEffect, useState } from 'react';
import './SearchResult.css'; // CSS สำหรับสไตล์ของ button card

export default function SearchResult() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const propertiesPerPage = 6; // แสดงผลครั้งละ 5 อัน

  useEffect(() => {
    const searchQuery = new URLSearchParams(window.location.search).get('query');
    console.log("Search query:", searchQuery);

    fetch(`https://successful-victory-production-587d.up.railway.app/search.php?query=${searchQuery}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        setProperties(data.properties || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error.message);
        setError(error.message);
        setLoading(false);
      });
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
    <div className="search-result-container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="button-card-wrapper">
            {displayedProperties.map((property, index) => (
              <button
                key={index}
                className="button-card"
                onClick={() => window.location.href = `/property/${property.PR_ID}`}
              >
                <img src={`data:image/jpeg;base64,${property.IMAGE}`} alt={`Property ${index}`} className="button-card-image" />
                <div className="button-card-info">
                  <h2 className="button-card-name">{property.NAME}</h2>
                  <p className="button-card-price">{parseInt(property.PRICE).toLocaleString()} บาท</p>
                  </div>
              </button>
            ))}
          </div>

          <div className="s-pagination">
            <button onClick={prevPage}>&lt;</button>
            {Array.from({ length: Math.ceil(properties.length / propertiesPerPage) }, (_, idx) => (
              <div
                key={idx}
                className={`s-pagination-dot ${idx === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(idx)}
              />
            ))}
            <button onClick={nextPage}>&gt;</button>
          </div>
        </>
      )}
    </div>
  );
}
