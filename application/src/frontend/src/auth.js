/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: auth.js
*
* Description:: 
* This file contains functions for handling user authentication
* in the Gator Market application.
* It includes functions to check login status and log out the user.
* The checkLoginStatus function sends a GET request to the backend
*
**************************************************************/
// Checks backend session to determine if the user is logged in
export async function checkLoginStatus() {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/check-session`, {
            method: 'GET',
            credentials: 'include' // Important to send cookies/session
        });

        const data = await response.json();
        return data.loggedIn === true;
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
}

// Logs the user out by clearing the session
export async function logout() {
    try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        // Optionally clear localStorage or other state here
        localStorage.removeItem('userEmail');
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

export async function login(email, password) {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user_log`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('userEmail', email); // optional
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}