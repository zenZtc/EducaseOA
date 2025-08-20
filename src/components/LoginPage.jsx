import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/userSlice';
import './LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredUsers = useSelector(state => state.user.registeredUsers);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // clear error when typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = registeredUsers.find(u => u.email === formData.email);

    if (user && user.password === formData.password) {
      dispatch(loginUser({ email: formData.email }));
      navigate('/profile');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="mobile-container">
      <div className="login-content">
        <div className="login-header">
          <h1 className="login-title">Signin to your PopX account</h1>
          <p className="login-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {/* Email with floating label */}
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
            <label className="form-label">Email Address</label>
          </div>

          {/* Password with floating label */}
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            <label className="form-label">Password</label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-gray login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;