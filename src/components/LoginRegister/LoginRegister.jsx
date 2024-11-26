import './LoginRegister.css';
import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginRegister = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [error, setError] = useState('');
  const [action, setAction] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const navigate = useNavigate();

  const registerLink = () => {
    setAction('active-register');
  };

  const loginLink = () => {
    setAction('');
  };

  const forgotPasswordLink = () => {
    setAction('active-forgot');
  };

  const backToLoginLink = () => {
    setAction('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle visibility
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost/backend/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          // Update the user in App state with name and role
          const userData = {
            name: data.CUS_FNAME,  // Assuming data.CUS_FNAME is the user's first name
            role: 'user',          // Mark the role as regular user
          };
          setUser(userData); 
          navigate('/');       // Redirect to the home page
        } else {
          setError(data.message);  // Display error message
        }
      })
      .catch(() => setError('Error logging in. Please try again.'));
  };

  const handleRegister = (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    fetch('http://localhost/backend/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email,
        password,
        firstName,
        lastName,
        age,
        phone,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Registration successful! Please log in.');
          // Reset form fields
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setFirstName('');
          setLastName('');
          setAge('');
          setPhone('');
          setError('');
          // Set action to login form
          setAction('');
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError('Error registering. Please try again.'));
  };
  // Handle Forgot Password
  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    fetch('http://localhost/backend/forgot_password.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, newPassword }), // Sending email and new password
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Password reset successful');
          setError('');
          backToLoginLink(); // Return to login after success
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError('Error resetting password. Please try again.'));
  };

  const handleAdminLogin = () => {
    navigate('/admin'); // Navigate to the /admin page
  };

  return (
    <div className="LoginRegister">
      <div className={`wrapper ${action}`}>
        {/* Login form */}
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
                inputMode="text"
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <FaLock className="lock-icon" />
            </div>
            <div className="forgot">
              <a href="#" onClick={forgotPasswordLink}>Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
            <div className='register-link'>
              <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
            </div>
            <div className="admin-link">
              <p><a href="#" onClick={handleAdminLogin}>Admin Login</a></p> {/* Fixed href */}
            </div>
          </form>
        </div>

        {/* Registration form */}
        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h1>Registration</h1>
            {error && <p className="error">{error}</p>}
            <div className="input-box">
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className='icon' />
            </div>
            <div className="input-box">
              <input
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input
                type='text'
                placeholder='Age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input
                type='text'
                placeholder='Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <FaPhone className='icon' />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className='icon' />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FaLock className='icon' />
            </div>
            <button type="submit">Register</button>
            <div className='register-link'>
              <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
            </div>
          </form>
        </div>

        {/* Forgot Password form */}
        <div className="form-box forgot-password">
          <form onSubmit={handleForgotPassword}>
            <h1>Reset Password</h1>
            {error && <p className="error">{error}</p>}
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className='icon' />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <FaLock className='icon' />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <FaLock className='icon' />
            </div>
            <button type="submit">Reset Password</button>

            {/* Back to Login button */}
            <div className="back-to-login">
              <a href="#" onClick={backToLoginLink}>Back to Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
