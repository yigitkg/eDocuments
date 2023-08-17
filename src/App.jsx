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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    getCookie('user_logged_in') === 'true'
  );
  console.log('!!!', isLoggedIn);

  useEffect(() => {
    setIsLoggedIn(getCookie('user_logged_in') === 'true');
    console.log('isLoggedIn', isLoggedIn);
    console.log("getCookie('user_logged_in", getCookie('user_logged_in'));
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    eraseCookie('user_logged_in');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
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
