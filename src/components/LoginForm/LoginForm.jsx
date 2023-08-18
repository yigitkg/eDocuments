import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import './styles.css';

/**
 * Component for rendering a login form.
 * @param {function} onLogin - Callback function to be called upon successful login.
 */
function LoginForm({ onLogin }) {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Navigation hook
  const navigate = useNavigate();

  /**
   * Handle form submission.
   * @param {object} e - Form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      onLogin();
      navigate('/');
    } else {
      setError('Incorrect username or password');
    }
  };

  // Render the login form
  return (
    <div className="loginContainer">
      <div className="loginForm">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
