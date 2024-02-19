import { useState } from 'react';
import Cookies from 'js-cookie';

const useCookie = (cookieName, initialValue) => {
  // Get the initial value of the cookie or use the provided initial value
  const initialCookieValue = Cookies.get(cookieName) || initialValue;

  // Set up state to manage the cookie value
  const [cookieValue, setCookieValue] = useState(initialCookieValue);

  // Function to update the cookie value
  const updateCookieValue = (newValue) => {
    // Calculate the expiration time to midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to midnight

    // Update the cookie value with the calculated expiration time
    Cookies.set(cookieName, newValue, { expires: midnight });

    // Update the state to reflect the new cookie value
    setCookieValue(newValue);
  };

  // Function to remove the cookie
  const removeCookie = () => {
    // Remove the cookie
    Cookies.remove(cookieName);

    // Update the state to reflect the removal of the cookie
    setCookieValue(null);
  };

  return [cookieValue, updateCookieValue, removeCookie];
};

export default useCookie;
