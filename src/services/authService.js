//authService.js
import { setCookie } from '../helpers/cookies';

export const login = async (username, password) => {
  if (username === 'a' && password === 'a') {
    setCookie('user_logged_in', 'true', 1); // 1 day expiration for the cookie
    return true;
  }
  return false;
};
