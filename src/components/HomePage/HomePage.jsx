import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eraseCookie } from '../../helpers/cookies';
import InvoiceList from '../InvoiceList/InvoiceList';
import './styles.css';

/**
 * Renders the HomePage component.
 *
 * @param {function} onLogout - Callback function to handle logout.
 */
function HomePage({ onLogout }) {
  const navigate = useNavigate();

  /**
   * Handles the click event of the logout button.
   * Clears the user_logged_in cookie, calls the onLogout callback,
   * and navigates to the login page.
   */
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
