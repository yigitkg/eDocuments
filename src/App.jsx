import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginForm from './components/LoginForm/LoginForm';
import { getCookie, eraseCookie } from './helpers/cookies';

/**
 * This function represents the main component of the application.
 * It handles user login and logout functionality and renders the appropriate routes.
 */
function App() {
  // Check if the user is logged in by checking the value of the 'user_logged_in' cookie
  const [isLoggedIn, setIsLoggedIn] = useState(
    getCookie('user_logged_in') === 'true'
  );

  // Update the value of isLoggedIn whenever the 'user_logged_in' cookie changes
  useEffect(() => {
    setIsLoggedIn(getCookie('user_logged_in') === 'true');
    console.log('isLoggedIn', isLoggedIn);
    console.log("getCookie('user_logged_in", getCookie('user_logged_in'));
  }, [isLoggedIn]);

  // Function to handle user login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    eraseCookie('user_logged_in');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Render the HomePage if the user is logged in, otherwise navigate to the login page */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <HomePage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Render the LoginForm if the user is not logged in, otherwise navigate to the home page */}
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
