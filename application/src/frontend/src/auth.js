/**
 * @file auth.js
 * @description Authentication utility functions for user login, logout, and session management.
 * Provides frontend API calls to backend authentication endpoints.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

/**
 * Checks the current session status on the backend
 * Determines if the user is authenticated
 * @async
 * @returns {Promise<boolean>} True if user is logged in, false otherwise
 */
export async function checkLoginStatus() {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/check-session`, {
      method: 'GET',
      credentials: 'include' // Include session cookies
    });

    const data = await response.json();
    return data.loggedIn === true;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
}

/**
 * Clears the user session and logs them out
 * Removes stored user email from localStorage
 * @async
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    localStorage.removeItem('userEmail');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

/**
 * Logs in a user with email and password credentials
 * Stores user email in localStorage for reference
 * @async
 * @param {string} email - User email address
 * @param {string} password - User password
 * @returns {Promise<Object>} Server response data
 * @throws {Error} Login failed error
 */
export async function login(email, password) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user_log`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('userEmail', email);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}