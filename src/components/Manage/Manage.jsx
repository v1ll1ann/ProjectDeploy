import React, { useState, useEffect } from 'react';
import './Manage.css';

export default function Manage() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editProperty, setEditProperty] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const propertiesPerPage = 5;

  // Fetch properties from the database
  useEffect(() => {
    fetch('http://localhost/backend/get_properties_admin.php')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setProperties(data);
    })
    .catch(error => console.error('Error fetching properties:', error));
  }, []);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Handle delete confirmation pop-up
  const handleDelete = (property) => {
    setDeleteConfirm(property);
  };

  const confirmDelete = (id) => {
    fetch(`http://localhost/backend/delete_property.php?PR_ID=${id}`, { method: 'DELETE' })
      .then(() => {
        setProperties(properties.filter((property) => property.PR_ID !== id));
        setDeleteConfirm(null);
      });
  };

  // Handle editing pop-up
  const handleEdit = (property) => {
    setEditProperty(property);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('http://localhost/backend/update_property.php', {
      method: 'POST',
      body: formData,
    }).then(() => {
      setProperties(
        properties.map((prop) =>
          prop.PR_ID === formData.get('PR_ID') ? { ...prop, ...Object.fromEntries(formData) } : prop
        )
      );
      setEditProperty(null);
    });
  };

  return (
    <div className="manage-container">
      <h2 className="header">ชุดข้อมูลอสังหาริมทรัพย์</h2>
      <table className="property-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>รูปภาพ</th>
            <th>ชื่อ</th>
            <th>ประเภท</th>
            <th>แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {currentProperties.map((property) => (
            <tr key={property.PR_ID}>
              <td>{property.PR_ID}</td>
              <td><img src={`data:image/jpeg;base64,${property.IMAGE}`} alt="property" className="property-image" /></td>
              <td>{property.NAME}</td>
              <td>{property.PR_TYPE}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(property)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(property)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && <button onClick={() => setCurrentPage(currentPage - 1)}> &lt; </button>}
        {currentPage < Math.ceil(properties.length / propertiesPerPage) && (
          <button onClick={() => setCurrentPage(currentPage + 1)}> &gt; </button>
        )}
      </div>

      {/* Edit Property Pop-up */}
      {editProperty && (
        <div className="edit-popup">
          <form onSubmit={saveEdit}>
            <input type="hidden" name="PR_ID" value={editProperty.PR_ID} />
            <div className="edit-row">
              <label>ชื่อ:</label>
              <input type="text" name="NAME" defaultValue={editProperty.NAME} required />
              <label>ประเภท:</label>
              <input type="text" name="PR_TYPE" defaultValue={editProperty.PR_TYPE} required />
              <label>ราคา:</label>
              <input type="text" name="PRICE" defaultValue={editProperty.PRICE} required />
            </div>
            <div className="edit-row">
              <label>ที่อยู่:</label>
              <input type="text" name="LOCATION" defaultValue={editProperty.LOCATION} required />
              <label>รายละเอียด:</label>
              <textarea name="DESCRIPTION" defaultValue={editProperty.DESCRIPTION} required></textarea>
            </div>
            <button type="submit">Save</button>
            <button className="close-btn" onClick={() => setEditProperty(null)}>X</button>
          </form>
        </div>
      )}

      {/* Delete Confirmation Pop-up */}
      {deleteConfirm && (
        <div className="delete-popup">
          <p>ยืนยันว่าจะลบหรือไม่</p>
          <input type="checkbox" id="confirm-delete" onChange={(e) => document.getElementById('confirm-btn').disabled = !e.target.checked} />
          <label htmlFor="confirm-delete">ตกลง</label>
          <button id="confirm-btn" disabled onClick={() => confirmDelete(deleteConfirm.PR_ID)}>ยืนยัน</button>
          <button onClick={() => setDeleteConfirm(null)}>ยกเลิก</button>
        </div>
      )}
    </div>
  );
}
