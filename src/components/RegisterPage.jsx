import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/userSlice';
import './RegisterPage.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'yes'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    navigate('/login');
  };

  return (
    <div className="mobile-container">
      <div className="register-content">
        <div className="register-header">
          <h1 className="register-title">Create your PopX account</h1>
        </div>

        <form onSubmit={handleSubmit} className="register-form">

          {/* Full Name */}
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
            />
            <label className="form-label">Full Name *</label>
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <input
              type="tel"
              className="form-input"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              required
            />
            <label className="form-label">Phone Number *</label>
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
            <label className="form-label">Email Address *</label>
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            <label className="form-label">Password *</label>
          </div>

          {/* Company Name */}
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
            />
            <label className="form-label">Company Name</label>
          </div>

          {/* Radio Buttons */}
          <div className="form-group">
            <p className="radio-label">Are you an Agency?</p>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="isAgency"
                  value="yes"
                  checked={formData.isAgency === 'yes'}
                  onChange={(e) => handleInputChange('isAgency', e.target.value)}
                />
                <span className="radio-custom"></span>
                Yes
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="isAgency"
                  value="no"
                  checked={formData.isAgency === 'no'}
                  onChange={(e) => handleInputChange('isAgency', e.target.value)}
                />
                <span className="radio-custom"></span>
                No
              </label>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary register-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;