import './Admin.css';
import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Admin = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost/backend/admin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setUser({ name: data.ADM_FNAME, role: 'admin' });
          navigate('/adminhome');  // Redirect to admin home
        } else {
          setError(data.message);  // Display error message
        }
      })
      .catch(() => {
        setError('Error logging in. Please try again.');
      });
  };

  return (
    <div className="Admin">
      <div className="adminwrapper">
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaUser className='icon' />
            </div>
            <div className="input-box password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <FaLock className="lock-icon" />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
