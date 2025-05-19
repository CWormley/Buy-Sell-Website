// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkLoginStatus, logout as performLogout } from './auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            const loggedIn = await checkLoginStatus();
            setIsLoggedIn(loggedIn);
        };
        fetchStatus();
    }, []);

    const login = () => setIsLoggedIn(true);
    const logout = async () => {
        await performLogout();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
