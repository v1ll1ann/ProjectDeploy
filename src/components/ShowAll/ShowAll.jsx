import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ShowAll.css'; // Assuming you have a separate CSS file

export default function ShowAll() {
  const navigate = useNavigate();

  return (
    <div className="show-all-container">
      <h1 className="shtitle-text">ทรัพย์เพื่อคุณ มากกว่า 50 รายการ</h1>
      <button 
        className="shview-all-button" 
        onClick={() => navigate('/showallresult')}
      >
        ดูทรัพย์ทั้งหมด
      </button>
    </div>
  );
}
