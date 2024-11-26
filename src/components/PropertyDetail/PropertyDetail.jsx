import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailHeader from '../PropertyDetail/DetailHeader/DetailHeader';
import PropertyImage from '../PropertyDetail/PropertyIMAGE/PropertyIMAGE';
import PropertyInfo from '../PropertyDetail/PropertyINFO/PropertyINFO';
import NearbyProperties from '../PropertyDetail/NearbyProperties/NearbyProperties';
import './PropertyDetail.css';

function PropertyDetail({ user }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState('รายละเอียดทรัพย์');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (!user) {
      // If not logged in, redirect to the login page
      navigate('/');
      return;
    }

    // Fetch property details
    fetch(`http://localhost/backend/get-property-detail.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Property Detail Data:', data);
        setProperty(data);
      })
      .catch(error => console.error('Error fetching property details:', error));
  }, [id, user, navigate]);

  if (!property) {
    return <p>Loading property details...</p>;
  }

  // Format the price with commas
  const formattedPrice = new Intl.NumberFormat('en-US').format(property.PRICE);

  // Function to switch between tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="property-detail-container flex flex-col justify-center items-center min-h-screen p-4">
      <DetailHeader prType={property.PR_TYPE} />

      <div className="property-content">
        <PropertyImage image={property.IMAGE} name={property.NAME} />
        <PropertyInfo
          name={property.NAME}
          description={property.DESCRIPTION}
          location={`${property.DISTRICT}, ${property.SUB_DISTRICT}`}
          price={formattedPrice}  // Use the formatted price here
          size={property.SIZE}
          ownerFirstName={property.OWNER_FNAME}
          ownerLastName={property.OWNER_LNAME}
          ownerPhone={property.OWNER_PHONE}
        />
      </div>

      <div className="property-footer ">
        <button
          className={activeTab === 'รายละเอียดทรัพย์' ? 'active' : ''}
          onClick={() => handleTabClick('รายละเอียดทรัพย์')}
        >
          รายละเอียดทรัพย์
        </button>
        <button
          className={activeTab === 'เงื่อนไขการเสนอซื้อ' ? 'active' : ''}
          onClick={() => handleTabClick('เงื่อนไขการเสนอซื้อ')}
        >
          เงื่อนไขการเสนอซื้อ
        </button>
        <button
          className={activeTab === 'สินทรัพย์ใกล้เคียง' ? 'active' : ''}
          onClick={() => handleTabClick('สินทรัพย์ใกล้เคียง')}
        >
          สินทรัพย์ใกล้เคียง
        </button>
      </div>

      <div className="property-footer-content">
        {activeTab === 'รายละเอียดทรัพย์' && (
          <div className="tab-content">
            <h2 style={{ 
              fontWeight: 'bold',       // ทำให้ตัวอักษรเป็นตัวหนา
              // fontSize: '1rem',       // ขนาดตัวอักษรที่ใหญ่ขึ้น (ปรับได้ตามต้องการ)
              marginBottom: '20px'      // ระยะห่างด้านล่างจาก h2
            }}>
              รายละเอียดสินทรัพย์
            </h2>
            <p>{property.DESCRIPTION}</p>
            <p>รหัสทรัพย์: {property.PR_ID}</p>
            <p>โครงการ: {property.NAME}</p>
            <p>ประเภท: {property.PR_TYPE}</p>
            <p>สถานที่: {property.LOCATION}</p>
            <p>จังหวัด: {property.PROVINCE}</p>
            <p>อำเภอ/เขต: {property.DISTRICT}</p>
            <p>ตำบล/แขวง: {property.SUB_DISTRICT}</p>
            <p>ระยะเวลาผ่อน: {property.LOAN} ปี</p>
            <p>โรงเรียน: {property.SCHOOL}</p>
            <p>โรงพยาบาล: {property.HOSPITAL}</p>
            <p>ห้างสรรพสินค้า: {property.STORE}</p>
          </div>
        )}

        {activeTab === 'เงื่อนไขการเสนอซื้อ' && (
          <div className="tab-content scrollable">
            <h2 style={{ 
              fontWeight: 'bold',       // ทำให้ตัวอักษรเป็นตัวหนา
              // fontSize: '1rem',       // ขนาดตัวอักษรที่ใหญ่ขึ้น (ปรับได้ตามต้องการ)
              marginBottom: '20px'      // ระยะห่างด้านล่างจาก h2
            }}>
              เงื่อนไขการเสนอซื้อ
            </h2>
            <p>ผู้สนใจสามารถเสนอราคาซื้อไปยังฝ่ายพัฒนาสินทรัพย์...</p>
          </div>
        )}

        {activeTab === 'สินทรัพย์ใกล้เคียง' && (
          <div className="tab-content">
            <h2 style={{ fontWeight: 'bold' }}>สินทรัพย์ที่ใกล้เคียง</h2>
            <NearbyProperties propertyType={property.PR_TYPE} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyDetail;
