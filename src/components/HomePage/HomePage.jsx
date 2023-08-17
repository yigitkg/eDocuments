import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eraseCookie } from '../../helpers/cookies';
import InvoiceList from '../InvoiceList/InvoiceList';
import './styles.css';

function HomePage({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    eraseCookie('user_logged_in');
    onLogout();
    navigate('/login');
  };

  return (
    <div className="mainContainer">
      <div className="header">
        <h1 className="title">Fatura Listesi</h1>
        <button onClick={handleLogoutClick} className="logoutButton">
          Logout
        </button>
      </div>
      <InvoiceList />
    </div>
  );
}

export default HomePage;
