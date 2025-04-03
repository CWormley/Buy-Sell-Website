import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM for React 18
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes for React Router v6
import About from './about';  // Import the About page component
import Home from './home';    // Assuming you have the HomePage component
import AboutNathan from './aboutMePages/about_nathan'; // Nathan's Page
import AboutDavis from './aboutMePages/about_davis';   // Davis' Page
import AboutFatimah from './aboutMePages/about_fatimah'; // Fatimah's Page
import AboutDaniel from './aboutMePages/about_daniel'; // Daniel's Page
import AboutClaudia from './aboutMePages/about_claudia'; // Claudia's Page
import './style.css';  // Import the global CSS file

const App = () => {
  return (
    <Router>
      <div>
        {/* Define the Routes */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home Page Route */}
          <Route path="/about" element={<About />} />  {/* About Page Route */}
          <Route path="/nathan" element={<AboutNathan />} /> {/* Nathan's Page Route */}
          <Route path="/davis" element={<AboutDavis />} />  {/* Davis' Page Route */}
          <Route path="/fatimah" element={<AboutFatimah />} /> {/* Fatimah's Page Route */}
          <Route path="/claudia" element={<AboutClaudia />} /> {/* Claudia's Page Route */}
          <Route path="/daniel" element={<AboutDaniel />} /> {/* Daniel's Page Route */}
        </Routes>
      </div>
    </Router>
  );
};

// Render the App component
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root for React 18
root.render(<App />);

export default App;
