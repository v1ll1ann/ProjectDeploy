import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/assets/logoBam.jpg'

export default function Navbar({ user, handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
      {/* ปรับขนาดโลโก้ใน JSX */}
      <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '50px', height: 'auto' }} // ปรับขนาดที่นี่
        />
        {/* <span className="btn btn-ghost text-xl">BAM</span> */}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/demographic">Demographics</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center">
            <span className="btn btn-ghost">
              Welcome, {user.name} {/* Display the user's name */}
            </span>
            <button 
              style={{ backgroundColor: 'rgb(24, 38, 167)', color: 'white' }} // ใช้ RGB สำหรับสีพื้นหลัง
              className="btn ml-2"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/Login" className="btn">Login/Register</Link>
        )}
      </div>
    </div>
  );
}