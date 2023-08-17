// components/HomePage/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eraseCookie } from '../../helpers/cookies';

function HomePage({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    eraseCookie('user_logged_in'); // Kullanıcının giriş yaptığına dair cookie'yi sil
    onLogout(); // Kullanıcının çıkış yaptığını işaretle
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to HomePage!</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default HomePage;
