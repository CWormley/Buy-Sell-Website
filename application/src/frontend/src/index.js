import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
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

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories once globally
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://44.201.159.31/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  return (
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
        <Route path="/item/:id" element={<ListingDetail />} />
        <Route path="/message" element={<MessageSeller />} />
        <Route path="/map" element={<Map />} />


      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
