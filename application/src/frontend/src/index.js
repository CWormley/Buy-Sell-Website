/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: index.js
*
* Description:: 
* This is the main entry point for the Gator Market application.
* It sets up the React application, including routing and global state management.
* The application uses React Router for navigation and fetches categories from the backend.
* 
**************************************************************/
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './auth_controller';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './about';
import Home from './home';
import Dashboard from './dashboard';
import Signin from './signandreg/signin';
import Register from './signandreg/register';
import Postitem from './postitem';
import AboutNathan from './aboutMePages/about_nathan';
import AboutDavis from './aboutMePages/about_davis';
import AboutFatimah from './aboutMePages/about_fatimah';
import AboutDaniel from './aboutMePages/about_daniel';
import AboutClaudia from './aboutMePages/about_claudia';
import Navbar from './navbar';
import ListingDetail from './listing';
import MessageSeller from './messageseller';
import Map from './map';
import './style.css';
import Listing from './listing';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories once globally
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <AuthProvider>
    <Router>
      {/* Navbar always shows */}
      <Navbar categories={categories} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/postitem" element={<Postitem />} />
        <Route path="/nathan" element={<AboutNathan />} />
        <Route path="/davis" element={<AboutDavis />} />
        <Route path="/fatimah" element={<AboutFatimah />} />
        <Route path="/claudia" element={<AboutClaudia />} />
        <Route path="/daniel" element={<AboutDaniel />} />
        <Route path="/item/:productId" element={<ListingDetail />} />
        <Route path="/message" element={<MessageSeller />} />
        <Route path="/map" element={<Map />} />
        <Route path="/listing" element={<Listing />} />



      </Routes>
    </Router>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
