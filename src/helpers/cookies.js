//cookies.js
/**
 * Set a cookie with the given name, value, and expiration days.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} days - The number of days until the cookie expires.
 */
export const setCookie = (name, value, days) => {
  // Initialize the expires variable as an empty string.
  let expires = '';

  // If the number of days is specified.
  if (days) {
    // Create a new Date object.
    const date = new Date();
    // Set the time of the Date object to the current time plus the number of days in milliseconds.
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    // Convert the date to a UTC string and assign it to the expires variable.
    expires = '; expires=' + date.toUTCString();
  }
  // Set the cookie with the given name, value, and expiration date.
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

/**
 * Get the value of a cookie by name.
 * @param {string} name - The name of the cookie.
 * @returns {string|null} - The value of the cookie, or null if it doesn't exist.
 */
export const getCookie = (name) => {
  // Create the nameEQ string by concatenating the name with '='.
  const nameEQ = name + '=';
  // Split the document.cookie string into an array of cookies.
  const ca = document.cookie.split(';');
  // Iterate over each cookie in the array.
  for (let i = 0; i < ca.length; i++) {
    // Get the current cookie.
    let c = ca[i];
    // Trim any leading spaces from the cookie.
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    // Check if the current cookie starts with the nameEQ string.
    if (c.indexOf(nameEQ) === 0)
      // Return the value of the cookie, removing the nameEQ string.
      return c.substring(nameEQ.length, c.length);
  }
  // Return null if the cookie does not exist.
  return null;
};

/**
 * Erases a cookie by setting its value to an empty string and setting its max-age to a negative value.
 * @param {string} name - The name of the cookie to erase.
 */
export const eraseCookie = (name) => {
  // Set the cookie's max-age to a negative value to immediately expire it
  document.cookie = name + '=; Max-Age=-99999999;';
};
