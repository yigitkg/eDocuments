//authService.js
import { setCookie } from '../helpers/cookies';

/**
 * Logs in a user with the provided username and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {boolean} - True if the user is successfully logged in, false otherwise.
 */
export const login = async (username, password) => {
  // Check if the username and password match
  if (username === 'admin' && password === 'admin123') {
    setCookie('user_logged_in', 'true', 1); // 1 day expiration for the cookie
    return true;
  }
  return false;
};
