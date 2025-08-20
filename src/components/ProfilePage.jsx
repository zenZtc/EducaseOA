import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserAvatar, logoutUser } from '../store/userSlice';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Function to fetch random avatar
  const fetchRandomAvatar = async () => {
    try {
      setLoading(true);
      setAvatarError(false);

      // Using DiceBear API for random avatars
      const avatarStyle = 'avataaars'; // You can change to: adventurer, avataaars, bottts, etc.
      const seed = currentUser?.email || Math.random().toString();
      const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${seed}&backgroundColor=7c3aed,f59e0b,10b981&radius=50`;

      // Test if the URL works
      const response = await axios.get(avatarUrl);
      if (response.status === 200) {
        dispatch(updateUserAvatar(avatarUrl));
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching avatar:', error);
      setAvatarError(true);
      setLoading(false);

      // Fallback to a simple placeholder
      const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.fullName || 'User')}&background=7c3aed&color=fff&size=80`;
      dispatch(updateUserAvatar(fallbackAvatar));
    }
  };

  // Fetch avatar when component mounts
  useEffect(() => {
    if (currentUser && !currentUser.avatar) {
      fetchRandomAvatar();
    }
  }, [currentUser]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="mobile-container">
        <div className="profile-content">
          <p>Please login first</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h1 className="profile-title">Account Settings</h1>
        </div>

        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-avatar-container">
              {loading ? (
                <div className="avatar-loading">
                  <div className="loading-spinner"></div>
                </div>
              ) : (
                <img
                  src={currentUser.avatar || 'https://via.placeholder.com/60'}
                  alt="Profile"
                  className="profile-avatar"
                  onError={() => setAvatarError(true)}
                />
              )}
              <div className="profile-status-dot"></div>
              <button
                className="avatar-refresh-btn"
                onClick={fetchRandomAvatar}
                disabled={loading}
                title="Get new avatar"
              >
                🔄
              </button>
            </div>

            <div className="profile-details">
              <h2 className="profile-name">{currentUser.fullName}</h2>
              <p
                className={`profile-email ${currentUser.email.length > 25 ? 'marquee' : ''}`}
              >
                {currentUser.email}
              </p>
            </div>
          </div>

          <div className="profile-description">
            <p>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
            </p>
          </div>
        </div>

        <div className="profile-actions">
          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;