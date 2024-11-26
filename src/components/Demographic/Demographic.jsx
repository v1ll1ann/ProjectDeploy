import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Demographic.css';
import PropertyCard from '../Demographic/PropertyCard/PropertyCard';

function DemographicForm() {
  const [category, setCategory] = useState('');
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [status, setStatus] = useState('');
  const [territory, setTerritory] = useState('');
  const [urban, setUrban] = useState('');
  const [additional, setAdditional] = useState({
    elderly: false,
    child: false,
    teen: false,
  });
  const [results, setResults] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const propertiesPerPage = 4;

  useEffect(() => {
    if (category === 'ที่อยู่อาศัย') {
      if (status === 'คนโสด') {
        setTypeFilter('ห้องชุดพักอาศัย');
      } else if (status === 'คนแต่งงานหรืออยู่กับครอบครัว') {
        setTypeFilter('บ้านเดี่ยว,ทาวน์เฮ้าส์');
      } else {
        setTypeFilter('ห้องชุดพักอาศัย,บ้านเดี่ยว,ทาวน์เฮ้าส์');
      }
    } else if (category === 'ที่ดิน') {
      setTypeFilter('ที่ดิน');
    } else if (category === 'อาคารพาณิชย์') {
      setTypeFilter('อาคารพาณิชย์');
    } else {
      setTypeFilter('');
    }
  }, [category, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const additionalData = Object.keys(additional)
      .filter(key => additional[key])
      .map(key => {
        if (key === 'elderly') return 'ผู้สูงอายุ';
        if (key === 'child') return 'เด็ก';
        if (key === 'teen') return 'วัยรุ่น';
        return null;
      })
      .filter(Boolean);

    const formData = {
      category,
      age,
      income,
      status,
      territory,
      urban,
      additional: additionalData,
      typeFilter,
    };

    try {
      const response = await axios.post('http://localhost/backend/property_filter.php', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setResults(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const nextPage = () => {
    setCurrentPage(prevPage => {
      const totalPages = Math.ceil(results.length / propertiesPerPage);
      return prevPage < totalPages - 1 ? prevPage + 1 : prevPage;
    });
  };

  const prevPage = () => {
    setCurrentPage(prevPage => {
      return prevPage > 0 ? prevPage - 1 : prevPage;
    });
  };

  const startIndex = currentPage * propertiesPerPage;
  const displayedProperties = results.slice(startIndex, startIndex + propertiesPerPage);

  return (
    <div className="Demographic">
      <div className="dmcontent">
        <header className="dmheader"></header>
        <h1 className="dmtitle">เลือกคุณสมบัติอสังหาริมทรัพย์ที่ต้องการ</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selection */}
          <label className="block ml-20 mr-2">
            หมวดหมู่:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="ml-2 mr-2 mt-2 p-2 border rounded-lg"
            >
              <option value="">เลือกหมวดหมู่</option>
              <option value="ที่อยู่อาศัย">ที่อยู่อาศัย</option>
              <option value="ที่ดิน">ที่ดิน</option>
              <option value="อาคารพาณิชย์">อาคารพาณิชย์</option>
            </select>
          </label>

          {/* Category-Specific Fields */}
          {category === 'ที่อยู่อาศัย' ? (
            <label className="block ml-20 mr-2">
              สถานะ:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="ml-2 mr-2 mt-2 p-2 border rounded-lg"
              >
                <option value="">เลือกสถานะ</option>
                <option value="คนโสด">คนโสด</option>
                <option value="คนแต่งงานหรืออยู่กับครอบครัว">คนแต่งงานหรืออยู่กับครอบครัว</option>
              </select>
            </label>
          ) : (
            <>
              <label className="block ml-20 mr-2">
                ขนาด:
                <select
                  value={territory}
                  onChange={(e) => setTerritory(e.target.value)}
                  className="ml-2 mr-2 mt-2 p-2 border rounded-lg"
                >
                  <option value="">เลือกขนาด</option>
                  <option value="เล็ก">เล็ก</option>
                  <option value="กลาง">กลาง</option>
                  <option value="ใหญ่">ใหญ่</option>
                </select>
              </label>
              <label className="block ml-20 mr-2">
                ที่ตั้ง:
                <select
                  value={urban}
                  onChange={(e) => setUrban(e.target.value)}
                  className="ml-2 mr-2 mt-2 p-2 border rounded-lg"
                >
                  <option value="">เลือกที่ตั้ง</option>
                  <option value="ใกล้เมือง">ใกล้เมือง</option>
                  <option value="ไกลเมือง">ไกลเมือง</option>
                </select>
              </label>
            </>
          )}

          {/* Age and Income Fields */}
          <label className="block ml-20 mr-2">
            อายุ:
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="ml-2 mr-2 mt-2 p-2 border rounded-lg"
            >
              <option value="">เลือกอายุ</option>
              <option value="23-25">23-25</option>
              <option value="26-30">26-30</option>
              <option value="31-35">31-35</option>
              <option value="36-50">36-50</option>
              <option value="51-60">51-60</option>
            </select>
          </label>
          <label className="block ml-20 mr-2">
            รายได้:
            <select
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="ml-2 mr-2 mt-2 p-2 border rounded-lg"
            >
              <option value="">เลือกรายได้</option>
              <option value="12,000-19,000">12,000-19,000</option>
              <option value="20,000-40,000">20,000-40,000</option>
              <option value="41,000-75,000">41,000-75,000</option>
              <option value="76,000-150,000">76,000-150,000</option>
            </select>
          </label>

          {/* Additional Filters */}
          <fieldset className="mt-4 ml-20 mr-2">
            <legend className="font-medium">สถานที่ใกล้เคียง:</legend>
            <div className="flex space-x-4 mt-4"> {/* ใช้ flex และจัดการช่องว่างระหว่าง label */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={additional.elderly}
                  onChange={(e) => setAdditional((prev) => ({ ...prev, elderly: e.target.checked }))}
                />
                <span className="ml-2">ใกล้โรงพยาบาล</span> {/* เพิ่มช่องว่างระหว่าง checkbox กับข้อความ */}
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={additional.child}
                  onChange={(e) => setAdditional((prev) => ({ ...prev, child: e.target.checked }))}
                />
                <span className="ml-2">ใกล้โรงเรียน</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={additional.teen}
                  onChange={(e) => setAdditional((prev) => ({ ...prev, teen: e.target.checked }))}
                />
                <span className="ml-2">ใกล้ห้างสรรพสินค้า</span>
              </label>
            </div>
          </fieldset>

          <button className="demobtn" type="submit">Submit</button>
        </form>

        {/* Loading State */}
        {loading && <div className="loading">กำลังโหลด...</div>}

        {/* Display Results as Cards */}
        <div className="estate-card-container">
          {displayedProperties.length > 0 ? (
            <div className="estate-card-wrapper">
              {displayedProperties.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          ) : (
            <p>No properties found.</p>
          )}

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 0}>&lt;</button>
            {Array.from({ length: Math.ceil(results.length / propertiesPerPage) }, (_, idx) => (
              <div
                key={idx}
                className={`pagination-dot ${idx === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(idx)}
              />
            ))}
            <button onClick={nextPage} disabled={currentPage === Math.ceil(results.length / propertiesPerPage) - 1}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemographicForm;
