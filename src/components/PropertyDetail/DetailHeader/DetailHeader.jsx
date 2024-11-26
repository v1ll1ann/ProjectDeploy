import React from 'react';
import './DetailHeader.css'; 

function DetailHeader({ prType }) {
  return (
    <div className="detail-header">
      {/* <h2>Property Type: {prType}</h2> */}
      <h2 style={{ 
      fontWeight: 'bold',       // ทำให้ตัวอักษรเป็นตัวหนา
      // fontSize: '1.5rem',       // ขนาดตัวอักษรที่ใหญ่ขึ้น (ปรับได้ตามต้องการ)
      marginBottom: '20px',      // ระยะห่างด้านล่างจาก h2
      color: '#e8d955',            // สีของข้อความเป็นสีน้ำเงิน
      backgroundColor: 'rgb(24, 38, 167)', // เปลี่ยนสีพื้นหลังเป็นสีฟ้าอ่อน
      padding: '10px',          // เพิ่ม padding รอบข้อความเพื่อขยายพื้นที่พื้นหลัง
      width: '1200px',     // ทำให้ขนาดพื้นหลังพอดีกับข้อความ
      display: 'flex',                // ใช้ Flexbox
      alignItems: 'center',           // จัดแนวตั้งให้กึ่งกลาง
      justifyContent: 'center',       // จัดแนวนอนให้กึ่งกลาง
      borderRadius: '8px'
      // color: 'rgb(24, 38, 167)'
    }}>
      Property Type: {prType}
    </h2>
    </div>
  );
}

export default DetailHeader;
