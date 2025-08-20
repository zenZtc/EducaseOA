import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container">
      <div className="welcome-content">
        <div className="welcome-text">
          <h1 className="welcome-title">Welcome to PopX</h1>
          <p className="welcome-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="welcome-buttons">
          <button
            className="btn-primary"
            onClick={() => navigate('/register')}
          >
            Create Account
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;