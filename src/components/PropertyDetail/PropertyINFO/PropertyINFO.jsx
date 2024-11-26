import React from 'react';

function PropertyInfo({ name, description, location, price, size, ownerFirstName, ownerLastName, ownerPhone }) {
  return (
    <div className="property-info">
      <h1>{name}</h1>
      <p>{description}</p>
      <p>ที่ตั้ง: {location}</p>
      <p>ราคาตั้งขาย: {price} บาท</p>
      <p>ขนาด: {size}</p>
      <p>ชื่อเจ้าของอสังหา: {ownerFirstName}</p>
      <p>นามสกุลเจ้าของอสังหา: {ownerLastName}</p>
      <p>เบอร์โทรติดต่อ: {ownerPhone}</p>
    </div>
  );
}

export default PropertyInfo;
