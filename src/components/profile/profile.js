import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          if (data && data._id) {
            sessionStorage.setItem('user_id', data._id);
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-content">
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={() => navigate('/orders')}>My Orders</button>
          <button onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
