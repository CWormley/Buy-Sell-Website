/**
 * @file index.js
 * @description Main entry point for the Gator Market React application.
 * Initializes routing, state management, and renders the application to the DOM.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './auth_controller';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import About from './about';
import Dashboard from './dashboard';
import Signin from './signandreg/signin';
import Register from './signandreg/register';
import Postitem from './postitem';
import ListingDetail from './listing';
import Listing from './listing';
import MessageSeller from './messageseller';
import Map from './map';
import AboutNathan from './aboutMePages/about_nathan';
import AboutDavis from './aboutMePages/about_davis';
import AboutFatimah from './aboutMePages/about_fatimah';
import AboutDaniel from './aboutMePages/about_daniel';
import AboutClaudia from './aboutMePages/about_claudia';
import './style.css';

/**
 * Main App component
 * Manages global state and routing for the application
 */
const App = () => {
  const [categories, setCategories] = useState([]);

  /**
   * Fetch categories from backend on component mount
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar categories={categories} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/postitem" element={<Postitem />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/item/:productId" element={<ListingDetail />} />
          <Route path="/message" element={<MessageSeller />} />
          <Route path="/map" element={<Map />} />
          <Route path="/nathan" element={<AboutNathan />} />
          <Route path="/davis" element={<AboutDavis />} />
          <Route path="/fatimah" element={<AboutFatimah />} />
          <Route path="/claudia" element={<AboutClaudia />} />
          <Route path="/daniel" element={<AboutDaniel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

/**
 * Render the application to the root element
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
